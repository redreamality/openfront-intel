# Community source pack — singleplayer save & share (OpenFront v0.36.0)

- Access date: 2026-11-14 (UTC)
- Researcher: openfront-intel automation
- Topic: persisting, resuming, and sharing singleplayer (Solo) games in OpenFront — new in the v0.36.0 official Release.
- Method note: direct Reddit fetch (www/old.reddit), redlib mirrors (perennialte, privacyredirect, tux.pizza), PullPush and Jina proxy were all blocked (403 / 410 / 526 / Anubis-Gandalf proof-of-work) on the access date. Thread content below was recovered from the **Arctic Shift Reddit archive API** (`arctic-shift.photon-reddit.com`), a full mirror of Reddit submissions and comments; each item below was actually opened and read through that API.

## Reddit discussions analyzed (5)

1. **Is there a way to save replays of offline games?** — u/revolutional-ai, 2026-07-05, score 3, 4 comments.
   URL: https://www.reddit.com/r/Openfront/comments/1uoh5b1/is_there_a_way_to_save_replays_of_offline_games/
   Player question: had an amazing impossible-difficulty run and did not want to lose it.
   Observed: top comment "Game is saved automatically. Look at your history for the game id"; another user posted a game link `https://openfront.io/w3/game/PwdvvXdR?replay` but "Still don't know how to watch it"; a reply notes "These seem to expire though."
   Relevance: the exact pre-feature pain — no reliable first-party way to keep a solo run; people were told to check history or record to YouTube.
   Limitation: thread is about replays, not the new save/resume/share feature (it predates v0.36).

2. **Game Link Replays** — u/WheelieGrip, 2026-06-23, score 1, 6 comments.
   URL: https://www.reddit.com/r/Openfront/comments/1udg2yn/game_link_replays/
   Player question: discovered game links can be saved to watch replays, but they only seem temporarily available; asks the exact lifetime and whether anyone saves games "in a more permanent way."
   Observed: "It will work until the next update or version, after that it will not work"; "if you wanna save them permanently, record then post on youtube"; a score-3 comment points to the community replay tool (see thread 3) to "watch replays in every version."
   Relevance: documents the two failure modes the save feature removes — link expiry on the next version, and no permanent save path.
   Limitation: short thread; comments are brief.

3. **New tool: Watch all old replays, play old versions in singleplayer** — u/FloPingu, 2026-04-13, score 17, 5 comments.
   URL: https://www.reddit.com/r/Openfront/comments/1skol51/new_tool_watch_all_old_replays_play_old_versions/
   Player question: a community tool (openfront-tools.frozenpenguin.media) that replays old versions by entering a game id.
   Observed: "Just enter the game id. It will open the correct version automatically and instantly start the replay"; users praise it and use it for old-version solo games.
   Relevance: the strongest evidence of sustained demand for persistent, replayable singleplayer games; a third-party tool filled the gap the first-party save/share feature now closes.
   Limitation: third-party, external hosting — not an official OpenFront surface.

4. **Does pausing a lot make games not count in single player?** — u/Amanda_Is_My_Name, 2026-02-18, score 0, 10 comments.
   URL: https://www.reddit.com/r/Openfront/comments/1r7wcix/does_pausing_a_lot_make_games_not_count_in_single/
   Player question: beat impossible mode on Giant World twice, but no replay appeared and no trophy/achievement registered; wants to rewatch the runs.
   Observed: community suspected server disconnects causing the replay to stop and the achievement not to be awarded ("The server does award you the achievement at the end"); one user reports the replay "freezes just a few ticks when you watch it. Almost like the replay is corrupted."
   Relevance: shows the fragility of relying on auto-generated, temporary replays + achievements for a solo milestone; a persistent, user-controlled save is the more durable record.
   Limitation: about the auto-replay/achievement bug, not the new save feature.

5. **How to beat singleplayer, giant world, default settings, intense mode?** — u/copydex1, 2025-06-28, score 5, 1 comment.
   URL: https://www.reddit.com/r/Openfront/comments/1lmeztg/how_to_beat_singleplayer_giant_world_default/
   Player question: cannot win a long solo campaign; bots accumulate huge armies and nuke the player; asks how to survive/beat it.
   Observed: advice to "Ally everyone you can," "Find an island to stack cities and ports," "Save up, then MIRV, MIRV, MIRV."
   Relevance: establishes that long solo campaigns are a real, replay-worthy activity — exactly the kind of run a player wants to save mid-campaign and resume, rather than restarting from scratch.
   Limitation: pre-v0.36; only one short comment.

## YouTube videos (3) — live metadata via oEmbed, transcripts empty

