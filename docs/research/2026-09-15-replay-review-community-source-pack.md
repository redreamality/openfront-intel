# Community Source Pack — Replay Review

- **Date:** 2026-09-15
- **Topic slug:** `replay-review`
- **Candidate route:** `/guides/replay-review/`
- **Version boundary:** v0.34.1 (official release)
- **Access date (all sources):** 2026-09-15

This pack tests whether replay review deserves a standalone OpenFront guide and
records the source boundary for that guide. The conclusion is **mature: move the
candidate into planning**. Version 0.34.1 joins public profiles, game history,
shareable game links, per-game statistics, a replay-capable player information
panel, and versioned replay shells into a coherent review workflow. Community
sources independently show players using replays to inspect reversals,
suspicious cooperation, overcommitment, alliance timing, trade, and nuclear
endgames.

Reddit and YouTube are evidence of demand, player language, and useful review
questions. They are not authority for game rules or numeric claims. Product
capabilities are stated only when present in the official v0.34.1 release,
immutable tagged source, tagged tests, or linked OpenFrontIO commits.

## Maturity decision and unique intent

The standalone intent is:

> A player wants to use v0.34.1's public profile and game history, a shareable
> game link, replay mode, player information panel, and game statistics to
> reconstruct the decisions that changed a match and choose one testable
> adjustment for the next match.

This is not a generic replay feature tour. It is a repeatable after-action
review method. The reader begins with a completed match, identifies a small
number of decision points, compares what they believed at the time with what
the replay now reveals, separates controllable errors from opponent responses
and luck, and writes a concrete next-match experiment with a stop condition.

The intent does not duplicate existing routes:

- `first-match` owns the opening flow for a player's first live game, not
  post-match reconstruction.
- `threat-assessment` owns scanning the live map and choosing the next threat,
  not historical evidence or hindsight review.
- `recovery-playbook` owns decisions after a player has fallen behind, not
  diagnosing which earlier choice produced that position.
- `post-mirv-recovery` owns recovery and counterattack after a MIRV. Replay
  review applies to openings, alliances, trade, conventional attacks, nuclear
  decisions, suspicious coordination, and endings alike.

The route should stay decision-led. A page that only lists the Games, Stats,
copy-link, and Watch Replay buttons would be thin product documentation. A
useful guide teaches the reader what evidence to capture at each turning point,
which conclusions the evidence supports, and what not to infer from one match.

## Completion definition

The guide is complete only if a reader can:

1. Find a completed game through a public profile's Games history.
2. Preserve the actual game URL or ID before starting the review.
3. Read the map, mode, date, duration, player count, result, and available
   rankings without treating one aggregate statistic as a full diagnosis.
4. Open the replay and select at least three decision points rather than watch
   the entire match passively.
5. At each point, record the visible state, decision made, expected result,
   actual result, and first evidence that the expectation had failed.
6. Use the replay player panel as read-only evidence and understand that
   live-only actions are intentionally unavailable there.
7. Label each causal claim as an observed fact, plausible inference, or
   unresolved question.
8. End with one next-match change, one trigger for applying it, and one stop
   condition for abandoning it.
9. Reuse the same note format after the next match to decide whether the change
   was reproducible rather than merely successful once.

“I should have been more aggressive” is not a completed review. “When the
bordering opponent commits most of their troops elsewhere, cap my first push at
one planned increment; stop if a new border opens or my reserve falls below its
previous stable level” is reviewable, without inventing a universal threshold.

## Reddit (valid, primary community pages)

All five pages were opened as rendered Reddit pages. Their post titles and
publication dates were read from page data. Reddit's JSON endpoint was not used
because it returned a network security interstitial during this run.

1. **r/Openfront — “New tool: Watch all old replays, play old versions in
   singleplayer”**
   - URL: `https://www.reddit.com/r/Openfront/comments/1skol51/new_tool_watch_all_old_replays_play_old_versions/`
   - Published: 2026-04-13.
   - Player problem: identifying the build required by an older game and
     getting its replay to open.
   - Usable observation: the shared third-party tool accepts a game ID,
     identifies a version, and starts a replay. The demand is not simply for
     highlights; players want access to the original match state after the
     current client has moved on.
   - Editorial use: introduce version compatibility as part of evidence
     preservation. This demand is now better connected to official v0.34.1's
     versioned replay work.
   - Limitation: this is a third-party tool, not an official OpenFront feature.
     The post cannot prove every historical build has a functioning replay
     shell or that the tool remains available.

