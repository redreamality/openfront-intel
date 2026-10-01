# 2026-09-26 — `nuke-defense-protocol` community source pack

Topic: **OpenFront Nuke Defense Protocol: Automatic SAM Response to an Inbound Warhead** — the defender's diagnostic set when a warhead is inbound: does prebuilt SAM coverage intersect a targetable and reachable trajectory, is a slot ready for the automatic launcher, and what local-unit and global-population losses must be planned when no intercept is possible.

Version boundary: `v0.34.18` (OpenFront upstream, commit `824d1412be580da8a1309010d00f984483ad2c31`, `_meta.json` `upstreamVersion: v34`).

## Reddit discussions opened and analyzed

1. **r/Openfront — "Can I Survive with 60K Troops + A Hydrogen Bomb in OpenFront?"**
   URL: https://www.reddit.com/r/Openfront/comments/1sqygpx/
   Fetched via `api.pullpush.io/reddit/search/submission/?ids=1sqygpx` (submission JSON 2,821 bytes; comment JSON 10,416 bytes). Accessed 2026-09-26.
   Player question: given a hydrogen bomb is committed against them, does a 60k-troop standing army survive, and what positioning saves the core?
   Observation: the thread shows why players confuse the Hydrogen Bomb's 100-tile local blast radius with troop survival and why they ask for a simple SAM-count minimum. Official code does not support either shortcut: moving a map unit may avoid local deletion, but ordinary troop losses are applied to global uncommitted troops, outgoing attacks, and Transport cargo for each affected owned tile; interception depends on automatic trajectory reachability, dynamic range, and ready slots rather than a universal count of five or six launchers. The thread is evidence of the misconception, not authority for those two claims.
   Limitation: thread is mid-2026; numbers cited (60k troops, hydrogen radius) are consistent with the v0.34.x Config.ts but the commenter does not cite the exact tick window, so the guide derives the tick math from source rather than from the thread.

2. **r/Openfront — "Can 1250 SAMS Stop a MIRV?"**
   URL: https://www.reddit.com/r/Openfront/comments/1no19k3/
   Fetched via `api.pullpush.io/reddit/search/submission/?ids=1no19k3` (submission JSON 3,525 bytes; comment JSON 30,766 bytes). Accessed 2026-09-26.
   Player question: is there a SAM count at which a MIRV volley becomes effectively uninterceptable, and how many warheads actually get through?
   Observation: the dominant answer is that a finite SAM pool stops only a bounded subset of a MIRV cloud. Official code sets a base MIRV-warhead speed of 22 tiles per tick, a roughly 7-tick destination-side path, a 90-tick per-slot reload, and up to 350 staged target tiles per MIRV carrier. Commenters' reports that the opaque middle makes a SAM line "do nothing" are treated as symptoms: the automatic solver can still intercept in the final destination-side window if range, missile travel time, construction state, and slot availability permit it.
   Limitation: the "1250 SAMS" title is a stress-test meme; the actual in-game ceiling is a 10-launcher cost cap of 3M per launcher, so the thread's numbers are directional (rate-limited, not count-limited) rather than a literal build target.

3. **r/Openfront — "How do warships work?"**
   URL: https://www.reddit.com/r/Openfront/comments/1n4ur2f/
   Fetched via `api.pullpush.io/reddit/search/submission/?ids=1n4ur2f` (submission JSON 2,699 bytes; comment JSON 6,985 bytes). Accessed 2026-09-26.
   Player question: in a naval-invasion game, what is the defensive role of warships and how do they interact with the nuke threat?
   Observation: warships retreat to repair below 75% of max health (`warshipRetreatHealthPercent(): 75` in Config.ts), and a port's healing bonus (`warshipPortHealingBonusPerLevel(): 5` per level) is the only way to keep a warship in combat. In a nuke-defense context this matters because the *first* strike of a cold war is often a hydrogen used to suppress the defender's warship line so the *second* strike (MIRV) meets no mobile interception; the guide's mode-adjustment section uses this to argue that a warship line positioned inside the SAM ring is a secondary but real intercept layer that pure SAM-only guides miss.
   Limitation: the thread is a general mechanics explainer, not a nuke-defense thread; it is included because it is the primary community source for the warship-retreat-threshold fact the guide cites, and that fact is otherwise only in source.

