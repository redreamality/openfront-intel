# Community source pack - Four Islands public FFA openings

- Proposed guide slug: `four-islands-ffa-openings`
- Research question: **In a normal public FFA on Four Islands, how should a player choose a home island, clear local bots and Nations, decide when the first cross-island transport is justified, and cancel or reroute a landing that is becoming a trap?**
- Current official boundary: OpenFrontIO `v0.34.20`, published 2026-09-26.
- Access date for every source and local repository check: **2026-09-30**.
- Evidence rule: Reddit and YouTube establish player questions, observed decisions, language, and failure modes. Map dimensions, public-playlist inclusion, spawn constraints, transport targeting, retreat losses, and Warship behavior come only from the official tagged repository and its tests.

## Topic choice and non-duplication boundary

The proposed guide owns a public-FFA opening decision that the site's existing Four Islands answer deliberately does not cover. `four-islands-team-coordination` is about coordinated teams, assigned quadrants, donations, and ally-supported crossings; it explicitly excludes public FFA. The new page instead begins with a player who has no guaranteed allies and must choose a personal spawn, finish the home island without looking weak, and decide whether the first boat creates a defensible second front or merely donates troops. It ends once the player has either secured a real bridgehead or consciously abandoned that crossing. It does not become a general Port economy guide, a Warship manual, or a renamed version of the team page.

The demand is coherent across sources even though no single community item supplies a complete answer. The two direct Four Islands Reddit threads show opposite ends of the same opening: one player converts sole control of an island into protected infrastructure and economic pressure, while another reports a late lock in which every cross-water attempt can be answered by ships. The direct Four Islands video is a team match, but it demonstrates that a marginal front may need to be abandoned and that an enemy bridgehead is dangerous. Two FFA videos on other island maps supply the missing individual-player comparison: safer island play often begins from a larger land base, early boats are valuable only while an open shore exists, and an attacker should stop spending after the immediate objective has been taken. The official code then supplies the hard constraints that community anecdotes cannot: Four Islands is in normal FFA rotation, FFA spawns are not assigned to team quadrants, transports require a reachable shore, retreat costs troops, and defending Warships prioritize transports.

## Accessibility preflight and retrieval method

The canonical Reddit pages for all three counted discussions returned HTTP 403 safety pages during preflight. They were not counted from snippets. The full post records and available comments were opened through Arctic Shift exact-ID endpoints, after broad and title searches timed out. The public citations below remain the canonical Reddit URLs. This is an access limitation, not evidence that the discussions were deleted.

All three counted YouTube watch URLs resolved through `yt-dlp`; metadata and `en-orig` caption tracks were available and downloaded. The observations below were checked against the caption text and timestamps, not inferred from titles or thumbnails. One additional candidate, `https://www.youtube.com/watch?v=aOG_NQbnlZo`, returned "This video is not available" and is excluded from every count and conclusion.

## Reddit discussions actually opened and analyzed (3)

### R1 - A 40-player FFA island win and its spawn veto

- URL: https://www.reddit.com/r/Openfront/comments/1vkjp2v/
- Title: "How to win as an Island Player - 40 Player FFA"
- Date / relative age: posted 2026-08-10; about seven weeks old at access.
- Player question: When is an island start viable in a large FFA, and what should disqualify it before the match begins?
- Observations: The author describes a France FFA won from Corsica. Their most useful opening statement is a veto, not a build order: they quickly cleared the bots and Nation because no human contested the island, and say they would not have spawned there if another player had selected it. Their alternative would have been a mainland start followed by an early boat. After sole control, they used a Port and Warship for piracy, then expanded trade and delayed Cities until the isolated position actually needed population. They waited for mainland players to damage one another before committing to the final fight. The two archived comments praise the comeback and a factory-placement idea but add no independent rule evidence.
- Limitations: France/Corsica is not Four Islands, and this is one successful personal replay with only two comments. The author's exact SAM levels, Gold reserves, Port sequence, and late-game purchases are not portable rules. For the proposed guide, the source supports three conditional questions only: Is another human sharing the home island? Can the island be cleared without a draining early duel? If the answer changes during spawn selection, is there a larger starting pocket from which a crossing can be made later?
- Accessed: 2026-09-30 via Arctic Shift full post and comments records.

### R2 - Direct Four Islands evidence for home-island control

