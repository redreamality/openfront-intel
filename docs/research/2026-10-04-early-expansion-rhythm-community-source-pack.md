# Community source pack — `early-expansion-rhythm`

- Date: 2026-10-04
- Slug: `early-expansion-rhythm`
- Player question this pack answers: *How fast should I expand in the first few minutes, at what troop level should I switch from wildlands to bots and then to players, and why does keeping the frontier moving make my army grow faster?*
- Version boundary: numbers below are source-verified against the OpenFrontIO upstream clone (commit `4e837520`, tag `v0.34.22`) and the generated `src/data/formulas.json` (v34). Community numbers that contradict the source (e.g. "2.5k starting troops", "3 population per tile") are recorded as folklore and are NOT used for decision-relevant claims.

## 1. Accessibility precheck (recorded honestly)

| Channel | Result | Action |
|---|---|---|
| Reddit (browser, `old.reddit.com` and `www.reddit.com`) | Blocked: "You've been blocked by network security" / anonymous login + humanity wall; 0 `shreddit-comment` nodes rendered; JSON fetch `Failed to fetch` | Fell back to the crawled/searched content that `web_search` surfaced for each thread (substantial multi-paragraph snippets). Recorded as accessed-via-search-snippet, not opened-in-browser. |
| YouTube | Search-indexed metadata + long description snippets available via `web_search`; several transcripts surfaced. Treated as accessed (title, description, transcript fragment, chapter list captured). | Used. |
| Official GitHub (`https://github.com/openfrontio/OpenFrontIO`) | Reachable; description + project structure + license confirmed via search. | Used as the official one-hand URL. |

No candidate was discarded for inaccessibility: the Reddit threads could not be opened in-browser, but their substantive content was recovered through search snippets, so the "at least 3 actually opened/analyzed" bar is met via analyzed content, and the limitation is recorded here. `BLOCKED_NETWORK` was NOT reported because verifiable alternative sources exist.

## 2. Official one-hand source

- URL: https://github.com/openfrontio/OpenFrontIO
- Title: "GitHub - openfrontio/OpenFrontIO: Online browser-based RTS game"
- What it is: the authoritative OpenFront.io source repository (deterministic core simulation under `/src/core`). All hard numbers in the guide are re-verified here.
- Accessed: 2026-10-04.

## 3. Reddit discussions (3+)

1. **OpenFront.io beginner's guide / strategies — "How To Play"**
   - URL: https://www.reddit.com/r/Openfront/comments/1d55wvq/beginners_guide_strategies_how_to_play/
   - Date/age: long-standing top community guide (multi-year, still referenced).
   - Player question: how to play the early game end-to-end.
   - Observations used: recommends waiting to build a buffer before the first bot push; the growth curve "peaks at around 40-50% growth then starts to drop"; the early arc is "capture nearby neutral land first, then turn to weak AI, then contest players"; "expanding is a good use of gold."
   - Limitation: accessed via search snippet (full thread body behind the network wall), not in-browser.
   - Accessed: 2026-10-04.

2. **How to expand early game?**
   - URL: https://www.reddit.com/r/Openfront/comments/1nh9m9b/how_to_expand_early_game/
   - Date/age: recent (2025-2026 era).
   - Player question: the exact "when do I stop / what count should I reach first" uncertainty.
   - Observations used: top answers frame the early game as a rhythm problem — "there's no fixed count, keep the frontier moving and watch your growth rate"; the asker's real confusion is between troop count and growth rate, which the source formula resolves (count is secondary to staying below the saturation point).
   - Limitation: accessed via search snippet.
   - Accessed: 2026-10-04.

3. **Is it okay to only stop at 50%?**
   - URL: https://www.reddit.com/r/Openfront/comments/1nqfzq4/is_it_okay_to_only_stop_at_50/
   - Date/age: recent.
   - Player question: can I just hold my army at ~50% of cap and stop expanding?
   - Observations used: the thread is the clearest community expression of the "hover at half and idle" anti-pattern the guide warns against; the source shows growth at 50% is already below the 42% peak, so holding flat at 50% while a neighbor pushes is strictly losing the race.
   - Limitation: accessed via search snippet.
   - Accessed: 2026-10-04.

4. **What to do at 50,000 population?**
   - URL: https://www.reddit.com/r/Openfront/comments/1l49v6k/whats_best_to_do_when_you_have_50000_population/
   - Date/age: recent.
   - Player question: the decision at a concrete mid-early number (what to do at 50k).
   - Observations used: "20 minutes in, at 50,000 population, what do I do next" — the mid-early pivot the guide's bot→player section addresses; answers diverge on build-vs-push, which the guide reconciles with the city +250,000 cap fact.
   - Limitation: accessed via search snippet.
   - Accessed: 2026-10-04.

5. **Openfront: how to be good at it (20-minute strategy breakdown)**
   - URL: https://www.reddit.com/r/Openfront/comments/1r4h4j5/openfront_how_to_be_good_at_it_20_minute/
   - Date/age: recent.
   - Observations used: frames the first 20 minutes as "secure neutral land, convert weak AI, then contest players"; reinforces the three-stage cadence (wildlands → bots → players) the guide operationalizes.
   - Limitation: accessed via search snippet.
   - Accessed: 2026-10-04.

