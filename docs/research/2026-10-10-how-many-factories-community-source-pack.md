# Community source pack — `how-many-factories`

Access date: 2026-10-10. Research question: **"How many factories should I actually build, and when does the next one stop paying?"** (the factory-count marginal-economics question, distinct from "should I commit to factories," "upgrade a node or add one," and "how many ports").

This pack records the community signals that motivated the topic, the player question each source answers, what was observed, and the limitations. All rules, numbers, and version boundaries are then re-verified against the pinned source and formal releases in the "Official verification" section; where community figures conflict with the source, the source wins.

## Why this topic

GSC (`.cache/gsc/top-queries.json`, window ending 2026-10-07) shows the "factory" cluster with ~677 impressions and 13 clicks, where "openfront factory" (146 impr), "factory openfront" (52), "openfront io factory" (44), and "open front factory" (32) all land on the bare `/database/structures/` data table at positions 7–9 with **0 clicks**, and "openfront stacking factories" (73 impr) lands on `building-timing` with 0 clicks. No existing guide directly answers "how many factories." `factory-economy-commit` answers the yes/no commit question; `factory-upgrades` answers the node-vs-level split for a *fixed* total; `how-many-ports-to-build` answers the port side of the same shared ladder. The factory **count** is the gap.

## Reddit sources (r/Openfront)

1. URL: https://www.reddit.com/r/Openfront/comments/1srhpvi/indepth_guide_openfrontio_train_economy/
   Title: "[In-Depth Guide] OpenFrontIO Train Economy: Optimizing Cities & Factories & Layout"
   Timeliness: recent (post-v0.34 era; references the factory-as-station model). Access 2026-10-10.
   Player question: how many factories and cities at a given gold budget?
   Observations: gives a spawn formula `1 / ((totalFactories + 10) * 15)` and an empirical output table (1 factory ≈ 0.061 trains/sec, 5 ≈ 0.222, 10 ≈ 0.333, 20 ≈ 0.444), with the key diminishing-returns line "going from 10 to 20 factories (doubling investment) only increases output by +33%." Proposes a 25M-gold self-trade sweet spot of ~10 factories + ~19 cities, clustered factories at one end with cities in a single long line.
   Limitations: omits the global saturation term (so its per-factory rates are upper bounds in real lobbies); "totalFactories" here is physical count, not the level-weighted count the source uses; layout advice is map-specific.

2. URL: https://www.reddit.com/r/Openfront/comments/1s08vpf/factories_math/
   Title: "Factories math"
   Timeliness: recent; cites openfront.wiki/Factory. Access 2026-10-10.
   Player question: what is the spawn chance per tick at different factory counts?
   Observations: a per-tick spawn-chance table (3 factories 1.15%, 7 2.06%, 15 3%, 40 4%, 90 4.5%, 4990 4.99%) that flattens — illustrating the hyperbolic saturation of the `(F+10)*15` term.
   Limitations: the table does not exactly match the pinned source formula at every point and predates/omits the `trainSaturation` division; treat it as community-observed intuition, not authoritative. The source `Config.trainSpawnRate` is the binding definition.

3. URL: https://www.reddit.com/r/Openfront/comments/1n7ivud/are_factories_completely_useless/
   Title: "Are factories completely useless?"
   Timeliness: recent (post recent update). Access 2026-10-10.
   Player question: are factories worth building at all?
   Observations: strong disagreement. One user reports winning far more after *stopping* factory building ("99.99% ports are better"). Counter-arguments: factories "become very strong" once a chain of multiple cities forms and "when this extends to bordering allies they can be 50k per city"; they are "slower to get rolling"; the first eco building should be a port.
   Limitations: anecdotal win-rate claims; the 50k figure is community shorthand (source base is 35k ally / 25k other, with distance penalties). Captured the core tension: factories are network- and ally-dependent and lag ports to get going.

4. URL: https://www.reddit.com/r/Openfront/comments/1p5djof/factory_and_trains_are_finally_useful/
   Title: "Factory and trains are finally useful."
   Timeliness: recent (post v0.33/v0.34 train rework). Access 2026-10-10.
   Player question: did the train rework change the factory value?
   Observations: "factories are a constant income stream, while ports fluctuate wildly"; "late game there is usually way less trade and way more warships is why I go for mostly factories"; "factories depend 100% on having allies"; 10k (self) vs 50k (community) per stop.
   Limitations: late-game "mostly factories" is one player's heuristic; ally dependence is the recurring caveat across this and other threads.

