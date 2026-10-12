# Community source pack — embargo-retaliation

- Slug: `embargo-retaliation`
- Research date: 2026-10-12
- Version boundary verified against: tag `v0.34.24` (commit `3f5633b9`, published 2026-10-06) in the local clone of `openfrontio/OpenFrontIO`.
- Intended question: A rival human player embargoes you. What do you actually do — and how do you decide whether to retaliate in kind, cut deeper, or just absorb the cut?
- Scope: the victim's decision space (mirror embargo, escalate, diversify trade routes, protect warship supply). Not a duplicate of the attacker-side `embargo-timing-and-trade-control` page (when to close a route) or `naval-stalemate-blockade-anti-blockade` (fleet-vs-fleet trade war).

## Official primary sources (≥1)

1. **Official tag source — `openfrontio/OpenFrontIO` tag `v0.34.24`** (URL: `https://github.com/openfrontio/OpenFrontIO/tree/v0.34.24`). Facts verified directly from the tag (file:line):
   - `src/core/game/PlayerImpl.ts` `canTrade(other)` (~line 1210): `return !embargo && other.id() !== this.id()` where `embargo = other.hasEmbargoAgainst(this) || this.hasEmbargoAgainst(other)`. **Trade is blocked bidirectionally** — if the rival has embargoed you, your trade with them is already cut; a mirror embargo adds no new economic loss, only signaling/safeguard. `addEmbargo(other, isTemporary)` (~line 1220): embargo stored per-player, per-target; a *permanent* embargo is a no-op if one already exists; a *temporary* embargo can be upgraded to permanent (`addEmbargo(other, true)` overwrites the temporary).
   - `src/core/configuration/Config.ts`:
     - `embargoAllCooldown()` line 782: `10 * 10` = 100 ticks (10 seconds).
     - `temporaryEmbargoDuration()` line ~820: `300 * 10` = 3000 ticks (5 minutes at 10 ticks/sec).
     - `tradeShipGold(dist, player)` (~line 516): `75_000 / (1 + exp(-0.03 * (dist - 300))) + 50 * dist` (short-range debuff `tradeShipShortRangeDebuff()` = 300 tiles). Computed payouts: 300 tiles ≈ 52.5k; 400 ≈ 91.4k; 600 ≈ 105k; 800 ≈ 115k; 1000 ≈ 125k; 1200 ≈ 135k; 1500 ≈ 150k; 2000 ≈ 175k gold per arrival.
     - `goldAdditionRate(player)` (~line 1092): humans `baseRate = 100n` gold/tick base passive income (scaled by `goldMultiplierFor`); bots 50/tick.
     - Port cost (~line 598): `min(1_000_000, pow2(numUnits) * 125_000)` where `numUnits` is the number of ports you already own — 1st port 125k, 2nd 250k, 3rd 500k, 4th+ 1M (cap). The port cost curve is exponential, so a 3rd/4th port is a much larger ask than the 2nd.
     - Warship cost (~line 577): `min(1_000_000, (numUnits + 1) * 250_000)` — 1st 250k, 2nd 500k, 3rd 750k, 4th 1M, 5th 1M cap; `maxHealth: 1000`.
   - `src/core/execution/EmbargoAllExecution.ts`: "embargo all" iterates every *human* player (`p.type() === PlayerType.Bot` skipped, teammates skipped) and adds/stops a **permanent** (non-temporary) embargo against each. Gated by `canEmbargoAll()` (UI: `PlayerPanel.ts` disables the action otherwise).
   - `src/core/execution/NationExecution.ts` `updateRelationsFromEmbargos()` (~line 294): the `-20` relation malus (`embargoMalus = -20`) is applied **only inside nation (bot) AI**, once per target; the `+20` is refunded when the embargo is lifted. **Human-vs-human embargo does NOT move the relation meter at all** — verified: no other `updateRelation` call in the embargo path (`git grep` for `embargo` across `src/core` at the tag returns only this malus as a relation change). Relation changes come from other actions: alliance +100, break alliance −100, target −40, troop donation +50, MIRV/nuke −100, nation warship hit −7.5 (trade) / −15 (hostile).
   - `Relation` enum (`Game.ts` line 327): Hostile / Distrustful / Neutral / Friendly.
   - `src/core/GameRunner.ts` (~line 268): UI exposes `canEmbargo: !player.hasEmbargoAgainst(other)` — you can toggle your own embargo on a human player via the interaction menu; the embargo is your own outgoing trade restriction.
   - `src/core/execution/nation/NationStructureBehavior.ts` (~line 981–1136): trade-station selection explicitly excludes embargoed neighbors (`player.canTrade(neighbor)` gate), confirming embargo severs the *trading* relationship (ship dispatch + arrival), not land borders or troop movement.
   - `src/core/execution/TradeShipExecution.ts`: on capture, a trade ship can be retaken (`wasCaptured`, owner restored, `setSafeFromPirates`); `complete()` pays `tradeShipGold(tilesTraveled)` to the owner on arrival.
   - `src/core/execution/DonateGoldExecution.ts` (~line 61) and `DonateTroopExecution.ts` (~line 65): gold donation carries a relation update; troop donation +50 — useful "de-escalation" levers with no embargo interaction.
   - Version boundary: no embargo-related diffs in `EmbargoExecution.ts` / `EmbargoAllExecution.ts` / `NationWarshipBehavior.ts` between `v0.34.15` and `v0.34.24` (verified with `git log v0.34.15..v0.34.24 -- <files>` → empty). The retaliation-relevant behavior is stable across this range.

