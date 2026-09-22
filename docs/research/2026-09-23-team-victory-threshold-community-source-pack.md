# Team victory threshold community source pack

- Research date: 2026-09-23 (Asia/Vladivostok).
- Topic: how a Team side should coordinate land, support, and endgame tempo around the live 80% team-territory win threshold.
- Version boundary: the formal OpenFront v0.34.15 Release and tag `4606060a92c25ebb72e4918f694c5e3488cd34c1`. v0.34.0 introduced the current Team threshold change; v0.34.15 is the latest non-TEST patch and contains deployment-only repair after v0.34.14.
- Community evidence is used for player questions and failure patterns. Exact rules, percentages, timers, and denominator behavior are taken from the tagged Release, `Config.ts`, `WinCheckExecution.ts`, and the tagged test suite.

## Reddit discussions

### 1. How to Win Team Games

- URL: https://www.reddit.com/r/Openfront/comments/1n399q1/how_to_win_team_games/
- Title: How to Win Team Games
- Date / timeliness: Reddit page displayed “1y ago” on 2026-09-23; archived post with 24 comments and 28 visible upvotes.
- Player question: how should a Team group choose safe spawn geography, front-line and support jobs, and a common target instead of four independent FFA openings?
- Observations: the author recommends clustering at an edge or corner to reduce the number of shared borders, explicitly separating front-line and support players, and feeding a selected front-line player. Comments reinforce that one concentrated donor can create a snowball, while other comments warn that an overconfident front-line player can acquire four borders and waste the team's resources. The post also raises practical questions about whether Factories should connect ally territory or a player's own City and Port.
- Limitation: the post predates v0.34.0 and advocates several informal habits without a measured win condition. It does not know that Team's formal threshold changed from 95% to 80%. I use it only to identify the coordination problem and the support-versus-front-line vocabulary.

### 2. Late game is god awful

- URL: https://www.reddit.com/r/Openfront/comments/1lsu9u3/late_game_is_god_awful/
- Title: Late game is god awful
- Date / timeliness: Reddit page displayed “1y ago” on 2026-09-23; archived post.
- Player question: once several nations are covered in fallout, how can a player finish without spending an hour clearing tiny pieces of land and exposing a weak side to attack?
- Observations: the author describes a late game with two to four nations, nuked land, slow clearing, and a fear that a premature push exposes the leader to a counterattack. The post calls MIRVs an anti-fun endgame mechanic and asks for a way to manage a lead without an endless cleanup phase. The decision signal is useful for a Team guide: once the side is near its win share, the correct job is to create a safe, bounded route to the threshold rather than keep every teammate expanding everywhere.
- Limitation: this is a frustration report, not a reliable description of current nuclear coefficients. It also concerns FFA-like late play and predates the v34 Team threshold. Nuclear costs and fallout behavior are therefore not copied as facts; the guide uses the post only for the “finish the game before a needless cleanup spiral” problem.

### 3. Games end too early (or do they?)

- URL: https://www.reddit.com/r/Openfront/comments/1wjnheg/games_end_too_early_or_do_they/
- Title: Games end too early (or do they?)
- Date / timeliness: Reddit page displayed “4d ago” on 2026-09-23; 21 visible upvotes and 10 answers in the search result, with the post body available on the page.
- Player question: why does a Team match declare a winner while several players still appear capable of changing the battle?
- Observations: the author specifically says they play Team modes and feel annoyed when the game declares a winner while remaining players could still turn the game around. This is direct demand for an explanation of a threshold-based end condition, not a request for another opening build. It supports teaching that a Team win is an aggregate team event: the match can end while a losing teammate still owns territory, because the winning team's sum has crossed the threshold.
- Limitation: the short body does not publish a screenshot, map size, or exact shares, and comments are not a formal rule source. The page is still valuable because it captures a current player misunderstanding immediately after the v34 ruleset; the exact 80% and strict comparison are verified from the tag.

### 4. Does it now require less percent of territory to win?

- URL: https://www.reddit.com/r/Openfront/comments/1wghj1n/does_it_now_require_less_percent_of_territory_to/
- Title: Does it now require less percent of territory to win?
- Date / timeliness: Reddit page displayed “8d ago” on 2026-09-23, with 9 visible comments.
- Player question: did a recent patch lower the amount of territory needed to win?
- Observations: the post is only one sentence, but the visible top-answer snippet says the ordinary threshold has not changed and that a lower value appears when Overtime starts, usually around 30 minutes. This is the exact confusion the new guide must prevent in Team rooms: an Overtime drop is a configured anti-stalemate rule, not proof that the base Team threshold is 70% or that every public Team room uses the FFA Overtime schedule.
- Limitation: the Reddit page is too short to establish the rule, and the top-answer text is a community interpretation. The guide treats it as a question prompt only and cites the official `Config.ts` and tests for the actual base and Overtime math.

## YouTube videos

### 1. Can I Lead My Team to a Win In Under 5 Minutes? (OpenFront)