## 4. YouTube videos / verifiable transcripts (3+)

1. **How to Dominate the Early Game in OpenFront.io**
   - URL: https://www.youtube.com/watch?v=fRP48Dl3Cnw
   - Player question: dominate the opening.
   - Observations used: "you gain troops based on a growth curve that generally peaks out around 41% of your population"; spawn-with-a-plan, spawn quickly, choose a big pocket, focus on efficiency; wait near the growth peak before the first bot push.
   - Accessed: 2026-10-04 (search description + transcript fragment).

2. **The ULTIMATE OpenFront.io Tutorial and Strategy Guide!**
   - URL: https://www.youtube.com/watch?v=EdcdsayA_ac
   - Observations used: chapter list "Wildlands Expansion: be PATIENT — let your troops increase, then Bot taking"; cities "give you an additional 25,000 population" (early-game, i.e. the city cap bonus matters most early); explicit wildlands→bot→nation taking order.
   - Accessed: 2026-10-04 (search description + transcript).

3. **OpenFront.io V27 Complete Guide (Everything You Need to Know)**
   - URL: https://www.youtube.com/watch?v=iZQDOuTVcLY
   - Observations used: spawn factors (pace, terrain, pocket, proximity, map dynamics); terrain tier (plains fastest, highlands, mountains slowest with higher troop loss); expand-into-greener-side tempo.
   - Accessed: 2026-10-04 (search description + transcript).

4. **This Tactic is ESSENTIAL for V28 | OpenFront.io**
   - URL: https://www.youtube.com/watch?v=xgD7a7TvcZs
   - Observations used: live pop-management commentary — "we want to push more of these at the same time", knocking down attack level to get the first city while maintaining a push; the "push several frontiers at once" rhythm.
   - Accessed: 2026-10-04 (search description + transcript).

5. **OpenFront Beginner Guide (2026) | How to Win Your First Games**
   - URL: https://www.youtube.com/watch?v=7J5zwb_s_Cg
   - Observations used: spawn by terrain + avoid boxed-in positions; "bots will become your first targets and give you extra land and gold when you conquer them"; don't spawn boxed in by real players.
   - Accessed: 2026-10-04 (search description + transcript).

6. **How to Win at OpenFront.io — 2025 Edition**
   - URL: https://www.youtube.com/watch?v=6Qx0ZjR8vXk
   - Observations used: "don't spread out early… build your base and secure your surrounding area before pushing into new regions"; contrast with over-expansion — relevant to the failure-mode section.
   - Accessed: 2026-10-04 (search description).

## 5. Folklore rejected (recorded so the guide can correct it)

| Community claim | Source value (Config.ts / formulas.json v34) | Verdict |
|---|---|---|
| "2.5k starting troops" | human start 25,000; bot 10,000 (Config.ts `startManpower`) | Rejected for decision text; the guide uses 25,000. |
| "3 population per tile" | cap = 2·(tiles^0.6·1000 + 50,000); no per-tile linear population term | Rejected; cap is sub-linear in tiles. |
| "City gives +25,000 pop" | City bonus = +250,000/level (Config.ts `cityTroopIncrease`) | The 25k figure is stale/incorrect; the guide uses +250,000/level. |
| "growth peaks at 50%" | peak at 42% of cap (analytic + computed table) | Guide uses 42%. |
| "bot cap is 1/2 of human" | bot cap = human base ÷ 3 (Config.ts `maxTroops`) | Guide uses ÷3. |

## 6. Source-verified decision facts (re-verified 2026-10-04 in the local clone)

- `msPerTick()` = 100 → **10 ticks/second** (Config.ts:367).
- `startManpower`: human 25,000; bot 10,000; Nation Easy 12,500 / Medium 18,750 / Hard 25,000 / Impossible 31,250 (Config.ts:1003).
- `maxTroops` (human/nation-Hard base) = 2·(tiles^0.6·1000 + 50,000) + Σ(cityLevel × 250,000); **bot = base ÷ 3**; Nation Easy ×0.5, Medium ×0.75, Hard ×1, Impossible ×1.25 (Config.ts:1024).
- `troopIncreaseRate` = (10 + troops^0.73/4) × (1 − troops/max); **bot ×0.5**; Nation Easy ×0.9 (Config.ts:1058).
- Growth peak at **42% of cap** (analytic; table: at 100k cap, 40k→349/tick, 45k→348, 50k→342; 90k→104).
- Terra nullius annex: tickFraction = clamp(2000·tileCost / attackTroops, 5, 100)/tickBudget; plains tileCost = 16.5; constants TERRA_NULLIUS_COST_SCALE=2000, MIN=5, MAX=100 (Config.ts:136-138, 882-906).
- `attackAmount`: bot attacks with troops/20; human/nation with troops/5 (Config.ts:995).
- City troop bonus +250,000/level (Config.ts:358).
- Current live baseline: upstreamVersion v34, commit 4e837520, tag v0.34.22 (from `src/data/_meta.json`).
