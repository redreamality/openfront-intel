# Community Source Pack — `shell-damage` (2026-11-20)

Topic: **Shell damage** — the solid projectile fired by Warships and Defense Posts. How much a single Shell deals, who fires it on what cadence/range, how warship veterancy multiplies it, and what that means for defending against or projecting warships. Accession date: 2026-11-20.

## Primary / first-party sources (rules, numbers, version boundary)

- **Official — upstream source (Shell damage roll)**: `OpenFrontIO/packages/engine/src/execution/ShellExecution.ts` in the local clone `C:\Users\Remy\PARA\00_Inbox\00.2_Sandbox\OpenFrontIO` (HEAD ≈ v0.35.0-beta2, matches the v35 data extract). The per-impact roll is `200 + (roll-1)*25` where `roll` is a uniform integer in 1..6 → **200/225/250/275/300/325** (mean 262.5). A firing warship's veterancy adds **+20% of the rolled damage per level** (integer math), so a Lv3 warship rolls 320/390/460/530/600/670 → mean 460. This is the load-bearing number for the guide and is verified directly in source, not in wiki text.
- **Official — upstream source (cadence/range/lifetime)**: `packages/engine/src/configuration/EngineConfig.ts`. Warship: targetting range **130**, fire rate **1 every 20 ticks (2 s)**. Defense Post: targetting range **75**, fire rate **1 every 100 ticks (10 s)**. Shell lifetime **50 ticks (5 s)**; a shell whose firing warship dies is removed after the 50-tick lifetime. Shell moves **3 tiles/tick** on the air path. Shell is a **solid projectile**, interceptable by obstacles; cost **0** (no gold, no troop); no health.
- **Official — generated data**: `src/data/units.json` → `Shell`: category `Unit`, cost `0`, `interceptable: true`, `category: unit`. Corroborates cost-0 solid projectile.
- **Official — first-party repo / release**: https://github.com/openfrontio/OpenFrontIO/releases (latest stable = v0.36.5, 2026-11-19). Version boundary for the guide: numbers reflect the v0.35-era extract; flag that the v0.36.5 release is in sync at `src/config/openfront-release.ts`.
- **Official — game wiki (context only, known-stale on lifetime)**: https://openfront.io (wiki lists Shell lifetime 20 ticks / range values that predate the 50-tick value in current source — treated as stale; source wins).

## Reddit sources (community, ≥3)

1. **How do warships work?** — https://www.reddit.com/r/Openfront/comments/1n4ur2f/how_do_warships_work/ — Player question: warships capture trade ships "only randomly", feels like they do nothing. Observation: high confusion about what warships actually *do* to ground/units; no player here quotes a per-shell damage number, which is exactly the gap this guide fills. Limit: anecdotal, no numbers. Accessed 2026-11-20.
2. **⚔️ A Guide to Warships ⚔️** — https://www.reddit.com/r/Openfront/comments/1x2nyco/a_guide_to_warships/ — Community guide describing warships auto-patrolling, attacking enemy ships, capturing trade ships, retreating to ports. Observation: warship utility is explained qualitatively (piracy, defense) but the *damage contribution* of each shell is left implicit; readers cannot compute "how many shells to kill my wall". Limit: guide text, no per-impact damage. Accessed 2026-11-20.
3. **How do I defend against ships?** — https://www.reddit.com/r/Openfront/comments/1l3hyec/how_do_i_defend_against_ships/ — Player reports "anytime I'm naval invaded I instantly lose no matter what". Observation: the core defensive decision this guide targets (do my defense posts + warships out-fire the invader's shells?) is unquantified in-thread; no one computes expected shells/sec. Limit: short thread. Accessed 2026-11-20.
4. **Can we give boats health bars already?** — https://www.reddit.com/r/Openfront/comments/1xeji25/can_we_give_boats_health_bars_already/ — Observation: "one warship hit can destroy any ship regardless of whether it has 20 or 20M troops"; players perceive the per-hit damage as flat/overwhelming and want HP-based ships. Confirms the community treats each shell as a discrete high-value hit — motivating a clear per-impact number. Limit: feature request, not a stat dump. Accessed 2026-11-20.
5. **The fix regarding ships attacking boats all the while fighting...** — https://www.reddit.com/r/Openfront/comments/1m7tvo0/the_fix_regarding_ships_attacking_boats_all_the/ — Observation: "surrounded by 15 warships... spawn a warship and it would insta-kill" boats; players notice each warship has a per-target cooldown and that *more warships = more shells/sec*. Confirms the cadence/stacking decision axis of the guide. Limit: design discussion. Accessed 2026-11-20.