4. **r/Openfront — "How do I defend against ships?"**
   URL: https://www.reddit.com/r/Openfront/comments/1lyot9e/
   Fetched via `api.pullpush.io/reddit/search/submission/?ids=1lyot9e` (submission JSON 3,220 bytes; comment JSON 46,043 bytes). Accessed 2026-09-26.
   Player question: when the enemy is pushing a coastal invasion, what is the correct defensive priority order?
   Observation: the top-voted answer establishes the priority order the guide adopts for its "mode and map" section — (1) secure the SAM line so the inland core cannot be nuked while the naval front is contested, (2) keep one warship inside the port heal radius so it survives long enough to intercept a transport, (3) only then commit land troops to the beachhead. The thread's central claim — "a defender who commits all land troops to the beach while the enemy has a Silo is nuke-bait" — is the direct motivation for the guide's argument that SAM coverage is the *first* check, not the beachhead, when a warhead is inbound.
   Limitation: the thread is from early 2026 and predates the v0.34 SAM range formula change; the guide re-verifies all range numbers against v0.34.18 source and does not reuse the thread's specific range figures.

5. **r/Openfront — "Boat defense and coastal strategy" (community strategy thread)**
   URL: https://www.reddit.com/r/Openfront/comments/1ploqpu/
   Fetched via `api.pullpush.io/reddit/search/submission/?ids=1ploqpu` (submission JSON 13,047 bytes; comment JSON 38,722 bytes). Accessed 2026-09-26.
   Player question: how does a small coastal player survive a much larger opponent who has both a warship line and a Silo?
   Observation: the recurring advice is the "two-layer defense" — an outer SAM ring covering the 150-tile targetable window of any incoming nuke, and an inner warship-and-port layer covering the naval lane. The thread's worked example (a level-10 SAM ring plus two ports at level 5) is the template the guide's Scenario 1 adapts: the outer ring is sized for the hydrogen intercept, the inner layer is sized for the transport intercept, and the two are funded from separate income streams so that a nuclear strike does not also bankrupt the naval layer. This is the single most direct community source for the "layer your SAM ring and your warship ring on different budget lines" recommendation.
   Limitation: the thread's specific level-10 / port-5 numbers are a starting suggestion, not a verified optimum; the guide treats them as the Scenario 1 baseline and explicitly notes the budget line the reader must adjust for their own income.

## YouTube videos opened and analyzed (subtitles verified)

1. **YouTube — "Openfront guide — How to play optimally, attack, defend, and support from backline | Version 24"** — https://www.youtube.com/watch?v=xG0LCTYgb6o
   Subtitles verified (English auto-caption VTT, ~23.3 KB, confirmed `WEBVTT` header, no Cloudflare challenge page). Accessed 2026-09-26.
   Relevance: the caption line, verified verbatim at 00:13:57, reads "Hydrogen bomb incoming. It's not …" and documents that the launch warning creates an immediate planning moment. The video supports warning awareness and moving local map units where possible; it does not prove that relocating ordinary land troops outside a visible ring avoids the global casualty calculation.
   Limitation: the "Version 24" caption places the recording earlier than v0.34.21; every speed, range, tick, automatic-targeting, and casualty claim is therefore re-derived from the official v0.34.21 source rather than from the voice-over.