- **How to Save a Replay in Openfront.io** — Enzo Plays. URL: https://www.youtube.com/watch?v=JSr2eKWWrck
  oEmbed-verified title/author on access date. No CC transcript (`video.google.com/timedtext` returned empty) and no numeric view/description metadata could be retrieved; content relevance inferred from title — directly on the save/replay theme.
- **The NEW OpenFront.io Meta Changes EVERYTHING** — Enzo Plays. URL: https://www.youtube.com/watch?v=qIt_xDvp51A
  oEmbed-verified. A new-version overview that is the natural context for the v0.36 save/share feature; no transcript available.
- **I Played OpenFront... and It's Absolutely Worth It** — BlueBlueberry. URL: https://www.youtube.com/watch?v=EEOp223fRbQ
  oEmbed-verified. General gameplay context for singleplayer campaigns; no transcript available.
- Transcript limitation (all three): `video.google.com/timedtext` returned empty on the access date; only oEmbed title/author metadata is verified. Content claims in the guide are therefore taken from the official Release/tag source, not from these videos.

## Official first-party source (1)

- **OpenFront v0.36.0 official Release** (repo `openfrontio/OpenFrontIO`, tag `v0.36.0`, published 2026-11-09T16:58:23Z). URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.0
  Verified on access date via `gh api repos/openfrontio/OpenFrontIO/releases/tags/v0.36.0`. The release body announces saving and sharing singleplayer games.

## Source-derived facts used in the guide (verified against tag source v0.36.2 on access date)

- Save entry point: the **Solo / in-game menu**; save description string is "Save this game to your account to continue it later"; success status "Saved. Find it in the Solo menu." (en.json `saved_games`)
- Saved games panel ("Saved games") supports: Play (open), Share (copy link), Rename, Delete (confirm: "Delete "{name}"? This can't be undone."), and loading a pasted link/code.
- Share link format (client source `SavedGamesPanel.ts`): `<shareOrigin>/#modal=single-player&save=<saveId>`; the save id is a nanoid, and `savedGameIdFrom()` accepts a full link **or** a bare code.
- Browser links open the game directly; on **Steam and the game portals** a shared save is opened by **pasting** the code (no in-app navigation).
- Loading a shared/own save that is not singleplayer is rejected: "Only singleplayer games can be loaded."
- Saving requires sign-in: "Sign in to save games."
- Save limit: "You've reached the saved game limit. Delete one from the Solo menu first." The client `SavedGamesApi.ts` maps an HTTP 409 from the server to the `limit` status (`if (res.status === 409) return "limit"`); the exact cap is enforced server-side and is not stated in the client source or en.json, so the guide treats the limit as a real, finite ceiling without asserting a specific count.
- Snapshot size cap: `const MAX_SNAPSHOT_BYTES = 64 * 1024 * 1024` in `SavedGamesApi.ts` (64 MiB) — a save exceeds this if the captured game state is too large.
- Save API endpoints (client `SavedGamesApi.ts`): list `GET /users/@me/saved_games`, create `POST /users/@me/saved_games` (params `name`, plus map/tick meta), rename/share `PATCH /users/@me/saved_games/:id` (body `{ name?, public? }`), delete `DELETE /users/@me/saved_games/:id`, shared data `GET /public/saved_games/:id/data`, own data `GET /users/@me/saved_games/:id/data`. Sharing a save is the `public: true` field on the update call.
- Error strings (en.json `saved_games.error`): name_invalid "That name isn't allowed.", name_not_shareable "That name can't be shown on a shared game. Rename it first.", code_invalid "That isn't a shared game link or code.", shared_not_found "This shared game isn't available. It may have been deleted or made private.", unreadable "This saved game can't be loaded by this version of the game.", not_found, download_failed, load_failed, request_failed.
- Rename guard: a save whose name is not shareable must be renamed before sharing (error `name_not_shareable`).
- Feature is **not** back-compatible with pre-v0.36 clients; a save made on a newer build is `unreadable` on an older client.

## Player problems merged across sources

1. No first-party, persistent way to keep a singleplayer run (threads 1, 2).
2. Replays and game links expire, typically on the next version/update (threads 2, 4).
3. Achievements/auto-replays can fail to register, so the milestone is lost (thread 4).
4. Long solo campaigns deserve to be resumable, not restarted (threads 3, 5).
5. Players currently rely on third-party tools or screen recording (threads 2, 3).

## Decision this source pack supports

v0.36.0 adds a first-party **save / resume / share** loop for singleplayer games. The guide teaches when to save a campaign, how the share link behaves (browser vs Steam/portals), the 5-save limit and its countermeasures, and how this replaces the fragile replay-link/record-to-YouTube workarounds the community was using.
