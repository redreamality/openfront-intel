# OpenFront Ranked 1v1 community source pack (2026-09-16)

## Proposed player intent

**How should a player turn an OpenFront Ranked 1v1 spawn into a timed win: choose a legal opening, deny the opponent's bot and coastline options, spend Gold on Cities/defense/nuclear pressure in the right order, and stop investing in a losing branch before the Ranked clock closes?**

This is a new decision page rather than another general beginner guide. `first-match` owns the cross-mode first five minutes, `land-combat` owns an active border engagement, `threat-assessment` owns the all-player scan, `winning-overtime` owns public FFA's changing territory threshold, and `replay-review` owns post-match evidence. The Ranked 1v1 page would own the two-player operating loop: spawn geometry, bot-access denial, short Ranked deadlines, opponent-specific pressure, and the transition from expansion to a decisive finish.

The route proposed for production is `/guides/ranked-1v1/` with five language versions. The completion test is that a reader can label a spawn as **open**, **contested**, or **cut off**; choose the first bounded expansion; keep a named reserve; identify the Ranked timer and victory condition from the lobby; and write a stop signal for City, Port, Factory, Silo, boat, or attack spending. The guide must not turn community percentages or one creator's build into a universal rule.

## Community sources

All six community pages were opened and read on 2026-09-16. Reddit is used for recurring player questions and vocabulary. YouTube captions are used for observed decision sequences. Exact formulas, mode settings, and current version boundaries are taken from the official Release and tagged source below.

### Reddit 1: 1v1 is a completely different game and I love it

- URL: https://www.reddit.com/r/Openfront/comments/1qmauy4/1v1_is_a_completely_different_game_and_i_love_it/
- Title / age: “1v1 is a completely different game and I love it.”, archived post, about eight months old when opened.
- Player question: Why does 1v1 feel sterile compared with FFA, and what actually makes a strong 1v1 player?
- Useful observations: The author describes 1v1 as a two-player real-time strategy loop rather than a diplomacy lobby. The post identifies start selection, nearby wildland and bots, early five-second truce, bot encirclement, denial of the opponent's expansion choices, boats used to reach denied bots, and late coastline snipes. It also gives the useful player phrase “about 40%” for keeping troops available, while the comments argue that the value depends on Defense Posts, micro-attacks, cities, and the opponent's level.
- Why it matters: This is the clearest language for the route's unique problem: a player must deny options while growing, not simply maximize owned land. The disagreement in comments is evidence against publishing a fixed 40% or “always three Cities” rule.
- Limitation: The post predates v0.34.3 and mixes personal estimates with strategic explanation. It cannot establish Ranked timers, current victory checks, attack speed, City costs, or a guaranteed troop ratio.

### Reddit 2: 1v1 ranked

- URL: https://www.reddit.com/r/Openfront/comments/1qpb6en/1v1_ranked/
- Title / age: “1v1 ranked”, archived discussion, about eight months old when opened.
- Player question: What does the Ranked 1v1 ladder feel like, and why do players stop playing it?
- Useful observations: The original poster reports an 1850 Elo. A reply reports stopping at 1750 because opponents spammed 5% boats for eight minutes. Another player values Ranked because it is reliably ten minutes or less and asks for Nations. Other replies mention 1815 and 2000 Elo. The thread therefore exposes two operational facts from player experience: repeated small pressure can consume the whole short match, and the ladder's fixed shape is itself part of the player decision.
- Why it matters: The guide should teach a reader to treat repeated 5% boat or small land pressure as an information-and-attention drain, not automatically as a decisive attack. It should also tell readers to read the actual lobby timer and mode settings instead of borrowing public FFA assumptions.
- Limitation: Elo values and “eight minutes” are personal reports. The thread cannot prove matchmaking formulas, current rank bands, a universal ten-minute timer, or that Nations are enabled in the current playlist.

### Reddit 3: Is the ranked 1v1 full of sweats or do I suck?

- URL: https://www.reddit.com/r/Openfront/comments/1ukgv5f/is_th_ranked_1v1_full_of_sweats_or_do_i_suck/
- Title / age: “Is th ranked 1v1 full of sweats or do I suck?”, about three months old when opened.
- Player question: Why can a player win public lobbies but repeatedly lose Ranked 1v1, especially after a late Gold and nuclear exchange?
- Useful observations: The author says opponents produce large Gold advantages and win the nuke exchange even when the author feels ahead. Replies reject the “sweat” framing and ask for a replay link so the opening and first lost assumption can be reviewed. The player later distinguishes surviving to the last six in a large lobby from the binary win/loss of 1v1.
- Why it matters: This supports a Ranked-specific review loop: identify the first lost resource or route, then change one decision next game. The page should explain why public-lobby survival skills do not automatically transfer to a two-player deadline and why a nuke exchange is usually the end of an earlier economy/territory error.
- Limitation: No replay was attached, and the thread does not identify the map, version, Gold values, or exact nuclear configuration. It is demand evidence, not a balance source.

## YouTube observations

### Video 1: How to win Ranked 1v1 matches | OpenFront.io

