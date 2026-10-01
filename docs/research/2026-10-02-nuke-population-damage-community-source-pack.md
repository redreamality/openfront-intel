# Nuke evacuation and troop-pool damage - community source pack

Date: 2026-10-02
Topic: what a defender can still evacuate after an inbound-nuke warning, whether sending troops into attacks or Transports protects them, and why the answer differs between Atom/Hydrogen strikes and MIRV warheads.
Version under analysis: v0.34.22, the latest non-TEST OpenFront release, published 2026-10-01.
Tag commit: `4e837520e886b255b1b020e9c89639dbb9d54038`.

## Scope and distinct-intent verdict

The proposed guide owns one narrow, live decision: **after the warning but before impact, which troops or units should the defender move, split, or leave in place?** Its answer must distinguish three separate systems that players often collapse into the word "population": local unit deletion inside the blast radius, loss of owned tiles, and the global casualty calculation applied to troop-bearing pools. In the tagged source, `humans` is the casualty function's parameter name for troops held at home, in outgoing attacks, or aboard Transports. It is not evidence of a separate civilian-population resource.

This intent is independently useful only if the guide focuses on pre-impact evacuation and troop-pool placement. It must not become a renamed copy of any existing page:

- `/guides/which-nuke-commit/` owns the attacker's choice among Atom, Hydrogen, and MIRV commitments.
- `/guides/nuke-defense-protocol/` owns destination-side SAM geometry, ready launch slots, automatic interception, and the immediate fallback when no intercept is reachable. Its fallback says movable local units can leave and global pools still take damage, but it does not derive the MIRV pool threshold or turn that difference into an evacuation decision.
- `/guides/post-mirv-recovery/` begins after warheads land and owns rebuilding, saturation, the next-strike check, and bounded counterattacks.

The new decision-changing contribution is the **per-pool 3% `maxTroops` zero-loss threshold for MIRV warheads**. Moving a ship out of the local radius and splitting a large troop balance into genuine outgoing attacks or Transport cargo are different actions with different protection. Splitting does not defeat the Atom/Hydrogen proportional formula; under the MIRV curve, however, every separately evaluated pool at or below 3% of the same `maxTroops` produces zero global casualty for that pool on that affected tile. This distinction is absent from the current fallback and is strong enough to support a separate guide.

## Accessibility preflight and access notes

All six final community URLs passed an accessibility preflight before inclusion. The three Reddit canonical pages were then opened and read in the browser. The three YouTube watch pages returned HTTP 200, their metadata was read with `yt-dlp`, and their available English auto-caption VTT files were downloaded to the automation cache and analyzed. The third YouTube watch page was also opened in the browser on 2026-10-02, showing its title and 36:11 duration.

Direct PowerShell requests to Reddit returned HTTP 200 but only a small JavaScript shell, so they were not treated as sufficient evidence. Exact-ID Arctic Shift requests supplied readable post/comment data during the research pass, while broad keyword requests returned HTTP 422 and one later exact-ID attempt returned HTTP 525. Those search/API failures did not invalidate the final sources because the canonical Reddit pages themselves were accessible and opened. `yt-dlp` warned that the local version was more than 90 days old and that no JavaScript runtime was available, but metadata and all three existing English caption tracks were retrieved successfully; no software update was needed.

Access date for every source below: **2026-10-02**.

## Official primary sources and verified v0.34.22 facts

1. https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.22
   The latest formal, non-TEST release. Its published release body contains no nuke-damage or evacuation change. The release tag resolves to commit `4e837520e886b255b1b020e9c89639dbb9d54038`. A focused `v0.34.21..v0.34.22` diff over `Config.ts`, `NukeExecution.ts`, `MIRVExecution.ts`, and the nuke execution test is empty, so the rules below carry forward unchanged into v0.34.22.

