# Source pack — OpenFront Naval Stalemate: Blockade vs Anti-Blockade

Topic: **when an endgame reaches a land-and-nuclear stalemate, how to break it
with the naval/economic axis — starving an opponent's port-and-trade income
with a Warship blockade (blockade side) and breaking through it with massed
Transport landings, forward Ports and route diversification (anti-blockade
side)**. This is a distinct intent from the existing guides: `warship-fleet-
decisions` (fleet spend/placement), `warship-veterancy` (per-ship experience),
`embargo-timing-and-trade-control` (trade timing and embargo), `trade-ship-
destinations` (where ships go), `which-nuke-commit` / `nuclear-stalemate-
breaker` (the nuke side of the same stalemate), and `trade-route-chokepoint`
(chokepoint geometry). This page answers the question a Reddit player asked
verbatim: "How does one break the unbreakable stalemates like these?" after
both sides had maxed land forces and the only remaining lever was the sea.

- Research date: 2026-10-09
- Version boundary: **v0.34.24** (latest non-TEST release, published
  2026-10-06). The site's generated data is pinned to
  `upstreamVersion: v34`, `upstreamCommit:
  4e837520e886b255b1b020e9c89639dbb9d54038`, `generatedAt:
  2026-10-02T06:28:29.734Z`. All rule numbers below are re-verified against the
  `OpenFrontIO` source (`src/core/configuration/Config.ts`,
  `src/core/execution/PortExecution.ts`, `src/core/execution/TradeShipExecution.
  ts`, `src/core/DetMath.ts`) and the site's generated `src/data/units.json`.
- Access method note: `www.reddit.com` JSON/HTML paths returned WAF/CAPTCHA
  responses this round; thread content was recovered through the Arctic Shift
  Reddit archive API (`arctic-shift.photon-reddit.com`), which returned the
  selftext plus the top-level comments. YouTube videos were checked for a
  resolvable oEmbed metadata response plus a watch-page `publishDate` and
  `viewCount`. Limitations are listed per source below.

## Confirmed rule facts (v34 / v0.34.24)

Verified from the OpenFrontIO source and the site's generated
`src/data/units.json`:

