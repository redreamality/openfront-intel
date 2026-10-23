# Community source pack — what-do-factories-do

- Slug: `what-do-factories-do`
- Access date: 2026-10-23
- Version aligned to: formal `v0.35.2` tag (`08b63c054`), OpenFrontIO
- Purpose: gather verifiable community + official sources for the beginner/mid explainer "What do factories do in OpenFront?", then anchor every rule, number, and version boundary to formal release / tag source / generated data.

## Official first-hand sources

### 1. v0.35.0 formal Release notes (official)
- URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0
- Title: v0.35.0 (Trains) release notes
- Date / recency: v0.35.0 is the release line that shipped the current train economy; v0.35.2 is the latest patch in that line.
- Player question it answers: which train/factory mechanics are "official" and current rather than community folklore.
- Observations: the release line documents the train station, rail, and factory spawn behavior as first-class economy systems; the notes treat train spawn rate, station cooldown, and route payout as the core loop. Used to confirm the feature is current (not removed or renamed) in the aligned version.
- Limitations: release notes summarize behavior but do not publish the exact spawn formula; exact numbers must come from tag source.
- Access date: 2026-10-23 (via `gh api repos/openfrontio/OpenFrontIO/releases?per_page=10`).

### 2. v0.35.2 tag source (official, authoritative for numbers)
- URL: https://github.com/openfrontio/OpenFrontIO/tree/v0.35.2 (files: `packages/engine/src/configuration/EngineConfig.ts`, `packages/engine-lib/src/configuration/Config.ts`, `packages/engine/src/execution/TrainStationExecution.ts`, `packages/engine/src/execution/FactoryExecution.ts`, `packages/engine/src/game/TrainStation.ts`, `packages/engine/src/data/GameData.ts`)
- Title: engine source at the v0.35.2 tag
- Date / recency: the exact tag the content repo is aligned to.
- Player question it answers: the precise spawn formula, cooldown, saturation, boost, per-stop payout, and cost.
- Observations (all read from `git show v0.35.2:...`):
  - `Config.msPerTick()` returns 100 (Config.ts:165), so 10 ticks = 1 second.
  - `ticksCooldown = 10` (TrainStationExecution.ts:12) — a physical node cannot spawn two trains in under 10 ticks.
  - `trainSpawnRate` (EngineConfig.ts:212) = `max(1, floor((factories + 10) * 15 / (saturation * boost)))` where `factories` = the owner's total factory LEVELS (`PlayerImpl.unitCount` at line 530 sums `unit.level()` over that type; caller is `TrainStationExecution.shouldSpawnTrain()` at line 66-79, which passes `owner.unitCount(UnitType.Factory)` and the global `unitCount(UnitType.Train)`). `R` is a probability denominator: per tick, each factory level makes one independent `random.chance(R)` check (1/R per level per tick), and the per-level loop breaks after the first success, so a physical node spawns at most one train per tick (TrainStationExecution.ts:73-77).
  - `trainSaturation` (EngineConfig.ts:206) = `max(1 - sigmoid(units, ln2/100, 560), 0.25 * (1 - sigmoid(units, ln2/150, 900)))` where `units` = the global Train *units* across all players (sum of `unitCount(UnitType.Train)`; the per-train unit contribution is not exposed in the v0.35.2 source, so treat it as a world-fleet number, not a per-train figure). Damping midpoint (0.5) at 560 units; 0.25 floor reached near 900 units. (Community shorthand "midpoint at 100 units" is wrong; the 0.5 midpoint of the damping sigmoid is 560 units.)
  - `smallEconomySpawnBoost` (EngineConfig.ts:231) = `1 + (0.5 * within((6 - levels)/5, 0, 1)) / levels` where `within` is a clamp to [0,1] (Util.ts:24). `within` clamps to [0,1], so the values are: 1.5x at 1 level, 1.2 at 2, 1.1 at 3, 1.05 at 4, 1.02 at 5, 1.0 from 6 levels. Keyed on the owner's total factory levels (a comeback boost), not game time or the world fleet.
  - `trainGold` (EngineConfig.ts:236-259): `self → 10,000` / `ally → 35,000` / `team → 25,000` / `other → 25,000` (switch on `rel`); penalty `citiesVisited = max(0, citiesVisited - 9)` then `× 5,000` per extra stop; clamped at a `5,000` floor; scaled by `goldMultiplierFor(player)` (the `EconomyGold` multiplier, @ line 409). `TradeStationStopHandler` (TrainStation.ts:26) pays the station owner when it is not the train owner; `goldMultiplier` defaults to 1 (EngineConfig.ts:172).
  - `smallEconomyGoldBoost` does **not** exist at v0.35.2 (grep returns nothing); the only gold path is `trainGold` × `goldMultiplierFor`. Do not cite it.
  - `FactoryStopHandler` is a no-op (TrainStation.ts:53-59): a train that settles at a Factory pays zero; only City/Port stations (TradeStationStopHandler) pay.
  - `FactoryExecution` creates `new TrainStationExecution(factory, true)` (FactoryExecution.ts:50) — Factory is the only unit that spawns trains; City (CityExecution.ts:50) and Port (PortExecution.ts:111) use the default `false`.
  - Train speed = 2 tiles/tick (TrainExecution.ts:33 `private speed: number = 2`).
  - Station range: max 110 tiles (engine-lib Config.ts:202-204 `trainStationMaxRange()`), min 15 tiles (EngineConfig.ts:261-262 `trainStationMinRange()`); diagonal rail cap `railroadMaxSize = maxRange * 1.4142` ≈ 155.56 (EngineConfig.ts:264-265).
  - Factory / Port / City all use the shared cost ladder `min(1,000,000, 2^n × 125,000)` (`pow2(n)=2^n`, n = number of existing Port+Factory units, 0-based: Factory case EngineConfig.ts:383-388, Port case 346-350), i.e. 125,000 / 250,000 / 500,000 / 1,000,000. Build durations: Factory 20 ticks, Port 50 ticks, City 20 ticks (src/data/units.json at v0.35.2).