5. URL: https://www.reddit.com/r/Openfront/comments/1vf3att/optimal_factory_spam/
   Title: "Optimal Factory Spam"
   Timeliness: recent. Access 2026-10-10.
   Player question: how do I arrange many factories?
   Observations: top answers — "build long lines, don't make unnecessary secondary routes"; "build cities on line"; "if you can safely spam a factory at the end of the line then do so, you want your train to pick the furthest destination away from your factory so it passes through the most destinations"; "put the factory spam in the middle of the line and you're missing out on potential profits."
   Limitations: placement advice assumes a stable, connected, largely friendly network; does not quantify the count ceiling.

6. URL: https://www.reddit.com/r/Openfront/comments/1um43wb/how_exactly_do_you_make_an_economy_without_ports/
   Title: "How exactly do you make an economy without ports?"
   Timeliness: recent. Access 2026-10-10.
   Player question: how does a factory-based economy work mechanically?
   Observations: "each factory will spawn a train every so often, with a level N factory having N times the train spawns"; "the train, on spawn, chooses a random destination within the connected network and travels the shortest path"; you earn both when trains pass your stations and when your trains pass others' stations.
   Limitations: qualitative; confirms the level-multiplier and connected-network model that the source uses.

7. URL: https://www.reddit.com/r/Openfront/comments/1vjxwnj/port_vs_factory/
   Title: "Port vs Factory"
   Timeliness: recent. Access 2026-10-10.
   Player question: factory or port?
   Observations: "factory is better if you have an allied near you (you gain much more money if you trade with an ally through factories)… but it is much more vulnerable to nukes than ports, because the first takes a lot of space and the second is just one spot"; "factories depend on the fact that you have allies near you, if they get eaten, nuked or turn on you, it is finished"; "ports are vulnerable to warships"; "in the end I think ports are better for most of the game, need less micro."
   Limitations: subjective; but it surfaces the two denial modes the guide must handle (nukes on a spread factory network vs warships on a port) and the space/capture fragility of many factories.

## YouTube sources (verified live via oEmbed, 2026-10-10)

1. URL: https://www.youtube.com/watch?v=eWmIGHu1TF0
   Title: "OpenFront.io - How Do Trains Work? | Trains and Factory Update | What Are Factories In OpenFront?"
   Channel: Jos Nord. Access 2026-10-10.
   Player question: how do trains/factories work and what is the best setup for trains and cities?
   Observations: explainer on the trains/factory update; covers resource transport, best train+city setup, how distance affects money, and trading with neighbors.
   Limitations: walkthrough; no per-count marginal math; used to confirm the "connect more destinations = more gold" framing rather than a specific count.

2. URL: https://www.youtube.com/watch?v=UO2xS702pz0
   Title: "I Don't Want You To Be So Big Sir - OpenFront.IO"
   Channel: CG Plays. Access 2026-10-10.
   Player question: does a factory that only feeds your own port actually pay?
   Observations: "what if your train leaves your factory and gets you 10K in your own port as the only stop? You make 10K and no-one else made anything" — the self-only-stop = 10k and single-destination = wasted-train point.
   Limitations: single clip; confirms the 10k self-stop and the need for multiple paying stations, not a count rule.

3. URL: https://www.youtube.com/watch?v=AFH3TTBPJT8
   Title: "Have I Finally understood that Factories are OP? | OpenFront.io"
   Channel: TheBiff. Access 2026-10-10.
   Player question: can I just build as many factories as possible?
   Observations: "we're going to try and get as many factories as possible basically in the game we know ports are good… factories are good" — captures the common "spam factories" instinct the count guide should bound.
   Limitations: challenge-format video; the "get as many as possible" goal is exactly the assumption the marginal-cost + saturation evidence says is not optimal.

## Other community references (secondary, cross-check only)

- openfront.wiki/Factory — community wiki; used to cross-check the connectable set (Factory/Port/City) and the `(factories+10)*15` rate parameter. Not authoritative over the source.
- openfrontgame.wiki/guides/buildings and /guides/trains — community guides; confirm the shared Port/Factory cost ladder (125k/250k/500k/1M) and the 110-tile / 155.56-tile rail limits, and the "don't stack five factories on one tile" caution.
- openfrontwiki.wiki/economy/factory — community guide; recommends 2–3 factories early and 7–20 late (before transitioning to ports). Treat as a heuristic range, not a source of truth.

## Official primary sources (authoritative)

