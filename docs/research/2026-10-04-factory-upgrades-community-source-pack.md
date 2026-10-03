# Community source pack - Factory upgrades, stacking, and spreading

- Research date: 2026-10-04
- Recommended slug: `factory-upgrades`
- Current official boundary: OpenFrontIO `v0.34.22`, tag commit `4e837520e886b255b1b020e9c89639dbb9d54038`, released 2026-10-01
- Player decision: what a Factory upgrade changes, and whether the same total Factory level should be stacked on one physical Factory or spread across several Factory nodes
- Adjacent-page boundary: `bulk-structure-upgrades` owns multi-select upgrade controls and cumulative pricing; `train-network` owns rail topology and stop placement; `frontload-port-factory-investment` owns the timing of the first Port or Factory. This topic owns per-level spawn rolls, per-node cooldowns, stack-versus-spread consequences, and an upgrade stopping rule.

## Recommendation and answer supported by the evidence

Factory upgrades do work in `v0.34.22`. Every active Factory node asks for the owner's total Factory level, derives one shared spawn-rate denominator from that total and the global Train-unit count, and then performs one spawn roll for every level on that node. A level-5 Factory therefore makes five rolls when it is eligible to check; it is not merely a larger icon or a rail-range upgrade. However, all five rolls collapse to a single Boolean result, and the physical node can spawn at most one train before its own ten-tick cooldown expires. Five level-1 Factory nodes have five rolls against the same denominator too, but they own five independent cooldown gates and five possible origins. Subject to all nodes having valid trade destinations, spreading can retain successful rolls that a single stacked node would merge and can place origins closer to useful routes. The benefit is usually modest at low total level because the per-roll probability is small, so the stronger practical reason to spread is route coverage and cooldown independence, not a hidden multiplier.

An upgrade and a new node consume the same shared Port/Factory price ladder. Across both unit types, the successive level purchases cost 125,000, 250,000, 500,000, and then 1,000,000 Gold each. The correct decision is therefore not simply "always spread." Upgrade the existing node when the extra site would be disconnected, exposed, or would choose poor destinations. Prefer another physical node when it can join a valid City/Port trade cluster, improve route coverage, and survive long enough to use its independent cooldown. Stop buying either form when the next shared-ladder purchase removes the reserve needed to defend or rebuild the network, or when global train saturation and weak destinations make another roll poor value.

## Official primary sources - authority for mechanics and numbers

### 1. OpenFrontIO release v0.34.22

- URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.22
- Title and date: `v0.34.22`, published 2026-10-01.
- Player question answered: which shipped version bounds the guide, and whether recent train changes are officially released rather than only present on upstream `main`.
- Observation: this is the latest non-TEST release at research time. Its cumulative release notes include the early/mid-game and mid/late-game train-spawn adjustments, golden economy tests, track-split train fix, and Factory rail-preview fix. All current-rule links below are pinned to this tag.
- Limitation: the release body summarizes changes but does not expose the full formula or execution order; those details come from the tag source and tests.
- Access date: 2026-10-04, verified with GitHub CLI and the local OpenFrontIO tag.

### 2. TrainStationExecution.ts at v0.34.22

- URL: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/core/execution/TrainStationExecution.ts
- Title and date: train-station spawn execution at the 2026-10-01 release tag.
- Player question answered: does upgrading a Factory increase train generation, and does stacking behave exactly like separate nodes?
- Observation: `shouldSpawnTrain()` calculates a rate from the owner's `unitCount(Factory)` and the global `unitCount(Train)`, then loops from zero to the Factory unit's `level()`, calling `chance(rate)` once per level. A successful roll returns one Boolean result, not several trains. Each `TrainStationExecution` instance owns `lastSpawnTick` and a ten-tick cooldown. Before rolling, it also requires a connected cluster with at least one eligible trade destination. This directly proves that levels add rolls, while physical nodes add separate cooldown gates and origins.
- Limitation: this file defines the attempt logic, not a guaranteed trains-per-minute result. Pseudorandom rolls, global Train count, destination eligibility, travel time, and network survival all affect realized income.
- Access date: 2026-10-04, read directly from local tag commit `4e837520`.

