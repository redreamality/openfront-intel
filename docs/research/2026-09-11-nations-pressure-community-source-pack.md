# Community Source Pack: Surviving Hard and Impossible Nation Pressure

Research date: 2026-09-11 (Asia/Vladivostok)

Candidate route: `/guides/nations-pressure/`

Proposed player intent: **When playing beside Hard or Impossible Nations, when should a player keep expanding, stop an attack and rebuild Troops, pivot into economy or defense, and recognize that the Nation is likely to target them?**

## Research decision and intent boundary

The repeated problem is not simply "what do Nations do?" Players already see Nations expand, build, ally, retaliate, and use nuclear weapons. Their unresolved question is how to turn those observations into the next decision. They expand because free land or a weak Nation looks profitable, fall below a useful reserve, and then interpret the resulting counterattack as arbitrary coordination or cheating. Other players wait indefinitely, build an economy in an exposed position, or attack every time a Nation attacks them and create a costly two-way loop. Across the opened discussions and captioned match videos, the useful recurring verbs are *corner off*, *wait*, *stock up*, *keep Troops high*, *watch the other Nation commit*, *take the City*, *stall the border*, and *fight one target at a time*.

This supports a new player-decision guide, not another mechanics encyclopedia. The existing `/mechanics/nations/` page owns the Nation decision loop, difficulty intervals, target strategies, alliance behavior, structure logic, fleets, and nuclear rules. `/guides/threat-assessment/` owns a whole-board FFA scan for any opponent and asks whether a conquest creates a dangerous new border. `/guides/land-combat/` owns the cost of an active border fight, terrain, Defense Posts, reverse attacks, and retreat choices. `/guides/population-growth/` owns the Troop-cap and growth formulas. The candidate route should instead join those facts into a Hard/Impossible-specific pressure cycle: claim low-risk space, measure whether the player has become a valid high-value target, wait for a Nation commitment, take a bounded objective, and stop before retaliation or a defensive build turns the attack into attrition.

The route is therefore not a renamed duplicate of `threat-assessment`. Its unique versioned reason is the v0.34.0-beta1 `juicy` strategy: Hard and Impossible Nations can now select a large, valuable bordering rival they can safely beat instead of always preferring the smallest distressed neighbor. That change makes "I am not the weakest player" an unsafe rule. The completion definition is observable: a reader should be able to name the Nation they border, compare current Troops, identify whether their Cities/Ports/Factories and territory make them a valuable candidate, see whether the Nation is committed elsewhere, choose one objective and one stop condition, and decide whether the next quiet cycle goes to Troop recovery, a protected economy, or a defensive response.

Reddit and YouTube establish demand, player language, and match situations only. Community percentages, perceived AI bonuses, creator build orders, and conclusions drawn from a single replay are not rules. Numeric and behavioral claims for the guide must be bounded to the formal `v0.34.0-beta1` release and immutable tag commit `5f6c8fad19ab2e7ab5edfc91c9edc8b685f4c293`, using the source and tests listed below.

## Reddit discussions opened and analyzed

### 1. Explanation needed about Nation Difficulty and General Gameplay

- URL: https://www.reddit.com/r/Openfront/comments/1rlzrun/explanation_needed_about_nation_difficulty_and/
- Title: "Explanation needed about Nation Difficulty and General Gameplay".
- Published or relative freshness: 2026-03-06; accessed 2026-09-11.
- Player question: The author asks why the jump above Easy feels so large, what special advantages Hard and Impossible receive, and why every action seems to leave the player open to being eaten. This is an explicit request for both a difficulty explanation and an actionable mindset.
- Useful observations: The opened body and comments repeatedly use "build up slowly," "keep your troop count high," and "don't go low." One reply describes preserving a post-expansion reserve and attacking again only after more growth; another says Medium and Hard punish low Troops and recommends protecting structures under SAM coverage. The important demand signal is not any quoted percentage. It is that players cannot tell whether another expansion click is progress or the moment they become the most punishable neighbor. The discussion also suggests that a guide should separate the opening expansion decision from the later decision to attack a Nation that can retaliate.
- Limitation: The comments mix several historical versions and make unverified claims about difficulty bonuses and a future v30 curve. Their suggested attack percentages are personal habits, not current engine thresholds. The thread does not provide a replay or controlled comparison, so it cannot prove that one reserve always wins or that a specific structure order is optimal.

