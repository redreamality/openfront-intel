# Community source pack — small-economy-spawn-boost

Topic: v0.35.0 per-player "small economy" spawn boost (ports and factories)
Accessed: 2026-10-20
Locale: en

## Access method note

Direct `https://www.reddit.com` and `https://old.reddit.com` requests (curl,
browser, `.json` endpoints) returned a "You've been blocked by network security"
anti-bot page from this network. All Reddit content below was retrieved from the
`api.pullpush.io` mirror (public read-only archive of the public Reddit JSON API)
using the same thread `link_id`, which returns the same post and comment bodies.
Video subtitles and metadata were retrieved with `yt-dlp` from YouTube directly;
no proxy was needed.

## Official primary sources (rules, numbers, version boundary)

1. Official v0.35.0 release notes (GitHub Release, non-prerelease, 2026-10-11)
   - URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0
   - Commit/tag: `v0.35.0` (`dfd420fd7836ae023504a9440d9d68897745b7b4`)
   - What was read: the "Meta Changes" section, which states, verbatim in part:
     "Trade ships and trains spawn faster in the early game, giving the first
     minutes of the match more to work with. The boost fades once you have
     several ports or factories, so the late game is unchanged."
   - Used for: the version boundary (introduced in v0.35.0), the qualitative
     framing (early-game only, late game unchanged), and the two named effects
     (trade ships and trains both affected).

2. v0.35.2 tag source, `packages/engine/src/configuration/EngineConfig.ts`
   - URL (file view): https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/packages/engine/src/configuration/EngineConfig.ts
   - Tag: `v0.35.2` (latest non-prerelease release as of 2026-10-17)
   - What was read: the full `smallEconomySpawnBoost`, `trainSpawnRate`,
     `tradeShipSaturation`, and `tradeShipSpawnRate` function bodies plus their
     doc comments, and a `git diff v0.35.0..v0.35.2` on this file (zero hunks —
     the file is byte-identical between v0.35.0 and v0.35.2).
   - Exact formula read: `smallEconomySpawnBoost(levels) = 1` when `levels <= 0`,
     else `1 + (0.5 * within((6 - levels) / 5, 0, 1)) / levels`, where
     `within(v,min,max) = Math.min(max, Math.max(min, v))`. Doc comment, verbatim
     in part: "Per-unit spawn multiplier for a player's first few ports or
     factories (counted in levels) ... 1.5x at 1 level, fading out by 6 levels.
     Additive, so total spawns still rise with every level built. Keyed on the
     player rather than game time or the world fleet, so it works the same in
     every lobby size and doubles as a comeback boost."
   - For `tradeShipSpawnRate`, read: `boost = this.smallEconomySpawnBoost
     (playerPortLevels)`, `base = 100 / (boost * boost)`, and the doc-comment
     line: "The pity timer square-roots odds changes, so squaring the boost
     makes it the realized ship multiplier (1 port level: one every ~8s, not
     ~12s)."
   - For `trainSpawnRate`, read: `rate = (numPlayerFactories + 10) * 15` and
     `boost = this.smallEconomySpawnBoost(numPlayerFactories)`, applied as
     `rate / (trainSaturation * boost)` (not squared).
   - Used for: the exact formula, the level-1 to level-6 decay values, the
     "squaring" detail for trade ships, the "not squared" detail for trains, and
     the per-player vs global distinction (the function takes a per-player
     level count, `playerPortLevels` / `numPlayerFactories`, not a world-wide
     fleet count).

3. v0.34.25 tag source, `src/core/configuration/Config.ts`
   - URL (file view): https://github.com/openfrontio/OpenFrontIO/blob/v0.34.25/src/core/configuration/Config.ts
   - Tag: `v0.34.25` (last v34.x non-prerelease release)
   - What was read: the v34 `tradeShipSaturation` body, which carried a
     fleet-size boost term `1 + 0.45 * exp(-numTradeShips / 120)` multiplied into
     the saturation value, and a `tradeShipSpawnRate` that did NOT take a
     per-player port/factory level argument at all — the boost there was keyed on
     the total world trade-ship count, not on any individual player's economy.
   - Used for: the "what changed" comparison — the v34 boost was global
     (fleet-size-keyed) and applied to the saturation denominator, while the
     v0.35 boost is per-player (level-count-keyed) and applied as a
     squared multiplier for ships / unsquared multiplier for trains.

## Reddit threads opened and analyzed

Method: `https://api.pullpush.io/reddit/search/comment/?link_id=<id>&size=25`
and `.../submission/?link_id=<id>&size=1` for each thread, fetched 2026-10-20.
All three are in r/Openfront.

### R1 — "Capturing Trade Ships"
- URL: https://www.reddit.com/r/Openfront/comments/1sqygpx/capturing_trade_ships/
- Link id: `1sqygpx`
- Relative recency: recent (post-2025 thread, active into 2026 based on
  comment timestamps in the pullpush record)
- Player question: under what exact conditions can a warship capture (pillage)
  a trade ship, and why do some red ships resist capture
