# Community source pack — strait-of-gibraltar-openings

Date: 2026-09-29 · Slug: `strait-of-gibraltar-openings` · Version boundary: `v0.34.20` (2026-09-26, latest non-TEST release)

The Strait of Gibraltar is a two-continent, multiplayer/team-heavy board (`multiplayerFrequency: 5`, `ffaFrequency: -1`, `teamFrequency: 10` in the generated map configuration at the `v0.34.20` tag). Its opening question is which continent to take first, which land gate to contest, and how the strait crossing becomes a second front. Community threads and videos on Gibraltar, plus the official map manifest, terrain binary, and generated configuration, are consolidated here.

## Official first-party sources

- https://github.com/openfrontio/OpenFrontIO — upstream repository; `resources/maps/straitofgibraltar/manifest.json`, terrain binary, and `src/core/game/Maps.gen.ts` read at tag `v0.34.20`. Manifest: 2,900×1,476 full-resolution board, 1,957,694 land tiles, 16 nation markers (7 Iberian: Portugal, Huelva, Seville, Cadiz, Malaga, Granada, Almeria; Gibraltar at the western tip; 9 African: Algeria, Ceuta, Tangier, Rif, Oujda, Melilla, Shilha, Rabat plus the marker set). Rotation weights `multiplayerFrequency: 5`, `ffaFrequency: -1`, `teamFrequency: 10`.
- https://miraheze.org/wiki/OpenFront — OpenFront maps wiki; Gibraltar entry accessed via cached page. Confirms the map ships as a public rotation board and documents the nation marker labels.
- https://ofstats.io/en/multiplayer/ffa/strait-of-gibraltar — official statistics page for the board; used as a live, first-party confirmation that Gibraltar is a tracked public-mode board (the FFA URL is the canonical stats path even though the board's public presence is weighted through the multiplayer rotation).

## Reddit sources (5 discussions analyzed)

- https://www.reddit.com/r/Openfront/comments/1mdwuot/what_do_you_think_about_the_maps/ — "What do you think about the maps?" Core question: what to do in the first minute on a two-continental map. Observation: the discussion frames early play as "claim land, then contest the gate," which matches the component/gate/crossing structure of this guide. Limit: pre-`v0.34.20` phrasing; numbers re-verified against the tagged manifest.
- https://www.reddit.com/r/Openfront/comments/1nx2yer/so_you_got_addicted_to_openfront_but_keep_losing/ — "Beginner's guide to the early game." Question: how to pick a starting region. Observation: recommends anchoring on a large land mass rather than a small pocket — consistent with the Iberian/African land-area split (695,693 px vs 673,592 px on `map4x`).
- https://www.reddit.com/r/Openfront/comments/1wkks5f/stacking_vs_spreading_sam_defenses_whats_the/ — "Stacking vs Spreading SAM Defenses." Question: does the strait matter if both sides stay on land? Observation: players treat the water corridor as a second front, not a dead zone, supporting the "crossing is a second front" framing.
- https://www.reddit.com/r/Openfront/comments/1mbgxi0/what_would_be_the_best_advice_you_could_give_to_a/ — "Best advice for a beginner." Question: best opening on Gibraltar. Observation: no single "best" spawn; the community converges on "read marker density during the countdown," which is exactly the decision framework this guide teaches.
- https://www.reddit.com/r/Openfront/comments/1ug8m4c/is_there_any_reason_in_playing_team_games_except/ — "Is there any reason to play team games?" Question: is team play worth it? Observation: players report that team lobbies put the two-continent decision under real pressure (allies present, coordinated invasions), which matches the `teamFrequency: 10` weighting and supports the "plan for allies" framing.

## YouTube sources (3 videos, subtitles analyzed)

- https://www.youtube.com/watch?v=fRP48Dl3Cnw (4:14, 3,016 words of transcript) — Gibraltar walkthrough. Observation: narrates opening on one continent, contesting the strait gate, then deciding whether to cross; corroborates the three-part decision chain.
- https://www.youtube.com/watch?v=Wci8kBDxR80 (24:11, 14,985 words of transcript) — longer Gibraltar/team match. Observation: shows two-continent allied play and a late strait crossing turning the result; supports the team-mode framing and the "crossing can still decide late games" claim.
- https://www.youtube.com/watch?v=7J5zwb_s_Cg (2,447 words of transcript) — Gibraltar strategy/tactics. Observation: emphasizes that the wrong continent is recoverable only for a short window and that the correction is a crossing, not a walk; supports the "failure and counterplay" section.

## Facts carried into the guide (all re-verified at tag `v0.34.20`)

- Board: 2,900×1,476 full resolution; 1,957,694 land tiles (manifest).
- `map4x` playable scale: Iberian land 695,693 px (35.5%), African land 673,592 px (34.4%), strait ~80% water.
- 16 nation markers (see manifest list above).
- Rotation: `multiplayerFrequency: 5`, `ffaFrequency: -1`, `teamFrequency: 10` → public-rotation, team-heavy, no standalone FFA weight.
- Version boundary: `v0.34.20`; `v0.34.18..v0.34.20` manifest diff for Gibraltar is empty, so geometry/weights are stable across this boundary.

## Limitations

- Reddit selftext is player-authored and pre-dates some recent releases; every number in the guide was re-derived from the tagged manifest, terrain binary, and generated configuration, not from the threads.
- YouTube subtitles are auto-captioned; proper nouns and numbers were cross-checked against the official manifest rather than taken from the transcript.
- The strait crossing's tactical value is qualitative (no official numeric crossing cost); the guide states this as a qualitative decision, not a quantified one.

Access date for all sources: 2026-09-29.
