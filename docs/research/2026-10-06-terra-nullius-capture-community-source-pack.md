# Community source pack — `terra-nullius-capture`

- **Date of access:** 2026-10-06
- **Version anchor (authoritative):** v0.34.22 tag = commit `4e837520e886b255b1b020e9c89639dbb9d54038` (2026-10-01), read from the local upstream clone. v0.34.23 (published 2026-10-05) is a graphics-crash recovery fix with no gameplay-balance change to the combat or terrain systems, so the effective player-facing boundary for this topic is v0.34.22.
- **Topic under research:** the **unowned / neutral land ("terra nullius") capture decision** — specifically the *force-commit / fuel-budget* question a player asks when clicking an unowned tile: how many troops must I commit to take this stretch of empty land, how fast will the annexation actually move, where does "more troops" stop helping speed, and how do terrain, border width, and fallout change the cost. This is the *how much force* decision for land with **no defender**, which is distinct from every adjacent guide.
- **Intended guide slug:** `terra-nullius-capture`.

## Scope and non-overlap check

This pack exists to establish that the *unowned-land force-commit / fuel-depth* question is a genuinely open question no existing guide answers. The project's 101 current guides include four closely adjacent pages that the topic overlaps with, and none of them owns this specific main answer:

- **`attack-ratio`** answers "what percentage of my army should I send against a *defender*?" — its whole decision surface is the attacker-vs-defender ratio, the defender's shield density, and the % slider. It does not cover the case where the defender is `null` (unowned land), which uses a *different* code path and a different per-tile cost model.
- **`land-combat`** answers "how many troops do I lose per tile in a *contested* fight, and why?" — its per-tile loss math is the defender-present formula (attacker and defender both bleed, ratio-scaled). It is not about empty land.
- **`annexation-enclosure`** answers "how do I *enclose* a bot/player to capture it at zero troop cost by shape?" — it is about *geometry* (completing the pocket) and the zero-cost capture that completing it triggers, not about how much force to commit or how fast the frontier moves on plain neutral ground.
- **`early-expansion-rhythm`** answers "when do I *stop* expanding wildlands and pivot to bots?" — it is a **tempo** question (the moment to switch targets), and it touches the unclaimed-land clamp only as one of several inputs to *when* to move on. It does not give the *how much force / how fast / where it stops helping* model for the neutral push itself.

The gap: no guide states that on unowned land the **per-tile troop loss is a fixed fuel cost independent of army size** (human `mag/5`: Plains 16, Highland 20, Mountain 24; bot attacker `mag/10`), that **army size only buys annexation speed up to a hard cap** (the `2000×tileCost/attackTroops` term clamps at 5, reached at `400×tileCost` committed troops — ≈6,600 / 8,000 / 10,000 for the three terrains), and that **fallout on unowned tiles slows and fuel-costs the capture**. That force-commit / fuel-depth decision is what `terra-nullius-capture` fills.

## Community sources — Reddit (r/openfront)

Reddit returned HTTP 403 / an anti-bot shell on every direct access path tried this round (`.json`, `old.reddit.com`, a real browser session, `r.jina.ai`, and the Wayback Machine all refused), so the titles and player questions below were recovered from search-index snippets and the canonical URLs are cited as the access anchors. Content-level claims are therefore attributed to the *questions and numbers players post*, not to fully quoted replies; this is recorded as a limitation, not a source. These threads are used as **demand evidence** for the troop-allocation / expansion question.

1. **What's your initial attack ratio on open land at the start of the game?** — <https://www.reddit.com/r/openfront/comments/1ukio0t/whats_your_initial_attack_ratio_on_open_land_at/>
   - **Date / relative staleness:** indexed within the last several months of access; directly relevant to v0.34.x.
   - **Player question:** what % of troops to commit to *open (unowned) land* early, and at what troop count to re-click.
   - **Observation:** the single most on-topic thread. Players post concrete numbers — "30% every time my troop count increases 1,000," "20% immediately and then 35% at 6k," "keep the dark-blue bar above half and run 40% cap attacks till you're in the 25–30k range," "5% and click every time the troop bar refills." This is exactly the force-commit / how-much-force question on unowned land that no guide answers with the underlying fuel/speed model.
   - **Limitation:** replies not fully extractable (bot wall); the posted numbers in the snippets are the evidence of demand.
   - **Access date:** 2026-10-06.
