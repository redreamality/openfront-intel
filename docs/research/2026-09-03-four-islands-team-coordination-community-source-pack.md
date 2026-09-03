# Four Islands team coordination community source pack

Research date: 2026-09-03
Candidate slug: `four-islands-team-coordination`
Player intent: On the Four Islands map, how should teammates assign an island job, decide whether a transport landing is worth the shared risk, and coordinate Ports, Warships, SAMs, and nuclear timing so that four separated theatres become one team plan?

This pack separates community evidence from rules evidence. Reddit and YouTube are used to identify recurring player questions, language, and match situations. Numerical rules, map geometry, and unit behavior are checked against the official OpenFrontIO v0.33.12 release/tag and source files below. The candidate is map-specific because Four Islands has dedicated two-team and four-team spawn areas and four separated starting theatres; it is not a second general map-strategy page.

## Why this candidate is distinct

The existing `/guides/map-strategy/` page teaches a cross-map topology method. `/guides/island-defense/` explains how one island defends a coast, port, and landing. `/strategies/team-roles/` provides reusable team role and donation principles. `/strategies/nuclear-deterrence/` covers the strategic nuclear balance and SAM posture. None of those pages owns the Four Islands sequence of assigning a home theatre, naming the first bridge crossing, deciding which teammate escorts it, switching from local economy to shared route, or ending a deadlock when every island has ports and nukes. The proposed page should explain those coordination decisions without claiming that the map itself grants equal income or that a teammate can invade a friendly target.

## Reddit sources (opened pages)

### 1. Four-island, 25M Gold custom-map question

- URL: https://www.reddit.com/r/Openfront/comments/1vf1x8f/4_island_25m_guild_map_question/
- Title: `4 island, 25M guild map question` (the author corrected “Guild” to “Gold” in the body).
- Relative date shown: 1mo ago; opened 2026-09-03.
- Player question: In a custom Four Islands game with Water Nukes, a three-minute PvP delay, and 25M starting Gold, why did other players have a transport action while the author could not send a boat to bots or open land?
- Useful observation: The player describes an actionable UI discrepancy rather than a balance complaint. The comment gives the key player-facing hypothesis: peacetime or allied targets cannot be invaded, while tribes or unclaimed land may be legal targets. The post also reports that a teammate allowed an opponent to land on the home island, showing that transport eligibility and teammate route watch are linked decisions.
- Limitation: The comment is community advice, not proof of the engine rule; the post does not record exact target ownership, alliance state, or a replay trace. Verify all eligibility and path behavior in `TransportShipUtils.ts` and `TransportShipExecution.ts`.

### 2. Softlock on 4 Islands

- URL: https://www.reddit.com/r/Openfront/comments/1rqbica/softlock_on_4_islands_with_a_link/
- Title: `Softlock on 4 Islands ( with a link )`.
- Relative date shown: 6mo ago; opened 2026-09-03.
- Player question: How can a Four Islands match become a multi-player deadlock even when participants have Ports, trade income, Embargo, Hydrogen, and MIRV options?
- Useful observation: The post links a live/replay match and says two opponents quit after being softlocked. Comments describe a standoff in which a player felt unable to invade because an opponent could build Warships from Factory income, while the others could not land either. Other comments suggest earlier MIRV, Embargo, or Hydrogen pressure as missed choices. This is direct evidence for a coordination guide about bridge ownership, route denial, and a declared end condition for a nuclear/naval stalemate.
- Limitation: It is a retrospective argument with disagreement between commenters. It does not establish that a particular nuke or ship line would have won, and the comments do not expose the full lobby settings or economy. Treat the strategic claims as hypotheses to test against the replay and official mechanics, not as universal prescriptions.

### 3. Intense 4 Island game shows the importance of early game SAMs