### 3. Config.ts at v0.34.22

- URL: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/core/configuration/Config.ts
- Title and date: production configuration at the 2026-10-01 release tag.
- Player question answered: what denominator, ranges, prices, and payouts govern an upgrade decision?
- Observation: with total owned Factory level `F` and global Train-unit count `T`, the rate passed to `chance()` is `max(1, floor(((F + 10) * 15) / trainSaturation(T)))`; one roll succeeds with probability `1 / rate`. The saturation curve has its soft midpoint at 560 Train units, preserves a roughly 0.25 plateau later, and collapses only beyond a much higher global count. Station-link bounds are 15 to 110 tiles. City/Port stop payout is 10,000 Gold for self, 25,000 for team or other, and 35,000 for an ally. The first ten paid stops have no reduction; later stops lose 5,000 each to a 5,000 floor. Port and Factory levels share the 125k, 250k, 500k, then 1M-capped cost ladder.
- Limitation: `Train` is counted in units rather than visible train consists, and values can change after this tag. A guide should not turn the formula into a universal payback timer.
- Access date: 2026-10-04, read directly from local tag commit `4e837520`.

### 4. PlayerImpl.ts at v0.34.22

- URL: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/core/game/PlayerImpl.ts
- Title and date: player unit-count implementation at the 2026-10-01 release tag.
- Player question answered: does the formula count physical Factory buildings or their levels?
- Observation: `unitCount(type)` walks active owned units and adds `unit.level()`, so one level-5 Factory and five level-1 Factories both contribute `F = 5` to the shared spawn denominator. `unitsOwned()` likewise counts completed levels and counts a construction in progress as one for pricing.
- Limitation: equal contribution to the global denominator does not make the layouts behaviorally identical, because cooldown state and origin are stored per physical `TrainStationExecution`.
- Access date: 2026-10-04, read directly from local tag commit `4e837520`.

### 5. TrainStation.ts and FactoryExecution.ts at v0.34.22

- URLs:
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/core/game/TrainStation.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/core/execution/FactoryExecution.ts
- Title and date: train cluster, stop handling, and Factory station creation at the 2026-10-01 release tag.
- Player question answered: which buildings are real payout destinations, and why can a Factory fail to launch despite having levels?
- Observation: only City and Port are added to the cluster's trade-destination set. A Factory is still a rail-network node and spawn origin, but its stop handler pays nothing. Destination selection samples uniformly from currently connected City/Port stations for which trade is available. `FactoryExecution` creates stations for City, Port, and Factory structures within the 110-tile maximum search range. Thus a new node is useful only if its cluster contains an eligible City/Port; extra levels do not extend the 110-tile range.
- Limitation: these files explain eligibility and station creation, not whether a particular live-map rail will survive capture, terrain changes, or diplomacy changes.
- Access date: 2026-10-04, read directly from local tag commit `4e837520`.

### 6. Official economy scenario and golden tests

- URLs:
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/tests/TradeTrainGolden.test.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/tests/TradeTrainScenarios.test.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/tests/__snapshots__/TradeTrainScenarios.test.ts.snap
- Title and date: deterministic trade/train tests at the 2026-10-01 release tag.
- Player question answered: what comparative outcomes does the shipped implementation produce under fixed layouts and seeds?
- Observation: the golden test explicitly says spawn probability is `1 / trainSpawnRate` per station level and notes that global Train count is about seven units per visible train. Its pinned zero-Train-unit denominators are 112 for `F=1`, 122 for `F=2`, 153 for `F=5`, and 204 for `F=10`; at 300 Train units they become 192, 209, 262, and 349. In the deterministic 3,000-tick Plains scenarios, one Factory plus one own City produced 46,000 Gold/min, one Factory plus four own Cities produced 42,000 Gold/min, two Factories plus two own Cities produced 58,000 Gold/min, and one Factory connected to one own plus one external City produced 76,000 Gold/min for the Factory owner while the external owner received 250,000 Gold during the measured window.
- Limitation: these are fixed-map, fixed-seed regression comparisons with instant build and no worker income, not universal earnings promises. The four-City result being below the one-City result is a useful warning against inferring steady payback from stop count alone.
- Access date: 2026-10-04, read directly from local tag commit `4e837520`.

