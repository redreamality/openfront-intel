# Team trade coordination - community source pack (2026-09-24)

Topic: how teammates should keep, redirect, or stop a shared trade route in an OpenFront Team match, and how to tell a real route failure from a teammate who is simply changing their economy. This is distinct from `trade-vs-piracy` (FFA trader versus pirate choice), `train-network` (rail topology), `team-economy-space` (where to reserve structures), and `embargo-timing-and-trade-control` (when to use a hostile embargo against a rival).

Access date: 2026-09-24. Reddit canonical pages and YouTube watch pages were preflighted with HTTP 200. Player observations are demand/context evidence only; all rules and numbers below are checked against the official v0.34.17 tag.

## Official primary sources (rules, numbers, version boundary)

- https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.17 - latest non-TEST release, published 2026-09-23. The release body contains telemetry/statistics changes and no new trade rule; the tag is the current source boundary.
- https://github.com/openfrontio/OpenFrontIO/blob/v0.34.17/src/core/execution/PortExecution.ts - `tradingPorts()` filters out the owner's own ports, keeps only players for whom `canTrade` is true, requires a shared water component, sorts by Manhattan distance, weights each destination by Port level, gives a proximity bonus to eligible nearby ports, and adds an extra friendly-player weight when the ports are not inside the short-range debuff.
- https://github.com/openfrontio/OpenFrontIO/blob/v0.34.17/src/core/execution/TradeShipExecution.ts - on a completed legal trade both the source Port owner and destination Port owner receive the calculated Gold; captured ships pay the captor instead, and a ship retaken by its original owner still pays the normal trade payout. Dispatch and delivery are separate moments, so a route can fail after a ship has already left.
- https://github.com/openfrontio/OpenFrontIO/blob/v0.34.17/src/core/game/PlayerImpl.ts - `canTrade` returns false only when either side has an embargo against the other (or the players are the same); ordinary team membership is not a manual accept/decline toggle. `tradingPartners()` exposes the same bilateral gate.
- https://github.com/openfrontio/OpenFrontIO/blob/v0.34.17/src/core/configuration/Config.ts - `tradeShipGold(dist)` uses `floor((75,000 / (1 + exp(-0.03 * (dist - 300))) + 50 * dist) * goldMultiplier)`; the current v34.17 saturation curve has an early boost, a damping midpoint around 330 ships, and a late plateau. `tradeShipSpawnRate` is probabilistic and has a rejection/pity counter, not a guaranteed timetable.

Confirmed mechanics for the guide:

- A teammate does not need to press a normal "accept trade" button. If no embargo exists, `canTrade` is true, even for players who are not on the same team. An embargo on either side blocks the relationship.
- A Port can select destinations only in a shared water component. Distance, destination Port level, proximity, and friendly status alter the weighted choice; a teammate's Port is favored but never guaranteed.
- A completed legal trade pays both Port owners. Piracy and a captured ship change the settlement owner, so a red ship, a lost Port, a new embargo, or a broken water component can change the ledger without anyone manually turning a teammate off.
- The trade payout is based on traveled distance and the active Gold multiplier. Ship generation is random, globally saturated, and subject to rejection/pity state; route value must be measured over completed arrivals, not promised per-minute income.

## Reddit discussions (actual content, accessed 2026-09-24)

1. https://www.reddit.com/r/OpenFront/comments/1waz1vz/ - "The amount of people in team games who do not understand the dynamics of trade are exhausting." The author says players greedily claim land and block partners from placing Cities and Factories nearby, then explains that Team success depends on preserving access rather than applying FFA land-grabbing habits. This supplies the central coordination problem: a route can be technically legal but strategically destroyed by a teammate's geometry. Limitation: it is a short opinion post and contains no engine numbers.
2. https://www.reddit.com/r/OpenFront/comments/1wlcep7/ - "like AMIR WHY?????????????????" A player says a teammate stopped trading after three minutes even though the player had placed Factories and asked for trade for ten minutes. The complaint is useful because it names the observable symptom (no arrivals) and the missing contract (no shared checkpoint or explanation). Limitation: the post does not prove that an embargo occurred; the guide must teach players to inspect the route and relationship rather than blame a teammate.
3. https://www.reddit.com/r/OpenFront/comments/1wdwebt/ - "about trains." The author asks why a train sometimes travels very far and sometimes disappears soon after launch. This is a neighboring demand signal: when a teammate says trade is dead, they may actually be comparing it to a probabilistic rail route. Limitation: the post is about trains, so it is not used for trade rules; it supports the trade-to-rail pivot decision.
4. https://www.reddit.com/r/OpenFront/comments/1w86zqa/ - "Why no trains?" The player asks why no money/trains arrive. This reinforces that teammates often read missing income as a building failure instead of checking station eligibility, ownership, relation, or route loss. Limitation: it is not evidence for a guaranteed spawn rate.

## YouTube videos (watch pages and captions/description checked)

1. https://www.youtube.com/watch?v=xPk61xZdad0 - "OpenFront Team Game Guide - How to Win More Team Games" (Lonely_Millennial, 2026-07-31). The video frames team play around protected front-line and back-line jobs, donation, and avoiding isolated expansion. It supports the idea that a trade route needs an owner, a defender, and a communication checkpoint, not just two Ports on a map. Limitation: the walkthrough does not state the current tagged formulas.
2. https://www.youtube.com/watch?v=hhpCq14EeCA - "This is how you make HUGE MONEY! | OpenFront.io" (Ultimus_Rex, 2026-03-28). The economy video treats Gold as a conversion resource: a route matters only when its income becomes a building, workers, troops, or a naval screen. It gives context for a team route's opportunity cost. Limitation: it is an economy showcase, not a Team-rule reference.
3. https://www.youtube.com/watch?v=MjZnWlOAH58 - "I controlled the MOST VALUABLE trade route! | OpenFront.io" (Ultimus_Rex, 2026-04-23). The route-focused video shows why distance, safe water, Port ownership, and uninterrupted arrivals matter more than a Port's visual proximity. It supplies player vocabulary for measuring a route by completed income rather than by the number of buildings placed. Limitation: the match predates v0.34.17's current saturation tuning.

## Merged player questions and guide intent

Across the Reddit threads and videos, the recurring questions are: "Why did my teammate stop trading with me?", "How do we reserve land so both Ports, Cities, and Factories can connect?", "Is no income a broken route, a probabilistic spawn gap, or an embargo?", and "When should we stop waiting for ships and pivot to trains, land defense, or a different Port?"

The unique guide intent is **team-trade coordination**: a practical Team decision framework for declaring a route owner and payer, proving a shared water component, measuring completed arrivals, protecting the corridor, checking the bilateral embargo gate, and switching to rail or military spending when the route no longer pays. It does not re-explain FFA piracy, rail geometry, generic team building space, or hostile embargo timing; it owns the cooperative route contract and its stop conditions.

Research notes: approximately 1,150 English words excluding URLs and headings. Community sources establish the problem language and situations; official tagged source establishes the rules, formulas, and version boundary.