2. https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/core/configuration/Config.ts
   `nukeMagnitudes()` sets MIRV-warhead inner/outer radii to **12/18**, Atom to **12/30**, and Hydrogen to **80/100**. `nukeDeathFactor()` returns `(5 * humans) / max(1, tilesOwned)` for Atom and Hydrogen. For a MIRV warhead it sets `targetTroops = 0.03 * maxTroops`, `excessTroops = max(0, humans - targetTroops)`, and returns `500 * (1 - exp(-2 * excessTroops / maxTroops))`. Therefore a separately evaluated pool at or below 3% of `maxTroops` has zero MIRV global casualty for that calculation. The function comment explicitly says humans can be soldiers at home, soldiers attacking, or soldiers in a boat.

   The same file defines `cityTroopIncrease()` as **250,000** and calculates human `maxTroops` from owned tiles plus the sum of completed City levels multiplied by 250,000. A completed level-3 City therefore contributes 750,000 to the cap. This makes City concentration relevant to MIRV resilience, but it does not mean City deletion directly deletes 250,000 currently held troops. The source supports the narrower statement: losing the City lowers later `maxTroops` calculations and future growth headroom.

3. https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/core/execution/NukeExecution.ts
   For every destroyed owned tile, the detonation records the owner and then repeats the casualty calculation once per impacted tile. It evaluates three sets of pools independently: the player's uncommitted `troops()`, every outgoing attack, and every Transport Ship's cargo. The implementation snapshots the player's `maxTroops` for that warhead's detonation, then applies the relevant death function to each pool on each affected tile. It later writes the reduced cargo values back to every Transport.

   This proves two different evacuation rules. First, Atom and Hydrogen use each pool's current size in the same linear proportional formula, so moving half the home troops into an attack or Transport does not create formula immunity: both pieces lose the same fraction, apart from implementation-level integer rounding that is not a useful strategy. Second, MIRV evaluates the nonlinear 3%-of-cap threshold separately for each home, attack, and Transport pool. Dividing one large home balance among real outgoing attacks or cargo pools can reduce MIRV global casualty and can reduce it to zero for a pool that is at or below the threshold. The maneuver still carries ordinary combat, route, and interception risks and is not a promise that the troops survive the match.

   The same execution performs an independent local deletion pass after troop casualties. Every non-nuke, non-MIRV, non-SAM-missile unit with squared distance **strictly less than** the outer-radius square is deleted. This includes movable Warships, Trade Ships, and Transport Ships as well as immovable Cities, Ports, Factories, SAM Launchers, and Missile Silos. Moving a ship safely beyond the outer radius protects that local unit from this deletion pass. It does not protect the ship's Transport cargo from the global casualty function when the owner also loses affected land. Buildings cannot be evacuated; only prior dispersion, SAM interception, or accepting the loss can protect the layout.

4. https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/core/execution/MIRVExecution.ts
   A MIRV carrier stages up to 350 spatially separated warheads. Each warhead is its own `NukeExecution`, so later warheads calculate against the board and troop pools left by earlier detonations. This matters for City loss: once an earlier warhead deletes completed City levels, a later warhead can observe a lower cap and therefore a lower 3% threshold. The guide should not turn 350 into a guaranteed hit count; valid targets, ownership revalidation, spacing, interception, and staged-target generation can reduce what reaches a given player.

5. https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/tests/core/executions/NukeExecution.test.ts
   The official tests pin the separate building-destruction behavior and verify that buildings within the tested blast are deleted while an out-of-range SAM survives and is redrawn/touched. The tests support the implementation reading but do not supply a general survival probability for a player's particular map.

### Tile destruction versus local unit deletion

For ordinary non-water nukes, every eligible tile within the inner radius enters the destruction set. Between inner and outer radii, each visited tile passes `rand.chance(2)`, approximately a one-in-two inclusion, subject to BFS reachability and impassable tiles. With the water-nukes setting, the engine instead draws a smoothed irregular boundary between the inner and outer radii. Neither stochastic tile boundary changes the separate unit rule: a local unit strictly inside the outer radius is deleted regardless of whether the underlying outer-ring tile happened to enter the terrain-destruction set. A safe player-facing instruction is therefore "move movable units beyond the outer radius," not "park on an outer-ring tile and hope the land survives."

### Precise City-cap limitation

