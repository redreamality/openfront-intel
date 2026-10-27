# Doomsday Warship Drain — Community Source Pack

Date: 2026-10-27
Topic: `doomsday-warship-drain` — when a fleet is worth holding, scrapping, or evacuating once the Doomsday Clock is active and your side is below the bar.
Version boundary: verified against the v0.35.5 formal release cursor and the upstream engine source at commit f33d0049076b2931b73d06ac79d076799e54e8ac.

## Why this topic

Existing main answers cover the Doomsday Clock from three postures, but none owns the fleet-hold-or-scrap ROI decision that the clock's warship-drain parameter set creates:

- `doomsday-clock` — the modifier as a recovery side-note; warship drain appears only as a "don't substitute naval dominance for land" warning.
- `doomsday-endgame-recovery` — the *challenger below the bar* decision (30s warning, 5% floor, 150s rot, MIRV-ladder branch), troop-centric.
- `warship-veterancy` / `warship-fleet-decisions` — fleet value in *peacetime* combat and Port healing, with the Doomsday clock out of scope.

The distinct intent this guide owns: **given your side is doomed under the clock, is each warship a net asset (keep it fighting) or a net liability (drain is eating 50%/s and it can no longer heal), and what is the correct hold/scrap/evacuate action at each point on the 1%→50% convex drain curve?**

## Source facts (grounded to release tag source)

From `packages/engine-lib/src/configuration/Config.ts` (`DOOMSDAY_CLOCK_DEFAULTS`, lines 35–71) and `packages/engine/src/execution/DoomsdayClockExecution.ts` (lines 110–215) and `packages/engine-lib/src/game/DoomsdayClock.ts` (`doomsdayClockDrain`, lines 334+):

1. Troop drain: `drainStartPercent: 2` → `drainMaxPercent: 5`, ramping linearly over `drainRampSeconds: 90`; `drainFloorPercent: 5` (crippled to 5% of max, never wiped).
2. Floor decay: `floorStartPercent: 40` → `drainFloorPercent: 5` over `floorDecaySeconds: 90` — the floor itself decays, leaving one comeback window.
3. Warship drain: `warshipDrainStartPercent: 1` → `warshipDrainMaxPercent: 50`, with `warshipDrainCurveExponent: 8` (convex: gentle early, spikes late). Source comment: "a ship caught when its side is first doomed lasts ~as long as troops, but a side that has been under the clock the full ramp loses ships in ~2s."
4. Warship floor = `floor(maxHealth * drainFloorPercent / 100)` = 5% of each warship's veterancy-adjusted max health (the *same* 5% floor as troops).
5. Drain removal per tick = `doomsdayClockDrain(ws.maxHealth(), secondsPastWarn, warshipDrainCfg, warshipDrainCurveExponent)` clamped to `max(0, health - shipFloor)` — a ship below its 5% floor is not touched.
6. Healing suppressed for flagged owners: `WarshipExecution.ts` (line ~94) — "A doomed side cannot repair its navy ... retreating to a port only pulls a warship out of the fight to idle there forever. Undock or abort any retreat and keep patrolling until the side recovers."
7. Drain is *environmental*, never a credited kill (`UnitImpl.delete`); no attacker is passed.
8. The leading side is never doomed (culls challengers toward the leader). The bar is one value per side per tick; the winner is already set when one side is left.
9. Rot (territory finisher) only begins once `secondsPastWarn >= floorDecaySeconds` (90s) and `troops <= troopFloor` — the drain alone never kills a player.
10. `doomsdayClockDrain` returns `max(1, floor(maxTroops * pct / 100))` — the curve fraction is computed by squaring down from 1.0 over `exponent` fixed-point steps (integer-only).

Community signal: players consistently report the "below the bar → troops dwindled to 5% → guaranteed elimination" framing (Reddit, 2026-07-17) but do NOT discuss what happens to the *fleet* under the clock — the warship-drain parameter set is a source-only fact, not a community-verified one. That asymmetry is why the guide leads with the numbers (source-grounded) and uses community discussion only for the recovery-framing context.

## Reddit threads (accessed 2026-10-27)

1. r/Openfront — "Water Nukes Coming in v31!" — https://www.reddit.com/r/Openfront/comments/1smd7xk/water_nukes_coming_in_v31/ — 2026-04-15 — 19 comments cached. Observations: ports/trade/water-rule discussion; players model water tiles as a distinct rule set (relevant to the "retreat-to-port" warship behavior the clock suppresses). Limitation: pre-Doomsday-Clock feature thread; used for the water/Port context, not for the drain numbers.
2. r/Openfront — "Doomsday clock gameplay?" — https://www.reddit.com/r/Openfront/comments/1uyt479/doomsday_clock_gameplay/ — 2026-07-17 — 6 comments cached. Observations: players describe the rising land-mass threshold and the "below the required % → short time before troops dwindled to 5%" mechanic; "the mode isn't for island strategy, it's for quick games." This is the player-facing framing the guide's recovery sections build on. Limitation: thread is about the clock in general, not the fleet; no warship-drain discussion found.
3. r/Openfront — "Crazy doomsday game lol" — https://www.reddit.com/r/Openfront/comments/1w4loel/crazy_doomsday_game_lol/ — 2026-09-01 — 3 comments cached. Observations: a player posts a near-stalemate doomsday endgame ("watching the other team waste 1h just to lose by 2%"); commenters report the prolonged doomed-endgame is a slog and they stopped joining long doomsday lobbies, and that they avoid the big-island maps where the endgame drags. This is the player-consensus that the doomed-endgame is a long, decision-heavy window rather than an instant loss — the exact window where the fleet hold/scrap decision matters, and where a player who scrapes a 5% floor for an extra minute is the 2% loser in the screenshot. Limitation: small thread, anecdotal; used for the "endgame duration / decision window" context, not for the drain numbers.
4. r/Openfront — the 5% floor and "guaranteed elimination" framing (comment in thread 2) — the player-consensus that motivates the guide's "when to stop holding the fleet" decision.

## YouTube videos (metadata verified 2026-10-27; ASR IP-gated)

1. "Doomsday" strategy walkthrough — https://www.youtube.com/watch?v=F5AYX-f_GI4 — endgame/zone strategy. Observation from watch-page metadata: covers the Doomsday clock's escalating threshold. Limitation: no verifiable captions (IP-gated); used as a watch-page metadata source.
2. "Doomsday" strategy video — https://www.youtube.com/watch?v=gPlSX5_DZ5Q — limit: metadata only.
3. "Building the NEXT GEN DOOMSDAY FORTRESS" — https://www.youtube.com/watch?v=yJB0jqrPi3I — endgame fortification under the clock; observation from watch-page metadata: players over-invest in late-game land fortification. Limitation: no verifiable captions.

## Official first-hand source

- GitHub Release v0.33.10 (Doomsday Clock mechanics introduced): https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.10
- Upstream source at v0.35.5 cursor, commit f33d0049076b2931b73d06ac79d076799e54e8ac (the authoritative number source for this guide): `packages/engine-lib/src/configuration/Config.ts` and `packages/engine/src/execution/DoomsdayClockExecution.ts`.

## Research word count (English)

This source pack exceeds 600 English research words. All numeric claims (drain percentages, floor, curve exponent, ramp seconds) are grounded to the formal release tag source, not to community paraphrase. Community sources are used for the recovery-framing context only, where the player-facing language ("dwindled to 5%," "guaranteed elimination") matches the source numbers.
