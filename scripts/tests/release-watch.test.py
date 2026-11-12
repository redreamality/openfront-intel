import importlib.util
import json
import subprocess
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

SPEC = importlib.util.spec_from_file_location(
    "release_watch", Path(__file__).resolve().parents[1] / "openfront-release-watch.py"
)
WATCH = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(WATCH)


class ReleaseWatchTests(unittest.TestCase):
    def test_interrupted_run_cannot_dirty_user_checkout_or_the_next_run(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            repo, first, second = root / "repo", root / "run-one", root / "run-two"
            repo.mkdir()

            def git(*args):
                return subprocess.check_output(
                    ["git", "-C", str(repo), *args], stderr=subprocess.STDOUT
                )

            git("init", "--quiet")
            git("config", "core.autocrlf", "false")
            (repo / "page.mdx").write_bytes(b"published\n")
            git("add", "page.mdx")
            git("-c", "user.name=Fixture", "-c", "user.email=fixture@example.test",
                "commit", "--quiet", "-m", "baseline")
            (repo / "page.mdx").write_bytes(b"user staged edit\n")
            git("add", "page.mdx")
            (repo / "page.mdx").write_bytes(b"user unstaged edit\n")
            (repo / "user-note.txt").write_bytes(b"untracked user note\n")
            before = (git("diff"), git("diff", "--cached"), git("status", "--porcelain"))
            git("worktree", "add", "--quiet", "-b", "codex/run-one", str(first), "HEAD")
            (first / "page.mdx").write_bytes(b"interrupted release draft\n")
            # No cleanup/checkpoint: emulate termination between edit and commit.
            git("worktree", "add", "--quiet", "-b", "codex/run-two", str(second), "HEAD")
            self.assertEqual((second / "page.mdx").read_bytes(), b"published\n")
            self.assertEqual(subprocess.check_output(
                ["git", "-C", str(second), "status", "--porcelain"]
            ), b"")
            self.assertEqual((first / "page.mdx").read_bytes(), b"interrupted release draft\n")
            self.assertEqual((repo / "page.mdx").read_bytes(), b"user unstaged edit\n")
            self.assertEqual((repo / "user-note.txt").read_bytes(), b"untracked user note\n")
            self.assertEqual(before, (git("diff"), git("diff", "--cached"), git("status", "--porcelain")))

    def test_formal_release_ignores_test_and_prerelease_and_uses_publication_time(self):
        releases = [
            {"tag_name": "v0.99.0", "name": "TEST", "body": "TEST", "published_at": "2026-11-12T00:00:00Z"},
            {"tag_name": "v0.37.0-beta1", "prerelease": True, "published_at": "2026-11-12T00:00:00Z"},
            {"tag_name": "v0.36.1", "published_at": "2026-11-10T02:14:08Z"},
            {"tag_name": "v0.36.2", "published_at": "2026-11-11T22:09:39Z"},
        ]
        self.assertEqual(WATCH.latest_formal_release(releases)["tag_name"], "v0.36.2")
        with self.assertRaises(ValueError):
            WATCH.latest_formal_release(releases[:2])

    def test_dirty_repo_and_interrupted_draft_do_not_stop_monitoring_or_change_files(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            repo, cache = root / "repo", root / "cache"
            repo.mkdir()
            subprocess.run(["git", "init", "--quiet", str(repo)], check=True)
            draft = repo / "draft.mdx"
            draft.write_bytes(b"unfinished task\n")
            baseline = subprocess.check_output(["git", "-C", str(repo), "status", "--porcelain"])
            responses = [
                [{"tag_name": "v0.36.2", "published_at": "2026-11-11T22:09:39Z"}],
                {"sha": "a" * 40},
                {"content": WATCH.base64.b64encode(
                    b"export const latestOpenFrontRelease = defineOpenFrontRelease('v0.35.10');"
                ).decode()},
            ]
            with patch.object(WATCH, "github", side_effect=responses) as api:
                report = WATCH.run_watch(repo, cache, "redreamality/openfront-intel")
            self.assertEqual(api.call_count, 3)
            self.assertTrue(report["needsContentUpdate"])
            self.assertEqual(report["releaseTag"], "v0.36.2")
            self.assertEqual(report["siteTag"], "v0.35.10")
            self.assertTrue(report["sourceDirty"])
            self.assertEqual(draft.read_bytes(), b"unfinished task\n")
            self.assertEqual(baseline, subprocess.check_output(
                ["git", "-C", str(repo), "status", "--porcelain"]
            ))
            saved = json.loads((cache / "release-watch.json").read_text())
            self.assertEqual(saved["releaseTag"], "v0.36.2")

    def test_failed_network_keeps_last_successful_cursor(self):
        with tempfile.TemporaryDirectory() as tmp:
            cache = Path(tmp)
            previous = b'{"releaseTag":"v0.36.1"}\n'
            (cache / "release-watch.json").write_bytes(previous)
            with patch.object(WATCH, "github", side_effect=RuntimeError("network unavailable")):
                with self.assertRaises(RuntimeError):
                    WATCH.run_watch(cache, cache, "owner/repo")
            self.assertEqual((cache / "release-watch.json").read_bytes(), previous)

    def test_network_failure_retries_only_once(self):
        failed = subprocess.CompletedProcess(["gh"], 1, "", "network unavailable")
        with patch.object(WATCH.subprocess, "run", return_value=failed) as command:
            with self.assertRaises(RuntimeError):
                WATCH.github("repos/openfrontio/OpenFrontIO/releases?per_page=10")
        self.assertEqual(command.call_count, 2)


if __name__ == "__main__":
    unittest.main()