### 7. OpenFrontIO release v0.34.12

- URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.12
- Title and date: `v0.34.12`, published 2026-09-21; tag commit `7c27263390d8f1976566e5c5ad9adf6fcad311b6` is dated 2026-09-20.
- Player question answered: why older community graphs or videos can disagree with the current Factory output.
- Observation: this release raised the Train saturation midpoint from 500 to 560 as part of restoring early/mid-game Gold. The current `v0.34.22` source retains 560. Any simulation from v30 or the original Factory beta is therefore demand evidence, not a numeric authority for the current guide.
- Limitation: this release changed the saturation curve but did not remove stochastic variance or guarantee a specific return time.
- Access date: 2026-10-04, verified against GitHub release metadata and the local tag.

## Code-grounded stack-versus-spread comparison

| Same total Factory level | Shared denominator at 0 global Train units | Rolls per eligible check | Physical cooldown gates | Reliable conclusion |
|---:|---:|---:|---:|---|
| 1 | 112 | 1 | 1 | There is no layout choice yet; connectivity and destination quality dominate. |
| 2 | 122 | 2 | 1 if stacked, 2 if split | Both layouts buy the same two rolls. Splitting can preserve simultaneous successes and creates a second origin, but only if both nodes have a valid cluster. |
| 5 | 153 | 5 | 1 if stacked, up to 5 if split | Stacking merges all successes at one node and shares one ten-tick cooldown. Spreading adds independent cooldowns and route coverage at the cost of more exposed sites. |
| 10 | 204 | 10 | 1 if stacked, up to 10 if split | More total levels still raise total expected attempts, but marginal gain declines because the denominator rises with `F`; weak or disconnected nodes should not be built merely to maximize node count. |

Ignoring cooldown and assuming every node remains eligible, a level-`L` stack's chance of at least one success in a check is `1 - (1 - 1/rate)^L`. `L` separate level-1 nodes have `L` independent opportunities, each with probability `1/rate`, and can produce more than one train across the nodes. At `F=5`, `rate=153` before global saturation, the stack has about a 3.23% chance of at least one success in a check, while five separate nodes have an expected 0.0327 successful node rolls. The numerical difference per isolated check is small; independent cooldowns, valid origins, and route exposure are the real layout decisions. This calculation is explanatory only and must be labeled as an assumption, because the global Train count changes over time.

## Reddit discussions - player questions and observed decisions

Reddit canonical pages were not directly usable from this host during candidate research (HTTP 403). The posts and comments below were actually retrieved by exact post ID and `link_id` from the Arctic Shift archive, rather than inferred from search snippets. Canonical Reddit URLs remain the reader-facing citations.

### 1. Does upgrading factories actually do anything?

- URL: https://www.reddit.com/r/Openfront/comments/1wwjehz/does_upgrading_factories_actually_do_anything/
- Title and date: "Does upgrading factories actually do anything?", posted 2026-10-03, one day before access.
- Player question: the author cannot see more trains or a longer rail range after upgrading and asks what, if anything, the level changes.
- Observation: this is the exact unmet intent. The current code answers it narrowly: upgrades add per-level spawn rolls, but do not extend rail range, add payout stops, or bypass destination and cooldown gates. Those invisible conditions explain why a real upgrade can feel inert in a short observation window.
- Limitation: the archived post had no comments at retrieval time and reports perception rather than a controlled test. It supplies demand language, not a mechanic.
- Access date: 2026-10-04 through Arctic Shift exact-ID post retrieval.

### 2. Optimal Factory Spam