- URL: https://www.reddit.com/r/Openfront/comments/1ukjxab/
- Title: "Intense 4 Island game shows the importance of early game SAMS"
- Date / relative age: posted 2026-07-01; about three months old at access.
- Player question: What can a player do after taking one complete island, and why does allowing a rival to establish infrastructure matter?
- Observations: The author identifies themselves as the top-right-island player. They say they first took control of the island, established a protected point, then built enough Ports to lead the economy and attacked opponents' attempts to establish their own. That sequence is useful as an observed state transition: local ownership came before the protected economic position, and denying rival footholds mattered after the home island was secure. It also provides a clean counterexample to an immediate cross-island rush. The post's outcome depends on what the player could safely hold, not on owning pixels on a second island as early as possible.
- Limitations: The post is very short, has no archived comments, and supplies no lobby settings or controlled comparison. Its title emphasizes early SAMs, but one anecdote cannot establish a universal "SAM first" sequence. The guide must not turn the author's stack size, Port count, or structure order into a rule. This source is retained because it is directly about Four Islands and distinguishes a secure home base from an exposed landing.
- Accessed: 2026-09-30 via Arctic Shift full post record.

### R3 - A direct Four Islands deadlock and disputed exits

- URL: https://www.reddit.com/r/Openfront/comments/1rqbica/
- Title: "Softlock on 4 Islands ( with a link )"
- Date / relative age: posted 2026-03-10; about six and a half months old at access.
- Player question: Why can a Four Islands match become locked after each survivor has an island, and which earlier actions might have prevented it?
- Observations: The author presents a three-player Four Islands end state in which crossing is unattractive because a defender can answer with a Warship funded by established infrastructure. The replies dispute whether this was a true lock: one commenter asks why the author did not use a MIRV earlier or why the other players did not embargo and Hydro the Warships. The author answers that the players were not prearranged allies, that trade incentives discouraged embargoes, and that any invasion could be met by a new Warship. This disagreement is valuable because it turns "cross now" into a timing question. A shore that is open before Ports, Warships, and alliances mature may be closed later; waiting for certainty can remove every cheap route.
- Limitations: The thread does not establish whether the match was a normal public lobby or a private game, and one commenter explicitly suspects a private game. It is retrospective, contentious, and focused on the endgame. It cannot prove that an early MIRV, embargo, Hydro, or boat always solves Four Islands. It supports only the failure pattern: if every survivor completes an island and can replace naval defense, a first crossing becomes far more expensive than it was during the opening.
- Accessed: 2026-09-30 via Arctic Shift full post and five archived comments.

## YouTube videos with verified captions (3)

### Y1 - Direct Four Islands team match as a mode contrast

- URL: https://www.youtube.com/watch?v=iM25gb6R8p0
- Title: "The Battle of the 4 Islands | OpenFront.io" - Enzo Plays
- Date / relative age: published 2026-05-25; about four months old; 1:58:30.
- Player question: Which visible signals show that a cross-island front is poorly placed or no longer worth reinforcing?
- Observations: The video is a direct Four Islands match. Around 0:59 the player starts a southbound boat; around 1:07 they criticize another team's unusual spawn and bring out a Warship. At about 3:08 they are already unsure whether their side will keep a contested island. Much later, at 29:32, they conclude that the front has to be given up. The match also repeatedly treats an opposing foothold as something that must not be allowed to stabilize. These moments supply observable cancel signals for the FFA guide: a landing with no room to widen, a defender already screening it with naval force, or a front that needs continuous rescue is not a bridgehead merely because one transport arrived.
- Limitations: This is a four-team game, not FFA. Team assignments, donations, coordinated roles, and the ability to let an ally hold one front materially change the economics. None of those conclusions may be copied into the FFA answer. The video is used only as direct visual evidence of Four Islands route pressure, front abandonment, and the danger of a stabilized beachhead.
- Accessed: 2026-09-30; watch metadata plus complete `en-orig` WebVTT captions verified.

### Y2 - A 45-player FFA island recovery and the closing window

