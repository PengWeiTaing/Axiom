# Axiom

Axiom is a personal external-brain backend.

Current focus is not fancy UI or complex agents. The goal of `v0.1` is to make the minimum backend loop stable:

`Input -> Storage -> Retrieval -> AI -> Decision`

At the current stage, only the first three parts are in scope:

- receive input
- persist reliably
- retrieve basic records

AI summary, classification, and weekly review come later.

## Current Stage

Axiom currently uses a VPS as the main node.

Current deployment path:

`iPhone -> iOS Shortcuts -> VPS -> Flask receiver -> file system + SQLite`

This is a deliberate stage choice, not a final forever architecture.

## Core Principles

- Files are the content source of truth.
- SQLite is the index, not the content owner.
- Make it runnable before making it elegant.
- Keep changes small, clear, and testable.
- Do not introduce heavy infrastructure too early.

## Current Stack

- Python
- Flask
- SQLite
- File system storage
- iPhone Shortcuts as input client
- VPS as runtime environment

## Current Capabilities

### `/add`

- validates `key`
- accepts text input
- writes a `.txt` file into `data/inbox`
- inserts metadata into SQLite

### `/recent`

- validates `key`
- returns recent items from SQLite

### `/search`

- validates `key`
- searches text content
- supports pagination and sort modes

## Repository Structure

```text
core/
  receiver.py
  init_db.py
db/
  axiom.db
data/
  inbox/
  archive/
backup/
docs/
```

## Important Documents

- [Architecture](docs/ARCHITECTURE.md)
- [Current State](docs/CURRENT_STATE.md)
- [Architecture Mindmap](docs/ARCHITECTURE_MINDMAP.md)

## Near-Term Priorities

1. keep receiver stable
2. make persistence more reliable
3. add real backup flow
4. make recent/search behavior clearer

## Current Non-Goals

- complex frontend
- multi-agent architecture
- vector database
- distributed system
- Kubernetes
- backend framework migration