- URL: https://www.reddit.com/r/Openfront/comments/1vf3att/optimal_factory_spam/
- Title and date: "Optimal Factory Spam", posted 2026-08-04, about two months before access.
- Player question: should a player build one level-50 Factory with one level-50 City, alternate Factory and City nodes, use one Factory followed by several Cities, or choose another pattern?
- Observation: the thread exposes genuine disagreement. One reply says level raises chance but suspects large stacks are favored; another asks whether high-level and single Factories differ; several recommend long lines, few splits, Factory origins near allied borders, and destinations at the far end. A high-scoring reply refuses a universal count and makes placement depend on strategy and game context. This supports a guide that separates verified spawn behavior from route-design advice and makes "valid destination plus independent cooldown" the test for a new node.
- Limitation: replies mix current observation with guesses, especially the claim that the formula favors large stacks. That claim is not accepted without tag-source support; the code instead shows equal per-level rolls plus a per-node cooldown.
- Access date: 2026-10-04 through Arctic Shift post and comment retrieval.

### 3. v30 Total Number of Trains Per Factory

- URL: https://www.reddit.com/r/Openfront/comments/1s1oz7v/v30_total_number_of_trains_per_factory/
- Title and date: "v30 Total Number of Trains Per Factory", posted 2026-03-23, roughly six months before access and explicitly scoped to v30.
- Player question: how many trains should players expect over twenty minutes as Factory count rises, and where do diminishing returns make more investment unattractive?
- Observation: the author simulated a code formula, concluded that fifteen stations looked excessive, and suggested six might be enough. Comments ask directly whether the graph means players should avoid stacking and state that total level, not location, drives the formula. Other replies ask whether line length or dense intersections improve revenue. The discussion proves that players need the count/shape distinction made explicit, rather than another general train-network article.
- Limitation: its graph is based on v30 and predates the v34 saturation changes, so neither the suggested six-Factory stopping point nor its output curve is reusable as a current number. The current guide may cite it only as historical community reasoning and should replace its formula with `v0.34.22` code and tests.
- Access date: 2026-10-04 through Arctic Shift post and comment retrieval.

### 4. Why is my factory not building rails with the city or port?

- URL: https://www.reddit.com/r/Openfront/comments/1s1mh0v/why_is_my_factory_not_building_rails_with_the/
- Title and date: "Why is my factory not building rails with the city or port?", posted 2026-03-23, roughly six months before access.
- Player question: why a Factory in a single-player Impossible setup with many bots/nations, infinite Gold, and instant build does not connect to an apparent City or Port.
- Observation: the highest-scoring reply diagnoses range and recommends moving the Factory between the two destinations; the author later confirms it works. This is a concrete reminder that buying a level or a new node cannot fix invalid geometry. A layout decision begins with the 15-110 tile connection window, not with the spawn formula.
- Limitation: the screenshot and unusual 400-nation/400-bot host settings make this a geometry example, not a normal-mode performance benchmark. The reply gives no measured distance; the official Config is the authority for 15 and 110 tiles.
- Access date: 2026-10-04 through Arctic Shift post and comment retrieval.

### 5. Anyone Do any actual Factory/Train testing to see what situations they are worth it?

- URL: https://www.reddit.com/r/Openfront/comments/1n4lo5w/anyone_do_any_actual_factorytrain_testing_to_see/
- Title and date: "Anyone Do any actual Factory/Train testing to see what situations they are worth it?", posted 2025-08-31, about thirteen months before access.
- Player question: beyond the general advice to connect to an ally, in what situations do Factories actually repay their cost?
- Observation: replies describe long lines through multiple stations, team-game preplanning at an ally border, the need for a critical mass, and vulnerability to Hydrogen Bombs. Another player says Factories take a long time to pay off and recommends placing Cities in a line first. These observations justify including survival, ally continuity, and rebuilding reserve in the stopping rule instead of comparing spawn probability alone.
- Limitation: the thread predates the current v34 economy and includes an outdated payout example. It is used only for recurring player concerns and failure modes; current payouts and rates come from `v0.34.22`.
- Access date: 2026-10-04 through Arctic Shift post and comment retrieval.

## YouTube videos - transcript-verified questions and play observations

All four English caption files were downloaded before writing and read from `C:\Users\Remy\.codex\automations\openfront\cache\2026-10-04-factory-upgrades`. Counts below refer to locally available caption text, not search snippets. The first three videos satisfy the minimum three-video requirement; the fourth adds an independent long-match example.

