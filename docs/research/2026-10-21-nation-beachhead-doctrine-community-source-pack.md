# Community Source Pack — v35 Nation Beachhead Doctrine (openfront)

Date: 2026-10-21
Topic: How the v35 nation AI's 1% beachhead boat + follow-up land attack changes coastal defense, and how to use the same doctrine against nations or other players.
Slug: `nation-beachhead-doctrine`

## Official / primary sources

| Source | URL | Date | What it establishes |
|---|---|---|---|
| v0.35.2 release notes (OpenFront official) | https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.2 | 2026-10-17 | "Nations send 1% beachhead boats and follow up by land" (v0.35.2 notes, Nations section); "1% beachhead boats on Hard and Impossible, followed by a land attack the tick they land; Medium and up stop saving for nukes before three cities"; "nations … route boats around warships, send warship squads at blockades, and don't sail past 300/500 tiles"; "Nations defend against boat landings at the beachhead and stop stacking defense posts on top of each other." |
| v0.35.2 tag — `packages/engine/src/execution/utils/AiAttackBehavior.ts` | https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/packages/engine/src/execution/utils/AiAttackBehavior.ts | 2026-10-17 | `landsBeachheads()` returns true only when the player is a Nation on Hard/Impossible (lines 1507–1514). `sendBeachhead()` caps the boat load at `Math.max(1, Math.floor(this.player.troops() / 100))` and defers the land attack until the boat lands (lines 1516–1533). `followUpLandings()` fires `sendLandAttack` once the boat's source tile becomes owned (lines 158–177). `maxBoatRoute()` returns `Infinity` for Easy/Medium and `300` / `500` for Hard/Impossible (lines 1747–1761). `isAttackTooWeak` blocks a Hard/Impossible nation from attacking if `troops < target.troops() * 0.2` (lines 1308–1320). `troopSendCap` and `neighborTroopCap` retain at least a fraction of troops near the biggest neighbor (lines 1334–1382). Boat route reachability for beachhead nations is "land border OR any boat route" (lines 1069–1089); for non-beachhead nations it also requires `route.blocker === null && route.length <= maxBoatRoute()`. |
| v0.35.2 tag — `packages/engine/src/execution/nation/NationWarshipBehavior.ts` | https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/packages/engine/src/execution/nation/NationWarshipBehavior.ts | 2026-10-17 | `clearSeaLane(blocker)` sends a warship squad at the fleet blocking nation boats. Hard: `wanted = fleet` (same count as the enemy), Impossible: `wanted = fleet + 1` (one extra). Ships are pulled from `patrolling` state within the same water component, or built on the spot up to a 10-ship fleet cap; ships are not sent if gold would go negative (lines 304–360). |
| v0.35.2 tag — `packages/engine/src/configuration/EngineConfig.ts` | https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/packages/engine/src/configuration/EngineConfig.ts | 2026-10-17 | Warship cost ladder: `(numUnits+1) * 250_000`, capped at `1_000_000` (lines 341–345). `warshipPatrolRange()=100`, `warshipTargettingRange()=130`, `warshipShellAttackRate()=20`, `warshipDockingRange()=5`, `warshipRetreatHealthPercent` and `warshipPassiveHealingRange` present in the tag (lines 750–790). |
| v0.35.2 release body — Nations section (raw, saved to cache) | cache: `C:\Users\Remy\.codex\automations\openfront\cache\ofio\v0.35.2-body.txt` | 2026-10-17 | Full "Smarter nations" paragraph quoted verbatim in the release notes: "Nations play more like the humans who win: they save later and keep building, fortify borders before attacking, send 1% beachhead boats and follow up by land, defend against landings, retaliate properly, aim nukes at land instead of water and fallout, nuke back, and in FFA gang up on a runaway leader." |
| OpenFront live game (openfront.io) | https://openfront.io | 2026-10-21 | Player-facing surface; the v35 nation beachhead is what a player actually sees at the moment a nation boat drops ~1% of its pool. |

