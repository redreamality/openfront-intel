# Team spawn formation community source pack

Research date: 2026-09-05 (Asia/Vladivostok)

## Research question

OpenFront players repeatedly ask whether teammates should spawn together, how to recognize a teammate during the countdown, and what to do when a legal spawn has no useful expansion lane. The proposed guide answers the unique decision: how to turn the spawn phase into a connected team region without creating a shared choke point or leaving one player with no exit. Reddit and YouTube are used for player language and situations. Rules and numeric boundaries are taken from the v0.33.14 release and tagged source.

## Reddit discussions

### 1. Can there be an alternative to random spawn where it keeps you with your team?

- URL: https://www.reddit.com/r/Openfront/comments/1tqbv24/can_there_be_an_alternative_to_random_spawn_where/
- Title: Can there be an alternative to random spawn where it keeps you with your team?
- Date signal: page displayed “3mo ago” on 2026-09-05.
- Player question: A player in a four-team match was placed among several opponents and had only about five minutes to secure a coast, two ships, one City, and one Defense Post before being surrounded. They asked for team-based quadrants or another way to keep allied starts together.
- Useful observation: The post frames spawn as an early strategic decision, not a cosmetic preference. The comments repeatedly describe Duo, Trio, and Quad matches as easier when the team occupies one region and can hand over support. It supplies the player language “with my team” and “surrounded,” which the guide turns into a connected arc with separate lanes.
- Limitation: It is one frustrated match report. The suggested quadrant solution is not evidence that a particular map or algorithm guarantees a better win rate, and the thread does not establish current engine behavior.

### 2. Suggestions to make spawning in team games better

- URL: https://www.reddit.com/r/Openfront/comments/1tffr8x/suggestions_to_make_spawning_in_team_games_better/
- Title: Suggestions to make spawning in team games better
- Date signal: page displayed “4mo ago” on 2026-09-05.
- Player question: How can a player identify a teammate during the countdown when Green and Teal are hard to distinguish and a Yellow teammate can disappear before the match begins?
- Useful observation: The thread asks for a larger countdown, stronger team UI, clearer location markers on complex maps, and teammate halos or rings that do not fail silently. That language supports making the breathing rings the first check in the guide, then assigning a lane and a front rather than trusting territory colour or a familiar name.
- Limitation: Suggestions and comments mix interface requests with individual recollections. They do not prove that a ring is missing in every client, nor do they define the server-side team assignment rules.

### 3. Do people in team games not understand that spawn is 50% of the game?

- URL: https://www.reddit.com/r/Openfront/comments/1sg2x4p/do_people_in_team_games_not_understand_that_spawn/
- Title: Do people in team games not understand that spawn is 50% of the game?
- Date signal: page displayed “5mo ago” on 2026-09-05.
- Player question: Why can a team lose before the first border fight, and what does a good versus bad team spawn look like?
- Useful observation: The author says a good start controls a continuous area while a bad start scatters players. Comments add that corners often face fewer directions than the centre, and that support contribution can matter more than kills. This gives the guide a decision vocabulary: reduce simultaneous contacts, preserve a shared front, and leave the rear player a useful contribution route.
- Limitation: “Spawn is 50%” is rhetoric, not a measured statistic. Corner safety depends on map topology, and the comments do not identify a universal number of tiles or an official formation bonus.

### Rejected candidate: Ranked 2v2 teammate reliability

The Reddit demand was real but the source mix was not sufficient for this cycle. Relevant discussions included:

- https://www.reddit.com/r/Openfront/comments/1veknor/v33_is_live/
- https://www.reddit.com/r/Openfront/comments/1vw8nwa/partner_left_in_a_2v2/
- https://www.reddit.com/r/Openfront/comments/1mijtd0/i_think_i_just_witnessed_the_most_toxic_teammate/

The available video results were two 15-second Shorts:

- https://www.youtube.com/watch?v=lF9HLKfyUCg
- https://www.youtube.com/watch?v=Qaeng1ImcsI

They were joined by one long video that was not clearly Ranked 2v2. Because the required three valid YouTube sources were not available, that candidate was rejected rather than being relabeled as a spawn guide.

## YouTube videos and verified captions

### 1. I played an ENORMOUS match on the new MULTI-TEAMS MODE! | OpenFront.io

- URL: https://www.youtube.com/watch?v=t9c0VefpsW0
- Channel: Ultimus_Rex
- Upload date: 2025-05-04; duration 1,975 seconds.
- Caption observations: 0:00-0:50 describes a 130-player, five-team World Map and an Antarctic start. Around 0:25-0:36 the narrator compares the western friendly birth with eastern teammates. At 0:56-1:18 he takes small coastal objectives first. At 1:17-1:33 he notes that other teams did not coordinate births. Around 1:42-1:50 he evaluates a teammate pushing east and becoming weak through overspending. At 2:05-2:15 he sends a small boat and takes the first City; around 5:34 he discusses donating troops, and around 6:10 he links coordinated births to early momentum.
- Useful observation: A huge team match still uses the same practical questions as a four-player lobby: which side is shared, who has a distinct route, and whether a teammate's expansion creates a support lane or a new liability. The video supplies concrete language about momentum, coastal objectives, and donations after spawn.
- Limitation: Live commentary and one map are anecdotal. It cannot establish that western, Antarctic, or coastal starts are universally optimal, and it is not a Ranked 2v2 test.

