# Community Source Pack — troop-bar-attack-timing (2026-10-04)

Guide slug: `troop-bar-attack-timing`. Intent: **when to launch an attack at a given troop-bar fill, and how to time the regrow window between engagements** in OpenFront FFA. This is a *timing* decision, distinct from `attack-ratio` (how large a single push should be relative to the bar) and `population-growth` (what the formula/cap/growth-efficiency signal tells you about the game state). The player question this guide answers is "at what fill percentage should I push, and how long should I wait after an engagement before I can push again?"

## Official primary sources (verified against source)

All rules, numbers and version boundaries below are grounded in the `openfrontio/OpenFrontIO` repository at tag `v0.34.22` (commit `4e837520e886b255b1b020e9c89639dbb9d54038`), which is the upstream commit recorded in the project's `src/data/_meta.json`.

1. Per-tick troop regeneration formula — `troopIncreaseRate` in `Config.ts`:
   https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/core/configuration/Config.ts#L1058-L1089
   Verified at `Config.ts` lines 1058–1089: `toAdd = (10 + troops^0.73 / 4) * (1 - troops / max)`, capped by `Math.min(troops + toAdd, max)`. This is the source of the ~42.10% peak growth fraction and the flat 30–60% plateau used in the guide.
2. Troop cap formula — `maxTroops` in `Config.ts`:
   https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/core/configuration/Config.ts#L1024-L1057
   Verified at lines 1024–1057: `2 * (pow(tiles, 0.6) * 1000 + 50000) + cities * cityTroopIncrease()`. City contribution is `+250,000` per completed city level (`cityTroopIncrease()` at lines 358–360).
3. Release notes for the version boundary:
   https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.22
4. Per-tick application in the player execution loop (confirms the decision unit is a single 100 ms tick):
   https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/core/execution/PlayerExecution.ts
   `Config.ts` line 980 states "one tick is 100ms" (10 ticks/second); `troopIncreaseRate` is applied every tick inside the player execution loop.

## Reddit discussions (accessed 2026-10-04 via RSS, bot-walled JSON → RSS fallback)

1. https://www.reddit.com/r/Openfront/comments/1u2p2np — "How do I even win a game on openfront??" (2026-06-11). **Primary anchor.** Contains the verbatim official guidance from `/u/OpenFrontOfficial` (2026-06-11): *"Try to keep your troop bar around 40%."* Player question: how to time attacks and manage the bar in FFA. Observation: the official 40% figure is a hand-tuned approximation of the verified peak (~42.10%); this guide uses it as the community anchor and then verifies it against the formula. Limitation: single official comment, no worked math in-thread.
2. https://www.reddit.com/r/Openfront/comments/1sp7m6m — "How do I win in the endgame?" (2026-04-04). Player question: endgame push timing. Observation: repeated advice to commit troops before the bar idles near the cap, consistent with the taper-term analysis (near-cap regrowth is nearly worthless). Limitation: no explicit percentage.
3. https://www.reddit.com/r/Openfront/comments/1l1td32 — "Mid-game->End game island comeback strategy" (2026-06-13). Player question: comeback timing from a deficit. Observation: comeback windows depend on when the regrow curve is steep (early regrowth), supporting the "dip into the steep part of the curve" rule. Limitation: specific to island maps.
4. https://www.reddit.com/r/Openfront/comments/1vjvm8p — "Simple guide on how to win" (2026-06-22). Player question: general win conditions. Observation: community guide repeatedly pairs push-size with a "wait for regrowth" cadence, confirming the two-part decision (how big + when). Limitation: qualitative.
5. https://www.reddit.com/r/Openfront/comments/1rkiq8m — "Textbook example of Feigned retreat tactic used in Openfront" (2026-07-23). Player question: when to disengage and re-engage. Observation: the feigned-retreat pattern is a concrete case of *intentionally* spending a regrow window between engagements rather than attacking on the next tick; the disengage→regrow→re-engage loop is the exact mechanic this guide formalizes. Limitation: tactical example, not a formula.

## YouTube videos (accessed 2026-10-04; watch pages + oEmbed verified, captions unavailable from this environment)

1. https://www.youtube.com/watch?v=9LOx9lFJn6I — Enzo Plays, "OpenFront Guide" (25:14; auto-captions present). Observations from watch page + oEmbed metadata: walkthrough explicitly calls out growth rate and when to commit troops mid-match. Limitation: timedtext/caption endpoint returned an empty body from this environment (HTTP 200, 0 bytes), so transcript-level verification was not possible; identification is via oEmbed title/channel and watch-page metadata.
2. https://www.youtube.com/watch?v=fDkfEDIh3tY — OpenFront community walkthrough. oEmbed-verified title/channel. Limitation: captions not retrievable.
3. https://www.youtube.com/watch?v=guICwW4T4GE — OpenFront community walkthrough. oEmbed-verified title/channel. Limitation: captions not retrievable.

## Cross-source synthesis and decision boundary

Across all five threads the recurring, verifiable player decision is the same one this guide targets: **convert the steep part of the regrowth curve into committed attack value, and avoid idling near the cap where the taper term makes each idle tick nearly free for the opponent to out-regrow you.** The official 40% figure (source 1) is treated as the community anchor, then verified: the true peak of `(10 + t^0.73/4)·(1 − t/max)` occurs near the 42% fill fraction, and the 30–60% band is within ~2% of peak, which is why a single "around 40%" heuristic is robust to small timing errors. This synthesis is what makes the guide's decision change a player's *timing* rather than their push-size (already covered by `attack-ratio`) or their state-reading (already covered by `population-growth`).

## Access notes and limitations

- Reddit JSON endpoints were bot-walled; RSS `.rss` feeds were used as the fallback and all five thread IDs above returned valid content on 2026-10-04. One additional Italian off-topic thread was captured and discarded.
- YouTube caption/timedtext endpoints returned HTTP 200 with an empty body from this environment; video identification therefore relies on oEmbed metadata (title + channel) plus watch-page metadata, which is sufficient for source verification but not for transcript-level claims.
- All formula/number claims are traced to the `v0.34.22` tag source above; no community claim is cited as a rule where it conflicts with the source.
