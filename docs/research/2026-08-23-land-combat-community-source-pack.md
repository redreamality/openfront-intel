# OpenFront v0.33.9 land-combat community source pack

Research date: 2026-08-23 (Asia/Vladivostok)

Candidate route: `/guides/land-combat/`

Candidate intent: **Why can a player with more total Troops still fail to push or hold, and when should they defend, counterattack, stop, or retreat?**

Access rule: Reddit and YouTube establish player language, recurring confusion, and situations worth answering. All mechanics, values, and version boundaries below come from the official OpenFront release, the `v0.33.9` tag, or tagged tests. Community advice is never treated as engine truth.

## Editorial recommendation

Approve a new guide with one live-battle decision job: turn the troop numbers, terrain overlay, Defense Post coverage, incoming attack state, and retreat cost into the next action. The recurring player question is not merely "what are the combat coefficients?" It is "why is the board moving against me even when my total is larger, and which button should I press now?"

The answer should begin with the distinction between **total Troops owned** and **Troops committed to the active attack**. A player showing 200,000 total Troops who sends the default one fifth is initially pushing with about 40,000, not 200,000. That active force is then evaluated against the defender's current Troops, the tile being crossed, Defense Post coverage, defender and attacker land-size modifiers, traitor state, border geometry, and concurrent attacks. The headline comparison alone is therefore not a combat forecast.

The guide should use a repeatable order: identify the active force, inspect the route, check coverage and time, price a counterattack or retreat, then preserve a reserve for the next threat. This is an editorial decision framework built from engine facts; the engine does not expose a hidden "correct attack" percentage or guarantee that one Defense Post, a counterattack, or a retreat will save a position.

## Why this intent is unique

`/mechanics/military/` is a short coefficient reference. It lists terrain, Defense Post, size, and betrayal modifiers, but does not connect them to an active push/hold/counter/retreat sequence. It also contains conclusions that must not be copied without correction:

- The tagged source uses `sqrt(100_000 / attackerTiles) ** 0.7` for the large-attacker loss modifier, equivalent to `(100_000 / attackerTiles) ** 0.35`, not the page's simplified exponent `0.7`.
- The tagged source proves one qualifying defender-owned Defense Post multiplies `mag` by 5 and `speed` by 3. It does not prove that "1-2 posts can hold off an entire opponent."
- A statement such as "100k tiles versus 200k tiles actually favors you" is not generally valid. The live result also depends on committed attack Troops, defender Troops, route terrain, covered tiles, adjacent front, traitor/fallout branches, and timing.

`/strategies/recovery-playbook/` begins after a position has already collapsed and asks how to stop losses, regrow, rebuild, or clear Doomsday pressure. The proposed guide instead owns the live border decision before and during collapse: whether the current push is real, why an incoming attack is advancing, whether a counterattack will simply trade Troops one for one, and whether a 25% retreat malus is cheaper than continuing. It should link to Recovery only after the player has chosen to disengage or has lost the border.

## Community research method

Four Reddit embed pages were opened individually. The embed surface exposes the original post body and timestamp but not the comment bodies, so Reddit observations below are limited to the author's question and wording. No unseen comment claim is used.

Four YouTube watch pages were opened individually and their real transcript panels were read: `UXWA1mB9MhI`, `7J5zwb_s_Cg`, `EdcdsayA_ac`, and `xG0LCTYgb6o`. None of the videos is used to establish a formula or current version rule.

## Reddit source-by-source notes

### 1. More soldiers, slower push, instant collapse

- URL: ["I just do not understand pushing and defending? I repeatedly lose with more soldiers."][reddit-more-soldiers]
- Posted: 2026-01-16 (`7 mo. ago` on the embed page)
- Player question: the author describes a 200k-versus-100k comparison, advances only centimeters, then watches the opponent's color push melt their land in seconds. They explicitly ask whether to counterattack or sit and wait.
- Useful observation: this is the clearest wording for the guide's primary intent. It combines misleading headline Troop comparison, unequal-looking advance speed, and uncertainty about counterattacking in one live situation.
- Limitation: only the original post was visible. The 21 comments were not available in the embed and were not analyzed.
- Accessed: 2026-08-23

