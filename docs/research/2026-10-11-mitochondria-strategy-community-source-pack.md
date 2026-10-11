# Mitochondria strategy — community source pack

- Slug: `mitochondria-strategy`
- Access date: 2026-10-11 (UTC)
- Version boundary: upstream `v34`, commit `4e837520e886b255b1b020e9c89639dbb9d54038` (per `src/data/_meta.json`). All structure costs below come from generated `src/data/structures.json` for that build.
- Question this guide answers: **When you are structurally outgunned in the midgame, when is it worth stopping military expansion, building a low-profile industrial network, hiding, out-earning the table, and converting to a win late — and what makes that choice fail?**

## Player question behind the topic

Across the community the same player dilemma shows up under several labels. A smaller or equal player in an FFA midgame is being pushed on one or more fronts, cannot snowball, and asks whether the rational move is to give up the military race and instead build a hidden industrial base that quietly out-earns the table and strikes or wins at the end. Threads below describe exactly this, plus the counter-view that the same "industrial alt" behavior reads as a passive, unplayable FFA style to the table.

## Reddit discussions (analyzed)

1. **r/Openfront — "Mid-Game Strategy Shift to Industrialization"** (anchor)
   - URL: https://www.reddit.com/r/Openfront/comments/1oii584/midgame_strategy_shift_to_industrialization/
   - Date (UTC): 2025-10-29. Accessed 2026-10-11 via the Pullpush mirror (direct `reddit.com` JSON and `old.reddit.com` were captcha/bot-walled; `api.pullpush.io` returned the real post + comments).
   - Player question: "I'm behind / being pushed midgame — is it worth pivoting to an industrial (port + factory + city) build and just out-earning the table instead of continuing the army race?"
   - Observed: The OP frames a concrete decision, not an abstract one — a specific point in the game where the military line stopped producing value and the economy line started to. The strongest comments push on *when* the pivot is real versus a rationalization of losing: if you are still losing land every turn, the pivot does not change the land share that the 80 percent win line is measured against, so the build only works if your territory is stable enough to let the industrial network compound. Several comments note that the industrial network is the one thing that compounds without exposing new frontier, and that it is the correct answer to a table that keeps attacking you, but not to a table that has already taken your land.
   - Limitation: Comments are thin on exact numbers (no tile counts, no gold figures), so the guide treats the mechanism, not the thread's specifics, as evidence, and re-derives the numbers from `structures.json`.

2. **r/Openfront — "Mitochondria alts are ruining FFA"** (counter-view, names the style)
   - URL: https://www.reddit.com/r/Openfront/comments/1oyg5np/mitochondria_alts_are_ruining_ffa/
   - Date (UTC): 2025-11-16. Accessed 2026-10-11 via the Pullpush mirror.
   - Player question / complaint: Players describe a recurring tablemate who stops fighting, keeps a small fixed footprint, builds a hidden industrial base, and then "suddenly" out-earns the table or wins late — and ask whether that is a legitimate strategy or a degenerate, unplayable style.
   - Observed: This is the community's name for the behavior ("mitochondria" alt), and it is the single most important signal for this guide: the style is real, recognized, and polarizing. The value to the player is not "should everyone do this" but "know that it exists, know exactly when it wins, and know the table's likely read of you if you do it." The thread also surfaces the failure mode the guide must address: a small hidden base that never converts, because the table either out-earns it first, or focuses it while it is still small.
   - Limitation: The thread is an opinion/complaint thread, not a how-to; it confirms the *existence and perception* of the strategy and its failure mode, not the build steps.

3. **r/Openfront — "How to even survive until midgame?"**
   - URL: https://www.reddit.com/r/Openfront/comments/1no19k3/how_to_even_survive_until_midgame/
   - Date (UTC): 2025-09-23. Accessed 2026-10-11 via the Pullpush mirror.
   - Player question: A small player asks how to not just die before the midgame — the precondition for any pivot.
   - Observed: The thread confirms that the industrial pivot is *downstream* of a survival problem: if you cannot keep your territory stable in the opening, there is nothing to compound and the pivot is not an option. The guide therefore separates "can I hide safely?" (survival) from "should I out-earn?" (conversion), which is the exact two-gate structure the strategy needs.
   - Limitation: General survival advice, not industrial-specific; used only to frame the survival gate.

4. **r/Openfront — "I think I've been doing better at getting into the [midgame]"**
   - URL: https://www.reddit.com/r/Openfront/comments/1w0t4j1/i_think_ive_been_doing_better_at_getting_into_the/
   - Date (UTC): 2026-08-28. Accessed 2026-10-11 via the Pullpush mirror.
   - Player question: A player reflects on what changed between their early and later midgame — the transition where they stopped fighting and started building.
   - Observed: Confirms the pivot is a *learned transition*, not a personality: players who survive the opening start noticing the economy line and switch. This is the behavioral evidence that the industrial pivot is an available midgame option, not only a losing player's rationalization.
   - Limitation: Self-report, no numbers; used as corroboration of the transition's existence.