2. **r/Openfront — “Quality of life suggestion: Make replays easier to save and
   share”**
   - URL: `https://www.reddit.com/r/Openfront/comments/1uv5gtb/quality_of_life_suggestion_make_replays_easier_to/`
   - Published: 2026-07-13.
   - Player problem: replay sharing feels cumbersome, especially when a player
     wants a clean spectator presentation or short video/GIF excerpt.
   - Usable observation: the post explicitly refers to match history under the
     profile. Comments point out that a game URL can be shared directly and
     that profile history contains replays. This gives the guide authentic
     player language around finding and handing off a match.
   - Editorial use: begin the workflow by copying the canonical game link and
     recording the game context. A link is evidence another player can inspect;
     a retold highlight is not.
   - Limitation: video/GIF export, a clean export view, and proposed statistics
     are feature requests. They must not be presented as shipped v0.34.1
     capabilities.

3. **r/Openfront — “Can I see replays from older versions?”**
   - URL: `https://www.reddit.com/r/Openfront/comments/1oozpdh/can_i_see_replays_from_older_versions/`
   - Published: 2025-11-05.
   - Player problem: a long, memorable match could no longer be opened after an
     update, preventing the player from revisiting its turning points the next
     day.
   - Usable observation: the post demonstrates why delayed review matters. A
     two-hour match is too complex to diagnose accurately from memory alone. A
     comment suggests `blue.openfront.io` but also says it only lagged the main
     build by one update.
   - Editorial use: explain why the guide's version boundary is v0.34.1 and why
     copying the game link promptly is part of the workflow.
   - Limitation: this is an older report and its workaround was temporary. It
     does not describe current official behavior and should not be recommended
     as the v0.34.1 replay path.

4. **r/Openfront — “Is this player cheating?”**
   - URL: `https://www.reddit.com/r/Openfront/comments/1rj04r1/is_this_player_cheating/`
   - Published: 2026-03-02.
   - Player problem: using a shared replay to inspect whether four nearby
     players coordinated unusually and sent trains toward one player.
   - Usable observation: the post includes a real share pattern,
     `https://openfront.io/w15/game/4sJAWgZ3?replay`, and shows that replay review
     is used for more than self-improvement. Players inspect positioning,
     resource movement, and multi-player behavior.
   - Editorial use: include an “anomaly review” scenario, but teach neutral
     observation: identify players, times, repeated transfers, and alternative
     explanations before making a claim.
   - Limitation: comments are brief and emotionally framed. A replay can
     support a timeline, but this thread cannot establish cheating, intent, or
     the rules governing trains.

5. **r/Openfront — “Replay: The comebackest comeback in the history of
   comebacks”**
   - URL: `https://www.reddit.com/r/Openfront/comments/1vbnnk1/replay_the_comebackest_comeback_in_the_history_of/`
   - Published: 2026-07-31.
   - Player problem: sharing and explaining an unlikely recovery rather than
     reducing it to a winning screenshot.
   - Usable observation: the post and comments use a useful review vocabulary:
     nomadic recovery, third-party trade, factory expansion, SAM defense,
     over-investment by a nearly eliminated player, and two stronger opponents
     tying each other down. The author also acknowledges dependence on opponent
     behavior and luck.
   - Editorial use: this is the clearest community example of separating a
     controllable sequence from enabling conditions. A review should record
     both “what I did” and “what the lobby allowed.”
   - Limitation: it is one dramatic match. It cannot establish a universal
     build order, optimal factory count, or general win-rate claim.

Valid Reddit count: **5**. Search-result snippets, duplicate links, and pages
whose content was not opened were not counted.

## YouTube (valid, captions inspected)

All three watch pages were opened and their English-original automatic captions
were downloaded and inspected. Timestamps below are review waypoints rather
than verbatim transcripts. Automatic captions can mishear player names, unit
names, and numbers; no rule or numeric fact is sourced from them.