### 2. Defending against a larger player

- URL: ["Whats the best way to defend if a large player attacks you?"][reddit-larger-player]
- Posted: 2026-05-09 (`4 mo. ago` on the embed page)
- Player question: the author asks for the best actions when a larger player attacks, without naming a structure or formula.
- Useful observation: players want a prioritized response sequence, not a coefficient glossary. The guide needs an immediate branch for active incoming pressure: preserve reserve, inspect covered terrain, decide whether cancellation is affordable, and define a retreat or border-shortening trigger.
- Limitation: the post is brief, and the embed did not expose its 12 comments. It proves demand for a defense workflow, not that any particular defense works.
- Accessed: 2026-08-23

### 3. Full sending because ordinary attacks appear useless

- URL: ["How does combat work? ElI5 please"][reddit-eli5]
- Posted: 2025-07-30 (`1 yr. ago` on the embed page)
- Player question: the author says enemy attacks take a large share of land for small losses, while their attacks take almost nothing and erase their army. They report full-sending the attacker because no other response seems effective.
- Useful observation: the guide must explain why a full send can look rational from the UI yet be strategically destructive. It should show that committed attack Troops and incoming-attack cancellation are different from a passive defense multiplier.
- Limitation: the game version was older and the 25 comments were unavailable. The numerical perception is a reported experience, not measured telemetry.
- Accessed: 2026-08-23

### 4. Troops "disappear" on defense

- URL: ["Why do troops just disappear on defence?"][reddit-disappear]
- Posted: 2026-03-08 (`6 mo. ago` on the embed page)
- Player question: a new player reports holding 70k, trying to fight back against an invasion, and reaching zero Troops almost instantly.
- Useful observation: this wording maps directly to the counterattack branch in `AttackExecution`: a newly created opposing attack first cancels the incoming attack Troops one for one. A player who sends the reserve back into the attacker can therefore see both attack forces disappear without gaining land.
- Limitation: the post does not prove that counterattack cancellation caused this exact match. The guide may use it as a plausible engine-backed explanation and should list other concurrent losses as alternatives. The six comments were not visible.
- Accessed: 2026-08-23

## YouTube source-by-source notes

### 1. Current beginner walkthrough with a Defense Post segment

- URL: ["OpenFront.io Beginners Guide - Learn the Basics & Win Your First Game"][youtube-academy]
- Published: 2026-08-10; duration 21:24
- Verified material: the auto-generated English transcript was opened and exported. It explains the attack slider at 1:22-1:59, calls Defense Posts a way to slow rather than stop an attack at 3:27-3:36, builds posts when a neighbor appears threatening at 6:27-6:38, and summarizes "strengthen your borders, and then make bigger attacks" at 10:34-10:43.
- Player problem represented: a beginner needs to connect an attack percentage, visible threat, border preparation, and patience into a sequence.
- Useful observation: the language "slow down, not stop" is a strong editorial framing for Defense Posts. It matches the direction of the official multipliers without borrowing the video's unverified numbers.
- Limitation: captions are auto-generated and contain recognition errors. The video is a player tutorial, not official documentation; every mechanism and value is rechecked against `v0.33.9` source.
- Accessed: 2026-08-23

### 2. Terrain and reserve are taught, but live defense is still missing

- URL: ["OpenFront Beginner Guide (2026) | How to Win Your First Games"][youtube-millennial]
- Published metadata: 2026-07-04T08:59:44-07:00; the expanded watch page displayed Jul 5, 2026; duration 12:21
- Verified material: the auto-generated English transcript was opened and exported. It identifies green/plains, highland, and mountain ordering at 1:00-1:18; explains the attack slider at 2:12-2:28; warns at 7:20-7:40 that committing almost the whole army on one border exposes another. A visible watch-page comment asks for a defense follow-up because "other than building defense posts and praying" the commenter does not know what to do while being pushed.
- Player problem represented: existing beginner content can teach growth and terrain yet still leave the active defense decision unanswered.
- Useful observation: the guide should join route difficulty and reserve management, then explicitly replace "build and pray" with counterattack and retreat branches.
- Limitation: auto-generated captions can mishear names and numbers. The visible comment is demand evidence only; it is not a source for rules.
- Accessed: 2026-08-23

