# Community Source Pack — Micro-Boat Spam (offensive transport tactic)

Accessed: 2026-10-14. Topic: whether and how to spam repeated small transport-boat sends against a coastline, exploiting the fixed 20% boat load and the troop-regen curve.

## Official / first-party sources (ground truth for numbers and version boundary)

- OpenFront v0.34.25 Release (latest non-TEST Release, published 2026-10-13). URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.25
  - Carries the v0.34.24 note (2026-10-06): "Fix an exploit that let players grow their troops past the troop cap by repeatedly sending attacks at targets they don't border" (Evan). This is the version boundary that directly shapes the spam-regen debate.
  - Nation AI now "send[s] 1% beachhead boats and follow up by land" and "route[s] boats around warships" — confirms repeated boat sends are a live in-game behavior and a recognized AI pattern.
- Source tag v0.34.25 (local clone verified at v0.34.22, identical for these constants):
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.34.25/src/core/configuration/Config.ts
    - `boatMaxNumber()` returns 3 (transport cap).
    - `boatAttackAmount()` returns `troops / 5` (20% of the sender's current troops), floored and clamped to current troops. Fixed — not a player-settable slider.
    - `troopIncreaseRate()`: `10 + troops^0.73 / 4` multiplied by `(1 - troops/max)`; bots ×0.5.
  - https://github.com/openfrontio/OpenFrontIO/blob/v0.34.25/src/core/execution/TransportShipExecution.ts
    - On arrival at an enemy tile: `conquer(dst)` then `AttackExecution(boat.troops, ...)` — the boat's troops resolve as a land attack.
    - On cancelled/retreat arrival (destination became water, or already own): `addTroops(troops - deaths)` where `deaths = troops * malusForRetreat/100`, `malusForRetreat = 25`. Failed boat returns 75% of load (5% of pool).
- v0.35.0-beta1 (prerelease, not authoritative for stable play). URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0-beta1

## Reddit (3 threads)

1. "Micro boat spamming needs a massive fix." by /u/Tacticool_Turtle. https://www.reddit.com/r/Openfront/comments/1x4l4q7/micro_boat_spamming_needs_a_massive_fix/ (accessed 2026-10-14). Player problem: one country can "essentially infinity spam small population boats very close to each other" and the defender feels they "gives the attacker essentially infinite troops and cannot be stopped." Observation: the community frames small repeated boat sends as the single most annoying unanswerable offense; the thread is a complaint thread, not a guide. Limitation: post predates/does not reference the v0.34.24 exploit fix, so "infinite" is the pre-fix mental model.

2. "⚔️A Guide to Warships⚔️" by /u/Meta_Mushroom. https://www.reddit.com/r/Openfront/comments/1x2nyco/a_guide_to_warships/ (accessed 2026-10-14). Player problem: how to use warships against boats/transports. Observation (community-cited, cross-checked to source): warship base health 1,000, shell damage 200–300, target detection range 130 tiles, shell cooldown 20 ticks; warships auto-attack un-allied warships and transports and do NOT reset the normal shell cooldown on transport hits (so they kill transports fast). This is the defensive counter to boat spam and is source-verified. Limitation: warship costs (250k/500k/750k/1M) are community-quoted; treat as approximate unless re-verified against tag.

3. "Thoughts on snowballing?" by /u/YoghurtPlus5156. https://www.reddit.com/r/Openfront/comments/1x4nn9e/thoughts_on_snowballing/ (accessed 2026-10-14). Player problem: how to cap runaway snowballs. Observation: a snowball example (12→85 cities in 4 min, 3M cap vs 1.1M) shows how a small early beachhead/land advantage compounds; the author proposes city defensive buffers and a 30s "occupation" period to slow it. Relevance: repeated boat landings are a snowball engine; this thread is the "why spam matters strategically" evidence. Limitation: it is design feedback, not a tactic guide.

## YouTube (3 verifiable transcripts)

1. "This Boat Banking strat was INSANE." by Ultimus_Rex. https://www.youtube.com/watch?v=Pw2i9mRENqA (56:05). Transcript fetched (65,485 chars). Observation: the "boat banking" strategy repeatedly parks/sends small transport sends to accumulate or pressure a position — a direct community analogue to repeated-boat-send offense. Limitation: pre-current-version; some stated behavior may have changed.

2. "I crossed the entire map with an invisible boat…" by Ultimus_Rex. https://www.youtube.com/watch?v=SEeQ4Ae7ics (45:06). Transcript fetched (51,662 chars). Observation: demonstrates that a transport can reach a far, "unreachable" shore via a long path, reinforcing that the relevant constraint is water-component connectivity, not minimap distance — the same constraint that decides whether a boat lane can be denied. Limitation: a highlight video, not a balance source.

3. "I tried the early port strategy…" by Ultimus_Rex. https://www.youtube.com/watch?v=tg6YTh5dO2o (51:47). Transcript fetched (49,410 chars). Observation: early Port → early transport access; confirms the opening window where a Port lets a player start a boat-spam campaign before the opponent has a Warship screen. Limitation: strategy commentary, numbers not authoritative.

## Synthesis for the guide (decision-changing facts)

- The boat load is FIXED at 20% of the sender's current troops; there is no slider to send 5% or 8%. "Micro-boat spam" therefore means *repeatedly* sending that fixed 20% send, overlapping up to the 3-boat cap, so the defender must constantly answer a fresh 20% wave while the attacker's pool regenerates.
- Failed/retreat boat returns 75% of the load (25% malus), i.e. a wasted boat costs only 5% of the pool. That cheap-fail property is what makes repeated sending sustainable.
- Regen scales with current troops: `10 + troops^0.73/4 × (1 - troops/max)`. A spammer with a large pool regenerates faster in absolute terms and can afford more failed boats than a small defender.
- v0.34.24 (2026-10-06) removed the specific exploit of growing troops past the cap via repeated attacks at non-bordering targets. The spam tactic is now bounded by the real cap; the community "infinite spam" complaint is largely the pre-fix experience.

## Limitations

- Warship shell damage range (200–300) and cost ladder are community-quoted; cross-checked directionally to source but not re-read in full for this run.
- YouTube content is pre-current-version strategy commentary; used for community framing, not for numeric rules.
- Reddit `.json` API returned 403; content was pulled from `.rss`/Atom endpoints, so per-comment vote counts were not available.