### 2. How can I win the world map starting from Italy against Hard AI?

- URL: https://www.reddit.com/r/Openfront/comments/1v2dzdh/how_can_i_win_the_world_map_starting_from_italy/
- Title: "How can I win the world map starting from Italy against Hard AI?"
- Published or relative freshness: 2026-07-21; accessed 2026-09-11.
- Player question: The author can win Hard from South America or New Zealand but is attacked early from Italy, where several Nations share borders and free expansion space is scarce. They specifically report an approximately equal-Troop neighbor attacking while neutral Bots remain, followed by pressure from other neighbors.
- Useful observations: The opened discussion makes border count and safe free land concrete. Replies propose waiting, expanding less, taking a City as a bounded prize, requesting nearby alliances, or maintaining a distant fallback rather than trying to win every Italian front at once. One detailed reply describes delaying expansion, capturing two Cities with little Troop loss, and preserving the force for the next action. The player then concludes that Italy's many adjacent Nations make "stock up and wait" harder than on safer continents. This supports a map-adjustment section: the stop line must be earlier on a dense continental spawn because each tile can create another Nation candidate, while an island or peninsula can buy an economic recovery window.
- Limitation: Italy, Europe, South America, New Zealand, and the cited island routes are map-specific examples. A community claim that a 10% Troop lead prevents attacks is not confirmed by current source and must not appear as a rule. Replay links in the comments were reported corrupted by later updates, so they are not valid evidence for exact timings or outcomes.

### 3. Losing to Nations is a SKILL issue. How to fix it.

- URL: https://www.reddit.com/r/Openfront/comments/1q6pak8/losing_to_nations_is_a_skill_issue_how_to_fix_it/
- Title: "Losing to Nations is a SKILL issue. How to fix it."
- Published or relative freshness: 2026-01-07; accessed 2026-09-11.
- Player question: This is a community answer to recurring complaints about losing to Nations. It lists the decisions the author believes turn an apparently unfair Nation fight into a manageable one.
- Useful observations: The opened post organizes failure around recognizable states: fighting a Nation while other players can attack the weakened human, ignoring the Nation's alliances, sending too little repeatedly, full-sending, continuing before Troops rebuild, attacking difficult terrain, and fighting a Nation with a larger army or infrastructure advantage. Its most useful match-language observation is to watch for the Nation sending an attack elsewhere, then use that commitment as a window; another is to value the capture of Cities rather than continuing merely to color more land. These are strong inputs for a single-objective attack contract and a stop condition based on whether the next reinforcement captures durable value.
- Limitation: The post's proposed 100%/200% force comparisons, 50% growth line, claims about relation changes, and universal "never attack back" wording are advice from one author. They are not imported as current mechanics. The embedded page exposed the full post but only the count of four comments, not their text. Current combat math, targeting, retaliation, and structure triggers must come from the tagged source.

### 4. Feels like all Nation Bots are auto-teamed?

- URL: https://www.reddit.com/r/Openfront/comments/1vj96s7/feels_like_all_nation_bots_are_autoteamed/
- Title: "Feels like all Nation Bots are auto-teamed?"
- Published or relative freshness: 2026-08-08; accessed 2026-09-11.
- Player question: The author asks why attacking one Nation appears to cause an immediate attack from another, creating the impression that all Nations secretly coordinate.
- Useful observations: The short post captures a valuable misconception and the emotional language of multi-front pressure. The guide should explain that a human who spends Troops, exposes a new border, becomes a victim of another attack, or acquires valuable territory may independently enter several candidate lists. The correct response is to scan the resulting state rather than promise that Nations are or are not coordinating from one visual sequence. It also gives the guide a clear diagnostic question: did the second Nation react to a team/alliance relationship, or did the player's new weakness make the second attack independently eligible?
- Limitation: The post has one sentence and the opened embedded page exposed only a four-comment count, not the comment text. It proves the player perception, not the cause. Official target-order, relation, and mode code must own the explanation.

## YouTube videos with verified captions

