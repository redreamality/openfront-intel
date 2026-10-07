# Community Source Pack — outgunned-defense

Date: 2026-10-07 · Access date: 2026-10-07 · Release boundary: **v0.34.24** (published 2026-10-06, upstream main `9453de8`, `Config.ts` @ `src/core/configuration/Config.ts` in the local `OpenFrontIO` clone). All rule/number claims in the guide re-verified against that tag's source.

## Player question

A much larger neighbor is pushing at you and you are outgunned in total troops. **Do you hold the line, panic-send the whole bar to "buy time," fall back to a defense post, or commit a counterattack — and at what exact number do you switch?** The community answer is scattered, partly wrong, and inconsistent. This guide consolidates the repeated questions into one decision framework.

## Sources

### Official (1 primary)

1. **OpenFront.io — official game page**
   URL: https://openfront.io/
   Role: primary first-party source for mode/terminology and the v0.34 version framing the guide writes against.
   Access date: 2026-10-07.

2. **OpenFrontIO source, v0.34.24 `Config.ts`** — https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/configuration/Config.ts (rule/number authority — used to *correct* community claims; defender per-tile loss is `defender.troops / defender.numTiles`, the defender's average density, independent of push size)
   - `troopRatio = defender.troops / attackTroops`; `attackerTroopLoss` scales with `within(troopRatio, 0.6, 2)` — a hard floor of 0.6, NOT zero.
   - push speed `within(troopRatio, 0.82, 7.5) / 8.55` → the fastest a push can go is a 0.82 floor (~1.22×), not a free-speed push.
   - `defensePostRange()=30`, `defensePostDefenseBonus()=5` (attacker loses 5× per defended tile), `defensePostSpeedBonus()=3` (push through a post is 3× slower, not 5×).
   - defense post cost `min(250_000, (n+1)*50_000)` → 50k/100k/150k/200k/250k for the 1st–5th post; `constructionDuration = 5×10` ticks (50 ticks), upgradable.
   - troop growth `(10 + troops^0.73 / 4) × (1 − troops/max)`; peaks at ≈42% of cap (computed max ≈349.6 troops/tile at 41.8% of a 100k cap; 349.2 at 40%, 341.6 at 50%, 311.6 at 60%).
   - `BOT_DEFENDER_LOSS_MULT = 0.7` (bots take 0.7× defender loss), `DEFENDER_LOSS_BASE = 0.377`, `ATTACKER_LOSS_PER_DENSITY = 0.0039`.
   - traitor: `traitorSpeedMod 0.8`, `traitorDefenseMod 0.5`, `traitorCostMod 1.2`, `traitorDurationMs 30_000` (relevant to the "ally to buy time" branch).

### Reddit (3 discussions, fetched 2026-10-07 via pullpush archive)

1. **ONLY GUIDE ON DEFENDING**
   URL: https://www.reddit.com/r/Openfront/comments/1ploqpu/only_guide_on_defending/
   Relative recency: recent (fetched 2026-10-07).
   Player problem: the OP explicitly frames the whole thread as the only place that explains *defending your own land* (vs the many attack guides), and the single most-asked sub-question is "what do I do when a bigger player pushes me."
   Observations: the author's decision rule is "buy time, never panic-send your whole bar" — the instinct to click-attack the moment an enemy bar fills is described as the exact mistake that empties your home front. The thread's "2× troops = they can't push free" line is **wrong** (source caps the loss multiplier at 0.6 and speed at a 0.82 floor); the guide corrects this and keeps the *behavioral* point (don't spend your entire bar in one click) intact. The 50% / 40% "regen threshold" the OP cites maps to the regrow peak at ~42% of cap in the v0.34.24 source.
   Limits: self-published player guide; several numbers are rounded or slightly off; no version stamp.

2. **What's the best strategy when outgunned?**
   URL: https://www.reddit.com/r/Openfront/comments/1n1fa1c/whats_the_best_strategy_when_outgunned/
   Relative recency: recent (fetched 2026-10-07).
   Player problem: OP is down a large economy gap and asks for a concrete plan rather than "play better."
   Observations: answers converge on (a) do not trade your full bar for a partial one, (b) trade 1-for-1 only when you are at or below their ratio, and (c) fall back behind a defense post when the ratio gap exceeds roughly 2:1. Consistent with the source: below a ~2× defender:attacker ratio the defender's average-troop bleed keeps the attacker's per-tile loss high, so a controlled 1-for-1 hold is cheaper for the defender than a panicked all-in.
   Limits: anecdotal; individual map/mode states vary.

3. **How do I defend a frontier when two players are attacking at once?**
   URL: https://www.reddit.com/r/Openfront/comments/1prdhdd/ (image + short post; body thin)
   Relative recency: recent (fetched 2026-10-07).
   Player problem: a two-front squeeze — two neighbors pushing simultaneously — which is the worst case of the outgunned-defense question because your bar can only be in one place.
   Observations: the dominant advice is "pick the front you can actually win and concede the other," i.e. split the bar by the two ratios and only hold the front where `defender.troops / attackTroops` stays inside the loss-floor band. Matches the source decision: a bar held on a weak front is drained faster than one concentrated on the front with the better ratio.
   Limits: thin post; used only to confirm the two-front case exists and is asked about.

### YouTube (5 transcripts fetched 2026-10-07)

1. **"I Was Completely Outclassed… But I Had One Last Trick"** — Enzo Plays
   URL: https://www.youtube.com/watch?v=PQEAD16pQQI (transcript 5,212 words)
   Player problem: the OP is explicitly outclassed in a 50-player Back Hall game and narrates the outgunned-defense decision live.
   Observations: "the great old waiting game" — the commentator keeps his bar full and refuses to commit while the bigger neighbor overextends, and when the bigger player puts up a defense post he says "if he's putting up a defense post I do not want to deal with that" — i.e. the defense post is a *threat* to route around, not a free wall, which matches the 3× slower-push / 5× loss numbers. Re-allying to buy time is named explicitly as the outgunned move.
   Limits: single game; commentary, not data.

2. **"Can I Defeat a PIRATE BASE and the #1 Player?"** — Enzo Plays
   URL: https://www.youtube.com/watch?v=UZ-FTLI95X0 (transcript 3,600 words)
   Player problem: confronting the #1 player while managing a multi-front defense.
   Observations: "we don't think we fight Abdurrahman but stay maybe… let's put up these defense posts here… now we need to chill" — the live playbook is: concede the direct fight, stack defense posts on the contested edge, and chill (hold) while regrow peaks. Confirms the "concede + post + wait" branch.
   Limits: single game.

3. **"This Tactic is ESSENTIAL for V28"** — Enzo Plays
   URL: https://www.youtube.com/watch?v=xgD7a7TvcZs (transcript 6,197 words)
   Player problem: a fast-collapsing front that must be defended while the rest of the board is still open.
   Observations: "he's doing another big push… I think we just defense post here… this is a worry… so we just do a massive push right [back]" — the commentator alternates between posting and counter-pushing and narrates the *timing* switch (post when the ratio is bad, counter-push when the enemy overcommits). Confirms the two-branch structure of this guide.
   Limits: single game; version tag V28 (pre-v0.34), used for behavior not numbers.

4. **"Battling Cheaters in OpenFront.io"** — Enzo Plays
   URL: https://www.youtube.com/watch?v=srbShCDxwOU (transcript 5,219 words)
   Player problem: defending a home base that is "vulnerable to just like everything" while two rivals press.
   Observations: "we just need to chill on all the defense posts… World Peace is just a bunch of defense posts in there… my base is really really vulnerable to just like everything" — a case study in an over-posted, outgunned defender who is *still* losing because the posts were placed after the front broke rather than before it formed. Useful for the "placement timing" failure mode.
   Limits: single game; "cheaters" framing is incidental.

5. **"OpenFront.io V27 Complete Guide (Everything You Need to Know)"** — Enzo Plays
   URL: https://www.youtube.com/watch?v=iZQDOuTVcLY (transcript 8,291 words)
   Player problem: general mechanics reference, including the 1-for-1 trade and regrow curve.
   Observations: describes the "regrowth curve" and "slow to push" as the two levers a defender controls; frames 1-for-1 trading as the break-even move. Used to cross-check the regrow math and the trade break-even.
   Limits: V27 era; mechanics changed by v0.34, so numbers here are only cross-checked, not cited.

## Consolidated intent

The one question every source is actually asking: **when I am the smaller side in a live push, what is the single decision that tells me whether to hold, panic-send, fall back, or counter — and at what number?** The community answers disagree on the numbers (some say 2× troops makes a push free; some cite 50% and others 40% regen) and agree on the behavior (don't empty your bar; buy time; posts are a real tool but not a free wall; concede the weak front). This guide resolves the number disagreements against v0.34.24 source and keeps the behavioral consensus.

## Verification boundary

All rule/number claims in the guide are pinned to v0.34.24 `Config.ts` (the local `OpenFrontIO` clone at `9453de8`). Community numbers that conflict with source are corrected in the guide, with the community claim named so readers can trace the fix. No TEST build data used.