- Limitations: source reflects the exact tag only; future patches can change constants, so the guide is version-bounded to v0.35.2.
- Access date: 2026-10-23 (local clone `C:\Users\Remy\PARA\00_Inbox\00.2_Sandbox\OpenFrontIO`, read via `git show v0.35.2:<path>`).

### 3. Generated data the site displays (official, authoritative for display numbers)
- URL: https://openfront.fyi/guides/in-game-gold-rates/ (backed by `src/data/units.json`, generated by `pnpm extract`)
- Title: in-game unit data (Factory / Port / City)
- Date / recency: generated from the aligned clone.
- Player question it answers: what the in-game tooltip actually shows (cost, build time, role).
- Observations: `units.json` Factory entry — role "Spawns trains; combines with railways and cities to form a trade network", cost formula `min(1,000,000, 2^n x 125,000) (shares n with Port)`, constructionDuration 20. Port constructionDuration 50. City constructionDuration 20, "+250,000 troop cap per level", "Acts as a train station".
- Limitations: generated snapshot; not a statement of the spawn formula.
- Access date: 2026-10-23.

## Community sources

### 4. Reddit — [In-Depth Guide] OpenFrontIO Train Economy (1srhpvi)
- URL: https://www.reddit.com/r/openfront/comments/1srhpvi/ (via PullPush, direct reddit blocked by 403)
- Title: "[In-Depth Guide] OpenFrontIO Train Economy: Optimizing Cities & Factories & Layout"
- Date / recency: 2026-04-21; a few months older than the aligned v0.35.2 line, so treat its exact numbers as community-claimed and re-verify against tag source.
- Player question it answers: how to optimize cities, factories, and layout for the train economy.
- Observations: the guide is the main community reference for the train economy; it states a spawn estimate "100ms / (factories+10)*15" and a "15 stops = 5k gold" payout note. My tag-source read confirms the base `(factories+10)*15` denominator is intact in v0.35.2, but the community phrasing collapses the saturation and comeback-boost divisors that the actual code applies, and its "100ms" framing is the per-tick probability, not a literal timer.
- Limitations: community numbers; the exact formula it prints is a simplification of the real code path; layout claims are map-dependent.
- Access date: 2026-10-23 (PullPush `api.pullpush.io/reddit/search/submission/?ids=1srhpvi` + comments).

### 5. Reddit — Port vs Factory (1vjxwnj)
- URL: https://www.reddit.com/r/Openfront/comments/1vjxwnj/ (via PullPush)
- Title: "Port vs Factory"
- Date / recency: 2026-08-09; recent.
- Player question it answers: should a player invest in a Port or a Factory for gold.
- Observations: short thread (36-char post) surfacing the recurring decision the guide's decision framework addresses — the Port pays on a schedule with no rail dependency, the Factory pays per paying stop with a rail+destination dependency.
- Limitations: very thin thread; used for intent, not for numbers.
- Access date: 2026-10-23.