- What was observed (verbatim snippets, scores as recorded by pullpush):
  - Top comment (u/GotchaMcFee, score 6): "It has to originate from an enemy and
    be going to an enemy's port. If you have allied either the start or the
    finish you cannot capture. Besides that, it's all free game. On island maps
    this means you pretty much have to avoid all alliances if you want to be a
    successful pirate."
  - A longer community-answer post (u/Queasy_Leadership_33) restates the rule
    step by step ("Why is it Red?" / "The Capture Criteria" structure),
    confirming the same enemy-origin/enemy-destination condition.
  - Multiple independent comments (u/severelyracistkurd, u/Abject-Explorer-3637)
    independently arrived at the same rule, indicating this is the settled
    community understanding, not one user's guess.
- How it is used in the guide: not a primary source for the boost formula (the
  boost is not discussed in this thread), but used to frame the adjacent
  decision the guide must make compatible with: a faster-earning early
  trade economy (from the boost) is only as valuable as your ability to keep
  those routes open, and capture/pillage eligibility is the community's
  working model for when a route is safe. Cited for the "route safety is a
  precondition for the boost to actually pay you" argument, not for any
  numeric spawn figure.
- Limitations: the thread predates v0.35.0 and makes no mention of the spawn
  boost; it is used only for the route-safety framing, never as evidence for
  the mechanic itself.

### R2 — "How do you all plan your early game?" (strategy/early-game thread)
- URL: https://www.reddit.com/r/Openfront/comments/1nh9m9b/how_do_you_all_plan_your_early_game/
- Link id: `1nh9m9b`
- Relative recency: mid-2025 thread, active for several months
- Player question: how should a player balance troop growth, land capture, and
  early economy in the opening minutes
- What was observed:
  - The highest-scored substantive comment (u/Blubbertube, score 12) argues
    there is no objectively correct early plan; the real constraint is that
    every other player is also racing for the same land, so the "correct"
    answer is a balance between a reasonable growth rate and a reasonable
    amount of land, and that this balance has to be re-evaluated every turn.
  - u/7sidedmarble (score 4) describes the game as "broken up into different
    phases" and explicitly names snowballing as the dominant dynamic: "if you
    screw up early, you may as well quit cause your odds of turning it around
    are basically zero."
  - A cluster of lower-score comments (u/ObligatoryContrast, u/EmploymentSudden
    2129, u/Primary_Gap9388, among others) each give a slightly different
    personal click-timing / attack-percentage recipe for the opening, with no
    consensus — this is consistent with the top comment's "no objectively
    correct answer" claim.
- How it is used in the guide: this thread supplies the community's own mental
  model for why the opening minutes matter (phase-gated, snowball-dominant),
  which is exactly the decision context the v0.35 boost changes: if the early
  window is where the snowball is won or lost, then a mechanic that makes the
  first few ports/factories meaningfully faster is a direct intervention in
  the thing this thread says decides the game. Used for framing the "why this
  matters" section, not for any numeric spawn figure.
- Limitations: predates v0.35.0; no comment in the thread mentions the spawn
  boost, because the mechanic did not exist yet. Used only for the
  early-game-structure framing.

### R3 — "Feedback on the game" (r/Openfront feedback thread)
- URL: https://www.reddit.com/r/Openfront/comments/1qijsjo/feedback_on_the_game/
- Link id: `1qijsjo`
- Relative recency: recent (2026)
- Player question: open feedback thread on game state, performance, and
  suggested changes
- What was observed:
  - u/-selfency- (score 15) notes performance/lag at larger fleet counts and,
    in the same comment, that "the recent trade improvements in the dev branch
    are amazing" — the only comment in the thread that directly references
    trade-system performance changes, and it is positive about them.
  - A developer (u/kappalew) replies multiple times in-thread to specific
    complaints (teaming, notification quality, nation-bot count), including
    "We have implemented some fixes to that. The logic that governs them was
    completely overhauled in the last patch but as such it needs a few fine
    tuning. As a whole it is a lot better than the old version and a lot less
    laggy" — confirming the developer's own characterization that the trade
    system was "completely overhauled" recently.
  - u/Crinkez raises a complaint about "endless pointless trade
    notifications" in the context of watching gameplay, which is the first
    indirect community signal that trade ships/trains have become a more
    prominent part of what players are watching for in recent builds.
- How it is used in the guide: this is the one community thread that directly
  corroborates the developer's own framing ("completely overhauled", "recent
  trade improvements ... are amazing"), which matches the v0.35.0 release
  notes' "Meta Changes" language. Used as the community-side confirmation that
  the trade-economy rework was a large, felt change, not a small number tweak —
  supporting the guide's framing that this is a decision-changing update rather
  than a minor balance patch. Not used for any numeric spawn figure.
- Limitations: the thread does not quote the exact boost formula or its level
  decay; the "completely overhauled" language is a developer characterization,
  not a numeric claim, and is used only to support the "this is a big change"
  framing, never for the formula itself.

## YouTube videos opened and analyzed

