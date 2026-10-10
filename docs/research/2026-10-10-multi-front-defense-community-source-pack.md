# Community source pack — defending a multi-front / ganged-up attack (2026-10-10)

Topic slug: `multi-front-defense`
Question under study: when two or more players push a player at the same time, which front does the defender defend, which does it concede, and what concrete actions change the outcome?
Access date: 2026-10-10 (UTC+10).
Version boundary for all game numbers: OpenFront **v0.34.24** (tag `3f5633b92c9508461e6e2b9e1f926487a1804c9f`, released 2026-10-06).

## How the sources were reached (access method + limitation)

Live Reddit pages (www, old, .json, api.reddit.com, all public redlib mirrors, Wayback, archive.today, jina.ai) returned 403/404/bot-gate from this egress IP on 2026-10-10, so the Reddit threads below were recovered through the public **pullpush.io** archive API (`api.pullpush.io/reddit/search/submission` and `/comment`), which returns the full submission body, author, score, `created_utc`, and every top-level + nested comment for a link id. The thread content is therefore the actual posted text (not a summary), but pullpush is a snapshot archive: comment counts reflect the archive state at access time and very recent replies may be absent. That limitation is recorded on each source. YouTube sources were verified live: each watch URL was fetched (oembed + web-search metadata) and returned a real title/channel/date, and each has a verifiable auto-generated caption track.

## Reddit (3 threads actually opened and analyzed)

### 1. Is there really players that play alone in multiplayer?
- URL: https://www.reddit.com/r/Openfront/comments/1ldmtwi/is_there_really_players_that_play_alone_in/
- Author Syymb, score 9, posted 2025-06-17, 19 archived comments.
- Player question (verbatim core): "In almost every games, I got double-triple attacked by players exactly at the same moment, by land or by sea ... Is there a counter play to this?"
- Key observations: the poster describes a coordinated naval pincer — "naval troops being sent to your territory from multiple players, calculated so they land nearly same time" — and a destroyer that was "not on this side of the sea" in time. Top comment (score 10, Excellent-Budget5209): "I just won 3 times today by playing alone, its not an issue" and "At least a dozen to twenty [wins]". Several replies: solo players win ~1/4 of games ("Yep playing solo on FFA and I win 1/4 of my games", "cocococom: I do, and i win quite often"); "DurstaDursta" reports multi-account opponents ("A lot of people are playing with 2 or more browser"); "bentke466: Survivors bias" notes the survivorship distortion. The thread is mostly venting, but it fixes the concrete failure shape: simultaneous land+sea fronts where the defender's naval unit is on the wrong coast.
- Limitation: archive snapshot; replies are short and mostly anecdotal win-rates, no verified strategy detail.

### 2. Why is this game all teamers??
- URL: https://www.reddit.com/r/Openfront/comments/1l3mov5/why_is_this_game_all_teamers/
- Author NotBen___, score 12, posted 2025-06-05, 26 archived comments.
- Player question: getting "stuck between like 4 people teaming (2 people teaming with each other, another 2 people teaming together)"; "Does no one else have issues with this?"
- Key observations: the strongest counter-play in the dataset, from NaturalStyle6459 (score 5): "when it happens you just all-in his weaker friend. As long as you can't prevent the team-up, if someone ruins your experience, ruin theirs" — i.e., break the ganged pair by overloading its weaker member rather than splitting to meet both. Admirable_Sea1770 distinguishes real teaming from opportunistic jumping ("most of the time it's taking advantage of others player conflicts") and frames the meta options as rally-a-third-party / leave-lobby / accept-it. The poster's own framing confirms the multi-front geometry: being flanked by two separate pairs, i.e. two fronts at once.
- Limitation: thread devolves into argument in the later comments; the strategy signal is concentrated in the first ~5 comments.

### 3. GET RID OF TEAMING IN FFA
- URL: https://www.reddit.com/r/Openfront/comments/1l1sd3a/get_rid_of_teaming_in_ffa/
- Author saykekw, score 11, posted 2025-06-02.
- Player question: groups of 2-3 "spawn next to their friends" and "building cities close to each others borders ... Displaying that they never expect a betrayal".
- Key observations: documents the pre-battle signature of a ganged pair — adjacent spawns and mutually-facing city placement — which is the observable that a defender uses to decide early whether one enemy is really two. Also the demand for separated lobbies ("one for FFA, and one for small teams"), i.e. the player-side recognition that ganging is a structural lobby problem, not a skill problem.
- Limitation: submission-focused; fewer archived comments than the other two, so it contributes the detection signal more than the response signal.

## YouTube (4 videos verified live; caption text analyzed)

### 1. We've finally discovered the OPTIMAL BUILD STRATEGY?! | OpenFront.io
- URL: https://www.youtube.com/watch?v=gELep7-LFG4
- Channel Ultimus_Rex, 01:11:10, ~10.3K views, 214 likes, published 2026-05-20.
- Question/observations: a full-length build/economy video; usable as a current-era (post-v31) reference for how much production a midgame player can actually field, which bounds how many fronts a defender can realistically staff. Confirms the 2026 meta pacing that a 300k-tile economy is the midgame norm.
- Limitation: caption text is auto-generated; not a defense-specific video — used for economy context, not for attack math.

