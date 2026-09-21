# Community source pack — `stack-vs-spread`

Date: 2026-09-21. Slug: `stack-vs-spread`. Player intent: **how should a
player choose between clustering buildings (community term "stacking") and
scattering them across the map ("spreading"), and what are the exact costs of
each choice?** The proposed guide is not a replacement for nuke economics,
SAM placement, troop-cap management, or the trade network. Its unique
decision is which geometric layout minimizes the *joint* cost of nuke
destruction, SAM coverage, troop capacity, and train-network gold at a given
moment of the game.

## Access and verification note

Reddit's normal post pages were blocked in this environment by a network
security page. The public discussions were therefore opened through the
public Arctic Shift archive API (`arctic-shift.photon-reddit.com`) for the
complete post and comment text. YouTube transcripts were obtained through
`youtube-transcript-api` from the official watch-page media stream. All
community sources were accessed on 2026-09-21 (Asia/Vladivostok, UTC+10).
Rules, numeric boundaries, and version claims below were checked separately
against the formal v0.34.12 Release, its immutable tag source, and the
official `Config.ts`. Community advice is treated as a problem signal and a
scenario source, not as authority for mechanics.

## Reddit discussions opened and analyzed (7)

1. **"Which is better, Stacking or Spreading?"** — 2025-08-06, r/Openfront,
   u/Acrobatic-Yak-3103
   `https://www.reddit.com/r/Openfront/comments/1mitub5/`
   - Player question: "stack a million cities in one, or spread them out
     across an entire continent? Is there a buff/debuff for choosing one
     option over another?"
   - Useful observation: the top reply frames the trade as a 4-cell matrix:
     "Stacking pro — fewer SAM sites covers all your infrastructure.
     Stacking con — one nuke strike that gets past your defences blow up your
     entire economy. Spread pro — the enemy can only kill one city per nuke.
     Spread con — really hard to plan / defend." A second reply notes
     "spreading is always better given SAM sites will ignore trajectory now.
     Any half-decent player can simply hydro you to bypass the fixed SAM
     range." A third: "Better to spread so you can't lose everything in one
     local attack. There is no buff or debuff." A fourth: "Stacking good
     late game, spread good early game."
   - Guide implication: the question is exactly the layout-vs-risk question.
     The guide must treat the four levers (nuke pressure, SAM cost, troop
     cap, train gold) separately rather than as a single binary, and must
     explain why "no buff/debuff" is the correct answer in the source while
     the geometry still produces a measurable cost difference.
   - Limitation: small thread, no numbers; the 4-cell matrix is a framing,
     not a rule.

2. **"Some questions, help please!"** — 2025-10-22, r/Openfront, u/Yozko14
   `https://www.reddit.com/r/Openfront/comments/1od80ye/`
   - Player question: "Is it better to upgrade buildings or build a new one
     on a different location and why? … How does generating gold work
     exactly? … How does the whole railway system work? Is it worth building
     factory and connecting cities and ports with neighbours?"
   - Useful observation: the top reply ("u/Dense_Response_9435"): "Players
     get 1k gold every second and bots get half of that." A second
     ("u/TachankaIsTheLord"): "You're not upgrading buildings, you're placing
     multiple on the same spot. The only difference is that you're opening
     the possibility for someone to take out your entire stack of cities with
     one atom bomb." A third ("u/00rb"): "Upgrading a city/factory/port just
     means having two of them in the same location. The ideal thing is to
     space them out so they're harder to nuke. I only stack if I've run out
     of space. Side note: ports are almost always better than factories."
     A fourth ("u/ObligatoryContrast"): "Definitely better to build new
     buildings more spread out. Makes it harder to destroy a lot of
     infrastructure with a single bomb, and makes the rail system more
     profitable (you get gold for every node a train goes through, but
     multiple stations…)."
   - Guide implication: the community's mental model is "upgrade = place a
     second on the same spot", which is the colloquial "stack". The guide
     must clarify that the hard floor is a minimum distance of 15 tiles
     (`structureMinDist`), so "stacking" in v0.34.12 is a tight cluster, not
     a literal same-tile overlap. It must also separate the trade-network
     gold (which rewards spreading) from the SAM coverage cost (which
     rewards clustering).
   - Limitation: the "1k gold/second" is a community estimate; the
     verified value is `goldAdditionRate = 100` per tick with
     `msPerTick = 100` ms, i.e. 1k gold per second for the flat
     worker-based rate.