- URL: https://www.youtube.com/watch?v=60G3YtA0_OI
- Title: Can I Lead My Team to a Win In Under 5 Minutes? (OpenFront)
- Date / timeliness: YouTube page displayed “10 days ago” and a 5:01 duration on 2026-09-23.
- Player question / observation: the creator describes a shot-called Team match, feeding a frontline, and closing the game in under five minutes. The page exposes a chapter named “Spawn Hokkaido & take shot call” and the description says the creator fed the frontline and closed the match. This is a useful demonstration of a concentrated Team plan: the win is created by a shared route and a decisive finisher, not by every player taking equal isolated territory.
- Limitation: closed captions were unavailable on the page, so no exact numbers are transcribed. The video is treated as visual gameplay evidence for coordination, not for the 80% rule.

### 2. How to Win in Openfront.io (Multiplayer Tutorial)

- URL: https://www.youtube.com/watch?v=ehR2j15ttag
- Title: How to Win in Openfront.io (Multiplayer Tutorial)
- Date / timeliness: YouTube page displayed “1 year ago”, 95K views, and the channel Enzo Plays on 2026-09-23.
- Player question / observation: this is a broad multiplayer tutorial that frames winning as a map-reading and resource-management problem. The page exposes a one-minute video and a description naming OpenFront.io and its multiplayer Discord. Its relevance is the beginner expectation that “winning” means reading the global objective, which makes it a useful counterweight to a Team-specific guide that must explain why the team's sum, not one player's personal percentage, is decisive.
- Limitation: the public page exposed no captions and the clip predates v34. I use the title and visible tutorial framing for demand evidence only.

### 3. Is Your Strategy Dead? OpenFront v34 Patch Breakdown

- URL: https://www.youtube.com/watch?v=dM0J9Dk77ec
- Title: Is Your Strategy Dead? OpenFront v34 Patch Breakdown
- Date / timeliness: YouTube page displayed “5 days ago”, 2.2K views, and a 48-second duration on 2026-09-23.
- Player question / observation: the description explicitly calls out “how you win”, the 3.3x attack cap, early/late gold changes, MIRV fairness, trusted lobbies, and four new maps. The video is a current patch-context signal: players are actively asking whether old strategy still applies after v34. It makes the 80% Team threshold a timely correction to old 95% advice.
- Limitation: the clip has no captions and its description is promotional. Exact claims are not imported from the creator; the official v0.34.0 Release and v0.34.15 tag are the authorities.

## Official first-party rule sources

1. https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.0 — The stable v34 Release states that Team games now use the same 80% win threshold as FFA, down from 95%. It also states that Overtime is a separate anti-stalemate option and that the Release changed attack, map, economy, and lobby systems. Accessed 2026-09-23.
2. https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.15 — Latest formal non-TEST Release, published 2026-09-22. Its public body fixes an accidental v35 deployment; it does not announce a new combat or victory coefficient. Accessed 2026-09-23.
3. https://github.com/openfrontio/OpenFrontIO/blob/v0.34.15/src/core/configuration/Config.ts — Tagged `PERCENT_TILES_OWNED_TO_WIN = 80`, Overtime defaults (`enabled: false`, `startMinutes: 30`, `dropPercentPerMinute: 2`), and the integer `percentageTilesOwnedToWin` calculation. Accessed 2026-09-23.
4. https://github.com/openfrontio/OpenFrontIO/blob/v0.34.15/src/core/execution/WinCheckExecution.ts — Team territory is summed by `Team`; the highest team is checked against the same `hasWon` threshold, which uses non-fallout land and strict `tilesOwned * 100 > denominator * threshold`. The check runs every ten ticks. Accessed 2026-09-23.
5. https://github.com/openfrontio/OpenFrontIO/blob/v0.34.15/tests/core/executions/WinCheckExecution.test.ts — Tests cover an above-80% Team winner, the unchanged 80% value before Overtime, the one-point-per-30-seconds behavior when Overtime is enabled, and the strict greater-than comparison. Accessed 2026-09-23.

## Cross-source synthesis and editorial decision

Across the Reddit posts and videos, players converge on four practical problems: teammates spread across too many borders; support resources are not converted into a single safe push; late-game cleanup becomes a slow liability; and a match can end while some members still look alive. The new guide therefore owns one question: **when should a Team stop optimizing individual shares and coordinate the cheapest protected path to the team's 80% threshold?** It does not own generic Team roles (the existing strategy page), shared building space (the existing team-economy guide), or FFA Overtime math (the existing winning-overtime guide).

The formal model is simple enough to make a decision tool. At v0.34.15, the base threshold is 80% for Team and FFA. The Team checker sums each living player's tiles by Team, removes fallout from the denominator, and awards the winner only when the team share is strictly greater than the threshold; exactly 80.00% is not enough. If a Host or custom lobby enables Overtime, the same denominator and strict comparison remain, while the percentage falls from the configured start minute at the configured rate; the public default is disabled. A timer or the 170-minute hard limit can end a match before a threshold push. Those boundaries create the guide's completion test: a reader can calculate the live team share, identify the next 1–3% of safe land, assign one finisher and one reserve, and state the visible event that cancels the plan.

The article must use explicit assumptions in two numerical scenarios: a 2v2 team at 76.4% with a 2.1% safe corridor and a 4-player team at 78.9% where fallout changes the denominator. It must also show a failure case in which a teammate chases a personal lead while the team is one safe push from winning. Mode adjustments will cover public Team without Overtime, custom Team with Overtime, Ranked 2v2's elimination shortcut, Doomsday, Water Nukes, and disabled structures. These are decision boundaries, not claims that a particular map or player count guarantees a win.