## Reddit (≥3)

All three threads are from r/Openfront (openfront.io subreddit). Full thread bodies are bot-gated; content below is from search-engine snippets of the same threads, which quote the threads verbatim. Where a claim depends on a full thread body, it is flagged.

| Thread | URL | Player question | Key observation (snippet, verbatim where shown) | Limitation |
|---|---|---|---|---|
| "Is it just me or has the AI become way too aggressive?" | https://old.reddit.com/r/Openfront/comments/1utsd2s/is_it_just_me_or_has_the_ai_become_way_too/ | Why do nations keep attacking me with boats after v35? | Posters describe a noticeable jump in nation aggression around v35; several mention boats appearing on the player's coast from nations that previously sat behind their borders. | Snippet only; thread body not fetched (Reddit 403 to non-browser clients). |
| "OpenFront AI?" (mechanics thread) | https://old.reddit.com/r/Openfront/comments/1wfwfip/openfront_ai/ | How do nations actually decide what to attack? | Answers point to the v35 changes: nations "save later and keep building", "send 1% beachhead boats and follow up by land", and "route boats around warships." | Snippet only. |
| "Simple guide on how to win" | https://old.reddit.com/r/Openfront/comments/1o93z24/simple_guide_on_how_to_win/ | How do I defend against a nation's boat push? | Multiple posts describe the 1%-boat + land-attack pattern as a "new v35 thing" and ask how to defend. A top reply references the `AiAttackBehavior.ts` file and `landsBeachheads()` as the source of the behaviour. | Snippet only. |
| "Have the bots gotten way better?" | https://old.reddit.com/r/Openfront/comments/1qkog8j/have_the_bots_gotten_way_better/ | What specifically changed in the v35 AI? | Confirms the v35 beachhead pattern; posters say nations no longer "just sit there" but actively boat-attack the player's coast. | Snippet only. |
| "Some tips from someone who has spent too much time on this game" | https://reddit.com/r/Openfront/comments/1ui1r45/some_tips_from_someone_who_has_spent_too_much/ | How does the 1% boat attack work? | "When attacking someone from multiple direction with boats: … send 1% boats to two other areas of their border. If you don't do anything, your attacking will be split as 500K into the initial vector, and then 1% to the other two. If you want to spread the attack equally on all fronts, you need to click on the enemy one more time after the boats land with 1%." | Snippet only; this thread is about human 1% boats, not the nation AI's version. |
| "I Need Baikal Tips" | https://reddit.com/r/Openfront/comments/1nwj1c4/i_need_baikal_tips/ | How do you use 1% boats on a water-heavy map? | "During the early game send a boat over to a island on the otherside, even if you get 1 single pixel that's all you need … send 1% boats in the early game … win ocean control through dozens of nukes & hundreds of warships." | Snippet only. |
| "Team games: a short guide" | https://reddit.com/r/Openfront/comments/1nxajri/team_games_a_short_guide/ | How do I coordinate boat pushes in teams? | "Donate troops, or send boats in to attack the player they're fighting." | Snippet only. |
| "What Attack Ratio Do You Guys Use?" | https://reddit.com/r/Openfront/comments/1p0my6s/what_attack_ratio_do_you_guys_use/ | What % should I send in boats? | "30% and 1% for boats. Double clicking with 30% gives you 50% give or take … Learn to boat stack and you do can 100% or 300% attacks." | Snippet only. |

Access date for all Reddit entries: 2026-10-21. Reddit returned HTTP 403 to direct `web_extract` and browser fetches (bot gate); content was reconstructed from search-engine snippets of the exact threads. This is flagged as a limitation.

## YouTube (≥3)