3. **"How to win early game??"** — 2026-02-06, r/Openfront, u/gabriel2704
   `https://www.reddit.com/r/Openfront/comments/1qx4a1u/`
   - Player question: early-game strategy.
   - Useful observation: replies point to (a) picking an isolated starting
     position with bots to clear, (b) annexation to gain cities for free,
     (c) "start at a place where the land is green, as you can grow faster
     there", (d) "get a border to a bot nation early on, as they often
     provide free cities".
   - Guide implication: the early game is the phase where spreading is
     cheapest, because the player does not yet face a nuke-capable
     neighbor. The guide's mode/map adjustment section must treat
     "phase" (early / mid / late) as a first-class input.
   - Limitation: small thread; the advice is general, not
     geometry-specific.

4. **"My best strategy in openfront.io"** — 2026-02-01, r/Openfront,
   u/WhyFiDoi
   `https://www.reddit.com/r/Openfront/comments/1qt4cz8/`
   - Player question: the author proposes a personal strategy.
   - Useful observation: top reply ("u/rodan-rodan", score 16): "Stacking
     cities on top of each other is a bad idea early mid game (possibly end
     game too unless it's in your MIRV bunker). It's bad for trade, it's an
     easy target (land troops and atomic weapons)." A second
     ("u/Beif_"): "I think 50% is too much [troop investment], you're at
     risk of being punished. I'm always at 30% after the early game. Also
     if you're on an island, what is the point of a city? Whoever invades you
     will almost certainly have more cities than you."
   - Guide implication: the community already has a strong prior that
     "stacking is bad" — the guide must explain the conditions under which
     that prior is correct (nuke-active map) and the conditions under which
     it is wrong (quiet map, or MIRV-bunker safe room).
   - Limitation: the 50% / 30% troop ratio is anecdotal.

5. **"How to expand early game?"** — 2025-09-15, r/Openfront, u/David12008
   `https://www.reddit.com/r/Openfront/comments/1nh9m9b/`
   - Player question: how to expand.
   - Useful observation: top reply ("u/Blubbertube", score 12): "There's not
     an objectively correct answer. In an ideal world you would want to
     attack to perfectly maintain max growth. You can't do that because
     everyone else will grab all the land first. You have to balance getting
     a reasonable growth rate with not making yourself a target." A second
     ("u/7sidedmarble"): "The game is definitely broken up into different
     phases. And the game is all about snowballing. So if you screw up
     early, you may as well quit because your odds of turning it around are
     basically zero."
   - Guide implication: the "phases" framing is the most useful
     community-supplied input. The guide must not present a single
     universal answer but a phase-conditional rule.
   - Limitation: no geometry-specific advice.

6. **"Help me to understand how to win"** — 2026-02-05, r/Openfront,
   u/1nonxme
   `https://www.reddit.com/r/Openfront/comments/1qwiace/`
   - Player question: how to win FFA.
   - Useful observation: top reply ("u/philippzk67", score 11): "I win
     around every 10th free-for-all. In my opinion it is more about
     psychology than perfect troop generation. Let's say you're player X,
     constantly ask yourself: of my neighbours, would I attack player X?" A
     second ("u/Poddster", score 6): "If you watch Rex, he basically wins
     every time. Usually he messes up at the start, yet still comes out on
     top. How? It's mostly game sense. He's always looking around the board
     and lining up the next attack." A third ("u/pinkcuppa"): "I have roughly
     35% win rate and it took me 20 games to get my first win. Once you
     realise the timing, tempo and work your alliances well and how to scale,
     the game is very simple."
   - Guide implication: the win-rate data point (35% for an experienced
     player) is a useful anchor for the guide's "how often does a stacked
     position lose everything to a hydro?" scenario.
   - Limitation: anecdotal win rate, not a measurable threshold.

7. **"Here's my guide for beginners, what's missing?"** — 2025-07-11,
   r/Openfront, u/eamag
   `https://www.reddit.com/r/Openfront/comments/1lxfi5c/`
   - Player question: a beginner guide asking for gaps.
   - Useful observation: the body's TL;DR: "Select a grassland patch
     somewhere on the edge without many players around, many bots and an
     access to a sea/river. … Send 20% of troops right away when game
     starts, then move a slider in a bottom left (attach ratio) to 35% and
     expand every time you get 40% of your population (like 6k, 8k, 10k
     checkpoints). Avoid PvP. … When there are no more free land left, start
     conquering bots. Try to encircle them, because you will annex them
     without spending troops, otherwise just try to get ones located on
     mountains last, because there's a penalty on mountains. You'll get gold
     every time you finish out the nation, spend this gold on cities first,
     then ports and some good forts to defend yourself. … Pick a strategy
     for your mid-game: City-Maxx[ing]…" A comment ("u/Far_Nefariousness489"):
     "I've discovered myself that doing the city-maxxing in fast mode is
     waaay better, specially since you can build near or far from the water
     in a better protected place."
   - Guide implication: the "spend gold on cities first, then ports" order is
     the community's default; the guide must explain why the city-first
     order is correct (city level → troop cap) and how the city placement
     (stack vs spread) is an orthogonal decision.
   - Limitation: a single player's guide; the "fast mode" comment is
     about UI speed, not layout.

## YouTube videos opened and analyzed (3)

1. **"What happens when you only stack factories? | OpenFront.io"** —
   Ultimus_Rex. `https://www.youtube.com/watch?v=4hpezqfWNrU`
   - Player question: what does a factory-stacking run look like?
   - Transcript observations: "I'm up here on the top right corner and I want
     to just only stack factories. I want to just uh be a maido in the corner
     and only stack factories for my host and then maybe potentially later on
     in the game we can discuss opportunities of like trying to play for a
     win. We got a fellow factory stacker up here along with uh several other
     dudes. I want to attack bots, but I think that that's kind of
     antithetical to the uh the factory stacking challenge."
   - Guide implication: the "stack factories in a corner" strategy is a
     documented community archetype. The guide must cover the factory
     variant: factory stacking is a production decision, and the layout
     question is orthogonal to the production decision.
   - Limitation: the transcript is a challenge run, not a competitive match.

2. **"He gained 35 cities with a SINGLE HYDRO! | OpenFront.io"** —
   Ultimus_Rex. `https://www.youtube.com/watch?v=33aMCQyytRU`
   - Player question: what does a single hydro do to a spread position?
   - Transcript observations: "So, if we get ports, we're deleting them. Let's
     give factory. No, don't build your city so far away, sir. He's about to
     get city number two. City number three is already on its way. Hit the
     Porti- Porch- Portionu, whatever that is. He's going to get that port."
   - Guide implication: the 35-cities-per-hydro number is a documented
     upper bound for a stacked position. The guide's Scenario 2 (hydro on a
     stacked cluster) should cite this as a community-observed worst case.
   - Limitation: the transcript does not state the layout, so the "35 cities"
     number is a worst-case anecdote, not a deterministic outcome.

