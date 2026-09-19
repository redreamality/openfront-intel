# Community source pack — SAM Launcher count & ROI (slugs `sam-launchers`)

Date: 2026-09-19 · Topic: how many SAM launchers to buy on the defensive side, at what
level, and when the cost actually pays off. Slug `sam-launchers` (5-language guide
`src/content/guides/{en,zh,fr,de,nl}/sam-launchers.mdx`).

## Official first-party sources

- GitHub source, v0.34.0-beta1 (stable gameplay baseline):
  `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.0-beta1/src/core/execution/SAMLauncherExecution.ts`
  — SAMLauncher unit: cooldown 90 ticks (~9s), build 300 ticks (~30s), one extra
  missile slot per level, intercepts in-flight Atom, Hydrogen and MIRV warheads
  (the MIRV carrier itself is not a targetable object; only the split warheads are).
- GitHub source, v0.34.0-beta1:
  `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.0-beta1/src/core/configuration/Config.ts`
  — `samRange(level) = maxSamRange() - 480 / (level + 5)`, `defaultSamRange()` = 70,
  `maxSamRange()` = 150. So L1 = 70, L3 = 90, L5 ≈ 102, L10 ≈ 118, capping at 150.
  A launcher only counts a target once the nuke is inside its (dynamic) range, so
  range is the binding constraint for a "single hydro lands outside the SAM ring" fail.
- Official docs page (local `src/pages/mechanics/nukes.astro`): `https://openfront.fyi/mechanics/nukes/`
  — lists Atom, Hydrogen and MIRV as nuke types and SAM Launcher as the anti-air
  answer; confirms AI nukes avoid SAM-covered targets where possible.
- Generated data (`src/data/structures.json`, extracted via `scripts`): SAM Launcher
  cost `min(3,000,000, (n+1) × 1,500,000)` → first launcher 1.5M, every further
  launcher or every further level 3M. Missile Silo is a flat 1M. Atoms 750K,
  Hydrogen 5M, MIRV carrier 25M.

## Reddit threads (verified via mirror API, accessed 2026-09-19)

1. "You need 4 SAM to counter 1 hydrogen bomb" — u/miscer1, 2026-05-05,
   https://www.reddit.com/r/Openfront/comments/1t3zj7h/ — the OP's exact math:
   "That's 1.5 + 3 + 3 + 3, or 10.5M to counter 5M rocket." Top answers: defence is
   meant to cost more than offence (u/divided_capture_bro, 27 pts); the game is not
   designed to run forever, so defence cannot be free (u/00rb, 18 pts); u/Frog-eating-
   cellos-9 argues it is actually **5** launchers because a SAM must reach level 5 to
   survive a hydro blast and protect the structures behind it (cites openfront.wiki);
   u/Electronic_Savings35: "it's 10.5 to be invincible from hydros"; u/ThreePointedHat:
   "10.5M counters any 5m rocket... you only need 3 hydrogen bombs to make your money
   back." Limitations: small sample, mixed opinions (4 vs 5), one comment cites a
   community wiki rather than source.
2. "Why don't my SAM launchers work?" — 2025-09-12, score 18,
   https://www.reddit.com/r/openfront/comments/1nesh7p/ — the key mechanic a player
   missed: u/papi-stalin (15 pts) explains nukes are only interceptable during the
   window after launch and before impact, and appear "opaque"/invulnerable outside that
   window; u/A_Harmless_Fly notes a SAM counters one missile at a time and only within a
   distance of the target. Limitations: OP's map/layout unknown; thread drifts into a
   tangential argument about one user's name.
3. "Sams need a rework" — 2025-07-26,
   https://www.reddit.com/r/openfront/comments/1m9u7up/ — the core player frustration
   that anchors this guide: an attacker can lob a hydrogen just outside the SAM ring and
   take the whole cluster. Counter-arguments that frame the design intent: u/Contractor-
   Carrot (4 pts) "This is the point of hydrogen bombs... you need defence in depth and
   multiple SAMs a certain distance apart"; u/Delicious_Smell_9254 "A SAM cost 3m max a
   hydrogen bomb is 5m. To say they are not worth building doesn't pass the math test";
   u/Adsex / u/tokyo_aces sketch a linear "place a SAM next to your city, then one SAM
   ~75% of a Hydro distance away, repeat for 5 SAMs" layout so no single hydro lands in
   a clean spot. Limitations: this is a feature-request / balance complaint thread, so
   positions are emotional; the "5 in a line" idea is one player's heuristic, not a
   sourced optimum.
4. (supporting) "How nukes and sams work in openfront" — 2026-06-22, score 12,
   https://www.reddit.com/r/openfront/comments/1uc8sun/ — newer thread reinforcing the
   intercept-window and range mechanics for new players.

## YouTube (subs verified via yt-dlp, accessed 2026-09-19)

1. "This TESTED THE LIMITS of the SAM LAUNCHER!" — Ultimus_Rex, 2025-06-12,
   https://www.youtube.com/watch?v=3J0mUsVcvvo — live match play showing a player
   placing a first SAM to answer an emerging nuke threat, then a second SAM when an
   opponent with a hydrogen bomb becomes the live threat; frames a 2-3 SAM net as a
   reasonable mid-game defensive spend.
2. "This defense configuration will destroy the meta..." — Ultimus_Rex, 2025-06-16,
   https://www.youtube.com/watch?v=d4WNUOQeFc8 — late-game "SAM net" defence: a
   keeper silo plus multiple SAMs plus cities behind them to survive hydrogen bombs;
   documents the practice of keeping a back-up SAM and a spare silo.
3. "Can 1250 SAMS Stop a MIRV?" — Enzo Plays, 2025-05-30,
   https://www.youtube.com/watch?v=OhsWefrclk4 — the strongest quantitative evidence
   in this pack: a controlled cost-vs-MIRV test at 5, 9, 25 and 50 launchers. 5 and 9
   fail (9 ≈ the cost of one MIRV); **25 launchers is the first size that reliably
   defends a small area against a MIRV**. Confirms the player intuition that "20 SAMs
   seem to do nothing" against a MIRV because 20 < the ~25 needed.

## Merged player question & decision the guide answers

Across all sources the recurring decision is not "is a SAM good?" but "how many, at
what level, and where, so a 5M hydrogen (or 25M MIRV) cannot land in a clean spot?"
The community's raw answers cluster on 4 (bare minimum to absorb a hydro), 5 (to survive
the hydro blast at level 5 + protect the ring), or ~25 (to survive a MIRV), with cost
running 10.5M (4×) to 1.5M + 3M×(N-1). The guide turns these anecdotes into a tiered
framework tied to the verified cost curve, range curve and intercept-window mechanic,
and to the attacker's counters (hydro outside the ring, atom-spam to overwhelm the 9s
cooldown, MIRV to defeat a low count).

## Version boundary

All numbers verified against v0.34.0-beta1 source and v34 generated data; current
release v0.34.11. SAM cost, range-per-level and 90-tick cooldown are unchanged across
this series per the generated structures manifest. Numbers are stated as of that
baseline; a future rework of SAM range or cooldown would change the tier math.
