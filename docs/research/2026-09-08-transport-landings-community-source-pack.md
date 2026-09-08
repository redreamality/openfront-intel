# Community Source Pack: Transport Landings and Naval Invasions

Research date: 2026-09-08 (Asia/Vladivostok)

Candidate route: /guides/transport-landings/

Proposed player intent: **How should an attacking player choose a reachable coast, allocate troops across Transport Ships, screen the crossing, establish a useful beachhead, and stop or recall the operation when the route becomes unsafe?**

## Research decision and intent boundary

The recurring community question is not merely how to make a boat appear. Players are trying to decide whether a distant coast is actually worth opening, why a transport route succeeds or fails, how much force to remove from the home front, and what a Warship changes before the landing. Those choices create one coherent offensive intent: plan and execute a Transport Ship landing from the launch decision through the first durable land position. The guide should let a reader name the coast, opposition, allocation, screen, and termination rule before the first boat leaves.

This intent is distinct from the existing `/guides/island-defense/` main answer. Island Defense is written from the defender's side: read the incoming route, position a Warship, protect a Port and land reserve, stop a hostile landing, or abandon an exposed island. It contains attacker examples only so the defender can understand the threat. The proposed guide owns the opposite decision chain: how the attacker chooses among target-owned shores, predicts the source shore, sequences one to three waves from a shrinking reserve, puts an escort in the terminal lane first, converts arrival into a second land tile, and recalls rather than feeds a losing route. The two pages should link to one another without duplicating their primary answer.

Other existing pages create additional boundaries. `/strategies/team-naval-control/` assigns broad fleet and teammate roles; it does not decide whether one specific Transport should launch. `/guides/warship-veterancy/` explains progression, health, repair, and when a damaged escort should leave station. `/guides/land-combat/` owns combat after a stable land border exists. `/guides/mobile-controls/` owns touch execution. The new route should borrow none of those jobs. Its completion test is narrower and observable: a player can state a useful coast, maximum wave count, home reserve floor, escort patrol lane, three-step beach plan, and visible abort trigger before committing troops.

Reddit and YouTube below are used for demand, player vocabulary, recurring mistakes, and match context only. They do not establish current mechanics. Exact numbers and version claims are bounded to the official OpenFrontIO `v0.33.14` Release, the immutable `v0.33.14` tagged source and tests, and the generated site data. Open issues, comments, video advice, and later upstream `main` changes are not treated as released rules.

## Reddit discussions opened and analyzed

### 1. Warships should be more effective against invasions

- URL: https://www.reddit.com/r/Openfront/comments/1m06q70/warships_should_be_more_effective_against/
- Title: "Warships should be more effective against invasions"
- Published or relative freshness: approximately one year old on the page at access time.
- Accessed: 2026-09-08.
- Player question: The author reports that small groups of Transport Ships can pass a naval defense while defending Warships are occupied by hostile Warships. The underlying player question is whether a route can be made safe by spreading or timing transports, and whether a Warship screen protects a coast automatically.
- Useful observations: The discussion exposes the practical difference between owning Warships and controlling the actual terminal lane. It also gives the guide a strong counterplay section: an attacker may attempt multiple approach angles or use an escort to occupy the defender, while the defender attempts to put target acquisition over the transports' final approach. An official OpenFront account replies that v24 will make Warships prioritize transports, which is valuable historical context because that behavior can be checked against the current tagged implementation.
- Limitation: The match has no replay, path trace, exact Transport count, ship positions, or version capture. The post cannot prove a current target range, reload rule, or success rate. The official reply is historical release context, not a substitute for the v0.33.14 `WarshipExecution.ts` and `Config.ts` boundary. The guide must not claim that sending many boats guarantees passage or that one defender ship guarantees denial.

### 2. How does one long-range naval invade?