### 3. Strategy tutorial with explicit terrain, post, and de-escalation sections

- URL: ["The ULTIMATE OpenFront.io Tutorial and Strategy Guide!"][youtube-ultimus]
- Published: 2025-04-28; duration 32:14
- Verified material: the auto-generated English transcript and chapter panel were opened. At 4:10-4:36 it describes Defense Posts as increasing the cost and time of taking land, while warning that they do not make late-game positions invulnerable. At 5:02-5:18 it names plains, highlands, and mountains in increasing difficulty. At 11:37-12:24 it argues against reflexively escalating every border attack.
- Player problem represented: players need to decide when a border fight is worth continuing, not merely learn how to initiate one.
- Useful observation: use the video to motivate a "do not escalate without an objective and stop condition" branch. The official source, not the video, supplies the actual formula and version validity.
- Limitation: this is the oldest video in the set and predates v0.33.9 by more than a year. Some stated costs and meta judgments may be obsolete; only its player language and situations are portable.
- Accessed: 2026-08-23

### 4. Version-24 attack, defense, and backline decision guide

- URL: ["Openfront guide - How to play optimally, attack, defend, and support from backline | Version 24"][youtube-v24]
- Published: 2025-06-01; duration 37:42
- Verified material: the full watch-page transcript was opened and read. The introduction at 0:10 frames the video around attacking, defending, and supporting from the backline. From 0:18-3:14 it discusses the then-current defense indicator, growth sweet spot, and the danger of overspending. At 2:28-2:43 it describes a large push into a Defense Post exhausting the attacker and creating a defender counter-push window. The 36:02-37:29 summary separates front-line and back-line responsibilities and returns to attack timing.
- Player problem represented: players need a timing and role framework for a contested land border, including the transition from absorbing a push to counterattacking.
- Useful observation: the "attack exhausts itself, then the defender can reverse pressure" situation is directly relevant language for the guide. Current mechanics must be explained from the `v0.33.9` formulas and cancellation branch, not from the video's old indicator values.
- Limitation: the title explicitly identifies Version 24, and the transcript contains subjective optimal values such as indicator 14 and 30-40%. A visible comment asking "There's no defense icon?" further demonstrates that its UI instructions are version-bound. No v24 number or control should be presented as current.
- Accessed: 2026-08-23

## Official version boundary

The latest non-TEST official release is [v0.33.9][release-339], tag commit [`3229956f09a0307c7ed1d31e07aed9a9f9356cbd`][commit-339]. Its release entry adds a desktop release descriptor; the bundled v0.33.8 entry concerns routing the game server HTTP API through the configured host. Neither announces a land-combat, terrain, Defense Post, counterattack, or retreat change. The guide can therefore state that these mechanics were checked against the current `v0.33.9` tag, while avoiding the claim that v0.33.9 introduced them.

The site's generated `_meta.json` points to an older checkout (`0668045...`) and only labels the series `v33`. Generated values are useful cross-checks but are not the patch boundary for this guide. Exact published behavior below is taken from official `blob/v0.33.9` files.

## Official engine facts

### Terrain and Defense Post

[`Config.attackLogic()`][config-339] assigns each target tile a base pair:

| Terrain | `mag` | `speed` | Player-facing meaning |
| --- | ---: | ---: | --- |
| Plains | 80 | 16.5 | Lowest base attacker loss and tile cost of the three |
| Highland | 100 | 20 | Middle route |
| Mountain | 120 | 25 | Highest base attacker loss and tile cost |