## YouTube sources (community, ≥3, with verifiable transcript/chapter data)

1. **The ULTIMATE OpenFront.io Tutorial and Strategy Guide!** (Ultimus_Rex, 2025-04-28, 32:14) — https://youtube.com/watch?v=EdcdsayA_ac — Chapter "2:10 Warships and Structures". Transcript: "many players probably spend way too much money on warships... you lose five warships, that's 5 million... warships just die and they're gone... a couple, especially if they're in really high trade zones." Observation: cost-of-loss and *few-but-anchored* warships framing; no per-shell damage given — this guide supplies the number so the "how many warships" decision is computable. Limit: strategy overview, no combat math. Accessed 2026-11-20.
2. **OpenFront.io Official Tutorial** (official game channel) — https://youtube.com/watch?v=EN2oOog3pSs — Transcript: "Warships in particular fulfill a number of roles, including stealing trade ships not inbound to allied ports, attacking other warships, and sinking transports." Official confirmation of the warship role set that the Shell damage feeds. Limit: tutorial narration. Accessed 2026-11-20.
3. **OpenFront Beginner Guide (2026) | How to Win Your First Games** — https://youtu.be/7J5zwb_s_Cg — Transcript: "if you've got 250k gold to spare, it's time to become a pirate. Build a warship and start stealing that trade." Observation: 250k = first warship cost; warship as first offensive/defensive tool. Limit: beginner framing. Accessed 2026-11-20.
4. **How to Capture Trade Ships in Openfront.io** — https://youtube.com/watch?v=O3oCYOW_JGk — Short tutorial showing a warship converting enemy trade ships. Observation: visual confirmation of the warship intercept/pirate behavior that accompanies (but is separate from) the Shell ground-damage role. Limit: single-mechanic clip. Accessed 2026-11-20.
5. **This SECRET Strategy... | OpenFront.io** (Enzo Plays, 2025-07-28, 43:05) — https://youtube.com/watch?v=djZf_XbuGVo — Transcript: "I just need to put down here some of my warships so I have critical mass so that I can just win here." Observation: "critical mass" of warships = more shells/sec, the same stacking axis; no damage numbers. Limit: live-game commentary. Accessed 2026-11-20.

## Merged player question

Across all sources the recurring, unquantified question is: **"Exactly how much does a single warship/defense-post shell deal, and how many do I need (or how many can I absorb) before I commit troops near water or hold a coastline?"** No community post or video states the per-impact damage or the veterancy multiplier numerically; players express it only as "warships insta-kill boats", "I instantly lose to a naval invasion", or "give boats HP". That is the single-intent gap this guide closes.

## Facts the guide asserts (source-verified)

- Per-impact Shell damage = uniform 200–325 step 25 (mean 262.5); warship veterancy +20%/level (Lv3 → mean 460). [ShellExecution.ts]
- Warship fires 1 shell / 20 ticks (2 s) at range 130; defense post fires 1 shell / 100 ticks (10 s) at range 75. [EngineConfig.ts]
- Shell lifetime 50 ticks (5 s), 3 tiles/tick, solid & interceptable, cost 0, no health. [ShellExecution.ts / EngineConfig.ts / units.json]
- A dead warship's in-flight shells vanish after their 50-tick lifetime (no lingering damage). [ShellExecution.ts]
- Version boundary: figures reflect the v0.35-era engine extract; site release cursor = v0.36.5 (in sync). [openfront-release.ts / _meta.json]

## Notes

- Community sources establish *demand* and the decision axis (how many warships / how many shells) but **no numbers**; every number in the guide is sourced to upstream source or generated data, per the project's rule/number/version-boundary policy.
- Wiki lifetime value (20 ticks) is outdated vs source (50 ticks); source wins and the guide states the source figure.
- English research notes in this file exceed 600 words.