- URL: https://www.reddit.com/r/Openfront/comments/1m0v4g4/how_does_one_longrange_naval_invade/
- Title: "How does one long-range naval invade?"
- Published or relative freshness: approximately one year old on the page at access time.
- Accessed: 2026-09-08.
- Player question: The author can attack nearby territory but cannot discover how to launch a long-range naval invasion. A reply describes using the right-click menu and boat icon. This is direct demand for a guide that starts with command recognition but continues into route and commitment decisions.
- Useful observations: The thread shows that a visible overseas owner is not enough to make the action legible. The player needs to identify the naval action, choose an eligible target, and understand why some distant clicks yield no Transport. That supports a failure-state checklist before strategy advice: confirm the intended owner and relationship, available Transport slot, reachable target shore, qualifying source shore, and whether transports are enabled. It also supports cross-linking desktop and mobile input instructions rather than burying the command inside a tactical paragraph.
- Limitation: A community reply about `right click > boat icon` is not a universal input contract. Touch clients, custom bindings, menu state, and later UI releases can differ. The thread does not establish how the game selects a target shore, whether a Port is required, or why one click is rejected. Current execution and path eligibility must come from tagged client and simulation code.

### 3. naval attacks are too strong

- URL: https://www.reddit.com/r/Openfront/comments/1meh0bu/naval_attacks_are_too_strong/
- Title: "naval attacks are too strong"
- Published or relative freshness: approximately one year old on the page at access time.
- Accessed: 2026-09-08.
- Player question: The author describes losing to a naval attack despite believing they had the stronger early army. Comments discuss Warship range, island economy, and naval counters. The useful question for an attacker is the inverse: when does a sea route create enough positional advantage to overcome a defender's apparent troop lead, and when does that apparent advantage disappear against an interceptor or prepared coast?
- Useful observations: The discussion supports treating Opposition as more than a raw troop comparison. Route length, defender reaction time, Warship position, landing shape, and the home army left behind all influence whether an invasion changes the board. It also supplies player language for the guide's two numeric scenarios: a short strait is not automatically safe, while a longer route can work if it creates a new border and the screen reaches the final approach first.
- Limitation: The post is a balance opinion, not a controlled test. It does not provide exact army totals over time, transport size, path length, map settings, or current-version confirmation. It cannot establish that naval attacks are generally stronger or weaker than land attacks. The guide should translate the concern into a pre-launch decision framework and source all mechanics elsewhere.

## YouTube videos opened and analyzed

Two videos exposed exportable auto-generated English captions. Their relevant timestamps were read directly. A third full match exposed no exportable transcript, so it is retained only as a visually verified context source and is explicitly excluded from spoken-rule evidence. Titles, search summaries, and thumbnails alone were not counted.

### 1. This Endgame Strategy Is Devastating | OpenFront.io

- URL: https://www.youtube.com/watch?v=j-YsQz38AXg
- Title: "This Endgame Strategy Is Devastating | OpenFront.io"
- Channel: Enzo Plays.
- Published or relative freshness: approximately one month old on the watch page.
- Accessed: 2026-09-08.
- Verification: Watch page opened; auto-generated English transcript exported and read around the relevant timestamps.
- Player question represented: When a land route is blocked or strategically poor, can a Transport create a better angle, deny a rival's own crossing, or reach a vulnerable base without abandoning every other threat?
- Useful observations: At 1:31-1:49 the player notices a boat route and then chooses to boat into Iran as a way out of a constrained land position. At 2:56-3:01 another boat is used so an opponent cannot counter-boat while the player avoids a Defense Post route. At 7:50-8:19 the player boats into a base and then prepares Warships around the resulting island angle. At 18:57-19:08 the player launches another boat while explicitly worrying about a rival reaching the same objective. These scenes repeatedly frame transports as geometry-changing commitments rather than generic damage. They support the guide's three-tile beach plan, whole-board Opposition scan, and rule that each later wave needs a fresh decision.
- Limitation: This is one edited match, and the commentary is spontaneous rather than a mechanics tutorial. The captions are automatic and can mistranscribe player names or short phrases. The result does not prove the selected shore algorithm, troop percentage, travel speed, retreat loss, or Warship behavior. It also cannot establish that the creator's decisions were optimal. The guide may use the match to illustrate decisions and uncertainty, never as current rule evidence.

### 2. Openfront guide - How to play optimally, attack, defend, and support from backline | Version 24