For a player defender, the engine searches completed nearby Defense Posts owned by that defender. The first qualifying post within 30 tiles multiplies `mag` by 5 and `speed` by 3, then the loop breaks. Multiple overlapping posts therefore do not stack this multiplier on the same tile. Under-construction units are excluded from nearby-unit queries by default.[config-339] [unit-grid-339]

A normal Defense Post takes 50 ticks to construct, or about 5 seconds at 100 ms per tick, unless instant build is enabled. Costs rise by 50,000 per constructed post to a 250,000 cap. These values justify "buy time before contact" and "cover the threatened route"; they do not justify calling a post an impenetrable wall.[config-339]

Examples of the raw tile pair are useful without pretending to predict a whole battle: an uncovered plains tile is `80 / 16.5`; a covered plains tile is `400 / 49.5`; an uncovered mountain is `120 / 25`; a covered mountain is `600 / 75`. Actual losses still depend on force ratios, defender density, land-size modifiers, traitor/fallout state, border adjacency, and tick ordering.

### Why total Troops do not predict an attack

When no manual amount is supplied, a Human or Nation land attack starts with one fifth of current Troops. The selected Troops are capped to what the owner currently has, removed from the owner's reserve, and stored on the attack object.[config-339] [attack-execution-339]

For player combat, the formulas use `attackTroops`, the remaining Troops on that attack, not the attacker's total Troops shown before clicking. The defender side uses current defender Troops and defender tiles. In simplified notation:

```text
frontBudget = clamp(((5 * attackTroops) / defenderTroops) * 2, 0.01, 0.5)
              * adjacentEnemyTiles * 3

defenderLossPerCapturedTile = defenderTroops / defenderTiles

attackerLossPerCapturedTile =
  0.6 * (clamp(defenderTroops / attackTroops, 0.6, 2)
         * mag * 0.8 * defenderSizeMod * attackerSizeLossMod * traitorDefenseMod)
  + 0.4 * (1.3 * defenderLossPerCapturedTile * (mag / 100) * traitorDefenseMod)
```

The tile cost consumed from the front budget also multiplies terrain `speed`, defender-size, attacker-size, and traitor-speed terms. A wider live border can create more work budget because `adjacentEnemyTiles` participates; the specific queued tiles still have different terrain costs. This is why a static "my number versus their number" comparison cannot tell the player how fast color will move.[config-339]

The size modifiers also need careful language. Defender size transitions around the 150,000-tile midpoint toward a 0.7 floor, making a very large defender easier to damage and cross. For attackers above 100,000 tiles, the loss modifier is `sqrt(100_000 / attackerTiles) ** 0.7`, and the speed modifier is `(100_000 / attackerTiles) ** 0.6`. They help large attackers at the margin; they do not override committed force, terrain, coverage, or reserve.[config-339]

### What counterattacking actually does

At attack initialization, `AttackExecution` checks the new attacker's incoming attacks from the same target. The two attack Troop pools cancel one for one before ordinary tile combat. If the incoming pool is larger, it keeps the difference and the new counterattack is deleted; if the new counterattack is at least as large, the incoming attack is deleted and the counterattack keeps only the difference.[attack-execution-339]

This is the engine-backed explanation for the "Troops disappeared when I fought back" perception, but it must be phrased conditionally for any individual match. A counterattack is not free defense and does not add a terrain multiplier. It transfers current reserve into an opposing attack, then cancellation can consume that force immediately.

### What retreat actually saves

[`RetreatExecution`][retreat-339] orders retreat and waits 20 simulation ticks before executing it, about 2 seconds at normal 100 ms ticks. While an attack is in the `retreating` state, its own tick returns before taking more tiles, but the attack object still exists and can be affected by other events or an opposing attack.[retreat-339] [attack-execution-339] [attack-impl-339]

When retreat completes against a player, `AttackExecution` removes 25% of the attack Troops still surviving at that moment and returns the other 75% to the owner. Retreat from Terra Nullius has no such malus. If the sides become friendly while the attack is active, the engine also returns the attack without the malus.[attack-execution-339]

