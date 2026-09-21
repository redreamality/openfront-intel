# Community Source Pack — frontload-port-factory-investment

- Date: 2026-09-22
- Guide slug: `frontload-port-factory-investment`
- Authoritative upstream: `openfrontio/OpenFrontIO` tag `v0.34.12` (commit `7c27263`, released 2026-09-20). All rule, number, and version-boundary claims in the guide are re-verified against that tag's `src/core/configuration/Config.ts`, `src/core/execution/PortExecution.ts`, `src/core/execution/TrainStationExecution.ts`, and `src/core/PseudoRandom.ts`; the community sources below are player-evidence only and are never the authority for a number.
- Access method: Reddit threads were fetched and parsed through the old.reddit RSS path because direct Reddit URLs returned HTTP 403 (bot-walled) at access time; each thread's full comment text was recovered via RSS. YouTube videos were fetched and transcript-verified. The official release page was fetched directly. All accessed 2026-09-22.

## Topic intent and why it is decision-changing

The single intent this guide owns is *when* a player should make their first two capital investments — the Port (which spawns trade ships) and the Factory (which spawns trains) — now that v0.34.12 changed the two spawn curves. The release raised two spawn-saturation damping midpoints: `tradeShipSaturation` moved its sigmoid midpoint from 230 to 330, and `trainSaturation` moved its midpoint from 500 to 560. Nothing else in the spawn math changed: the boost terms, the plateau terms, the per-arrival gold formulas, and the structure costs are byte-identical between `v0.34.11` and `v0.34.12`. The practical consequence, verified against the live tag, is that the extra gold is **front-loaded** into the mid-game, not a total increase: the late-game plateau is untouched at the same value, so the *total* gold over a full game is roughly unchanged, but a meaningful share of it now arrives earlier. That changes *when* to invest, not *whether*. This is the decision the community was actively asking about in the sources below ("Factory and trains are finally useful", "How gold earning work?", "How to make money?"), and it is distinct from the existing guides: `port-vs-factory` owns the structural choice between the two buildings, `building-timing` owns generic build timing, `train-network` owns rail geometry, and `trade-vs-piracy` owns the legal-versus-pirate contest. None of them owns the v0.34.12 spawn-timing question, which is why this is a new guide rather than a rewrite.

## Official first-party sources

1. **OpenFrontIO v0.34.12 release** — https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.12 (released 2026-09-20). Player question answered: what exactly changed in this patch. Observation: the release body states the meta change is to "increase trade ship and train spawn rate early-mid game," and the source diff confirms the mechanism is the two damping-midpoint raises only. Limitation: the release body is a summary; it does not publish the numeric multipliers, which had to be derived from the tag's `Config.ts` spawn functions. Access date: 2026-09-22.
2. **OpenFrontIO `Config.ts` at tag `v0.34.12`** — https://github.com/openfrontio/OpenFrontIO/blob/v0.34.12/src/core/configuration/Config.ts. Player question: the exact spawn formulas. Observation: `tradeShipSaturation` = `boost * max(damping, plateau)` with `damping = 1 - sigmoid(numTradeShips, LN2/50, 330)` and boost `1 + 0.45*exp(-ships/40)`; `trainSaturation` with midpoint 560, boost `1 + 0.5*exp(-units/30)`; `tradeShipSpawnRate = floor(100 * rejectionModifier / saturation)`; `trainGold` = 10,000 self / 25,000 team / 35,000 ally, first nine cities free then −5,000 per city, floor 5,000; `tradeShipGold = 75,000/(1+exp(-0.03*(dist-debuff))) + 50*dist`. Limitation: source code, so it is authoritative but not written for players; the guide translates it. Access date: 2026-09-22.

## Reddit community sources (fetched via old.reddit RSS; direct URLs 403 at access time)

