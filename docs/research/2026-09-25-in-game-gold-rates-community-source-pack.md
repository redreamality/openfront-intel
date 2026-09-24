# Community source pack — in-game-gold-rates (2026-09-25)

## Decision intent and version boundary

This pack supports one player decision: **how to read the live Gold-rate columns in the
v34 leaderboard, separate total gross income from Ship Trade, Train Trade, and Piracy,
and use the difference between those rates to choose the next investment or defensive
move**. It does not reteach how to build Ports, Factories, Cities, rail networks, or a
piracy fleet; existing guides own those mechanics. It also does not use current Gold
balance, building count, or creator claims as a substitute for measured income flow.

The feature entered the public game in **v0.34.0**, whose official release notes name the
new leaderboard columns `Gold Income/min`, `Ship Trade Gold/min`, `Piracy Gold/min`, and
`Train Trade Gold/min`. The implementation and tests were rechecked at the current live
boundary, **v0.34.17**. Community sources below identify the questions players actually
ask and show how they react to changing income. All rules, column meanings, time windows,
and numerical boundaries come from the official release, tagged source, or tagged tests.

## Access method and limitations

All three Reddit canonical pages were opened and read in a browser on **2026-09-25
(UTC)**. Reddit JSON/archive command-line requests were unreliable from this host, so no
unopened search snippet is counted as a source. The three YouTube watch URLs were
pre-checked and opened; their upload metadata and `en-orig` automatic-caption tracks were
then retrieved with `yt-dlp` as JSON3. The local research cache contains all three caption
files. Automatic captions can mistranscribe player names and game terms, so the analysis
uses them for timestamped player behaviour and questions, never as numeric authority.

The third video's title differed between surfaces on the access date: the browser watch
page rendered **"I Created the Ultim$ate Trade Empire! | OpenFront.io"**, while current
`yt-dlp` metadata returned **"I BROKE the Game by Trading TOO MUCH | OpenFront.io"**.
The video ID, channel, upload date, duration, and caption track were consistent, so this
is treated as a creator retitle rather than as two sources. The watch page briefly exposed
an advertisement duration before the full video metadata settled; timestamps below come
from the downloaded 49:52 caption track, not from that transient player state.

## Official first-hand sources

1. **OpenFront v0.34.0 release notes**, published 2026-09-14:
   <https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.0>. The release explicitly
   announces the four rate columns used by this guide: total Gold income, Ship Trade,
   Piracy, and Train Trade Gold per minute. This is the authority for the feature's public
   version boundary and labels.

2. **`GoldRateTracker.ts`, tag v0.34.17**:
   <https://github.com/openfrontio/OpenFrontIO/blob/v0.34.17/src/client/hud/layers/lib/GoldRateTracker.ts>.
   The tracker samples cumulative earned-Gold counters against simulation ticks. OpenFront
   runs at 10 ticks per second, and the tracker retains at most two game minutes of samples.
   It returns zero until it has a usable earlier sample; equal or non-advancing ticks also
   produce zero. This means a paused game does not keep decaying a rate according to wall
   clock time. The total column is **gross earned Gold**, not current balance and not net
   profit after spending. Starting Gold is not an earning event, and buying a structure or
   weapon does not subtract from the displayed income rate.

3. **`StatsColumns.ts`, tag v0.34.17**:
   <https://github.com/openfrontio/OpenFrontIO/blob/v0.34.17/src/client/hud/layers/StatsColumns.ts>.
   This file defines the leaderboard column identities, labels, accessors, and sorting
   behaviour. It is the authority for treating the four rates as comparable leaderboard
   measures rather than as a third-party overlay. The three source-specific rates are
   independent cumulative streams: Ship Trade, Train Trade, and Piracy. Their role is
   diagnostic: compare each with the gross rate to see which stream is actually producing
   income and how much gross income remains outside those three trade categories.

4. **`StatsTable.ts`, tag v0.34.17**:
   <https://github.com/openfrontio/OpenFrontIO/blob/v0.34.17/src/client/hud/layers/StatsTable.ts>.
   The table supplies column visibility/configuration and sortable headers. Therefore a
   player should enable the relevant rate columns with the leaderboard controls and sort
   the measured column instead of assuming the richest current balance or the largest
   territory has the strongest income engine.

5. **`TeamStats.ts`, tag v0.34.17**:
   <https://github.com/openfrontio/OpenFrontIO/blob/v0.34.17/src/client/hud/layers/TeamStats.ts>.
   Team rows aggregate the underlying player statistics. A team total is useful for
   comparing collective production, but it can hide which member or which source is
   carrying the rate; investment decisions still require opening the player-level rows.