- URL: https://www.reddit.com/r/Openfront/comments/1ukjxab/intense_4_island_game_shows_the_importance_of/
- Title: `Intense 4 Island game shows the importance of early game SAMS`.
- Relative date shown: 2mo ago; opened 2026-09-03.
- Player question: Does securing an island, stacking SAMs, and building enough Ports before the enemy can establish its own naval economy decide a Four Islands game?
- Useful observation: The author identifies themselves as the top-right island player, says they first took control of that island, then built a SAM-protected point and enough Ports to dominate the economy. They report using that position to nuke attempts to establish rival ports and winning against larger opponents. The map-specific lesson is not “always stack SAMs”; it is that an island teammate must call whether their job is local fortification, route denial, or bridge support before spending shared timing on infrastructure.
- Limitation: There are no comments and no numeric build order, so this is a single self-reported replay interpretation. It cannot prove that Port count alone caused the win or that the same defense works in every team size.

### 4. Good team work in 4 island

- URL: https://www.reddit.com/r/Openfront/comments/1s6diof/good_team_work_in_4_island/
- Title: `Good team work in 4 island`.
- Relative date shown: 5mo ago; opened 2026-09-03.
- Player question: What does successful cooperation look like when each team occupies a separate island and the match transitions from expansion to nuclear warfare?
- Useful observation: The author posts a replay and a six-step sequence: red expands massively and absorbs yellow; green and blue agree to peace; red then reaches a strong position; green uses repeated nukes against Ports and SAMs; green invades red; green and blue resume war; green wins. A commenter says five-million-start team games let players focus on economy before war, followed by a late nuclear simulator that lasts forever. This supports a guide framework of island assignment, explicit peace/pressure windows, Port denial, and a stop signal before a shared economy turns into an unbounded nuke loop.
- Limitation: The post does not state exact team size, map variant, or version, and the sequence is a replay narrative rather than a controlled test. Use it for vocabulary and scenario structure only.

### 5. What is the Longest Game youve been in?

- URL: https://www.reddit.com/r/Openfront/comments/1s40egh/what_is_the_longest_game_youve_been_in/
- Title: `What is the Longest Game youve been in?`.
- Relative date shown: 5mo ago; opened 2026-09-03.
- Player question: Why do Four Islands team matches last so long, and what should count as a practical end to a stalemate?
- Useful observation: The author reports a 1 hour 45 minute Four Islands match with teams of five. Comments report more than an hour with “nothing happening,” a three-hour server limit, and lag making a 45-minute match feel longer. This is useful demand evidence for a coordination article that defines route deadlines, reserve thresholds, and when to stop feeding an inaccessible beach or waiting for an uncoordinated nuke exchange.
- Limitation: Match duration is self-reported and may include lag, server limits, or private settings. It is not a timing rule and should not be converted into a promised match length.

## YouTube sources (opened watch pages)

### 1. The Battle of the 4 Islands | OpenFront.io

- URL: https://www.youtube.com/watch?v=iM25gb6R8p0
- Title: `The Battle of the 4 Islands | OpenFront.io`.
- Channel: Enzo Plays; page showed 11K views and 3 months ago; opened 2026-09-03.
- Video state: The player loaded a 1:58:30 full-length match after a short pre-roll. The opened gameplay frame shows the Four Islands map and the early player table; the page summary describes a four-team v32 match focused on SAM placement, infrastructure development, constant bombardment, and coordinating defense across separated islands.
- Useful observation: This is a long-form visual example of the exact coordination problem: each island can build economy while the team must decide where defensive infrastructure and attention are shared. It supports scenario language for a route ledger and a nuclear/SAM handoff.
- Limitation: No accessible captions were exposed in the page accessibility tree, so do not quote spoken lines or infer exact timestamps. Visual observations are situational and v32 is older than the current v0.33.12 rule boundary.

### 2. What Happens When You Put 120 Players On 4 Islands? | OpenFront.io

