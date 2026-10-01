"""Regression checks for the isolated Fire Cup generation gateway."""
from __future__ import annotations

import sys
import tempfile
import threading
import time
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from core.firecup_gateway import (  # noqa: E402
    CACHE_NAMESPACE,
    GENERATE_PATH,
    JOBS_PATH,
    SCENE_PIPELINE_REVISION,
    GatewayBusyError,
    GatewaySettings,
    GenerationCoordinator,
    create_app,
)


ALLOWED_ORIGIN = "https://competition.example"
ORIGIN_HEADERS = {"Origin": ALLOWED_ORIGIN}


def settings(**overrides) -> GatewaySettings:
    values = {
        "allowed_origins": frozenset({ALLOWED_ORIGIN}),
        "cache_ttl_seconds": 60,
        "cache_max_entries": 8,
        "inflight_wait_seconds": 5,
        "max_request_bytes": 65_536,
        "job_ttl_seconds": 60,
        "job_max_entries": 32,
        "job_queue_max_entries": 8,
        "job_db_path": ":memory:",
    }
    values.update(overrides)
    return GatewaySettings(**values)


class FireCupGatewayHttpTests(unittest.TestCase):
    def test_only_health_and_generate_are_exposed(self) -> None:
        app = create_app(settings=settings(), scene_generator=lambda _g, _s: {})
        rules = {rule.rule for rule in app.url_map.iter_rules()}
        self.assertEqual(
            rules,
            {"/health", GENERATE_PATH, JOBS_PATH, f"{JOBS_PATH}/<job_id>"},
        )

    def test_health_reports_configuration_without_secret_values(self) -> None:
        app = create_app(settings=settings(), scene_generator=lambda _g, _s: {})
        response = app.test_client().get("/health")
        self.assertEqual(response.status_code, 200)
        body_text = response.get_data(as_text=True)
        self.assertNotIn("Authorization", body_text)
        self.assertNotIn("Bearer", body_text)
        self.assertEqual(response.get_json()["max_concurrent_generations"], 1)

    def test_generate_caches_identical_normalized_input(self) -> None:
        calls: list[tuple[str, str]] = []

        def generator(goal: str, source_text: str):
            calls.append((goal, source_text))
            return {
                "title": goal,
                "source": source_text,
                "generation": {"quality_status": "approved"},
            }

        client = create_app(
            settings=settings(), scene_generator=generator
        ).test_client()
        first = client.post(
            GENERATE_PATH,
            json={"goal": "  牛顿第二定律  ", "source_text": "  教材  "},
            headers=ORIGIN_HEADERS,
        )
        second = client.post(
            GENERATE_PATH,
            json={"goal": "牛顿第二定律", "source_text": "教材"},
            headers=ORIGIN_HEADERS,
        )

        self.assertEqual(first.status_code, 200)
        self.assertEqual(second.status_code, 200)
        self.assertEqual(first.headers["X-Axiom-Cache"], "MISS")
        self.assertEqual(second.headers["X-Axiom-Cache"], "HIT")
        self.assertEqual(calls, [("牛顿第二定律", "教材")])
        self.assertEqual(second.get_json()["scene"]["title"], "牛顿第二定律")

    def test_unapproved_scene_is_never_cached(self) -> None:
        calls = 0

        def generator(_goal: str, _source_text: str):
            nonlocal calls
            calls += 1
            return {
                "title": f"attempt-{calls}",
                "generation": {"quality_status": "rejected"},
            }

        client = create_app(
            settings=settings(), scene_generator=generator
        ).test_client()
        first = client.post(
            GENERATE_PATH,
            json={"goal": "质量门测试"},
            headers=ORIGIN_HEADERS,
        )
        second = client.post(
            GENERATE_PATH,
            json={"goal": "质量门测试"},
            headers=ORIGIN_HEADERS,
        )

        self.assertEqual(first.status_code, 200)
        self.assertEqual(second.status_code, 200)
        self.assertEqual(first.headers["X-Axiom-Cache"], "MISS")
        self.assertEqual(second.headers["X-Axiom-Cache"], "MISS")
        self.assertEqual(calls, 2)
        self.assertEqual(second.get_json()["scene"]["title"], "attempt-2")

    def test_input_types_and_lengths_are_enforced(self) -> None:
        client = create_app(
            settings=settings(), scene_generator=lambda _g, _s: {}
        ).test_client()
        cases = [
            ({"goal": ""}, "missing_goal"),
            ({"goal": ["not", "text"]}, "invalid_goal"),
            ({"goal": "x" * 241}, "goal_too_long"),
            ({"goal": "x", "source_text": 123}, "invalid_source_text"),
            ({"goal": "x", "source_text": "y" * 12_001}, "source_too_long"),
        ]
        for payload, code in cases:
            with self.subTest(code=code):
                response = client.post(
                    GENERATE_PATH, json=payload, headers=ORIGIN_HEADERS
                )
                self.assertEqual(response.status_code, 400)
                self.assertEqual(response.get_json()["error"]["code"], code)

    def test_cors_is_an_exact_origin_allowlist(self) -> None:
        client = create_app(
            settings=settings(), scene_generator=lambda _g, _s: {"ok": True}
        ).test_client()
        allowed = client.options(
            GENERATE_PATH,
            headers={
                "Origin": ALLOWED_ORIGIN,
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "content-type",
            },
        )
        denied = client.options(
            GENERATE_PATH,
            headers={
                "Origin": f"{ALLOWED_ORIGIN}.evil.test",
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "content-type",
            },
        )

        self.assertEqual(allowed.status_code, 204)
        self.assertEqual(
            allowed.headers["Access-Control-Allow-Origin"], ALLOWED_ORIGIN
        )
        self.assertEqual(denied.status_code, 403)
        self.assertNotIn("Access-Control-Allow-Origin", denied.headers)

        health_preflight = client.options(
            "/health",
            headers={
                "Origin": ALLOWED_ORIGIN,
                "Access-Control-Request-Method": "GET",
                "Access-Control-Request-Headers": "",
            },
        )
        self.assertEqual(health_preflight.status_code, 200)
        self.assertEqual(
            health_preflight.headers["Access-Control-Allow-Methods"],
            "GET, OPTIONS",
        )

        job_preflight = client.options(
            f"{JOBS_PATH}/opaque-id",
            headers={
                "Origin": ALLOWED_ORIGIN,
                "Access-Control-Request-Method": "GET",
                "Access-Control-Request-Headers": "content-type",
            },
        )
        self.assertEqual(job_preflight.status_code, 204)
        self.assertEqual(
            job_preflight.headers["Access-Control-Allow-Methods"],
            "GET, OPTIONS",
        )
        denied_job_get = client.get(
            f"{JOBS_PATH}/opaque-id",
            headers={"Origin": f"{ALLOWED_ORIGIN}.evil.test"},
        )
        self.assertEqual(denied_job_get.status_code, 403)
        self.assertNotIn(
            "Access-Control-Allow-Origin", denied_job_get.headers
        )

        same_origin_style_job_get = client.get(f"{JOBS_PATH}/opaque-id")
        self.assertEqual(same_origin_style_job_get.status_code, 404)
        self.assertEqual(
            same_origin_style_job_get.get_json()["error"]["code"],
            "job_not_found",
        )
        self.assertNotIn(
            "Access-Control-Allow-Origin", same_origin_style_job_get.headers
        )

    def test_oversize_raw_request_is_rejected_before_json_parsing(self) -> None:
        client = create_app(
            settings=settings(max_request_bytes=16_384),
            scene_generator=lambda _g, _s: {},
        ).test_client()
        response = client.post(
            GENERATE_PATH,
            data=b"{" + (b"x" * 20_000) + b"}",
            content_type="application/json",
            headers=ORIGIN_HEADERS,
        )
        self.assertEqual(response.status_code, 413)
        self.assertEqual(response.get_json()["error"]["code"], "request_too_large")

    def test_generate_requires_an_allowed_origin(self) -> None:
        client = create_app(
            settings=settings(), scene_generator=lambda _g, _s: {"ok": True}
        ).test_client()
        response = client.post(GENERATE_PATH, json={"goal": "测试"})
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.get_json()["error"]["code"], "origin_required")

        job_response = client.post(JOBS_PATH, json={"goal": "测试"})
        self.assertEqual(job_response.status_code, 403)
        self.assertEqual(
            job_response.get_json()["error"]["code"], "origin_required"
        )


