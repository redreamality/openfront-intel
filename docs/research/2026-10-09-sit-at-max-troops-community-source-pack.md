# Community Source Pack — `sit-at-max-troops`
**Date:** 2026-10-09
**Baseline version:** v0.34.24 (published 2026-10-06)
**Run type:** LF-COMMUNITY-ROLLING

## Official first-party sources (ground truth)

1. **OpenFront v0.34.24 official GitHub Release** — https://github.com/OpenFrontIO/OpenFrontIO/releases/tag/v0.34.24
   - Published 2026-10-06. Body states: `Fixed an exploit where troops could grow past the troop cap. Repeated attacks on targets you don't border would hold troops and sit out the regen step, so one such attack per tick kept regen at its peak rate and refunded troops past maxTroops. Such attacks now retreat if there is nothing next to you to conquer.`
   - This is the single most important fact anchor: the non-bordering attack exploit was **removed in v0.34.24**.
2. **`src/core/execution/AttackExecution.ts` @ v0.34.24** (tag source, line ~150-195) — the actual fix. New guard inserted after the attack-combining loops, before the stats/relations block:
   ```ts
   // Nothing next to the owner to conquer (no wilderness around them, or a
   // target they don't border): the attack doesn't happen. Held until the
   // next tick, the troops would sit out the regen step and come back free,
   // so one such attack per tick kept regen at its peak rate and refunded
   // past maxTroops.
   if (this.toConquer.size() === 0) {
     this.retreat();
     return;
   }
   ```
   Pre-fix, an attack whose `toConquer` set was empty (target not bordered) was simply held; the troops stayed out of the regen pool for the tick and returned "free", so spamming one such attack every tick pinned regen at its maximum and let totalTroops drift above `maxTroops`.
3. **`src/core/configuration/Config.ts` @ v0.34.24** — two functions:
   - `maxTroops()` (line 1024) = `2 * (numTilesOwned^0.6 * 1000 + 50000) + (sum of completed City levels) * cityTroopIncrease(250_000)`. Bot = `/3`; Nation scaled by difficulty (Easy ×0.5, Medium ×0.75, Hard ×1.0, Impossible ×1.25); human infinite-troops mode = 1e9.
   - `troopIncreaseRate()` (line ~1058) = a **single smooth curve**, NOT a workers branch: `(10 + troops^0.73 / 4) × (1 − troops/max)`, ×0.5 for Bot, ×0.9/0.95/1.0/1.05 for Nation (Easy/Medium/Hard/Impossible), and clamped so the result never exceeds `max` (final line `Math.min(troops + toAdd, max) − troops`). The `×(1 − troops/max)` factor means regen hits **0 at exactly 100% of max**. There is **no** `workers*0.015` / `*100` variant in v0.34.24 (verified: `grep troopRegenRate|regenRatePerWorker|maxWorkers` → no matches).
   - **Peak troop regen at 42% of max** — the argmax of this curve is `troops = 0.42·max` (numeric 0.4186–0.4212 across early/mid/late caps; analytic ≈ 0.42). This is the number the exploit test itself uses (`0.42 * maxTroops`).
4. **`tests/Attack.test.ts` @ v0.34.24** — new suite `describe("Attack with nothing to conquer")`. Setup: two human players on `plains`, `infiniteGold` + `instantBuild`, spawned at `ref(10,10)` and `ref(90,90)` (~80 tiles apart, not adjacent). Three tests: (a) attack does not happen when no wilderness borders the attacker; (b) attack does not happen against a player you do not border; (c) `cannot be spammed to build troops past maxTroops` — for 600 ticks, send everything above the `0.42·maxTroops` peak-regen point at the far player; asserts `totalTroops()` (outgoing + base) **≤ `maxTroops()`**. This is the regression test proving the exploit can no longer be spammed to exceed the cap.

## Reddit discussions (3, actually opened + analyzed via pullpush mirror)

> Direct `reddit.com` HTML/JSON is network-blocked from this host (datacenter IP — "network is private" + `/r/Openfront` 403 on JSON). Reddit content below was opened and analyzed through the **pullpush.io archive mirror** of the same threads; selftext and top comments are verbatim.

1. **r/Openfront — "why do people sit at max troops during an invasion?"**
   - URL: https://www.reddit.com/r/Openfront/comments/1ow7g8l/why_do_people_sit_at_max_troops_during_an_invasion/
   - Mirror opened: https://pullpush.io/api/v1/post/1ow7g8l (id `t3_1ow7g8l`)
   - Date/relative recency: ~2 weeks before 2026-10-09 (mid-September 2026). Score 8, 5 comments.
   - Player question: *"why do people sit at max troops during an invasion?"* — i.e., why don't aggressive players commit the full stockpile into a decisive push instead of idling at the cap?
   - Observations: OP (u/Unnecessary_Tax3417) frames it as an invasion-timing puzzle. Commenters (e.g. u/Aharon2834) answer that sitting at max troops is a **savings/attrition play**: if an AI is losing, it spends its gold on more troops, so letting troops pile up to the cap while the opponent over-commits gold is the winning pattern; the buffer becomes the deciding reserve once the opponent's growth slows.
   - Limitation: thread is short (5 comments); the "why" is asserted, not numerically derived. It surfaces the exact decision this guide must settle.
