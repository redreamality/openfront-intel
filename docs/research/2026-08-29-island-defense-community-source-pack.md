# Island defense and naval blockade: community source pack

Research date: 2026-08-29 (Asia/Vladivostok)

## Research question

Players repeatedly describe the same decision problem in different words: an island or narrow coast looks rich because it can host a Port, but a human opponent can surround it, intercept transports, raid the Port, or turn every expansion click into another exposed front. The guide candidate is therefore not a generic beginner page. It answers when to make a sea position a defended bridgehead, when to keep a Warship on patrol, and when to stop paying for a maritime plan and rebuild on land.

## Reddit discussions

### 1. How do I get better at multiplayer?

- URL: https://www.reddit.com/r/Openfront/comments/1jv1kmn/how_do_i_get_better_at_multiplayer/
- Title: “How do I get better at multiplayer”
- Relative date shown: 1y ago; accessed 2026-08-29.
- Player question: The author can beat bots but is quickly surrounded by stronger human players and asks for a repeatable multiplayer plan.
- Usable observations: The visible discussion recommends taking enough starting bots for Gold, cutting off access to those bots, surrounding them before spending extra troops, and keeping an attack ratio around 35% early before waiting for a roughly 3x troop advantage against a bot. It also warns that a City at 125k is useful only if the surrounding situation and alliances make the investment safe. The recurring language is “surrounded,” “reserve,” and “cut off,” which supports a border-first island defense framework.
- Limitation: The thread is archived and advice is player experience, not a versioned rule. Ratios and the 125k City reference are treated as demand signals; all mechanics and numbers in the guide are checked against v0.33.12 sources instead.

### 2. My best strategy in openfront.io

- URL: https://www.reddit.com/r/Openfront/comments/1qt4cz8/my_best_strategy_in_openfrontio/
- Title: “My best strategy in openfront.io”
- Relative date shown: 7mo ago; accessed 2026-08-29.
- Player question: A player publishes a simple opening sequence and an island emergency plan.
- Usable observations: The post moves from a 20% military ratio toward 46–50%, captures bots and Nations, then chooses City when landlocked and Port when water is nearby. The author describes dying after failing to build a Port because City spending exhausted Gold, and recommends a City/Port combination to recover after being stranded on an island. The important need is a conditional build order: a Port is not automatically good, but an island without a route or reserve can become economically trapped.
- Limitation: The post is archived, includes screenshots that cannot be used as current evidence, and predates v0.33.12. It also makes unverified claims about SAM and Silo timing. Only the island-survival language and the City-versus-Port decision are used as community context.

### 3. Any tips for beginners?

- URL: https://www.reddit.com/r/Openfront/comments/1sewfo1/any_tips_for_beginners/
- Title: “Any tips for beginners?”
- Relative date shown: 5mo ago; accessed 2026-08-29.
- Player question: A new player wins against some bots but struggles in online lobbies and random maps.
- Usable observations: The post explicitly contrasts predictable bot play with the pressure of human lobbies and random-map geography. That supports a guide completion definition based on reading the next hostile approach, not on memorizing one opening. The guide should teach a small number of observable triggers: a reachable landing shore, a Port on the same water component, the Warship patrol range, and a reserve after each crossing.
- Limitation: The question contains no stable numeric rule and its comments are advice rather than tests. It is used only to establish the player intent and vocabulary.

## YouTube videos and transcripts

### 1. Early-game positioning

- URL: https://www.youtube.com/watch?v=fRP48Dl3Cnw
- Title: “How to Dominate the Early Game in OpenFront.io” (Enzo Plays)
- Relative date shown: 10 months ago; accessed 2026-08-29.
- Usable observations: The watch page identifies the game and creator and exposes the early-game framing. Search result text emphasizes spawn distance, attack-ratio increments, and terrain priority. The page currently renders a short player preview and no captions, so it is used as a video-context signal rather than a numeric authority.
- Limitation: The current player metadata is inconsistent with the older search duration and captions are unavailable. No exact rule is copied from it.