- URL: https://www.youtube.com/watch?v=BfPJf9WK3NM
- Channel / date shown: deshack; roughly 1.3K views and two weeks old when opened. Auto-generated English captions were exported.
- Observed sequence: On Australia normal, the creator spawns between two bots, expands for early annexation, lowers attack ratio when the border is risky, places three Cities before a Silo, uses alternate terrain view, adds a Defense Post, then uses a large bounded push. A later Europe Classic game repeats the bot-first opening, uses boats for access, and explicitly warns that Factories and too many Ports do not pay in this Ranked shape.
- Useful observation: The video demonstrates a testable sequence—secure legal bot access, convert early Gold into capacity, then use a timed military/nuclear branch—while also showing that a different map changes the route. It is evidence of a player workflow, not a rule that every game needs three Cities or a Silo.
- Limitation: The commentary is one player's live decision stream. It does not show the complete engine formulas, and some “this is game” calls are made before the actual finish. The video predates v0.34.3's patch fixes.

### Video 2: Can I Win This 1v1 Ranked? | OpenFront.io

- URL: https://www.youtube.com/watch?v=9yjK24XA1vA
- Channel / date shown: deshack; about 300 views and seven months old when opened. Auto-generated English captions were exported.
- Observed sequence: The Australia game starts with a contested opponent and active bots. The creator keeps troops high enough for regeneration, sends boats to reach separated islands, adds Cities and Defense Posts, and changes the push after falling behind in land. A Serpinsky game uses empty islands, cheap City placement, and a delayed attack after a land lead. The commentary includes a three-and-a-half-minute remaining window and a deliberate wait for troops before the final push.
- Useful observation: This video supplies two contrasting scenarios: losing land but recovering through capacity/boats, and gaining a lead then converting it without rushing the finish. It is useful for the guide's “measure, then commit” framework.
- Limitation: The player sometimes calls an opponent AFK and does not expose all lobby settings. The captions contain transcription errors (“boat” and names are frequently garbled), so only the visible strategic sequence is used.

### Video 3: [OpenFront] Ranked matches implemented in update! The days of competing for ELO ratings have begun!

- URL: https://www.youtube.com/watch?v=1_xPnpZAdZg
- Channel / date shown: MizuUmiAoE; about 6.9K views and seven months old when opened. Auto-generated Japanese captions were exported and read with translation for fact extraction.
- Observed sequence: The creator starts from 1500 Elo, treats the mode as an early Ranked/alpha playlist, compares a central plain with an island start, eats bots first, builds Cities at the first 125k threshold, discusses why a Port has little value with one human opponent, notes a 10-minute timer, and finishes by taking the opponent's remaining land. A second game compares spawn quality and the cost of delayed City investment.
- Useful observation: The video is a historical explanation of why Ranked 1v1 changes the value of Port, City, bot access, and map position. It also shows the exact player confusion the guide should resolve: the creator is unsure whether the finish comes from 80% territory, eliminating the opponent, or the timer.
- Limitation: The captions are Japanese and the video describes an early Ranked implementation. It cannot establish the current v0.34.3 playlist or victory contract. It is retained for player language and observed questions only.

## Official fact boundary

The public gameplay boundary for this run is the formal [OpenFront v0.34.3 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.3), published 2026-09-15, with immutable tag commit `222e4078982e6c21c620a69c82de0392c17385bf`. v0.34.3 fixes Ranked matchmaking and payment errors and restores the Default cosmetic swatch; it does not announce a new Ranked combat formula. The preceding v0.34.2 note speeds ordinary defended player attacks by about 10%, so old live timing should not be presented as a current guarantee.

For mechanics, the production guide should cite the matching immutable v0.34.0/v0.34.3 tagged paths rather than community arithmetic:

- Ranked playlist and victory checks: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/WinCheckExecution.ts
- Lobby configuration and mode flags: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/configuration/Config.ts
- Spawn placement: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/SpawnExecution.ts
- Attack execution and current attack speed: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/execution/AttackExecution.ts
- City, Port, Factory, Silo and Defense Post configuration: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/configuration/Config.ts
- Troop growth and capacity: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.3/src/core/game/PlayerImpl.ts

The current repository's generated data and existing strategy pages should be used to cross-check names and links. The guide must state when a value is a listed cost, a visible timer, a tagged rule, a scenario assumption, or a creator/community observation. It must never present the Reddit “40%” estimate, a creator's three-City order, or the historical 10-minute observation as a universal v0.34.3 promise.

## Approval decision

**APPROVE `/guides/ranked-1v1/` as a new unique route.** The candidate has three directly opened Reddit discussions, three directly opened caption-bearing YouTube videos, a clear player question, and a current official Release boundary. The guide's decision framework should be named **SCOPE**: **Spawn** for legal geometry and bot access, **Control** for denying the opponent's next lane, **Observe** for timer/territory/troop signals, **Purchase** one measured economic or military increment, and **End** the branch when the deadline or opponent response changes the objective. SCOPE is deliberately different from the previous guide's LIMIT allocation framework.

The route should link to `first-match`, `team-spawn-formation`, `land-combat`, `threat-assessment`, `nuke-calculator`, `winning-overtime`, and `replay-review` for adjacent questions. It should not repeat their main answers or imply that Ranked 1v1 uses public FFA Overtime, Team donation rules, or a fixed attack percentage without a current mode check.