The source does not support saying that the game instantly clips current troops to a lower cap at the moment a City is deleted. `removeTroops()` removes only a positive requested amount, capped at the current home pool, and City deletion is a different operation. What is defensible is that completed City levels feed `maxTroops`, earlier warheads can remove those levels before later warheads evaluate, and the lower cap affects MIRV's 3% threshold and later troop growth. The guide should report current troops and cap as separate post-impact values instead of inventing an immediate "City population spill" mechanic.

## Reddit discussions opened and analyzed

1. https://www.reddit.com/r/Openfront/comments/1ri6noi/how_are_you_supposed_to_recover_from_a_mirv/
   **Title:** "How are you supposed to recover from a MIRV?"
   **Date / relative age:** 2026-03-01, about seven months old at access.
   **Player question:** The original poster asks what meaningful response the inbound-MIRV warning gives a defender. A comment makes the exact evacuation question explicit: would sending roughly half the troops on an invasion help?
   **Observation:** Replies say land and naval invasions still receive nuke effects, while another commenter claims that spamming boats avoids troop loss. The disagreement is valuable evidence of player confusion: they are mixing a pool's global MIRV casualty with whether a Transport's local unit is inside the blast. The current tagged source resolves the question more precisely than either slogan: attack and Transport pools are included, but MIRV applies its 3%-of-cap threshold separately to them.
   **Limitation:** The discussion predates v0.34.22 and contains contradictory community claims. It establishes the question and player language, not the current formula.

2. https://www.reddit.com/r/Openfront/comments/1uauzps/v32_hydro_mechanics/
   **Title:** "V32 Hydro Mechanics"
   **Date / relative age:** 2026-06-20, about three months old at access.
   **Player question:** A player reports that a Hydrogen strike left only one Port while apparently erasing the rest of the buildings, and asks why a level-5 SAM did not save the position.
   **Observation:** The thread illustrates a recurring decision error: treating interception coverage and post-impact outer-radius deletion as one mechanic. Once the strike lands, an immovable SAM, Silo, City, Factory, or Port inside the 100-tile Hydrogen outer radius cannot be "evacuated." The pre-impact decisions are coverage, prior dispersion, and moving only assets that can actually move.
   **Limitation:** This is a v32 anecdote, and comments debate replay/loading details. It cannot establish current blast radii, deletion order, or SAM reach; all numbers come from the v0.34.22 tag.

3. https://www.reddit.com/r/Openfront/comments/1p0hv53/how_to_survive_a_mirv/
   **Title:** "How to Survive a MIRV"
   **Date / relative age:** displayed as about one year old at access.
   **Player question:** The post compares a defender with more than 70 SAMs who still retained roughly 500,000 troops after a MIRV against an attacker who ended below 50,000. Comments discuss whether a full send can finish before impact and whether building hundreds more Cities makes a player "MIRV proof."
   **Observation:** Players are already making the three linked choices the proposed guide should disentangle: City capacity, SAM investment, and moving troops into active attacks. The thread's extreme setup makes the tradeoff vivid, while the tagged formula explains the threshold without adopting the thread's slogans.
   **Limitation:** The scenario is old, economically extreme, and does not isolate which warheads landed or which pools existed. The quoted troop and City counts are observations, not a recommended build count or proof of immunity.

## YouTube videos and verified captions

1. https://www.youtube.com/watch?v=nmVx64pfLOw
   **Title:** "New Map. New Meta. HYDROGEN BOMBS | OpenFront.io" by Enzo Plays.
   **Upload date / relative age:** 2025-07-19, about fifteen months old at access. Duration: 33:58.
   **Player question:** At roughly 29:01, an inbound Hydrogen warning prompts the live question, "what do we do about this?"
   **Observation:** The player's immediate answer is retaliation. Around 29:14, the commentary recognizes that the hit will cause major damage but that the opponent has more to lose; by about 29:25, many of the opponent's local assets have disappeared. This is useful evidence that players often spend the warning window on counterfire rather than separating what can still be evacuated from what cannot.
   **Limitation:** The captions and visuals document one match and one player's interpretation. They do not reveal the formula, exact destroyed-tile count, or whether any troop split changed casualties. English auto-captions may contain ASR errors.