The three watch pages below were opened through YouTube extraction on 2026-09-11, and each video's English-original automatic caption track was retrieved and inspected. Automatic captions can mishear names, UI terms, and numbers. They are used for creator decisions and match sequence only; no spoken mechanics claim is treated as authoritative.

### 1. How to Beat Impossible Mode in OpenFront.io

- URL: https://www.youtube.com/watch?v=KHdSJLeFg5c
- Title and channel: "How to Beat Impossible Mode in OpenFront.io" by Enzo Plays.
- Published or relative freshness: 2026-06-28; runtime 19:38; the opening identifies the match as version 32; accessed 2026-09-11.
- Player question: How can a player create geographic safety, choose push windows, and avoid being focused by Impossible Nations?
- Useful observations: The verified captions begin with a plan to corner off part of Europe, seek early alliances, and choose timings rather than attack continuously. Around the early expansion the creator says anxiety about being cut off caused pushes that went too low, then observes that low-Troop players tend to attract Impossible Nations after the ordinary Bots are cleared. Later the creator waits for a Nation to attack, advances on that commitment, and deliberately stalls another border. The match repeatedly distinguishes a tempting target from the *right timing*, values dense infrastructure as a prize, and later says to handle one Nation at a time. This is the clearest community sequence for the new guide: secure shape, preserve a reserve, watch commitment, attack one objective, and close the front.
- Limitation: The video predates v0.34.0-beta1 and describes version 32. Statements about why a Nation chose a target, crown behavior, missile selection, and the value of any exact structure are creator interpretations. The captions contain transcription errors, and one won match cannot define a universal opening.

### 2. Can I Beat 400 IMPOSSIBLE Mode Nations? | OpenFront.io v30

- URL: https://www.youtube.com/watch?v=36bkLdOZF-I
- Title and channel: "Can I Beat 400 IMPOSSIBLE Mode Nations? | OpenFront.io v30" by Enzo Plays.
- Published or relative freshness: 2026-03-05; runtime 28:25; version 30 challenge; accessed 2026-09-11.
- Player question: Can one human survive a deliberately extreme 400-Nation setup, and which moments of weakness are worth converting into territory or structures?
- Useful observations: The verified captions state a plan to take early alliances, cut off part of the map, and capitalize on weakness. The creator compares Nation current Troops with Troop cap, abandons attacks against strong states, waits for one Nation to send an attack, and then immediately tries to capture its City. A backup Hawaii landing is established before the main position is secure. Several later choices reveal the cost of incomplete information: the creator loses track of an incoming front, worries about a Nation with high capacity, and sometimes continues because a Port or City is reachable. For the guide, this is useful evidence that players need a predeclared objective and fallback rather than treating every vulnerable-looking bar as permission to keep pushing.
- Limitation: Four hundred Nations is an artificial private challenge, not a normal public configuration, and the match uses version 30. Its crowding, diplomacy, economy, and naval incentives are extreme. The video's numeric Troop-cap comparisons and observed reactions are context, not rules for v0.34.0-beta1.

### 3. Can I Beat 400 Impossible Nations from the Smallest Island? | OpenFront.io

- URL: https://www.youtube.com/watch?v=vjR7rKcK6Tk
- Title and channel: "Can I Beat 400 Impossible Nations from the Smallest Island? | OpenFront.io" by Enzo Plays.
- Published or relative freshness: 2026-03-25; runtime 19:58; the description identifies v30; accessed 2026-09-11.
- Player question: Can an exposed, underpowered start survive by abandoning contested mainland expansion, using an island as a defensive/economic anchor, and waiting for later opportunities?
- Useful observations: The verified captions make the fallback decision explicit. The creator expects to lose the starting mainland, sends several escape boats, and chooses Hawaii as a position with fewer immediate routes. After early raids fail, the plan changes from continual territorial fighting to holding the island, building Ports, watching incoming transports, and allowing the many Nations to fight while the economy grows. The creator scans for small Nations and exposed Cities but repeatedly admits when a target cannot be defended. This source supplies the strongest mode/map adjustment: stopping expansion can mean conceding an indefensible front and preserving one economic core, not passively waiting on the same border.
- Limitation: This is another artificial 400-Nation challenge in v30, and island safety depends on that map's routes and enabled naval economy. Some captioned tactics, including repeated small boats and Warship reactions, may reflect historical behavior. They must not be promoted as current exploits or guaranteed AI delays.