1. GitHub repo (pinned clone), official primary: https://github.com/openfrontio/OpenFrontIO
   Local pinned clone at `C:\Users\Remy\PARA\00_Inbox\00.2_Sandbox\OpenFrontIO`, commit `4e837520e` (matches `src/data/_meta.json.upstreamCommit`), `upstreamVersion` v34.
   - `src/core/configuration/Config.ts` `trainSpawnRate(numPlayerFactories, numTrainUnits)`: `rate = (numPlayerFactories + 10) * 15`; returns `max(1, floor(rate / trainSaturation(numTrainUnits)))`. Comment: "hyperbolic decay, midpoint at 10 factories; expected number of trains = numPlayerFactories / trainSpawnRate(numPlayerFactories)".
   - `Config.ts` `trainSaturation(numTrainUnits)`: early boost `1 + 0.5*exp(-units/30)` (1.5x at 0 → ~1x at ~35 units), capacity sigmoid `1 - sigmoid(units, LN2/100, 560)` (midpoint 560 units ≈ 80 trains), plateau `0.25*(1 - sigmoid(units, LN2/150, 900))` (0.25 past ~900 units ≈ 130 trains). Comment notes v34.5 moved the midpoint 300→500 (measured +32% train gold) and it is now 560.
   - `Config.ts` `trainGold(rel, citiesVisited, player)`: base ally 35,000 / team+other 25,000 / self 10,000; `citiesVisited = max(0, visited-9)`; `distPenalty = citiesVisited*5,000`; `gold = max(5000, base - distPenalty)`.
   - `Config.ts` Port & Factory build config: shared cost ladder `(numUnits) => Math.min(1_000_000, pow2(numUnits) * 125_000)` over `[UnitType.Port, UnitType.Factory]`; Factory `constructionDuration` `5*10` (50 ticks), `upgradable: true`; City `2*10` (20 ticks).
   - `PlayerImpl.ts` `unitCount(type)`: sums `unit.level()` over owned units of that type — **level-weighted**, so a level-N factory counts as N on the shared ladder and in the spawn formula.
   - `TrainStationExecution.ts`: `ticksCooldown = 10` (minimum 10 ticks between two trains per station); per-tick `spawnRate = config.trainSpawnRate(owner.unitCount(Factory), unitCount(Train))`; spawn on `random.chance(spawnRate)`.
2. Formal releases, official primary: https://github.com/openfrontio/OpenFrontIO/releases
   - `v0.34.24` (2026-10-06): "Fix an exploit that let players grow their troops past the troop cap by repeatedly sending attacks at targets they don't border." No factory/train economy change. This is the current version boundary.
   - `v0.34.22` (2026-10-01): UI/login/observability fixes; no train-economy change. (Matches the pinned clone commit.)
   - `v0.33.12` (2026-08-27): "Fix: Station disconnect preventing trains from spawning" — a dead station no longer freezes all spawns.
   - `v0.33.0` / v0.33.x: the era trains entered public playlists (the old "trains are single-player only" claim is outdated per `factory-upgrades`/`port-vs-factory`).
3. OpenFront project data (generated from the pinned clone): `src/data/structures.json` — Factory and Port `costFormula` `min(1,000,000, 2^n × 125,000), n = existing ports/factories`; Factory `constructionDuration` 20 (City) vs the source 50-tick factory; role "Spawns trains; combines with railways and cities to form a trade network."

## Fact reconciliation (community vs source)

- Shared cost ladder 125k/250k/500k/1M and the fact that every factory level also raises the next port price: **confirmed** by `Config.ts`, `structures.json`, and all community sources.
- Spawn rate `(F+10)*15`: **confirmed**; the community "factories math" per-tick table is an approximation that omits the `trainSaturation` division — the source is binding.
- Payout self 10k / other 25k / ally 35k with −5k per stop past the 10th and a 5k floor: **confirmed** by `trainGold`; the community "50k" figures are shorthand for the ally case before penalties or a misread.
- Factory build time: source `Config.ts` says 50 ticks; `structures.json`/some community pages say 20 ticks. The **source wins**: 50 ticks. (The 20-tick figure is the City build time.)
- "Factories are useless / ports always better": **rejected** as a blanket rule. The source shows factories are a legitimate, independent income engine whose value is gated by network, stations, and ally coverage, not by a universal ranking.
- Level-weighted counting (`unitCount` sums levels): **confirmed** by `PlayerImpl.ts`; this is why "how many physical factories" and "how many factory levels" are different questions (the latter is `factory-upgrades`).

## Confirmed decision facts the guide will build on

1. The Nth factory and the Nth port cost the **same** ladder step; every factory level you buy is a port level you cannot (opportunity cost).
2. Spawn rate grows hyperbolically and saturates: `R = (F+10)*15` falls in responsiveness as F grows (midpoint 10), and the whole spawn loop is throttled by `trainSaturation` in large lobbies (midpoint 560 train units, 0.25 plateau past ~900).
3. A factory pays only through **stations** (City/Port) it reaches; self-stop pays 10k, others 25k/35k, with a 5k floor and a −5k/stop penalty past stop 10.
4. A level-N factory counts as N on the ladder and in the spawn formula (level-weighted).
5. Denial: a spread factory network is exposed to nukes and capture (many tiles, long rail); a port is exposed to warships. Embargo/ally-loss collapses ally-fed factory income.
6. Factory build 50 ticks vs City 20 ticks; the network needs both.
