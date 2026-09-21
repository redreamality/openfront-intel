# Community source pack — `no-alliances-mode`

Date: 2026-09-21. Slug: `no-alliances-mode`. Player intent: **how should a
player change expansion, reserve, trade, target selection, and the win plan
when temporary alliance requests are disabled?** The proposed guide is not a
replacement for treaty timing, betrayal penalties, general threat assessment,
or the attack formula. Its unique decision is how to create safety through
board geometry and remaining options when a dangerous border cannot be made
temporarily friendly.

## Access and verification note

Reddit's normal post pages were blocked in this environment by a network
security page. The three public discussions were therefore opened through the
Reddit embed surface and verified through the public Arctic Shift archive API
for the complete post and comment text. YouTube transcript export,
`youtube-transcript-api`, and `yt-dlp` were unavailable because the current IP
received a bot gate. The three videos were still actually analyzed: their
public watch pages exposed the title, author, publication date, duration, and
`playerStoryboardSpecRenderer`; the high-resolution L3 storyboard sheets were
opened at the beginning, middle, and end of each video. A storyboard frame is
visual evidence of board state, borders, routes, troop displays, and on-screen
captions, but not a substitute for spoken narration or exact rules.

All community sources were accessed on 2026-09-21 (Asia/Vladivostok, UTC+10).
Rules, numeric boundaries, and version claims below were checked separately
against the formal v0.34.12 Release, its immutable tag source, and official
tests. Community advice is treated as a problem signal and a scenario source,
not as authority for mechanics.

## Reddit discussions opened and analyzed (3)

1. **"Why no allies FFA?"** — 2025-09-25, r/Openfront
   `https://www.reddit.com/r/Openfront/comments/1nps9wd/why_no_allies_ffa/`
   - Player question: the author waits, builds to roughly 50–60k troops, then
     faces four to six attackers by about minute two. They ask why neighbors do
     not accept alliances and why apparent patience produces a dogpile.
   - Useful observation: the strongest practical replies connect target choice
     to visible weakness. One advises clearing bots early but not allowing the
     displayed troop count to fall far below neighboring Nations. Another says
     players ally with opponents they cannot cheaply beat and conquer the weak.
     A detailed reply describes the game as dogpiling the weakest player and
     recommends keeping most troops defending even while expanding. The author
     later acknowledges skipping available bots for role-play reasons while a
     60k neighbor attacks and a 500k player then consumes that neighbor.
   - Guide implication: "wait and save" is not sufficient. The guide needs a
     reserve floor plus an active expansion rule: take efficient neutral or Bot
     gains, stop before the displayed reserve makes two neighbors prefer the
     same target, and reassess after every new human contact.
   - Limitation: this thread discusses ordinary FFA where alliances exist, so
     it does not prove the No Alliances modifier's behavior. It supplies the
     target-selection and dogpile problem that becomes sharper when treaties
     cannot remove a border. Exact numbers are anecdotes, not universal
     thresholds.

2. **"Are alliances in team games useless?"** — 2025-10-14, r/Openfront
   `https://www.reddit.com/r/Openfront/comments/1o638cj/are_alliances_in_team_games_useless/`
   - Player question: an opponent allies with the author and later attacks the
     author's teammate, creating pressure to retaliate and accept a penalty.
     The author asks whether alliances have any value in Team play.
   - Useful observation: replies distinguish fixed team membership from a
     temporary cross-team pact. One describes a treaty as useful only when it
     genuinely removes a front so another enemy can be fought. Another warns
     not to rely on an allied border as the only way to reach the opponent who
     may attack a teammate. The discussion repeatedly returns to access: who
     shares which border, who can reinforce, and whether another route remains.
   - Guide implication: No Alliances must not be described as a special FFA.
     In fixed Team games the stable friendly relation is the assigned team,
     while outside teams cannot be converted into temporary friendly borders.
     The practical framework therefore needs separate FFA and Team branches:
     personal territory and self-contained exits in FFA, shared coverage and
     teammate reinforcement geometry in Team.
   - Limitation: several comments speculate about incentives and trade-ship
     preferences. Those claims are not used as rules. The fixed-Team friendly
     state and neutral trade eligibility are verified from v0.34.12 source and
     tests below.