1. **Ultimus_Rex — “This endgame strategy was absolute PERFECTION. |
   OpenFront.io”**
   - URL: `https://www.youtube.com/watch?v=X8IhhxEV7_A`
   - Published: 2026-04-29; duration: 53:13.
   - Caption observations: during the opening minutes, the creator states a
     plan and repeatedly adjusts it as the lobby develops. Around 02:00 he says
     troop management has not been ideal. Around 08:00 he reassesses expansion,
     alliances, and suspicious threats. Around 20:00, MIRV pressure, reserves,
     and defense lead to waiting and deterrence. Around 23:00 he acknowledges
     spending too much on a push. After 40:00, SAMs, warships, alliances, and
     several betrayals repeatedly reset the expected endgame. The closing
     reflection notes that a stable island position was never established.
   - Editorial use: convert live narration into four columns: prior expectation,
     newly visible evidence, resulting action, and later outcome. The gap
     between the confident title and the complicated match is itself a reminder
     to review the timeline, not the headline.
   - Limitation: this is one live-commentary match. The title does not prove
     strategic perfection, and captions are not precise enough to source
     mechanics.

2. **Enzo Plays — “This is an Endgame To Remember | OpenFront.io”**
   - URL: `https://www.youtube.com/watch?v=hHl0p77wZZs`
   - Published: 2026-09-14; duration: 30:59.
   - Caption observations: from 00:00–02:00, the creator records a 65-player
     Greece lobby, spawn context, low local density, 10% pushes, and an
     annexation plan. From 02:00–06:00, he revisits whether to attack, ally, or
     invest in cities and ports. From 06:00–10:00, alliances, betrayal, cities,
     and factories alter the route. From 10:00–16:00, defense, nuclear
     deterrence, and expiring alliances reveal a weak troop position. From
     18:00–24:00, waiting, MIRV cost, attack windows, and alliances constrain
     each other. In the last six minutes, another player becomes the main
     threat; the creator acknowledges over-investing in a push and tries to
     reorganize third parties.
   - Editorial use: this supplies a temporal example of “why it seemed
     reasonable then.” A replay worksheet should preserve the player's original
     hypothesis before hindsight replaces it.
   - Limitation: player names, percentages, and unit references in automatic
     captions may be wrong. Any gameplay statement must be checked against the
     official v0.34.1 tag.

3. **Enzo Plays — “This May Be One of the Strongest Tactics in OpenFront.io”**
   - URL: `https://www.youtube.com/watch?v=YADXdGgmHHc`
   - Published: 2026-08-04; duration: 15:20.
   - Caption observations: during 00:00–02:00, the creator describes a safe
     spawn on a 120-player Box lobby, then pivots at the last moment in pursuit
     of annexation. During 02:00–06:00 he weighs alliance value, border
     liability, factory investment, attack speed, and whether troops belong in
     an attack or retained growth. After a successful bomb split around 06:00,
     he immediately reassesses the newly harsh position. From 08:00–12:00 he
     saves Gold, avoids optional conflict, and watches for MIRV danger. Near the
     end he attributes part of the result to an opponent's overcommitment.
   - Editorial use: use this match to teach the distinction between a repeatable
     decision and an outcome enabled by opponent error. The review question is
     not “did the tactic win?” but “which input signal would tell us to try it
     again, and which signal would invalidate it?”
   - Limitation: this is a single match from an earlier build. It supports the
     review method, not current-version rules or universal strategic strength.

Valid YouTube count: **3**. All met the caption-inspection gate; uncaptioned
videos and title-only search results were excluded.

## OpenFront official primary sources

All current code and tests below use the immutable `v0.34.1` tag. The release
is final, not a draft or prerelease, and points to commit
`a33efb780c4daf7cfb703bb3e8c7ce5d3f014325`.

1. v0.34.1 release:
   `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.1`
2. v0.34.0 release, used to verify the inherited release notes:
   `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.0`
3. v0.33.13 release, establishing that shareable profiles and profile game
   history predate v34:
   `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.13`
4. v0.33.6 release, establishing that older-version replay support predates
   v34:
   `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.6`
