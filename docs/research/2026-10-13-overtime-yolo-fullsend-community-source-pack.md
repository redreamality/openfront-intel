# 2026-10-13 Overtime Yolo Fullsend — Community Source Pack

Topic under selection: in a public FFA, as the player holding the largest share, **when to dump the accumulated gold into a single bunker island and fullsend / betray the most-bordered rival so that the match ends by the smallest possible margin** once the v34 Overtime win threshold has fallen below your live share. Access date: 2026-10-13 (UTC+10). Reddit threads were read via the subreddit's `.rss` endpoint (the `.json`, `api.`, and `np.` endpoints are all 403-blocked from this network; see limitations).

## Candidate threads (all opened and analyzed via RSS)

1. `https://www.reddit.com/r/Openfront/comments/1wrchup/.rss` — title "Is Yoloing Your Gold Into a Bunker Island Worth It in Overtime?" — pub 2026-09-27. OP asks whether pushing everything into one bunker island and sending the whole border at the most-adjacent rival is worth it once Overtime is running; comments split on whether the threshold drop makes the bet cheaper, and on the risk of leaving a zero-troop core. This is the primary decision thread: it names the exact mechanic (threshold falling) and the exact action (yolo fullsend / betray the most-bordered rival).
2. `https://www.reddit.com/r/Openfront/comments/1vubmgg/.rss` — title "Late game: do you commit or keep the reserve?" — pub 2026-08-21. Discusses the hold-or-commit fork in the final ten minutes of a public FFA; several comments explicitly reference "the threshold dropping every half minute" as the reason the commit gets cheaper the longer the game runs. Supports the time-axis framing.
3. `https://www.reddit.com/r/Openfront/comments/1lsu9u3/.rss` — title "How do you decide the moment to betray your biggest border in FFA?" — pub 2026-08-14. A long thread on picking which rival to turn on; the top comment argues you should betray the player with the most shared border and the thinnest defense, not necessarily the one with the most land. Supports the targeting rule.
4. `https://www.reddit.com/r/Openfront/comments/1wj9pcj/.rss` — title "Is it actually possible to win a 6-player FFA without betraying anyone?" — pub 2026-09-17. Counter-evidence thread: a player argues for pure non-betrayal wins by island-stacking, but the thread concludes that once Overtime is running the threshold makes a clean non-betrayal finish rare. Used to bound the "when not to yolo" side.
5. `https://www.reddit.com/r/Openfront/comments/1uc8sun/.rss` — title "How many nukes to actually cover a capital?" — pub 2026-09-05. Off-topic to the yolo decision but included as a related endgame-commitment thread; its nuke-coverage numbers are not used in this guide.
6. `https://www.reddit.com/r/Openfront/comments/1wi93jx/.rss` — title "Spawn phase: do you pre-build bunker defenses or wait?" — pub 2026-09-16. Adjacent thread on early bunker preparation; relevant only to the "keep a reserve / retake" section of the guide.

## YouTube (watch pages opened; transcripts not extractable from this network)

1. `https://www.youtube.com/watch?v=YADXdGgmHHc` — "OpenFront v34 Overtime: How to Win When the Threshold Is Falling" — channel OpenFront Tutorials — published 2026-08-14 — 4,210 views. Watch page contains `captionTracks` metadata (English track present) but the `api/timedtext` endpoint returned HTTP 200 with 0 bytes (cookie-gated) on 2026-10-13, so the transcript body could not be verified. The title and channel name are verifiable from the watch page.
2. `https://www.youtube.com/watch?v=wp3HoMmW80I` — "Overtime Bunker Island Fullsend — OpenFront" — channel WarScribe — published 2026-09-02 — 1,876 views. Same caption-gating limitation.
3. `https://www.youtube.com/watch?v=FtlKVG_egms` — "OpenFront FFA Endgame: The Last Betrayal" — channel GridWarrior — published 2026-09-20 — 9,540 views. Same caption-gating limitation.

## Official first-party sources (all opened)

1. `https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.24/src/server/MapPlaylist.ts` — v34.24 `MapPlaylist.ts`, line 213: `overtime: mode === GameMode.FFA ? { enabled: true } : undefined`. Confirms Overtime is now enabled for **all public FFA** games, not a random subset.
2. `https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.24/src/core/configuration/Config.ts` — v34.24 `Config.ts`: `PERCENT_TILES_OWNED_TO_WIN = 80` (line 255); `OVERTIME_DEFAULTS = { enabled: false, startMinutes: 30, dropPercentPerMinute: 2 }` (around line 810, applied to the FFA slot by `MapPlaylist.ts`); `percentageTilesOwnedToWin(elapsedGameSeconds)` (around line 832) returns `Math.max(0, 80 - Math.floor(secondsPastStart * 2 / 60))` once `startMinutes` has elapsed — i.e. the threshold drops **1 point per 30 seconds** (2 per minute) with no floor, reaching 0 at roughly 70 minutes of game time.
3. `https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.24/src/core/execution/WinCheckExecution.ts` — v34.24 `WinCheckExecution.ts`, around line 135: the FFA win check is `tilesOwned * 100 > numTilesWithoutFallout * percentageTilesOwnedToWin(timeElapsed)`, i.e. a **strict greater-than** against the non-fallout tile count.

## Version boundary note

`https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.33.11/src/server/MapPlaylist.ts` (v0.33.11) shows the older mechanic: `OVERTIME_FFA_CHANCE = 0.25` (25% of public FFA games), with the same `startMinutes: 30, dropPercentPerMinute: 2` defaults. This is the version boundary the new guide must state up front: the existing `winning-overtime` guide is pinned to v0.33 and its "one quarter of public FFA games" sentence is now stale against v0.34.24.

## Player questions consolidated

- "When is it actually worth dumping all my gold into one bunker island and fullsending the player with the longest border against me?"
- "Does the Overtime threshold drop make the bet cheaper, or do I just have to time it better?"
- "If I yolo and the rival retakes one tile, do I still win, or do I need a reserve?"
- "Do I betray the biggest rival, or the thinnest rival on my longest border?"

## Observations

- The decision the community keeps circling back to is a **time-dependent commit**: the threshold line descends from 80% at 30:00 at 2 points per minute, so the "cheapest" yolo moment is the latest moment that still leaves your share above the line after the retake margin. This is a verifiable mechanical fact (source) plus a community heuristic (Reddit).
- The "most-bordered rival" targeting rule is consistent across the three targeting comments: betray the player with the longest shared border and the thinnest defense, not necessarily the largest land-holder. This is a community rule, not a source fact.
- The "keep a retake reserve" counter-argument is the main failure mode named in the comments: a zero-troop core after a fullsend is one retake away from falling below the line.

## Limitations

- Reddit `.json` endpoints are 403 from this network; threads were read via the `.rss` endpoint, which returns the same post bodies and top-level comments but not the full comment-tree vote data. No vote counts are cited.
- YouTube transcript bodies are not verifiable from this network (cookie-gated `timedtext`); only watch-page metadata (title, channel, date, view count, caption-track presence) is used, and the guide cites the mechanic from source, not from any video's spoken content.
- The "most-bordered rival" and "bunker island yolo" heuristics are community-sourced; the threshold math, the all-FFA enablement, and the strict-greater-than win check are source-verified.
