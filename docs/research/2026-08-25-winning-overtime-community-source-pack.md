# OpenFront v0.33.11 winning and Overtime community source pack

Research date: 2026-08-25 (Asia/Vladivostok)

Candidate route: `/guides/winning-overtime/`

Candidate intent: **How does the live territory threshold decide an OpenFront winner, and what should a leader or challenger do before the next Overtime step ends a stalled game?**

Evidence rule: Reddit and YouTube identify recurring player questions, player language, and real match situations. They do not establish rules, values, or the v0.33.11 boundary. Every number and mode claim below is checked against the official v0.33.11 Release, immutable tag source, or tagged tests. No upstream `main` behavior is presented as released behavior. Feedlog and archived project material were not read.

## Editorial recommendation

Approve a new guide whose job is to turn the Overtime badge, clock, threshold panel, and territory share into the next decision. The community evidence repeatedly shows an endgame first-mover problem: several sides can damage one another, but the first side to commit risks being countered or third-partied. Players describe these positions as "see who blinks," "we can't fight each other," or matches that last one or two hours. Existing video advice often says to wait, build a stronger reserve, or let two rivals exhaust each other. That language describes the problem but predates v0.33.11 and cannot explain the new deterministic closing clock.

The released Overtime rule changes that decision. In an enabled game, waiting is no longer neutral. The threshold remains at the normal base through the configured start minute, then drops in whole percentage points. A leader can forecast when a stable share will qualify; challengers can forecast the last 30-second window in which reducing that share still matters. The guide should therefore teach a compact loop: confirm Overtime is actually active, read the live share and strict `>` target, calculate the next crossing, then spend only on territory that changes who crosses the bar.

Overtime is not a damage mode. It does not expire alliances, destroy SAMs, weaken Defense Posts, award the win at minute 30, or select the largest player immediately when it starts. It changes the territory share required by the existing win check. Normal combat, diplomacy, timers, fallout, and map access still determine whether a side can alter the live share before the next check.

## Why this intent is not a duplicate

The baseline `main` tree had no `/guides/winning-overtime/` primary answer or source pack when this topic was selected. `/guides/land-combat/` answers how an active push or defense works. `/guides/mirv/` and `/strategies/nuclear-deterrence/` answer weapon and deterrence decisions. `/guides/doomsday-clock/` covers a different anti-stall system that raises a survival requirement and can rot territory. `/mechanics/modes/` is a short mode overview. None tells a player how to interpret a shrinking win bar, calculate the next crossing, or choose between protecting a lead and attacking the leader.

The unique completion job is: after reading the guide, a player who knows the current game time, live Overtime threshold, and leading share can identify the next threshold step, determine whether equality is enough, and name the one territory change that must happen before that step. The newly authored route on the current topic branch is the selected deliverable, not an older primary answer being retitled.

## Community research method

Four original Reddit discussions were opened individually on their full post pages. Their post bodies, timestamps, and visible comments were read. Four YouTube watch pages were opened; three long videos exposed exportable auto-generated English transcripts and were analyzed. `AZmfslazHKQ`, "The Rex Endgame Strategy: Do nothing then win," was excluded because no transcript was available. Shorts, search-result summaries, generated search summaries, and an unavailable transcript do not count toward the source totals.

Effective community sources: **4 Reddit discussions and 3 YouTube videos with verified transcripts**.

## Reddit source-by-source notes

### 1. "how to get out of stalemate?"

- URL: https://www.reddit.com/r/Openfront/comments/1vrx7fl/how_to_get_out_of_stalemate/
- Posted: 2026-08-18 (`6d ago` on the opened page)
- Player question: the author asks whether there is any way out when bombs are plentiful but every side has enough protection everywhere. A follow-up says the match took just over two hours and that the player stayed to finish it.
- Useful observation: the post supplies the clearest demand language for the guide. Visible comments split between "do not enter" such a position, coordinating against the side with the fewest SAMs, and wanting more anti-stalemate mechanics because players cannot always stay for an hour or two. The disagreement matters: the guide should not promise that one weapon breaks every fort. It should show how Overtime changes the value of waiting and target selection.
- Limitation: the screenshot and comments report one player-created situation. They do not prove weapon performance, the map's objective balance, or any released Overtime value. The post predates the v0.33.11 Release by six days.
- Accessed: 2026-08-25