5. Public profile API and paginated game history:
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/src/client/Api.ts`
6. Public profile and game schemas:
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/src/core/ApiSchemas.ts`
7. Profile modal, tabs, shared hash route, and history navigation:
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/src/client/PlayerProfileModal.ts`
8. Shareable profile URL construction:
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/src/client/utilities/PlayerProfileUrl.ts`
9. Game-history cards, filtering, pagination, and actions:
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/src/client/components/baseComponents/stats/PlayerGameHistoryView.ts`
10. Canonical game path construction:
    `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/src/client/ClientEnv.ts`
11. Per-game summary and ranking view:
    `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/src/client/components/baseComponents/stats/GameInfoView.ts`
12. Ranking categories:
    `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/src/client/components/baseComponents/ranking/GameInfoRanking.ts`
13. Replay-capable player panel behavior:
    `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/src/client/hud/layers/PlayerPanel.ts`
14. Replay spectator state:
    `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/src/client/view/GameView.ts`
15. Spectator right-click path to the read-only panel:
    `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/src/client/hud/layers/MainRadialMenu.ts`
16. Canonical versioned replay host construction:
    `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/src/client/VersionedReplay.ts`
17. Archived-game lookup, build mismatch handling, and replay-shell probe:
    `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/src/client/JoinLobbyModal.ts`
18. Versioned replay shell entry and URL preservation:
    `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/src/client/Main.ts`
19. Versioned replay URL and hostname-loop tests:
    `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/tests/VersionedReplay.test.ts`
20. Games → Stats → back navigation, caching, scroll restoration, hash routing,
    and filter reset tests:
    `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/tests/client/ProfileGameStatsNavigation.test.ts`
21. Public-ID profile, copyable URL, and missing-profile tests:
    `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/tests/client/PlayerProfileModal.test.ts`
22. Game summary, date, ranking controls, retry, and stale-response tests:
    `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.1/tests/client/GameInfoView.test.ts`
23. Player panel replay feature commit:
    `https://github.com/openfrontio/OpenFrontIO/commit/fc4d145fdd0e90db004bef3a3a0f654d534e73b5`
24. Versioned replay shell feature commit and infrastructure boundary:
    `https://github.com/openfrontio/OpenFrontIO/commit/228143e32a99787cdaaae271d603789af4de7662`

Official primary-source count: **24 unique URLs**. This is provenance, not 24
independent confirmations of every claim. The release establishes the
version-level product promise; tagged implementation and tests establish the
specific behavior described below.

### Version boundary

The guide should be versioned to v0.34.1 because that is the current formal
release and its release text explicitly combines public-profile policy, game
link improvements, and replay panel availability. It must not claim that all
parts first shipped in v34. The v0.33.13 release already documented a shareable
profile modal, profile links, and game history on profiles. The v0.33.6 release
already documented the ability to replay games from older versions.

The v34-specific editorial opportunity is the now-coherent review workflow:
v0.34.0-beta1 and later release text calls out a game-link button on history
cards and the player information panel in replays; v0.34.1 retains those
features and states that profiles are public. Versioned replay is supporting
infrastructure, not a new v0.34.1 invention.

## Verified v0.34.1 product facts

| Review step | Verified capability | Source boundary |
|---|---|---|
| Find a player | The release states that all profiles are public, anyone can review player games, and deleting an account hides all of its games. | v0.34.1 release |
| Open history | The client exposes public/no-auth profile and games requests. Games use `filter`, `type`, and an opaque `cursor`; the response has `results` and `nextCursor`. | `Api.ts`; `ApiSchemas.ts` |
| Share a profile | The profile uses a `#modal=profile&publicID=<id>` hash route, has Stats, Games, and Clans tabs, and can copy a complete profile URL. | `PlayerProfileModal.ts`; `PlayerProfileUrl.ts`; tests |
| Scan a match | A history card exposes map, date, result, clan tag, username, game type, player count, duration, and actions for Stats, copying the game link, and Watch Replay. | `PlayerGameHistoryView.ts` |
| Preserve the match | The copied link is the current origin plus `ClientEnv.gamePath(gameId)`: normally `/w<n>/game/<id>` when a worker is known or `/game/<id>` otherwise. It is deliberately not a commit-specific replay URL. | `PlayerGameHistoryView.ts`; `ClientEnv.ts` |
| Compare outcomes | The game view includes summary, map, start time, duration, player count, and rankings such as survival, conquests, Atoms, Hydros, MIRVs, Total Gold, Stolen Gold, Naval Trade, Train Trade, and Conquered Gold. | `GameInfoView.ts`; `GameInfoRanking.ts` |
| Inspect a moment | Replay state is spectator state. Right-clicking a player tile follows the player-panel path without opening the normal action radial, and the panel can render without a live `myPlayer`. | `GameView.ts`; `MainRadialMenu.ts`; `PlayerPanel.ts` |
| Read player state | The replay panel exposes identity, resources, stats, alliances, betrayal count, and trading status for the selected player. Ordinary server-intent actions are omitted from the spectator action branch. | `PlayerPanel.ts`; commit `fc4d145…` |
| Open an older build | An archived record includes `gitCommit`. On mismatch, the client probes a versioned replay shell and navigates only if the HEAD response is successful HTML; otherwise it retains `version_mismatch`. | `JoinLobbyModal.ts` |
| Build the shell URL | The canonical shell host is `https://replay.<audience>/<gameId>`. Localhost or an empty audience yields no URL, and replay-host detection prevents redirect loops. | `VersionedReplay.ts`; test |