### 2. This legendary 150 PLAYER team game might enter OpenFront.io history

- URL: https://www.youtube.com/watch?v=BUMMbT2Vsr4
- Channel: Ultimus_Rex
- Upload date: 2025-08-01; duration 3,067 seconds.
- Caption observations: 0:00-0:28 presents a 150-player, five-team World Map with Red in South America and Yellow concentrated in North America. At 0:29-0:54 the narrator explains that South America is geographically cut off and needs help from northern teammates. At 1:04-1:14 he sends ships from several directions. At 1:40-2:08 he discusses a Port, City, and team support. Around 4:28 he notes a teammate taking a Port, and after 10:20 he repeatedly compares team ratios, front positions, and support.
- Useful observation: A connected region can still need distinct jobs. The separated South America position is a rear or bridge problem, while the northern cluster is a shared front. The route and role must be named rather than inferred from territory size.
- Limitation: This is a very large World Map match. Terrain, player count, and South American geography are special cases; the observations are not a numeric rule for every map.

### 3. How to Win Team Games in OpenFront.io

- URL: https://www.youtube.com/watch?v=uyXs3pahgMA
- Channel: Enzo Plays
- Upload date: 2026-03-09; duration 870 seconds.
- Caption observations: 0:00-0:20 describes a 100-player Manicougan team game in which the creator chooses a backline and uses an early boat to find an expansion exit. At 0:24-0:52 he compares several coasts, corners, and team spawns, explicitly calling corners better and the centre more chaotic. At 0:57-1:06 he chooses City-first. At 1:20-1:43 he takes several small outposts, avoids the central brawl, and notes slower mountain movement. At 1:49-2:51 he opens a second front with multiple boats. Around 13:32 he discusses teammate donations.
- Useful observation: The video gives a practical contrast between a safe backline and a central three-front start. It also shows that a backline needs an exit, not just safety: the early boat is a fallback lane. The guide uses this as an assumption-labelled scenario rather than a universal build order.
- Limitation: The creator is one player and the map is a single Manicougan game. Emotional commentary and map-specific coastlines cannot prove a global corner advantage.

## Official first-party evidence and version boundary

The latest verified non-TEST release for this cycle is [OpenFrontIO v0.33.14](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.14), published 2026-09-04. The release text is primarily a modal-scrolling fix and does not announce a spawn-balance change. The guide therefore uses the tag's source for mechanics and labels all player heuristics as heuristics.

- [SpawnExecution.ts at v0.33.14](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/SpawnExecution.ts): placement tries up to `1_000` candidates, samples from `teamSpawnArea(team)` when a team area is available, requires a valid land tile, and enforces the `minDistanceBetweenPlayers()` Manhattan floor. Random spawn ignores a client-selected tile, and a later spawn intent cannot teleport a player after the phase.
- [SpawnTimerExecution.ts at v0.33.14](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/SpawnTimerExecution.ts): the spawn phase ends once `ticks() > numSpawnPhaseTurns()`.
- [TeamAssignment.ts at v0.33.14](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/game/TeamAssignment.ts): server-pinned `teamIndex` is authoritative; clans stay together where capacity permits; ordinary friends are a soft preference; team capacity is `ceil(numPlayers / numTeams)`.
- [MapPlaylist.ts at v0.33.14](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/server/MapPlaylist.ts): public Team configurations normally use donations and disable random spawn by default, while Duos, Trios, and Quads special modes exclude random spawn.
- [SpawnOverlayPass.ts at v0.33.14](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/client/render/gl/passes/SpawnOverlayPass.ts): the overlay is active during the spawn phase; enemy influence is drawn first, teammate rings next, and the local player's ring last, making friendly breathing rings the reliable visual ledger.
- [TeamAssignment.test.ts at v0.33.14](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/tests/TeamAssignment.test.ts): optional first-party tests for team assignment edge cases.

## Synthesis and completion definition

The sources converge on one player question: “How do we start close enough to support one another without all claiming the same corridor?” The guide's answer is a connected arc evaluated with Ring, Lane, Front, Fallback (R-L-F-F). A source-backed completion check is that a player can identify the actual teammate rings, name a distinct reachable neutral wedge, name the likely hostile side, and keep a second expansion direction or support plan. The engine supplies assignment, timing, spacing, and overlay visuals; it does not grant a formation bonus. Scenarios use explicit assumptions for tile counts, troop shares, and seconds so that a reader can replace them with a replay observation rather than mistaking them for official constants.

Research note length: this pack contains more than 1,200 English words of analysis and source notes.