### 2. Nuclear pressure on a coastal base

- URL: https://www.youtube.com/watch?v=2Z5XKv1bKmk
- Title: “What Happens if You Harness the Power of Nuclear Weapons? | OpenFront.io” (Enzo Plays)
- Relative date shown: 1 hour ago on the watch page; accessed 2026-08-29.
- Usable observations: The page is an OpenFront match video and its related feed surfaces “What Happens if You Blockade the Strait of Hormuz?” as a map-and-route analogue. The coastal-defense lesson is that a Port cluster can be a strategic target and that a defender needs dispersed fallback positions instead of one irreplaceable shoreline.
- Limitation: Captions are unavailable in the current page and the video is entertainment gameplay. Nuclear values are taken only from official release/config sources.

### 3. Trade-island survival and piracy

- URL: https://www.youtube.com/watch?v=QOr-8dFuPzQ
- Title: “What Happens When You Harness the Power of Trade? | OpenFront.io” (Enzo Plays)
- Relative date shown: 11 days ago; accessed 2026-08-29.
- Usable observations: The watch page shows a 14K-view OpenFront video. Its scenario is a trade-focused coastal/island position, and the related feed includes long-form 1v1 and island videos. The visible premise reinforces the player dilemma: ports create income and naval options, but they also reveal the coastline that must be patrolled.
- Limitation: The current page exposes no captions; no revenue number is inferred from the video.

### 4. Full transcript: What Happens if You Just Trade?

- URL: https://www.youtube.com/watch?v=jruEOk1qAaU
- Title: “What Happens if You Just Trade? | OpenFront.io” (Enzo Plays)
- Relative date shown: 2 months ago; accessed 2026-08-29.
- Transcript verification: The browser transcript export returned an English auto-generated caption file on 2026-08-29.
- Usable observations: The player starts on Socotra, says “get up a port early,” keeps Warships as a defensive screen, offers alliances to avoid a two-front war, and repeatedly weighs Port expansion against piracy. The transcript records several concrete decisions: a level-three City is called an “infinite liability” when the island cannot support it; a Warship is moved to cover a coast; the player stops trading with a dangerous rival before a betrayal; and a late-game plan shifts from passive trade to a focused push when a partner mismanages troops. These observations directly motivate the guide's three-state framework: secure the shore, screen the route, then abandon the maritime plan when the Port or water component is no longer defensible.
- Limitation: Auto captions contain uncertainty and spoken decisions are not tests. Claims about exact health, range, cost, or pathing are not taken from this transcript.

## Official OpenFront sources and fact boundary

- Formal release: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.12. The release is published 2026-08-27 and records the station-disconnect train fix, plus the v33.11/v33.0 gameplay history. Its v33 notes also state that Warships prioritize transports, Ports support naval units, and transport targeting was fixed for unreachable inland-lake shores.
- Warship implementation: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/execution/WarshipExecution.ts. The tagged code verifies target priority (Transport, then enemy Warship, then Trade Ship), a 130-tile targeting range from Config, passive healing checks, same-water-component retreat ports, and the 75% veterancy-adjusted retreat trigger.
- Transport implementation: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/execution/TransportShipExecution.ts. The tagged code verifies a free transport that carries sender troops, one-tile-per-tick movement, a 25% troop malus on a cancelled retreat, and attack resolution on arrival.
- Reachability helper: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/game/TransportShipUtils.ts. The helper chooses a closest reachable shore and rejects disconnected inland-lake targets.
- Configuration: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/configuration/Config.ts. The tagged configuration verifies Defense Post range 30, mag x5 and speed x3, Warship base health 1,000, shell damage 250, shell rate 20 ticks, Port healing pool 5 per level per tick, docking range 5, passive range 150, patrol range 100, targeting range 130, transport cap 3, and boat attacks using one fifth of the attacker's troops.

The community sources establish demand, language, and practical situations. The official release, tag code, and generated project data establish every rule and numeric boundary in the guide. The article will not present screenshot claims, auto-caption guesses, or pre-release behavior as current mechanics.