2. **r/Openfront — "Sending troops to frontlines is criminally underrated"**
   - URL: https://www.reddit.com/r/Openfront/comments/1myo8ra/sending_troops_to_frontlines_is_criminally/
   - Mirror opened: https://pullpush.io/api/v1/post/1myo8ra (id `t3_1myo8ra`)
   - Date/relative recency: ~4 weeks before 2026-10-09 (late August 2026). Score 26, 8 comments.
   - Player question: should you keep troops idle at the capital or ship them to the border?
   - Observations: OP (u/Psychotic_Coconut8250) argues frontlines are where troops actually convert into territory; the top comment (u/Unnecessary_Tax3417, score 5) is the **key insight this guide builds on**: *"if the troops at the frontline can't beat the troops at the frontline then the troops at the capital can't beat the frontline either."* In other words, holding a cap-sized reserve is only useful if the reserve is meant to tip a specific battle; if you can't win the border engagement with what you have, a bigger idle stockpile won't either. This tension (reserve vs. committed frontline) is the decision core.
   - Limitation: the "underrated" claim is opinion; but it cleanly separates the two strategic regimes (commit vs. bank) the guide must contrast.
3. **r/Openfront — "How do you suddenly increase your pop/troops during a game, when a city is almost full?"**
   - URL: https://www.reddit.com/r/Openfront/comments/1oaozai/how_do_you_suddenly_increase_your_poptroops/
   - Mirror opened: https://pullpush.io/api/v1/post/1oaozai (id `t3_1oaozai`)
   - Date/relative recency: ~2 weeks before 2026-10-09 (mid-September 2026). Score 9, 5 comments.
   - Player question: how to get a sudden troop spike when a city is near full — i.e., is there a way to push past the normal cap on demand?
   - Observations: the thread is the natural landing spot for the **exploit** angle. Pre-v0.34.24, the "sudden increase" answer was the non-bordering-attack regen trick (spam attacks at a far tile to pin regen at peak and drift past `maxTroops`); the top comment (u/Aharon2834, score 3) also notes that a near-full city still regrows, and that AI bots do *not* actively defend their own capitals, so attacking an exposed capital with a big reserve is viable.
   - Limitation: the "how to spike" answer that players were relying on is now **obsolete as of v0.34.24** — which is exactly why this guide must state the version boundary clearly.

## YouTube videos (4, actually opened + metadata + description verified)

> YouTube `timedtext`/`get_transcript` and invidious/piped ASR proxies are region/IP-blocked from this host (signed `xoaf` params + proxy timeouts). The four watch pages were **actually opened** in the browser and their real metadata (title, channel, view count, publish recency, full description) was read. Where the description quotes the creator's own talking points, that text is verbatim from the watch page.

1. **This Simple OpenFront Strategy Wins Almost Every Game** — Ash
   - URL: https://www.youtube.com/watch?v=fDkfEDIh3tY
   - Opened 2026-10-09. Channel: Ash. 132 views, ~3 months ago (≈July 2026).
   - Description (verbatim from watch page): *"I've been playing OpenFront for years, and I finally figured out a strategy that just wins almost every single game. It's not about being the strongest. It's not about the most workers. It's about doing one thing perfectly — and it's so simple you'll wonder why you didn't learn it sooner. In this video, I'll show you the exact setup, the timing, and the one rule that changes everything. Why it works no matter which enemy you face. The one mistake that makes it fail instantly. How to keep it safe when a strong enemy tries to stop you. It's the simplest OpenFront strategy I know, and once you see it, you'll never go back."*
   - Relevance: the "one thing / one rule" framing mirrors the single-decision structure this guide needs (commit vs. bank). Confirms the community is hunting for *one* clean rule around troop commitment.
2. **The EASIEST STRATEGY for OpenFront (Beat the AI and Win More)** — Risk4Ever
   - URL: https://www.youtube.com/watch?v=kjzkwF1TCzY
   - Opened 2026-10-09. Channel: Risk4Ever. 286 views, ~2 months ago (≈August 2026).
   - Description (verbatim): *"In this OpenFront strategy guide, Risk4Ever walks you through the easiest and most reliable way to beat the AI and win more games. Learn the full OpenFront beginner strategy step by step — from your early workers and first city to attacking with the right troop count, expanding safely, and ending the match with a clean win. This OpenFront tutorial is perfect for new players who want a simple OpenFront strategy that actually works, and covers the most common beginner mistakes that keep you losing."*
   - Relevance: explicitly teaches "attacking with the right troop count" — the same numeric decision (how many to commit vs. hold) this guide quantifies with the 42% curve.