The guide should therefore compare a known retreat cost with the likely cost of continuing, not promise that retreat returns 75% of the original send.

## Draft decision framework

Use **force, route, time, and exit** as the four checks:

1. **Force:** read the remaining Troops on each active attack, not only each player's total. Count the reserve left after the send and identify another neighbor who can punish it.
2. **Route:** use the terrain overlay and inspect the tiles the front must cross. Check defender-owned completed Defense Post coverage on those tiles, not merely whether a post icon exists somewhere in the country.
3. **Time:** ask whether a new post can finish before the threatened tiles fall, whether a counterattack's one-for-one cancellation is affordable, and whether 20 retreat ticks leave enough surviving force to matter.
4. **Exit:** define what land, structure, border shortening, or threat removal makes the fight worthwhile. Stop or retreat when that result becomes unreachable at an acceptable reserve.

This yields three player-facing branches:

- **Push:** commit only when the active force, route, and remaining reserve can achieve a named objective. Prefer easier uncovered tiles or another route over repeatedly feeding a covered mountain front.
- **Hold or counter:** let terrain and Defense Post multipliers trade when time favors the defender. Counter only when spending reserve one for one against the remaining incoming attack solves the immediate breach without opening a worse border.
- **Disengage:** stop feeding the fight when the objective is gone. Retreat early enough that 75% of the surviving pool is still useful, then continue with the Recovery Playbook if the position has already collapsed.

## Draft numeric scenarios

### Scenario A: 200k versus 100k is really 40k versus 100k

Assume a Human owns 200,000 Troops, uses the default one-fifth send, and attacks a defender holding 100,000. The active attack begins at about 40,000 while 160,000 remains with the owner. The ratio term in attacker loss uses `100,000 / 40,000 = 2.5`, then clamps to 2. The label "200k versus 100k" therefore hides the actual force entering combat.

If the defender immediately launches a 40,000 counterattack while the incoming pool is still 40,000, the initialization branch cancels both attack pools before terrain combat. The defender has spent 40,000 current Troops, and the attacker still owns the 160,000 reserve that never entered the attack. This explains why colors may stop moving and attack Troops may vanish without proving that either whole country lost every Troop.

Assumptions: no prior losses, no second attack, exact manual counter amount, and counter initialization before the incoming attack changes. Real games can differ on the next tick.

### Scenario B: one route changes the cost before force ratios change

Assume the same force and player states but compare target tiles. An uncovered plains tile starts at `mag 80 / speed 16.5`; an uncovered mountain starts at `120 / 25`. A completed defender-owned Defense Post covering that plains tile changes it to `400 / 49.5`. A covered mountain becomes `600 / 75`.

The guide should not convert these pairs into a universal seconds-to-break number because the complete formula also needs defender density, land-size modifiers, border adjacency, changing attack Troops, and tile order. The decision is still actionable: reroute around covered tiles, widen only when reserve permits, or stop feeding a route whose multiplier has changed.

### Scenario C: retreat is based on survivors

Assume an attack originally sent 80,000 Troops and has 50,000 remaining when retreat is ordered. After the 20-tick wait, suppose opposing cancellation or another event leaves 40,000. The player receives `40,000 * 0.75 = 30,000`, not 60,000 and not 37,500.

Assumptions: the target is another player, no alliance forms, and the remaining pool at execution is exactly 40,000. The scenario proves the base used for the malus; it does not predict what survives the delay.

## Mode and map adjustments