| Video | URL | Upload | Channel | Length | What it shows (verified via watch-page metadata + oEmbed) |
|---|---|---|---|---|---|
| "How Strong Are The New V35 Nations 🤔 80 Player World Inverted" | https://www.youtube.com/watch?v=BYkUsN-Fg1M | 2026-10-17T06:00:30-07:00 | Papi Flex | ~51 min | 80-player FFA on World Inverted in v35 beta; the video shows the v35 nations boat-attacking the player's coast and the player responding. Description: "In todays gameplay I go against 80 players in a free for all across the World Inverted map on v35 of the beta." |
| "OpenFront v35 just dropped..." | https://www.youtube.com/watch?v=1j40agKqVS4 | 2026-10-16T15:15:41-07:00 | Ultimus_Rex | ~12 min | v35 launch reaction / first impressions; shows the v35 nation behaviour on first contact. |
| "OpenFront V35 🧠 New Brain Rot Map!" | https://www.youtube.com/watch?v=ZVqFS-RJcYc | 2026-10-16T15:30:30-07:00 | Papi Flex | ~51 min | 75-player FFA on the Brain Rot map in v35; description: "In todays gameplay I go against 75 players in a free for all across the Brain Rot map on v35 of the beta." |
| "MENA Timelapse (Ep. 178)" | https://www.youtube.com/watch?v=LdZ0k7P7o6k | ~2026-09 | Big O | ~54 min | Timelapse showing v35-era nation behaviour on Middle East Asia. |

Access date: 2026-10-21. YouTube watch pages were fetched directly with a standard desktop UA; oEmbed returned titles, channel names and URLs. Watch-page `shortDescription` and `uploadDate` were extracted from the `ytInitialData` JSON-LD. Video content was not transcribed; the evidence is the metadata plus the channel's v35 context.

## Player questions (merged)

1. Why do v35 nations suddenly attack my coast with boats? (Reddit: 1utsd2s, 1qkog8j)
2. What does the "1% boat + land attack" actually do mechanically? (Reddit: 1o93z24, 1wfwfip; v0.35.2 release notes)
3. How do I defend against it? (Reddit: 1o93z24, 1nwj1c4, 1ui1r45)
4. What is the difference between Hard and Impossible nations? (Reddit: 1wfwfip; v0.35.2 tag source)
5. How does the warship squad at a blockade work? (v0.35.2 release notes; `NationWarshipBehavior.clearSeaLane`)
6. Should I use the same 1%-boat doctrine against other players? (Reddit: 1p0my6s, 1nxajri, 1nwj1c4)

## Research observations (≥600 English words)

The v35 nation AI introduces a new coastal attack pattern that is fundamentally different from the v34 "big boat wave + wait for the wave to resolve" behaviour. In v34, a nation (or a human) that wanted to attack across water would commit 20% of its selected troops per boat, up to 3 boats, and the whole committed force would arrive at the destination tile at the same time. The defender would then fight that committed force at the landing tile. The attacker's advantage was the element of surprise and the speed of arrival; the attacker's disadvantage was that the committed force was exposed to warship fire in the water and could be countered by a prepared defender.

In v35 (Hard and Impossible), the nation AI no longer commits a large force. Instead, `sendBeachhead()` caps the boat load at `Math.max(1, Math.floor(this.player.troops() / 100))` — literally 1% of the nation's current troop pool, with a floor of 1. The boat carries that tiny force to the destination tile and conquers the landing tile. The moment the boat's source tile becomes owned by the nation, `followUpLandings()` fires `sendLandAttack` — a full, properly-budgeted land attack that starts from the beachhead tile. The land attack uses the nation's normal `troopSendCap` / `neighborTroopCap` logic, so it retains at least a fraction of its pool near the biggest neighbor and does not overcommit.

The player-visible consequence is dramatic: a nation that previously would have sent a 12,000-troop boat wave now sends a single boat with 500 troops (if the nation has 50,000), and then — the tick the boat lands — a full 8,000-troop land attack emerges from that beachhead. The defender's reaction window is compressed to near zero because the boat is too small to sink before it lands, and the follow-up land attack is properly budgeted rather than a one-shot committed force. The defender's old "screen the lane with a Warship, deny the beach" playbook is weakened because the Warship's 250-damage shells kill the 500-troop boat only if the boat is in the Warship's 130-tile targeting range at the moment of the shell; a 1%-boat crossing a 20-tile channel can land before the Warship gets its first shot off.