3. **"Current alliance makes no sense"** — 2025-06-30, r/Openfront
   `https://www.reddit.com/r/Openfront/comments/1loiqi4/current_alliance_makes_no_sense/`
   - Player question: the author argues that alliances are used to wait for an
     opening and betray, and proposes a permanent, stacking debuff.
   - Useful observation: the most relevant reply states that the endgame still
     has one winner, so neighboring players eventually have to be absorbed.
     Other replies describe helplessness when 100k troops meet a 200k invasion
     and debate whether stronger forts or a harsher betrayal penalty would
     solve the problem. The important pattern is not the proposed balance
     change; it is that a treaty delays a conflict but does not remove the
     final competition for territory.
   - Guide implication: when the treaty system is disabled, players should not
     recreate an imaginary permanent pact. A quiet border is a temporary
     alignment of incentives. The guide should tell the leader to expect the
     remaining players to benefit from interrupting the win line, and tell a
     trailing player to preserve a second route rather than becoming dependent
     on one neighbor's continued restraint.
   - Limitation: the thread predates v0.34.12 and discusses a then-current
     betrayal debuff. It is used only for the recurring player concern about
     delayed conflict and the single-winner endgame, not for current debuff
     duration or alliance code.

## YouTube videos opened and analyzed (3)

1. **"Playing OpenFront with NO ALLIANCES on a COMPACT MAP."** — Ultimus_Rex,
   published 2026-06-07, 1:01:33
   `https://www.youtube.com/watch?v=-KdMyMJohSY`
   - Player question: what does a full match look like when alliance requests
     are unavailable and compact geography forces early contact?
   - Storyboard observations: during the opening (roughly 0:00–1:20), the
     Australia Compact board fills rapidly and the player's shape develops
     several thin contacts instead of a treaty-protected side. Around the
     30-minute sheets, a green position falls from about 3.68M visible troops
     through roughly 1.30M, 650k, and 446k while northern and eastern powers
     continue compressing it. Near 60 minutes, a second Europe position spans
     Scandinavia but remains connected to pressure from Britain, Iceland, and
     long sea routes.
   - Guide implication: compact maps shorten the time between "new border" and
     "actionable threat." Multiple independent players can converge on a low
     reserve without any coordinated treaty. On larger maps distance is only a
     temporary buffer because Boats and Warships reconnect remote fronts.
   - Limitation: no reliable transcript was available, and the inspected L3
     storyboard samples at ten-second intervals. It proves visible state transitions, not
     the player's complete explanation or a deterministic causal rule.

2. **"The new \"No Alliances\" gamemode is INSANE!"** — published 2026-03-19,
   52:10
   `https://www.youtube.com/watch?v=IJPyJZwj86A`
   - Player question: how should a player survive when a long No Alliances
     match on Two Lakes produces several simultaneous land and water contacts?
   - Storyboard observations: the opening sheets show a thin, elongated
     position whose early expansion creates contact with several players. In
     the middle sheets, the position repeatedly expands and defends between
     adjacent large powers; there is no friendly treaty edge that can freeze
     one side while the other is resolved. Later sheets show cross-water
     movement and separate economic and military fronts. Even near the end,
     the board still requires mobile troops rather than one irreversible send.
   - Guide implication: on a map with lakes, shoreline is not an empty edge.
     A player needs to count both current land borders and plausible water
     arrivals, avoid long fingers that invite contacts on both sides, and keep
     a second route or reserve for the front that changes first.
   - Limitation: the watch page's media stream stalled and subtitles were
     unavailable. Analysis uses the official 320x180 storyboard at ten-second
     sampling, including M0, M10, M20, and M30. It supports visible shape,
     fronts, and movement, not narration or exact mechanical values.

3. **"This is what happens when you disable alliances..."** — published
   2026-06-01, 54:36
   `https://www.youtube.com/watch?v=BF_0p-FSHA4`
   - Player question: what happens to defense and the endgame when an Arctic or
     northern-Europe position cannot use temporary alliances to remove one of
     several major neighbors?
   - Storyboard observations: the opening clears nearby small blocks before
     major contact. In the middle of the match, an orange position is pressed
     by large countries from the east, west, and north, making multi-front
     reserve management visible rather than hypothetical. Later sheets show
     straits and sea routes changing who can reach the core. Near 45 minutes,
     multiple nuclear blasts and large green fallout areas appear as the game
     moves toward its result.
   - Guide implication: disabling alliance requests does not remove naval
     reach, nuclear deterrence, or the normal need to convert a territorial
     lead. The guide should treat straits as switchable doors, keep an answer
     for the fastest route into the core, and avoid spending the final reserve
     just because one land neighbor is collapsing.
   - Limitation: the watch page's media stream stalled and subtitles were
     unavailable. Analysis uses the official 320x180 storyboard at ten-second
     sampling, including M0, M10, M20, and M30. Colors and simultaneous attacks
     do not prove coordination; the frames establish only the visible board
     state, route changes, multi-front pressure, and nuclear endgame.