- URL: https://www.youtube.com/watch?v=fSRaePiO9eM
- Title: "What happens when you spawn on the center island? | OpenFront.io" - Ultimus_Rex
- Date / relative age: published 2026-06-22; about three months old; 51:28.
- Player question: Is it safer to start directly on a small island, or to begin with mainland growth and take the island while the route is open?
- Observations: In a 45-player FFA on Gulf of St. Lawrence, the creator says at 0:14 that the safer island opening is usually to spawn on the mainland and boat into the island. They take nearby bots, then choose a City at about 1:09 because land expansion is still possible rather than following a context-free Port-first rule. Around 3:41 they abandon ineffective mainland pressure and consolidate on the island. At 19:35 they judge that another player should have boated into an open area earlier. In the 27-minute recap, they describe being forced off the mainland but recovering through the island, piracy, Ports, and Cities. The transferable lesson is a window model: clear cheap land while it exists, cross before the chosen shore is screened, and contract back to a defensible island if the mainland front consumes troops without widening.
- Limitations: The map is Gulf of St. Lawrence, not Four Islands. Its center island, mainland, coast lengths, and player distribution differ. The guide may borrow the decision questions and observed timing failure, but all Four Islands geometry, rotation, and mechanics must come from official sources below.
- Accessed: 2026-09-30; watch metadata plus complete `en-orig` WebVTT captions verified.

### Y3 - Largest-pocket assumption, fast island claim, and stopping after the objective

- URL: https://www.youtube.com/watch?v=l32I4KACy2o
- Title: "This will become the ULTIMATE Island Map! | OpenFront.io" - Ultimus_Rex
- Date / relative age: published 2026-07-02; about three months old; 1:04:21.
- Player question: How should a player combine a large home pocket with an early island claim, and when should an attack be stopped after taking the desired asset?
- Observations: In the opening game, the creator begins with the explicit assumption that the largest landmass is the safest base, then immediately sends a boat toward Hainan. At about 1:06 they prioritize Nations before attacking human players. Around 3:08 they cancel an attack as soon as its immediate objective is complete and redirect resources to another City. A later 25-player FFA on a fictional island map again compares an outer-island spawn with larger central landmasses. This source supports a sequence rather than a magic coordinate: secure enough low-cost home growth, use an early crossing to claim a specific open structure or pocket, and stop feeding the attack once the objective is held or the route ceases to widen.
- Limitations: None of the games is Four Islands, and creator commentary is an evolving hypothesis rather than a formal test. Hainan and the later fictional map have different terrain. The guide must not claim that the largest island is automatically best; human density can reverse that result. The usable evidence is the explicit assumption, the early route choice, the Nation-before-player ordering, and the demonstrated attack cancellation.
- Accessed: 2026-09-30; watch metadata plus complete `en-orig` WebVTT captions verified.

## Official first-hand sources and fact anchors

### O1 - Formal Release boundary

- URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.20
- Title: OpenFrontIO Release `v0.34.20`
- Date / relative age: published 2026-09-26; four days before access.
- Player question: Which shipped ruleset may the guide claim to describe?
- Observations: `v0.34.20` is the current formal non-TEST Release used for this source pack. The tagged commit is `feba4a51c33475a184d9c42e35cc5e55829ee3ca`. Every mechanic and map claim below was read from this tag rather than inferred from current `main`.
- Limitations: Release notes alone do not enumerate every unchanged map or mechanic. Positive claims are anchored to the tagged files and tests below.
- Accessed: 2026-09-30 through the official tag and local official clone.

### O2 - Tagged Four Islands manifest and version comparison

- URLs:
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/resources/maps/fourislands/manifest.json
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/resources/maps/fourislands/manifest.json
- Title: Four Islands shipped manifests at `v0.34.20` and `v0.33.12`
- Date / relative age: current tag published 2026-09-26.
- Player question: What map facts are stable enough to publish, and did the recent version interval alter the playable geometry?
- Observations: At `v0.34.20`, Four Islands is 1500 x 1500 at full resolution with 517,506 land tiles. The shipped `map4x` representation is 750 x 750 with 127,769 land tiles. The manifest carries four fictional Nation anchors: Korinthal, Lunareth, Sylvoria, and Myrkwind. A local `git diff v0.33.12..v0.34.20` shows that the dimensions, land counts, Nation coordinates, and team-area rectangles did not change over that interval. The only manifest additions were `team_frequency: 30` and the special-game forced-modifier entry `isWaterNukes:50`. The guide can therefore describe the Four Islands geometry at a clear v0.34.20 boundary without pretending that all mode metadata was unchanged.
- Limitations: Land-tile totals do not tell a player which island is least contested, and Nation coordinates are geographic anchors rather than performance ratings. The forced-modifier entry is handled in the special-game path and must not be presented as a guaranteed modifier in every normal FFA.
- Accessed: 2026-09-30 from both official tags in the local official clone.

### O3 - Public FFA rotation and the meaning of `ffaFrequency: -1`

