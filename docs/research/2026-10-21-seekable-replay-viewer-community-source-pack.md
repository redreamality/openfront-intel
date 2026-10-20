# Seekable Replay Viewer — Community Source Pack

- Date: 2026-10-21
- Slug: `seekable-replay-viewer`
- Topic: the v0.35.0 seekable replay viewer — enabling the opt-in **New Replay Viewer**, opening a finished game, seeking/speeding up playback, and how the viewer processes, verifies, and stores replays in the browser.
- Access date: 2026-10-21 (all URLs opened and analyzed on this date).
- Note on Reddit access: direct `curl` of `*.json` was blocked by Reddit's edge, so thread metadata and top comments were pulled through the PullPush archive API and cross-checked against the rendered `old.reddit.com` pages. The observations below are grounded in the recovered selftext and top-level comment bodies.

## Reddit discussions (3)

### 1. "Replays" — r/Openfront
- URL: https://www.reddit.com/r/Openfront/comments/1k1g5zm/replays/
- Posted: 2025-04-17 (pre-v0.35.0). Score 3, 1+ comments.
- Player question: "Hey, any chance we'll get replays with some future updates?"
- Observed: a comment asks for a "skip to time" feature; another points out that replays already exist (re-open a finished game by URL or Join Lobby and it replays for you). This is the direct demand the v0.35.0 seekable viewer answers — the "skip to time" wish becomes the arrow-key seek.
- Relevance: establishes the long-standing community wish for a seekable/skippable replay, and the baseline behavior (join a finished game to re-run it) that the new viewer supersedes.
- Limitations: small thread (1 substantive comment), so it is a signal of intent, not a usage report; no screenshot of a replay was attached.

### 2. "Can I see replays from older versions?" — r/Openfront
- URL: https://www.reddit.com/r/Openfront/comments/1oozpdh/can_i_see_replays_from_older_versions/
- Posted: 2025-11-05. Score 3.
- Player question: watched an "amazing" two-hour game and wanted to review it the next morning, but a site update landed and the replay no longer opened on the main site.
- Observed: a top comment explains that `blue.openfront.io` keeps a record one update behind the main site, so an old match can still be watched there "temporarily." This is exactly the versioned-shell / build-mismatch boundary that the v0.35 viewer's docs describe: a record only replays on the build that played it, and other-build records are routed to `replay.<domain>/<gameID>`.
- Relevance: a real, recurring pain point (a great game becomes unreviewable the moment the site advances a version) that the viewer's build-check + versioned-shell design directly targets. It also motivates the guide's version-boundary and failure-mode sections.
- Limitations: the workaround (`blue.openfront.io`) is explicitly temporary; the thread does not discuss seeking, only availability across versions.

### 3. "The 'Catching up...' thing at the top is annoying, please remove it" — r/Openfront
- URL: https://www.reddit.com/r/Openfront/comments/1s061ly/the_catching_up_thing_at_the_top_is_annoying/
- Posted: 2026-03 (created 2026-03-18). Score 0, 3+ comments.
- Player question: the "Catching up..." banner during live play is frustrating — they want an instant catch-up, or at least 2x/20x catch-up speed.
- Observed: a highly-rated comment explains the deterministic-simulation model: the server sends the actions performed, and the local machine simulates the game, so a lagging client literally has to re-run the missed ticks. Other comments say the limitation is a core-engine constraint, not a toggleable option, and that it is "a side effect of the core engine." One commenter reports it most on Baikal team maps.
- Relevance: this is the clearest community articulation of *why* catch-up/seek speed matters, and it frames the mental model the guide must teach: OpenFront replays are a deterministic re-simulation, so a "jump to a time" is not free video seeking but a deterministic re-run that the viewer has pre-processed once so every later seek is a cheap ~20 ms hop. It also separates live-play catch-up (a server/latency behavior) from replay seeking (a local, already-processed timeline) — a distinction the guide makes explicit.
- Limitations: the thread is about live-play latency, not the replay viewer per se; the connection to the viewer is the shared deterministic-simulation model and the desire for faster forward movement. The player is not reporting the viewer specifically.

## YouTube videos (3)

### 1. "How to Save a Replay"
- URL: https://www.youtube.com/watch?v=JSr2eKWWrck
- Opened: 2026-10-21. Description/title: a short how-to on saving an OpenFront replay.
- Observed: the video walks through getting a shareable/savable record of a finished match — the entry point for anything a seekable viewer later consumes. It confirms that the community workflow is (1) finish a game, (2) keep its record/link, (3) review it.
- Relevance: anchors the "open a finished game and keep its record" step of the guide and corroborates that saving a replay is a real, separately-taught skill players ask about.
- Limitations: it predates the v0.35 seekable viewer, so it does not show the arrow-key seek or speed menu; it is used for the save/keep step, not for the seek feature.

