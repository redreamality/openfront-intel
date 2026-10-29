# Community source pack — Korea map guide (`korea-map`)

- Slug: `korea-map`
- Topic: Korea map strategy — the vertical two-power peninsula, the detached Japanese
  archipelago, and the single spawn line that decides which axis you commit to.
- Research date: 2026-10-29
- Guide intent: choose, before the countdown ends, which side of Korea's split to commit
  to, and how to play the three axes (South coast, North Korea, the Japanese islands) so
  a wrong pick is recoverable instead of fatal.

## Official primary sources (authoritative for facts)

1. Official upstream map manifest (primary, machine-readable, version-locked to the
   commit this site builds against). Fetched and parsed locally; every nation name, flag,
   coordinate, map dimension, and team spawn rectangle below is taken directly from this
   file.
   - URL: https://raw.githubusercontent.com/openfrontio/OpenFrontIO/f33d0049076b2931b73d06ac79d076799e54e8ac/resources/maps/korea/manifest.json
   - Facts extracted: `name: Korea`, `id: Korea`, `translation_key: map.korea`,
     `categories: [asia, countries]`, `themes: [asia]`; `team_frequency: 10` with
     `special_team_count: 2`; `multiplayer_frequency: 5`; `map: { width: 1088, height: 2188,
     num_land_tiles: 782048 }`; 32 nations with `coordinates`, `flag`, `name`.
2. Current formal release cursor for version boundary (the newest non-draft, non-prerelease
   GitHub Release, verified via `gh api repos/openfrontio/OpenFrontIO/releases?per_page=8`
   filtered to `draft=false` and `prerelease=false`).
   - URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.6
   - v0.35.6 is a UI/stability maintenance release; Korea is a legacy regional map that
     predates the v0.35 map batch, so its shape is stable under the v0.35 cursor.
3. Upstream repository / PR references that define the v0.35 national-AI and water-
   annexation changes the guide's mode section depends on (cited in the v35 community
   thread below as the source of those changes).
   - URL: https://github.com/openfrontio/OpenFrontIO/pull/5685
   - URL: https://github.com/openfrontio/OpenFrontIO/pull/5741

## Reddit discussions (community signal)

Note on access: at research time the Reddit JSON API, old.reddit HTML, and every tested
mirror/reader returned CAPTCHA or HTTP 403/429 for this datacenter IP, so the threads
below were captured via search-index snippets rather than opened in-browser. Each is a
real, existing r/Openfront thread; the snippet content is what informed the player-question
synthesis. This limitation is recorded so the pack is honest about provenance.

1. "Really bad decisions" — r/Openfront.
   - URL: https://www.reddit.com/r/Openfront/comments/1qyr4np/really_bad_decisions
   - Player question: how to read a losing neighbour and where to expand on a wide
     regional map.
   - Observation: spawn advice clusters on "spawn near water and mountains" and on
     avoiding landlocked corners on the Asia map (Caucasus / south Russia trap). Maps the
     Korea concern of a waterless or landlocked spawn and the value of the coastal lane.
   - Limitation: snippet-only; the Asia-specific advice references a different map, so it
     is used as a transfer of the *landlocked-spawn* principle, not as Korea fact.
2. "Simple guide on how to win" — r/Openfront.
   - URL: https://www.reddit.com/r/Openfront/comments/1vjvm8p/simple_guide_on_how_to_win
   - Player question: the early/mid transition on a split board.
   - Observation: send two 1%-boat probes across the map for a distant foothold; only
     hit nations after they drop below ~40k; prefer nations with a city near your border;
     ally with the hard-to-kill player. Maps the Korea concern of the detached archipelago
     and of choosing a defensible neighbour to bank on.
   - Limitation: snippet-only; general to all maps, applied here to the three axes.
3. "Which map do you love the most, and which one do you absolutely hate?" — r/Openfront.
   - URL: https://www.reddit.com/r/Openfront/comments/1meuhz0/which_map_do_you_love_the_most_and_which_one_do
   - Player question: which maps are worth queuing and why.
   - Observation: players split on island-heavy versus continental maps; "island heavy
     maps can be tedious" for some, while others queue them for fast aggressive games.
     Directly relevant to whether Korea's detached Japan islands are a feature or a tax.
   - Limitation: opinion poll, not strategy; used as demand signal, not fact.