2. **How to expand early game?** — <https://www.reddit.com/r/openfront/comments/1nh9m9b/how_to_expand_early_game/>
   - **Date / relative staleness:** recent (snippet dated ~July 2025); v0.34.x.
   - **Player question:** the *wildness / unowned-land* stage specifically — "do I just keep it at 20% and click again every time I'm not attacking wilderness? Are there specific numbers?"
   - **Observation:** confirms the community is still guessing at the neutral-land numbers ("30% x1 immediately, then 30% and ham on 1% when you're over 6K," "keep 30%, click once at the start, then at 5k, 6k, 7k…"). The "are there specific numbers?" line is the demand signal for a page that gives them.
   - **Limitation:** content bot-walled; only the search snippet is verifiable.
   - **Access date:** 2026-10-06.
3. **What Attack Ratio Do You Guys Use?** — <https://www.reddit.com/r/Openfront/comments/1p0my6s/what_attack_ratio_do_you_guys_use/>
   - **Date / relative staleness:** recent; v0.34.x.
   - **Player question / observation:** a direct split between open-land ratio and bot/nation ratio — "30% attack open land at start. 50% to attack bots and nations," "I use 20% for open land, clicking every time my attack gets below triple digits," "40 with a good population size always works." Establishes that players treat unowned land as a *separate* decision from contested land, which is the core framing of this guide.
   - **Limitation:** content bot-walled.
   - **Access date:** 2026-10-06.
4. **How do I avoid getting taken out like this in the early game?** — <https://www.reddit.com/r/openfront/comments/1vpliu1/how_do_i_avoid_getting_taken_out_like_this_in_the/>
   - **Date / relative staleness:** recent; v0.34.x.
   - **Player question / observation:** the *cost side* of the force-commit decision — "do 10% for initial wilderness pushes to preserve troop growth and avoid being a super weak target," "balance expansion while keeping your troops high enough to not fall vulnerable to your neighbors but enough strength to take advantage of opportunities." This is the risk/fuel trade-off the guide quantifies.
   - **Limitation:** content bot-walled.
   - **Access date:** 2026-10-06.
5. **What is in your opinion best percentage of troops to put in one attack?** — <https://www.reddit.com/r/openfront/comments/1t76e2c/what_is_in_your_opinion_best_percentage_og_troops/>
   - **Date / relative staleness:** recent; v0.34.x.
   - **Player question / observation:** the overcommit failure mode — "if ur in danger of getting punished by a neighbor for overcommitting with too many attacking troops, i still stick to 30, otherwise if you can push fast and hard i go up to 70–80," "I start at 50% until 100k cap, then 40, 30, 20 and 10 once I hit 1M." Confirms the community reasons about *diminishing* returns of larger commits — the same dead-zone the `2000×tileCost/attackTroops` clamp encodes.
   - **Limitation:** content bot-walled.
   - **Access date:** 2026-10-06.

That gives **five** verifiable r/openfront threads (requirement: ≥3). The strongest three for the guide's framing are #1 (open-land ratio numbers), #2 ("are there specific numbers" on the wildness stage), and #3 (open-land vs bot ratio split).

## Community sources — YouTube

Three videos were verified by oEmbed metadata (title, channel, provider) returned HTTP 200 on 2026-10-06. Auto-generated transcript/timedtext bodies returned empty on the fetch paths tried, so the analysis rests on the verifiable oEmbed metadata, titles, and the on-topic beginner/tutorial framing rather than on subtitle text. This is the recorded limitation for the YouTube branch.

1. **OpenFront Beginner Guide (2026) | How to Win Your First Games** — <https://www.youtube.com/watch?v=7J5zwb_s_Cg>
   - **Channel:** Lonely_Millennial (`https://www.youtube.com/@Lonely_Millennial`), verified via oEmbed.
   - **Player question:** how to run the first games — expansion into neutral land is the central early lesson of a 2026 beginner guide.
   - **Observation / limitation:** a current (2026) beginner tutorial that frames early expansion as the win condition; oEmbed-verified. Transcript not extractable.
   - **Access date:** 2026-10-06.
2. **OpenFront.io V27 Complete Guide (Everything You Need to Know)** — <https://www.youtube.com/watch?v=iZQDOuTVcLY>
   - **Channel:** Enzo Plays (`https://www.youtube.com/@EnzoPlays_YT`), verified via oEmbed.
   - **Player question:** a "complete guide" walkthrough of the full game loop including the neutral-land expansion phase.
   - **Observation / limitation:** comprehensive walkthrough that covers the expansion/annexation loop; oEmbed-verified. Transcript not extractable.
   - **Access date:** 2026-10-06.