- URLs:
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/core/game/Maps.gen.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/server/MapPlaylist.ts
- Title: generated map metadata and public playlist builder at `v0.34.20`
- Date / relative age: tagged 2026-09-26.
- Player question: Is Four Islands available in an ordinary public FFA, or only in team/custom games?
- Observations: The generated configuration gives Four Islands `multiplayerFrequency: 4`, `ffaFrequency: -1`, `teamFrequency: 30`, `specialTeamCount: 4`, and `defaultNationCount: 4`. `MapPlaylist.generateNewPlaylist()` uses `ffaFrequency` only when it is non-negative; otherwise it falls back to `multiplayerFrequency`. Four Islands therefore contributes four tickets to the ordinary public FFA playlist. The weight is not a 4% probability because the denominator is the sum of the current playlist's map tickets.
- Limitations: Rotation weight proves eligibility and relative weight, not when a particular player will receive the map. The much larger team weight explains community association with teams but does not make the map team-only.
- Accessed: 2026-09-30 from the official tag.

### O4 - FFA spawn freedom versus team quadrant metadata

- URLs:
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/map-generator/assets/maps/fourislands/info.json
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/core/execution/SpawnExecution.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/core/game/GameImpl.ts
- Title: Four Islands generation metadata and spawn implementation at `v0.34.20`
- Date / relative age: tagged 2026-09-26.
- Player question: Must a public-FFA player spawn in one of four assigned quadrants or on a named Nation marker?
- Observations: The map metadata defines half-map spawn rectangles for two teams and quadrant rectangles for four teams. Those rectangles are team metadata. `SpawnExecution.getTeamSpawnArea()` first checks `player.team()` and returns no area when the team is `null`; FFA players have no team assignment. In a normal non-random-spawn game, a valid client-selected center is used directly. The four Nation coordinates feed default Nation placement and do not become fixed human spawn points. A normal-size public FFA uses all four default Nations, while compact-map setup samples only part of that Nation list (with at least one retained). A Four Islands FFA guide should therefore teach the player to compare the Nations actually visible in that lobby, current human-marker density, and shoreline options anywhere on the playable land, not tell them to select Korinthal or "their" quadrant.
- Limitations: The code proves constraints, not which coordinate will be strategically best in a particular lobby. A selected tile still has to produce a valid land spawn, and visible player choices can change until the spawn phase closes.
- Accessed: 2026-09-30 from the official tag.

### O5 - Reachable-shore targeting, not arbitrary pixel targeting

- URLs:
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/core/game/TransportShipUtils.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/tests/core/game/TransportShipUtils.test.ts
- Title: transport validation utility and reachable-shore regression test at `v0.34.20`
- Date / relative age: tagged 2026-09-26.
- Player question: What must be true before the first cross-island transport can actually launch toward the intended shore?
- Observations: `canBuildTransportShip()` rejects a send when the player is already at the boat cap, when no valid target shore exists, when the clicked tile is already owned by the attacker, or when the target is a player the attacker cannot currently attack. It resolves the destination with `closestReachableShore()` and the source with the closest attacker-owned shore connected by water. The tagged regression test deliberately clicks land beside an unreachable inland lake and verifies that the implementation selects a reachable ocean shore instead. The strategic implication is concrete: evaluate the actual landing coast and water component, not merely the apparent straight-line distance between two islands.
- Limitations: Reachability is a mechanical prerequisite, not a safety rating. The utility does not account for an enemy Warship, troop reserves, a narrow beachhead, or whether the attacker can afford to hold the destination.
- Accessed: 2026-09-30 from the official tag and test.

### O6 - Arrival, warning, retreat cost, and path failure

- URLs:
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/core/execution/TransportShipExecution.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/core/execution/BoatRetreatExecution.ts
- Title: transport execution and player retreat action at `v0.34.20`
- Date / relative age: tagged 2026-09-26.
- Player question: Can a player treat an exposed transport as a reversible probe, and what happens when the destination or route fails?
- Observations: A launched transport records a water path and warns a non-neutral target about the incoming naval invasion. The retreat action marks the transport as retreating; the execution then finds a reachable owned shore and routes home. If it arrives on the attacker's territory, 25% of the transported troops are lost and only the survivors return. If no path can be found during execution, the boat is deleted and its current troops are returned. If a nuclear strike turns the destination into water, the ship automatically enters retreat behavior. A manual cancel is therefore available but not free, and an advertised crossing should not be launched merely to "see what happens" when the same information is already visible from markers, structures, and naval units.
- Limitations: The 25% loss is the successful-retreat rule in this tagged implementation; combat can destroy the transport before that recovery. The code does not define a universal latest safe cancel timestamp because distance, interception, and ownership can change during the route.
- Accessed: 2026-09-30 from the official tag.

