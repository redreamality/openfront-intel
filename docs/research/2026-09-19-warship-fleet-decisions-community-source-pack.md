# Source pack — OpenFront Warship Fleet Decisions

Topic: **when to build a Warship, how many to keep, where to patrol, and how to
spend a warship budget across modes** (escort vs intercept, first-ship timing,
fleet size under the v34 cost ladder). This is a distinct intent from the
existing `warship-veterancy` guide (per-ship experience/repair decisions) and
from `team-naval-control` (five-minute Team-mode fleet roles).

- Research date: 2026-09-19
- Version boundary: **v0.34.11** (tag `82e5fce9502b99516b5b4b8f06fc0b88823a0cbc`,
  published 2026-09-18). All rule numbers below are re-verified against the
  `v0.34.11` tag source and the site's generated `src/data/units.json`
  (`upstreamVersion: v34`, `upstreamCommit: 5f6c8fad19ab2e7ab5edfc91c9edc8b685f4c293`).
- Access method note: `www.reddit.com` JSON/HTML paths returned WAF/CAPTCHA
  responses this round; thread content was recovered through Reddit RSS
  endpoints and a third-party search index. YouTube videos were checked for a
  resolvable watch page and a warship/naval chapter. Limitations are listed per
  source below.

## Confirmed rule facts (v0.34.11 tag)

Verified from `src/core/configuration/Config.ts` and `src/core/game/UnitImpl.ts`
at the `v0.34.11` tag, cross-checked with the site's `src/data/units.json`:

- Base cost: `cost = min(1_000_000, (numUnits + 1) * 250_000)`. First Warship
  250,000; second 500,000; third 750,000; fourth and beyond capped at 1,000,000
  each. (Config.ts `UnitType.Warship` cost wrapper; units.json `costFormula`.)
- `maxHealth: 1000` (base), `damage: 250` (rolled shell damage before the
  veterancy multiplier), `constructionDuration: 50`. (units.json; Config.ts.)
- Auto-retreat trigger: `warshipRetreatHealthPercent = 75`, so a Warship retreats
  to repair at or below 75% of its veterancy-adjusted max health (750 of 1000
  for a fresh ship, 1200 of 1600 for a level-3 veteran). (Config.ts 1214;
  units.json "Auto-retreats at HP <= 750".)
- `warshipPatrolRange = 100` (idle patrol radius), `warshipTargettingRange = 130`
  (range at which it can open fire / acquire a target), `warshipShellAttackRate = 20`.
  (Config.ts 1192-1202.)
- Repair: passive heal `warshipPassiveHealing = 1` per tick while within
  `warshipPassiveHealingRange = 150` of an owner Port; docked pool
  `warshipPortHealingBonusPerLevel = 5` per Port level per tick (split among
  docked ships), `warshipDockingRange = 5` tiles, `warshipPortSwitchThreshold = 0.75`
  (switches to a healthier Port when a docked ship is under ~75% of cap).
  (Config.ts 1204-1228.)
- Veterancy (unchanged in the v34 series, introduced v33): `warshipMaxVeterancy = 3`,
  `warshipVeterancyHealthBonus = 20` and `warshipVeterancyShellDamageBonus = 20`
  per level, `warshipVeterancyTransportKills = 10`, `warshipVeterancyTradeCaptures = 25`.
  (Config.ts 1230-1257.)
- v0.34.0/0.34.1 added `F`, `R` and **box-select-warship** to customizable
  keybinds, and `F`/Escape to cancel a Warship selection (official release body).