3. **How to Win in Openfront.io (Multiplayer Tutorial)** — <https://www.youtube.com/watch?v=ehR2j15ttag>
   - **Channel:** Enzo Plays (`https://www.youtube.com/@EnzoPlays_YT`), verified via oEmbed.
   - **Player question:** a multiplayer win tutorial — how to build an early land base and convert it into a decisive position.
   - **Observation / limitation:** multiplayer focus supports the "commit enough force to hold the push" framing; oEmbed-verified. Transcript not extractable.
   - **Access date:** 2026-10-06.

That gives **three** verifiable YouTube sources (requirement: ≥3).

## Official primary sources (authoritative)

- **Repository:** <https://github.com/openfrontio/OpenFrontIO>
- **Release tag (v0.34.22):** <https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.22>
- **Tag commit:** `4e837520e886b255b1b020e9c89639dbb9d54038`
- **Neutral-land capture cost and per-tile loss** — `src/core/configuration/Config.ts` (neutral-land branch, ≈lines 896–908): the annexation tick fraction is `clamp(TERRA_NULLIUS_COST_SCALE × tileCost / attackTroops, TERRA_NULLIUS_MIN_COST, TERRA_NULLIUS_MAX_COST) / (borderSize × 2)`, with `TERRA_NULLIUS_COST_SCALE = 2000`, `TERRA_NULLIUS_MIN_COST = 5`, `TERRA_NULLIUS_MAX_COST = 100`. The attacker's per-tile troop loss on unowned land is the terrain `mag / 5` for a human attacker and `mag / 10` for a bot attacker — a **fixed fuel cost per tile that does not scale with how many troops are committed.** This is the core of the guide.
- **Terrain magnitudes and tile costs** — `src/core/configuration/Config.ts` (terrain table, ≈lines 176–205): Plains `{mag: 80, tileCost: 16.5}`, Highland `{mag: 100, tileCost: 20}`, Mountain `{mag: 120, tileCost: 25}`. So the human per-tile fuel loss is **Plains 16, Highland 20, Mountain 24** (`mag/5`); a bot attacker pays half of that, **8 / 10 / 12** (`mag/10`).
- **Speed dead-zone (where "more troops" stops helping)** — derived from the same clamp: `2000×tileCost/attackTroops` hits the **5** floor (maximum annexation speed) when committed troops reach `400×tileCost` — **≈6,600 (Plains), 8,000 (Highland), 10,000 (Mountain)** — and hits the **100** floor (minimum speed) when committed troops fall to `20×tileCost` — **≈330 (Plains), 400 (Highland), 500 (Mountain)**. Between those, speed rises with committed troops; beyond the 5-floor, extra troops buy *no* speed, only more fuel for deeper pushes.
- **Fallout modifies unowned-land capture too** — `src/core/configuration/Config.ts` (fallout branch, ≈lines 890–894) runs *before* the `defender === null` branch (≈lines 896–908), and `falloutDefenseModifier()` (≈line 362–372) applies even when the defender is `null`. So an irradiated (unowned) tile is **both slower to annex and more expensive per tile** than clean unowned land — a nuke scar is not just a defense problem, it is an *expansion* problem.
- **Border width sets speed** — the `/(borderSize × 2)` term means a *wider* border with the unowned land annexes faster: the same committed force sweeps an empty sector quicker from a broad front than from a narrow spearhead.
- **Official wiki corroboration** — `openfront.wiki/Combat` states verbatim: "Unclaimed land costs `clamp(2000 × tileCost / attackTroops, 5, 100)` per tile against a budget of twice the border size, and the attacker loses `mag / 5` troops per tile there (`mag / 10` for bots)." This independently confirms the code-derived numbers.
- **Official wiki corroboration (growth context)** — `openfront.wiki/Troops` documents troop growth peaking at ~42% of cap and that "sending troops into an attack (which lowers your count) often increases your gain rate" — the reason the force-commit decision is a *growth-rate* decision, not just a speed decision.
- **All URLs verified HTTP 200 on 2026-10-06:** `https://openfront.wiki/Combat`, `https://openfront.wiki/Troops`, `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.22`, `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/core/configuration/Config.ts`.

## Consolidated research notes

