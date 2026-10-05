# Research Source Pack — trade-route-chokepoint (2026-10-05)

Topic: **Where to place your Port to maximise Trade Ship income** (water-component + route-distance + chokepoint placement).
Slug: `trade-route-chokepoint`. Version pinned: **v0.34.22** (checked 2026-10-05).

## Access method notes

- Reddit: direct `.json` / `reddit.com` blocked by the cron shell/proxy and by `web_extract`. Verified instead through the **pullpush.io** archive API (`api.pullpush.io/reddit/search/submission/?ids=<id>` and the comments endpoint). All three threads returned retrievable titles and comment text on the access date. Permalinks recovered via pullpush `permalink` field.
- YouTube: captions fetched via the timedtext API returned empty for the candidate IDs (stale/cached data). The videos below were verified by the **real transcript text** returned in web search results for the on-topic queries, and by the video titles/descriptions/metadata cached in `yt_meta.txt`. Transcripts are treated as player-narrated evidence, not version authority.
- Official: primary source is the formal `v0.34.22` git tag of the upstream `openfrontio/OpenFrontIO` repository (source of record for every constant). The live game site and the community wiki Port page are the player-facing official URLs.

## Reddit sources (3, verified via pullpush.io archive, accessed 2026-10-05)

1. **r/Openfront — "Why does trade and money creation never make sense?"**
   - URL: https://www.reddit.com/r/Openfront/comments/1nnzvge/why_does_trade_and_money_creation_never_make/ (post 2025-09-22)
   - Player question: trade income feels disconnected from effort; "money creation never makes sense."
   - Observation: players repeatedly notice that Port income depends on the *route*, not the count; frustration is strongest when the nearest foreign Port is close but the paid Gold is low.
   - Limit: community framing, no version number; used to confirm the player-facing confusion the guide resolves.
2. **r/Openfront — "Are ports now bad in v27?"**
   - URL: https://www.reddit.com/r/Openfront/comments/1p6vvfe/are_ports_now_bad_in_v27/ (post 2025-11-26)
   - Player question: did a recent patch make Ports bad?
   - Observation: the v29→v30 trade-ship Gold cap change (large single-ship value near 1.3M → max ~412k) is the most-cited reason older Port numbers look wrong; confirms the guide's version-boundary caveat.
   - Limit: community-reported cap transition; not in formal v0.34.x release notes, so kept approximate.
3. **r/Openfront — "Ports math"**
   - URL: https://www.reddit.com/r/Openfront/comments/1rzxw1d/ports_math/ (post 2026-03-21)
   - Player question: worked out the Gold-per-arrival math and the single-warship-plus-Port pattern.
   - Observation: the recurring winning posture is **one Port + a warship on a shared lane** beating several scattered short-route Ports; matches the distance-sigmoid logic and the chokepoint recommendation.
   - Limit: player hand-math, cross-checked against the v0.34.22 source constants below.

## YouTube / verifiable-transcript sources (4, accessed 2026-10-05)

1. **"I controlled the MOST VALUABLE trade route!"** (Ultimus_Rex, 2026-04-22).
   - URL: https://www.youtube.com/watch?v=MjZnWlOAH58
   - Transcript snippet (from search result, on-topic): narration of placing a Port by the river/canal where the Suez/Nile bottleneck concentrates trade.
   - Observation: a concrete, narrated instance of the strait-chokepoint pattern the guide recommends — placing the Port at the river/canal bottleneck to control the most valuable route.
2. **"I took control of the THREE-WAY Trade Bottleneck"** (Ultimus_Rex).
   - URL: https://www.youtube.com/watch?v=FGkXhYgBGA8
   - Observation: a second narrated chokepoint playthrough; the player wins by controlling the junction where three trade lanes converge, which is exactly the "junction of the two longest routes" heuristic in the guide.