### 2. "how to fix this stalemate?"

- URL: https://www.reddit.com/r/Openfront/comments/1vty0cz/how_to_fix_this_stalemate/
- Posted: 2026-08-20 (`4d ago` on the opened page)
- Player question: a player occupying Madagascar on the Attack on Titan map asks how to escape a late-game position shown in an image.
- Useful observation: visible replies suggest making allies and building Cities, waiting for opponents to spend MIRVs on one another, or accepting that no realistic solo line remains. These responses expose the information gap: they are contingency advice without a known completion time. A threshold guide can replace indefinite waiting with "what share will win at the next step, and which reachable tiles can change it?"
- Limitation: most board state is encoded in an image, and the thread has few substantive replies. Suggestions about MIRVs, alliances, or cleanup are player opinions, not rules or guaranteed counters.
- Accessed: 2026-08-25

### 3. "We have to do something about stalemates"

- URL: https://www.reddit.com/r/Openfront/comments/1vd07th/we_have_to_do_something_about_stalemates/
- Posted: 2026-08-01 (`23d ago` on the opened page)
- Player question: the author says stalemates become boring and can last for ages. They propose a 30-minute event that expires alliances or awards the game to the player with the most land.
- Useful observation: this discussion almost exactly predicts the player intent that v0.33.11 needs to answer, but not the implemented design. Comments describe an over-one-hour match, the fear that the first mover gets attacked by everyone else, and a desire for an anti-stall event after 30 minutes. The guide should explicitly contrast those proposals with the released behavior: Overtime neither expires alliances nor instantly chooses the land leader at 30:00; it begins lowering the qualifying share.
- Limitation: one comment cites an 80% win condition and others debate MIRVs or Doomsday Clock, but those are community statements. Exact thresholds and the new mode must come from the tagged engine and tests. The thread was posted before the feature Release.
- Accessed: 2026-08-25

### 4. "guys i got into a 3 way stalemate what do i do (I'm Oceania)"

- URL: https://www.reddit.com/r/Openfront/comments/1vsw3k9/guys_i_got_into_a_3_way_stalemate_what_do_i_do_im/
- Posted: 2026-08-19 (`5d ago` on the opened page)
- Player question: the author presents a three-power deadlock and asks what Oceania should do.
- Useful observation: the strongest concise reply is simply "MIRV," while another says all three sides can keep burning resources in border skirmishes. This is useful player language for a failure section: a weapon name is not a decision framework. The guide should require a route, a share change, and a deadline rather than treating any MIRV launch as an automatic win.
- Limitation: the post is flaired as a meme and relies on an image. The comments are demand and vocabulary evidence only. They cannot support a statement about MIRV cost, interception, or success probability.
- Accessed: 2026-08-25

## YouTube source-by-source notes

### 1. "This Endgame Strategy Is Devastating | OpenFront.io"

- URL: https://www.youtube.com/watch?v=j-YsQz38AXg
- Published: 2026-07-13; duration 24:40
- Verified material: the full watch page was opened and its auto-generated English transcript was exported. At 14:12 the player calls the match "a stalled game" and at 14:39-14:43 says the main sides cannot really fight and will "see who blinks." The player then prepares SAMs, Defense Posts, missiles, and response plans before a rapid MIRV and land-attack sequence around 24:10-24:34 ends the position.
- Player problem represented: a late-game player needs to decide whether to wait, prepare a response, or make the first move when every major side can punish commitment.
- Useful observation: the transcript shows the high cognitive load of a stalemate: alliance timers, reserves, launch coverage, possible third parties, and reachable territory all compete for attention. The Overtime guide should reduce this to a threshold-first decision and send readers to dedicated combat or MIRV pages for execution details.
- Limitation: captions are auto-generated and sometimes transcribe "MIRV" incorrectly. The video predates v0.33.11 and contains no released Overtime panel or algorithm. Its successful tactical sequence is one match, not a universal counter.
- Accessed: 2026-08-25

### 2. "How to Win the African Stalemate | OpenFront.io"