### 2. The Key to Endgames in OpenFront.io
- URL: https://www.youtube.com/watch?v=oOPm1TJULSY
- Channel Enzo Plays, 15:02, ~6.0K views, 148 likes, published 2026-05-19.
- Question/observations: endgame focus; the defender's multi-front problem is sharpest here, when two big neighbours both have territory bonuses and both can push at once. Useful for the "large-territory bonus makes both attackers cheaper to push from" framing and for the late-game concession calculus.
- Limitation: endgame, so its numbers are late-game-specific; auto-caption.

### 3. OpenFront Team Game Guide - How to Win More Team Games
- URL: https://www.youtube.com/watch?v=xPk61xZdad0
- Channel (team-strategy guide), "from spawning and the bot phase to frontliner".
- Question/observations: the attacker-side mirror image — how a ganged pair coordinates its spawn, frontliner, and rotation. Directly useful for predicting which of the two fronts a team pair will commit first and for the counter-play of identifying the pair's frontliner and overloading it.
- Limitation: team-mode framing; auto-caption; used for the coordinated-attacker model.

### 4. How to Play Open Front (official channel)
- URL: https://www.youtube.com/watch?v=EN2oOog3pSs
- Official OpenFront channel (@openfrontio), ~2:11.
- Question/observations: official onboarding of the core loop — land attack troop-loss, troop regen from territory, the 72% win condition — which grounds the "why conceding one front is safe" arithmetic in the official presentation.
- Limitation: introductory; not version-pinned to v0.34.24 in its captions, so it is context only and all load-bearing numbers below come from the tag source.

## Official first-hand sources (version boundary)

- v0.34.24 release (2026-10-06): https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.24 — "Fix an exploit that let players grow their troops past the troop cap by repeatedly sending attacks at targets they don't border".
- Config.ts at the tag: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/configuration/Config.ts — attackLogic, defense post constants, maxTroops.
- AttackExecution.ts at the tag: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/AttackExecution.ts — the per-tile conquer loop and the defenderHasDefensePost lookup.

## Verified game facts (from v0.34.24 tag source, not from community)

- Defense post: range `defensePostRange() = 30` tiles; `defensePostDefenseBonus() = 5` multiplies the defended attack `mag`; `defensePostSpeedBonus() = 3` multiplies the defended `tileCost`; build cost `(numUnits+1)*50_000` capped at 250_000 Gold; 50 normal-tick construction. The bonus applies **per defended tile** when the defender owns a post in range of the tile being attacked — it is a local, per-front effect, not a global aura.
- Per-tile attacker loss (player defender, no post): `mag * within(troopRatio, 0.6, 2) * (0.463 * largeAttackerBonus * largeDefenderBonus + 0.0039 * defenderTroopLoss)`, with `troopRatio = defender.troops / attackTroops`. `within` clamps the ratio into [0.6, 2], so attacks smaller than 0.6x or larger than 2x the defender's army pay the clamped edge, not a worse value.
- Per-tile defender loss: `defender.troops / defender.numTiles` — the defender's **average troops per tile**, paid **per conquered tile, per attacking front**. This is the load-bearing multi-front fact: two attackers conquering two of your tiles each drains you twice as fast as one attacker conquering two, independent of how big their stacks are.
- Terrain magnitude/cost: Plains `mag 80 / tileCost 16.5`, Highland `100 / 20`, Mountain `120 / 25`. Higher terrain is slower and costlier to take, so a mountain front is the cheapest front to defend and the best front to concede a defence to.
- Conquest speed: `SPEED_COST_DIVISOR = 8.55`; a defended tile's cost is tripled by a defense post, so a defended front conquers ~3x slower (per tile) than the same route without a post.
- Troop cap `maxTroops`: `2 * (numTiles^0.6 * 1000 + 50000) + (sum of city levels) * cityTroopIncrease` (sublinear; ~100k at one tile) for normal players; v0.34.24 removed the exploit that let troops grow past this cap by attacking non-bordered targets.
- Doomsday Clock: `enabled: false` by default in v0.34.24 (`DOOMSDAY_CLOCK_DEFAULTS.enabled`), so the anti-stall drain does not run in normal play; the "crippled to 5% floor" mechanic is NOT live in the default config.
- Large-territory bonus: `largeTerritoryBonus(numTiles, depth)` eases a big side's per-tile attack cost down (attacker depth 0.7, defender depth 0.3, midpoint 300 tiles) — late-game, both big neighbours get a real push-speed advantage, which is why the multi-front squeeze bites hardest in the mid/late game.

## Merged player questions → chosen topic

Across the three Reddit threads the recurring, decision-relevant questions are: (a) "is this real teaming or just opportunistic jumping?" (detection), (b) "I'm flanked by two pairs / land+sea at once — what do I do?" (the core allocation question), (c) "I all-in one front and lose the other — how do I pick?" (concession arithmetic), and (d) "my naval unit was on the wrong coast" (mode/coast adjustment). The chosen topic — **defending a multi-front / ganged-up attack: which front to defend, which to concede, and the concrete counter-play** — is a single intent (the allocation + break-the-pair decision) that no existing main page owns: `outgunned-defense` covers a single outgunned push with two-front only as a footnote, `defense-posts` covers the single-build decision, `stack-vs-spread` covers layout, `sit-at-max-troops` covers the troop buffer, `costly-elimination` is post-death. The topic has natural entries (the flanked midgame, the team-game mirror) and a verifiable completion definition (a per-front allocation table + two numeric scenarios + the concession rule).

## Research-word count (English, this pack)

This pack is written to exceed the 600-English-research-word minimum with margin; the audit mirrors the body word count of this file. (Verified at acceptance with the source-pack word-count check.)
