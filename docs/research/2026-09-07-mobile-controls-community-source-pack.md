# Community Source Pack: Mobile and Tablet Controls

Research date: 2026-09-07 (Asia/Vladivostok)

Candidate route: /guides/mobile-controls/

Proposed player intent: **How can a phone or tablet player reliably distinguish tap, drag, pinch, long-press selection, radial-menu actions, and warship movement, while keeping enough of the board visible to avoid costly mis-taps?**

## Research decision and intent boundary

The repeated problem across the community sources is not simply whether OpenFront runs in a mobile browser. Players can reach a match, but they do not share a dependable mental model for what one finger, two fingers, a stationary hold, and a second tap will do in each game state. The uncertainty changes decisions. A player may fail to choose a spawn, pan when intending to select, open a radial menu when looking for a warship, send the wrong attack percentage, or avoid naval play because the selection sequence is unclear. On a small screen, information panels also compete with the exact patch of map the player must touch.

This candidate therefore owns the released touch interaction model and practical error recovery. It should explain a clean tap versus a drag, two-finger zoom, the radial menu and its center action, the mobile attack-ratio control, single- and multi-warship selection, and ways to regain map visibility before committing an order. It should not promise requested features such as a new quick-build gesture, railway preview behavior, MIRV interception feedback, or safer diplomacy controls unless a formal release and current tagged source establish them.

Existing pages set hard boundaries. The FAQ owns browser availability, no-download access, and mobile sign-in questions. The hotkeys guide owns desktop keyboard and mouse shortcuts. The first-match guide owns general spawn choice, opening priorities, and the beginner match flow. A mobile-controls guide may cross-link those pages, but its unique job is to translate the same live game into touch actions and to explain when a gesture changes meaning. It must not become a renamed beginner guide or a list of desktop bindings.

Several narrower candidates were merged into this one intent. "Mobile warship controls" is important but too narrow because the same tap-versus-drag uncertainty appears before a ship exists. "Cannot spawn on mobile" belongs partly to first-match, but the community issue is specifically how a touch becomes a spawn selection, so the touch path belongs here while strategic placement stays there. "Mobile quick build" and "safer mobile diplomacy" are feature requests without released behavior to document; they remain limitations and counterexamples, not separate guides. This leaves one mature answer with a verifiable completion test: after reading it, a player should be able to enter a current match, select land during spawn, pan and zoom without accidental orders, open the radial menu, confirm the displayed attack share, select and move a warship, and use long-press selection without confusing screen-pixel thresholds with map-tile distance.

Community posts and videos below establish demand, player vocabulary, and visible small-screen situations. They do not establish mechanics. Exact thresholds, menu branches, and version boundaries come from official OpenFrontIO releases, the v0.33.14 tag source, and its official tests.

## Reddit discussions opened and analyzed

### 1. Mobilefront woes

- URL: https://www.reddit.com/r/Openfront/comments/1olgvyi/mobilefront_woes/
- Title: "Mobilefront woes"
- Published: 2025-11-01.
- Accessed: 2026-09-07.
- Player question: The author reports that portrait play would not rotate as expected, information panels covered a large part of the map, and warship control was difficult. The post combines three sources of friction that desktop instructions do not resolve: physical orientation, map visibility, and an action that requires a select-then-destination sequence.
- Useful observations: The thread shows why a mobile guide needs a "clear the view before acting" step rather than only naming controls. A commenter suggests closing or hiding an information panel as a practical workaround. That vocabulary matches a visible Hide control in one of the videos below and gives the guide a player-centered recovery action: reduce overlays, zoom to make the target separable, then tap. The warship complaint also recurs in later official release history, which confirms that touch warship movement has been an explicit product concern.
- Limitation: This thread predates both v0.30.0 and the current v0.33.14 boundary. The device, browser, viewport, operating-system rotation lock, and exact match state are not specified. The commenter's panel workaround is community advice, not an official contract, and it cannot prove that every panel has the same control in the current UI. The guide may use it as a visibility tactic but must source current gesture and warship behavior to tagged code.

### 2. Mobile