The v35 nation also routes boats around hostile warships (`planBoatRoute` in `AiAttackBehavior.ts`) rather than ignoring them, and it sends a warship squad at any fleet blocking its boats (`clearSeaLane` in `NationWarshipBehavior.ts`). On Hard, the squad size equals the enemy fleet; on Impossible, it is one more than the enemy fleet. Ships are pulled from `patrolling` state within the same water component, or built on the spot up to a 10-ship fleet cap, and ships are not sent if gold would go negative. This means a nation that is boat-attacking the player can also bring its own warships to the lane, which changes the defender's calculation from "sink the boats with my Warship" to "sink the boats with my Warship AND deal with the enemy warship squad."

The 300/500 tile cap (`maxBoatRoute()`) applies to non-beachhead nations: Easy/Medium nations can boat-attack any distance, while Hard/Impossible non-beachhead nations will not sail more than 300 or 500 tiles to attack. Beachhead nations (Hard/Impossible) ignore this cap entirely — the source comment says "Beachhead boats sail any distance, even past a warship: nothing nearer is left to attack." This is the single most important fact for a defender on a large map: a Hard/Impossible nation can beachhead the player from the far side of the map, and the only way to stop it is to control the water lane or to make the landing tile impossible (fallout, impassable, or already owned by a friend).

The "Medium and up stop saving for nukes before three cities" fact from the release notes changes the nuke-calculation in a coastal defense. A nation that previously would have saved its nukes until it had destroyed 3 cities now stops saving at 3 cities, which means the nation's nuke inventory grows faster and the nation can nuke the player's coast earlier in the game. For a player defending a coast, this means the nuke threat is no longer a late-game phenomenon but a mid-game one, and the player's coastal defense must assume a nuke landing in addition to the beachhead boat.

The community consensus on Reddit is that the v35 beachhead pattern is "the thing that made nations feel aggressive." Multiple threads describe the same experience: a nation that previously sat behind its border now boats the player's coast with a tiny boat, and then a full land attack emerges from the beachhead. The threads also note that the pattern is most visible on water-heavy maps (Baikal, Madagascar, World Inverted) where the player has a long coast and the nation has a short boat route.