- URL: https://www.youtube.com/watch?v=BG-upLHwmh0
- Published: 2026-07-10; duration 39:11
- Verified material: the full watch page was opened and its auto-generated English transcript was exported. At 26:58-27:03 the player recommends patience and building Troops and Gold. At 28:12-28:29 the player describes the first-mover trap directly: any one side could kill another, but attacking invites a betrayal by somebody else. At 29:25 a rival betrayal becomes the trigger to move. At 38:01-39:00 the player attacks after the field has weakened and reports reaching the old 80% finish.
- Player problem represented: players need a trigger that distinguishes productive waiting from waiting too long, especially when a third party can consume both combatants.
- Useful observation: "whoever has the best fort" and "wait for somebody else to move" are strong examples of pre-Overtime endgame logic. In an enabled v0.33.11 match, that advice is incomplete because a stable territory leader may win without initiating the first attack. The guide should tell challengers not to confuse patience with a safe draw.
- Limitation: the uploader's resource counts, fort design, and weapon choices are subjective and version-bound. The video's reference to 80% confirms its own match narration, not the new threshold schedule. Only official tagged sources define current values.
- Accessed: 2026-08-25

### 3. "This Strategy WINS Endgames | OpenFront.io"

- URL: https://www.youtube.com/watch?v=CqLgMnP1jqU
- Published: 2026-01-22; duration 40:26
- Verified material: the full watch page was opened and its auto-generated English transcript was exported. At 18:38-18:47 the player calls the position a waiting game and continues renewing alliances. At 33:49-34:00 the hoped-for route is to win by third-partying two opponents. At 37:03-37:37 the player says fighting an ally would doom both sides. At 39:27-40:18 two rivals exchange MIRVs, the player attacks the exhausted field, reports a displayed 79%, and says the game ends.
- Player problem represented: the player is not confused about controls; they are trying to forecast which commitment changes the final ranking without becoming the next target.
- Useful observation: the transcript supplies a concrete "wait, observe the rival exchange, then capture" sequence. The new guide can preserve that situational reasoning while adding a hard constraint: if the Overtime bar will cross the leader first, challengers may not have time to wait for a perfect third-party opening.
- Limitation: the video is seven months older than v0.33.11. Its spoken 79% is a rounded display or narration and must not be reverse-engineered into a rule. It cannot establish the old or new exact threshold, and its alliances, MIRVs, and map state are not reproducible inputs.
- Accessed: 2026-08-25

## Official version boundary

The [official v0.33.11 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.11) was published on 2026-08-24 and states: "Overtime game mode: shrink the win threshold late-game to prevent stalemates." The immutable tag resolves to `0cb90ccb74787e8384f030517423826fe9f607a9`. The Release summary is authoritative for publication but is not detailed enough to supply the algorithm.

