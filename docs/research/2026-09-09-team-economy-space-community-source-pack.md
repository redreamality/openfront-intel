# Community Source Pack: Team Economy Space and Shared Infrastructure

Research date: 2026-09-09 (Asia/Vladivostok)

Candidate route: `/guides/team-economy-space/`

Proposed player intent: **In a Team match, how should partners reserve land and coast for Cities, Factories, Ports, and rail links, decide who pays for each node, and stop building when shared space or protection makes the next investment worse than a troop or defensive reserve?**

## Research decision and intent boundary

The repeated community problem is not simply “which building is strongest.” Players are asking where a teammate should leave room, who should own the next City or Factory, when a Port is worth the coastline it consumes, and why a teammate who takes every neutral tile can accidentally destroy the team's income plan. That is one decision chain: allocate shared team geography before spending private Gold. The route owns a coordination checklist for land width, station spacing, coast access, route protection, payer, and hand-off signal.

This is distinct from `/strategies/team-roles/`, which describes temporary responsibilities, donation rules, target markers, and role switches after a board state already exists. It is also distinct from `/guides/train-network/`, which explains station range, segment length, hub topology, and stop penalties without deciding how two teammates should reserve the land for those stations. `/guides/port-vs-factory/` compares the two income engines in isolation; this guide answers the team question of who should build which engine, where its land must remain open, and when a shared counter or exposed coast makes the team pivot. `/guides/four-islands-team-coordination/` owns the special four-island map assignment rather than the reusable economy-space contract for ordinary Team maps.

Reddit and YouTube are used for demand, player language, and match context only. Their anecdotes do not prove current rules. Numeric facts below are bounded by the formal `v0.33.14` release and immutable tagged OpenFrontIO source. Upstream `main` changes after that tag remain monitoring evidence, not live mechanics.

## Reddit discussions opened and analyzed

### 1. Economic strategy

- URL: https://www.reddit.com/r/Openfront/comments/1w97z7k/economic_strategy/
- Title: “Economic strategy”.
- Published or relative freshness: the opened page showed approximately 2 days ago.
- Accessed: 2026-09-09.
- Player question: The author lists `city, factory, city, factory, sam, silo`, then saves for a hydrogen bomb, and asks what other players do for an early setup.
- Useful observations: Replies give several incompatible templates: three Cities before a Factory, two Cities then Factory, Ports before the first City, or a Factory only when teammates can connect it. The original author explains that a Port feels risky on a map edge because pirates can waste the investment. This is direct evidence that players need a conditional order, not a universal timer. The comments also expose the team-space angle: a Port or Factory choice depends on whether a partner leaves a usable shore or rail station and whether another player has already claimed the route.
- Limitation: Every order is personal advice. The thread does not identify map, mode, starting Gold, troop cap, or version. Its 20% or other implied spending habits cannot become a rule. The guide must use the thread only to frame the decision and use tagged code for costs, train payouts, and construction behavior.

### 2. Initial Building

- URL: https://www.reddit.com/r/Openfront/comments/1w3ny21/initial_building/
- Title: “Initial Building”.
- Published or relative freshness: the opened page showed approximately 8 days ago.
- Accessed: 2026-09-09.
- Player question: A player coming from Age of Empires asks whether OpenFront has a memorized City/Factory/Port opening or whether they should simply build whatever becomes affordable.
- Useful observations: One reply says two Cities are a common start, while another warns that waiting for enough passive income to reach 125,000 can waste the opening. The same detailed reply says an early Factory can be strong when conquest opportunities are scarce, a Port can be weak when the first ship takes too long, a Defense Post should answer an immediate border, and early SAMs or Silos can be an expensive commitment. The comments repeatedly mention placing Cities away from borders but close enough to a future train neighbor. This provides the language for a “reserve a corridor before you click” rule and for a failure mode in which a teammate's expansion blocks the station range.
- Limitation: The 9-out-of-10 and 125,000 statements are anecdotes and may reflect an older balance. They do not prove a best opening or a universal train mode. The current guide must label the numbers as official mechanics only when the v0.33.14 tag confirms them, and must treat all proposed orders as scenario-dependent.

### 3. The amount of people in team games who do not understand the dynamics of trade are exhausting.

