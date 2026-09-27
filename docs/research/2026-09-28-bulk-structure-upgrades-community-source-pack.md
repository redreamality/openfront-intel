# Community source pack - bulk-structure-upgrades (2026-09-28)

## Recommendation, ownership boundary, and completion test

**Recommended slug:** `bulk-structure-upgrades`

**Single player decision:** when a player has enough Gold to upgrade an existing
structure several levels at once, should they choose `x1`, `x5`, `x10`, or the
dynamic `xMax` option, and what must they check before committing the whole
cumulative price? This is especially visible in custom high-Gold games, but the
decision also matters in normal late games because the batch is one irreversible
spending intent against one existing structure.

This does not duplicate the existing main answers. `hotkeys` owns fixed desktop
keys and general control workflows; it does not explain the radial upgrade
submenu or cumulative pricing. `adaptive-build-order` chooses which constraint
deserves the next Gold; it does not choose how many levels to add in one intent.
`building-timing` chooses when to build a City, Factory, Port, Silo, SAM, or
Defense Post, while `stack-vs-spread` chooses where structures belong. The new
page would begin only after the player has selected an owned, completed,
upgradable structure and must choose a batch size. It must also distinguish
**upgrading one structure by many levels** from placing 25-50 separate structures
on different tiles, because that exact misunderstanding appears in the freshest
Reddit question.

The page is complete when a player can (1) identify the five current upgradable
structure types, (2) explain why `x5` is not normally five times the currently
shown single-level price, (3) read `xMax` as the largest cumulative batch their
current Gold can afford, capped at 50, (4) use `x1` while output, route safety, or
coverage value remains unproved, and (5) reserve `x5`, `x10`, or `xMax` for a
structure whose next several levels all have a known job. A compact decision
framework for the guide is **BATCH**: **B**aseline the current level and Gold,
**A**udit the output or coverage that another level buys, **T**otal the displayed
cumulative batch cost, **C**heck the next alternative purchase, and **H**alt at
the first unproved level.

## Version boundary and official first-hand facts

The public boundary is the latest non-TEST release,
[`v0.34.20`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.20),
published 2026-09-26 at tag commit
`feba4a51c33475a184d9c42e35cc5e55829ee3ca`. That patch itself concerns naval
hover rendering, telemetry, and pool routing rather than bulk upgrades. The
guide must therefore say "verified at v0.34.20," not claim that v0.34.20
introduced the feature. All numbers below were checked against that immutable
tag on 2026-09-28.

1. Tagged [`Game.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/core/game/Game.ts)
   sets `MAX_UPGRADE_AMOUNT = 50`. The client/server intent schemas permit an
   optional integer amount from 1 through 50. The same file gives structure
   batches fixed middle steps of `x5` and `x10`; nuclear batches are a separate
   system with `x2` and `x5`.
2. Tagged [`RadialMenuElements.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/client/hud/layers/RadialMenuElements.ts)
   renders four stable slots for an upgradable structure: `x1`, `x5`, `x10`,
   and `xMax`. `xMax` is not always 50. It is the largest cumulative amount the
   player can afford now, up to 50. Fixed steps above that amount remain visible
   but disabled. If the player cannot execute more than one level, the submenu
   disappears and the normal click performs `x1`.
3. Tagged [`PlayerImpl.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/core/game/PlayerImpl.ts)
   creates a 50-entry `upgradeCosts` array by asking the configuration for the
   next level's price, then the following level's price, and accumulating the
   total. Tagged `Game.ts` reads entry `amount - 1`. Therefore a structure's
   batch price is not generally `current one-level price x amount`.
4. Tagged [`UpgradeStructureExecution.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/tests/core/executions/UpgradeStructureExecution.test.ts)
   verifies both sides of that contract: a City's advertised `x5` total exceeds
   the naive current-price-times-five result, and execution deducts exactly the
   advertised cumulative total. Tagged
   [`RadialMenuElements.test.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/tests/client/graphics/RadialMenuElements.test.ts)
   separately verifies the fixed slots, disabled unaffordable steps, and a
   dynamic affordable `xMax` such as `x4`.
5. Tagged [`Config.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/core/configuration/Config.ts)
   marks **City, Port, Factory, Missile Silo, and SAM Launcher** as upgradable.
   Defense Post is not upgradable. This boundary is important because "bulk
   buildings" does not mean every build-menu item accepts a batch upgrade.
6. The same configuration prices a City on its own constructed-level counter at
   125,000, 250,000, 500,000, then a 1,000,000 per-level cap. Port and Factory
   use the same ladder but share one combined constructed-level counter. Missile
   Silo is a flat 1,000,000 per level. SAM Launcher rises by 1,500,000 per level
   to a 3,000,000 per-level cap. These are current tagged rules, not values taken
   from a creator or comment.
