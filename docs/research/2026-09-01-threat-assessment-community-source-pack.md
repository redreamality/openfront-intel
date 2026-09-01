# Threat assessment and expansion stop-lines: community source pack

Research date: 2026-09-01 (Asia/Vladivostok). The candidate question is: **after the opening, how does an OpenFront player decide who to pressure next, how much territory to take, and when to stop expanding before becoming the next target?** Existing pages cover the first spawn, combat resolution, diplomacy mechanics, and recovery after a lost border. This pack supports a separate decision page about the map-wide scan that connects those pieces.

## Reddit discussions opened

### 1. Beginner guide request

- URL: https://www.reddit.com/r/Openfront/comments/1o3ka48/are_there_any_good_strategy_guides_for_beginners/
- Title: “Are there any good strategy guides for beginners?”
- Relative date shown: 1y ago on the opened Reddit page; accessed 2026-09-01.
- Player question: the author can learn from videos but cannot see why experienced players inspect panels and make decisions so quickly.
- Usable observations: The page body says the problem is attention allocation, not merely controls. Replies repeatedly describe checking the notification box, leaderboard, bordering players, alliance breaks, and incoming transports. Another reply frames the opening around the 42% population wave, reaching water for trade, choosing safe neighbors, and preserving a route. This is direct evidence for a scan checklist that turns “game sense” into observable signals.
- Limitation: the post is archived and the advice is personal. It does not prove any current numeric rule, so it is used only for player language and the attention problem.

### 2. Community build-order debate

- URL: https://www.reddit.com/r/Openfront/comments/1qt4cz8/my_best_strategy_in_openfrontio/
- Title: “My best strategy in openfront.io”
- Relative date shown: 7mo ago; accessed 2026-09-01.
- Player question: what should a player build and how aggressively should they attack bots and nations?
- Usable observations: The author recommends moving from a 20% military ratio to 46–50%, then taking bots, adding a City when landlocked, or a Port near water. Comments challenge stacking Cities, question a 50% commitment, and report spending about 75% of troops to defeat a 5k bot. The strongest recurring lesson is that a memorized ratio is not enough: repeated taps, building placement, and the border created by the attack determine whether the next neighbor can punish the expansion.
- Limitation: the post predates v0.33.12 and contains contradictory personal builds. No percentage or cost is imported as a rule.

### 3. Endgame and threat perception

- URL: https://www.reddit.com/r/Openfront/comments/1qwiace/help_me_to_understand_how_to_win/
- Title: “Help me to understand how to win”
- Relative date shown: 7mo ago; accessed 2026-09-01.
- Player question: a player understands the 42% population idea but cannot convert survival into a win.
- Usable observations: The opened comments describe asking “would my neighbour attack me?”, keeping cash as deterrence, and thinking one move ahead about the new neighbors created by a conquest. A concrete example uses 20 million Gold and four Hydrogen Bombs as perceived deterrence; another says that two large players may exhaust each other while a smaller player waits for the right opening. This language supports a threat score based on who can reach the player, who benefits from an attack, and what a conquest exposes, rather than a ranking-only target list.
- Limitation: these are archived anecdotes. The weapons and amounts are not a reproducible current build and are not used for numeric claims.

## YouTube videos opened

### 1. Multiplayer tutorial

- URL: https://www.youtube.com/watch?v=ehR2j15ttag
- Title: “How to Win in Openfront.io (Multiplayer Tutorial)” (Enzo Plays)
- Relative date shown: about 1 year in Google’s result; watch page opened 2026-09-01.
- Player problem represented: a new player needs a repeatable way to prioritize expansion, economy, and neighboring threats.
- Usable observation: the page is a full-length multiplayer tutorial, so it is useful as a broad context signal for the “what should I do next?” question.
- Limitation: the current watch page exposed no transcript and the browser transcript export reported that no transcript is available. No exact spoken number is cited.

### 2. Stalemate decision video

- URL: https://www.youtube.com/watch?v=BG-upLHwmh0
- Title: “How to Win the African Stalemate | OpenFront.io”
- Relative date shown: about 1 year; watch page opened 2026-09-01.
- Player problem represented: deciding whether to wait, fortify, or move first when a third party can punish either attacker.
- Usable observation: the title and watch-page context directly frame a multi-front stalemate. It is a useful example of why a target list must include outside opportunists and a deadline, not just the adjacent weakest player.
- Limitation: captions were unavailable in this session; the match is entertainment context rather than rule evidence.

### 3. Endgame strategy video

- URL: https://www.youtube.com/watch?v=j-YsQz38AXg
- Title: “This Endgame Strategy Is Devastating | OpenFront.io”
- Relative date shown: 2026-07-13 in the previously verified watch-page record; page reopened 2026-09-01.
- Player problem represented: a late-game player must prepare a response while several rivals watch the same border.
- Usable observation: the watch page presents a stalled endgame with nuclear and conventional choices. It reinforces the community vocabulary of “who blinks first,” but the guide must turn that feeling into checks for reachable land, reserves, weapon readiness, and border exposure.
- Limitation: no current transcript was available; it predates v0.33.12 and cannot establish released values.

### 4. Endgame waiting-game video

- URL: https://www.youtube.com/watch?v=CqLgMnP1jqU
- Title: “This Strategy WINS Endgames | OpenFront.io”
- Relative date shown: about 7 months; page reopened 2026-09-01.
- Player problem represented: waiting for rival exhaustion without allowing a smaller opponent to become the obvious next target.
- Usable observation: the visible watch-page framing is a long endgame match. It is useful for the guide’s “wait with a purpose” advice and for explaining why the next scan must include third-party attacks and alliance expiry.
- Limitation: no transcript was available now, so no spoken result or number is treated as evidence.

## Official fact boundary

Community sources establish the recurring decision problem and player vocabulary. They do not establish rules. The released boundary is the official [OpenFrontIO v0.33.12 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.12), published 2026-08-27. Tagged code and tests used for the guide are [Config.ts](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/configuration/Config.ts), [AttackExecution.ts](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/execution/AttackExecution.ts), [AttackImpl.ts](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/game/AttackImpl.ts), [AllianceImpl.ts](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/game/AllianceImpl.ts), [DoomsdayClock.ts](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/game/DoomsdayClock.ts), and [WinCheckExecution.ts](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.12/src/core/execution/WinCheckExecution.ts). The current project pages for [FFA opening](/strategies/ffa-opening/), [land combat](/guides/land-combat/), [alliances](/mechanics/alliances/), and [recovery](/strategies/recovery-playbook/) define adjacent responsibilities. The guide will use released values such as 50-tick spawn immunity, 3000-tick normal alliances with a 300-tick warning, 30-tile Defense Post range, and the v33.11 Overtime boundary only where the tagged sources support them. It will not turn a video’s build order, a Reddit anecdote, or an unseen replay into a universal percentage.

## Topic decision and completion definition

The repeated signal is a single intent: **“Who is the safe next target, what border should I create, and when should I stop taking land?”** This is not a duplicate of the FFA opening guide because it starts after the opening; it is not a duplicate of land combat because it decides whether to create contact; it is not diplomacy because it evaluates the whole board. Completion means a five-language guide with a direct answer, a scan table, two numeric scenarios with assumptions, failure/counterplay, mode/map adjustments, and links to the opening, combat, diplomacy, economy, and recovery pages. All values are bounded to v0.33.12 and the guide’s recommendations are stated as conditional decisions rather than promises.