## Official OpenFrontIO facts and released boundary

### 1. Formal v0.34.0-beta1 release

- URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.0-beta1
- Title: official OpenFrontIO `v0.34.0-beta1` Release.
- Published: 2026-09-10; accessed 2026-09-11.
- Immutable tag commit: https://github.com/openfrontio/OpenFrontIO/commit/5f6c8fad19ab2e7ab5edfc91c9edc8b685f4c293
- Verified observation: The formal release says Hard and Impossible Nations now use a new `juicy()` attack strategy to hunt the most valuable bordering rival they can safely beat. It also says their troop cap now applies when attacking Terra Nullius or fallout. These are released beta facts, not an unmerged Issue or PR proposal. The guide must display the beta version boundary and must not generalize the behavior backward to earlier videos.

### 2. Nation pacing and internal reserve gates

- URL: https://github.com/openfrontio/OpenFrontIO/blob/5f6c8fad19ab2e7ab5edfc91c9edc8b685f4c293/src/core/execution/NationExecution.ts
- Verified observation: Each Nation draws a deterministic individual trigger ratio of 50-59% of maximum Troops, a normal reserve ratio of 30-39%, and an expansion ratio of 10-19%. Hard's main interval is 45-59 ticks and Impossible's is 30-49 ticks. These numbers describe AI scheduling and internal eligibility; they are not recommended human attack ratios and not a countdown visible in the UI. A player can observe current Troops and events but cannot know the Nation's exact seeded thresholds from the board.

### 3. Target order and the new high-value bordering target

- URL: https://github.com/openfrontio/OpenFrontIO/blob/5f6c8fad19ab2e7ab5edfc91c9edc8b685f4c293/src/core/execution/utils/AiAttackBehavior.ts
- Test URL: https://github.com/openfrontio/OpenFrontIO/blob/5f6c8fad19ab2e7ab5edfc91c9edc8b685f4c293/tests/AiAttackBehavior.test.ts
- Verified observation: `juicy` only considers bordering enemies whose current Troops are at most 75% of the Nation's current Troops. It scores eligible candidates using three separately min-max-normalized signals: capturable structure levels, the target's gap below its own maximum Troops, and owned tiles. Defense Posts and Missile Silos are excluded from the valuable-structure score; other structures count their levels. Hard and Impossible place this strategy at different positions in longer priority lists. Tests confirm that both difficulties can choose a larger, structure-rich, underfilled target over the weakest enemy, and that a target only 20% below the Nation is excluded by the 25% deficit requirement.
- Decision boundary: A bordering player at or below `0.75 x Nation current Troops` can satisfy this one strategy's force gate, especially when owning more land and valuable infrastructure while sitting far below cap. Moving above that line or removing the border only removes the `juicy` candidate; it does not prevent retaliation, victim, traitor, hated, weakest, island, nuclear, or other branches. The guide must never label 75% a universal safe line.

### 4. FFA troop floor, retaliation exception, and expansion cap

- Source URL: https://github.com/openfrontio/OpenFrontIO/blob/5f6c8fad19ab2e7ab5edfc91c9edc8b685f4c293/src/core/execution/utils/AiAttackBehavior.ts
- Regression test URL: https://github.com/openfrontio/OpenFrontIO/blob/5f6c8fad19ab2e7ab5edfc91c9edc8b685f4c293/tests/AiAttackBehaviorNukedTerritory.test.ts
- Verified observation: In ordinary FFA, a Hard Nation normally keeps 75% and an Impossible Nation 90% of the strongest nearby hostile, non-Bot player's current Troops. Bots and Team games are exempt. A Nation under attack may retaliate with at least the total incoming attack Troops even when that exceeds the neighbor-based cap. The same cap now applies to neutral/fallout expansion, but when it would reduce expansion to zero, that expansion path may still trickle approximately 5% of the Nation's current Troops. Official regression tests pin both the capped fallout attack and the nonzero trickle.
- Decision boundary: Watching a Nation preserve Troops while expanding is not proof that it will remain passive. Starting a land attack changes the state: retaliation can bypass the normal FFA caution, so a long back-and-forth attack should be treated differently from waiting for an outgoing Nation commitment and taking one finishable objective.