- **Terrain-heavy maps:** route choice can dominate the headline Troop comparison. Use the overlay and identify the actual sequence of plains, highland, mountain, or impassable tiles.
- **Narrow routes:** a completed Defense Post can cover a larger share of the only usable approach. Its effect remains a per-tile multiplier, not a guarantee that the country holds.
- **Open fronts:** more adjacent enemy tiles can increase the attack work budget, but a wider front also exposes more approaches and may require more reserve. Do not turn width into an unconditional advantage.
- **Compact or crowded games:** shorter strategic distances and more simultaneous borders reduce reaction time. The combat formula remains the tagged formula; player density changes the decision environment.
- **Team games:** a teammate can change which border matters and whether a reserve can be replaced, but ordinary land attack and counterattack behavior does not become a free defense bonus. Link team support details rather than duplicating them.
- **Special terrain states:** fallout modifies both combat terms, and impassable terrain cannot be attacked. Water Nukes and Doomsday require their dedicated guides before applying a normal-land scenario.

## Completion definition for the guide

The guide is complete when a reader can answer all five questions for a live border:

1. How many Troops are actually committed and how many remain in reserve?
2. Which terrain and completed defender-owned Defense Posts cover the route?
3. Is the visible movement explained by active-force ratio, tile cost, front width, or another concurrent attack?
4. Would a counterattack solve the breach after one-for-one cancellation, or only erase the reserve?
5. Is continuing cheaper than retreating 25% of the surviving attack after the 20-tick delay?

The final guide should include at least the three numeric scenarios above, an HTML decision flow or combat-state table, failure/counterplay sections, and links to Military Mechanics, Recovery Playbook, Economy Fundamentals, and map strategy. It must not expose source code as the main reading experience; code citations belong in the verification boundary and sources.

## Limitations

- Reddit embeds did not expose comment bodies. The source pack does not infer or paraphrase unseen answers.
- The YouTube transcripts were auto-generated, so wording and numbers may contain recognition errors. One video explicitly targets Version 24, and its old defense indicator and subjective optimal percentages are not current-rule evidence.
- Community sources span April 2025 to August 2026. They show persistent confusion, not one stable historical meta.
- No replay telemetry was available for the Reddit examples. The formulas explain plausible causes but cannot diagnose an unseen match with certainty.
- Exact land movement depends on the changing tile queue, border shape, concurrent attacks, fallout, traitor state, disconnections, and tick ordering. The guide should not publish a universal attack percentage, Defense Post count, or seconds-to-break promise.
- The current `/mechanics/military/` page should be corrected or carefully superseded where it simplifies the large-attacker exponent and turns local multipliers into guaranteed match outcomes. This source pack does not treat those existing summaries as evidence.

## Source inventory

Valid Reddit originals opened: **4**

Valid YouTube watch pages opened with transcript or transcript-panel verification: **4**

Official first-party sources: **7** (release, commit, five tagged source/test pages)

All sources accessed: **2026-08-23**

[reddit-more-soldiers]: https://embed.reddit.com/r/Openfront/comments/1qew28j/i_just_do_not_understand_pushing_and_defending_i/
[reddit-larger-player]: https://embed.reddit.com/r/Openfront/comments/1t7ww85/whats_the_best_way_to_defend_if_a_large_player/
[reddit-eli5]: https://embed.reddit.com/r/Openfront/comments/1mdm0q2/how_does_combat_work_eli5_please/
[reddit-disappear]: https://embed.reddit.com/r/Openfront/comments/1rojd44/why_do_troops_just_disappear_on_defence/
[youtube-academy]: https://www.youtube.com/watch?v=UXWA1mB9MhI
[youtube-millennial]: https://www.youtube.com/watch?v=7J5zwb_s_Cg
[youtube-ultimus]: https://www.youtube.com/watch?v=EdcdsayA_ac
[youtube-v24]: https://www.youtube.com/watch?v=xG0LCTYgb6o
[release-339]: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.9
[commit-339]: https://github.com/openfrontio/OpenFrontIO/commit/3229956f09a0307c7ed1d31e07aed9a9f9356cbd
[config-339]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/configuration/Config.ts
[attack-execution-339]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/execution/AttackExecution.ts
[retreat-339]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/execution/RetreatExecution.ts
[attack-impl-339]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/game/AttackImpl.ts
[unit-grid-339]: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.9/src/core/game/UnitGrid.ts