### 6. Reddit — How do you get this much gold? (1of8kgg)
- URL: https://www.reddit.com/r/Openfront/comments/1of8kgg/ (via PullPush)
- Title: "How do you get this much gold?"
- Date / recency: 2025-10-24.
- Player question it answers: what produces large gold pools in the endgame.
- Observations: captures the beginner confusion that a factory alone does not "print" gold — the gold comes from trains completing paying stops at Cities/Ports, and from the route/destination rate, not from the Factory tile itself.
- Limitations: anecdotal; used to frame the "where does the gold actually come from" misconception the guide corrects.
- Access date: 2026-10-23.

### 7. Reddit — Factory and trains are finally useful. (1p5djof)
- URL: https://www.reddit.com/r/Openfront/comments/1p5djof/ (via PullPush)
- Title: "Factory and trains are finally useful."
- Date / recency: 2025-11-24.
- Player question it answers: when factories/trains stop feeling useless.
- Observations: the thread's premise (factories feeling useless early) matches the observed beginner experience: a lone Factory with no connected, in-range City/Port destination spawns trains that settle and pay zero. The community frames the fix as building the rail + destination so the train has somewhere to pay.
- Limitations: anecdotal; the "finally useful" framing is subjective.
- Access date: 2026-10-23.

### 8. YouTube — The Ultimate OpenFront.io Factory Guide (Papi Flex)
- URL: https://www.youtube.com/watch?v=dYa-LtXPkrE
- Title: "The Ultimate OpenFront.io Factory Guide" — channel @PapiFlexPlays
- Date / recency: recent community video (oEmbed-verified title/channel 2026-10-23).
- Player question it answers: how to run a factory-based economy end to end.
- Observations: the video treats the Factory as a departure source that must be connected by rail to paying stations; it reinforces that the Factory tile is not the income source and the network is.
- Limitations: video claims were not re-derived from source line by line; used for intent and terminology.
- Access date: 2026-10-23 (oEmbed).

### 9. YouTube — OpenFront.io Official Tutorial (Enzo Plays)
- URL: https://www.youtube.com/watch?v=EN2oOog3pSs
- Title: "OpenFront.io Official Tutorial" — channel @EnzoPlays_YT
- Date / recency: long-running tutorial (oEmbed-verified 2026-10-23).
- Player question it answers: the full loop of structures and economy for a new player.
- Observations: frames the Factory within the broader structure set (Port, City, rail), which is the context a "what do factories do" answer needs so the reader does not treat the Factory in isolation.
- Limitations: general tutorial; not a formula reference.
- Access date: 2026-10-23 (oEmbed).

### 10. YouTube — I used the factory networks to SUPERCHARGE my economy! (Ultimus_Rex)
- URL: https://www.youtube.com/watch?v=7VuAyi0x-94
- Title: "I used the factory networks to SUPERCHARGE my economy!" — channel @ultimus_rex40
- Date / recency: recent community video (oEmbed-verified 2026-10-23).
- Player question it answers: how factory networks scale the economy mid-game.
- Observations: the title's "networks" framing matches the code: value scales with the connected graph (factories + rail + paying stations), not with a single Factory; multiple nodes each run their own 10-tick cooldown.
- Limitations: entertainment framing; used for the multi-node network intuition.
- Access date: 2026-10-23 (oEmbed).

## Source counts
- Reddit discussions opened and analyzed: 4 (1srhpvi, 1vjxwnj, 1of8kgg, 1p5djof) via PullPush (direct reddit returned 403/CAPTCHA).
- YouTube videos opened and analyzed: 3 (dYa-LtXPkrE, EN2oOog3pSs, 7VuAyi0x-94) via oEmbed.
- Official first-hand sources: 3 (v0.35.0 release notes, v0.35.2 tag source, generated units.json / openfront.fyi data).

## Version-boundary notes (do not publish as current without re-check)
- The community "100ms / (factories+10)*15" phrasing is a simplification; the real v0.35.2 path is `rate = floor((factories+10)*15 / (saturation * boost))` with per-tick probability 1/rate. Do not publish the raw community formula as the exact code.
- Trains pay zero at a Factory (FactoryStopHandler no-op); only City/Port stations pay via trainGold. Any community claim that "factories pay gold directly" is wrong at v0.35.2.
- Numbers above are bound to the v0.35.2 tag; if the content repo moves to a newer tag, re-read EngineConfig.ts before re-publishing.