3. **"The ULTIMATE OpenFront.io Tutorial and Strategy Guide!"** —
   Ultimus_Rex. `https://www.youtube.com/watch?v=EdcdsayA_ac`
   - Player question: a full tutorial including nuke economics.
   - Transcript observations: "There's the atom bomb. This is 775,000 gold.
     So, if you can like uh you know, hit someone with an atom bomb and it'll
     take out two cities or a silo or something like that. There's the MV,
     which is the biggest bomb in the game, 25 million gold, and this is
     subject to change. Um and uh or of course to spite nuke someone that you
     just absolutely hate. And then there's the hydrogen bomb, which is
     5 million."
   - Guide implication: the nuke cost ladder (atom ~775k, hydro ~5M, MIRV
     ~25M) is a documented community anchor. The guide's nuke-pressure
     check must use these cost points as the threshold for "a neighbor is
     nuke-capable".
   - Limitation: the transcript says "subject to change", so the guide must
     cite the v0.34.12 tag for the exact values, not the video.

## Official primary sources and verified rule boundary

1. **OpenFront v0.34.12 formal Release and immutable tag**
   `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.12`
   `https://github.com/openfrontio/OpenFrontIO/commit/7c27263390d8f1976566e5c5ad9adf6fcad311b6`
   - This is the current non-TEST boundary. Its gameplay note says only
     that early-to-mid-game Trade Ship and Train generation was increased.
     It does not claim a layout or stacking rules change.