### O7 - Why a visible defending Warship is a hard abort signal

- URL: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/core/execution/WarshipExecution.ts
- Title: Warship target selection at `v0.34.20`
- Date / relative age: tagged 2026-09-26.
- Player question: Why is an established Warship near the destination more important than a small difference in travel distance?
- Observations: The tagged target-selection code gives Transport Ships priority over enemy Warships and Trade Ships. Its firing logic explicitly says Warships do not need to reload when attacking transports. That official behavior explains the community deadlock and denied-beachhead observations: once a defender has a Warship in range, a slow or repeated transport is a preferred target rather than a neutral race. The first crossing should be rerouted, delayed, or cancelled unless the attacker has a specific way to remove or distract that screen.
- Limitations: Priority does not guarantee a kill; range, position, health, competing actions, and troop load still matter. The guide should present a defending Warship as a strong stop signal, not claim that every transport in its vicinity is mathematically doomed.
- Accessed: 2026-09-30 from the official tag.

## Cross-source synthesis for the guide writer

The strongest answer is conditional and can be organized as **SHORE**. **Spawn** means selecting enough uncontested home-island land to clear without an immediate human duel, while keeping more than one useful coast in view. **Home** means taking cheap bots and Nations until the island can replenish troops without emergency help; local control is a prerequisite to infrastructure, not permission to overbuild. **Observe** means checking the other three islands for unfinished Nations, empty shoreline, Ports, Warships, and human markers before committing. **Route** means launching only when the target has room to widen, the water path reaches the intended coast, and the home island retains a reserve. **Exit** means cancelling or switching shores when the landing remains a thin pixel strip, the defender's Warship is already screening it, the target receives reinforcements, or the home island is not yet secure.

This framework resolves the apparent contradiction between the sources. R1 and Y2 favor beginning from a larger or safer land base before moving onto an island; R2 shows that Four Islands can reward complete local control and protected economic infrastructure; R3 and O7 show why waiting until every island has mature naval defense can close the cheap crossing window. The answer is not "always boat immediately" or "never leave home early." It is to finish the cheapest home growth while continuously watching for a temporary opening elsewhere. The first boat should purchase a concrete option - an empty Nation pocket, an exposed structure, or a coast wide enough to grow - before the defender can convert that shore into a Warship-screened gate.

Two quantified scenario shapes follow directly from the evidence. In Scenario A, the lobby is a normal-size FFA on a 1500 x 1500 map with four visible island landmasses and four default Nations. One other human selects the same home island during the spawn phase. The R1 veto applies: move to a less-contested island while placement remains open rather than assume a two-player clearing race is acceptable. If every island is contested, prefer the position with two viable coasts and the largest cheap bot/Nation pocket; do not use the four team rectangles because O4 proves they are not FFA assignments. In Scenario B, the home island is secure, but the intended destination now has one Port and a Warship near the landing coast. O7 makes the transport the defender's priority target, while O6 makes a successful retreat cost 25% of its troops. The correct default is to cancel before entering the screen or reroute to a shore that can widen, not repeatedly feed the same advertised lane.

The guide should also state what the evidence does **not** justify. It does not justify a fixed SAM count from R1 or R2, a guaranteed Port-first or City-first order, a claim that one named fictional Nation is the best human spawn, or a Team-style instruction to occupy one player per quadrant. It does not justify copying donation tactics from Y1 into FFA. It does justify observable decisions: reject a crowded home island; clear cheap local ownership before expensive infrastructure; cross for a named objective while the shore is open; keep enough home troops that a crossing is not an all-in; and treat a defended, non-widening landing as a failed route even if the first boat technically arrives.

## Counted-source summary

- Reddit discussions actually opened and analyzed: **3** (requirement 3).
- YouTube videos with complete verified captions actually opened and analyzed: **3** (requirement 3).
- Official first-hand OpenFront source groups: **7** (requirement 1), covering the formal Release, two tagged manifests, generated map metadata, playlist fallback, spawn implementation, transport validation and test, transport/retreat execution, and Warship targeting.
- Excluded inaccessible candidate: **1 YouTube video**, not counted.
- All dates, version boundaries, dimensions, rotation weights, spawn constraints, transport losses, and combat-priority claims are anchored to official sources. Community material remains an observation, hypothesis, or mode comparison.
- English research prose exceeds the 600-word minimum; an exact local count is recorded after file creation.