The exact released behavior below comes from tag `v0.33.11`, especially [`Config.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/core/configuration/Config.ts#L135-L145), [`WinCheckExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/core/execution/WinCheckExecution.ts#L93-L115), [`MapPlaylist.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/server/MapPlaylist.ts#L145-L196), and the tagged [core](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/tests/core/executions/WinCheckExecution.test.ts#L559-L632) and [playlist](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/tests/server/MapPlaylistOvertime.test.ts) tests.

There is an important pre-release history trap. The merged implementation PR [#5062](https://github.com/openfrontio/OpenFrontIO/pull/5062) described Overtime as enabled in every untimed public lobby. Before v0.33.11 shipped, PR [#5099](https://github.com/openfrontio/OpenFrontIO/pull/5099) narrowed the rotation to one quarter of public FFA games and removed it from Team and Special public lobbies. The released tag and its tests prove the final boundary. A guide must not quote the older PR description as the live rule, and it does not need to expose this internal history to players.

## Official source-by-source notes

### 1. v0.33.11 Release

- URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.11
- Published: 2026-08-24
- Question answered: was Overtime formally released?
- Usable fact: yes; the formal Release describes it as a late-game shrinking win threshold intended to prevent stalemates.
- Limitation: no rate, start time, chance, or mode boundary is stated in the Release bullet.
- Accessed: 2026-08-25

### 2. Tagged configuration and schema

- URLs: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/core/configuration/Config.ts and https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/core/Schemas.ts#L377-L385
- Published boundary: immutable v0.33.11 tag
- Question answered: what are the base thresholds, default start, drop rate, and allowed configured values?
- Usable facts: FFA starts from 80%, Team from 95%, default start is 30 minutes, and the internal drop rate is 2 percentage points per minute. Only `enabled` and `startMinutes` are wire-configurable; `startMinutes` accepts integer values from 1 through 120.
- Limitation: a valid schema does not prove that every public playlist enables the option; playlist source and tests decide that.
- Accessed: 2026-08-25

### 3. Tagged win check

- URL: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/core/execution/WinCheckExecution.ts#L93-L173
- Published boundary: immutable v0.33.11 tag
- Question answered: which share is compared, how strict is the comparison, and what other endings can supersede Overtime?
- Usable facts: FFA checks the current tile leader; Team sums living players' tiles by team. The denominator is total land minus fallout tiles. Qualification is strictly `share > threshold`, not `>=`. A configured `maxTimerValue` or the separate 170-minute hard limit can also award the game to the leading side.
- Limitation: the file proves the rule, not a player's ability to estimate exact map tiles from a rounded HUD.
- Accessed: 2026-08-25

### 4. Tagged public playlist and tests

- URLs: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/server/MapPlaylist.ts#L33-L34 and https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/tests/server/MapPlaylistOvertime.test.ts
- Published boundary: immutable v0.33.11 tag
- Question answered: where does Overtime appear automatically in public rotation?
- Usable facts: each standard public FFA config independently rolls against `0.25`; a hit sets both the Overtime config and visible public modifier. Tagged tests prove a low FFA roll enables it, a high roll does not, and public Team and Special lobbies never receive this roll.
- Limitation: 25% is a per-config random chance, not a guarantee that exactly one of every four games observed by a player will show the badge.
- Accessed: 2026-08-25

### 5. Tagged Host and Singleplayer controls

- URLs: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/client/HostLobbyModal.ts#L373-L385 and https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/client/SinglePlayerModal.ts#L407-L419
- Published boundary: immutable v0.33.11 tag
- Question answered: can players configure Overtime outside the public roll?
- Usable facts: both Host Lobby and Singleplayer option panels expose an Overtime toggle with a 1-120 minute field and a 30-minute default input. The tagged core test also proves that a Team game manually configured with Overtime decays from 95%.
- Limitation: these controls do not make Overtime automatic in normal public Team or Special rotation, and they do not prove that ranked matchmaking exposes the control.
- Accessed: 2026-08-25

## Published threshold algorithm

For elapsed game seconds `t`, configured start minute `S`, base `B`, and the released rate of 2 points per minute:

```text
secondsPastStart = floor(t) - S * 60

if Overtime is off or secondsPastStart <= 0:
    threshold = B
else:
    threshold = max(0, B - floor(secondsPastStart * 2 / 60))

B = 80 in FFA
B = 95 in Team
win when leading share > threshold
```

The integer math means the displayed bar and simulation move one whole point every 30 seconds. At exactly the start minute, the base threshold is unchanged. "No floor" in the source comment means no positive floor; the returned value is clamped at 0 rather than becoming negative.

For default public FFA Overtime:

| Game time | Live threshold | Minimum relation needed |
| --- | ---: | --- |
| 29:59 | 80% | Hold strictly more than 80% |
| 30:00 | 80% | Hold strictly more than 80% |
| 30:30 | 79% | Hold strictly more than 79% |
| 31:00 | 78% | Hold strictly more than 78% |
| 35:00 | 70% | Hold strictly more than 70% |
| 40:00 | 60% | Hold strictly more than 60% |
| 50:00 | 40% | Hold strictly more than 40% |
| 70:00 | 0% | Any positive leading share qualifies |

The tagged test checks that a one-minute custom start remains at 80 through 60 seconds, becomes 79 at 90 seconds, reaches 70 five minutes after the start, and eventually clamps at 0. A separate test gives a side about 79% of land and confirms it does not win at the base threshold but does win once the bar has fallen below its share.

## Two reproducible decision scenarios

### Scenario A: the FFA leader can win without attacking

Assumptions: public FFA, Overtime badge present, default 30-minute start, no configured timer, stable fallout denominator, and the leader holds exactly 62.4% of usable land.

- At 38:30, 8.5 minutes have elapsed since the start. The bar has dropped 17 points, from 80 to 63. `62.4 > 63` is false.
- At 39:00, the bar has dropped 18 points, from 80 to 62. `62.4 > 62` is true. The leader qualifies on the next one-second win check if the share remains stable.
- Leader decision: avoid an unnecessary all-in that can lose at least 0.4 points of usable land. Defend the cheapest route that preserves the share until 39:00.
- Challenger decision: damage the leader's numerator enough to reach 62.0% or lower before the 39:00 check, or capture enough territory to change the leader. Attacking an unrelated third side without changing this comparison is strategically irrelevant to the immediate result.

This is an editorial scenario derived from the tagged formula. It does not predict the Troops required to move 0.4 points on a particular map.

### Scenario B: equality does not save a challenger in a custom Team game

Assumptions: a Host or server-managed Team game manually enables Overtime at minute 20, no configured timer ends first, stable usable land, and the leading team holds exactly 74.0%.

- At 30:30, 10.5 minutes have elapsed since the start. The Team bar has dropped 21 points, from 95 to 74. Equality does not qualify because the engine checks `74.0 > 74`.
- At 31:00, the bar has dropped 22 points, from 95 to 73. `74.0 > 73` is true, so the leading non-Bot team qualifies.
- Leader decision: preserve the combined team share through the next 30-second step rather than asking every member to launch an unrelated attack.
- Challenger decision: reduce the leading team's combined share to 73.0% or less before 31:00. Damage to one member matters only through the team's total.

This is a valid tagged edge case, not a claim about public Team rotation. Public Team and Special games do not automatically roll Overtime in v0.33.11.

### Timer counterexample

If a custom game has a 15-minute maximum timer and Overtime is configured to begin at 30 minutes, the timer branch ends the match before Overtime can move the threshold. The guide should always ask which clock resolves first. Overtime supplements the existing win check; it does not cancel configured timers or the 170-minute hard limit.

## Player-facing decision framework

Use **badge, bar, breakpoint, route**:

1. **Badge:** confirm the Overtime modifier or custom lobby setting. Three quarters of public FFA configs do not roll it, and public Team/Special do not roll it at all. Never infer the mode solely because a match feels stalled.
2. **Bar:** after the start, read the panel's `Hold > X% to win` wording. The greater-than sign matters. Use live usable-land share because fallout changes the denominator.
3. **Breakpoint:** compute the next 30-second step at which the leader's stable share becomes strictly greater than the bar. Leaders protect that share; challengers must change it before the check.
4. **Route:** choose reachable territory that changes the comparison at the lowest combat and travel cost. A remote island, defended chokepoint, MIRV target, or third-party fight matters only if it changes the leading usable-land share in time.

This yields three clear branches:

- **Leader ahead of the schedule:** shorten fronts, preserve reserve, and stop taking trades that can push the share below the next bar. Opponents have an incentive to coordinate as the crossing approaches, so a nominal alliance is not a substitute for defense.
- **Challenger with a viable route:** attack the current leader or take territory that changes the ranking before the next crossing. Budget backward from the 30-second step, including transport or alliance-expiry time.
- **Challenger without a viable route:** do not pretend a random MIRV, unrelated border fight, or distant expansion resets the bar. Coordinate a route, force the leader to spend or lose share, or accept that the position is already strategically lost even if the win modal has not appeared.

## Failure cases and counterplay

- **Assuming minute 30 is an instant score check:** at 30:00 the FFA bar is still 80. The first drop is at 30:30.
- **Treating 79% as enough against a 79% bar:** equality fails. The exact share must be greater than the integer threshold.
- **Waiting for a perfect third-party opening:** the three verified videos show why waiting was attractive before v0.33.11. In Overtime, the leader may close before that opening appears.
- **Attacking the wrong side:** only the current largest FFA share or leading Team total is tested against the bar. A profitable-looking attack can still lose the game if it does not deny the leader.
- **Equating Overtime with MIRV or Doomsday:** MIRV is a weapon and Doomsday is a separate survival/rot system. Overtime itself neither damages units nor removes land.
- **Ignoring fallout:** the denominator subtracts fallout tiles. A raw map percentage estimated from total land can disagree with the usable-land comparison. The live panel is the safer decision input.
- **Assuming the public chance applies everywhere:** the 25% roll belongs to standard public FFA only. Host and Singleplayer can enable the option manually; public Team/Special do not roll it.
- **Ignoring another timer:** a configured max timer or the 170-minute hard limit can award the leader before or independently of an Overtime crossing.

Counterplay is symmetric. The leader counters challengers by protecting the minimum share needed at the next breakpoint rather than conquering the whole map. Challengers counter the leader by forcing numerator loss, changing the leading side, or denying the cheapest routes that would maintain the lead. Overtime guarantees eventual resolution, not that every trailing player retains a comeback path.

## Mode and map boundaries

- **Public FFA:** the only released public playlist with an automatic Overtime roll; chance is 25%, default start 30 minutes, base 80%.
- **Public Team and Special:** no automatic Overtime roll in the released tag.
- **Host and Singleplayer:** the tagged UI exposes a manual toggle and 1-120 minute input. If enabled in Team, the formula starts from 95% and uses combined team territory.
- **Ranked:** the automatic public FFA playlist evidence does not apply to ranked matchmaking. Ranked also has separate elimination and timer paths. Do not describe Overtime as a ranked rule without a released ranked configuration proving it.
- **All maps:** the threshold formula is map-agnostic. Map topology changes which percentage points are reachable before the next step, not the rate itself.
- **Compact:** standard public FFA can independently roll Compact and Overtime. Shorter travel distances may make 30 seconds tactically denser, but the threshold schedule is unchanged.
- **Archipelagos and separated landmasses:** transport time and accessible shorelines can make a visually nearby percentage unreachable before the breakpoint. Do not recommend remote cleanup without a verified route.
- **Chokepoint and high-defense positions:** the leader may need to protect only the territory that keeps the share above the next bar. The guide must link to land-combat evidence rather than invent a universal attack cost.

## Completion definition for the guide

The guide is complete only if it:

1. Opens with a 40-80 word direct answer that says public FFA chance, default start, one-point-per-30-second decline, and strict `>`.
2. States the v0.33.11 boundary and does not use later `main` behavior.
3. Shows a reusable formula or schedule table and distinguishes threshold from displayed share.
4. Includes at least two numeric scenarios with assumptions, including a strict-equality case and a leader/challenger action.
5. Explains why waiting, MIRV use, alliances, and third-partying may or may not change the live comparison.
6. Covers public FFA, public Team/Special, Host, Singleplayer, ranked uncertainty, timers, fallout, Compact, and map-access boundaries.
7. Links naturally to land combat, MIRV or nuclear deterrence, Doomsday Clock, and a next-step guide without duplicating their mechanics.
8. Keeps the same numbers, conclusions, and structure across en/zh/fr/de/nl localizations and passes the guide audit with this source pack.

## Source index

### Community

- Reddit: https://www.reddit.com/r/Openfront/comments/1vrx7fl/how_to_get_out_of_stalemate/
- Reddit: https://www.reddit.com/r/Openfront/comments/1vty0cz/how_to_fix_this_stalemate/
- Reddit: https://www.reddit.com/r/Openfront/comments/1vd07th/we_have_to_do_something_about_stalemates/
- Reddit: https://www.reddit.com/r/Openfront/comments/1vsw3k9/guys_i_got_into_a_3_way_stalemate_what_do_i_do_im/
- YouTube: https://www.youtube.com/watch?v=j-YsQz38AXg
- YouTube: https://www.youtube.com/watch?v=BG-upLHwmh0
- YouTube: https://www.youtube.com/watch?v=CqLgMnP1jqU

### Official OpenFront

- Release: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.11
- Tagged configuration: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/core/configuration/Config.ts
- Tagged schema: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/core/Schemas.ts
- Tagged win check: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/core/execution/WinCheckExecution.ts
- Tagged public playlist: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/server/MapPlaylist.ts
- Tagged Overtime core tests: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/tests/core/executions/WinCheckExecution.test.ts
- Tagged public playlist tests: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/tests/server/MapPlaylistOvertime.test.ts
- Tagged Host control: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/client/HostLobbyModal.ts
- Tagged Singleplayer control: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/client/SinglePlayerModal.ts