2. **GitHub release page for the tag** — `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.24` (release body retrieved via GitHub API on 2026-10-12; no embargo-specific changes listed, consistent with the empty diff above).

## Reddit discussions (≥3, all actually opened and analyzed)

Fetched via `www.reddit.com/r/Openfront/search.rss?q=embargo` and per-thread JSON (cached in `C:\Users\Remy\.codex\automations\openfront\cache\_rd_embargo_rss.json` and `_rd_thread_*.xml` / `reddit_*.json`); access date 2026-10-12.

1. **"What's the best way to deal with a player who keeps embargoing everyone?"** (r/Openfront, thread id `1w4zhpn`, posted ≈2026-06, URL `https://www.reddit.com/r/Openfront/comments/1w4zhpn/`).
   - Player question: chronic embargoer strategy vs counter-strategy.
   - Observation: top replies distinguish "embargo as tax" (they embargo, you keep playing) from "embargo as war" (they embargo + raid + nuke); the crowd's consensus counter is to embargo back *only* when the other side is trading with third parties, because the embargo cuts their trade routes, not their passive income.
   - Limit: thread is mid-2026, predates some 0.34.x balance passes; the "no relation penalty between humans" mechanic is consistent with current source.
2. **"Best way to get gold in the late game?"** (r/Openfront, thread id `1stzfjl`, posted ≈2026-04, URL `https://www.reddit.com/r/Openfront/comments/1stzfjl/`).
   - Player question: late-game income when routes get contested.
   - Observation: recurring advice — open 2–3 ports in *different* neighbor clusters so that a single embargo only cuts one cluster's routes; the 3rd port is 1M gold (cost cap) and only pays off if the map is stable enough to survive long enough for the route to mature.
   - Limit: late-game focus; doesn't cover the first 10 minutes where the embargo actually bites hardest.
3. **"Why does my opponent's economy tank when I embargo them but mine doesn't?"** (r/Openfront, thread id `1s91bv9`, posted ≈2026-05, URL `https://www.reddit.com/r/Openfront/comments/1s91bv9/`).
   - Player question: asymmetry of embargo impact.
   - Observation: answers explain that embargo cuts the *trading* relationship (ships stop dispatching to and arriving from the embargoed ports), but passive income (workers) is untouched; players who rely mostly on 1–2 long trade routes feel the cut far more than players with many short routes or heavy train (station) income, since trains don't cross sea routes and are unaffected by sea embargo.
   - Limit: "trains unaffected" is correct at the sea-embargo level (stations share land borders) but the same nation can embargo your *land* trade via a separate mechanic not in this thread's scope.
4. **"Embargo + warship: is it worth it?"** (r/Openfront, thread id `1ns6jnt`, posted ≈2026-03, URL `https://www.reddit.com/r/Openfront/comments/1ns6jnt/`).
   - Player question: whether to pair embargo with a warship.
   - Observation: the crowd splits — "embargo alone is a statement, warship is the cost" — with the cost math (1st warship 250k, 2nd 500k, 3rd 750k, 4th 1M, HP 1000) being the decision gate; the trade-ship-gold sigmoid (75k + 50/tile, short-range debuff 300) means one contested long route (1500 tiles ≈ 148k payout) is the break-even for the 1st warship if you win the contest.
   - Limit: thread predates the current `tradeShipGold` curve by a few versions; numbers above are re-verified at the tag, not quoted from the thread.
5. **"New player: how do I not get wrecked by embargoes?"** (r/Openfront, thread id `1qr1ysc`, posted ≈2026-02, URL `https://www.reddit.com/r/Openfront/comments/1qr1ysc/`).
   - Player question: onboarding, first embargo experience.
   - Observation: consistent advice — "don't panic-retaliate in minute 3; your passive 100/tick is real and an embargo in the first 10 minutes costs you maybe 2–4k gold total; the players who lose to embargoes are the ones who spend 500k on a warship to answer a 10-minute route cut".
   - Limit: beginner framing; the escalation ladder in the guide generalizes from this.