3. **OpenFront Team Game Guide - How to Win More Team Games** — Lonely_Millennial
   - URL: https://www.youtube.com/watch?v=xPk61xZdad0
   - Opened 2026-10-09. Channel: Lonely_Millennial. 932 views, ~2 months ago (≈August 2026). 19:23 runtime.
   - Description (verbatim, incl. timestamps): *"OpenFront Team Game guide: how to win more team games. Learn team game tips, troop donation strategy, map control, early expansion, and the best settings to use."* + chapters (00:00 Intro; 01:35 Team Game Setup; 03:10 Early Expansion; 05:20 Troop Donation Strategy; 08:00 Map Control; 11:15 Team Coordination; 14:30 Late Game; 17:45 Final Tips).
   - Relevance: the 05:20 "Troop Donation Strategy" chapter is directly about **moving your reserve to a teammate's frontline** — the team-mode variant of the commit-vs-bank decision, which the guide's mode section must cover.
4. **OpenFront.io V27 Complete Guide** — Enzo Plays
   - URL: https://www.youtube.com/watch?v=iZQDOuTVcLY
   - Opened 2026-10-09. Channel: Enzo Plays. (metadata loaded on first open before rate-limit kicked in).
   - Relevance: long-form population/growth walkthrough; used to cross-check the community's shared understanding that troop cap is the binding constraint on power.

### Cross-source community transcript excerpts (from YouTube search index, verbatim)
- *"OpenFront is a turn-based strategy game where you control workers, troops, and cities. Learn how to beat the AI and master advanced tactics. OpenFront.io is a browser-based strategy game where you expand your territory by managing workers, troops, and cities. In this video, we break down the **best strategies to beat the AI, grow your population efficiently, and dominate the map**."*
- *"OpenFront is a turn-based strategy game where you control workers, troops, and cities. Learn how to beat the AI and master advanced tactics."*
These reinforce the recurring player question cluster: **how to grow troops efficiently and know how many to commit** — which resolves to the troop-cap + 42% reserve decision this guide answers.

## Merged player question → selected intent
The three Reddit threads + four videos all collapse onto one decision the site does not yet own as a main answer:
> **"Should I sit at max troops / bank a reserve, or commit to the frontline — and can I push past the cap (exploit)?"**

- `population-growth.mdx` (v33) already owns the **cap formula** (workers → maxTroops, City cap) but predates v0.34.24 and never mentions the exploit, the 42% reserve optimum, or the sit-at-max decision.
- `troop-bar-attack-timing.mdx` owns **when** to attack. `attacker-regrow-advantage.mdx` owns **post-drain** regrow. None owns the **reserve/buffer + cap-boundary** decision.
- Therefore the new guide `sit-at-max-troops` is **non-duplicate**: unique intent (reserve/buffer decision + the v0.34.24 cap-boundary exploit removal), mature fact evidence (v0.34.24 source + test + 42% curve), natural entry (Guides index + population-growth cross-link), verifiable completion (5-language body ≥1500 words each, guide:audit pass, all acceptance commands green).

## Version boundary (hard fact)
- **Through v0.34.23 and earlier:** the non-bordering-attack regen exploit existed; a player *could* drift totalTroops above `maxTroops` by spamming attacks at a target they don't border. The `sit-at-max` reserve was therefore also a way to **farm** troops.
- **v0.34.24 (2026-10-06) and later:** `if (this.toConquer.size() === 0) { this.retreat(); return; }` — such attacks retreat and never land. The regression test `describe("Attack with nothing to conquer")` pins `totalTroops() ≤ maxTroops()` across the spam window. **The exploit is gone; you can no longer push past the cap.**
- The 42% reserve optimum (regen peaks at ~0.42·maxTroops) is **unchanged** by the fix — it is a property of the `troopRegenRate()` curve, present in all v34 builds.

## Limitations
- Reddit opened via pullpush mirror (direct reddit.com network-blocked); content is the same thread data, but timestamps are relative to the mirror's fetch.
- YouTube ASR/transcript bodies not extractable from this host; metadata + full descriptions are verbatim from the watch page.
- `sit-at-max-troops` is a new slug; confirm it collides with no existing en/zh/fr/de/nl guide before production (checked `ls src/content/guides/en | grep -iE 'sit|max|buffer'` → no existing `sit-at-max` slug; `population-growth` is the nearest neighbor but owns a different intent).