- URL: https://www.youtube.com/watch?v=xG0LCTYgb6o
- Title: "Openfront guide - How to play optimally, attack, defend, and support from backline | Version 24"
- Channel: Trader Joe.
- Published or relative freshness: approximately one year old on the watch page.
- Accessed: 2026-09-08.
- Verification: Watch page opened; auto-generated English transcript exported and read around the relevant timestamps.
- Player question represented: How should a team use islands, Transport Ships, and Warships to open a continent without wasting troops or arriving after the opportunity has closed?
- Useful observations: At 12:01-12:09 the presenter describes an isolated opponent needing a boat to return to the continent and a ship potentially destroying it. At 16:19-16:39 the presenter identifies a route across small islands and a short timing window that could avoid being shut down by ships. At 18:27-18:36 the commentary argues for another boat to pressure a different side rather than repeating the same land push. At 19:48-19:56 a boat is found destroyed after the response arrived late, and at 20:57-21:06 another ship is proposed to support the team. Together these timestamps support an escort-first sequence, route staging, and an explicit decision deadline.
- Limitation: The video is explicitly an old Version 24 guide, while the article is bounded to v0.33.14. Its economy recommendations and UI may not match the current client. Automatic captions contain visible errors, including substitutions between "boat" and similar words. The video cannot supply current ranges, unit limits, cost, path behavior, or retreat logic. Its use is limited to player language and an older but still intelligible example of timing and route choice.

### 3. What Happens if You Blockade the Strait of Hormuz? | OpenFront.io

- URL: https://www.youtube.com/watch?v=PPgHsNvNN4M
- Title: "What Happens if You Blockade the Strait of Hormuz? | OpenFront.io"
- Channel: Enzo Plays.
- Published or relative freshness: approximately one month old on the watch page; the opened player showed a 52:36 full runtime.
- Accessed: 2026-09-08.
- Verification: Watch page opened and the video played. The opening and a midgame frame at approximately 31:07 were visually inspected. No transcript was available for export, so no spoken claim is counted.
- Player question represented: How does control of a narrow, predictable water corridor shape where transports can cross and which coast becomes worth contesting?
- Useful observations: The opened midgame frame visibly shows the Strait of Hormuz theater with player territories on both sides of the water, dense coastal ownership, and many naval markers in the shared corridor. That is sufficient for one limited observation: a narrow water component concentrates attention and makes the terminal route readable to both attacker and defender. It supports a map-adjustment section comparing short straits with broad ocean routes and an original HTML route diagram that states assumptions instead of presenting an invented screenshot.
- Limitation: There is no exportable transcript and therefore no verifiable spoken recommendation or timestamped claim beyond the inspected visual state. A frame cannot identify unit ownership reliably, prove a blockade's result, or establish any numeric mechanic. The title itself is not evidence that the blockade succeeded. This source must not be used for current rules, ranges, counts, or causal claims.

### Cross-video limitations

The three videos do not form a controlled sample. Two come from the same creator, one is explicitly an older-version tutorial, and match outcomes depend on players, map, mode, alliances, and editing. The captions available on two pages are auto-generated. The third has no exportable captions. These videos satisfy the need for actual match context and player language, but every mechanic in the guide must remain traceable to official OpenFront sources.

## Official OpenFrontIO sources and released boundary

### 1. v0.33.14 Release

- URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.14
- Title: "v0.33.14"
- Published: 2026-09-04.
- Accessed: 2026-09-08.
- Player question answered: What formal release bounds the current article?
- Useful observations: `v0.33.14` is the latest formal non-TEST Release verified for this pack. Its immediate patch fixes ad-layout behavior rather than introducing a Transport mechanic. The guide should therefore say "verified against the v0.33.14 release boundary," not "introduced in v0.33.14." Later `main` commits are monitoring evidence only.
- Limitation: The Release body is not a complete mechanics specification. Current path, arrival, retreat, client amount, and Warship behavior require the immutable tagged files below.

### 2. Transport eligibility, shore choice, and regression test

- URLs:
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/game/TransportShipUtils.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/tests/core/game/TransportShipUtils.test.ts
- Titles: "TransportShipUtils.ts" and "TransportShipUtils.test.ts".
- Version date and freshness: fixed to the v0.33.14 tag released 2026-09-04; accessed 2026-09-08.
- Player question answered: Why does an overseas click produce a boat from one shore, choose another shore, or produce no boat?
- Useful observations: `canBuildTransportShip()` checks the active Transport limit, legal target relationship, a target-owned reachable shore, and a player-owned source shore reachable through water. It does not require a Port. `targetTransportTile()` deliberately chooses a reachable target shore rather than an attractive but disconnected inland-lake shore. The tagged regression test constructs a target with an enclosed lake and confirms that the route selects a reachable ocean shore. These facts support a Coast check based on water connectivity, owner, and usefulness rather than mere screen proximity.
- Limitation: Reachable does not mean short, safe, economically correct, or guaranteed to stay reachable. The helper does not prove a player's best target and cannot turn path legality into a win-rate claim.

