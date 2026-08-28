# Train network community source pack (2026-08-28)

## Research question and scope

This pack investigates the recurring player question: how should a player connect factories, cities, and ports with trains so that a rail network creates dependable Gold instead of random dead-end tracks? The production topic is a decision guide, not a generic building list. Reddit and YouTube are used for player language, confusion, and practical situations. Numeric rules are checked against the formal OpenFrontIO release and the tagged source code listed below. All pages were opened on 2026-08-28.

## Reddit discussion 1

- URL: https://www.reddit.com/r/Openfront/comments/1vwgf7d/can_someone_explain_how_factories_trains_etc_work/
- Title: Can someone explain how factories, trains, etc work?
- Date / freshness: Reddit post visible in the current community feed; exact date was not exposed by the embedded view.
- Player question: The author asks what a Factory actually does, how a Train chooses stations, and why a newly built Factory sometimes produces nothing.
- Useful observation: Replies describe the mental model players need: a Factory is a station that needs another reachable City or Port, not a self-contained Gold printer. Players also look for a visible “route” and confuse a Factory's local level with the number of trains already moving.
- Limitation: Community replies do not establish the current spawn-rate formula, range, path cap, or payout. They are evidence of confusion and vocabulary only.
- Accessed: 2026-08-28.

## Reddit discussion 2

- URL: https://www.reddit.com/r/Openfront/comments/1vu73du/my_damn_team_never_builds_trains_properly/
- Title: My damn team never builds trains properly
- Date / freshness: Recent post in the current subreddit view; embedded page did not expose a reliable calendar date.
- Player question: The author wants a team-readable rule for placing stations and complains that teammates build several Factories which do not connect to useful destinations.
- Useful observation: The practical pain is topology and coordination, not a missing button. Players need a short callout for “one Factory cluster, two reachable settlement stations, then observe” and a way to explain why stacking Factories beside a disconnected coast wastes the shared cost ladder. The thread also shows that teammates use “train” to mean both the moving unit and the whole rail network.
- Limitation: The thread contains anecdotal map examples and no reproducible tick log. It cannot prove that a route is profitable or that every map has the same shoreline geometry.
- Accessed: 2026-08-28.

## Reddit discussion 3

- URL: https://www.reddit.com/r/Openfront/comments/1vynp4g/advanced_tips_for_winning_games/
- Title: Advanced tips for winning games
- Date / freshness: Current discussion page; exact posting date unavailable in the embedded view.
- Player question: Experienced players trade advanced economy advice, including when to add Factories, how to use trains during a front-line push, and when to stop investing in a route.
- Useful observation: Repeated advice is conditional: trains are strongest when a protected inland cluster can touch several Cities or Ports, while a Factory placed only for its visual footprint is a sunk cost. Players also care about timing: a train that takes many ticks to visit a long chain can arrive after the front has moved. This supports a decision framework based on completed stops per 60 ticks rather than the number of buildings owned.
- Limitation: “Advanced tips” mixes modes and personal build orders. No comment is treated as a current rule, and none supplies a formal version boundary.
- Accessed: 2026-08-28.

## YouTube video 1

- URL: https://www.youtube.com/watch?v=eWmIGHu1TF0
- Title: OpenFront gameplay / economy explanation (watch page opened)
- Date / freshness: Watch-page metadata was visible; the page did not expose a dependable transcript date in the browser session.
- Player question: How should a player turn an early Factory and nearby settlements into a useful income line while still expanding?
- Useful observation: The visible description and chapter labels frame trains as a map-reading and timing problem. The creator repeatedly shows that an income structure must be connected to a destination and protected while the player is fighting elsewhere.
- Limitation: Captions could not be exported or verified in this session. No spoken number is imported into the guide; only the visible page context is retained.
- Accessed: 2026-08-28.

## YouTube video 2

- URL: https://www.youtube.com/watch?v=dYa-LtXPkrE
- Title: OpenFront beginner strategy and building guide (watch page opened)
- Date / freshness: Visible YouTube page metadata; exact publication date was not reliably available from the rendered page.
- Player question: Which economic structure should be built first, and why can a train plan fail even when the player has Gold?
- Useful observation: The page presents the familiar player language of “build more income” and “connect the map.” That language is useful for the guide's direct answer: players need a route test before a second Factory, not a blanket recommendation to upgrade.
- Limitation: Transcript export was unavailable, so the guide does not quote or attribute any unverified spoken claim. The video may predate v0.33.12.
- Accessed: 2026-08-28.

## YouTube video 3

- URL: https://www.youtube.com/watch?v=EzCZ2J49HSM
- Title: OpenFront advanced economy / train network match (watch page opened)
- Date / freshness: Watch-page title, description, and visible metadata checked on 2026-08-28; exact date not confirmed.
- Player question: How do experienced players decide between a compact rail hub and several separated stations during a contested match?
- Useful observation: The visible match framing emphasizes route redundancy, defending a valuable hub, and switching back to safer land production when the sea or border becomes unsafe. Those observations map to the guide's two numeric scenarios and its failure section.
- Limitation: Captions and chapter transcript were not available for verification. It is not used to claim a path length, payout, or spawn formula.

## Official rule verification

The formal source is the OpenFrontIO v0.33.12 Release: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.12. The release's train-relevant fix is that a disconnected station no longer prevents a train from spawning; it does not replace the economic formulas. The tagged configuration and execution sources are:

- https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/configuration/Config.ts
- https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/execution/FactoryExecution.ts
- https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/execution/TrainStationExecution.ts
- https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/execution/TrainExecution.ts
- https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/game/TrainStation.ts
- https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/game/RailNetworkImpl.ts
- https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/execution/CityExecution.ts

The checked facts are: Factory train trials use `(factoryCount + 10) * 15`; each Factory level adds a generation attempt; a Factory station searches within 110 tiles; automatic links ignore gaps below 15 tiles; each rail segment must stay below roughly 155.6 tiles; Trains settle Gold at City and Port stations, not at the Factory; self stops pay 10,000, teammate or other-player stops 25,000, and ally stops 35,000 before the stop penalty; stops after the first ten lose 5,000 each down to a 5,000 floor. A train can therefore be “busy” while paying little, and a disconnected station can be a topology problem even though v0.33.12 fixed the spawn failure.

## Synthesis for the guide

Across the six community pages, the repeated player outcome is not “what is a Factory?” but “why did my Factory spend Gold without giving me a usable route?” The guide therefore defines a route checklist, a hub-versus-chain choice, an observation window, and explicit exit signals. The two scenarios use assumptions rather than pretending that a formula predicts a whole match. The final page links to Port versus Factory and Economy Fundamentals for adjacent investment decisions and to Team Naval Control for coordination.
