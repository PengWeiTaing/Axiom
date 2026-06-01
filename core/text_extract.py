"""Text normalization and document/transcript extraction helpers."""
from __future__ import annotations

import html
import logging
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

from core.config import (
    DOCX_NAMESPACE,
    TRANSCRIPT_EXTENSIONS,
    TRANSCRIPT_TAG_PATTERN,
    TRANSCRIPT_TEXT_ENCODINGS,
    TRANSCRIPT_TIMESTAMP_PATTERN,
)

try:
    from pypdf import PdfReader
except ImportError:  # pragma: no cover - deployment should install requirements.txt
    PdfReader = None

logger = logging.getLogger("axiom.receiver")


def _get_file_extension(filename: str | Path | None) -> str:
    if not filename:
        return ""
    return Path(str(filename)).suffix.lower()


def normalize_extracted_text(text: str | None) -> str | None:
    if not text:
        return None

    paragraphs = [part.strip() for part in str(text).replace("\r", "\n").split("\n") if part.strip()]
    if not paragraphs:
        return None
    return "\n\n".join(paragraphs)


def decode_text_file_bytes(raw_bytes: bytes) -> str:
    for encoding in TRANSCRIPT_TEXT_ENCODINGS:
        try:
            return raw_bytes.decode(encoding)
        except UnicodeDecodeError:
            continue
    raise ValueError("暂不支持当前 transcript_file 编码，请改成 UTF-8、UTF-16 或常见文本编码后重试")


def normalize_audio_transcript_text(
    text: str | None,
    extension: str | None = None,
) -> str | None:
    if not text:
        return None

    normalized_extension = (extension or "").strip().lower()
    plain_text = str(text).replace("\r\n", "\n").replace("\r", "\n")
    if normalized_extension not in {".srt", ".vtt"}:
        return normalize_extracted_text(plain_text)

    cleaned_lines: list[str] = []
    skip_note_block = False
    for raw_line in plain_text.split("\n"):
        stripped_line = raw_line.strip()

        if skip_note_block:
            if not stripped_line:
                skip_note_block = False
            continue

        if not stripped_line:
            cleaned_lines.append("")
            continue
        if normalized_extension == ".vtt" and stripped_line.upper() == "WEBVTT":
            continue
        if normalized_extension == ".vtt" and stripped_line.startswith("NOTE"):
            skip_note_block = True
            continue
        if stripped_line.isdigit():
            continue
        if TRANSCRIPT_TIMESTAMP_PATTERN.match(stripped_line):
            continue

        cleaned_text = html.unescape(TRANSCRIPT_TAG_PATTERN.sub("", stripped_line)).strip()
        if cleaned_text:
            cleaned_lines.append(cleaned_text)

    return normalize_extracted_text("\n".join(cleaned_lines))


def extract_audio_transcript_text_from_bytes(
    raw_bytes: bytes,
    original_name: str | None = None,
) -> str | None:
    if not raw_bytes:
        return None

    text = decode_text_file_bytes(raw_bytes)
    extension = _get_file_extension(original_name)
    return normalize_audio_transcript_text(text, extension)


def extract_audio_transcript_text_from_file(
    file_path: Path,
    original_name: str | None = None,
) -> str | None:
    extension = _get_file_extension(original_name or file_path)
    if extension not in TRANSCRIPT_EXTENSIONS:
        return None
    return extract_audio_transcript_text_from_bytes(file_path.read_bytes(), original_name or file_path.name)


def extract_audio_transcript_text_from_upload(uploaded_file) -> str | None:
    raw_name = uploaded_file.filename.strip()
    extension = _get_file_extension(raw_name)
    if extension not in TRANSCRIPT_EXTENSIONS:
        supported = ", ".join(sorted(TRANSCRIPT_EXTENSIONS))
        raise ValueError(f"transcript_file 只支持 {supported}")

    raw_bytes = uploaded_file.read()
    if not raw_bytes:
        raise ValueError("transcript_file 不能为空")

    try:
        return extract_audio_transcript_text_from_bytes(raw_bytes, raw_name)
    finally:
        try:
            uploaded_file.stream.seek(0)
        except (AttributeError, OSError):
            pass


def build_audio_transcript_sidecar_candidates(
    file_path: Path,
    original_name: str | None = None,
    transcript_dir: Path | None = None,
) -> list[Path]:
    candidate_dirs: list[Path] = [file_path.parent]
    if transcript_dir is not None:
        resolved_dir = transcript_dir.expanduser().resolve()
        if resolved_dir not in candidate_dirs:
            candidate_dirs.append(resolved_dir)

    candidate_names: list[str] = []
    stem = Path(original_name).stem if original_name else file_path.stem
    full_name = Path(original_name).name if original_name else file_path.name
    for extension in sorted(TRANSCRIPT_EXTENSIONS):
        candidate_names.append(f"{stem}{extension}")
        candidate_names.append(f"{full_name}{extension}")

    deduped_names: list[str] = []
    for name in candidate_names:
        if name not in deduped_names:
            deduped_names.append(name)

    candidates: list[Path] = []
    for directory in candidate_dirs:
        for name in deduped_names:
            candidates.append((directory / name).resolve())
    return candidates


def extract_docx_text(file_path: Path) -> str | None:
    with zipfile.ZipFile(file_path) as archive:
        with archive.open("word/document.xml") as document_xml:
            root = ET.parse(document_xml).getroot()

    paragraphs: list[str] = []
    for paragraph in root.findall(".//w:p", DOCX_NAMESPACE):
        parts = [
            node.text
            for node in paragraph.findall(".//w:t", DOCX_NAMESPACE)
            if node.text
        ]
        text = "".join(parts).strip()
        if text:
            paragraphs.append(text)

    if paragraphs:
        return normalize_extracted_text("\n\n".join(paragraphs))

    parts = [
        node.text
        for node in root.findall(".//w:t", DOCX_NAMESPACE)
        if node.text
    ]
    return normalize_extracted_text("\n".join(parts))


def extract_pdf_text(file_path: Path) -> str | None:
    if PdfReader is None:
        logger.warning("pypdf is not installed, skip pdf text extraction: file=%s", file_path.name)
        return None

    reader = PdfReader(str(file_path))
    page_texts = [page.extract_text() or "" for page in reader.pages]
    return normalize_extracted_text("\n\n".join(page_texts))


def extract_document_text(file_path: Path, original_name: str | None) -> str | None:
    extension = _get_file_extension(original_name or file_path)
    if extension == ".docx":
        try:
            return extract_docx_text(file_path)
        except (KeyError, OSError, ET.ParseError, zipfile.BadZipFile):
            logger.warning("failed to extract docx text: file=%s", file_path.name, exc_info=True)
            return None

    try:
        if extension == ".pdf":
            return extract_pdf_text(file_path)
    except Exception:
        logger.warning("failed to extract pdf text: file=%s", file_path.name, exc_info=True)
        return None

    return None