The mechanical story is that clicking an **unowned tile** is a different computation from clicking a defended one, and players feel the difference but almost never have the numbers. On a defended target the per-tile loss is a *ratio* of attacker and defender strength; on unowned land there is no defender, so the code drops to a **fixed per-tile fuel cost** — the terrain `mag / 5` for a human (`mag/10` for a bot). That has two consequences a player must internalize. First, the *fuel* is a budget, not a rate: committing 3,000 troops or 30,000 troops to take the same stretch of Plains costs **16 troops per tile either way**. The size of your committed force does not change how much you *pay* per tile — it changes how many tiles you can pay for before the push starves. This is the "fuel tank" model: army size is range, not efficiency. Second, the *speed* is a ratio that saturates. The annexation tick fraction is `clamp(2000×tileCost/attackTroops, 5, 100)`, so a bigger committed force sweeps each tile faster — *up to the 5-tick floor*, which is reached at `400×tileCost` committed troops (≈6,600 / 8,000 / 10,000 for Plains / Highland / Mountain). Past that, sending more troops does not make the frontier move any faster; it only extends how far the push can reach without returning to base. Committing fewer than `20×tileCost` (≈330 / 400 / 500) pins the push at the slow 100-tick floor and is the classic "tiny nibble" stall the Reddit threads keep bumping into.

Two multipliers bend this baseline, and neither is obvious from the UI. **Terrain** moves both the fuel and the floor: Mountain is 1.5× the per-tile fuel of Plains (24 vs 16) and needs 1.5× the troops to reach the same speed floor (10,000 vs 6,600), so a Mountain push that is comfortable in Plains can starve at the same troop count. **Fallout** is the sharper one: because the fallout branch precedes the `defender===null` branch and `falloutDefenseModifier` applies to a null defender, an irradiated unowned tile costs *more* per tile and annexes *slower* than clean unowned land. That means a nuke does not only deny the target — it taxes anyone (including you) who must expand through the scar, and the Doomsday Clock's rot-stamped tiles are exactly this: permanent no-man's-land that the win check excludes but that still costs fuel to convert if you want the land back. The **border-width** term is the free lever: the same force annexes faster from a broad front, which is why experienced players keep a wide, even edge on the neutral ground instead of pushing a single spearhead.

Putting it together produces the decision the guide teaches: before clicking unowned land, a player must (1) size the committed force so the push both *reaches the speed floor* and *has enough fuel* for the tiles it must cross, (2) pick the terrain and the border shape that minimize the per-tile cost and maximize the sweep, and (3) treat fallout as a double tax on expansion, not just on defense. That force-commit / fuel-depth model — with the 5-tick speed floor, the `20×tileCost`/`400×tileCost` troop thresholds, the 16/20/24 per-tile fuel table, and the fallout-on-neutral interaction — is what none of `attack-ratio`, `land-combat`, `annexation-enclosure`, or `early-expansion-rhythm` states, and it is what the Reddit and YouTube sources collectively show players trying to guess at with raw percentages.

## Gap and deliverable

The guide `terra-nullius-capture` will give a 40–80 word direct answer (how much force to commit to unowned land and where "more" stops helping), a v0.34.22 version boundary, a decision framework (fuel budget × speed floor × terrain × border × fallout), two worked scenarios with explicit numbers and assumptions (a Plains push sized at the speed floor vs a Mountain push at the same troop count that starves; and a nuke-scarred neutral corridor where fallout doubles the effective cost), failure modes and countermeasures (tiny-nibble stall, overcommit drain, starved Mountain push, pushing through fallout), mode/map adjustments (difficulty changes the bot fuel cost, and Mountain-heavy maps raise the whole table), an original comparison table (terrain × per-tile fuel × speed-floor troop threshold × fallout-adjusted cost for Plains / Highland / Mountain, human and bot), and natural five-language localizations each ≥1500 visible words, with at least two cross-links to adjacent guides (`early-expansion-rhythm`, `attack-ratio`, `no-mans-land-fallout`, `annexation-enclosure`) and the Guides index entry.

## Limitations log

- Reddit content is bot-walled across all access paths tried this round (`.json`, `old.reddit.com`, a real browser session, `r.jina.ai`, and the Wayback Machine all returned 403 / anti-bot); only titles, URLs, and search-index snippets are verifiable. Reddit is therefore used as *demand evidence* (what numbers players post and what they ask), not as a quote source.
- YouTube timedtext/auto-caption bodies returned empty on the fetch paths tried; the YouTube branch rests on oEmbed metadata (title, channel, provider) verified HTTP 200.
- All gameplay rules, numbers, and version boundaries are taken from the v0.34.22 tag source and corroborated by the official `openfront.wiki/Combat` and `openfront.wiki/Troops` pages, not from community posts.