2. https://www.youtube.com/watch?v=oy51pl-p1CM
   **Title:** "Something has changed in OpenFront.io...Giant players are now MORTAL!" by Ultimus_Rex.
   **Upload date / relative age:** 2025-07-27, about fourteen months old at access. Duration: 43:39.
   **Player question:** Around 12:41, the player asks how many Cities the incoming Hydrogen will remove while noting a position with 14 Ports and 16 Cities. Later, around 18:49-19:05, another Hydrogen is discussed as landing on a SAM area.
   **Observation:** The sequence supplies player-facing language for concentration risk: the decision is not only how many buildings exist, but how many irreplaceable levels share one outer-radius footprint. The post-hit reaction around 12:46 is that the result "could have been worse," which reinforces that visual outcomes vary while the local deletion radius remains the reliable evacuation boundary.
   **Limitation:** The video is an older gameplay record. Counts spoken before and after a strike cannot be used to infer a current random-tile probability, casualty coefficient, or guaranteed number of destroyed Cities. English auto-captions may contain ASR errors.

3. https://www.youtube.com/watch?v=RQMm9XtkkiA
   **Title:** "My neighbor created the most STRUCTURE-DENSE piece of land EVER! | OpenFront.io" by Ultimus_Rex.
   **Upload date / relative age:** 2025-05-02, about seventeen months old at access. Duration: 36:11.
   **Player question:** The video studies whether a dense cluster of captured structures is an advantage worth keeping or a single-point nuclear liability.
   **Observation:** Around 14:38-14:45, after acquiring approximately eleven or twelve buildings, the player calls the area the "most nukeable land." Around 17:36-18:15, the commentary says one Hydrogen could erase the cluster and estimates that about 30 Cities would have been lost; the incoming strike is intercepted. The useful lesson is prospective: concentration changes which immovable assets should receive SAM coverage and which shoreline units should be moved, even when the strike ultimately does not land.
   **Limitation:** Because the strike is intercepted, the "30 Cities" figure is a player's counterfactual estimate, not an observed blast result. It must not be promoted into a radius formula or guaranteed outcome. English auto-captions may contain ASR errors.

## Cross-source player questions

- If a Hydrogen or Atom warning appears, does sending troops away reduce the total loss, or merely move the same proportional loss into another pool?
- Does a "full send" work differently against a MIRV because attacks and Transport cargo are evaluated separately?
- Can a Transport save its cargo by sailing away, or does moving only protect the hull from the local deletion pass?
- Which warning-window assets are actually movable: Warships, Trade Ships, and Transports versus Cities, Ports, Factories, SAMs, and Silos?
- Does losing high-level Cities kill a hidden civilian population, or does it lower `maxTroops` and therefore change later MIRV thresholds and growth?
- How far is far enough for a ship, and why is "beyond the outer radius" safer advice than trusting the random outer-ring terrain result?

## Decision findings for the guide

### Atom or Hydrogen inbound

Do not create a troop split solely to dodge global casualties. Suppose a defender has 100,000 uncommitted troops and the per-tile proportional factor at one step is 1%. Leaving the balance together removes roughly 1,000. Splitting it into a 50,000 home pool and a 50,000 outgoing attack removes roughly 500 from each, still about 1,000 total. Repeated impacted tiles apply the same logic to the then-current balances. The exact live result depends on the number of owned tiles actually destroyed and integer handling, but the strategic conclusion is stable: ordinary nuclear loss is proportional and follows all three pool types.

Instead, use the warning to move valuable **units** beyond the local outer radius when travel time permits. For a Hydrogen, that means safely past 100 tiles from the destination; for an Atom, past 30. A Transport outside that circle avoids direct unit deletion, but its cargo remains in the global casualty loop if the player loses owned tiles. Warships and Trade Ships have no ordinary troop cargo in this calculation, so moving them is a clean local-asset save. Do not leave a Transport just inside the boundary because its cargo calculation and hull deletion are cumulative risks.

### MIRV inbound

Read the displayed or computed `maxTroops`, then calculate **3% of that cap**. Each home, outgoing-attack, and Transport-cargo pool at or below that number has zero global MIRV casualty for the formula call. As a worked assumption, if `maxTroops` is 2,000,000, the threshold is 60,000 per pool. A 180,000 home balance sits above the threshold. Three genuine pools of 60,000 each sit at it. That can change MIRV damage materially even though the same split does nothing to evade the Atom/Hydrogen proportional formula.