- URL: https://www.youtube.com/watch?v=IpHZ8Bbl66I
- Title: `What Happens When You Put 120 Players On 4 Islands? | OpenFront.io`.
- Channel: Enzo Plays; page showed 9.1K views and 7 months ago; opened 2026-09-03.
- Video state: The player loaded a 37:45 match after a short pre-roll. The visible thumbnail/gameplay shows four separated island theatres densely populated by players. The page summary describes early alliances, Port placement, and naval navigation as the route to an advantage before expansion.
- Useful observation: The extreme population scenario makes the coordination requirement visible: local island safety, Port ownership, and an agreed first crossing matter before a team can reinforce another theatre. It is useful for a “crowded Four Islands” scenario rather than a universal population recommendation.
- Limitation: The opened page exposed no usable captions, and the video predates v0.33.12. Keep all current numeric and eligibility claims in official code/tag sources.

### 3. OpenFront.io - Four Islands - Free for All - FULL GAME NO COMMENTARY

- URL: https://www.youtube.com/watch?v=_097YJaCtjo
- Title: `OpenFront.io - Four Islands - Free for All - FULL GAME NO COMMENTARY`.
- Channel: Patrick Plays Badly; page showed 158 views and 6 months ago; opened 2026-09-03.
- Video state: The player loaded a 12:45 full game. At approximately 0:02, the visible frame shows the spawn phase with four distinct land masses arranged in the four corners of a square water map and a “Choose a starting location” prompt. The description says the recording continues after the creator dies and invites viewers to look for end-game patterns.
- Useful observation: The frame is direct visual confirmation of the four-theatre spawn problem and the need to pick a home island before coordinating crossings. The no-commentary format is useful for reading map state, deaths, and route changes without treating narration as fact.
- Limitation: There is no spoken analysis and captions were unavailable. It is FFA rather than team play, so use it for geometry and timing context, not proof of a team protocol.

## Official rules and map facts (v0.33.12 boundary)

Use the following first-party sources for every rule or number in the guide:

- Release boundary: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.12
- Four Islands manifest: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/resources/maps/fourislands/manifest.json
- Four Islands assets/thumbnail: https://github.com/openfrontio/OpenFrontIO/tree/v0.33.12/resources/maps/fourislands
- Direct official thumbnail asset: https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.33.12/resources/maps/fourislands/thumbnail.webp
- Transport target and reachable-shore validation: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/game/TransportShipUtils.ts
- Transport arrival, friendly targets, retreat, and 25% malus: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/execution/TransportShipExecution.ts
- Team spawn-area loading/scaling: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/game/TerrainMapLoader.ts
- Port construction/active Port behavior: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/execution/PortExecution.ts
- SAM interception and friendly-fire filtering: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/execution/SAMLauncherExecution.ts
- Reachable inland-lake shore regression test: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/tests/core/game/TransportShipUtils.test.ts

The v0.33.12 manifest records a 1,500 x 1,500 Four Islands map with 517,506 land tiles; reduced representations are 750 x 750 with 127,769 land tiles and 375 x 375 with 31,175 land tiles. It defines four Nation anchors, but those are NPC anchors, not guaranteed human spawns. Its `teamGameSpawnAreas` define two 750-by-1,500 halves for two teams and four 750-by-750 quadrants for four teams. Team spawn areas are an initial placement constraint; they do not promise equal economy, coast length, or safe transport routes.

The transport code is the key factual boundary for the player question. A transport cannot be built when the active transport count reaches `boatMaxNumber()`, when no reachable target shore exists, when the target is self-owned, or when a player target cannot be attacked. On arrival, a friendly target is handled differently from an enemy target; a destination turned into water triggers retreat, and the retreat path can apply the documented 25% malus. The guide must therefore teach teammates to verify target ownership/friendliness, destination shore, water connectivity, and a fallback before committing a boat. Ports and Warships should be presented as sustained naval investments, while SAMs are a shared defensive timing choice; none of these structures should be described as a mandatory transport prerequisite unless the v0.33.12 code proves it.

## Research synthesis (over 600 English words)