- URL: https://www.reddit.com/r/Openfront/comments/1waz1vz/the_amount_of_people_in_team_games_who_do_not/
- Title: “The amount of people in team games who do not understand the dynamics of trade are exhausting.”
- Published or relative freshness: the opened page showed approximately 3 hours ago.
- Accessed: 2026-09-09.
- Player question: The author complains that teammates greedily take land and prevent partners from placing Cities and Factories next to them. The stated team lesson is to leave partners access instead of importing FFA habits into a Team match.
- Useful observations: Follow-up comments describe a teammate rushing the coast, making a partner unable to place Ports, then running out of money for Warships. Another commenter describes a partner holding 200,000/200,000 troops while the exposed teammate is attacked and receives no donation. These are concrete team failure states: ownership may be friendly, but construction space and resource timing are still individually constrained. The guide should therefore define a space contract, an owner for each corridor, a reserve floor, and a switch signal when a teammate's route is no longer viable.
- Limitation: The thread is an argument, not a replay or controlled test. It does not prove that one player should always yield coast, that donations were enabled, or that a Warship was the correct response. It cannot establish a team win-rate claim. Official relation, construction, donation, and train code must define what is possible; the article uses the thread to explain why coordination matters.

## YouTube videos opened and analyzed

The following watch pages were opened directly on 2026-09-09. Search-result titles and thumbnails were not counted. The pages exposed title, channel, runtime, description, view count, and relative publication date. The first two had no usable caption control in the opened player, so no spoken sentence is treated as a rule. They remain valid match-context sources because the actual video pages were loaded and inspected.

### 1. OpenFront Strategy: How to Build a Unstoppable Economy

- URL: https://www.youtube.com/watch?v=8ult82qmiAg
- Channel: Ash.
- Published or relative freshness: the watch page showed approximately 3 weeks ago; runtime 5:58.
- Player question represented: How should a player sequence Cities and income structures, protect the economy, and turn a small opening into a compounding position?
- Useful observations: The description explicitly frames five economy tips, when to build Cities, troop growth, and protecting the economy. The recent publication date makes it useful as a demand signal that economy sequencing remains a live question rather than a solved legacy tutorial. It also supports a guide section that treats “unprotected compounding” as a failure: a City, Port, or Factory is not an investment if a teammate or opponent can make its route unusable.
- Limitation: The opened page did not expose an exportable transcript, so the guide does not attribute any specific number or recommendation to the creator. The description is a summary, not a controlled experiment. Current facts come from v0.33.14 source.

### 2. How to Dominate the Early Game in OpenFront.io

- URL: https://www.youtube.com/watch?v=fRP48Dl3Cnw
- Channel: Enzo Plays.
- Published or relative freshness: the watch page showed approximately 10 months ago; runtime 4:14; 173K views.
- Player question represented: How should a new player choose an opening, manage troop growth, and use early alliances or infrastructure without losing the first expansion window?
- Useful observations: The watch page description names spawn selection, troop growth efficiency, and early alliances. This complements the Reddit “memorized opening” question by showing that public tutorial demand packages economy with map shape and diplomacy. For the new route, that means the space contract must be checked during the spawn phase and revisited after an alliance or team border changes, rather than being a one-time building order.
- Limitation: The video predates v0.33.14 and the opened player reported subtitles unavailable. It cannot prove the current cost ladder, Team relation, or train payout. It is used only for vocabulary and the importance of an early review window.

### 3. OpenFront.io Official Tutorial

- URL: https://www.youtube.com/watch?v=EN2oOog3pSs
- Channel: Enzo Plays.
- Published or relative freshness: the watch page showed approximately 9 months ago; runtime 3:28; 207K views.
- Player question represented: Which core systems must a new player understand before attempting an economy or Team opening?
- Useful observations: The page is explicitly labeled an official tutorial and links to the OpenFront community Discord in its description. Its high view count and compact runtime show that many players enter through a broad systems explanation rather than a specialist economy page. That supports a direct answer that names the route's mental model first: reserve geography, then assign the payer, then build the node whose network can settle Gold. It also supports links back to the site's first-match, team-role, and train pages instead of repeating beginner controls.
- Limitation: The page showed subtitles unavailable and the tutorial is older than v0.33.14. “Official” in the video title does not make its historical advice a current mechanics contract. No number from this video is used in the guide.

## Official OpenFrontIO sources and released boundary

### 1. Formal release boundary

- URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.14
- Title: `v0.33.14` Release.
- Published: 2026-09-04; accessed 2026-09-09.
- Use: This is the latest formal non-TEST release verified during Gate. The release's immediate changes are not a new team-economy rule, so the guide treats it as the current boundary and does not write later `main` commits as released behavior.

### 2. Configuration facts