- Target priority: Warships prioritize Transport Ships (units.json note "Since
  v24: prioritizes transport ships and cools down immediately on hit"); they
  also capture enemy Trade Ships.

## Reddit discussions analyzed (3)

1. **r/openfront — thread `1pb37gi`**
   URL: https://www.reddit.com/r/openfront/comments/1pb37gi/
   (Accessed 2026-09-19 via thread RSS; selftext + top comments.)
   Player question: early/naive players ask how many Warships to field and
   whether spending gold on a second or third ship is worth it once the first
   ship already controls the local water. Observation: the recurring advice is
   that a single well-positioned ship near the main trade lane usually deters
   most traffic, and that the steep second-ship cost (500k) often means it is
   better to wait for a real threat or a contested lane than to pre-buy.
   Limitation: RSS only returns the post and the highest-ranked comments, so
   deep replies are not fully captured.

2. **r/openfront — thread `1mnvtuw`**
   URL: https://www.reddit.com/r/openfront/comments/1mnvtuw/
   (Accessed 2026-09-19 via thread RSS; selftext + top comments.)
   Player question: positioning — should a Warship camp on its own coast or
   push out onto the enemy's trade/transport route? Observation: the thread
   treats "where does the gold flow" as the placement answer, favoring a ship
   placed on the lane the opponent actually uses rather than the closest water,
   and flags that a ship with no nearby friendly Port to retreat to will
   effectively die because the 75% auto-retreat needs a Port within reach.
   Limitation: comments are a subset; engagement counts not captured.

3. **r/openfront — thread `1sxjjx3`**
   URL: https://www.reddit.com/r/openfront/comments/1sxjjx3/
   (Accessed 2026-09-19 via thread RSS / search index.)
   Player question: late-game — does a Warship still matter once the map is
   mostly locked, and does a fourth+ ship ever pay off at the 1,000,000 cap?
   Observation: the consensus is that late-game value shifts from capturing
   trade to denying a specific lane or protecting a transport/landing; a
   capped 1,000,000 fourth ship is only justified when it protects a high-value
   target (a landing, a nuke-prep, the last trade lane), not as general
   insurance. Limitation: RSS returned the title and partial body; comment
   depth is partial.

## YouTube / subtitle sources analyzed (3+)

1. **The ULTIMATE OpenFront.io Tutorial and Strategy Guide!**
   URL: https://www.youtube.com/watch?v=EdcdsayA_ac
   (Checked 2026-09-19; chapter list includes "2:10 Warships and Structures".)
   Relevant guidance captured from the description/chapters: deploy a couple of
   Warships in good trade zones and do not over-escalate; keep troop pressure
   high to deter land attacks. Used as the "a couple of ships in good trade
   zones" heuristic and the anti-escalation framing.

2. **OpenFront.io Official Tutorial**
   URL: https://www.youtube.com/watch?v=EN2oOog3pSs
   (Checked 2026-09-19; official in-game tutorial walk-through.)
   Relevant guidance: the Build menu describes a Warship as patrolling an area,
   capturing enemy Trade Ships and destroying Boats (transport ships) and
   Warships, spawning from the nearest Port and patrolling the tile first
   clicked, and leveling up (max 3) to increase damage and health. Used for the
   "spawns at nearest Port, patrols first-clicked tile" placement mechanic and
   the max-3 leveling cap.

3. **OpenFront.io v31 Tutorial**
   URL: https://www.youtube.com/watch?v=IeR36481zsI
   (Checked 2026-09-19; recent naval/economy tutorial.)
   Relevant guidance: economic framing around using Warships to control trade
   routes and capture enemy trade for gold. Used for the "warships as trade
   denial/income" framing and for the timing of when naval control starts to
   matter as the economy scales.

4. **Openfront.io Beginner's Guide: Mechanics, Tips, & Tricks**
   URL: https://www.youtube.com/watch?v=9LOx9lFJn6I
   (Checked 2026-09-19.)
   Relevant guidance: baseline mechanics recap that a Warship is one of the few
   sea-control tools and is built at a Port. Used as a cross-check for the
   Port-requires-Water constraint and the single-ship early-game norm.

## Official first-party source (1)

1. **OpenFrontIO repository, v0.34.11 tag — Warship configuration and unit data**
   URL: https://github.com/openfrontio/OpenFrontIO/tree/v0.34.11/src/core/configuration/Config.ts
   (tag `v0.34.11`; same repo holds `src/data/units.json` and the Warship unit
   logic).
   Release page: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.11
   and the v0.34.0 release that added the Warship keybinds:
   https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.0
   This is the first-party authority for the cost ladder, 1000 base health,
   250 damage, 50-unit build time, 75% retreat threshold, 150-tile passive heal
   range, 5-tile docking range, 5-per-Port-level heal pool, 0.75 Port-switch
   threshold, and the 3-level / +20% per-level veterancy. The v0.34.0/0.34.1
   release body is the source for the `F`/`R`/box-select Warship keybinds.
   The official in-game help page (https://openfront.io/) is a secondary
   first-party surface confirming the Build-menu Warship description.

## Synthesis → decision framework

Merged across the sources, the single intent this guide answers is the
fleet-level spend and placement decision: (a) buy the first Warship only when a
Port exists and there is water with real traffic, (b) keep the ship on the lane
that actually moves gold rather than the nearest water, (c) size the fleet to
the cost ladder — a second ship at 500,000 is a deliberate commitment and a
capped 1,000,000 fourth ship is reserved for protecting a specific high-value
target, (d) always keep a friendly Port within retreat/heal range so the 75%
auto-retreat can actually repair the ship, and (e) use box-select/F-R controls
to manage the fleet without re-clicking each hull. The per-ship experience and
repair decision stays in the warship-veterancy guide; the five-minute Team-mode
roles stay in team-naval-control.
