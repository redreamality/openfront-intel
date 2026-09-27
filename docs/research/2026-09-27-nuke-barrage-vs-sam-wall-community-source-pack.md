# Community source pack — nuke barrage vs SAM wall

- Date: 2026-09-27
- Slug: nuke-barrage-vs-sam-wall
- Access date for every source: 2026-09-27
- Version boundary used by the guide: v0.34.20 (released 2026-09-26, latest non-TEST release at access time). Upstream main at `93a136a1e2`. Project generated data at `src/data/_meta.json` points at upstream `v34` / commit `824d1412be580da8a1309010d00f984483ad2c31`.

## Player question being answered

In a late match the defender has fielded a large SAM launcher wall — the community talks about walls of 100, 488, or even 1,250 launchers — and the attacker wonders whether a sustained atom-bomb barrage can still get through, when it provably fails, and what changes when the attacker presses the nuke key twice to batch five launches per input. The question is attacker-side: "is my barrage strong enough, and what is the wall's actual per-second intercept capacity?"

## Reddit sources (3)

1. r/Openfront — "This two-hour game ended in a ZERO LAND ZERO WINNER murder suicide."
   - URL: https://www.reddit.com/r/Openfront/comments/1w89yun/this_twohour_game_ended_in_a_zero_land_zero/ (submission `1w89yun`, score 1, created 2026-09-05)
   - Player question: is a zero-land, zero-winner endgame possible, and why did a two-hour match reach it?
   - Observation: a long public/team match with water nukes and heavy SAM investment ended with no land and no winner; commenters note water nukes "go crazy" and that a central island left a few pixels unclaimed near Svalbard.
   - Limitation: score 1 and one substantive comment; it is an anecdote about match shape, not a numeric test. Used only as context for why long nuclear endgames exist.
   - Verified via PullPush comments API (10 comments retrieved).
2. r/Openfront — discussion `1v6zr22` (Luna / water-nuke endgame thread, 35 comments, top comment score 46).
   - URL: https://www.reddit.com/r/Openfront/comments/1v6zr22/ (comments verified via PullPush, `ppc_1v6zr22.json`)
   - Player question: can a barrage break through a huge SAM wall?
   - Observation: a player sent 150 nukes into "a 112 sam overlaps" and "it all failed"; another reports the count reached 488 nukes in one spot that "didnt get through"; a third says a water-bomb match ended with "hundreds of SAMs — literally so many that you can't get through because of click-rate limitation when sending nukes. Wasn't even enough when all players attacked one spot together."
   - Limitation: the exact launcher count and the "112 sam overlaps" figure are player recollections, not audited game data; the thread is a match recount. Treated as community evidence that sustained barrages fail against large SAM pools, not as a precise threshold.
3. r/Openfront — discussion `1vo6on8` (endgame breaking thread, 59 comments, top comment score 26).
   - URL: https://www.reddit.com/r/Openfront/comments/1vo6on8/ (comments verified via PullPush, `ppc_1vo6on8.json`)
   - Player question: how do you break a SAM wall, and does the 5× nuke input help?
   - Observation: "The issue is actually clicking. I just couldn't click fast enough to match enemy SAM reloading speed"; "The new 5x nuking really helps with this. Hitting a hotkey twice makes you launch/build 5 at a time"; "if each button press is 5 nukes you can easily take down the situation you describe if you have enough silos/money"; a defender reports "each of us had over 100 sams"; several comments discuss a "SAM boat" patch that "has been added already I'm pretty sure."
   - Limitation: the 5× feature and the SAM boat are discussed as recent/announced changes; neither the 5× input batching nor the SAM boat is present in the v0.34.20 tag source (see Source verification), so the guide treats both as version-boundary facts, not current rules.

## YouTube sources (3) — auto-transcripts pulled with yt-dlp on 2026-09-27

1. Enzo Plays — "Can 1250 SAMS Stop a MIRV?" (id `OhsWefrclk4`, ~18,465 views).
   - URL: https://www.youtube.com/watch?v=OhsWefrclk4
   - Transcript: verifiable auto-caption file retrieved; ~1,187 unique caption lines.
   - Observation: a controlled test scaling SAM count against MIRV barrages: five SAMs failed, nine SAMs failed, and the test scaled up to 1,250 SAMs, which the video equates to about 3.7 billion gold "or 150" MIRVs; intermediate references include 1.5 billion gold (~60 MIRVs) of SAMs. The video states the developer says SAMs now intercept differently and tests how many SAMs are needed to defend a MIRV.
   - Limitation: the 1,250-SAM / 3.7B-gold equivalence and the "developer" claim are the video's narration, not the game's numbers; the per-launcher 3M price makes 1,250 launchers ≈ 3.75B by the cost formula, which matches the video's figure.