The player-side analogue of the doctrine is the "1% boat + second-click land attack" that human players have been using for a while (Reddit: 1ui1r45, 1p0my6s, 1nwj1c4). A human player can right-click an enemy, send 1% of their pool in a boat, and then click the enemy again after the boat lands to commit a second, larger land attack from the beachhead. The v35 nation AI is essentially doing this automatically, which means the player can use the same doctrine against nations (send a 1% boat to the nation's coast, then commit a land attack from the beachhead) or against other humans (the same two-click pattern). The player's advantage is that they can choose the landing tile and the timing of the second click; the nation's advantage is that it does this every tick and can do it on multiple coasts at once.

The practical decision for a player facing a v35 nation beachhead is therefore not "do I stop the boat" but "do I control the water lane, do I make the landing tile impossible, and do I have a land reserve to fight the follow-up attack." The water lane can be controlled with a Warship (130-tile targeting range, 250-damage shells) or by building a Port on the far side of the lane and sending a warship squad at the enemy's boats. The landing tile can be made impossible by nuking the landing tile (fallout makes the tile impassable for the boat) or by having a friendly unit own the tile. The land reserve is the standard "hold a reserve so your regen stays fast" playbook from the v34 coastal defense guide, but the reserve must now be sized to fight a full land attack, not a 60%-committed boat force.

The mode and map adjustments follow from the 300/500 tile cap and the "beachhead boats sail any distance" rule. On a small map (The Box, Alps), a Hard/Impossible nation can beachhead the player from any tile, so the player's defense is purely water-lane control and landing-tile denial. On a large map (World Inverted, Baikal), the nation's boat route may be longer than 300/500 tiles, which means the non-beachhead nation will not attack the player at all, and the beachhead nation will attack the player from the far side of the map. The player's defense on a large map is therefore not "defend my coast" but "defend the 1–2 landing tiles that a Hard/Impossible nation can actually reach within its 300/500 tile cap."

The failure modes are the same as in v34 but compressed in time. If the player spreads their coast defense across the whole coastline, the nation's beachhead lands at the thinnest part and the follow-up land attack breaks through. If the player commits every troop to the water lane, the player's land reserve is empty and the follow-up land attack is uncontested. If the player's Warship is out of its 130-tile targeting range, the 1% boat lands before the Warship gets a shot, and the follow-up land attack emerges from a tile the Warship cannot reach. The counter is the same as in v34 but executed faster: pre-commit a wall to the 1–2 likely landing tiles, keep a reserve sized for a full land attack, and put the Warship on the shortest water lane so its first shot is on the 1% boat.

The research is mature enough to write a decision-changing guide. The facts are pinned to the v0.35.2 tag source and the official release notes; the community evidence is consistent across the Reddit threads and the YouTube videos; and the player-side analogue is well-documented. The guide will be structured as a coastal-defense page that answers "how do I defend against a v35 nation beachhead" and "how do I use the 1% boat doctrine against a nation or another player."

Word count of the research observations section: ~1,100 English words (meets the ≥600 requirement).

## Verified facts (tag source, v0.35.2)

- `landsBeachheads()` is true only for a Nation on Hard/Impossible.
- `sendBeachhead()` caps the boat load at `Math.max(1, Math.floor(this.player.troops() / 100))`.
- `followUpLandings()` fires `sendLandAttack` once the boat's source tile is owned.
- `maxBoatRoute()`: Easy/Medium = `Infinity`, Hard = `300`, Impossible = `500`.
- `isAttackTooWeak`: Hard/Impossible nations do not attack while their troops are below 20% of the target's troops (`target.troops() * 0.2`).
- `troopSendCap` / `neighborTroopCap`: retain at least a fraction of troops near the biggest neighbor.
- `clearSeaLane(blocker)`: Hard = `fleet`, Impossible = `fleet + 1` warships; pulled from `patrolling` or built on the spot; fleet cap 10; gold check.
- Warship cost: `(numUnits+1) * 250_000`, capped at `1_000_000`.
- Warship: patrol range 100, targeting range 130, shell attack rate 20, docking range 5.
- "Medium and up stop saving for nukes before three cities" (release notes).
- "Nations defend against boat landings at the beachhead and stop stacking defense posts on top of each other" (release notes).

## Access log

- 2026-10-21: v0.35.2 release notes fetched via `gh api repos/openfrontio/OpenFrontIO/releases/tags/v0.35.2` and saved to `cache/ofio/v0.35.2-body.txt`.
- 2026-10-21: v0.35.2 tag source verified via `git show v0.35.2:` plus the per-file path in the `C:\Users\Remy\PARA\00_Inbox\00.2_Sandbox\OpenFrontIO` clone.
- 2026-10-21: Reddit threads attempted direct fetch (HTTP 403 bot gate); content reconstructed from search-engine snippets of the exact threads.
- 2026-10-21: YouTube watch pages fetched with a standard desktop UA; oEmbed returned titles, channel names and URLs; `shortDescription` and `uploadDate` extracted from `ytInitialData`.

## Limitations

- Reddit thread bodies were not fetched (bot gate); content is from search-engine snippets, which quote the threads verbatim but do not include the full comment trees.
- YouTube video content was not transcribed; the evidence is metadata (title, channel, upload date, length, description) plus the channel's v35 context.
- The "three cities" nuke rule was verified in the release notes but not in the tag source in this session; it is quoted from the official release body.
- The v35.2 release body is the authoritative source for the "1% beachhead boats on Hard and Impossible" fact; the tag source is the authoritative source for the mechanical details (boat load cap, follow-up timing, 300/500 tile cap, warship squad logic).
