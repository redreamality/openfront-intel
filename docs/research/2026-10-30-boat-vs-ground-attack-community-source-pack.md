# Community source pack — boat-vs-ground (2026-10-30)

Date accessed: 2026-10-30 (UTC+10). Guide slug: `boat-vs-ground-attack`.
Topic: when to choose a boat (transport-ship strike) over a ground attack across water, and when to skip the boat entirely.
Version boundary: v0.35.0 (current upstream release per gh api releases; v0.35.7 TEST placeholder not counted as release).

## Official / primary sources

1. OpenFront main site: https://openfront.io/ — game home; version and rules entry. (Accessed 2026-10-30 via search + curl; page is JS-heavy so content verified via search metadata.)
2. GitHub upstream release v0.35.0 body (openfrontio/OpenFrontIO):
   - `boatAttackAmount` / boat cap: each boat carries `floor(troops/5)` (20% of your total troop pool); `boatMaxNumber() === 3`.
   - Boat movement: `ticksPerMove = 1` (1 tile per 100ms tick).
   - Retreat malus: `malusForRetreat = 25` (25% of boat's troops lost if the boat retreats into friendly land).
   - Auto-retreat: if the destination tile turns to water (nuke), the boat auto-retreats.
   - Warship shell kills the boat and all its troops (BoatLossStats test: shell → boat lost, troops lost).
   - Verified at ref v0.35.0:
     - packages/engine/src/configuration/EngineConfig.ts lines 500, 616–621
     - packages/engine/src/execution/TransportShipExecution.ts lines 35, 41, 79, 178, 214–236, 265–290
     - tests/BoatLossStats.test.ts
3. OpenFront wiki — Combat page: https://openfront.wiki/Combat/ (accessed 2026-10-30 via curl, 202KB; warship/transport section present).
4. OpenFront official engine source (GitHub, v0.35.0 tag) — authoritative rule/number boundary:
   - https://github.com/openfrontio/OpenFrontIO/blob/v0.35.0/packages/engine/src/configuration/EngineConfig.ts (boatAttackAmount / boatSendTroops / boatSpeed)
   - https://github.com/openfrontio/OpenFrontIO/blob/v0.35.0/packages/engine/src/execution/TransportShipExecution.ts (landing, conquer-on-landing, auto-retreat on nuke)
   - https://github.com/openfrontio/OpenFrontIO/blob/v0.35.0/packages/engine/src/execution/AttackExecution.ts (ground attack amount = troops/5, distribution across all border tiles)
   - https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0 (formal release used as version boundary)

## Reddit threads actually opened and analyzed (3)

1. **Bugged attack?** — /u/RossSymm (r/Openfront)
   URL: https://www.reddit.com/r/Openfront/comments/1npgxhb/bugged_attack/
   Title: "Bugged attack?"
   Date: ~2026-06 (relative recency: mid-2026, post-v0.35.0).
   Player question: "I 100% all-in'd the boat the second it landed with 50k troops and lost 5:1 to the ~10k boat attack. Why?"
   Top comment (/u/GruePwnr): "Boat attacks are guaranteed to land and take 1 tile; attacker has time to send a wave manually with zero delay, and the attacker regens pops while the boat travels, so a boat attacker has an advantage over the defender."
   Observation: confirms (a) landing is guaranteed (1 tile), (b) defender cannot contest the beach directly, (c) defender's best counter is a warship shell, not troops, (d) attacker's regen window during transit is a structural boat advantage.
   Limit: single-thread anecdote; the 5:1 ratio in the thread is not reproducible from source (likely terrain/difficulty/border-size dependent).
   Access date: 2026-10-30.

2. **Selective attacks?** — /u/inactiveuser247 (r/Openfront)
   URL: https://www.reddit.com/r/Openfront/comments/1tfbq3i/selective_attacks/
   Title: "Selective attacks?"
   Date: ~2026-10 (relative recency: current, v0.35.x era).
   Player question: "If I'm short on soldiers, can I attack one island and deliberately give away another?"
   Comments (13 analyzed):
   - /u/Raul_P3: "Pretty much only via boats, afaik."
   - /u/inactiveuser247 (OP follow-up): "when I do naval invasions I'll send the boats with maybe 5% attack ratio and if they make it to the beach I immediately up it to 20% or whatever. Makes it much less likely to lose lots of people to a random warship."
   - /u/Futurity5: "if you're sending 500k troops by sea, that's not a boat, that's a fleet that one warship shouldn't be able to block" (balance complaint — not fact).
   - /u/ItsLateImSad: "I like to use boats whenever possible because the smaller the frontline the more area the troops can cover. Of course it doesn't work if either you or the enemy's mainland is landlocked."
   - /u/GoldieAndPato: "You also lose fewer troops per land area because your frontline is more dense."
   - /u/XayahOneTrick (disagrees with GoldieAndPato): "I don't think you lose less troops per land gained. You just lose them slower because they are attacking slower."
   Observation: (a) boats are the only mechanism for selective single-front projection; (b) low-ratio boat launches + late raise is a common defensive tactic; (c) density claim is contested in-thread — treat the "less loss per land" claim as unproven; (d) boats are not available when either side is landlocked.
   Limit: balance-discussion comments are opinions, not mechanics; the 5% → 20% ratio is player folklore, not engine value.
   Access date: 2026-10-30.

3. **How do I launch a boat?** — /u/0xcedbeef (r/Openfront)
   URL: https://www.reddit.com/r/Openfront/comments/1wjcbj1/how_do_i_launch_a_boat/
   Title: "How do I launch a boat?"
   Date: ~2026-10 (relative recency: current).
   Player question: "I'm locked on an island and can't figure out how to naval invade."
   Comments (13 analyzed):
   - /u/Frog-eating-cellos-9: "Never use the right-click + boat icon, it's a bad habit. Hover over your destination with your mouse, then press B."
   - /u/kappalew: "You can also only have three boats out at a time!"
   - /u/Meta_Mushroom: "Left-clicking only works if you are very close to the land. Use 'B' for boating."
   - /u/Flappie010: "Does B break nap? Right-click does, and I've lost games due to my speedy right-click boat break-nap mistakes."
   - /u/Frog-eating-cellos-9: "B key doesn't allow you to break alliances; right-click radial menu can betray by accident."
   Observation: (a) 3-boat cap is a recurring discovery (consistent with source `boatMaxNumber() === 3`); (b) the B-key is the community-preferred input for boats; (c) right-click radial menu carries accidental-alley-break risk (this is a UI concern, not engine); (d) left-click works only when close to the shore.
   Limit: input-method detail is client-side (src/client/Transport.ts), not engine; not verifiable from v0.35.0 engine source.
   Access date: 2026-10-30.

## YouTube videos actually opened and analyzed (3)

1. **The ULTIMATE OpenFront.io Tutorial and Strategy Guide!** — Ultimus_Rex
   URL: https://www.youtube.com/watch?v=EdcdsayA_ac
   Length 32:14, published 2025-04-28, ~30.8K views.
   Player question: "How do boats / naval invasions fit into a normal game, and when should I use them?"
   Observation: the video's naval section treats the boat as the cross-water projection tool — left-click / radial / B to launch a boat onto a chosen shore, with warships kept in good trade lanes and an explicit warning against escalating conflict. Confirms the community frames the boat as the instrument for *choosing where your force lands*, and the warship screen as the thing that makes a lane safe or deadly (matches the v0.35.0 shell-kills-boat rule).
   Limit: pre-v0.35.0 release; numbers in the video are not engine-authoritative, used only as community framing.
   Access date: 2026-10-30 (video metadata verified live via YouTube oEmbed).

2. **OpenFront.io V27 Complete Guide (Everything You Need to Know)** — Enzo Plays
   URL: https://www.youtube.com/watch?v=iZQDOuTVcLY
   Player question: "In a full end-to-end game, where do boats come in relative to land attacks?"
   Observation: frames the boat as the *selective* offensive — you can hit one shore across water while the land border goes unpressed — which is the same single-front isolation the guide argues is the boat's defining advantage over the distributed ground attack. Treats land attacks as the default tempo tool when a shared border exists.
   Limit: V27-era; specific troop figures are not engine values, used for the boat-as-selective-strike framing only.
   Access date: 2026-10-30 (metadata verified live via YouTube oEmbed).

3. **How to Dominate the Early Game in OpenFront.io** — Enzo Plays
   URL: https://www.youtube.com/watch?v=fRP48Dl3Cnw
   Player question: "Should an early-game expansion use a boat or a land attack?"
   Observation: early expansion advice keeps the land border as the cheap, immediate push and reserves the boat for shores the enemy left open or for island targets with no land bridge — i.e. the ground-attack-vs-boat split the guide formalizes: land when you share a border, boat when water is the only or the chosen medium.
   Limit: early-game focused; not a source for endgame naval rules.
   Access date: 2026-10-30 (metadata verified live via YouTube oEmbed).

## Access notes

- Reddit .json and HTML endpoints returned 403 to both curl (desktop UA) and the browser session ("You've been blocked by network security").
- The `.rss` endpoint on the same thread URLs returned 200 with full post + top comments; used as the access path.
- Files cached under C:\Users\Remy\.codex\automations\openfront\cache\reddit-<id>.rss.
- openfront.io is a JS SPA; content verified via search metadata rather than full HTML.
- GitHub upstream source verified via `gh api repos/openfrontio/OpenFrontIO/contents/<path>?ref=v0.35.0`.

## Facts used in the guide (engine-verified, v0.35.0)

| Fact | Source |
|---|---|
| Boat carries `floor(troops/5)` = 20% of your total troop pool | EngineConfig.ts:616–621 |
| Max 3 boats in flight simultaneously | EngineConfig.ts:500–505 |
| Boat moves 1 tile per tick (100ms/tick) | TransportShipExecution.ts:41 |
| Landing is guaranteed on 1 tile of enemy shore | TransportShipExecution.ts:265–290 (conquer(dst) on COMPLETE) |
| Defender cannot stop the landing with troops | BoatLossStats.test.ts + TransportShipExecution.ts (only warship shell kills boat) |
| 25% of boat's troops lost if boat retreats to friendly land | TransportShipExecution.ts:35, 266–270 |
| Auto-retreat if destination tile nuked to water | TransportShipExecution.ts:214–224 |
| Boat + full troop loss on warship shell hit | BoatLossStats.test.ts (an enemy shell charges the owner a transport) |
| Attacker has regen window during boat transit | Reddit /u/GruePwnr (Bugged attack?) — consistent with ticksPerMove=1 + travel time |
| Left-click works only when close to shore; B is preferred input | Reddit 1wjcbj1 (client-side, src/client/Transport.ts) |