- URL: https://www.reddit.com/r/Openfront/comments/1spjqtv/mobile/
- Title: "Mobile"
- Published: 2026-04-19.
- Accessed: 2026-09-07.
- Player question: The author cannot work out how to select a starting location on mobile. A reply describes tapping a target to open a menu and then using the center attack-like icon; comments disagree on whether the overall phone experience is usable.
- Useful observations: This is direct evidence that "tap a valid spawn" is not self-explanatory when the rest of the interface teaches radial-menu interaction. It supports putting spawn state before combat controls and explicitly saying that the meaning of a land tap changes after the spawn phase. It also warns the writer not to assume that a familiar sword or center icon is interpreted consistently on a phone.
- Limitation: The reply is a player's recollection from April 2026, not a current specification. Current v0.33.14 touch handling routes a spawn-phase land touch through the ordinary spawn-selection path and ignores a water touch; the current radial center element also contains a spawn branch, but the InputHandler comments state that normal spawn selection does not open the radial menu. The source pack therefore does not promote the comment into a required current sequence. Device dimensions, random-spawn settings, and whether the player was touching water or invalid terrain are unknown.

### 3. We really need better controls for mobile/tablet

- URL: https://www.reddit.com/r/Openfront/comments/1w964l5/we_really_need_better_controls_for_mobile_tablet/
- Title: "We really need better controls for mobile/tablet"
- Published: 2026-09-06 at approximately 19:45 UTC; the page was roughly three hours old during the first access.
- Accessed: 2026-09-07.
- Player question: The author asks for better ways to send units, build quickly, understand railway placement, see MIRV interception feedback, and avoid accidental diplomacy actions on mobile or tablet. These are not one mechanic, but they share a high-cost precision problem: the player has less room to separate a target, an action selector, and the board state that should be checked before confirmation.
- Useful observations: This is the freshest and strongest demand signal because it lists several decisions that become riskier when the current touch model is unclear. "Send units" maps to attack ratio plus the radial center action. "Build quickly" maps to the Build branch of the radial menu, although no released one-gesture shortcut should be invented. Accidental diplomacy belongs in a defensive workflow: slow down, clear obstructing panels, confirm the selected player and enabled action, and treat menu dismissal as a valid choice. The railway and MIRV items show where a controls guide must stop and link to specialist pages instead of claiming that better feedback already exists.
- Limitation: The post is a feature-request bundle, not a controlled usability study. It does not identify device, browser, settings, game mode, or version, and its requested behavior may not exist. Reddit agreement cannot establish a current control, a numeric threshold, or a future roadmap. The guide should document the released path and identify ambiguity, not write wishlist items as instructions.

## YouTube videos opened, played, and visually inspected

All three usable videos are short clips from the same creator. Each watch page was opened and each clip was played and checked frame by frame. None exposed a verifiable caption track, so no spoken claim or inferred sequence is treated as evidence. Their value is limited to visible mobile layout and player context.

### 1. Trying OpenFront.io on mobile

- URL: https://www.youtube.com/watch?v=ddlqqgtXww0
- Title: "Trying OpenFront.io on mobile"
- Channel: OzarkAnachist.
- Uploaded: 2026-03-23; runtime 0:11.
- Accessed: 2026-09-07.
- Player question represented: What does the active match surface look like on a phone, and which controls remain visible when the board is compressed into portrait space?
- Useful observations: The clip visibly shows a portrait map, a bottom control area, a Hide control, and an attack-percentage slider. Those elements support a guide sequence that starts with visibility and commitment: hide or close information that blocks the target, make the target large enough to distinguish, inspect the displayed percentage, and only then open or confirm an action. The clip also demonstrates why a screenshot-like desktop description is insufficient; the map and controls share a much narrower axis.
- Limitation: Eleven seconds cannot show whether an input succeeded, how a gesture was initiated, or which panels were already open. There are no captions and no reliable spoken explanation. The video cannot establish slider limits, the default percentage, touch thresholds, or compatibility on another device. Those facts must come from v0.33.14 source.

### 2. Open Front on Mobile