6. **`GoldRateTracker.test.ts`, tag v0.34.17**:
   <https://github.com/openfrontio/OpenFrontIO/blob/v0.34.17/tests/GoldRateTracker.test.ts>.
   The tagged tests verify rate calculation over simulation time, the two-minute rolling
   horizon, reset/new-game behaviour, the insufficient-sample zero, and paused/same-tick
   handling. These tests are the numeric authority behind the guide's reading procedure.

7. **`LiveTradeRevenue.test.ts`, tag v0.34.17**:
   <https://github.com/openfrontio/OpenFrontIO/blob/v0.34.17/tests/LiveTradeRevenue.test.ts>.
   The tests verify that live Ship Trade, Train Trade, and Piracy revenue counters change
   independently. They support using a flat source column as evidence that the associated
   network is not currently paying, while a changing gross rate can still be explained by
   other income sources. They do not prove why a particular player's route is failing;
   map inspection is still required after the diagnostic signal.

## Reddit discussions (3 opened and analysed)

1. **"Insane amount of gold"**, r/Openfront, published **2026-08-31**:
   <https://www.reddit.com/r/Openfront/comments/1w333f6/insane_amount_of_gold/>.
   Player question: how can another player hold an apparently extraordinary Gold balance
   and many structures, and does that indicate cheating? Observation: the discussion shows
   how quickly players infer hidden advantage from a balance screenshot and building count.
   One commenter points toward a third-party "top 10 gold/min" extension, which is exactly
   the unsafe detour the guide should avoid now that v34 has first-party rate columns. The
   useful decision is to check the room's multipliers, sort the official gross rate, expose
   the source columns, and observe them over game time before making a claim. Limitation:
   comments speculate about the specific match and extension; none establishes the actual
   income formula or proves misconduct. Accessed 2026-09-25.

2. **"Does population increase base level gold income?"**, r/Openfront, published
   **2026-08-22**:
   <https://www.reddit.com/r/Openfront/comments/1vvlk99/does_population_increase_base_level_gold_income/>.
   Player question: is ordinary Gold income driven by population, territory, or another
   hidden factor? Observation: the question exposes the core interpretation problem. A
   player can see a rising total without knowing whether it came from base income, trade,
   rail, piracy, or a one-time event. The v34 breakdown gives a practical experiment: hold
   spending decisions briefly, watch gross and source rates together, and attribute only
   the changes the columns actually show. Limitation: community replies provide hypotheses
   and may describe older versions. Their numbers are not used; formal configuration,
   tracker code, and tests remain authoritative. Accessed 2026-09-25.

3. **"Tips for generating income"**, r/Openfront, published **2026-04-10**:
   <https://www.reddit.com/r/Openfront/comments/1shpkwa/tips_for_generating_income/>.
   Player question: with Cities, Ports, Factories, rail, and Piracy all competing for Gold,
   which option is really generating income? Observation: the replies mix building advice
   with situational heuristics, confirming that counting structures is a poor diagnostic.
   The guide should turn that uncertainty into a repeatable choice: record a rate baseline,
   make one bounded investment, wait for enough game-time samples, then compare both gross
   and the expected source column. Limitation: the thread is valuable as player-language
   evidence, not as a controlled test. Map geometry, alliances, piracy pressure, and match
   settings differ across commenters. Accessed 2026-09-25.

## YouTube videos (3 opened, metadata and `en-orig` captions analysed)

1. **Ultimus_Rex — "The New Gold Meta is Insane... | OpenFront.io"**, uploaded
   **2026-09-15**, 57:10:
   <https://www.youtube.com/watch?v=H-l_558NZ9k>. Player problem: the creator repeatedly
   has to decide whether visible wealth reflects a durable engine or a dangerous temporary
   balance. At 17:43 he identifies a rival "making a lot of money" and stops trading with
   that player; at 33:32 he explicitly sorts by Gold because a MIRV threat makes stored
   resources strategically relevant; around 39:58 he explains why central positions can
   enable Train Trade while fringe positions may lack partners behind them. Observation:
   the match demonstrates why rate, balance, geography, and threat answer different
   questions. A high rate suggests future purchasing power; current balance determines
   immediate weapon capacity; source columns tell which network to inspect. Limitation:
   the narration is strategic commentary, not a controlled comparison, and automatic
   captions sometimes render `warship` and `MIRV` incorrectly. Accessed 2026-09-25.