### 1. The Ultimate OpenFront.io Factory Guide

- URL: https://www.youtube.com/watch?v=dYa-LtXPkrE
- Title, channel, and date: "The Ultimate OpenFront.io Factory Guide", Papi Flex, uploaded 2026-07-24; 27:54, about ten weeks before access.
- Player question: how do Factory levels, rail lines, station payouts, early/mid/late timing, and stacking versus spreading fit into one practical system?
- Observation: the captioned guide explicitly covers the train-spawn formula at 15:17 and stacking versus spreading at 22:28. It advises border placement that attracts allied connections without becoming an obvious target, filling useful lines with Cities, reassessing routes as captured networks change, and adding Factories only where they can route through useful stations. It also describes diminishing marginal return as total Factory investment rises. Those are strong practical inputs for the guide's link, eligible-stop, extra-node, and loss-limit checks.
- Limitation: this is a community tutorial with subjective grades and calculations made before `v0.34.22`. It cannot override the current tag on spawn denominators, payout, or cooldown. Its useful evidence is the decision vocabulary and observed failure modes.
- Access date: 2026-10-04; full English captions were available and analyzed.

### 2. OpenFront.io - How Do Trains Work?

- URL: https://www.youtube.com/watch?v=eWmIGHu1TF0
- Title, channel, and date: "OpenFront.io - How Do Trains Work? | Trains and Factory Update | What Are Factories In OpenFront?", Jos Nord, uploaded 2025-07-19; 1:14, about fifteen months before access.
- Player question: at the introduction of Factories, what action creates rails and trains, and what does a train reaching a destination do?
- Observation: the captioned demonstration builds Cities and a Port, shows that no trains appear until a Factory is built, then shows rails and a train. It captures the beginner mental model that the Factory is the trigger and the other structures are destinations. That mental model remains useful for explaining why upgrading an isolated Factory does not create value by itself.
- Limitation: the narrator explicitly calls the feature beta and says it may not yet be in multiplayer, and gives an oversimplified 10,000-Gold destination explanation. It is historical onboarding evidence only. Current mode availability, payout relationships, and formulas must come from `v0.34.22`.
- Access date: 2026-10-04; complete English captions were available and analyzed.

### 3. I built the greatest rail network... | OpenFront.io

- URL: https://www.youtube.com/watch?v=apjFnMT34rQ
- Title, channel, and date: "I built the greatest rail network... | OpenFront.io", Ultimus_Rex, uploaded 2026-07-03; 55:45, about three months before access.
- Player question: what does committing to a large rail economy look like in an actual long match rather than a formula sheet?
- Observation: the player values a central starting position for train access, chooses City locations with later rail use in mind, secures alliances before committing, builds additional Factory origins in different areas to connect north/south and allied lines, and later notes that Factory networks are making substantial money. The playthrough demonstrates that "more levels" is not separable from map position, diplomacy, and where new origins can reach. It also shows that a multi-node plan is built incrementally as the map opens rather than as an isolated level comparison.
- Limitation: this is edited live commentary, not a controlled stack-versus-spread experiment. It provides a realistic decision sequence and failure exposure, not quantitative proof of optimality.
- Access date: 2026-10-04; full English captions were available and analyzed.

### 4. This rail line funded my empire COMPLETELY!

- URL: https://www.youtube.com/watch?v=NcWyOV7R-qI
- Title, channel, and date: "This rail line funded my empire COMPLETELY!", Ultimus_Rex, uploaded 2026-03-21; 1:00:45, roughly six and a half months before access.
- Player question: how can a player build and maintain a rail economy across a changing live map?
- Observation: the captioned match includes seeking alliances "for factory reasons," placing Factories in multiple locations, noticing an existing connection means "no factory needed," expanding the rail network, suffering a Hydrogen Bomb near a Factory, capturing/replacing Factory origins, and later calling the rail network "completely scuffed" before identifying a better route. This is useful counterweight to a pure throughput answer: an extra physical node only earns its keep when it adds a durable origin or route; redundant placement and damaged topology create maintenance cost.
- Limitation: it predates the current saturation tuning and never isolates equal-total-level layouts. Use it for live-map adaptation and counterplay, not current numerical output.
- Access date: 2026-10-04; full English captions were available and analyzed.