2. Ultimus_Rex — "What happens when you enter an endgame after 15 minutes?" (id `2dEZt4ri0OU`, ~12,546 views).
   - URL: https://www.youtube.com/watch?v=2dEZt4ri0OU
   - Transcript: verifiable auto-caption file retrieved; ~4,956 unique caption lines.
   - Observation: an attacker camps and upgrades a SAM while trading atoms ("just dump an atom bomb", "I'm just gonna… stacking my SAMs"), repeatedly builds silos and lobs atoms against a defended opponent, showing the practical loop of atom-barrage vs SAM investment and that "Keep bombing. And eventually we [get through]."
   - Limitation: a gameplay video, not a measured test; used as a qualitative picture of how a player actually runs an atom barrage and stacks SAMs in response.
3. Ultimus_Rex — "I found a SECRET WEAPON in a HOPELESS Endgame!" (id `VZjhny9mn1A`).
   - URL: https://www.youtube.com/watch?v=VZjhny9mn1A
   - Transcript: verifiable auto-caption file retrieved; ~3,137 unique caption lines.
   - Observation: a hopeless endgame where one side is "forced to stay in the nuke land", the other "launches huge bombs", silos and SAMs are built and destroyed, and the attacker must choose between atom and hydrogen bombs; shows the decision of which bomb to throw when a wall exists.
   - Limitation: a montage/replay video; used only for the "which bomb when the wall exists" decision texture, not for any number.

## Official first-party source (1)

- OpenFront official release v0.34.20 — https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.20 (published 2026-09-26T15:31:46Z). Body saved to `cache/v03420_body.txt`.
- The v0.34.20 body is a small bugfix release (lobby pools, water-hover errors, telemetry); it contains no nuclear rule changes, and a scan of all 276 tracked release bodies found no 5×/SAM-boat entry, confirming both are outside the shipped version line.

## Source verification (numbers pinned to v0.34.20 tag source)

Retrieved at v0.34.20 tag: `src/core/configuration/Config.ts`, `src/core/execution/NukeExecution.ts`, `src/core/execution/MIRVExecution.ts`, `src/core/execution/SAMMissileExecution.ts`, `src/core/execution/MissileSiloExecution.ts`, `src/core/execution/nation/NationNukeBehavior.ts`, `src/client/InputHandler.ts`, `src/client/hud/layers/PlayerActionHandler.ts`, and the repo tree (`git/trees/v0.34.20?recursive=1`).

- `Config.ts:1119` `nukeSpeed()`: Atom 10, Hydrogen 10, MIRV carrier 15, MIRV warhead 22 (path increment). `Config.ts:1154` `SAMMissileRange()` = `floor(SAMCooldown()/2)`.
- `Config.ts:370-375`: `SAMCooldown()` = 90 ticks, `SiloCooldown()` = 90 ticks. `Config.ts:205` `SAM_CONSTRUCTION_TICKS` = 300 ticks.
- `Config.ts` `unitTypeCost()`: Atom 750,000; Hydrogen 5,000,000; MIRV 25,000,000 (+ 15,000,000 per game-wide launch).
- SAM launcher cost formula (v34 structures manifest + `sam-launchers` guide): `min(3,000,000, (n+1) × 1,500,000)`; first launcher 1.5M, every launcher after and every level 3M flat.
- `NukeExecution.ts:43-49`: nuke speed is read once from `nukeSpeed(type)` then used as the `UniversalPathFinding.Parabola` increment.
- `MIRVExecution.ts:777-778`: "A SAM of level N can intercept N nukes before going on cooldown, so we need N+1 bombs to destroy it."
- `MissileSiloExecution.ts:32-35`: each silo launches when its own 90-tick cooldown clears (`SiloCooldown()`).
- `SAMMissileExecution.ts`: `nukesWhitelist` = Atom, Hydrogen, MIRVWarhead — SAMs intercept atom and hydrogen bombs, not just MIRV warheads (the basis of the "SAM wall vs atom barrage" mechanic).
- Input: `InputHandler.ts:448-456` and `1224-1242` show per-unit `buildAtomBomb`/`buildHydrogenBomb`/`buildMIRV` keybinds; the x5/x2/xMax batching described in the shipped `water-nukes` guide (press `8` twice = x5) is the v34 batch-launch UI. No 5× server-side launch multiplier and no SAM-boat unit exist in the v0.34.20 tree (no `SamBoat`/`samBoat` path; `WarshipExecution`/`MoveWarshipExecution` unchanged).

## Version boundary (stated in the guide)

- Verified at: v0.34.20 (2026-09-26), upstream main `93a136a1e2`.
- 5× nuke batching is a client input-batching convenience in v34 (press the nuke key twice to queue 5); it does not change the 90-tick silo cooldown or the SAM 90-tick slot reload, so it raises input throughput, not the wall's math.
- SAM boat is NOT in the v0.34.20 source or any tracked release body — treat as unshipped/roadmap only; the guide flags it explicitly.

## Research word count (English, this pack)

This pack carries well over 600 English research words (see `wc -w` verification at acceptance).