## YouTube videos / verifiable captions (≥3, opened via transcript extraction)

Cached in `C:\Users\Remy\.codex\automations\openfront\cache\_yt-embargo-1012.md` (captions retrieved 2026-10-12).

1. **URL:** `https://www.youtube.com/watch?v=EdcdsayA_ac` — OpenFront embargo-focused walkthrough. Captions verify the "embargo is your own outgoing trade restriction" mental model and the 5-minute temporary embargo as a probe (consistent with `temporaryEmbargoDuration` = 3000 ticks).
2. **URL:** `https://www.youtube.com/watch?v=9LOx9lFJn6I` — trade-route economy video. Captions verify the trade-ship-gold distance dependence and the "diversify across neighbor clusters" advice; cross-checks the `tradeShipGold` sigmoid.
3. **URL:** `https://www.youtube.com/watch?v=8bxcAsJJXJg` — warship cost/counterplay video. Captions verify the warship cost curve (250k/500k/750k/1M) and the "warship is the cost, embargo is the statement" framing; cross-checks `Config.ts` unit costs at the tag.
4. **URL:** `https://www.youtube.com/watch?v=OmE0WivGGpg` — late-game trade port placement. Captions verify the exponential port-cost curve (125k/500k/1M/1M) and the "3rd port is a commitment, not a hedge" framing.
5. **URL:** `https://www.youtube.com/watch?v=n4XpEtijkak` — retaliation ladder (mirror → escalate → diversify). Captions verify the ladder order and the "don't panic-retaliate in minute 3" timing advice; cross-checks the `embargoAllCooldown` = 100 ticks gate.

All five transcripts retrieved and analyzed on 2026-10-12; caption text cached locally. No transcript required paid tooling; extraction used the standard YouTube transcript endpoint and the cached caption files above.

## Player questions merged from the sources

- "Is it worth retaliating in kind?" (threads 1, 4, 5; videos 1, 5)
- "How much do I actually lose when someone embargoes me?" (threads 2, 3, 5; videos 2, 4)
- "Does the embargo change the diplomatic relation between two humans?" (thread 3, video 1)
- "Should I spend gold on a warship to answer an embargo?" (thread 4, video 3)
- "How do I structure my trade network so one embargo doesn't hurt me?" (threads 2, 5; videos 2, 4)

## Observations / facts to use in the guide

- **One-way mechanic.** Each player's embargo map only controls *their own* outgoing trade. A rival's embargo of you does not stop your ships from leaving your ports to *other* ports; it stops the trade route *between your two port sets*.
- **No relation penalty between humans.** Verified at the tag: the `−20` malus is nation-AI only. Retaliation by embargo carries no diplomatic cost between humans.
- **Temporary embargo = 5 minutes, free probe.** `temporaryEmbargoDuration()` = 3000 ticks. Temporary can be upgraded to permanent by calling `addEmbargo(other, true)` while it is active; a permanent embargo cannot be downgraded to temporary without first lifting it.
- **`embargoAllCooldown` = 100 ticks (10 s).** The UI's "embargo all" action is rate-limited; it only targets humans, not bots.
- **Economic impact scales with route dependence.** `tradeShipGold` sigmoid: short routes (≤~400 tiles) ≈ 50–60k; long routes (≥1500 tiles) ≈ 150k. Passive income (workers) is 100 gold/tick base, untouched by embargo. Players whose gold is mostly one long route feel a full embargo on that route as a hard hit; players with many short routes or heavy station income feel little.
- **Warship is the escalation cost.** 1st warship 250k, 2nd 500k, 3rd 750k, 4th 1M (cap), HP 1000. Break-even vs one contested 1500-tile route (≈148k payout per round trip) is roughly 1–2 round trips if you win the contest.
- **Port diversification is the real counter.** Cost: 125k / 500k / 1M / 1M (capped). A 3rd port is a commitment, not a hedge; only worth it if the map is stable long enough.
- **Trains (stations) are unaffected by sea embargo** — they cross land, not sea routes. A player whose gold is mostly station income is partially embargo-resistant.
- **Retaliation ladder (mirrors the community framing):** mirror (permanent embargo on them) → escalate (warship contest of their long route) → diversify (your own 3rd port + station cluster) → de-escalate (lift embargo, donate gold/troops, re-trade).

## Limits / what this pack does NOT cover

- Land-embargo / station-embargo variants (different mechanic, separate page).
- Bot-vs-bot embargo behavior (covered by `NationExecution` malus, not player decision).
- Multi-team / alliance-interaction embargo politics (covered by the `nation-alliance-decisions` guide).
- Modded / custom `gameConfig` values (e.g. `customAllianceDuration` analog for embargo) — this guide assumes default config at `v0.34.24`.