This is not free insurance. An outgoing attack can lose conventionally, complete before the warheads land, expose the homeland, or be forced into retreat. A Transport can be intercepted, can enter the local 18-tile radius of one warhead, or can retain enough cargo to remain above the threshold if the defender misreads the cap. Earlier MIRV warheads can also delete Cities, lowering the cap and lowering 3% for later warheads. The guide should therefore frame splitting as a bounded, time-sensitive MIRV maneuver: make only pools that remain useful if the strike is intercepted or lands differently than expected.

### Immovable structures and City capacity

The warning is too late to relocate a City, Port, Factory, SAM, or Silo. Protect them through prior spacing and destination-side SAM coverage. Rank clusters by replacement value and by cap concentration: a high-level City cluster is both an economic/structural target and a large share of `maxTroops`. However, avoid saying each destroyed City instantly kills its 250,000-per-level contribution in existing troops. The verified consequence is a lower future cap and, during a MIRV stream, potentially a lower threshold for later warheads.

## Failure modes and counters

- **"Boat spam makes troops immune."** False as a blanket statement. Transport cargo is explicitly evaluated by the casualty loop. Against MIRV it may benefit from the same per-pool threshold; against Atom/Hydrogen it receives the proportional loss. Keep the vessel outside the local outer radius as a separate step.
- **"A full send always saves the army."** False for Atom/Hydrogen and conditional for MIRV. The attack is still an evaluated pool. Only MIRV's nonlinear threshold creates a specific split benefit, and the attack must remain active and tactically viable.
- **"The random outer ring may spare my ship."** The terrain set may be random there, but the local unit deletion pass is deterministic for units strictly inside the outer radius. Cross the boundary rather than gambling on the tile.
- **"More Cities make me MIRV-proof."** Cities raise the cap and thus raise 3% of it, but concentrated Cities are immovable local targets. A cap benefit and a blast-layout liability can coexist.
- **"The warning lets me rebuild the layout."** It does not. SAM interception and pre-existing dispersion own structure survival. The warning window is mainly for reading the weapon, moving already-mobile units, and deciding whether a MIRV-specific troop split is worth its conventional risk.

## Mode and map adjustments

On compact maps and short channels, ships may not have enough time to clear a 100-tile Hydrogen radius; prioritize the highest-value mobile hulls and do not empty the home pool into a losing attack just to appear active. On large water maps, long travel lanes make fleet evacuation more practical, but Transport cargo still follows global casualty rules. In team modes, an outgoing attack may be a useful reinforcement rather than a sacrificial split, yet each player's cap and pools remain their own; the guide should not imply a teammate's Cities raise the defender's threshold. In dense FFA cores, multiple players may own tiles inside the same blast, and each affected player is evaluated separately. Water-nuke settings alter the destroyed-tile boundary but do not create a safe inner pocket for units inside the configured outer radius.

## Freshness and evidentiary limits

The numeric mechanics above are taken only from the official v0.34.22 release tag and its unchanged nuke implementation, not from Reddit votes, video commentary, a TEST release, or visual counting. Community sources establish the language, misconceptions, and situations players face. Their dates span May 2025 through June 2026, so they are intentionally not used as current numeric authorities. A later release that changes `nukeDeathFactor`, `nukeMagnitudes`, `maxTroops`, the pool enumeration in `NukeExecution`, or local unit deletion would require a fresh audit.

The guide should also avoid claiming deterministic total losses from a radius alone. Total global casualties depend on which owned tiles enter the destruction set, the player's changing tile count, current values in each pool, the cap captured for each detonation, and the number of MIRV warheads that actually land. Worked scenarios must label their cap, pool sizes, affected-tile count, and survival of the relevant attack or Transport as assumptions.

## Counts

Reddit discussions opened and analyzed: **3**.
YouTube watch pages preflighted and videos/captions analyzed: **3**.
Official primary URLs: **5** (one formal release page and four tagged source/test files).
Research body: written in English and intentionally above the 600-English-word source-pack floor.
