# Warship veterancy and repair: community source pack

Research date: 2026-08-26 (Asia/Vladivostok)

## Research boundary and method

This pack identifies a player question that can change a naval decision: what the yellow veterancy bar means, which actions advance it, what a level-up actually changes, and when a damaged Warship should retreat to a Port instead of continuing a patrol. Reddit and YouTube are used for player language, confusion, and match situations only. They are not rule evidence. Every value, threshold, priority, and version statement in the proposed guide is checked against the official `v0.33.11` Release, its immutable source tag, or tagged tests. The local OpenFrontIO checkout was older than the target tag, so the official tag URLs below are the authoritative boundary.

Six Reddit discussions and five YouTube watch pages were opened individually. Three Reddit threads focus directly on Warship experience and repair, while the other opened threads are retained as adjacent naval context. Three long-form YouTube videos had usable auto-generated English subtitles and were read around the relevant timestamps. Videos are old tutorials or single-match demonstrations; their timing and recommendations are explicitly treated as version-bound observations rather than current mechanics. Search-result snippets, Shorts titles, and a page with no transcript were excluded from the effective count.

Effective community evidence for this topic: **3 Reddit discussions and 3 YouTube videos with verified subtitle text**. The source pack contains more URLs than the minimum so the selection and exclusions remain auditable.

## Reddit source-by-source notes

### 1. v33 Warship update

- URL: https://www.reddit.com/r/Openfront/comments/1viab9w/v33_warship_update/
- Title: “v33 Warship update”
- Relative date at access: about 18 days old
- Accessed: 2026-08-26
- Player question: The author asks how the yellow experience bar is earned. They list elapsed time, damage dealt, trade captures, and other possible triggers, showing that the UI communicates progress without making the inputs obvious.
- Usable observation: Players want a reproducible explanation of the bar, not a generic “use ships more” tip. The visible uncertainty supports a guide that names the three distinct progress paths and explains what happens when they are mixed.
- Limitation: The post contains a question and community speculation, not a verified formula. It cannot establish the number of transports, captures, health bonus, or reset behavior.

### 2. Warships in v33

- URL: https://www.reddit.com/r/Openfront/comments/1vggqpe/warships_in_v33/
- Title: “Warships in v33”
- Relative date at access: about 20 days old
- Accessed: 2026-08-26
- Player question: The discussion asks what level 3 veterancy means in practice and connects experience to Warship kills, Transport Ship kills, Trade Ship captures, shell damage, and Port repair. Comments specifically request an official mechanics document because the wiki is difficult to update.
- Usable observation: The recurring decision is not only “how do I level?” but “is this veteran ship worth preserving?” Players compare the value of a kill, the progress from civilian targets, and the safety of docking. A useful answer must separate experience from healing: a level-up raises maximum health, but it does not refill current health.
- Limitation: Several numbers in the thread are player recollections and may describe a pre-release build. They are leads for official verification only.

### 3. Transports

- URL: https://www.reddit.com/r/Openfront/comments/1vjb9h4/transports/
- Title: “Transports”
- Relative date at access: about 17 days old
- Accessed: 2026-08-26
- Player question: The author can launch a Transport Ship early, then later cannot find the button or make the ship move. Replies point to hovering the destination and pressing `B`, or using a right-click command.
- Usable observation: Warship value is tied to the transport window. A veteran ship that patrols the correct water component can deny a landing or escort a route; a ship that is pulled away to chase a low-value target may miss the only transport timing. The control confusion also supports linking the guide to the hotkeys and naval-control pages.
- Limitation: The reply describes input discovery, not Warship veterancy or a guaranteed command on every client. The guide will link to the hotkey reference rather than claim that one input is universal across custom bindings.

### Adjacent naval context opened but not counted as the core trio

- https://www.reddit.com/r/Openfront/comments/1vvgl86/sam_ships_for_breaking_island_stalemates/ describes a recent island stalemate in which SAM coverage makes transports hard to land. It reinforces the need to value a Warship as a timing and denial tool, but it overlaps the already delivered Overtime endgame guide and does not answer veterancy.
- https://www.reddit.com/r/Openfront/comments/1tvqvo1/when_you_have_to_resort_to_hiding_transport_ships/ is a roughly three-month-old meme-like account of a crowded four-island match and a very large number of destroyed Warships. It supplies attrition language, not mechanics evidence.
- https://www.reddit.com/r/Openfront/comments/1vwmgv2/embargoes_are_one_of_the_best_ways_to_end/ shows how embargoes can break an economic stalemate. It was rejected as the main topic because `diplomacy-betrayal` already owns that intent.

## YouTube source-by-source notes

### 1. OpenFront.io V28 Tutorial & Guide