class AsyncGenerationJobTests(unittest.TestCase):
    def _wait_for_status(
        self,
        client,
        job_id: str,
        expected: str,
        *,
        timeout: float = 4,
    ) -> dict:
        deadline = time.monotonic() + timeout
        latest: dict = {}
        while time.monotonic() < deadline:
            # Same-origin browser GET polling normally omits the Origin header.
            response = client.get(f"{JOBS_PATH}/{job_id}")
            self.assertEqual(response.status_code, 200)
            latest = response.get_json()
            if latest["status"] == expected:
                return latest
            time.sleep(0.02)
        self.fail(f"job did not reach {expected}: {latest}")

    @staticmethod
    def _approved_scene(title: str) -> dict:
        return {
            "title": title,
            "generation": {"quality_status": "approved"},
        }

    def test_post_returns_202_then_get_returns_terminal_scene(self) -> None:
        started = threading.Event()
        release = threading.Event()

        def generator(goal: str, _source: str) -> dict:
            started.set()
            self.assertTrue(release.wait(timeout=3))
            return self._approved_scene(goal)

        app = create_app(settings=settings(), scene_generator=generator)
        client = app.test_client()
        response = client.post(
            JOBS_PATH,
            json={"goal": "异步白板"},
            headers=ORIGIN_HEADERS,
        )

        self.assertEqual(response.status_code, 202)
        body = response.get_json()
        self.assertTrue(started.wait(timeout=2))
        self.assertGreaterEqual(len(body["job_id"]), 30)
        self.assertEqual(body["status_url"], f"{JOBS_PATH}/{body['job_id']}")
        self.assertEqual(body["retry_after_ms"], 5_000)
        self.assertIn(body["status"], {"queued", "running"})
        self.assertNotIn("scene", body)

        release.set()
        completed = self._wait_for_status(client, body["job_id"], "succeeded")
        self.assertEqual(completed["scene"]["title"], "异步白板")
        self.assertEqual(completed["progress"]["stage"], "completed")
        app.extensions["firecup_generation_jobs"].close()

    def test_normalized_duplicate_reuses_one_inflight_job(self) -> None:
        started = threading.Event()
        release = threading.Event()
        calls = 0

        def generator(goal: str, _source: str) -> dict:
            nonlocal calls
            calls += 1
            started.set()
            self.assertTrue(release.wait(timeout=3))
            return self._approved_scene(goal)

        app = create_app(settings=settings(), scene_generator=generator)
        client = app.test_client()
        first = client.post(
            JOBS_PATH,
            json={"goal": "  同一目标  ", "source_text": "  同一资料  "},
            headers=ORIGIN_HEADERS,
        )
        self.assertTrue(started.wait(timeout=2))
        second = client.post(
            JOBS_PATH,
            json={"goal": "同一目标", "source_text": "同一资料"},
            headers=ORIGIN_HEADERS,
        )

        self.assertEqual(second.status_code, 202)
        self.assertEqual(first.get_json()["job_id"], second.get_json()["job_id"])
        self.assertEqual(second.get_json()["request"]["reuse"], "inflight")
        release.set()
        self._wait_for_status(client, first.get_json()["job_id"], "succeeded")

        completed_reuse = client.post(
            JOBS_PATH,
            json={"goal": "同一目标", "source_text": "同一资料"},
            headers=ORIGIN_HEADERS,
        )
        self.assertEqual(completed_reuse.status_code, 202)
        self.assertEqual(completed_reuse.get_json()["status"], "succeeded")
        self.assertEqual(completed_reuse.get_json()["request"]["reuse"], "completed")
        self.assertEqual(calls, 1)
        app.extensions["firecup_generation_jobs"].close()

    def test_ten_concurrent_submissions_share_one_job(self) -> None:
        started = threading.Event()
        release = threading.Event()
        calls = 0

        def generator(goal: str, _source: str) -> dict:
            nonlocal calls
            calls += 1
            started.set()
            self.assertTrue(release.wait(timeout=3))
            return self._approved_scene(goal)

        app = create_app(settings=settings(), scene_generator=generator)
        store = app.extensions["firecup_generation_jobs"]
        results: list[tuple[dict, str]] = []
        errors: list[Exception] = []

        def submit() -> None:
            try:
                results.append(store.submit("concurrent", "same source"))
            except Exception as exc:  # pragma: no cover - asserted below
                errors.append(exc)

        threads = [threading.Thread(target=submit) for _ in range(10)]
        for thread in threads:
            thread.start()
        for thread in threads:
            thread.join(timeout=2)

        self.assertEqual(errors, [])
        self.assertEqual(len(results), 10)
        self.assertEqual(len({snapshot["job_id"] for snapshot, _ in results}), 1)
        self.assertTrue(started.wait(timeout=2))
        self.assertEqual(calls, 1)
        release.set()
        job_id = results[0][0]["job_id"]
        self._wait_for_status(app.test_client(), job_id, "succeeded")
        store.close()

    def test_different_jobs_are_dispatched_serially(self) -> None:
        first_started = threading.Event()
        release_first = threading.Event()
        calls: list[str] = []

        def generator(goal: str, _source: str) -> dict:
            calls.append(goal)
            if goal == "first":
                first_started.set()
                self.assertTrue(release_first.wait(timeout=3))
            return self._approved_scene(goal)

        app = create_app(settings=settings(), scene_generator=generator)
        client = app.test_client()
        first = client.post(
            JOBS_PATH, json={"goal": "first"}, headers=ORIGIN_HEADERS
        ).get_json()
        self.assertTrue(first_started.wait(timeout=2))
        second = client.post(
            JOBS_PATH, json={"goal": "second"}, headers=ORIGIN_HEADERS
        ).get_json()

        second_pending = client.get(
            f"{JOBS_PATH}/{second['job_id']}", headers=ORIGIN_HEADERS
        ).get_json()
        self.assertEqual(second_pending["status"], "queued")
        self.assertEqual(second_pending["progress"]["stage"], "queued")
        self.assertEqual(calls, ["first"])

        release_first.set()
        self._wait_for_status(client, first["job_id"], "succeeded")
        self._wait_for_status(client, second["job_id"], "succeeded")
        self.assertEqual(calls, ["first", "second"])
        app.extensions["firecup_generation_jobs"].close()

    def test_failed_job_does_not_stop_dispatcher(self) -> None:
        def generator(goal: str, _source: str) -> dict:
            if goal == "bad":
                raise RuntimeError("secret upstream detail")
            return self._approved_scene(goal)

        app = create_app(settings=settings(), scene_generator=generator)
        client = app.test_client()
        failed_id = client.post(
            JOBS_PATH, json={"goal": "bad"}, headers=ORIGIN_HEADERS
        ).get_json()["job_id"]
        next_id = client.post(
            JOBS_PATH, json={"goal": "good"}, headers=ORIGIN_HEADERS
        ).get_json()["job_id"]

        failed = self._wait_for_status(client, failed_id, "failed")
        succeeded = self._wait_for_status(client, next_id, "succeeded")
        self.assertEqual(failed["error"]["code"], "generation_failed")
        self.assertNotIn("secret upstream detail", str(failed))
        self.assertEqual(succeeded["scene"]["title"], "good")
        app.extensions["firecup_generation_jobs"].close()

    def test_late_success_cannot_reverse_terminal_failure(self) -> None:
        started = threading.Event()
        release = threading.Event()

        def generator(goal: str, _source: str) -> dict:
            if goal == "late":
                started.set()
                self.assertTrue(release.wait(timeout=3))
            return self._approved_scene(goal)

        app = create_app(settings=settings(), scene_generator=generator)
        client = app.test_client()
        created = client.post(
            JOBS_PATH, json={"goal": "late"}, headers=ORIGIN_HEADERS
        ).get_json()
        self.assertTrue(started.wait(timeout=2))
        store = app.extensions["firecup_generation_jobs"]
        with store._condition:  # simulate a terminal decision from recovery
            store._connection.execute(
                """
                UPDATE jobs SET status = 'failed', progress = 'failed',
                    error = '{"code":"forced_terminal","message":"stop"}',
                    goal = '', source_text = ''
                 WHERE id = ? AND status = 'running'
                """,
                (created["job_id"],),
            )
        release.set()
        after_id = client.post(
            JOBS_PATH, json={"goal": "after"}, headers=ORIGIN_HEADERS
        ).get_json()["job_id"]
        self._wait_for_status(client, after_id, "succeeded")

        terminal = client.get(
            f"{JOBS_PATH}/{created['job_id']}", headers=ORIGIN_HEADERS
        ).get_json()
        self.assertEqual(terminal["status"], "failed")
        self.assertEqual(terminal["error"]["code"], "forced_terminal")
        store.close()

    def test_queue_limit_rejects_only_new_distinct_job(self) -> None:
        started = threading.Event()
        release = threading.Event()

        def generator(goal: str, _source: str) -> dict:
            started.set()
            self.assertTrue(release.wait(timeout=3))
            return self._approved_scene(goal)

        app = create_app(
            settings=settings(job_queue_max_entries=1), scene_generator=generator
        )
        client = app.test_client()
        first = client.post(
            JOBS_PATH, json={"goal": "first"}, headers=ORIGIN_HEADERS
        )
        self.assertTrue(started.wait(timeout=2))
        duplicate = client.post(
            JOBS_PATH, json={"goal": " first "}, headers=ORIGIN_HEADERS
        )
        rejected = client.post(
            JOBS_PATH, json={"goal": "second"}, headers=ORIGIN_HEADERS
        )

        self.assertEqual(duplicate.status_code, 202)
        self.assertEqual(duplicate.get_json()["job_id"], first.get_json()["job_id"])
        self.assertEqual(rejected.status_code, 429)
        self.assertEqual(rejected.get_json()["error"]["code"], "job_queue_full")
        release.set()
        self._wait_for_status(client, first.get_json()["job_id"], "succeeded")
        app.extensions["firecup_generation_jobs"].close()

    def test_unknown_and_expired_job_ids_are_distinct(self) -> None:
        app = create_app(
            settings=settings(job_ttl_seconds=1),
            scene_generator=lambda goal, _source: self._approved_scene(goal),
        )
        client = app.test_client()
        unknown = client.get(
            f"{JOBS_PATH}/not-a-real-id", headers=ORIGIN_HEADERS
        )
        self.assertEqual(unknown.status_code, 404)
        self.assertEqual(unknown.get_json()["error"]["code"], "job_not_found")

        created = client.post(
            JOBS_PATH, json={"goal": "expires"}, headers=ORIGIN_HEADERS
        ).get_json()
        self._wait_for_status(client, created["job_id"], "succeeded")
        time.sleep(1.05)
        expired = client.get(
            f"{JOBS_PATH}/{created['job_id']}", headers=ORIGIN_HEADERS
        )
        self.assertEqual(expired.status_code, 410)
        self.assertEqual(expired.get_json()["error"]["code"], "job_expired")
        app.extensions["firecup_generation_jobs"].close()

    def test_unapproved_async_result_fails_closed(self) -> None:
        app = create_app(
            settings=settings(),
            scene_generator=lambda _goal, _source: {
                "title": "bad quality",
                "generation": {"quality_status": "rejected"},
            },
        )
        client = app.test_client()
        job_id = client.post(
            JOBS_PATH, json={"goal": "quality"}, headers=ORIGIN_HEADERS
        ).get_json()["job_id"]
        failed = self._wait_for_status(client, job_id, "failed")
        self.assertEqual(
            failed["error"]["code"], "knowledge_scene_unavailable"
        )
        self.assertNotIn("scene", failed)
        app.extensions["firecup_generation_jobs"].close()

    def test_async_worker_reuses_coordinator_cache(self) -> None:
        calls = 0

        def generator(goal: str, _source: str) -> dict:
            nonlocal calls
            calls += 1
            return self._approved_scene(goal)

        app = create_app(settings=settings(), scene_generator=generator)
        client = app.test_client()
        synchronous = client.post(
            GENERATE_PATH,
            json={"goal": "cached"},
            headers=ORIGIN_HEADERS,
        )
        self.assertEqual(synchronous.status_code, 200)
        created = client.post(
            JOBS_PATH,
            json={"goal": "cached"},
            headers=ORIGIN_HEADERS,
        ).get_json()
        completed = self._wait_for_status(client, created["job_id"], "succeeded")
        self.assertEqual(completed["request"]["cache"], "hit")
        self.assertEqual(calls, 1)
        app.extensions["firecup_generation_jobs"].close()

    def test_restart_marks_running_failed_and_resumes_queued(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            db_path = str(Path(temp_dir) / "jobs.sqlite3")
            first_app = create_app(
                settings=settings(job_db_path=db_path),
                scene_generator=lambda goal, _source: self._approved_scene(goal),
            )
            store = first_app.extensions["firecup_generation_jobs"]
            now = time.time()
            with store._condition:  # white-box recovery fixture
                queued_key = store._coordinator.request_key("resumed", "")
                store._connection.executemany(
                    """
                    INSERT INTO jobs (
                        id, request_key, goal, source_text, status, progress,
                        error, scene_json, cache_status,
                        created_at, updated_at, expires_at
                    ) VALUES (?, ?, ?, '', ?, ?, NULL, NULL, NULL, ?, ?, ?)
                    """,
                    [
                        (
                            "interrupted-id",
                            "restart-key-running",
                            "interrupted",
                            "running",
                            "generating",
                            now,
                            now,
                            now + 60,
                        ),
                        (
                            "queued-id",
                            queued_key,
                            "resumed",
                            "queued",
                            "queued",
                            now + 0.01,
                            now + 0.01,
                            now + 60,
                        ),
                        (
                            "stale-pipeline-id",
                            "old-pipeline-key",
                            "stale",
                            "queued",
                            "queued",
                            now + 0.02,
                            now + 0.02,
                            now + 60,
                        ),
                    ],
                )
            store.close()

            second_app = create_app(
                settings=settings(job_db_path=db_path),
                scene_generator=lambda goal, _source: self._approved_scene(goal),
            )
            client = second_app.test_client()
            interrupted = client.get(
                f"{JOBS_PATH}/interrupted-id", headers=ORIGIN_HEADERS
            )
            self.assertEqual(interrupted.status_code, 200)
            self.assertEqual(interrupted.get_json()["status"], "failed")
            self.assertEqual(
                interrupted.get_json()["error"]["code"], "worker_restarted"
            )
            resumed = self._wait_for_status(client, "queued-id", "succeeded")
            self.assertEqual(resumed["scene"]["title"], "resumed")
            stale = client.get(
                f"{JOBS_PATH}/stale-pipeline-id", headers=ORIGIN_HEADERS
            ).get_json()
            self.assertEqual(stale["status"], "failed")
            self.assertEqual(stale["error"]["code"], "pipeline_revised")
            second_app.extensions["firecup_generation_jobs"].close()

    def test_succeeded_result_is_reused_after_store_restart(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            db_path = str(Path(temp_dir) / "jobs.sqlite3")
            calls = 0

            def generator(goal: str, _source: str) -> dict:
                nonlocal calls
                calls += 1
                return self._approved_scene(goal)

            first_app = create_app(
                settings=settings(job_db_path=db_path), scene_generator=generator
            )
            first_client = first_app.test_client()
            created = first_client.post(
                JOBS_PATH, json={"goal": "persisted"}, headers=ORIGIN_HEADERS
            ).get_json()
            self._wait_for_status(first_client, created["job_id"], "succeeded")
            first_app.extensions["firecup_generation_jobs"].close()

            second_app = create_app(
                settings=settings(job_db_path=db_path), scene_generator=generator
            )
            reused = second_app.test_client().post(
                JOBS_PATH, json={"goal": "persisted"}, headers=ORIGIN_HEADERS
            )
            self.assertEqual(reused.status_code, 202)
            self.assertEqual(reused.get_json()["job_id"], created["job_id"])
            self.assertEqual(reused.get_json()["status"], "succeeded")
            self.assertEqual(reused.get_json()["request"]["reuse"], "completed")
            self.assertEqual(calls, 1)
            second_app.extensions["firecup_generation_jobs"].close()

    def test_capacity_does_not_evict_unexpired_terminal_job(self) -> None:
        app = create_app(
            settings=settings(job_max_entries=1, job_queue_max_entries=1),
            scene_generator=lambda goal, _source: self._approved_scene(goal),
        )
        client = app.test_client()
        first = client.post(
            JOBS_PATH, json={"goal": "retained"}, headers=ORIGIN_HEADERS
        ).get_json()
        self._wait_for_status(client, first["job_id"], "succeeded")

        full = client.post(
            JOBS_PATH, json={"goal": "new"}, headers=ORIGIN_HEADERS
        )
        self.assertEqual(full.status_code, 429)
        self.assertEqual(full.get_json()["error"]["code"], "job_queue_full")
        retained = client.get(
            f"{JOBS_PATH}/{first['job_id']}", headers=ORIGIN_HEADERS
        )
        self.assertEqual(retained.status_code, 200)
        self.assertEqual(retained.get_json()["status"], "succeeded")
        app.extensions["firecup_generation_jobs"].close()


class GenerationCoordinatorTests(unittest.TestCase):
    def test_default_cache_namespace_contains_pipeline_revision(self) -> None:
        self.assertTrue(SCENE_PIPELINE_REVISION)
        self.assertIn(f"-pipeline-{SCENE_PIPELINE_REVISION}-", CACHE_NAMESPACE)

    def test_cache_namespace_invalidates_previous_policy(self) -> None:
        first = GenerationCoordinator(
            cache_ttl_seconds=60,
            cache_max_entries=4,
            inflight_wait_seconds=2,
            cache_namespace="quality-v1-workflow-a",
        )
        second = GenerationCoordinator(
            cache_ttl_seconds=60,
            cache_max_entries=4,
            inflight_wait_seconds=2,
            cache_namespace="quality-v2-workflow-a",
        )
        self.assertNotEqual(
            first.request_key("同一目标", "同一资料"),
            second.request_key("同一目标", "同一资料"),
        )

    def make_coordinator(self) -> GenerationCoordinator:
        return GenerationCoordinator(
            cache_ttl_seconds=60,
            cache_max_entries=8,
            inflight_wait_seconds=5,
        )

    def test_identical_inflight_requests_share_one_producer(self) -> None:
        coordinator = self.make_coordinator()
        producer_started = threading.Event()
        release_producer = threading.Event()
        calls = 0
        results: list[tuple[dict, str]] = []

        def producer():
            nonlocal calls
            calls += 1
            producer_started.set()
            self.assertTrue(release_producer.wait(timeout=3))
            return {"scene": "shared"}

        def invoke():
            results.append(coordinator.generate("goal", "source", producer))

        first = threading.Thread(target=invoke)
        second = threading.Thread(target=invoke)
        first.start()
        self.assertTrue(producer_started.wait(timeout=3))
        second.start()
        release_producer.set()
        first.join(timeout=3)
        second.join(timeout=3)

        self.assertFalse(first.is_alive())
        self.assertFalse(second.is_alive())
        self.assertEqual(calls, 1)
        self.assertEqual({status for _scene, status in results}, {"miss", "shared"})
        self.assertEqual([scene for scene, _status in results], [
            {"scene": "shared"},
            {"scene": "shared"},
        ])

    def test_different_request_is_rejected_while_slot_is_busy(self) -> None:
        coordinator = self.make_coordinator()
        producer_started = threading.Event()
        release_producer = threading.Event()
        first_errors: list[Exception] = []

        def slow_producer():
            producer_started.set()
            self.assertTrue(release_producer.wait(timeout=3))
            return {"scene": "first"}

        def run_first():
            try:
                coordinator.generate("first", "", slow_producer)
            except Exception as exc:  # pragma: no cover - surfaced by assertion
                first_errors.append(exc)

        first = threading.Thread(target=run_first)
        first.start()
        self.assertTrue(producer_started.wait(timeout=3))

        with self.assertRaises(GatewayBusyError):
            coordinator.generate("second", "", lambda: {"scene": "second"})

        release_producer.set()
        first.join(timeout=3)
        self.assertFalse(first.is_alive())
        self.assertEqual(first_errors, [])


if __name__ == "__main__":
    unittest.main(verbosity=2)
