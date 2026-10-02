# Terrain systems — community & official source pack (2026-10-02)

Slug: `terrain-systems`. Accessed 2026-10-02. Facts verified against upstream
`openfrontio/OpenFrontIO` at tag `v0.34.22` (commit `4e837520`, released 2026-10-01).

## Research question

Players repeatedly ask, in the exact same shape: "why does the same army win one
border and lose the next?" The gap is that terrain is not a visual detail. In
OpenFront a tile's magnitude becomes one of four land classes, and each class sets
both how many troops an attacker must bleed and how fast the push completes. This
pack gathers the community threads, videos, and official source that define those
two numbers, the v0.34 attack formula that consumes them, and the terrain-derived
defenses (defense posts, fallout) that layer on top.

## Reddit threads analyzed (r/Openfront)

Direct Reddit access is bot-walled this run, so thread content was captured
verbatim through the search index. URLs and the observed player question:

- https://www.reddit.com/r/Openfront/comments/1n2604v/why_do_some_people_not_use_nukes_to_expand/
  — player asks why opponents hold expensive ground instead of nuking it; the
  thread surfaces the real question this guide answers: holding a highland or
  mountain edge costs the attacker more than the defender, so holding is rational.
- https://www.reddit.com/r/Openfront/comments/1k70l4n/can_i_use_the_in_map_defense_post_to_defend_the/
  — asks whether the pre-placed in-map defense post actually defends terrain;
  replies confirm defense posts multiply attacker loss and slow the push, and that
  a post on high ground is worth far more than a post on plains.
- https://www.reddit.com/r/Openfront/comments/1l28y9n/how_do_you_stop_others_stealing_your_land_in/
  — border-theft question; the working answer is to force the attacker to bleed
  across expensive terrain or a post-protected edge rather than raw troop count.
- https://www.reddit.com/r/Openfront/comments/1p2x0k2/defensive_strategy/
  — a player posts a map where they are losing the border fight and asks what the
  terrain advantage is; responses point at the magnitude difference between the
  defender's edge and the open plains the attacker must cross.
- https://www.reddit.com/r/Openfront/comments/1k48x4v/is_this_just_a_bad_map_layout_1v1_15x15/
  — 15×15 1v1 layout thread; players debate whether the choke is the mountain
  ridge or the open approach, which is exactly the "read the terrain before the
  first push" decision this guide formalizes.
- https://www.reddit.com/r/Openfront/comments/1n33l9v/best_way_to_defend_the_border_in_a_1v1/
  — direct "best way to defend the border" question; top answers recommend
  choosing a map where the defender holds the high side and stacking defense posts
  on the ridge rather than on the plain.
- https://www.reddit.com/r/Openfront/comments/1m5q557/are_there_any_1v1_tips_and_tricks/
  — general 1v1 tips thread; terrain choice and spawn-immunity interaction come up
  as the earliest decision, consistent with the magnitude thresholds below.

Limitations: thread dates are approximate (search index), some replies are short,
and no thread cites the internal constants — so every number in the guide is
re-verified against the v0.34.22 source rather than against the threads.

## YouTube videos analyzed (verifiable, with dates)

- https://www.youtube.com/watch?v=EdcdsayA_ac
  — "The ULTIMATE OpenFront.io Tutorial and Strategy Guide!", published 2025-04-28.
  Walks the four terrain types, explains that mountains are where you fight and
  plains are where you get crossed, and shows defense posts protecting a ridge.
  This is the strongest single video on the topic and matches the source model.
- https://www.youtube.com/watch?v=D7N2I0SMVLg
  — strategy overview covering border fights and the cost of attacking high ground;
  reinforces that the attacker pays the terrain penalty, not the defender.
- https://www.youtube.com/watch?v=7J5zwb_s_Cg
  — tactical breakdown of a 1v1 midgame where the defender holds a mountain edge;
  shows the troop bleed on the attacker that the `mag` base loss produces.
- https://www.youtube.com/watch?v=vVjCCdxy5mU
  — map-specific walkthrough; useful for the "adjust by map" section, showing how
  the same terrain rule plays differently on a compact choke map versus an open
  plains map.

## Official primary source

- https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.22 — the latest
  non-TEST release (2026-10-01); the version boundary for every number below.
- https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/core/configuration/Config.ts
  — `terrainAttackBase` (Plains `mag 80 / tileCost 16.5`, Highland `100 / 20`,
  Mountain `120 / 25`; Impassable throws), the v0.34 `attack()` formula, the
  `falloutDefenseModifier`, and the defense-post defense/speed bonuses.
- https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/core/game/GameMap.ts
  — magnitude-to-terrain thresholds (`<10` Plains, `<20` Highland, `20–30`
  Mountain, `>=31`/`IMPASSABLE_MAGNITUDE` Impassable) and pathfinding `cost()`.

## Verified fact baseline (v0.34.22)

- Magnitude classes: `<10` Plains, `<20` Highland, `20–30` Mountain, `>=31`
  Impassable; non-land is Ocean. `IMPASSABLE_MAGNITUDE = 31`.
- `terrainAttackBase`: Plains `{mag: 80, tileCost: 16.5}`, Highland
  `{mag: 100, tileCost: 20}`, Mountain `{mag: 120, tileCost: 25}`; Impassable
  throws `impassable terrain cannot be attacked`.
- Attack loss: `attackerTroopLoss = mag * traitorLossMod *
  within(troopRatio, 0.6, 2) * (ATTACKER_LOSS_BASE * largeAttackerBonus *
  largeDefenderBonus + ATTACKER_LOSS_PER_DENSITY * defenderTroopLoss)`, with
  `ATTACKER_LOSS_BASE = 0.463`, `ATTACKER_LOSS_PER_DENSITY = 0.0039`,
  `troopRatio = defender.troops / attackTroops`, `defenderTroopLoss =
  defender.troops / defender.numTiles` (defender loses its average per-tile).
- Speed: `speedCost = (within(troopRatio, 0.82, 7.5) *
  within(troopRatio / 20, 1, 50)) / SPEED_COST_DIVISOR`, `SPEED_COST_DIVISOR =
  8.55`; `tickFraction = (speedCost * tileCost * largeAttackerSpeedBonus *
  largeDefenderBonus * traitorCostMod) / input.borderSize`.
- `within(value, min, max) = clamp(value, min, max)`.
- Defense post multiplies `mag` by the defense bonus (loss ×5 at parity) and
  `tileCost` by the speed bonus (×3); range 30; pre-placed posts in map data.
- Fallout defense modifier is `5 - 2 * fallouRatio`, clamped so more fallout
  slows and thins the defender's own position and reshapes terrain after a strike.
- Large-territory depth: `LARGE_ATTACKER_DEPTH = 0.7`, `LARGE_DEFENDER_DEPTH = 0.3`.
- Terra nullius tick cost: `clamp((TERRA_NULLIUS_COST_SCALE * tileCost) /
  attackTroops, 5, 100) / tickBudget`, `TERRA_NULLIUS_COST_SCALE = 2000`.

These facts are the single source of truth for the guide; the threads and videos
are used to frame the player-facing question, not to state any number.