## Official primary sources and verified rule boundary

1. **OpenFront v0.34.12 formal Release and immutable tag**
   `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.12`
   `https://github.com/openfrontio/OpenFrontIO/commit/7c27263390d8f1976566e5c5ad9adf6fcad311b6`
   - This is the current non-TEST boundary. Its gameplay note says only that
     early-to-mid-game Trade Ship and Train generation was increased. It gives
     no uniform multiplier and does not claim a No Alliances rules change.

2. **Game modes, playlist modifier, and alliance disable condition**
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.12/src/core/game/Game.ts`
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.12/src/server/MapPlaylist.ts`
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.12/src/core/configuration/Config.ts`
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.12/tests/CustomAllianceDuration.test.ts`
   - `GameMode` distinguishes FFA and Team. No Alliances is a modifier, not a
     third game mode. The playlist maps `isAlliancesDisabled` to
     `disableAlliances`, while configuration treats
     `customAllianceDuration === 0` and the legacy flag as disabling alliance
     requests. Official tests cover both zero minutes and the legacy boolean.

3. **Requests, fixed teams, attacks, and land-border reachability**
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.12/src/core/game/PlayerImpl.ts`
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.12/src/core/execution/alliance/AllianceRequestExecution.ts`
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.12/src/core/execution/AttackExecution.ts`
   - Disabled alliances make new requests unavailable. Friendly status still
     includes members of the same fixed team, so a Team lobby does not become
     free-for-all combat. Ordinary attacks against owned land require a valid
     non-friendly target and four-neighbor land contact after immunity checks;
     this boundary must not be generalized to transports, missiles, or nukes.

4. **Neutral trade, war embargo, and in-flight Trade Ships**
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.12/tests/core/executions/NationStructureBehavior.test.ts`
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.12/src/core/execution/TradeShipExecution.ts`
   - `canTrade` depends on reciprocal embargo state, not alliance membership.
     The official Nation test explicitly includes a non-embargoed neutral
     neighbor with "other" weight. A normal attack creates a temporary embargo;
     the default configuration duration is five minutes, and an uncaptured
     in-flight Trade Ship is removed when the route is no longer tradable.
     Therefore "No Alliances" does not mean "No Trade," but war can interrupt
     the route.

5. **FFA versus Team victory calculation**
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.12/src/core/execution/WinCheckExecution.ts`
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.12/tests/core/executions/WinCheckExecution.test.ts`
   - The win check branches by FFA or Team, not by the alliance modifier. FFA
     counts the leading player's territory; Team aggregates team territory.
     The base check is strictly greater than 80% of non-fallout land, not equal
     to 80%. Overtime, configured timers, and the hard match limit can alter how
     a game ends, so the guide should link the dedicated Overtime answer rather
     than presenting 80% as the only finish.

## Cross-source synthesis and completion definition

Across the six community sources, the repeated mistake is treating safety as
an intention: waiting, assuming a quiet neighbor is friendly, spending down to
win one local fight, or believing a large lead protects every edge. The board
evidence points to a different decision model. Safety is the current cost of
attacking you, the number and shape of hostile contacts, and whether a second
route remains after the first closes. The guide should therefore teach a
repeatable loop: set a visible reserve floor, choose gains that shorten the
exposed perimeter, identify the outside beneficiary before attacking, stop at
a stated loss or contact limit, preserve neutral trade only while its fallback
works, and convert a lead according to the actual FFA or fixed-Team win line.

The guide is complete when a reader can answer five questions during a live
match: (1) which borders can legally become hostile now, (2) what troop reserve
must remain after the next action, (3) whether the target improves or worsens
geometry, (4) which third player benefits if both sides spend down, and (5)
whether the current finish is personal FFA territory or aggregate Team
territory. It must include at least two explicit numeric scenarios with stated
assumptions, a mode/map adjustment section, failure and counterplay patterns,
and a decision table. It must not invent a universal safe troop count, a fixed
dogpile probability, a v0.34.12 trade-spawn multiplier, or a guarantee that a
quiet neighbor will remain neutral.