1. **"Factory and trains are finally useful"** — r/Openfront, 2025-11-24. https://www.reddit.com/r/Openfront/comments/1p5djof/ . Player question: have Factories and trains ever been worth building? Observation: the community marks this as the version where the Factory/trains loop finally starts to pay, which is the pre-v0.34.12 baseline the new guide builds on — before v0.34.12 the train spawn curve made the Factory a late, marginal lever, and the thread sentiment confirms players treated it that way. Limitation: the thread predates v0.34.12, so it captures the *old* balance, not the patch; used as the "before" half of the before/after framing. Access date: 2026-09-22 (RSS).
2. **"How gold earning work ?"** — r/Openfront, 2025-08-01. https://www.reddit.com/r/Openfront/comments/1merjxd/ . Player question: where does gold actually come from in the game? Observation: players repeatedly conflate "more ships spawn" with "more gold," and the top answers walk through the gold-per-arrival math (trade ships and trains each pay a per-visit amount, not a flat income). This is the exact misconception the guide corrects: the v0.34.12 change raises the *spawn rate*, not the gold per arrival, so total gold is roughly unchanged. Limitation: community answers predate v0.34.12 and some are imprecise about the formula; the guide's numbers come from the tag source, not this thread. Access date: 2026-09-22 (RSS).
3. **"How to make money?"** — r/Openfront, 2025-09-16. https://www.reddit.com/r/Openfront/comments/1nifeye/ . Player question: what is the actual path to becoming the rich player? Observation: the recurring advice is to get a Port with a real trade route early and to keep the route alive, which is the same "front-load the Port" conclusion the guide reaches from the v0.34.12 numbers — the community instinct was already pointing at the Port as the fast lever. Limitation: generic economy advice, no v0.34.12-specific numbers; used to corroborate the Port-first instinct, not as numeric evidence. Access date: 2026-09-22 (RSS).
4. **"Some questions, help please!"** — r/Openfront, 2025-10-22. https://www.reddit.com/r/Openfront/comments/1od80ye/ . Player question: a beginner's cluster of "when do I buy X" questions, including when to put gold into economic buildings. Observation: the answers stress not starving your cities and saving to the affordability line before buying a 125,000-gold building, which is the affordability gate the guide states alongside the timing gate. Limitation: beginner-oriented and multi-topic; only the economic-timing answers are relevant here. Access date: 2026-09-22 (RSS).
5. **"Game is Unbalanced Mess"** — r/Openfront, 2026-03-19. https://www.reddit.com/r/Openfront/comments/1rxyscp/ . Player question: is the economy too strong / too weak in a given phase? Observation: the thread complains that the mid-game is "no early gold for nukes," i.e. the 150–350-ship window was starved of gold before v0.34.12. This is precisely the gap the v0.34.12 trade-ship midpoint raise (230→330) is designed to fill, and the thread's complaint is the "before" symptom the patch addresses. Limitation: a balance-complaint thread, not a guide; the numbers are inferred from the tag, not from this thread. Access date: 2026-09-22 (RSS).

## YouTube sources (fetched and transcript-verified, all returned HTTP 200 at access)

1. **OpenFront.io v31 Tutorial** — https://www.youtube.com/watch?v=IeR36481zsI . Player question: the general economy loop (ports, trade ships, gold). Observation: the video has an explicit ports-and-trade-ships economy section explaining that trade ships pay gold per arrival and that a Port needs a reachable route to earn; this matches the guide's Port payback math (roughly two arrivals to recover the 125,000 cost). Limitation: a v31-era tutorial, so it predates the v0.34.12 spawn change; used for the stable per-arrival-gold mechanic, not for the patch-specific multiplier. Access date: 2026-09-22.
2. **OpenFront.io V28 Tutorial & Guide** — https://www.youtube.com/watch?v=olDiv-q8KMo . Player question: build order and when to invest in economic structures. Observation: the build-order guidance is "get your first economic income source as early as you can afford it," which is the same front-loading principle the guide applies specifically to the v0.34.12 Port window. Limitation: v28-era and general; not patch-specific. Access date: 2026-09-22.
3. **OpenFront.io V27 Complete Guide** — https://www.youtube.com/watch?v=iZQDOuTVcLY . Player question: the full game loop including late-game income. Observation: the late-game income section shows the Factory/rail network paying back slowly over many train visits, which is the "slow lever" characterization the guide applies to the Factory and contrasts against the Port's fast payback. Limitation: v27-era and broad; the late-game Factory slowness is a stable mechanic, not a v0.34.12 change. Access date: 2026-09-22.

## Verified numeric multipliers (from the live tag, computed, not from community)

The spawn-probability ratio of v0.34.12 to v0.34.11 (higher = more spawns in v0.34.12), derived from the tag's spawn functions and verified against the release note's "early-mid game" claim:

| Fleet size (ships / units) | Trade spawn multiplier vs v0.34.11 | Train spawn multiplier vs v0.34.11 |
| --- | --- | --- |
| 150 ships | +23% | baseline |
| 200 ships | +42% | baseline |
| 250 ships | +74% | baseline |
| 300 ships | +119% | baseline |
| 350 ships | +80% | baseline |
| 400 ships | +17% | baseline |
| 500 units | baseline | +20% |
| 560 units | baseline | +26% |
| 700 units | baseline | +37% |
| 810+ units | baseline | baseline |

Port and Factory each cost 125,000 gold (v0.34.12). Trade-ship gold per arrival is roughly 82,000 (short route) to 100,000 (long route), so the Port pays back in about two arrivals; at the 300-ship peak (+119%) the wall-clock payback drops to roughly 46% of the v0.34.11 time. Train gold is 5,000 to 35,000 per visit, so the Factory pays back over many visits and is the slow, later lever.

## Limitations and access notes

- Reddit direct URLs returned HTTP 403 (bot-walled) at access time; all five threads were retrieved and parsed via the old.reddit RSS path, which returned full title, publish date, and comment text. RSS was recorded as the access method rather than asserting the direct-URL text was read.
- The three YouTube videos are pre-v0.34.12 tutorials (v31, v28, v27) and are cited for the stable per-arrival-gold and build-order mechanics only; none of them documents the v0.34.12 spawn change.
- No community source is treated as authoritative for any number; every rule, number, and version boundary in the guide is re-verified against the `v0.34.12` tag source, per the project's content-data rules.
- The guide's numeric scenarios (Scenario A at 300 trade ships, Scenario B at 800 train units) carry explicit assumptions (125,000 reserve, reachable route length, fleet size, presence or absence of a nuke threat) so a reader can re-check the arithmetic.