### 3. Transport construction, movement, arrival, warning, and retreat

- URL: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/TransportShipExecution.ts
- Title: "TransportShipExecution.ts".
- Version date and freshness: fixed to the v0.33.14 tag released 2026-09-04; accessed 2026-09-08.
- Player question answered: What happens to troops after launch, during transit, on arrival, and after a recall or route change?
- Useful observations: The execution removes the transported troops from the owner when the unit is created, advances the unit along its water path, and notifies the target about an incoming naval invasion. On successful hostile arrival it conquers the destination tile and begins a normal `AttackExecution` with the transported force. A normal retreat toward friendly territory applies a 25% troop malus before survivors return. If the destination becomes water, retreat behavior is triggered. A separate path-failure branch exists and should be described separately rather than promised as a player-controlled refund.
- Limitation: The file describes simulation branches, not an exact on-screen ETA or an optimal recall timing. Map path length and state changes still matter. The guide must not advise players to manufacture a path failure to avoid the normal loss.

### 4. Configuration and generated unit data

- URLs:
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/configuration/Config.ts
  - https://openfront.fyi/database/units/
- Titles: "Config.ts" and "OpenFront Units Database".
- Version date and freshness: tagged source fixed to v0.33.14; local generated data reports the upstream v33 data boundary and was checked on 2026-09-08.
- Player question answered: What numeric values can be used in the allocation and travel scenarios?
- Useful observations: The tagged configuration sets Transport Ship cost to zero, maximum active Transports per player to three, default boat attack amount to one fifth of current troops, Transport movement to one tile per tick, and simulation tick duration to 100 ms. The generated units database independently presents Transport cost as zero and Warship cost as 250,000 with 1,000 base health and 250 base shell damage. These facts allow explicit hypothetical calculations while keeping strategic conclusions separate from raw values.
- Limitation: The local data `_meta.json` tracks upstream v33 data from a named commit, not the v0.33.14 tag itself. The immutable tag is the authority for release-bound mechanics. A one-tile-per-tick rule plus 100 ms tick duration is a baseline simulation conversion, not a promise that the UI displays an exact arrival time under every live condition.

### 5. Client allocation and saved attack ratio

- URLs:
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/client/hud/layers/PlayerActionHandler.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/game/UserSettings.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/client/hud/layers/ControlPanel.ts
- Titles: "PlayerActionHandler.ts", "UserSettings.ts", and "ControlPanel.ts".
- Version date and freshness: fixed to the v0.33.14 tag released 2026-09-04; accessed 2026-09-08.
- Player question answered: How much of the army does a player-selected Transport launch commit?
- Useful observations: The client action path sends the current attack ratio multiplied by current troops for both land and boat attacks. The control panel exposes the selected percentage, while settings use a 20% fallback when no saved preference overrides it. Because troops are removed on each launch, repeated 20% commands act on a shrinking reserve: from 900,000 with no growth, the first three boats are 180,000, 144,000, and 115,200, leaving 460,800. This arithmetic is an article scenario, not a hidden engine rule.
- Limitation: A returning player may have a different saved percentage, and troop growth or simultaneous actions can change the live totals between clicks. The guide must tell the reader to inspect the displayed ratio and current troops rather than claim every Transport always carries exactly 20%.

### 6. Warship target priority and interception geometry