## Cross-source synthesis for the guide

The sources converge on three different questions that should be answered in order. First, an upgrade is real: it adds one current-formula spawn roll. Second, range and payout do not scale with Factory level: links still depend on the 15-110 tile geometry, and only connected eligible City/Port stations pay. Third, stacked and spread layouts share the same total-level denominator but differ at the physical-node layer. A stack has one origin and one ten-tick cooldown; spread nodes have separate origins and cooldowns but can also be disconnected, vulnerable, or routed toward low-value stops.

The guide should therefore use a decision frame such as `LEVEL`: **L**ink, confirm the new or upgraded node is in a valid cluster; **E**ligible stops, identify the City/Port destinations and relationships; **V**olume, check total Factory level and global Train saturation rather than assuming linear scaling; **E**xtra node, buy a new site only when its independent cooldown and origin improve the network; **L**oss limit, retain defense and rebuilding Gold. This answers the exact Reddit question without duplicating the route-building article.

Two safe numeric scenarios are available. Under the explicit assumption of zero global Train units and continuously valid destinations, total level five uses denominator 153. One level-5 node makes five rolls but can emit only one train on a successful check and then observes one ten-tick cooldown; five level-1 nodes make the same five rolls across five cooldown gates and five origins. The guide should say the split layout has more throughput headroom, not promise five times the trains. For a second scenario, the official deterministic tests can compare one Factory plus one City (46k Gold/min) with two Factories plus two Cities (58k Gold/min), while warning that this is a fixed Plains seed and does not isolate level stacking. The external-City scenario (76k Gold/min for the Factory owner and 250k to the external owner over the window) demonstrates why relationship and destination ownership can matter more than one extra self-only level.

The primary failure modes are also consistent. A node with no valid destination never reaches the spawn roll. A too-near or too-far structure cannot form the intended link. Multiple levels on one node share cooldown and origin. Multiple nodes expand the attack surface and may require more territory, SAM coverage, and reconstruction. Captures, alliance expiry, embargo/trade eligibility, track splits, and nukes can change a formerly good cluster. Finally, global saturation lowers all players' rolls; it is not a personal "Factory cap." These conditions should be visible alongside the upgrade recommendation, not buried after an unconditional answer.

## Evidence conflicts and exclusions

- The v30 Reddit graph and the 2025 beta video are retained only as evidence of recurring questions. Their numerical conclusions are excluded from the current answer because `v0.34.12` changed saturation tuning and `v0.34.22` is the release boundary.
- The Reddit guess that large stacks are formula-favored is not supported by the current source. Levels supply rolls in either shape; per-node cooldown and origin distinguish the layouts.
- Community claims that a Factory level "does nothing" are false at `v0.34.22`, but understandable when a node is disconnected, has no eligible destination, is observed briefly, or is cooling down.
- Community route advice such as "one long line" may be good in a particular map state but is not made an engine rule. The destination is selected from the eligible connected set, and the dedicated `train-network` guide owns detailed topology.
- Official scenario Gold/min snapshots are comparative regression fixtures, not generalized ROI. They must retain their fixed-map, fixed-seed, 3,000-tick assumptions whenever quoted.

## Access and verification record

- Valid Reddit discussions analyzed: 5.
- Valid YouTube videos with locally read English captions: 4.
- Official first-party URL groups: 7, covering two Releases, current tag source, and official tests/snapshots.
- Reddit direct access limitation: canonical pages returned HTTP 403 during research; Arctic Shift exact-ID posts and `link_id` comments returned the substantive post/comment records used here.
- YouTube extraction limitation: `yt-dlp` warned that no supported JavaScript runtime was configured, but metadata and all four caption files downloaded successfully; the warning did not prevent transcript verification.
- The local OpenFrontIO checkout resolved `v0.34.22` to `4e837520e886b255b1b020e9c89639dbb9d54038` and was clean during source reading.
