# Community Source Pack — midgame-island-comeback

- Date: 2026-10-03
- Slug: `midgame-island-comeback`
- Access date for every source below: 2026-10-03
- Version boundary: v0.34.22 (local OpenFrontIO clone HEAD `4e837520`, tag `v0.34.22`)
- Official primary source (first-party): https://github.com/openfrontio/OpenFrontIO/tree/v0.34.22 — `src/core/configuration/Config.ts`, `src/data/units.json`
- Scope of the pack: player questions about retreating to an island after a losing midgame and converting to a warship + City + SAM + MIRV "fortress" to flip the game. Rules, numbers, and version boundaries are verified against the tagged source, not against community claims.

## Topic chosen

**When to abandon a losing mainland position mid-game and retreat to an island, and how to convert the retreat into a sustainable warship + City + SAM + MIRV position that actually wins the game.**

The intent is decision-changing and distinct from the existing primary answers: `island-defense` owns the *reactive* case of an island player holding a coast against a specific landing; `midgame-survival-low-threat` owns the *reactive* doctrine of a small player bleeding to a larger one on any map; `post-mirv-recovery` owns the *after* the MIRV has already landed. This guide owns the *proactive mid-to-endgame conversion* decision: you are mid-game, you are behind, you choose to pull inland to an island, and you must decide whether the island position is worth converting and exactly what to build to make it winnable. The intent is not covered by any existing primary answer, so this is a new page, not a retitle of an old one.

## Reddit sources (5 opened and analyzed)

1. **Mid-game->End game island comeback strategy** — https://www.reddit.com/r/Openfront/comments/1l1td32/midgameend_game_island_comeback_strategy/
   - Player problem: a mid-game lead that turned into a major defeat; how to come back.
   - Key observation: a top-voted comment reports winning 3 of the last 5 games by "playing continent for head start, then retreat to an island, battleship spam, city+sam spam and mirvs." The stated trick is to *not* take other players' harbors, because once you dominate the sea the neutral harbors "basically work for you."
   - Limit: one player's anecdote; win-rate claim is self-reported and map-dependent.
2. **How to win as an Island Player – 40 Player FFA** — https://www.reddit.com/r/Openfront/comments/1vkjp2v/how_to_win_as_an_island_player_40_player_ffa/
   - Player problem: how to be strong when you are the island player in a 40-player FFA.
   - Key observation: the winning player took a port and a warship first, then pirated the southern coast for income, built additional ports to lean on trade, and *deprioritized Cities early* because population was not a concern while isolated and hard to invade. Lists "sniping ports," "sleeper cells on enemy territory," "claiming all available irradiated land," and "building up the trade economy."
   - Limit: a *spawned-on-island* player, not a *mid-game retreater*; the income story is trade-heavy.
3. **Are sams basically useless?** — https://www.reddit.com/r/Openfront/comments/1un371d/are_sams_basically_useless/
   - Player problem: whether SAMs are worth the Gold once an enemy can saturate them.
   - Key observation: a level-5 SAM stops up to 5 nukes, so an attacker needs 6 to punch through a single SAM; in normal play "think of SAMs as deterrents and not absolute protection"; the only time to stack them is a stalemate scenario with a stockpiled bank; spreading a handful of SAMs forces hydros to be thrown "more carefully and less destructively."
   - Limit: community heuristic; exact SAM interception count per level is verified against tagged source where possible, not taken from the thread.
4. **How are you supposed to recover from a MIRV?** — https://www.reddit.com/r/Openfront/comments/1ri6noi/how_are_you_supposed_to_recover_from_a_mirv/
   - Player problem: what to do after being MIRVed so that you are not just lost.
   - Key observation: "SAMs spread out all over your land reduces the troop loss by a lot"; "if a MIRV is inbound I spam defense posts on all my borders ASAP"; "the best defense is preventing your enemies from saving up."
   - Limit: recovery framing, not comeback framing; used here for the SAM-spread and Defense-Post-on-the-border counter.
5. **My best strategy in openfront.io** — https://www.reddit.com/r/Openfront/comments/1qt4cz8/my_best_strategy_in_openfrontio/
   - Player problem: the general build order and what to do when stranded.
   - Key observation: an emergency case — "if you somehow got stranded on an island and almost die, get other islands and build a city; if you have a lot of money build a port, city and continue." A counterpoint notes "stacking cities on top of each other is a bad idea early mid game (possibly end game too unless it's in your mirv bunker)" because it is an easy landing target and hurts trade.
   - Limit: general advice; the "don't stack cities" warning is the load-bearing one for this guide.

## YouTube sources (4 opened and analyzed via transcript text)

1. **This SECRET Strategy Allows You to DESTROY Even the STRONGEST Enemies** — https://youtube.com/watch?v=djZf_XbuGVo
   - Player problem: winning a 40-player game on Pharaoh Islands.
   - Key observation: sustainability is the win condition — "if you don't have sustain, you just lose"; the player scales up ports to scale income, and the core is protected by land damage and a reserve left on the home front; the opponent's mistake is that he "needed to leave at least one person over here to protect it."
   - Limit: a strong-player sustainability game, not a comeback; the sustainability framing transfers to the island core.