The history card's copy action and versioned replay are related but distinct.
The card copies a normal game route. Only after that route loads an archived
record and detects a build mismatch can `JoinLobbyModal` probe and redirect to
the matching replay shell. The guide should teach “copy the game link,” not
tell readers to construct a `replay.` hostname themselves.

Important boundary: “versioned replay shell” means the client can route a
recorded game to a shell matching its recorded build when that shell is
available. It does **not** justify a promise that every game from every version
will always remain replayable. The feature commit says builds from before shell
archiving can return 404, and live delivery also depends on infrastructure
outside this client repository.

The release's public-profile and account-deletion statements are official
product claims. Client code confirms unauthenticated requests and the visible
schema, but does not prove backend deletion timing, retention policy, or field
redaction. The opaque history cursor also does not establish a page size or a
guaranteed history horizon.

## Recommended decision framework: TRACE

`TRACE` is an editorial review framework, not an OpenFront mechanic or official
term. It gives the eventual guide a memorable structure without pretending the
game calculates causality for the player.

### T — Target the moment

Open the match from Games history and preserve its game link. Before watching,
record the card and Stats context: map, mode, date, duration, player count,
result, final rank, and any one ranking that motivated the review. Write the
question narrowly: “Why did my reserve collapse during the first western
push?” is reviewable; “Why did I lose?” is not.

Choose three to five waypoints. Useful defaults are spawn commitment, first
expansion contest, first structure investment, first alliance or betrayal,
first nuclear commitment, first major territory loss, and the moment the final
coalition became unavoidable. A long match does not become more informative by
watching every second at the same attention level.

### R — Reconstruct the state

At each waypoint, pause and write what the player could have known then. Record
visible borders, active conflicts, alliances, incoming threats, recent
construction, and the players who could intervene. Then separately write what
the full replay reveals. This prevents hindsight from turning hidden or ignored
information into information the player supposedly possessed.

Use a compact sequence: **state → decision → expected response → observed
response → first invalidating signal**. The invalidating signal matters most.
It identifies when a reasonable plan became unreasonable and whether the player
had time to change it.

### A — Audit the panel and statistics

Use the player information panel at the same replay moment for the focal player
and, where useful, the relevant opponent. Capture only the identity, resources,
stats, alliances, betrayal count, and trading state actually visible in that
replay. Do not backfill a value from memory or assume a field exists because a
video narrator mentioned it.

Use per-game rankings as cross-checks, not verdicts. High Total Gold does not
prove good spending, many conquests do not prove a push was correctly timed,
and a strong trade total does not identify which transfer changed the position.
Rankings tell the reviewer where to inspect the timeline.

### C — Classify the cause

Give each proposed cause one evidence label:

- **Observed:** directly visible in the replay, panel, or game statistics.
- **Inferred:** consistent with the sequence but not directly exposed.
- **Unknown:** plausible but not distinguishable from available evidence.

Then classify the decision failure: rules misunderstanding, measurement error,
timing error, map/mode constraint, opponent adaptation, coordination outside the
reviewer's control, or luck. More than one class may apply, but identify the
earliest controllable break. “Bad luck” is not useful when a visible warning
was ignored; “poor play” is not fair when the claimed information was
unavailable.

### E — Edit one next-match change

Turn the earliest controllable break into one experiment:

> When **signal**, I will **one action**, until **stop condition**. I will judge
> it by **one observable outcome** in the next replay.

Keep the action small enough to attribute. Changing spawn selection, attack
size, alliance policy, structure order, reserve policy, and trade partners in
one match produces another story, not a test. Review the next game with the same
waypoints and preserve counterexamples: a good decision can lose, and a poor
decision can be rescued by opponent mistakes.