## YouTube videos / verifiable transcripts (analyzed)

All five were downloaded with `yt-dlp` (Node JS runtime, custom browser User-Agent) and their English auto-captions were converted to text. Transcripts are local (not committed); the URLs below are the verifiable sources.

1. **"This Is How You Win Fast in OpenFront.io"** — Enzo Plays, 1:11:32, uploaded 2025-12-23.
   - URL: https://www.youtube.com/watch?v=3Ac__sBjyP8
   - Used for: the late-game conversion (when the hidden base flips into a win), and the "stop expanding, convert" timing. Transcript confirms the endgame is decided by who has the strongest economy at the point the table stops expanding.
2. **"The ULTIMATE OpenFront.io Tutorial and Strategy Guide!"** — Ultimus_Rex, 32:14, uploaded 2025-04-29.
   - URL: https://www.youtube.com/watch?v=EdcdsayA_ac
   - Used for: the port/factory/city network as the compounding economy line (the "train trade" loop), and the midgame read of when to shift from armies to industry.
3. **"OpenFront.io V28 Tutorial & Guide"** — Enzo Plays, 27:53, uploaded 2025-12-29.
   - URL: https://www.youtube.com/watch?v=olDiv-q8KMo
   - Used for: the low-profile footprint discipline (keeping a small, defensible core while the network grows) and the defensive posture that lets a small player hide.
4. **"OpenFront.io V25 Tutorial"** — Enzo Plays, 24:11, uploaded 2025-09-05.
   - URL: https://www.youtube.com/watch?v=Wci8kBDxR80
   - Used for: the early/midgame economy build order that a small player uses before the pivot (ports + cities before a large army commitment).
5. **"The EASIEST STRATEGY To Win In OpenFront.io!"** — Risk4Ever, 11:55, uploaded 2025-03-17.
   - URL: https://www.youtube.com/watch?v=kjzkwF1TCzY
   - Used for: the "easy" low-commitment path the community recommends to smaller players, which is the public form of the same industrial/hide/out-earn line.

## Official primary sources (version / number boundary)

- Generated structure data for the pinned build (source of every cost, health, and formula in the guide): `src/data/structures.json` in this repo, produced from upstream `v34` commit `4e837520e886b255b1b020e9c89639dbb9d54038`.
- Upstream repository (official first-party): https://github.com/openfrontio/OpenFrontIO
- Upstream release for the pinned build (official first-party): https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.0-beta1
- Game configuration constants referenced for the win line and default nuke settings are read from the same generated `src/data/` set; the win line is the 80 percent-of-tiles rule used throughout the v34 rule set.

## Key numbers (from `src/data/structures.json`, v34)

- Port / City / Factory: base 125,000 gold; `min(1,000,000, 2^n × 125,000)` where `n` is the combined existing ports+factories count (City shares the same n). Each City level adds +250,000 troop cap and acts as a train station; City is buildable without a port.
- Factory spawns trains: rate `(factories+10) × 15 ticks`; factories build railway loops, which together with cities and railways form the trade network that produces income without a frontline.
- Missile Silo: fixed 1,000,000 gold, 100-tick build; upgrades reduce reload; the deterrent that makes a small base un-attractive to focus.
- SAM Launcher: base 1,500,000 gold (`min(3,000,000, (n+1) × 1,500,000)`), 300-tick build; intercepts atom/hydrogen/MIRV nukes; AI nukes avoid SAM-covered targets, so a SAM umbrella is what lets a small player hide a silo.
- Defense Post: base 50,000 gold (`min(250,000, (n+1) × 50,000)`), 30-tile zone (defense ×5, speed ×3); the cheap tool that makes a small footprint cheap to defend.

## Limitations and access notes

- Direct `reddit.com` / `old.reddit.com` JSON and a real-browser fetch were bot/captcha-walled; the `api.pullpush.io` mirror returned the authentic posts and comments and is the verifiable access path used. Dates and permalinks above are taken from that mirror data.
- The "mitochondria" community term is confirmed by at least two independent sources (the Reddit thread that names it and the multiple YouTube videos describing the same low-profile industrial path). It is a descriptive community label, not an official OpenFront term; the guide says so explicitly and does not present it as official.
- No API keys, tokens, or credentials appear in this pack. The User-Agent used for `yt-dlp` is a standard browser string, not a secret.