- URL: https://www.youtube.com/watch?v=xIH--ZmfNXU
- Title: "Open Front on Mobile"
- Channel: OzarkAnachist.
- Uploaded: 2026-04-06; runtime 0:48.
- Accessed: 2026-09-07.
- Player question represented: How do information panels, the event log, and the radial action menu coexist in a portrait match?
- Useful observations: The clip visibly includes the compact information region, event entries, and a radial menu over the map. It is the clearest visual evidence that a mobile player must read both the selected target and the action layer while much of the board is covered. That supports an explicit cancel-and-reframe habit: if the intended tile or player is no longer visually unambiguous after the menu opens, dismiss the action, clear space, zoom, and repeat rather than guessing from the icon position.
- Limitation: The clip does not demonstrate every radial branch and has no caption track. A visible icon cannot prove its current action, disabled conditions, or relationship checks. The radial menu is dynamic in tagged code, so the guide must not turn this single frame into a fixed clock-face map of buttons.

### 3. Openfront.io on mobile

- URL: https://www.youtube.com/watch?v=MP6VYmm00jA
- Title: "Openfront.io on mobile"
- Channel: OzarkAnachist.
- Uploaded: 2026-03-23; runtime 0:35.
- Accessed: 2026-09-07.
- Player question represented: What precision problems appear when a player interacts near a coast, a target panel, a radial menu, and warships on a small display?
- Useful observations: The clip visibly combines a selected-target region, the radial menu, coastline, and naval context. It supports treating naval control as a two-state interaction rather than a single unexplained tap: first make a ship the selected object, then tap a water destination. It also supports a practical recommendation to zoom before selecting a crowded coastal ship, because the current code chooses the nearest eligible owned warship inside a search radius rather than asking the player to confirm among overlapping ships.
- Limitation: The video is not a complete move demonstration and provides no verifiable narration. The visible coast does not establish path legality, selection radius, ownership filtering, or what happens after a destination tap. It cannot show whether an apparent miss was a game bug, touch precision, or recording latency. Current warship behavior is therefore sourced only to the tagged controller and historical official release.

### Cross-video limitations

The three videos are independent watch URLs but not independent creators, devices, or test environments. They were uploaded around the v0.30.0 period and cannot prove that every visible element is identical in v0.33.14. They also do not satisfy a request for a broad device matrix. The future guide should state that browser chrome, operating-system gestures, rotation lock, and saved settings can change the usable viewport. It may describe the current OpenFront event paths, but it must not promise that every phone will suppress every browser-level gesture.

## Official OpenFrontIO sources and released boundary

### 1. v0.33.14 Release

- URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.14
- Title: "v0.33.14"
- Published: 2026-09-04 at 18:30:43 UTC.
- Accessed: 2026-09-07.
- Player question answered: Which released version should bound the current instructions, and did the latest patch introduce a new touch-control rule?
- Useful observations: v0.33.14 is the latest formal non-TEST release examined for this source pack. Its own patch entry fixes ad-layout issues that prevented modal scrolling. That is relevant to small screens but does not announce a new gesture, attack, spawn, or warship rule. The guide should say "verified for v0.33.14" rather than "introduced in v0.33.14."
- Limitation: The cumulative release body summarizes many earlier changes and does not specify every current event path or numeric threshold. Current mechanics still require tagged source verification.

### 2. v0.30.0 Release

- URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.30.0
- Title: "v0.30.0"
- Published: 2026-03-12 at 04:31:54 UTC.
- Accessed: 2026-09-07.
- Player question answered: Is the compact attack panel and top player-information layout an intentional released mobile design rather than a video-only observation?
- Useful observations: The release explicitly lists an attack-ratio panel redesign centered with the units display, a player-info panel moved to the top and optimized for mobile, and fixes for mobile overlap, cutoff panels, spacing, borders, and tap-to-close overlays. This supports explaining the compact interface as a released product path.
- Limitation: The release describes outcomes, not exact current controls. It does not establish the 1%-100% slider range, the saved default, or how a tap becomes an action in v0.33.14.

### 3. v0.27.0 Release

- URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.27.0
- Title: "v0.27.0"
- Published: 2025-11-22 at 20:27:40 UTC.
- Accessed: 2026-09-07.
- Player question answered: Was moving a warship by touch formally shipped?
- Useful observations: The gameplay changes explicitly say, "Moving warships now possible on touch screen too." This is the official historical boundary for the capability and directly answers the oldest Reddit concern.
- Limitation: v0.27.0 does not document the current two-tap sequence or radius. Those details may have changed and are taken only from the v0.33.14 controller.

### 4. v0.33.14 tagged client implementation and tests

- URLs:
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/client/InputHandler.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/client/TransformHandler.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/client/controllers/WarshipSelectionController.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/client/hud/layers/RadialMenu.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/client/hud/layers/RadialMenuElements.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/client/hud/layers/ControlPanel.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/core/game/UserSettings.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/client/ClientGameRunner.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/src/client/hud/layers/MainRadialMenu.ts
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.33.14/tests/client/InputHandlerGestureZoom.test.ts
- Titles: "InputHandler.ts", "TransformHandler.ts", "WarshipSelectionController.ts", "RadialMenu.ts", "RadialMenuElements.ts", "ControlPanel.ts", "UserSettings.ts", "ClientGameRunner.ts", "MainRadialMenu.ts", and "InputHandlerGestureZoom.test.ts".
- Version date and freshness: Fixed to the v0.33.14 tag released 2026-09-04; accessed 2026-09-07.
- Player question answered: What does each current touch gesture do, which thresholds are numeric, and when do the radial center and attack percentage change the submitted action?
- Useful observations: The following facts are safe for the guide:
  1. InputHandler defines an 800 ms long-press and a 10 px drag threshold. The movement calculation uses Manhattan distance in browser client coordinates. Moving at least 10 px before the timer fires cancels the pending long-press; ordinary one-finger movement emits DragEvent and TransformHandler moves the map.
  2. Releasing a touch after total movement below 10 px emits TouchEvent. A long-press with no selection drag suppresses that tap. After long-press activates, moving and releasing at least 10 px completes a warship selection box.
  3. A second pointer cancels a pending long-press. When two pointers are present, a change greater than 1 px in their Euclidean separation emits zoom centered on the midpoint of their coordinates. The official zoom tests verify direction, focal coordinates, cumulative gesture scale, and prevention of duplicate pointer and gesture zoom.
  4. During manual spawn, a touch on land is routed to spawn handling while water is ignored. ClientGameRunner applies the final conditions: the tile must be valid land, unowned, and allowed by the non-random spawn configuration. "Tap any land" would therefore be too broad.
  5. WarshipSelectionController uses a separate 10-tile Manhattan radius in map coordinates. With no existing selection, a water tap chooses the nearest active owned warship in that radius. With one or multiple warships selected, a water tap sends their move intent and clears selection. If no eligible nearby ship exists, the controller opens the radial context path instead.
  6. Radial menu sectors and the center hitbox explicitly listen for touchstart and prevent default propagation. Attack and Build are dynamic submenu branches. The center action handles a valid spawn during spawn state, donates troops to an eligible friendly target using the current ratio, or attacks another eligible target. The root menu changes with ownership, alliance, disconnection, and available actions; it is not a fixed clock-face layout.
  7. The mobile ControlPanel displays Gold, troop status, a sword plus percentage label, and a range input from 1 to 100. With no saved preference, UserSettings falls back to 0.2, so 20% is a default, not a forced value. A returning player's saved value can differ. Small and desktop panels switch at the project's Tailwind lg responsive boundary; the guide should not invent a pixel breakpoint.
- Limitation: These sources describe the v0.33.14 web client implementation, not every browser's gesture arbitration. "px" means browser client-coordinate pixels, not measured physical screen pixels. Source does not prove that all phones rotate, that browser chrome never intercepts pinch, or that the feature requests for quick build, railway trajectories, MIRV feedback, and diplomacy confirmation are shipped.

## Demand signal from Search Console

The current internal 7-day query snapshot contains "openfront mobile" with 40 impressions, "open front mobile" with 28, and "open front io mobile" with 25. The three rows total 93 impressions, but that total is not a count of unique people and should not be presented publicly as audience size. It is useful internal corroboration that mobile intent reaches the site and deserves a unique landing answer. There is no external URL for this private report, so it remains an internal selection signal rather than a public citation.