## Recommended review scenarios

**Overcommitment review.** Start shortly before a major push. Compare retained
resources, open borders, alliance expiry, and the target's visible commitments.
Pause when another player becomes able to intervene. The key question is not
whether the push gained land, but when its original risk assumptions stopped
being true. End with a trigger and stop condition for a smaller next-match
commitment.

**Comeback attribution.** Mark the player's recovery actions, then mark enabling
events produced by others: rival wars, third-party trade, ignored expansion, or
opponent overinvestment. Preserve both columns. The lesson may be a repeatable
survival choice, but it may also be that the outcome required a lobby condition
the player cannot reproduce.

**Suspicious-coordination review.** Use the shareable link and timeline to
record only observable events: who was positioned where, what resources moved,
when transfers repeated, and which alternative explanations remain. The replay
is evidence for a factual sequence, not automatic proof of cheating or intent.
Do not turn this scenario into a reporting tutorial; current source proves the
spectator information path, while moderation/report paths have separate logic.

Suggested blank worksheet:

| Time / event | What I knew then | Replay-visible state | Decision and expectation | Actual result | Evidence label | Next-match change |
|---|---|---|---|---|---|---|
| Spawn / first commitment |  |  |  |  |  |  |
| First contested expansion |  |  |  |  |  |  |
| First alliance or betrayal |  |  |  |  |  |  |
| First major overcommitment |  |  |  |  |  |  |
| Decisive endgame shift |  |  |  |  |  |  |

## Claims the eventual guide must not make

- Do not say every historical replay is permanently available. The client
  probes for a versioned shell and retains a mismatch state when it fails.
- Do not describe proposed video/GIF export or a clean export spectator view as
  shipped functionality.
- Do not treat automatic-caption numbers, player names, or unit names as
  primary facts.
- Do not infer cheating, deliberate feeding, or private coordination solely
  from unusual replay behavior.
- Do not turn one comeback or one creator's title into an optimal strategy,
  build order, attack percentage, or win-rate claim.
- Do not claim every action or every moderation path disappears in replay. The
  tagged code proves a spectator player-panel path and omission of the ordinary
  action radial/server-intent actions; report/moderation logic remains separate.
- Do not confuse final rankings with causal explanations. Use them to select a
  timeline segment for inspection.
- Do not present TRACE as an official OpenFront term or mechanic.

## Access and verification notes

- Reddit's `.json` pages returned a network security page. Rendered pages
  remained accessible, and exact dates were recovered from their
  `shreddit-post` / `time` data. No inaccessible JSON content was counted.
- The available local OpenFrontIO clone was on a v0.33 development point and
  did not contain the v0.34.1 tag. Official facts were checked against GitHub's
  release data and immutable `v0.34.1` source URLs instead of the stale clone.
- One repository search included a nonexistent `test/` directory; the command
  reported that path error, and the search was rerun against confirmed paths.
- One PowerShell line-number helper reused the reserved automatic variable
  `$Matches`, so its accumulator failed. Source inspection was repeated without
  that variable.
- One combined browser/PowerShell script did not execute because PowerShell
  backticks collided with JavaScript template-string quoting. Browser pages and
  caption files were then inspected in separate calls.
- The tagged repository has no dedicated replay-mode test for the player panel.
  Its behavior is supported by the feature commit and current tagged branches,
  while existing player-panel action tests use `isReplay: () => false`.

These failures affected tooling paths, not the source conclusion. No community
snippet was promoted to a verified rule, and no v0.34.1 fact came from the
outdated local clone.

## Planning recommendation

Advance `/guides/replay-review/` as a v0.34.1 guide. Its primary promise should
be: **turn a completed match into one falsifiable next-match adjustment**. Lead
with the profile → Games → Stats/link → Replay path, but spend most of the page
on TRACE, evidence labels, worked decision points, and the one-change rule.

The writer should keep screenshots and UI labels version-bound to v0.34.1 and
recheck them if the profile or replay interface changes. A future article may
link from `first-match`, `threat-assessment`, and recovery content, but those
pages retain ownership of their live-play decisions. This source pack
establishes maturity and scope; it does not authorize unsupported mechanics or
a universal strategy derived from a single replay.