### 5. Defensive construction under sustained land pressure

- Source URL: https://github.com/openfrontio/OpenFrontIO/blob/5f6c8fad19ab2e7ab5edfc91c9edc8b685f4c293/src/core/execution/nation/NationStructureBehavior.ts
- Verified observation: Hard and Impossible Nations can request responsive Defense Posts when combined incoming land-attack Troops reach at least 35% of their current Troops. The allowed count is `ceil(incoming / current / 0.4)`, subject to Gold, placement, enablement, and other checks. Boat attacks are excluded from this specific branch. If the threshold is met, the behavior can block other regular structure construction for that cycle even when a Defense Post cannot be placed.
- Decision boundary: The 35% value is an AI construction trigger, not a recommended player attack amount. It explains why feeding more land Troops into an unfinished assault can make the next tiles worse. A guide scenario may use it to show a stop condition, but must also state that missing Gold, invalid placement, disabled units, or prior structures can change the visible result.

## Topic synthesis and guide-ready decision model

The sources support one route with a repeatable **EDGE** editorial frame. **Expand** only into land that improves shape or secures a bounded prize without emptying the reserve. **Detect** whether the player is now a bordering, underfilled, infrastructure-rich candidate and whether another Nation can independently exploit the same weakness. **Go** only when the Nation has committed elsewhere and the player can name the City, Port, Factory, border closure, or elimination that ends the attack. **Exit** the fight when the objective is no longer reachable before recovery, retaliation begins, defensive construction changes the cost, or another front becomes live. EDGE is an editorial memory aid, not an in-game system.

Two guide scenarios are ready for fact-checked development. Scenario A assumes an Impossible Nation has 1,000,000 current Troops and a bordering human has 700,000, several leveled Cities/Ports/Factories, substantial land, and unused Troop-cap headroom. The human meets the new `juicy` force gate because 700,000 is at most 75% of 1,000,000. Rebuilding above 750,000 or breaking the border removes only that candidate; because other target branches remain, the guide should require a full EDGE rescan rather than promise safety. Scenario B assumes a Hard Nation has 1,000,000 current Troops and the player sends 360,000 in combined land attacks. The incoming/current ratio is 36%, above the 35% responsive Defense Post threshold, so the requested allowance begins at `ceil(0.36 / 0.4) = 1`. The scenario should ask whether one more reinforcement finishes a City capture before the next response; if not, stopping, rebuilding, or changing fronts is the decision, not continuing because the first attack already spent Troops.

Mode and map adjustments are mandatory. The 75%/90% neighbor-preservation floor is an ordinary-FFA fact and must not be copied into Team or Humans vs Nations. In Humans vs Nations, the attack gate treats humans as valid by mode, so the guide should emphasize shared focus and defensive ownership rather than assuming an FFA Nation will prefer another weak rival. Dense continental starts such as Italy increase the number of visible bordering candidates and shorten the time available to recover. Islands and peninsulas can reduce land contact and create a quiet economy window, but they introduce Transport, Port, Warship, and trade dependencies. A small island is not automatically safe, and a mainland retreat is only useful when the remaining core has a legal route and enough economy to re-enter.

## Final fact limits and source count

Effective community sources actually opened and analyzed for this pack: **4 Reddit discussions** and **3 YouTube watch pages with retrieved, inspected English-original automatic captions**. Official evidence groups: the `v0.34.0-beta1` Release and immutable tag commit, `NationExecution.ts`, `AiAttackBehavior.ts`, `NationStructureBehavior.ts`, `AiAttackBehavior.test.ts`, and `AiAttackBehaviorNukedTerritory.test.ts`.

The guide may say that the v0.34.0-beta1 `juicy` strategy can prefer a valuable bordering target over the weakest target when the force gate and scoring comparison qualify. It may say that attacking a Nation can enable retaliation behavior and responsive land defense. It may not say that every Nation attacks at one exact percentage, that being above 75% guarantees safety, that a Nation always chooses the highest score, that community build orders are optimal, that historical v30/v32 challenge behavior remains unchanged, or that an observed multi-Nation sequence proves hidden coordination. Those boundaries preserve the useful player decision without turning source-code eligibility into a deterministic prediction.