2. **Ultimus_Rex — "I found the ONE WAY to make money in v34... | OpenFront.io"**,
   uploaded **2026-09-17**, 1:00:02:
   <https://www.youtube.com/watch?v=v9nrGBcY5HU>. Player problem: how to convert Ports,
   warships, Factories, and alliances into enough sustained Gold to survive the v34 late
   game. At 1:41 the creator calls a captured Port a source of income; at 7:41 he notices
   he is making far more money than expected; at 31:26 he sorts by Gold to assess nuclear
   threats; at 32:20 a rival's continuing income changes whether an attack is affordable;
   near 44:52 a new train connection becomes the next proposed money source. Observation:
   the creator repeatedly changes plans from live outcomes rather than from a fixed build
   count. The official rate breakdown turns that intuition into a verifiable procedure.
   Limitation: the title's "one way" is entertainment framing. It does not prove a universal
   best build, and no creator-stated value is used as a rule. Accessed 2026-09-25.

3. **TheBiff — browser title "I Created the Ultim$ate Trade Empire! | OpenFront.io";
   current metadata title "I BROKE the Game by Trading TOO MUCH | OpenFront.io"**,
   uploaded **2026-09-24**, 49:52:
   <https://www.youtube.com/watch?v=cHfeA15ftew>. Player problem: whether adding more Ports
   continues to improve the economy, and why a player with many Ports can still trail
   another economy. At 9:00 the creator checks the leaderboard and says he has the highest
   Gold per minute; at 10:47 he questions whether another high-level investment would be
   less efficient than adding Ports; at 17:24 he observes another player earning more and
   immediately checks that player's Port count; at 33:24 he questions whether more Ports
   are useful when few trades are being stolen; around 43:48 he concludes that his large
   Port count is not producing the top Gold rate and notices competitors' Train lines.
   Observation: this is a direct community example of the guide's core loop: read a rate,
   propose a cause, inspect the matching infrastructure, and reject the hypothesis when the
   source is not paying. Limitation: the lobby appears to use unusual Gold/multiplier
   settings, the narration conflates correlation with causation, and automatic captions
   can miss game terms. It supports the diagnostic workflow, not universal yield claims.
   Accessed 2026-09-25.

## Cross-source synthesis and completion definition

- Community questions consistently confuse **stock** (current Gold), **flow** (Gold per
  game minute), **capacity** (what can be bought now), and **cause** (the income source).
  The guide must teach these as separate readings.
- `Gold Income/min` is the gross top line. Spending does not make it fall by the purchase
  price, and Starting Gold is not earned income. The source columns explain Ship Trade,
  Train Trade, and Piracy flow; any gap between their sum and gross requires inspecting
  other earned-income sources rather than inventing a hidden net-profit calculation.
- A single moment is not a clean experiment because the tracker uses a rolling simulation-
  time window of up to two minutes. The useful workflow is baseline -> one bounded change
  -> enough game-time observation -> compare gross and expected source -> inspect the map.
- A flat source rate is a diagnostic, not a verdict. The player must check whether routes,
  trading partners, rail connectivity, eligible targets, protection, or match settings
  explain it before selling, upgrading, embargoing, or accusing another player.
- The guide is complete when a player can read all four columns, explain why balance and
  rate differ, diagnose at least two numerical scenarios, and choose among expansion,
  protection, switching income source, saving for defense, or stopping a failing investment.

Across the six community sources, the recurring decision failure is not lack of an income
idea but lack of a disciplined comparison. Players notice a large balance, an impressive
structure count, or a sudden leaderboard lead and immediately attribute it to one preferred
cause. The official columns make a better sequence possible: identify whether the question
concerns present purchasing capacity or continuing flow, select the matching column, compare
at least two game-time observations, and then inspect the infrastructure capable of producing
that source. This sequence preserves the useful community instinct to react quickly while
removing unsupported claims about hidden formulas, cheating, or universally optimal builds.

The sources also converge on a practical boundary for action. A rate advantage matters only
when it can fund a relevant purchase before the position changes, while a disruption matters
only when it targets the source that is actually contributing. Therefore the guide should
pair every rate reading with a reserve check, a map exposure, a bounded intervention, and a
stated stop condition. If the expected source column does not respond after a full observation
window, the player should reject or revise the causal story rather than escalating investment.
This is the central completion test because it turns the leaderboard from a spectacle into a
repeatable decision instrument without claiming that one source is always best.

## Research word count note

The English prose in this source pack is the research body. URLs, headings, and quoted UI
labels are supporting metadata. The pack contains three Reddit discussions, three YouTube
videos with verifiable `en-orig` captions, and seven official first-hand URLs; official
release, tagged source, and tagged tests remain the only authority for rules and numbers.