4. "My best strategy in openfront.io" — r/Openfront.
   - URL: https://www.reddit.com/r/Openfront/comments/1qt4cz8/my_best_strategy_in_openfrontio
   - Player question: a minimal repeatable build order.
   - Observation: ramp the troop slider 20%→46–50%, then take bots/nations; build a City if
     landlocked, a Port if coastal; "not on an island tho that's stupid" for Silos. Maps the
     Korea concern of coastal Port access versus the island-only economy.
   - Limitation: snippet-only; build order is version-generic.
5. "Any tips for beginners?" — r/Openfront.
   - URL: https://www.reddit.com/r/Openfront/comments/1sewfo1/any_tips_for_beginners
   - Player question: common beginner mistakes on public boards.
   - Observation: never send your max army (regen is population-based); do not spawn right
     next to a rival; Ports out-earn trains early; Defense Posts / forts are the comeback
     tool. Maps the Korea concern of the narrow-peninsula spacing and the defence toolset.
   - Limitation: snippet-only; cross-map advice.
6. "Open Front: Ultimate Beginner's Guide" — r/Openfront pinned.
   - URL: https://www.reddit.com/r/Openfront/best
   - Player question: ideal spawn point and pacing.
   - Observation: green terrain is cheap to take; want water access and not-too-edge
     placement; pace expansion at ~42% of max troop cap. Maps the Korea concern of
     coastal spawn selection on a two-coast peninsula.
   - Limitation: pinned long-form; general.
7. "Possible Changes Coming to v35" — r/Openfront.
   - URL: https://www.reddit.com/r/Openfront/comments/1x4j6cn/possible_changes_coming_to_v35
   - Player question: what v0.35 changed that affects map play.
   - Observation: smarter nations (retaliation, beachhead follow-up, better nuclear
     targeting), and nuclear territory annexation of severed pieces. This is the source of
     the mode-section claims about v0.35 national AI and severed-territory capture; cited
     upstream PRs 5685/5741/5788/5795.
   - Limitation: pre-release changelog thread; verified against the PRs, not treated as the
     authority on Korea's geometry.

## YouTube videos (community signal, opened and analyzed)

All three were fetched as full watch-page HTML and analyzed for title, channel, duration,
publish date, description, and chapter timestamps.

1. "OpenFront.io v31 Tutorial" — Enzo Plays.
   - URL: https://www.youtube.com/watch?v=IeR36481zsI
   - Duration 1152 s (~19 min); published 2026-04-25.
   - Relevance: current-era full tutorial covering spawn, early game, infrastructure,
     warships, and betrayal — the systems the Korea guide's mode section assumes the
     reader knows.
2. "OpenFront.io V25 Tutorial" — Enzo Plays.
   - URL: https://www.youtube.com/watch?v=Wci8kBDxR80
   - Duration 1451 s (~24 min); published 2025-09-05. Chapters: Spawn, Early Game and
     Troops, Early Infrastructure and Alliances, Warships, Menus, Betrayal, Push Levels,
     Defense Posts.
   - Relevance: chapter list confirms the Defence-Post / push / betrayal toolset the guide
     references as the comeback mechanic on a split peninsula.
3. "How to Play Openfront.io For Beginners (Tutorial)" — Enzo Plays.
   - URL: https://www.youtube.com/watch?v=fKCWgr5_nwo
   - Duration 933 s (~15.5 min); published 2025-06-05.
   - Relevance: baseline for the "reader already knows the basics" scope assumption the
     guide states up front.

## Synthesis: the player question this guide answers

Across Reddit and YouTube the recurring Korea-relevant questions are: (a) on a long narrow
peninsula with two opposing coasts, which coast do I commit to and why; (b) the three
Japanese islands are on the same side as the South coast and far from the North — do I
play them or ignore them; (c) in the 2-team mode the spawn line splits the board so that
South and the islands are one team and North Korea is the other — how do I read my team's
shape; (d) how do I keep a wrong pick recoverable when the peninsula is so narrow that a
mistake on one front is a mistake on every front. The guide's framework answers (a) by the
axis-commit rule, (b) by the island-economy rule, (c) by the team-shape read, and (d) by
the named-anchor + two-neighbour rule that keeps the anchor defensible on both flanks.

## Access and method note

- Opened and analyzed: 3 YouTube videos (full watch-page HTML, metadata + chapters).
- Reddit: 7 threads captured via search-index snippets; direct open blocked (datacenter
  IP CAPTCHA/403/429 across all tested paths). Documented as a limitation.
- Every game rule, number, and version boundary in the guide is sourced to the official
  manifest, the formal release, or the cited upstream PRs — community posts informed only
  the question selection and the failure-mode framing.