- URL: https://www.youtube.com/watch?v=olDiv-q8KMo
- Title: “OpenFront.io V28 Tutorial & Guide”
- Relative date at access: about seven months old
- Accessed: 2026-08-26; auto-generated English subtitles downloaded and read
- Usable observations: Around 10:53–11:58 the presenter explains that Warships intercept Transport Ships and can capture Trade Ships. Around 6:51–7:37 the video frames Ports as a trade and naval-control investment, and around 8:24–8:35 it discusses the escalating Port/Factory cost. These scenes give natural player language for why a Warship may protect an income route rather than seek a random chase.
- Limitation: It is a V28 tutorial. It does not establish v33.11 veterancy thresholds, the current passive-heal range, or the modern retreat implementation. Its strategic framing is retained only as context.

### 2. The ULTIMATE OpenFront.io Tutorial and Strategy Guide!

- URL: https://www.youtube.com/watch?v=EdcdsayA_ac
- Title: “The ULTIMATE OpenFront.io Tutorial and Strategy Guide!”
- Relative date at access: about one year old
- Accessed: 2026-08-26; auto-generated English subtitles downloaded and read
- Usable observations: Around 2:13–2:37 the presenter describes Warships as tools for trade capture and naval combat, while warning that upgrading naval forces can consume a very large Gold commitment. Around 6:58–7:12 the explanation covers water access, and around 11:29–11:37 it advises against expanding a fleet without a clear purpose. That language maps directly to the proposed “keep, repair, or redeploy” decision framework.
- Limitation: The video predates v33.11 and uses subjective cost and fleet advice. No spoken number is imported as a current rule.

### 3. Openfront guide - How to play optimally, attack, defend, and support from backline | Version 24

- URL: https://www.youtube.com/watch?v=xG0LCTYgb6o
- Title: “Openfront guide - How to play optimally, attack, defend, and support from backline | Version 24”
- Relative date at access: about one year old; explicitly labelled Version 24
- Accessed: 2026-08-26; auto-generated English subtitles downloaded and read
- Usable observations: Around 12:04–12:09 the presenter describes Transport Ships and Warships as opposing pieces. Around 16:28–16:39 the video describes using a short opening to cross a naval screen. The practical idea is still useful: a ship's value depends on the next transport or crossing window, so preserving health can be more important than chasing a marginal target.
- Limitation: Version 24 is historical context. Its recommended timings, UI, and combat assumptions cannot be used for a v33.11 claim.

### Additional opened videos and exclusions

- https://www.youtube.com/watch?v=CqLgMnP1jqU (“This Strategy WINS Endgames | OpenFront.io”, about seven months old) was opened and its subtitles read. It is useful stalemate context but overlaps Overtime and does not isolate veterancy.
- https://www.youtube.com/watch?v=j-YsQz38AXg (“This Endgame Strategy Is Devastating | OpenFront.io”, 2026-07-13) was opened and its subtitles read. It demonstrates transport landings, Warship positioning, and Port pressure in one match, but it does not provide a reproducible rule.
- A search-result page and a Shorts result were not counted. A watch page with no available transcript was also excluded.

## Official rule verification and version boundary

The proposed guide uses these first-party URLs for v0.33.11:

- Release: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.11
- Veterancy health math: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/core/game/Veterancy.ts
- Warship behavior, targeting, repair retreat, and docking: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/core/execution/WarshipExecution.ts
- Port behavior and level-based healing pool: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/core/execution/PortExecution.ts
- Tagged experience and health tests: https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/tests/WarshipVeterancy.test.ts

The tagged tests establish the decision-relevant facts to explain in player language: a Warship kill grants a full level; Transport kills and Trade Ship captures share one progress track; the default thresholds are ten Transport kills or twenty-five Trade captures for a level; mixed progress such as five transports plus thirteen captures reaches a level; a Warship kill clears unfinished civilian-target progress; surplus Trade captures can carry into the next level; and increasing maximum health does not instantly heal current health. `WarshipExecution.ts` establishes that passive healing occurs near a friendly Port, docked ships share an active Port healing pool by Port level and ship count, retreat uses a percentage of veterancy-adjusted maximum health, and target priority is Transport Ship, enemy Warship, then Trade Ship. Exact percentage and range constants must be quoted only after reading the tagged configuration used by those methods.

## Topic decision and completion definition

The selected route is `/guides/warship-veterancy/` because its intent is unique: players need to interpret a Warship's progression and make a keep-or-repair decision. It does not duplicate `/strategies/team-naval-control/`, which assigns team naval roles and gives broad fleet priorities, nor `/guides/port-vs-factory/`, which compares economy networks. The finished guide must let a player answer four questions without reopening source code: which action is advancing the bar, whether a kill will reset mixed civilian progress, what a level-up changes immediately, and whether the nearest Port can repair the ship in time for the next transport window. Scenarios will use explicit assumptions, include a damaged veteran and a full-health fresh ship, explain opponent counterplay, and link to naval control, Port economics, hotkeys, and first-match reading paths. The source pack itself contains 3 valid Reddit URLs, 3 valid YouTube URLs, 5 official OpenFront URLs, and more than 600 English research words.