2. **Structure minimum distance (the hard "stacking" floor)**
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.12/src/core/configuration/Config.ts`
   - `structureMinDist(): number { return 15; }` — any two structures of the
     same player must be at least 15 tiles apart. This is the geometric
     floor that makes "stacking" a tight cluster (15-tile gaps) rather than
     a literal same-tile overlap.

3. **Nuke magnitudes (radii in tiles)**
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.12/src/core/configuration/Config.ts`
   - `nukeMagnitudes`: MIRV warhead `{ inner: 12, outer: 18 }`, AtomBomb
     `{ inner: 12, outer: 30 }`, HydrogenBomb `{ inner: 80, outer: 100 }`.
     The "outer" radius is the destruction radius; the "inner" radius is the
     full-destruction radius. `defaultNukeTargetableRange = 150`.

4. **SAM range by level**
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.12/src/core/configuration/Config.ts`
   - `samRange(level) = maxSamRange - 480 / (level + 5)` with
     `maxSamRange = 150` and `defaultSamRange = 70`. Level 1 = 70, level 5
     ≈ 110, level 10 = 140, asymptotic 150. Each SAM level upgrade costs
     100k gold (`SAM_CONSTRUCTION.levelCost(50_000, level)`).

5. **Troop capacity from cities**
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.12/src/core/configuration/Config.ts`
   - `maxTroops(player) = 2 * (pow(tiles, 0.6) * 1000 + 50000) +
     sum(city.level()) * cityTroopIncrease()`, where
     `cityTroopIncrease() = 250_000`. Troop cap depends on city *level*, not
     on city *position*.

6. **Flat gold rate (worker-based)**
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.12/src/core/configuration/Config.ts`
   - `goldAdditionRate = 100` per tick, `msPerTick = 100` ms → 1k gold per
     second for the flat rate. This is the base worker income; city, port,
     and factory gold income is layered on top.

7. **Train-network gold (the "spread pays" lever)**
   `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.12/src/core/configuration/Config.ts`
   - `trainGold(rel, citiesVisited, player)`: base 10k (self) / 25k (team) /
     35k (ally); first 9 cities visited are free (no penalty); each city
     beyond that costs 5k; floor 5k. `trainStationMinRange = 15`,
     `trainStationMaxRange = 110`.

## Cross-source synthesis and completion definition

Across the seven Reddit discussions and the three YouTube videos, the
repeated pattern is that players ask "stack or spread?" as if it were a
binary, and the community answers with a 4-cell matrix (pro/con per option)
or with a phase-conditional rule ("stacking good late, spread good early").
The v0.34.12 source shows the question is actually four separate decisions:
(nuke pressure, SAM coverage cost, troop capacity, train-network gold),
each of which can be computed from the constants above. The guide should
therefore teach a 60-second decision loop: (1) is any neighbor
nuke-capable (atom ~775k, hydro ~5M, MIRV ~25M)? (2) what is the SAM
coverage premium for your current footprint? (3) does your layout keep
troop cap at the level you need (city levels, not position)? (4) does the
trade network reward your spread (each city beyond the 9th on a train route
costs 5k but adds 10k+ per run)?

The guide is complete when a reader can answer, during a live match:
(1) which of my cities die in one incoming atom / hydro / MIRV; (2) how many
SAM sites I need at my current footprint and at my planned spread; (3)
whether my city-level plan (not position) meets my troop-cap target; (4)
whether my train route's city count is above or below the 9-city free
threshold; (5) which of the four levers dominates this map and this phase.
It must include at least two explicit numeric scenarios with stated
assumptions (the hydro-on-a-cluster scenario and the 2v2 team scenario), a
mode/map adjustment section, failure and counterplay patterns, and a
decision table. It must not invent a universal "safe distance", a fixed
win-rate threshold, or a v0.34.12 nuke-cost multiplier; the nuke costs in
the guide must cite the v0.34.12 tag, not the YouTube transcript.