- URL: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/execution/WarshipExecution.ts
- Title: "WarshipExecution.ts".
- Version date and freshness: fixed to the v0.33.14 tag released 2026-09-04; accessed 2026-09-08.
- Player question answered: What does an enemy Warship change about a Transport route, and what must an escort screen actually cover?
- Useful observations: The tagged execution prioritizes hostile Transport Ships before enemy Warships and Trade Ships. Transport targeting follows a special firing path rather than waiting on the ordinary shell reload used for normal shell targets. Together with tagged configuration values of a 100-tile patrol range and 130-tile target range, this supports an escort-first sequence: establish the patrol over the terminal approach before exposing the Transport. The escort is not attached to a boat and does not create an invulnerable convoy.
- Limitation: Target priority and numeric range do not guarantee acquisition across every coastline or water component. Unit position, route reachability, repair state, and other targets change the result. The guide must not turn a radius into a universal success probability.

## Topic synthesis and rejected alternatives

Three narrower candidates appeared in the sources. "How to make the boat button work" is useful but too small for a decision-changing long-form answer; it belongs near the opening and failure checklist. "Warships versus Transport Ships" overlaps the existing Warship and Island Defense answers when framed as defensive interception. "Strait blockades" depends heavily on one map and is not mature enough from the current visual-only third video. Combining the mature offensive questions yields one unique route: Transport landing planning from coast selection through bridgehead or recall.

The guide should use **COAST** as an editorial decision frame: **Coast**, **Opposition**, **Allocation**, **Screen**, and **Termination**. This mnemonic is not an in-game feature. Coast checks the connected water and the value of the first three land decisions. Opposition checks interceptors, defenders, and third parties. Allocation names the attack ratio, wave cap, and home reserve floor. Screen assigns a patrol lane that covers the terminal approach. Termination names the visible event that cancels or stops the operation.

Two numeric scenarios are ready. Scenario A starts with 900,000 troops, a displayed 20% ratio, no growth during launches, three open Transport slots, a 500,000 home floor, and a 240-step path. The compounding boats would carry 180,000, 144,000, and 115,200, so the third boat is rejected by the reserve rule; at one tile per tick and 100 ms per tick, the baseline path time is about 24 seconds. Scenario B starts with 600,000, a 30% ratio, one existing Transport, a 90-step strait, no escort, an enemy Warship near the only useful beach, and a third party bordering home. A 180,000 launch leaves 420,000 but fails Opposition, Screen, and the three-tile beach test despite the short baseline route. Both scenarios must label every number as an assumption or tagged value.

Failure and counterplay coverage should include no boat spawning, all three slots occupied, target or source shore unreachable, a Port incorrectly assumed to be required, enemy Warship interception, defender troop concentration, a third party attacking the emptied home coast, target ownership changing during transit, Water Nuke conversion of the destination, a one-tile beach with no depth, and normal recall loss. Map adjustments should distinguish archipelagos, predictable straits, inland-water components, large ocean routes, and continental second fronts. Team mode should separate screen, landing, and pressure roles; FFA should demand a larger home reserve and a more immediate objective.

## Production handoff and completion definition

The article should lead with a 40-80 word direct answer, clearly state the v0.33.14 boundary, and include an original HTML route diagram plus a decision table. It should explain that a Transport costs no Gold and needs no Port without calling the operation free, because troops leave the home army immediately and screening may consume Gold. It should distinguish launch rejection, normal manual retreat, destination-water retreat, and path failure rather than blending them into one refund promise.

The five language versions must preserve the same COAST structure, version, ratios, active-Transport cap, movement and timing assumptions, 25% normal retreat loss, Warship ranges and priority, scenario arithmetic, route limitations, map/mode adaptations, and counterplay. The primary route should cross-link Island Defense as the defender's answer, Land Combat for play after arrival, Warship Veterancy and Team Naval Control for escort management, Mobile Controls or Hotkeys for input discovery, and relevant map/team guides only where they own the next decision.

## Source count and readiness

- Reddit discussions actually opened and analyzed: 3.
- YouTube videos actually opened and analyzed: 3.
- YouTube videos with exported, read captions: 2.
- YouTube videos retained as visual-only evidence with no spoken claims: 1.
- Official OpenFrontIO source groups: 6, containing 9 first-party or project-owned URLs.
- English research-note depth: more than 600 words.
- Current decision: APPROVE `/guides/transport-landings/` as a new unique route.
- Verification boundary: latest formal non-TEST Release `v0.33.14`; immutable tagged source for mechanics; generated v33 data only where identified.
- Completion definition: a player can state the coast, opposition, allocation, screen, three-step beach plan, and termination trigger before launch, then explain whether the first wave justifies a second.
