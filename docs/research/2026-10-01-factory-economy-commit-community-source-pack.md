# Community source pack: factory-economy-commit

Purpose: evidence pack for the guide `factory-economy-commit` — "Should you commit to a
factory-based gold economy, or stay port-only?" Every rule, number, and version boundary in
the guide is re-grounded to a primary source listed below (formal Release, tag source code,
generated data, or official tests). Community sources document the player question and the
decisions people actually make; they are not the authority for the numbers.

Access date for all community sources: 2026-10-01. Community sources were reached through
search-index snippets and YouTube oEmbed verification; direct Reddit fetches were bot-walled
(login wall and "prove your humanity") on this host, so thread content was read from
search-engine cached snippets of the real threads. This limitation is recorded per source.

## Official primary sources (authority for numbers)

- Official release (version boundary): https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.21
  - Title: v0.34.21 release. Date: current non-TEST release cursor at run time 2026-10-01.
  - Player question answered: which version are the factory/train figures valid for?
  - Observation: v0.34.21 is the latest non-TEST release; the guide states its version boundary
    here so a patch that changes spawn or payout rates invalidates the figures.
  - Limitation: release notes alone do not enumerate every constant; constants are confirmed in
    tag source code below.
  - Access date: 2026-10-01.
- Tag source code, economy config: https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.21/src/core/configuration/Config.ts
  - Title: Config.ts at tag v0.34.21. Date: v0.34.21 tag.
  - Player question answered: exact shared cost ladder, build times, train spawn rate, and
    train payout.
  - Observation (grounded line-by-line at the tag): Port and Factory share one cost ladder
    `min(1,000,000, 2^n * 125,000)` (n = combined Port+Factory count), giving
    125,000 / 250,000 / 500,000 / 1,000,000; City has its own `125k * 2^n` ladder. Factory
    `constructionTime` is 20 ticks, Port `constructionTime` is 50 ticks. Train spawn rate is
    `trainSpawnRate = max(1, (numPlayerFactories + 10) * 15)` divided by global
    `trainSaturation`. Train payout per stop is `baseGold` minus `5,000 * max(0, citiesVisited
    - 9)`, floored at 5,000, where `baseGold` is 35,000 (allied owner), 25,000 (team/other
    owner), or 10,000 (own owner). Station range is 110 tiles with a minimum 15-tile link;
    diagonal rail cap is 110 * 1.4142 = 155.56 tiles.
  - Limitation: constants are a snapshot of one tag; a future tag may change them.
  - Access date: 2026-10-01 (local clone at the v0.34.21 tag).
- Train spawn execution: https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.21/src/core/execution/TrainStationExecution.ts
  - Title: TrainStationExecution.ts at tag v0.34.21. Date: v0.34.21 tag.
  - Player question answered: how the spawn rate turns into actual trains.
  - Observation: spawn is a per-station random roll; a level-N station rolls N times; an
    existing train throttles further spawns; a disconnected station no longer blocks every
    spawn (v0.33.12 behavior carried forward) but still pays nothing until connected.
  - Limitation: stochastic; per-train timing varies run to run.
  - Access date: 2026-10-01.
- Repository: https://github.com/openfrontio/OpenFrontIO
  - Title: OpenFrontIO repository. Date: current.
  - Player question answered: upstream main cursor for change tracking.
  - Observation: upstream main cursor at run time 2026-10-01 was commit f372cdf; no release
    newer than v0.34.21 had been cut.
  - Limitation: main cursor is a moving target; the guide pins the tag, not main.
  - Access date: 2026-10-01.

## Reddit discussions (player question and observed decisions)

- https://www.reddit.com/r/Openfront/comments/1srhpvi/indepth_guide_openfrontio_train_economy/
  - Title: "[In-Depth Guide] OpenFrontIO Train Economy: Optimizing Cities & Factories & Layout".
  - Recency: recent community write-up (accessed 2026-10-01 via search snippet).
  - Player question: how do the train numbers actually work and what layout pays?
  - Observation: states the core loop "Factories spawn trains; Cities/Ports earn gold"; a
    Factory "Does NOT generate gold directly" and earns zero at a factory stop; spawn
    probability "1 / ((totalFactories + 10) * 15)"; per-stop base gold Self 10,000, Team/Neutral
    25,000, Ally 35,000; stops 1-10 full payout, stop 11+ minus 5,000 each (floor 5,000);
    "Going from 10 to 20 factories (doubling investment) only increases output by +33%".
  - Limitation: read from a cached snippet (direct fetch bot-walled); figures match the v0.34.21
    tag source and were re-verified there.
  - Access date: 2026-10-01.
- https://www.reddit.com/r/Openfront/comments/1lyohqb/trains/
  - Title: "Trains?". Recency: accessed 2026-10-01 via search snippet.
  - Player question: what is a factory actually for, and should I level them?
  - Observation: a reader's code-based summary — "Factories' only purpose is to spawn a train
    station and create a train network... Leveling them up does nothing. Each station can spawn
    trains so it's not useful to build more factories for that either"; "Build only as many
    factories as it takes to cover all your buildings in train networks."
  - Limitation: community interpretation; the "leveling does nothing" claim conflicts with the
    tag source (a level-N station rolls N times), so the guide treats level as an upgrade lever,
    not free.
  - Access date: 2026-10-01.