Across the opened Reddit discussions and long-form videos, the repeated player problem is not “what is an island?” It is the loss of a shared plan once the opening spawn phase ends. Four Islands presents four separated theatres that look symmetric in a thumbnail but behave asymmetrically after players choose spawns, claim neutral land, and build ports. The community language repeatedly returns to three failure modes: a teammate lets an enemy land on the home island; a player cannot find the transport action because the target is friendly, allied, or otherwise invalid; and the match reaches a naval/nuclear deadlock where every side has enough economy to threaten but no team has a timed bridge plan. Those are distinct, actionable decisions that a map-specific coordination guide can answer.

The 25M Gold question is the clearest demand signal. The author compares their own missing blue transport button with other players’ boats and tests both bots and open land. The commenter’s explanation that peace or alliance blocks invasion gives the player a useful hypothesis, but it is intentionally incomplete: a correct answer must also check active transport caps, the selected target shoreline, and whether the water path is reachable. That gap is where official code matters. The proposed guide should give a short verification checklist before a teammate spends Gold or troops: identify the target owner, confirm attackability, hover or select the actual landing shore, check whether the route shares a connected water component, and name a fallback. It should then explain what a teammate should communicate, such as “valid tribe landing at north-west beach, bridge owns escort, pressure arrives after capture.”

The softlock post and the longest-game post show the cost of missing coordination. A 1:45 team-of-five match, reports of more than an hour with nothing happening, and a three-hour server limit are not balance constants; they are evidence that teams need an explicit stop line. The softlock comments are useful precisely because they disagree. One commenter argues for earlier MIRV, Embargo, or Hydrogen pressure; the author replies that a MIRV could have caused a two-versus-one alliance and that Warship income made invasion unattractive. A responsible article should not select one comment as truth. Instead, it can frame a decision: if the first landing cannot be reinforced before the opponent’s Port/Warship response, stop the crossing; if the team has a route-denial advantage, assign one player to pressure the Port while another holds the home island; if no player owns the next irreversible action, call a reset rather than queueing another identical transport.

The SAM discussion adds a different timing layer. The top-right island player reports taking local control, establishing a SAM-protected point, and building enough Ports to deny opponents’ naval economy. The team-coordination lesson is not to prescribe stacked SAMs everywhere. It is to assign a defensive owner and an invalidation condition: a SAM specialist protects the island or bridge while the Port owner funds the next crossing; once the enemy changes firing angle or the team gains a safe landing, the specialist can switch from static defense to route escort or second-layer coverage. This is separate from the nuclear-deterrence page because the guide is about who acts and when on Four Islands, not a general account of MIRV economics or strategic parity.

The three opened YouTube watch pages supply visual context at different scales. Enzo Plays’ 1:58:30 four-team match emphasizes constant bombardment, infrastructure, SAM placement, and coordination across islands. The 37:45 120-player match makes crowded shores, early alliances, and Port/naval navigation legible. Patrick Plays Badly’s 12:45 no-commentary FFA visibly starts with four corner land masses and a spawn-choice prompt, making the geometry concrete without relying on narration. Captions were unavailable on the opened pages, so these videos should not be mined for exact spoken claims, hidden numbers, or rules. They are valid community/gameplay observations, not first-party mechanics evidence.

The resulting guide can offer a reproducible four-step team protocol: (1) assign a home-theatre anchor, bridge owner, pressure player, and reserve; (2) record one legal transport destination and one fallback; (3) trigger Port, Warship, or SAM spending only when a named route or threat changes; and (4) end or switch the assignment when the landing is captured, the target becomes invalid, the path fails, or the opponent’s response makes the crossing net-negative. This protocol directly addresses the recurring community questions while leaving general map reading, single-island defense, reusable team roles, and global nuclear strategy to their existing pages.

## Candidate decision

Proceed with `four-islands-team-coordination` as a new guide. It has a unique map/team intent, five relevant Reddit discussions, three opened long-form YouTube watch pages, a first-party v0.33.12 manifest and source boundary, and a verifiable completion definition: readers can state the home theatre, first legal crossing, bridge owner, fallback, and switch/stop signal before committing a transport or shared defensive investment.