- URL: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/configuration/Config.ts
- Verified observations: `cityTroopIncrease()` returns 250,000. For each player, that player's Port and Factory use one cost wrapper with the sequence `125,000`, `250,000`, `500,000`, and a 1,000,000 cap based on that player's combined constructed count; a teammate's construction does not raise another player's price. `trainStationMaxRange()` is 110, `railroadMaxSize()` is about 155.562, and `trainStationMinRange()` is 15. Team train stops pay 25,000 base Gold to the train owner; ally stops pay 35,000; self stops pay 10,000; the first ten city visits avoid the 5,000-per-extra-stop penalty. `donateCooldown()` is 100 ticks, and the default troop donation is one third of the sender's current troops before recipient headroom truncation. These are current tagged mechanics, not community advice.
- Limitation: Configuration functions state constraints and formulas, not the best team allocation. A working route still depends on ownership, connection, diplomacy, and survival.

### 3. Team relation and attacks

- URLs:
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/game/Game.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/AttackExecution.ts
- Verified observations: team membership is represented on the player, and `isFriendly` covers teammates and active allies. The attack execution blocks ordinary attacks against friendly players. This explains why teammates can reserve adjacent land without fighting each other, but it does not merge their ownership or their construction Gold. The article must keep “friendly” and “shared land” separate.
- Limitation: The sources do not promise that one teammate can spend another teammate's Gold, build on another player's tile, or make a station count as team-owned. Those assumptions require a live ownership check and should never be implied.

### 4. Factory and station creation

- URLs:
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/FactoryExecution.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/CityExecution.ts
- Verified observations: a Factory creates a train station and searches nearby City, Port, and Factory units within the 110-tile station range; connected structures receive station executions. This makes a team corridor a geometric promise: a partner's City is valuable only if the Factory can actually connect to it, and placing a new node too far away can consume the shared cost step without creating a settlement path.
- Limitation: station creation is not a promise that every visible neighbor will become an eligible profitable stop. Ownership, relation, path length, embargo, and active state still matter.

### 5. Donation checks

- URLs:
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/DonateGoldExecution.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/DonateTroopExecution.ts
- Verified observations: donation executions validate the sender/recipient relationship and configuration, and troop donations are capped by the recipient's remaining maximum troop capacity. Gold and troop requests are strategic choices inside the same 100-tick cooldown model described by the current team-role page. A team-space plan therefore needs a payer and recipient reserve, not a vague promise that “the team economy is shared.”
- Limitation: Donation availability is lobby-configured and can differ in FFA, Team, ranked, or custom rooms. The article will tell readers to verify the lobby switches rather than universalize public defaults.

## Topic synthesis and completion definition

The sources support one route, not three. “What is the best build order?” alone would duplicate `building-timing`. “How do trains work?” would duplicate `train-network`. “How do teammates donate?” would duplicate `team-roles`. The unique answer is the team geography and ownership contract that must exist before those systems can compound.

The guide will use **SPACE** as an editorial frame: **Survey** the spawn and reserve a corridor; **Place** a City, Port, or Factory where the owner can protect it; **Assign** the payer and the route owner; **Connect** only within range, path, and relation limits; **Exit** when the corridor is blocked, the route cannot settle, or protection costs more than the next team objective. SPACE is not an in-game feature.

Two scenarios are ready. Scenario A assumes two teammates begin on a broad coast, each has 300,000 Gold, and only one rail-compatible interior corridor is 100 tiles wide. Player A reserves the central 110-tile station space for a City and Factory; Player B builds the Port on a separate coast, leaving the second station slot open. The plan spends 125,000 for each player's first node and avoids turning that payer's next Port/Factory level into an accidental 250,000 surprise. Scenario B assumes a Team pair with 200,000 troop headroom on the intended recipient, a one-third requested donation, and a 100-tick shared cooldown. The requested transfer is truncated to headroom; the correct decision is to preserve the cooldown for the resource that changes the next 10 seconds, not to send a token amount.

The completion definition is observable: before building, a player can name the reserved corridor, the protected node owner, the payer, the station/shore connection, the teammate's reserve floor, and the signal that ends the plan. After construction, they can verify that a Train has an eligible stop or that a Port has a live route; if not, they can stop spending and pivot to defense or land.

## Final source limits

Community sources actually opened and analyzed: 3 Reddit discussions and 3 YouTube watch pages. YouTube captions were unavailable on the opened pages; no spoken rule is quoted. Official OpenFrontIO source groups: the v0.33.14 release plus tagged `Config.ts`, `Game.ts`, `AttackExecution.ts`, `FactoryExecution.ts`, `CityExecution.ts`, `DonateGoldExecution.ts`, and `DonateTroopExecution.ts`. Research notes exceed 600 English words. The guide must not present personal build orders, view counts, release-unknown upstream changes, or private-lobby assumptions as universal mechanics.
