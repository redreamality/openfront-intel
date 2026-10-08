# Community source pack — AI Nation nuke targeting (2026-10-08)

Topic: Nations now aim nukes smarter — they skip a candidate spot when another player's nuke is already landing there, and they reject a target when the blast would be mostly wasted on water or fallout. Slug: `ai-nation-nuke-targeting`.

Access date: 2026-10-08.

## Official primary sources (authoritative)

- Upstream commit and diff: https://github.com/openfrontio/OpenFrontIO/commit/34a8fe72308fe2768ae4d3cb61c6733c1831c2bd (PR #5795, 2026-10-05, author FloPinguin — "Nations aim nukes smarter: no double nukes, no wasted blasts on water or fallout").
- Core engine source, main branch: `packages/engine/src/execution/nation/NationNukeBehavior.ts`; official test `tests/NationNukeTargeting.test.ts`.
- Blast magnitudes / speeds, v0.34.24 `Config.ts` `nukeMagnitudes` / `nukeSpeed`: Atom inner 12 outer 30; Hydrogen inner 80 outer 100; MIRVWarhead inner 12 outer 18; atom/hydrogen speed 10, MIRVWarhead speed 22.

## Reddit (player questions and observed pain)

- https://reddit.com/r/Openfront/comments/1n5q8d5/allies_nuking_allies/ — "Allies nuking allies." Players report losing games because a teammate's nuke landed at the shoreline or on a spot that destroyed a level-8 port and five cities. Observation: the old targeting could place a blast where a large share of the footprint was water or friendly land. Directly motivated by a wasted / mis-aimed blast; relevant to the new friendly-land filter and the coverage floor.
- https://reddit.com/r/Openfront/comments/1ohrzg0/i_can_consistently_beat_ai_level_impossible_am_i/ — "I can consistently beat AI level impossible." Player asks whether beating the Impossible AI means they are ready for human lobbies. Player notes keeping enough gold for one hydrogen as the deciding late-game tool, and that threatening a nuke deters attacks. Observation: high-difficulty Nations are already a serious nuclear opponent; making them aim smarter raises the bar further.
- https://reddit.com/r/Openfront/comments/1qt4cz8/my_best_strategy_in_openfrontio/ — "My best strategy in openfront.io." Players advise against stacking cities in one spot because a single atom bomb can wipe the stack, and keep 10–15 million in the bank to throw 5 million nukes. Observation: the community already teaches dispersal and banked nuke gold as the counter to concentrated nuclear targets — a tactic that becomes more important when Nations stop wasting shots.
- Backup threads: https://reddit.com/r/Openfront/comments/1nxnt16/no_nuke_gamemode/ , https://reddit.com/r/Openfront/comments/1lxxztm/nukes_arent_fun/ , https://reddit.com/r/Openfront/comments/1lop9pm/i_love_trademaxxing_but_sams_not_preventing/ .

## YouTube (videos and verifiable content)

- https://www.youtube.com/watch?v=yJB0jqrPi3I — OpenFront nuke strategy walkthrough (oEmbed-verified title/author/thumbnail; description is lazy-loaded and could not be fully captured).
- https://www.youtube.com/watch?v=d4WNUOQeFc8 — OpenFront defense configuration walkthrough (oEmbed-verified).
- https://www.youtube.com/watch?v=EdcdsayA_ac — OpenFront defense / SAM placement tutorial (oEmbed-verified).

Limitation: YouTube descriptions are lazy-loaded, so full descriptions and chapters were not captured; titles, authors and thumbnails are verifiable via oEmbed. This is the main limitation of the video sources.

## Research notes (English)

The upstream commit 34a8fe72308fe2768ae4d3cb61c6733c1831c2bd (2026-10-05, PR #5795, author FloPinguin) changes Nation nuclear targeting in NationNukeBehavior.ts. Four linked behaviors, all behind the same difficulty gate (applied when difficulty is not Easy, so they are active on Medium, Hard and Impossible): first, skip a candidate tile when another player's nuke is already landing near it (generalized from the old teammate-only / team-mode check to any player's nuke, now including MIRVWarhead units); second, compute the blast coverage as the share of the sampled blast disk that is enemy land, where water, fallout and unowned land count as nothing and the inner disk (full damage) is weighted double; third, reject any candidate below the weapon minimum (Atom 0.25, Hydrogen 0.40); fourth, filter the final winning tile if its blast would touch the Nation's own land, a teammate's land or an ally's land, even an AFK ally. A separate coverage bonus of 50000 times the coverage fraction is added to the tile score, so coverage is a major scoring term and higher-coverage targets are preferred. The blast magnitudes are Atom inner 12 outer 30, Hydrogen inner 80 outer 100, MIRVWarhead inner 12 outer 18; atom and hydrogen travel at speed 10 and the MIRVWarhead at speed 22.

Release boundary: this commit is present on upstream main only. It is not in the v0.34.24, v0.34.25 or v0.34.26 tags and not in the live site pinned data build 4e837520 (2026-10-01). So it is an unreleased behavior change as of 2026-10-08 and the guide is marked not-released; the analysis is verified against main and must be re-verified once the behavior ships in a release tag.

The player-facing consequence is that Nations no longer waste nuclear strikes on water or on an already-blasted spot, and they will not nuke a spot whose blast would mostly hit friendly land. The community pain this targets is visible in the "Allies nuking allies" thread (a wasted blast at the shoreline that destroys friendly ports and cities) and in the strategy threads that already teach dispersal and banked nuke gold. For the guide the decision points are: the coverage gate makes water buffers and fallout a real, quantified defensive asset (the hydrogen's 40 percent floor is a much stricter denial target than the atom's 25 percent); the anti-double-nuke generalization means a Nation will not stack a second bomb on a tile already being hit, so a dense single target is no longer double-saturated by the same Nation; the friendly-land filter removes accidental friendly-fire grief; and because the coverage number is recomputed every decision tick, the defense is a moving target rather than a static line.