All three were opened via `yt-dlp` metadata (title, upload date, channel,
length, view count) on 2026-10-20. One subtitle track (English) was retrieved
in full and read (video Y1); the other two (Y2, Y3) were verified accessible
with full metadata and the standard auto-caption endpoint (caption availability
confirmed, transcript not read in full this session due to rate limits on
subtitle download, and are cited on that basis).

### Y1 — "The Ultimate Openfront.io Beginner's Guide"
- URL: https://www.youtube.com/watch?v=8bxcAsJJXJg
- Channel: Enzo Plays
- Uploaded: 2025-02-23
- Length: 21:16, 104,912 views
- English auto-subtitle track: retrieved in full (224 KB VTT) and read this
  session
- Player question: complete beginner walkthrough — first minutes, first
  buildings, first economy
- What was observed: the video walks the viewer through the standard
  beginner path (initial troops, first land grabs, first economic structures)
  with specific timing cues. It predates v0.35.0 and therefore describes the
  v34-era early-game pacing.
- How it is used in the guide: as the "what players have been taught so far"
  baseline — a beginner guide published in February 2025 is the reference
  document a new player is most likely to have followed, and it does NOT
  mention any per-player spawn boost, because that mechanic did not exist. This
  gap is itself evidence: the guide is needed precisely because the most
  popular beginner content out there has no section on the v0.35 early-economy
  window at all. Cited to establish the information gap, not for any numeric
  spawn figure.
- Limitations: predates v0.35.0; no section of the video covers the spawn boost.

### Y2 — "OpenFront Beginner Guide (2026) | How to Win Your First Games"
- URL: https://www.youtube.com/watch?v=7J5zwb_s_Cg
- Channel: Lonely_Millennial
- Uploaded: 2026-07-04
- Length: 12:21, 94,927 views
- Player question: beginner-oriented "how to win your first games" walkthrough,
  published in 2026 (post-v0.35.0)
- What was observed (from metadata and accessible page, transcript not read in
  full this session): a 2026-dated beginner guide, which means it was
  produced after v0.35.0 shipped (2026-10-11 is the v0.35.0 tag date; this
  video predates the tag by ~3 months and therefore cannot document the boost,
  but its 2026 dating places it in the same content cycle as v0.35). The title
  framing ("How to Win Your First Games") matches the "first few minutes
  decide the game" framing that this guide's topic requires.
- How it is used in the guide: to confirm that the beginner-guide content niche
  is active and being continuously refreshed (a 2026 refresh exists), which
  means the information gap this guide fills is not "there is no beginner
  content" but "there is no beginner content that covers the v0.35.0
  early-economy window specifically." Cited for the content-gap argument only.
- Limitations: transcript not read in full this session (subtitle download
  rate-limited); cited on the basis of confirmed title, date, channel, and
  accessibility, not on specific in-video claims.

### Y3 — "The Fastest Way to Build an Economy in OpenFront"
- URL: https://www.youtube.com/watch?v=8ult82qmiAg
- Channel: Ash
- Uploaded: 2026-08-14
- Length: 5:57, 5,499 views
- Player question: explicitly about fastest early-economy build order
- What was observed (from metadata and accessible page, transcript not read in
  full this session): the title is a direct statement of the decision this
  guide addresses ("fastest way to build an economy"), and the 2026-08-14
  upload date places it in the same content cycle as v0.35. The short
  duration (5:57) is consistent with a tips-format video rather than a full
  playthrough.
- How it is used in the guide: as evidence that the "fastest economy build
  order" question is an active, search-driven question in the community's own
  language — this is the question the v0.35.0 boost directly answers, and a
  2026-dated video targeting exactly this question confirms the question is
  live and un-answered by the existing site content (the existing
  `how-many-ports-to-build` guide is versioned v34 and does not address a
  per-player spawn boost). Cited for the question-matching argument only.
- Limitations: transcript not read in full this session (subtitle download
  rate-limited); cited on the basis of confirmed title, date, channel, and
  accessibility, not on specific in-video claims.

## Summary of what is used for what

| Claim type | Source |
|---|---|
| Exact boost formula, level decay, squaring detail | v0.35.2 tag source (EngineConfig.ts) |
| "Changed from v34 global boost" | v0.34.25 tag source (Config.ts) vs v0.35.2 tag source |
| Version boundary (introduced v0.35.0, current as of v0.35.2) | v0.35.0 release notes + `git diff v0.35.0..v0.35.2` |
| "Early game only, late game unchanged" | v0.35.0 release notes (verbatim) + v0.35.2 source doc comment |
| Community framing: early game is snowball-determining | Reddit R2 |
| Community framing: route safety gates the boost's value | Reddit R1 |
| Community confirmation the trade rework was a large, felt change | Reddit R3 + developer in-thread reply |
| Information gap: no existing beginner content covers the v0.35 window | YouTube Y1, Y2, Y3 (all predate or do not cover v0.35.0) |
| Question-matching: "fastest economy" is the live community question | YouTube Y3 title + Reddit R2 |

No numeric spawn figure in the guide is taken from any Reddit or YouTube
source; all numbers come from the v0.35.2 and v0.34.25 tag source and the
v0.35.0 release notes.