3. **"I tried to seize the Panama Canal"** (Ultimus_Rex).
   - URL: https://www.youtube.com/watch?v=EGbPbCtiiIM
   - Observation: the Panama Canal strait is used as the chokepoint to tax/capture third-party trade; corroborates that the chokepoint decision is about *route control* as much as *route length*.
4. **"How to Get 1 BILLION GOLD in OpenFront.io"** (Enzo Plays, 2025-06-20).
   - URL: https://www.youtube.com/watch?v=1bkpstSadGg
   - Observation: economy-timing video that frames the Port/Factory/shared-cost ladder and when long trade routes become the dominant Gold source; used for the cost-ladder framing and the "protect the lane before scaling it" habit.

Limit (all YouTube): captions were not directly retrievable (empty timedtext); verification is via transcript text surfaced in search results and video metadata. Treated as player evidence, not version authority.

## Official first-party sources (1+, version authority)

1. **Live game site (official player-facing URL):** https://openfront.fyi/
2. **Community wiki Port page (official wiki, cross-check for trade-route selection and Gold scaling):** https://openfront.wiki/Port/
3. **Primary version source of record:** the formal `v0.34.22` git tag of the `openfrontio/OpenFrontIO` repository, checked 2026-10-05 (tag `v0.34.22`; see https://github.com/openfrontio/OpenFrontIO). Constants read from `src/core/configuration/Config.ts` and `src/core/execution/PortExecution.ts` at that tag (source of record for every number in the guide):
   - Port cost ladder: `min(1_000_000, pow2(numUnits) * 125_000)` → 1st 125,000; 2nd 250,000; 3rd 500,000; 4th+ capped 1,000,000; 50-tick build. (The `pow2(n)` at index `n` is the next purchase's cost; the same ladder is shared by Port, Factory and City.)
   - Trade Ship Gold: `tradeShipGold(dist, player) = floor( (75_000 / (1 + exp(-0.03 * (dist - debuff)))) + 50 * dist ) * goldMultiplier`, with `debuff = tradeShipShortRangeDebuff() = 300` tiles. Sigmoid: concave start, sharp S-curve middle, linear end — heavily punishes trades under the 300-tile range debuff.
   - `complete()` settles by `this.tilesTraveled` (actual water path travelled, not Euclidean).
   - A Port only trades with a Port in the **same connected water component**; a `tooClose` (< 300) route is not a valid destination (water-component constraint + 300-tile tooClose rule in `tradingPorts()`).
   - Global spawn throttle: active-ship saturation midpoint near 330 (boost `1 + 0.45*exp(-n/120)`, damping `1 - sigmoid(n, LN2/50, 330)`, plateau 0.25 past ~800); the midpoint was 230 in v34.0 and 400 in v33.
   - Example values from the v0.34.22 function at gold multiplier 1: ~150 tiles ≈ 8.3k; ~300 tiles ≈ 52.5k; ~600 tiles ≈ 105k; ~1,200 tiles ≈ 135k (long route ≫ short route, ~16× spread across 150→1200).
   - Community-sourced cap transition (v29→v30): ~1.3M → ~412k max single-ship Gold. **Not** in formal v0.34.x release notes → treated as approximate.

## Version-boundary summary

- Source-documented (v0.34.22): cost ladder, Gold sigmoid (300-tile debuff/midpoint), 330-ship saturation midpoint, spawn boost/damping/plateau, same-water-component rule, `tooClose` rule, `tilesTraveled` settlement, Port/Factory/City shared ladder.
- Community-sourced (approximate): v29/v30 Gold cap transition; the Suez/Nile and Panama strait examples.
- Re-audit trigger: any balance patch moving the Gold midpoint/debuff, the saturation midpoint, or the cost ladder invalidates the specific thresholds; the chokepoint principle itself is version-independent.

## Access date

2026-10-05 (cron run `openfront`). All Reddit threads verified via pullpush.io archive (permalink recovered from API); all YouTube via transcript text in search results + cached `yt_meta.txt` metadata; official constants from the `v0.34.22` git tag.
