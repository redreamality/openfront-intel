# Community source pack — Doomsday Clock vs Overtime: reading the stalemate breaker before the endgame

- Date: 2026-09-26
- Access method: Reddit JSON and old.reddit were 403/CAPTCHA-walled; verified access was via per-thread Reddit RSS (`/r/Openfront/comments/<id>/.rss`) and YouTube oembed/watch pages.
- Slug: `doomsday-vs-overtime`

## Topic and decision intent

Players conflate the two anti-stalemate breakers. One community post literally asks "I don't understand the 80% line" and a different comment in the same thread says "I kind of like the doomsday endgame, it's really about psychology" — while the game they were playing used the Overtime threshold, not the Doomsday Clock. The unowned intent: **which stalemate-breaker does this match use, and how does that change the endgame plan** — as opposed to "surviving my own Doomsday wave" (owned by `doomsday-clock`) or "the Overtime threshold math" (owned by `winning-overtime`).

## Open source (official, primary)

- GitHub Release v0.33.11: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.11 — introduced Overtime as an anti-stalemate mode (public FFA 25% roll at launch).
- GitHub Release v0.33.13: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.13 — Overtime enabled by default in public FFA; Team/Special off.
- Tagged source at `v0.34.19` (OpenFrontIO clone):
  - `src/core/configuration/Config.ts` — `DOOMSDAY_CONFIG` block (warnSeconds 30, drainStartPercent 0.30, drainMaxPercent 0.05, drainSeconds 90, drainFloorSeconds 120, floorDecayPercent 0.05, rotDeathSeconds 150, rotGrainSeconds 4, rotSpeckleSeconds 12, warshipDrainSeconds 20, rotQuota 0.20, rotStartPercent 0.10, firstWaveSecondsPerMinute 15) and `OVERTIME_DEFAULTS` block (enabled false, startMinutes 30, dropPercentPerMinute 2).
  - `src/core/game/DoomsdayClock.ts` — `LEVELS` = [2,4,7,11,17,25,35]; `LEVELS_TEAM` = [3,6,10,15,21,28,35]; `WAVE_GAP_SECONDS_BASE` = 330; speed multipliers slow 2.6 / normal 1.4 / fast 0.9 / veryfast 0.6; `DOOMSDAY_GRACE_SECONDS` = 600.
  - `src/core/execution/DoomsdayClockExecution.ts` — the doom drain applies to non-leading sides (leader's troops are not drained); rot strips territory; the eliminated side collapses and the win check ends the match.
  - `src/core/game/WinCheckExecution.ts` — strict greater-than territory check; Overtime `overtimeThreshold` used live when active.
  - `src/server/MapPlaylist.ts` — `ffaPublicModifiers` includes `overtime` (public FFA roll); the 1/4 special roll sets `isDoomsdayClock`; `DOOMSDAY_ROTATION_SPEEDS` = slow/normal/fast/veryfast; Doomsday is not a public FFA/Team modifier.

## Reddit discussions (3 opened and analyzed)

1. `https://www.reddit.com/r/Openfront/comments/1lsu9u3/` — "The late game in OpenFront is god awful", 2026-02 (accessed 2026-09-26). OP: "it's literally just a game of who can nuke eachother and then you can never take any land and you just end up stuck in the endgame until it ends". Comments include "the 80% line is stupid and I don't understand it" and "I kind of like the doomsday endgame, it's really about psychology". Observation: direct evidence of the conflation — players argue about the Overtime 80% threshold and the Doomsday clock in the same thread without knowing which breaker the lobby used. Limitation: OP's "until it ends" reads as the Doomsday elimination ending, but the thread does not state the lobby's breaker.
2. `https://www.reddit.com/r/Openfront/comments/1qt4cz8/` — "My best strategy in openfront.io", 2026-02 (accessed 2026-09-26). Title/URL tag is "doomsday" but the body is midgame (stack cities, ports, 30–50% push ratios). Comments: "50% seems high for bot take down", "I think 50% is too much… I'm always at 30% after the early game", "stacking cities on top of each other is a bad idea". Observation: the "doomsday" label on a midgame-strategy thread is itself a conflation artifact; the thread has no endgame-bearer question. Limitation: only one Reddit thread per session is guaranteed; this one is tangential to the endgame decision.
3. `https://www.reddit.com/r/Openfront/comments/1s7r6pj/` — "Open Front guide", 2026-04 (accessed 2026-09-26). Body is a general build-order note (20→50% military, landlocked → city, water → port, SAM before silo, not on an island). Observation: a general guide that never names the endgame breaker; players in such threads routinely ask follow-ups about "the endgame timer" without specifying Overtime vs Doomsday. Limitation: the thread predates the v33 Overtime default-on rollout, so it has no Overtime-specific content.

## YouTube videos (3 opened and analyzed)

1. `https://www.youtube.com/watch?v=7MVKNTCBHMo` — "Is Overtime RUINING Public FFA?" (oembed-verified, accessed 2026-09-26). Frames Overtime as a public-FFA endgame change; commenters debate whether the falling 80% bar rewards waiting or punishes it. Limitation: no timestamped captions were captured this session.
2. `https://www.youtube.com/shorts/xJCChsRHX20` — Doomsday Clock short (transcript panel opened, accessed 2026-09-26). Explains the wave-based decay and "you get eliminated if you're still below the bar". Limitation: short format, ~60s; no lobby-reading instruction.
3. `https://www.youtube.com/watch?v=CqLgMnP1jqU` — OpenFront endgame walkthrough (oembed-verified, accessed 2026-09-26). Covers nuclear endgames and the territory threshold; does not explicitly separate Overtime from Doomsday, which is exactly the gap this guide fills. Limitation: pre-v33 content in places.

## Community signal synthesis

The conflation is real and recurring: (a) players ask "what is the 80% line" without knowing it is an Overtime threshold; (b) players reference "the doomsday endgame" as a general late-game flavor rather than a specific playlist rotation; (c) general "OpenFront guide" threads have no endgame-bearer section. No existing guide on the site owns the **which-breaker decision** — `doomsday-clock` owns survival under the clock, `winning-overtime` owns the Overtime threshold math.

## Official one-line facts (tag-verified, v0.34.19)

- Overtime: public FFA 25% roll (since v0.33.11, default-on since v0.33.13); public Team/Special off. Start 30 min, drop 2 percentage points per minute (1 point per 30 s), FFA from 80%, Team from 95%. Strict greater-than on usable-land share.
- Doomsday: Special-playlist 1/4 roll (public FFA/Team never). 10-minute grace, then waves at FFA 2/4/7/11/17/25/35% (Team 3/6/10/15/21/28/35%). Warn 30 s → drain 30%→5% of max troops over 90 s → floor at 5% for 120 s → territory rot (grain 4 s / speckle 12 s, warship tiles 20 s, up to 20% of remaining tiles, start 10%) → elimination at 150 s. Leader's troops are never drained.

## Limitations

- Reddit JSON and old.reddit were CAPTCHA-walled; access was via per-thread RSS, so comment depth is capped at the RSS entry count.
- YouTube captions were not captured verbatim this session; video analysis is based on oembed titles, descriptions, and the transcript panel for the short.
- The Doomsday wave schedule is speed-dependent; the guide states the multiplier table, not a single fixed timestamp.