- Port, Factory and City all use the same exponential cost ladder
  `min(1_000_000, 2^n * 125_000)`: first 125,000; second 250,000; third
  500,000; fourth and beyond capped at 1,000,000 each. This is stated
  verbatim by a player in thread `1vjvm8p` ("1st Port: 125,000 / 2nd Port:
  250,000 / 3rd Port: 500,000 / 4th Port and beyond: 1,000,000").
  (`Config.ts` `UnitType.Port`/`Factory`/`City` cost wrappers; `DetMath.ts`
  `pow2`.)
- Port build time 50 units, Factory and City 20 units. (`units.json`.)
- Warship: base cost `min(1_000_000, (n+1) * 250_000)` → 250,000 / 500,000 /
  750,000 / 1,000,000 cap; base health 1,000; rolled shell damage 250; build
  50 units; auto-retreat at 75% max health; passive heal within 150 tiles of a
  Port; dock within 5 tiles for a 5-per-Port-level heal pool; max 3 veterancy
  levels at +20% health and +20% shell damage each; targets Transports first.
  (`Config.ts` 1192-1257; `units.json`.)
- Trade Ships are free (cost 0) and spawn from Ports. Per-arrival gold is
  `tradeShipGold(dist) = 75_000 / (1 + exp(-0.03 * (dist - debuff))) + 50 *
  dist`, where `debuff = tradeShipShortRangeDebuff()`. (`Config.ts` 516-521.)
- Trade Ships on a route shorter than the short-range threshold are "heavily
  punished": the sigmoid base term collapses, so a short local loop returns far
  less than a long trans-ocean run. (`Config.ts` 517-519 comment;
  `tradeShipShortRangeDebuff()`.)
- Global trade-spawn throttle: a ~1.2-1.45x odds boost while the world fleet
  is small, a capacity sigmoid damping past the ~330-ship midpoint onto a 0.25
  plateau past ~415 ships (half cadence per port after the pity timer), and a
  global hard cap beyond ~800 ships at sea. (`Config.ts` 524-534 comment,
  `tradeShipSaturation` 541-543.)
- When a Warship captures an enemy Trade Ship, the capturer's owner gains the
  route gold as **piracy gold** (`addPiracyGold`), i.e. the value of the route
  is redirected to the blocker. (`TradeShipExecution.ts` 83, 184-204.)
- Transport Ships are free to build; a Warship gains one veterancy level per
  10 Transport kills (`warshipVeterancyTransportKills = 10`). (`units.json`;
  `Config.ts` 1260.)
- Atom Bomb 750,000; Hydrogen Bomb 5,000,000; MIRV 25,000,000 with a
  +15,000,000 escalation per prior MIRV launched; Missile Silo 1,000,000.
  (`units.json`.)
- v0.34.24 (latest non-TEST release, 2026-10-06) is the current version
  boundary; v0.34.0/0.34.1 added the `F`, `R` and box-select-Warship keybinds.

## Reddit discussions analyzed (3)

1. **r/Openfront — thread `1vo6on8` — "How do you break endgames like this?"**
   URL: https://www.reddit.com/r/Openfront/comments/1vo6on8/how_do_you_break_endgames_like_this/
   (Posted 2026-08-14, score 46, 52 comments. Accessed 2026-10-09 via the
   Arctic Shift Reddit archive API; selftext + 25 top-level comments.)
   Player question: the OP reaches the endgame repeatedly and cannot break the
   lock. The example match is the canonical naval-blockade stalemate: OP and a
   Blue ally traded and nuked a stronger third player to survive; the Blue
   player's nuke barrage failed to break the OP's SAMs; they could not breach
   each other's naval defenses; OP "placed ships all around his routes and cut
   my alliances with the remaining players. This allowed me to pirate
   everything and save up enough money to go into an all out attack. I managed
   to pump out over 200 extra ships and break through their naval defenses, but
   even at that point I could not win as Anon had a sufficient income through
   factories that he just kept nuking my transports and eventually killed all
   my ships." The top comments then document both the blockade and the
   anti-blockade playbooks:
   - `MrCaramelo`: "You have to starve these people so eventually they ran out
     of boats. You need to also be enemies with their allies in order to pirate
     the trade. This is something that worked for me. Eventually he couldn't
     make any more boats and I sent transports from multiple angles and he
     eventually deployed his cheap ships too far, allowing my pixel to get it."
   - `BGOtaku`: "save a lot of money while the other one is wasting their
     resources on sams and launchers, eliminate every single outside
     nation/player completely (no ports remaining) then just stop trading with
     the opponent, you'll out econ them after a while and destroy all their
     warships, then just send small transports of like 5 percent, they'll
     eventually run out of money for warships/nukes."
   - OP reply (`Correct-Pangolin-568`): "He had 60 factories and could
     indefinitely nuke my transports even after I blockaded his trade and
     killed all his battleships." and "Unfortunately, armies travel very
     slowly and you can have only 3 transport ships at the same time."
   - `HerryHuts`: "it wouldnt work because u can only spam 50 at a time... i
     suggest spamming warships so u surround then u boat him."
   - `JackWALL10`: "Attack them much more early than this... if not, then it
     is a war of attrition."
   Limitation: Arctic Shift returned the selftext and top-level comments; deep
   nested replies and the replay are not recoverable, so the map and gold
   figures are reconstructed from the mechanics, not a replay.

2. **r/Openfront — thread `1vjvm8p` — "Simple guide on how to win"**
   URL: https://www.reddit.com/r/Openfront/comments/1vjvm8p/simple_guide_on_how_to_win/
   (Posted 2026-08-09, score 20, 12 comments. Accessed 2026-10-09 via the
   Arctic Shift Reddit archive API; selftext + 17 top-level comments.)
   Player question: a staged early/mid/endgame guide. The endgame section is
   the anti-blockade build reference: "for economy, your factory chain should
   be complete from the mid game. there are now two things you need to build:
   1. ports. they are the best eco option in the endgame. before the nuclear
   apocalypse at the end of the game, you probably should have around 100
   ports." It also warns to "always make sure you have enough money to launch a
   counter MIRV. if you don't you will lose, especially if its a 2-3 player
   endgame." The comments supply the verified Port cost ladder verbatim
   (`HerryHuts`: "1st Port: 125,000 / 2nd Port: 250,000 / 3rd Port: 500,000 /
   4th Port and beyond: 1,000,000") and the key insight that "port value goes
   up with the more ports there are in the game" and that "trade ships can be
   pirated and until the late game it is almost certain that you will have a
   portion of your trade ships stolen" (`Significant-Cod4217`).
   Limitation: top-comment subset; engagement counts beyond the counts above
   are not captured.

3. **r/Openfront — thread `1vynp4g` — "Advanced tips for winning games"**
   URL: https://www.reddit.com/r/Openfront/comments/1vynp4g/advanced_tips_for_winning_games/
   (Posted 2026-08-26, score 15, 3 comments. Accessed 2026-10-09 via the
   Arctic Shift Reddit archive API; selftext + 3 top-level comments.)
   Player question: a player winning 50-80% of FFA games shares tips. Two are
   directly about the naval/economic stalemate: tip 8, "Build ports only when
   you can steal ships for money... Problem with ports is that it takes time to
   get money... if someone steals your ships for money, if you want to fight
   them with 2 ships it costs 750k" (two Warships = 500,000 + 750,000 = 1.25M
   ladder, and the OP's "750k" reflects the cost of contesting a trade route);
   and tip 10, "In stale game later, Focus on economy and getting 25m gold to
   MIRV someone. this is a lot about seconds and build alliances with others,
   primary if you want to attack crown." The comment by `satellite__rain`
   reinforces the stalemate rule of checking an opponent's gold and missile
   state before any endgame push.
   Limitation: only 3 comments returned; this thread is used as the "stale
   game → economy → 25M MIRV" frame and the two-ship cost framing.

A fourth thread, `1vi2udh` ("Game Suggestions: Fortress Mode & Naval Posts",
https://www.reddit.com/r/Openfront/comments/1vi2udh/ , posted 2026-08-07),
proposes a not-shipped "Naval Post" structure that fires like a Warship and
"prevents enemy trade from crossing its radius" at SAM-equivalent cost. It is
cited only as a *player-requested* defense that confirms how much the
community wants a cheap static anti-trade tool; it is **not** in the current
v34 rules and must not be described as available.

## YouTube / subtitle sources analyzed (3)

1. **What Happens if You Blockade the Strait of Hormuz? | OpenFront.io**
   (Enzo Plays)
   URL: https://www.youtube.com/watch?v=PPgHsNvNN4M
   (Checked 2026-10-09; oEmbed title/author verified; watch-page `publishDate`
   2026-08-07, `viewCount` 122,026, length ~52 min.)
   Relevant guidance: a long-form demonstration of using a Warship (or two) to
   deny a high-value trade/transport strait in OpenFront, showing how a small
   number of well-placed ships can stall an opponent's trade income and how the
   opponent responds by massing Transports and pushing forward Ports. Used as the
   primary "blockade side" demonstration and for the framing that a blockade is
   about denying a *lane*, not about sinking every ship.

2. **Once the warships were down, it was OVER. | OpenFront.io**
   (Ultimus_Rex)
   URL: https://www.youtube.com/watch?v=zfQXh3AWwL0
   (Checked 2026-10-09; oEmbed title/author verified; watch-page `publishDate`
   2026-09-27, `viewCount` 18,703.)
   Relevant guidance: a match in which the decisive moment is the Warship
   attrition — once one side's Warships were all destroyed, the opponent's
   Transport and Trade economy ran unopposed and the game collapsed. Used as the
   "blockade broken" case: the anti-blockade win is the moment the blocker's
   ships stop existing, after which mass Transport and Trade flow wins the gold
   race. Also shows the importance of keeping a forward Port within heal range
   so a ship can survive the attrition.

3. **I escaped to Taiwan and made the ultimate TRADE ISLAND! | OpenFront.io**
   (Ultimus_Rex)
   URL: https://www.youtube.com/watch?v=eq2gGZKHPdI
   (Checked 2026-10-09; oEmbed title/author verified; watch-page `publishDate`
   2026-10-07, `viewCount` 9,534, length ~59 min.)
   Relevant guidance: a build where the player routes their economy through a
   dedicated trade island with multiple Ports and long trade routes, which is
   the anti-blockade answer — a multi-Port, multi-route economy is hard to fully
   deny because a blocker's limited Warships cannot cover every lane at once.
   Used as the "route diversification" case and for the point that long routes
   are not only more profitable per `tradeShipGold` but also harder to screen
   completely.

## Official first-party source (1)

1. **OpenFrontIO repository — Port, Trade Ship and Warship configuration**
   URL: https://github.com/openfrontio/OpenFrontIO/tree/main/src/core/configuration/Config.ts
   (current `main`; same repo holds `src/core/execution/PortExecution.ts`,
   `src/core/execution/TradeShipExecution.ts` and `src/core/DetMath.ts`.)
   Release page for the version boundary:
   https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.24
   and the keybind release:
   https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.0
   This is the first-party authority for the Port/Factory/City exponential
   cost ladder (125k/250k/500k/1M cap), the Warship cost ladder (250k/500k/
   750k/1M cap), the 75% auto-retreat, the 150-tile passive heal and 5-tile
   docking with the 5-per-Port-level heal pool, the 3-level +20% veterancy, the
   `tradeShipGold` distance-sigmoid and short-range debuff, the global
   trade-spawn throttle, the piracy-gold redirect on capture, and the Transport
   and nuke costs. The official in-game help page (https://openfront.io/) is a
   secondary first-party surface confirming the Build-menu descriptions.

## Synthesis → decision framework

Merged across the sources, the single intent this guide answers is the
endgame break through the sea: (a) when land and nukes are locked, the
blockade side's job is to deny a *lane* that moves gold, not to sink every
ship — one well-placed Warship on the opponent's main trade/transport route
stalls their port income and redirects that route's gold to the blocker as
piracy gold; (b) a blockade is leverage, not a win condition — the blocker must
pair the denial with a follow-up (a mass Transport landing or a forced nuke
over-escalation) or it produces a draw; (c) the anti-blockade answer is route
diversification — two or more Ports on different coasts, long trans-ocean
routes (higher `tradeShipGold` and harder to fully screen), and a forward Port
that lets a Transport landing seed a second economy behind the blockade;
(d) the decisive inflection is Warship attrition — when the blocker's ships
stop existing, the Transport/Trade economy runs unopposed and the gold race
collapses in the defender's favor; (e) the nuke stays the last axis and the
one where the stalled economy changes the calculus: a player whose trade has
been denied is less able to absorb a counter-escalation, which is exactly the
leverage the blockade is buying. The per-ship experience and repair decision
stays in the warship-veterancy guide; fleet spend and placement stays in
warship-fleet-decisions; the pure nuke side of the same stalemate stays in
which-nuke-commit and nuclear-stalemate-breaker.