7. The cost wrapper counts constructed levels and uses the minimum of owned and
   constructed units, so a captured structure does not simply inflate the
   builder's next price as if they had constructed it. An under-construction or
   marked-for-deletion unit also cannot be selected for an upgrade batch.
8. Nukes must remain an explicit boundary note rather than a second topic. Their
   `xMax` is capped by both Gold and ready Silo tubes, while structure `xMax` is
   capped by cumulative upgrade cost and 50. A Reddit comment that describes
   `x1/x5/x10/x50` for nukes is not authoritative and conflicts with the tagged
   `x1/x2/x5/xMax` nuclear menu.

## Quantified scenario seeds for the guide

**Scenario A - do not multiply the currently displayed City price.** Assume an
ordinary non-infinite-Gold game, one completed level-1 City, 4,000,000 Gold, and
a stable core. The next City level is 250,000, but `x5` upgrades the same City
five levels and costs `250k + 500k + 1M + 1M + 1M = 3.75M`. The common shortcut
`250k x 5 = 1.25M` is wrong by 2.5M. If only the first extra 250,000 cap step has
a measured use, BATCH chooses `x1` and keeps 3.75M liquid. If five consecutive
levels have a known job and the remaining 250,000 is an acceptable reserve,
`x5` is a legitimate fast execution, not a discount.

**Scenario B - a shared Port/Factory ladder makes the alternative visible.**
Assume one completed level-1 Port, 20,000,000 Gold, a currently safe sea route,
and an unproved rail route. Choosing `x10` on the Port costs
`250k + 500k + 8 x 1M = 8.75M` and advances the combined Port/Factory price
counter through the capped region. The first Factory bought afterward therefore
costs 1M rather than the 250k next step available before that batch. Even in a
high-Gold lobby, the decision is not "can I afford x10?" It is whether ten more
Port levels all outperform a route test, military reserve, and the 750k extra
entry cost now imposed on the first Factory. If the route is not yet paying,
`x1` is the falsifiable test; `x5/x10/xMax` are for already-proved throughput.

A useful third contrast is a level-1 Missile Silo versus a level-1 SAM Launcher.
Five Silo levels cost a flat 5M, while five SAM levels cost 15M because the next
SAM step has already reached the 3M cap. The same `x5` label therefore describes
the same number of levels, not the same economic risk.

## Access preflight and exclusions

Canonical Reddit HTML/RSS returned a block page from this environment. The
three canonical URLs below were therefore preflighted and then opened through
the public Arctic Shift archive, which exposed the post body and archived
comments. They count because the actual records were read, not because a search
snippet named them. YouTube watch pages and player metadata were accessible.
Three selected videos also had previously captured English WebVTT captions in
the automation cache, and those captions were opened and read at the noted
sections. New caption downloads for two otherwise relevant videos
(`6TT3wxQEy6U` and `8ult82qmiAg`) returned HTTP 429 on 2026-09-28; they were
excluded from the valid count rather than represented as analyzed transcripts.

## Reddit discussions (3 opened and analyzed)

1. **"Mass spamming buildings"**, r/Openfront, posted **2026-09-20**:
   <https://www.reddit.com/r/Openfront/comments/1wlfgg5/mass_spamming_buildings/>.
   **Player question:** in a custom game with 1 billion starting Gold and a 999x
   multiplier, the author saw players apparently build 25-50 structures at
   once and believed five was the maximum. **Observation:** archived replies
   point the player to the nested radial choice and say it can reach 50. This is
   the clearest demand signal for the page and for explaining the difference
   between a multi-level upgrade and placing many independent map objects.
   **Limitation:** the replies use loose language ("build" and "place") and do
   not distinguish levels from separate structures; the tag source supplies
   that distinction and every number. Accessed 2026-09-28.

2. **"How to spam 50x nukes"**, r/Openfront, posted **2026-09-27**:
   <https://www.reddit.com/r/Openfront/comments/1wr9f5i/how_to_spam_50x_nukes/>.
   **Player question:** the author loses time navigating the right-click menu
   while a defender recovers and asks how to execute a fifty-nuke volley.
   **Observation:** comments visibly disagree about what the last radial slot
   does, whether it is an `x50` option, and whether it fires simultaneously.
   That confusion is useful to the structure guide because the two menus look
   related but obey different fixed steps and caps. **Limitation:** this is a
   boundary source, not proof for structure behavior; macro claims, click rates,
   and a comment's `x1/x5/x10` nuclear labels are not reused. Current nuclear
   slots come from the v0.34.20 source and tests. Accessed 2026-09-28.