2. **The ULTIMATE OpenFront.io Tutorial and Strategy Guide** — https://www.youtube.com/watch?v=EdcdsayA_ac
   - Player problem: a general strategy tutorial after recent meta changes.
   - Key observation: "many players spend way too much money on warships, especially when fighting other players"; warship conflicts are "incredibly expensive — you lose five warships, that's 5 million"; "it's good to have a couple, especially in high trade zones, but if they're getting shot down you want to stop spending or request alliances." Also: after a MIRV "it's incorrect to leave; you should stay in the game as long as you can — very easy to win games, especially in a crazy nuclear end game."
   - Limit: general tutorial; the warship-spend cap and the "don't leave after a MIRV" line are the load-bearing ones.
3. **How to Win EASILY in OpenFront.io** — https://youtube.com/watch?v=guICwW4T4GE
   - Player problem: surviving a 90-player Pangia FFA.
   - Key observation: in a 90-player game the opening goal is "to survive a little bit longer"; allying the immediate surroundings to reduce early pressure, then looking for a long-run opportunity; "if you can survive a little bit, you're going to be a lot better off."
   - Limit: survival-first, not island-specific; the "buy time, then convert" framing supports the mid-game retreat decision.
4. **This Strategy Allows You To Crush Massive Players** — https://youtube.com/watch?v=j4EsCePMEjU
   - Player problem: how to deal with a much larger player on a 30-player map.
   - Key observation: when a much larger player makes a positional mistake ("broken the number one rule"), push the open front and try to annex the exposed region; the larger player's over-extension is the exploitable flaw.
   - Limit: early-game push, not a mid-game retreat; used for the "exploit the rival's over-extension" counter.

## Merged player question

Across all nine sources the recurring, unanswered-by-existing-guides question is the same: **I am behind mid-game and about to be pushed inland — is it worth retreating to an island, and if I do, what exactly do I build (in what order) to turn a lost game into a winnable one, and what does the rival need to do to stop me?** The existing guides answer the reactive sub-questions (hold a coast, recover from a landed MIRV, survive a larger player), but none answers the *proactive conversion* decision and the *build order* that makes the island a fortress rather than a slow death.

## Verified numbers used in the guide (tagged source v0.34.22)

- Warship: cost `min(1,000,000, (n+1) × 250,000)`; 1,000 base health; 250 shell damage; 50-tick construction; auto-retreat at ≤ 750 HP (75%); passive heal 1 HP/tick within 150 tiles; port heal bonus 5 HP/tick per Port level within 5-tile dock; patrol range 100, targeting range 130; v33 veterancy up to 3 levels, each +20% max health and +20% shell damage, earned at 10 transport kills or 25 trade captures per level.
- City: cost `min(1,000,000, 2^n × 125,000)`; 20-tick construction; each completed City adds 250,000 to maxTroops (`cityTroopIncrease()`).
- Port / Factory: shared counter `n`; cost `min(1,000,000, 2^n × 125,000)`; 50-tick construction.
- Defense Post: cost `min(250,000, (n+1) × 50,000)`; 50-tick construction; 30-tile range.
- SAM Launcher: cost `min(3,000,000, (n+1) × 1,500,000)`; 300-tick (30 s) construction; SAM cooldown 90 ticks; `SAM_CONSTRUCTION_TICKS = 30 * 10`.
- Missile Silo: fixed 1,000,000; 100-tick construction; Silo cooldown 90 ticks.
- Atom Bomb 750,000; Hydrogen Bomb 5,000,000; MIRV `25,000,000 + 15,000,000 × game-wide MIRVs launched`.
- Win condition: `PERCENT_TILES_OWNED_TO_WIN = 80` (80% of land); overtime default off, `startMinutes 30`, `dropPercentPerMinute 2` (no floor) — so when overtime is enabled the required tile share falls 2 points per minute after 30 minutes, meaning a stalled game always ends and the leader eventually crosses a sinking bar.
- Troop growth: `10 + (troops ^ 0.73) / 4` per tick, then multiplied by the saturation factor `(1 − current Troops / maxTroops)`, then difficulty/modifier adjusted, capped at `maxTroops`.
- `maxTroops = 2 × (numTilesOwned ^ 0.6 × 1000 + 50,000) + (sum of completed City levels × 250,000)` for a human.
- MIRV warhead damage against a target: `5 × humans / tilesOwned` for non-MIRV; for a MIRV warhead `500 × (1 − exp(−2 × (excessTroops / maxTroops)))` where `excessTroops = max(0, humans − 0.03 × maxTroops)`.

## Community claims NOT adopted (or adopted with caveat)

- "SAM level 5 stops 5 nukes" (Reddit) — adopted as the *deterrent-not-absolute* framing; the exact per-level interception count is not re-verified here against tagged source, so the guide states the deterrent framing and the 6-to-punch-through rule as the community's operational read.
- "Won 3 of my last 5 games" (Reddit) — reported as a self-claimed, map-dependent anecdote, not as a baseline expectation.
- "SAM warship unlock" (Reddit feature proposal) — a proposal, not a v0.34.22 feature; not used as a fact.