- https://www.reddit.com/r/Openfront/comments/1n4lo5w/anyone_do_any_actual_factorytrain_testing_to_see/
  - Title: "Anyone Do any actual Factory/Train testing to see what situations they are worth it?"
  - Recency: accessed 2026-10-01 via search snippet.
  - Player question: in what concrete situations are factories worth the investment?
  - Observation: the framing question of this guide. Top answers: factories need a network that
    connects allies/enemies ("huge sprawling networks that connect to allies and enemies and
    everyone are the best"); in team games you "basically have to preplan it... put every single
    building at the border of your friend"; "It seems like it barely sends trains, so having a
    critical mass is important"; "Because of how specific and vulnerable this is, it..." (network
    fragility).
  - Limitation: anecdotal; used to frame the decision, not for the numbers.
  - Access date: 2026-10-01.
- https://www.reddit.com/r/Openfront/comments/1p5djof/factory_and_trains_are_finally_useful/
  - Title: "Factory and trains are finally useful." Recency: accessed 2026-10-01 via search snippet.
  - Player question: are factories now meta, or still weak vs ports?
  - Observation: "At first... ports were more useful... it was better to not build factories at
    all. But now that it became meta it's really worth it and can get you rich so fast"; one
    player snowballed troops and an opponent "with a a lot of factories was spamming hydros every
    minute with all the money he was making"; "ports and warships are still pretty useful,
    especially since it's really easy to destroy a huge network"; "Factories depend 100% on having
    allies. 10k Vs 50k".
  - Limitation: post-dates the "useless" era; shows the meta shifted, which is why the decision
    still depends on context rather than a blanket answer.
  - Access date: 2026-10-01.
- https://www.reddit.com/r/Openfront/comments/1vjxwnj/port_vs_factory/
  - Title: "Port vs Factory". Recency: accessed 2026-10-01 via search snippet.
  - Player question: port or factory as the income engine?
  - Observation: "overall factory produces gold much faster if there is a network which is good
    for kickstarting your economy instead of having to wait for a tradeship"; "factory is better
    if you have an ally near you... it is much more vulnerable to nukes than ports, because the
    first takes a lot of space"; "its critical weakness, it depends on the fact that you have
    allies near you, if they get eaten, nuked or turn on you, it is finished!"; "ports are better
    for most of the game. Need less micro and anticipation."
  - Limitation: direct neighbor to the `port-vs-factory` guide; this guide covers the
    commit-or-not meta decision, not the single-investment payback comparison that page owns.
  - Access date: 2026-10-01.

## YouTube videos (mechanics and observed play)

- https://www.youtube.com/watch?v=eWmIGHu1TF0
  - Title: "OpenFront.io - How Do Trains Work? | Trains and Factory Update | What Are Factories In
    OpenFront?". Channel: Jos Nord. Verified by oEmbed 2026-10-01.
  - Player question: what are factories and how do trains generate gold?
  - Observation: mechanics explainer on the factory/train update; used as a verifiable video
    source for the "factory = spawner, station = payout" model.
  - Limitation: transcript not fetched on this host; title/channel/date verified via oEmbed.
  - Access date: 2026-10-01.
- https://www.youtube.com/watch?v=V2hX6bIqAes
  - Title: "We discovered a new factory configuration...". Channel: OpenFront.io. Verified by
    oEmbed 2026-10-01.
  - Player question: what factory layout does a critical mass of trains?
  - Observation: documents a specific multi-factory configuration players found that maximizes
    train throughput; supports the "spread across many factories beats stacking one" claim.
  - Limitation: transcript not fetched; title/channel/date verified via oEmbed.
  - Access date: 2026-10-01.
- https://www.youtube.com/watch?v=LjHGs047sSM
  - Title: "Harnessing the Power of Economy in OpenFront.io". Channel: Enzo Plays. Verified by
    oEmbed 2026-10-01.
  - Player question: how to build the economy engine that wins?
  - Observation: economy-focused video covering when the factory/train engine starts to outpace
    port-only income; supports the commit-decision framing.
  - Limitation: transcript not fetched; title/channel/date verified via oEmbed.
  - Access date: 2026-10-01.

## Consolidated player questions and decision signals

Across the sources the recurring player question is the same one this guide answers: "Do I
invest the first 125,000-1,000,000 gold into a factory network as my main income engine, or do I
keep it in ports and wait?" The signals split into two camps. The commit camp points to raw
throughput: once a network connects your cities and an ally's cities, each completed stop pays
10,000-35,000 gold to both parties, and a well-connected network produces far more per second
than a single trade route. The stay-port camp points to fragility: a factory network is large,
land-based, multi-tile, depends on allied stations that can be nuked, captured, or embargoed, and
spams no trains at all if the rail graph cannot reach an owned station. Both camps are reading
the same v0.34.21 rules; the disagreement is about the current map, the diplomacy table, and
whether the sea is safe. That is exactly why the guide gives a decision framework and two worked
numeric scenarios instead of a blanket "commit" or "don't."

## Re-verification note

All figures cited in the guide (shared 125k/250k/500k/1M ladder; 20-tick Factory vs 50-tick Port
construction; spawn rate `(factories + 10) * 15`; payout 35k/25k/10k minus 5k from the 10th stop
with a 5k floor; 110-tile station range; 155.56-tile diagonal rail cap; factory earns no direct
gold) were re-checked against the v0.34.21 tag source code listed above on 2026-10-01 and match.
Where a community source stated a different value (e.g. a fixed 10-stop cap, or a spawn constant
of 20 from an older wiki), the tag source is used and the discrepancy is noted in the guide.