3. **"Possible building upgrades concept?"**, r/Openfront, posted
   **2026-09-15**:
   <https://www.reddit.com/r/Openfront/comments/1wh5rfj/possible_building_upgrades_concept/>.
   **Player question:** the author enjoys tall play and proposes level-5
   Metropolis, Garrison, and Manufacturing Complex specializations instead of
   covering the map with many low-level structures. **Observation:** players
   already interpret levels as strategic concentration and expect higher levels
   to change output; that makes an explanation of current multi-level spending
   valuable. It also supports a failure section: a current batch buys ordinary
   levels, not an unannounced specialization. **Limitation:** every named
   specialization is a suggestion, not a shipped mechanic. Defense Post is not
   upgradable at the tag despite the wishlist, while SAM is. Accessed
   2026-09-28.

## YouTube videos (3 opened with verifiable captions)

1. **Ultimus_Rex - "The ULTIMATE OpenFront.io Tutorial and Strategy Guide!"**,
   uploaded **2025-04-29**, 32:14:
   <https://www.youtube.com/watch?v=EdcdsayA_ac>. **Player problem:** understand
   structures, shortcuts, and investment order in one tutorial. **Caption
   observations:** at 02:34-03:01 the narrator compares disposable Warship spend
   with persistent Ports/Cities and shifts from Cities early to Ports later; at
   04:37-04:58 the narrator frames extra Cities as an early advantage; at
   05:15-05:49 they explain the radial/build-menu workflow and an older rapid
   placement technique. That last passage is precisely why the new guide must
   pin current execution to v0.34.20 instead of teaching an old spam gesture.
   **Limitation:** the video predates the current bulk menu and contains stale
   values, including an old City capacity number. It supplies user workflow and
   decision context only; no current number comes from it. Accessed and caption
   read 2026-09-28.

2. **Enzo Plays - "How to Win EASILY in OpenFront.io"**, uploaded
   **2026-01-18**, 27:31:
   <https://www.youtube.com/watch?v=guICwW4T4GE>. **Player problem:** build a
   manageable Team position while choosing among Ports, Cities, Factories, and
   safety. **Caption observations:** at 02:14-02:49 the creator places a Port,
   notices the absence of useful piracy/trade evidence, then considers another
   Port and a Warship; at 12:44-13:28 they prioritize one City, check Gold, and
   wait after the first City rather than buying a blind sequence; at
   25:45-25:58 they reassess connected infrastructure before adding one Factory.
   These repeated one-step checks support BATCH's recommendation to prove the
   next level before selecting a large batch. **Limitation:** one narrated Team
   match is not a controlled cost test and predates v0.34.20. It provides the
   observable reassessment pattern, not the batch price. Accessed and caption
   read 2026-09-28.

3. **Enzo Plays - "This Endgame Strategy Is Devastating | OpenFront.io"**,
   uploaded **2026-07-13**, 24:39:
   <https://www.youtube.com/watch?v=j-YsQz38AXg>. **Player problem:** escape a
   constrained endgame by choosing the next infrastructure purchase while
   borders and trade routes keep changing. **Caption observations:** around
   02:02-02:49 the creator adds one City, then a Defense Post, then chooses one
   Factory only after recognizing a need for a new trade zone; around
   04:13-04:53 the creator sees that no new trade route opened, re-evaluates,
   adds one Factory for Gold, and later adds one City. The sequence demonstrates
   why a fast `x10` input is dangerous when each next level has a different
   opportunity cost and the map can disprove the plan seconds later.
   **Limitation:** the recording does not demonstrate the v0.34.20 radial batch
   menu and offers no authoritative formula. It is used solely as a worked
   example of incremental evidence and stopping points. Accessed and caption
   read 2026-09-28.

## Cross-source synthesis and writing direction

The three Reddit records expose one repeated misunderstanding: players see
`x25` or `x50` in a high-Gold match and describe it as mass placement, while the
current code models a bounded amount attached to one build or upgrade intent.
The three captioned videos show why this matters strategically. Experienced
creators repeatedly buy one Port, City, or Factory, inspect whether the route,
capacity, or position changed, and only then buy the next one. The bulk menu
removes repetitive input after that proof; it does not remove the need for the
proof.

The guide should therefore be a cost-and-commitment page, not another control
list. Lead with a direct answer: choose `x1` while the next level is a test;
choose `x5/x10/xMax` only when every level in the batch performs the same proved
job and the displayed cumulative total leaves the required reserve. Show the
five upgradable types and the non-upgradable Defense Post boundary. Explain the
shared Port/Factory counter and compare the 3.75M City `x5`, 8.75M Port `x10`,
5M Silo `x5`, and 15M SAM `x5` scenarios. Finish with failure modes: confusing
levels with separate placements, multiplying the current marginal price,
batching through an unproved route, draining all reaction Gold, applying nuclear
menu advice to structures, and assuming a wishlist specialization exists.

**Valid source count:** 3 Reddit discussions, 3 YouTube videos with readable
English captions, and 7 official first-hand URLs (one formal Release plus six
tagged source/test URLs). The research body is over 600 English words. Community sources
establish demand language and decision situations only; the immutable v0.34.20
tag remains the authority for every current rule, cost, eligible type, and cap.