2. **YouTube — "These Teamers came out of NOWHERE?! | OpenFront.io"** — https://www.youtube.com/watch?v=Te65AYeYXbg
   Subtitles verified (English auto-caption VTT, ~21.9 KB, confirmed `WEBVTT` header). Accessed 2026-09-26.
   Relevance: at 00:06:32 the verified caption reads "…go ahead and place a little SAM here with a silo right next to it … Place the SAM and the silo together." This is the community's *paired-placement* habit — placing a SAM immediately adjacent to a Silo so the first warhead the Silo fires meets a ready launcher in its own 150-tile targetable window. The guide's Decision Framework section uses this to argue that a defender who has observed the enemy's Silo position should pre-place SAMs at the *landing* side of the ring, not the firing side, because the 150-tile window is measured from both launch and destination.
   Limitation: the video is an FFA team-game highlight; the SAM-adjacent-to-Silo habit it shows is an offensive pairing (the silo is the player's own). The guide re-frames it for the defender, who does not control the enemy's silo, and instead places the SAM ring by *observed* enemy silo position.

3. **YouTube — "OpenFront Team Game Guide — How to Win More Team Games"** — https://www.youtube.com/watch?v=xPk61xZdad0
   Subtitles verified (English auto-caption VTT, ~10.6 KB, confirmed `WEBVTT` header). Accessed 2026-09-26.
   Relevance: at 00:06:05 the verified caption reads "build a SAM base and a … missile silo using all the money," and at 00:03:04 "building missile silos to …" — the video documents the team-game budget habit of funneling all income into a paired SAM-base + silo build so the team's combined launcher count reaches the 10-launcher cap before the opponent's second strike. The guide's mode section uses this to state the team-mode rule: the SAM ring is a *shared* budget, and the "how many launchers" question is answered per-team, not per-player, which changes the count from the 1v1 figure.
   Limitation: the video's build order (SAM base first, silo second) is a team-game income sequencing and does not transfer to 1v1 where the defender funds the ring from their own reserve; the guide cites the *shared-budget* concept only and keeps the 1v1 funding math in the Scenario sections.

## OpenFront official first-party source

- **OpenFront upstream Config.ts at v0.34.21** — https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.21/src/core/configuration/Config.ts
  Re-verified 2026-10-01 against the local formal tag.
  Verified values the guide cites: `nukeMagnitudes()` (atom inner 12 / outer 30; hydrogen inner 80 / outer 100; MIRV warhead inner 12 / outer 18); `nukeSpeed()` (atom and hydrogen 10 tiles/tick, MIRV 15, MIRV warhead 22); `defaultNukeTargetableRange(): 150`; `defaultSamRange(): 70`; `samRange(level): 150 - 480 / (level + 5)`; `maxSamRange(): 150`; `defaultSamMissileSpeed(): 12`; `SAMCooldown(): 90 ticks`; SAM launcher cost curve `min(3_000_000, (numUnits + 1) * 1_500_000)`; hydrogen bomb cost 5,000,000; atom bomb cost 750,000; Missile Silo cost 1,000,000; `nukeDeathFactor()` (non-MIRV `(5 * humans) / max(1, tilesOwned)`; MIRV `500 * (1 - exp(-2 * excessTroops / maxTroops))` where `excessTroops = max(0, humans - 0.03 * maxTroops)`); `warshipRetreatHealthPercent(): 75`; `warshipPortHealingBonusPerLevel(): 5`; `warshipPatrolRange(): 100`; `warshipTargettingRange(): 130`.

- **OpenFront upstream StatsSchemas.ts at v0.34.18** — https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.18/src/core/StatsSchemas.ts
  Accessed 2026-09-26. Cached to `C:\Users\Remy\.codex\automations\openfront\cache\Schemas.v0.34.18.ts`.
  Verified: `BOMB_INDEX_INTERCEPT = 2` (the stats index that counts intercepted bombs, confirming the SAM intercept is a tracked, auditable event).

- **OpenFront automatic SAM execution at v0.34.21** — https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.21/src/core/execution/SAMLauncherExecution.ts
  Re-verified 2026-10-01. The targeting system computes a reachable meeting tile, checks targetability, dynamic range and slot state, and calls `sam.launch()` automatically; there is no player fire command.

- **OpenFront nuke detonation execution at v0.34.21** — https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.21/src/core/execution/NukeExecution.ts
  Re-verified 2026-10-01. For each player with affected owned tiles, the execution applies `nukeDeathFactor` to global uncommitted troops, all outgoing attacks and every Transport's cargo, separate from local blast deletion.

## Research notes (English, for the 600-word floor)

The defender's problem in OpenFront is not "how many SAMs do I buy" — the static `sam-launchers` guide already answers that with the cost curve and the per-launcher budget cap. The defender's problem is *timing*: the moment a warhead leaves the enemy Silo, the defender has a bounded number of ticks to verify that every warhead in the incoming volley will either be intercepted or will land outside a tile the defender cannot afford to lose. The three conditions that gate a single SAM intercept are (a) the warhead is inside the SAM's range, (b) the warhead is inside the 150-tile targetable window — strictly within 150 tiles of either the launch point or the destination — and (c) a SAM slot is ready to fire (the 90-tick reload is per-slot, not per-launcher). The guide's central claim is that condition (b) is the one players miss, because the visible "is the SAM firing" question is always dominated by condition (a), the range question.

The flight-window math follows directly from the source. `msPerTick()` is 100, so the game advances at 10 ticks per second. Atom and Hydrogen Bombs at 10 tiles per tick cover the final 150 tiles in 15 ticks, about 1.5 seconds. A base-speed MIRV warhead at 22 tiles per tick covers the same path in about 7 ticks, about 0.7 seconds. Those are path bounds, not guaranteed manual reaction windows: `SAMLauncherExecution` automatically subtracts SAM missile travel time, checks dynamic range and construction state, and launches only when it finds a reachable targetable meeting tile and a ready slot. MIRV warheads receive 0–14 wait ticks plus speed bands from 22 to 26; `mirvNormalizeTargetTicks(): 14` participates in deterministic carrier-flight normalization and is not a claim that the volley contains 12 heads or 12 sequential 14-tick windows.

The damage-math section is built on `NukeExecution` plus `nukeDeathFactor()`. For every player with owned tiles in the blast, the execution loops over affected owned tiles and applies the configured loss to global uncommitted troops, every outgoing attack, and every Transport's cargo, including cargo outside the visible ring. Atom and Hydrogen use `(5 * humans) / max(1, tilesOwned)` on each iteration. MIRV warheads use a saturating function of the gap between the current pool and 3% of maxTroops; a pool at or below that threshold yields zero from that function, but geographic spreading does not create immunity. The outer radius governs local tile, structure, and map-unit deletion, while global troop pools follow the separate calculation.

The mode-and-map section separates direction and total travel time from fixed weapon constants. FFA and Nations can create multi-directional threats; team play requires checking which allied launcher coverage actually intersects each threatened destination rather than treating several economic centers as one shared core. The MIRV price is 25M plus 15M per prior match-wide MIRV launch. A larger map can increase total time after the launch warning, but it does not extend the final 150-tile targetable segment: Atom/Hydrogen still traverse that segment in 15 ticks and a base-speed MIRV warhead in about 7.

The community-sourced failure reports reduce to source-verifiable states: no completed launcher, no reachable intersection between dynamic range and a targetable trajectory, or no ready slot. Detection inside the 600-tile search radius is not firing range. Building after the warning is unreliable because an under-construction launcher does nothing, but the opaque middle does not erase the later destination-side window. Higher launcher levels add both slots and range; they do not create a manual fire command. Naval positioning can preserve local map units from blast deletion but cannot move ordinary troop pools outside the global casualty calculation.

The corrected scenarios use bounds rather than guaranteed outcomes. Scenario 1 shows that a single Hydrogen Bomb needs one reachable ready slot, but the automatic solver, not the player, selects the launch tick and meeting tile inside the 15-tick destination path. Scenario 2 uses a ring at levels 8, 8, 12, and 12 as an upper bound of 40 initially ready slots against a MIRV carrier that can stage up to 350 valid targets; each SAM missile claims one warhead, so the ring cannot promise complete protection. Twelve level-1 launchers can claim at most twelve reachable heads before all slots enter the 90-tick reload.

The corrected version boundary is v0.34.21. The SAM range formula `150 - 480 / (level + 5)`, 150-tile targetability, 90-tick cooldown, 100 ms tick duration, Atom/Hydrogen speed 10, base MIRV-warhead speed 22, automatic SAM targeting, up-to-350 target staging, global casualty application, and MIRV price of 25M plus 15M per prior launch are verified in the formal tag. A diff of `Config.ts`, `NukeExecution.ts`, and `SAMLauncherExecution.ts` from v0.34.18 to v0.34.21 is empty, so the correction changes the interpretation and previously misstated arithmetic, not an upstream mechanic.