### 2. Replay heatmap / tooling walkthrough
- URL: https://www.youtube.com/watch?v=mcEm3WA4kUU
- Opened: 2026-10-21. Title/description: a replay-analysis/heatmap-style tool walkthrough for OpenFront matches.
- Observed: a third-party analysis workflow that sits on top of a recorded match, showing players re-open a game and study spatial/aggregate data rather than scrub a live feed.
- Relevance: demonstrates the broader "review after the fact" culture that the seekable viewer serves — once a record can be re-opened and scrubbed, tooling can be layered on it. It also surfaces the common need to jump around a match instead of watching it linearly, which is the core value of the seek feature.
- Limitations: the specific tool is external and not part of the official client; used as context for review culture, not as a source for the viewer's controls.

### 3. OpenFront 3D replay (short)
- URL: https://www.youtube.com/watch?v=lGm-M1KP6ug
- Opened: 2026-10-21. Title/description: a short-format clip of a match replay rendered in 3D.
- Observed: a replay of a finished match shown out-of-order (the clip jumps between key moments), reinforcing that players want to land on the decisive seconds rather than watch the whole match.
- Relevance: a concrete, verifiable example of replay content being consumed non-linearly, which is the product the v0.35 seekable viewer formalizes in the official client with a timeline, seek, and speed controls.
- Limitations: a short/clip, so it does not show the official viewer's settings toggle or keyboard shortcuts; it is evidence of demand for jump-to-moment replay viewing, not documentation of the feature.

## OpenFront official first-party sources (facts grounded here, not in community posts)

- v0.35.0 Release (Replay viewer section, official release body): https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0 — "Replays can seek. The game is processed once in your browser, then any point on the timeline is a ~20 ms jump. Finished games open in the viewer from the game history. (Disabled by default, we'll roll it out over the next week or so)." Also lists seek verified against the hashes the live clients recorded, playback keys ignored behind settings, unverified replays flagged, and the replay worker shrinking from 815 KB to 340 KB.
- Replay architecture doc at the v0.35.2 tag: https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/docs/Replays.md — authoritative source for the processing pipeline (open → build check → process on the engine worker → play while processing → store in IndexedDB `openfront-replays`), the ~70 s / ~24 MB benchmark for a 26-minute 25-player game, hash cadence (every 10 turns multiplayer / every 100 singleplayer), the 256 MB cap with LRU eviction, and the versioned-shell routing for other-build records.
- Replay store limit at the v0.35.2 tag: https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/src/client/replay/ReplayStore.ts — `MAX_STORED_BYTES = 256 * 1024 * 1024` (256 MB), and the stored-replay shape (record with nuke impacts and dead units packed and gzipped).
- Setting toggle at the v0.35.2 tag: `src/client/UserSettings.ts` (`replayViewer()` reads `settings.replayViewer`, default `false`) and the label/description in `resources/lang/en.json` — "New Replay Viewer" / "Open replays with rewind controls. Off opens the classic replay."
- Controls and tick rate at the v0.35.2 tag: `src/client/replay/ReplayControls.ts` (`SPEEDS = [0.5, 1, 2, 4, 8, 16, 32]`) and `src/client/replay/ReplayPlayback.ts` (`TICKS_PER_SECOND = 10`); keyboard handling in `src/client/replay/ReplayViewer.ts` (Space = play/pause, ArrowRight/ArrowLeft = seek ±1 frame, ±100 with Shift).

## Rules / numbers / version boundary — where they were verified

- Seek is a ~20 ms jump after a one-time in-browser processing pass: v0.35.0 release body + `docs/Replays.md`.
- 256 MB storage cap, LRU eviction, IndexedDB `openfront-replays`, keyed by game ID + build + `REPLAY_VERSION`: `ReplayStore.ts` + `docs/Replays.md` storage table.
- Opt-in by default; `#replay-viewer=<gameID>` link opens the viewer regardless of the setting; setting off falls back to the classic replay: `docs/Replays.md` + `UserSettings.ts` + `Main.ts` fallback path.
- Tick rate 10/s, speed menu 0.5–32x, keyboard seek ±1/±100 frames: `ReplayPlayback.ts`, `ReplayControls.ts`, `ReplayViewer.ts`.
- Build-only determinism and versioned-shell routing for other-build records: `docs/Replays.md` (build-check step) + the Reddit thread #2 corroboration.
- Unverified replays (no recorded hashes) are flagged and not kept in storage: `ReplayViewer.ts` (`unverified` state, `!hasRecordedHashes(record)`, and the `if (complete && !this.unverified)` store guard).

## Limitations and caveats

- Community threads predate (1k1g5zm) or run parallel to (1oozpdh, 1s061ly) the v0.35.0 viewer; they are used for intent, pain points, and the deterministic-simulation mental model, never for the viewer's specific control values.
- No thread provides a quantitative seek-latency report from a player; the ~20 ms figure comes from the official release body and docs, not from a player.
- The third Reddit thread is about live-play "Catching up…" latency, not the viewer; its value here is the deterministic-simulation explanation that the guide builds on, so it is framed as an adjacent-signal source, not direct viewer feedback.
- YouTube sources are used to corroborate the save/review/jump-to-moment culture and the entry-point workflow; none documents the official toggle or keyboard shortcuts, so all control facts are grounded in the v0.35.2 source and the v0.35.0 release.