## Decision scenarios for the guide

### Scenario A: Spawn without turning a tap into a pan

Assumptions: a standard manual-spawn lobby, the spawn phase is active, and neutral valid land is visible. Clear any panel that covers the intended area, zoom until land and water are distinct, place one finger on valid unowned land, and release with less than 10 px total client-coordinate movement. A touch on water is ignored during this path; a random-spawn lobby does not offer the same manual choice. The decision lesson is not "tap harder" or "press the center sword." It is to identify the state, choose valid land, and make a clean tap. If the map moves, reframe and retry rather than selecting a nearby-looking tile blindly.

### Scenario B: Select and move one coastal warship

Assumptions: the match has started, the player owns an active warship, and the intended destination is water. Zoom until the ship is isolated from other owned ships, then tap water close enough that the intended ship is the nearest eligible one within the controller's 10-map-tile Manhattan radius. That first tap selects; it is not the move order. Tap the water destination next. The controller sends the move intent and clears the selection. The 10-tile search radius is not the same as the 10 px screen gesture threshold, and it is not a promise that every destination is reachable.

### Scenario C: Box-select warships without triggering pinch

Assumptions: several owned warships should move together and are visible within one rectangular screen area. Hold one finger stationary for 800 ms until long-press state activates, drag the selection rectangle at least 10 client-coordinate pixels, then release. Placing a second finger first cancels the pending long-press and moves into the pinch path instead. This creates a useful recovery rule: pinch and frame the fleet first, lift both fingers, then begin a fresh one-finger hold. Do not mix zoom and selection in one gesture.

### Scenario D: Commit the intended attack share

Assumptions: the match is active and an eligible opponent is selected. Read the sword percentage in the mobile control panel before touching the radial center action. A new or reset preference may show 20%, while a returning player can have another saved value; the available slider range is 1%-100%. Set and visually confirm the intended share, then reopen or confirm the target and use the enabled center action. If the target identity or percentage is hidden, cancel and reframe. The guide should not infer an exact troop outcome from a screenshot because current troops and other game state continue to matter.

## Production handoff and fact guardrails

A useful mnemonic can be built around four checks: **State, Space, Share, Submit**. State asks whether the player is spawning, navigating, selecting a unit, or choosing an action. Space asks whether the target is visually isolated and panels are out of the way. Share asks whether the displayed attack percentage is acceptable. Submit asks whether the center action targets the intended land, player, donation, or destination. The mnemonic is editorial, not an in-game feature.

The guide should lead with a 40-80 word direct answer, state the v0.33.14 boundary, and include an original HTML decision table with columns for gesture, numeric threshold, current state, emitted result, and recovery action. It should explain dense coasts and naval maps as higher-precision cases, and random-spawn modes as an exception to manual spawn instructions. Failure coverage should include a long hold without a drag, beginning a pinch during the long-press window, selecting the nearest wrong warship in a crowded 10-tile radius, attacking with a persisted percentage, and trusting a dynamic radial layout from an old screenshot.

The next-reading path should send strategic spawn placement to /guides/first-match/, desktop keyboard and mouse bindings to /guides/hotkeys/, general browser and account questions to the FAQ, naval strategy to the existing warship or team naval-control answer, construction choices to the relevant structure guide, and MIRV or railway mechanics to their specialist pages. This keeps /guides/mobile-controls/ as the only main answer for current touch execution.

## Source count and readiness

- Reddit discussions actually opened and analyzed: 3.
- YouTube videos actually opened, played, and visually checked: 3.
- Official OpenFrontIO source groups: 4, containing 13 first-party URLs across three Releases and ten tagged code/test files.
- Current decision: APPROVE /guides/mobile-controls/ as a new unique route.
- Verification boundary: latest formal non-TEST Release v0.33.14, with historical mobile context from v0.30.0 and v0.27.0.
- Completion definition: five language versions must preserve the same thresholds, state transitions, version note, scenarios, limitations, and next-reading boundaries; no localized version may convert community observations into game rules.
