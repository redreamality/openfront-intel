# Source pack — Yangtze River FFA openings

- Topic: Yangtze River map, FFA spawn/opening strategy
- Slug: `yangtze-river-ffa-openings`
- Map id: `yangtzeriver`
- Added: v0.34.0, upstream commit `35a3692d` (PR #4807)
- Access date for every source below: **2026-09-29**
- Note: all numbers and version boundaries are re-checked against official first-hand
  sources (GitHub commit, map `info.json`/`manifest.json`, `Maps.gen.ts`, v0.34 changelog,
  and a local terrain parse of `map4x.bin`). Reddit/YouTube sources supply player
  questions, observed play patterns, and failure modes; they do not define rules.

## Official first-hand sources (rule/number authority)

### 1. GitHub commit that added the map
- URL: https://github.com/openfrontio/OpenFrontIO/commit/35a3692d
- Title: "Adds Yangtze River map (Upside Down U-shaped pipe river map) (#4807)"
- Date: v0.34.0 window (consumed cursor is v0.34.20, 2026-09-26)
- Player question answered: When did Yangtze River appear and what is its design intent?
- Observations: The commit message names the map's core design: an upside-down U-shaped
  pipe of river. That is the spine the whole FFA opening problem revolves around — every
  opening on the main continent is measured against how close it is to that river.
- Limitations: A commit title is a design hint, not a balance statement; it does not tell us
  which side is better.
- First-hand: yes.

### 2. Map generator metadata — `map-generator/assets/maps/yangtzeriver/info.json`
- Repo path: `OpenFrontIO/map-generator/assets/maps/yangtzeriver/info.json`
- Observations (parsed 2026-09-29):
  - `name`: Yangtze River; `id`: YangtzeRiver; `translation_key`: map.yangtzeriver
  - `categories`: `["new", "asia"]`
  - `multiplayer_frequency`: 3
  - 9 default nations, all flag `cn`:
    - Shanghai [3306,1778], Taizhou [1926,640], Nantong [2695,894], Changzhou [2223,1072],
      Nanjing [1040,1054], Wuhu [86,2200], Zhenjiang [1548,872], Ma'anshan [749,1529],
      Daishan Island [3724,2544].
- First-hand: yes.

### 3. Shipped map manifest — `resources/maps/yangtzeriver/manifest.json`
- Repo path: `OpenFrontIO/resources/maps/yangtzeriver/manifest.json`
- Observations (parsed 2026-09-29):
  - Full map 3840×2552, `num_land_tiles`: 1877550 (full-res)
  - `map4x` 1920×1276, `num_land_tiles`: 464270 — this is the passable-land count used for
    the local terrain analysis below.
  - Same 9 nations as the generator file.
- First-hand: yes.

### 4. Rotation logic — `src/core/game/Maps.gen.ts`
- Observation: Yangtze River has `ffaFrequency: -1`, which per `MapPlaylist.ts` falls back to
  `multiplayerFrequency: 3`. Net effect: Yangtze River **is in the public FFA rotation** and
  shows up at the same base weight as a normal multiplayer map. A player choosing "FFA" can
  be handed Yangtze River without any special setup.
- First-hand: yes.

### 5. Local terrain parse of `map4x.bin` (1920×1276, 1 byte/tile)
- Encoding: bit7(0x80)=land, magnitude 31 (lower 7 bits) = impassable; non-land = water.
- Verified per-nation geometry (coordinates scaled from 3840-space to 1920-space):
  - Shanghai x1653/y889 → far SE, component 50001+ (giant continent), dist-to-water 83.
  - Taizhou x963/y320 → north-central, dist-to-water 43.
  - Nantong x1348/y447 → NE, dist-to-water 58.
  - Changzhou x1112/y536 → center-east, dist-to-water **24** (closest of all to the river).
  - Nanjing x520/y527 → center-west, dist-to-water 78.
  - Wuhu x43/y1100 → far SW corner, dist-to-water 38.
  - Zhenjiang x774/y436 → north-central-west, dist-to-water 54.
  - Ma'anshan x375/y765 → west, dist-to-water 33.
  - **Daishan Island x1862/y1272 → a true isolated micro-island: component size 701,
    only 17 tiles to water on every side.** It is the only non-continent opening.
- Global: passable land 464270 (matches manifest), water 146742.
- Strategic reads (mine, grounded in the numbers above):
  - 8 of 9 openings share one giant connected continent, so the dominant FFA decision is
    **adjacency to other players and to the river**, not being cut off.
  - Every main-land opening is within 24–83 tiles of water, so **a port is realistically
    open to almost every opening** — the map punishes landlocked-thinking less than most.
  - Changzhou is the closest default nation to the river spine (dist 24): the strongest
    "be on the pipe" default opening.
  - Wuhu (SW corner) and Shanghai (SE corner) are corner spawns: two borders to defend,
    less flanking exposure.
  - Daishan Island is the only opening that is a self-contained economy: safe, slow, and
    requires boats to matter.

## Reddit sources (player questions + observed patterns)

Access method: `https://www.reddit.com/r/Openfront/comments/<id>/.rss` (Atom), retrieved with
a desktop User-Agent on 2026-09-29. Body text and reply text parsed from the Atom `content`.

### R1. Beginner's guide to the early game (placement factors)
- URL: https://www.reddit.com/r/Openfront/comments/1nx2yer/
- Title: "So you got addicted to OpenFront but keep losing? Don't worry, there's help [Beginner's guide to the early game]"
- Author u/lolllolol; published 2025-10-03; ~18 replies (19 entries incl. post); ~2345 words.
- Player question: How do I stop getting eaten in the first five seconds / how do I pick a
  starting position?
- Observations:
  - "Phase 0: Placement" — before the game you pick where to place your empire; three factors:
    **Position, Terrain, Other Players**.
  - Position: "Some parts of the map are just straight up better than others... Some parts
    of the map are just better. Especially in team games a lot is decided before the game
    starts."
  - Reply tone is blunt: "There are no friends in OpenFront. Only enemies who aren't
    attacking you at the moment." (u/Meta_Mushroom) — i.e. adjacency is a threat, not a comfort.
- Limitations: pre-v34; no Yangtze-specific claim. Used for the placement decision framework
  (position/terrain/neighbors), which is map-agnostic and directly applicable.

### R2. Concrete early-game ratios and building order
- URL: https://www.reddit.com/r/Openfront/comments/1qt4cz8/
- Title: "My best strategy in openfront.io"
- Author u/WhyFiDoi; published 2026-02-01; ~18 replies; ~178-word body (picture post).
- Player question: What ratio and build order do I run early?
- Observations:
  - Start at ~20% attack ratio, push toward 46–50%; conquer bots/nations; then **build a city
    if landlocked, a port if water is next to you**.
  - "Cities are like military bases with 10k ppl in them."
  - "If you have enough money for a SAM launcher (the thing that defends you from nukes),
    build one; then a silo. Not on an island though, that's stupid."
  - Failure mode: "Here I died because I did not make a port so I did not have enough money
    to make cities anymore."
  - Reply pushback (u/rodan-rodan): "Stacking cities on top of each other is a bad idea
    early/mid game — it's bad for trade, it's an easy target (land troops and atomic
    weapons)... 50% seems high for bot takedown."
  - u/PlasticSuggestion956: "I had to spend 75% of my troops, around 25k, just to conquer a
    bot with 5k." (cost of over-sending)
- Limitations: one player's anecdote, numbers are their personal calibration; treat ratios as
  ranges, not truths.

### R3. FFA win-rate / how luck-heavy the opening is
- URL: https://www.reddit.com/r/Openfront/comments/1mtkv6i/
- Title: "How often do you guys win?"
- Author u/MickeyTheDuck; published 2025-08-18; ~20 replies.
- Player question: How do people ever win FFA, it feels impossible?
- Observations:
  - u/bosa-: "I always get past the opening — aside from when I try an awful starting
    position and it fires back — then 30% of the times I get to the endgame but I never won."
  - u/UEMayChange: "I find myself winning 1 in every 3 or 4 games."
  - An experienced reply: "Probably 1/8 games. If I survive the early game, where luck is the
    biggest factor, then it's probably 1/4. A lot of games are hopeless within the first 2
    minutes."
- Limitations: self-reported win rates; used to support the claim that the opening is a
  high-variance, luck-sensitive phase — which makes the placement decision disproportionately
  valuable.

### R4. Map-selection frustration (why players want to be on a specific map)
- URL: https://www.reddit.com/r/Openfront/comments/1mhba7x/
- Title: "just me waiting for halkidiki FFA (read desc)"
- Author u/karasigma; published 2025-08-04; ~12 replies.
- Player question: I only want to play one map; why am I stuck on whatever rotates?
- Observations:
  - "Not all players want to play on whatever map is currently available... I think the devs
    should add at least 2 map/gamemode choices."
  - u/Vaan0: "I do think they should have an FFA-only option; I don't really care for team
    games."
  - u/FusionVsGravity pushes back on the assumption that a second option wouldn't thin the
    lobby.
- Limitations: about Halkidiki and lobby size, not Yangtze; used to establish that
  map-agnostic "waiting" is a real player cost — a reason a concrete per-map opening guide
  (like this one) has decision value.

## YouTube sources (verifiable transcripts)

Access method: watch-page HTML downloaded, then auto-generated captions pulled with `yt-dlp`
and converted to `.srt` on 2026-09-29; transcript text below is quoted from those files.
Titles/dates/views pulled via `yt-dlp --print`.

### Y1. Official new-maps playtest
- URL: https://www.youtube.com/watch?v=YtB4qwG-pC0
- Title: "We tried out the TOP SECRET new maps..." — channel OpenFront.io (feat. Ultimus_Rex)
- Published 2026-01-08; duration 1:00:21; 5,828 views.
- Player question: What do new maps actually feel like to open on?
- Observations (from transcript):
  - "I have to pick a spot. I almost didn't pick a spawn zone. That would have been [a
    problem]..." — spawn choice is a real live decision.
  - "Basically we should not have got such a good position..." and the streamer reacts to
    building "a city right near our borders."
  - "Going after NPCs early on in a game is crucial."
  - "Read some, pick your spawn carefully."
  - "At least we get the island. They can't plug us anymore." (island = defensive choke)
- Limitations: pre-v34 test build; maps shown are not labeled Yangtze in the caption stream.
  Used for the general "pick your spawn carefully + clear NPCs early + islands are defensive"
  pattern.

### Y2. Easiest-FFA-map stream (river/boat mechanics)
- URL: https://www.youtube.com/watch?v=G6zTcvslVio
- Title: "This is the easiest FFA map in OpenFront." — channel Ultimus_Rex
- Published 2025-12-24; 54:54; 10,986 views.
- Player question: How do I use a river map in FFA without bleeding my army?
- Observations (from transcript):
  - "I'm going to boat across this river. I will boat to a couple other areas."
  - "I just have to get borders so I can actually get his land now."
  - "I really hope I can get to that city in time... I did not have enough time to defend this
    before I started getting [attacked]."
  - "I really do not like that he took all of my external positions with a bunch of defense
    posts." / "My expansion opportunities have decreased greatly now."
  - "I'm also going to put down a port and start stealing some trade."
- Limitations: played on Black Sea / Europe, not Yangtze; the river/boat/port/defense-post
  patterns transfer to any pipe-river map, but not the exact nation names.

### Y3. 115-player Giant World FFA (late-scale port/positioning)
- URL: https://www.youtube.com/watch?v=1dMZQMLQISI
- Title: "They added the GIANT World Map to OpenFront..." — channel Ultimus_Rex
- Published 2026-07-13; 1:03:27; 33,140 views.
- Player question: In a big public FFA, what holds a position together?
- Observations (from transcript):
  - "Playing here on a 115 player free-for-all... on the Giant World map. This is my first
    time playing here on a public FFA."
  - "I should be able to get into this port before anyone else does."
  - "Put down a port just to solidify my position."
  - "I think the neighbor will probably steal the city before we get there."
  - "We don't really have good borders down here." / "He clearly has a position he could
    push in."
- Limitations: different (giant world) map; used for the "get the port first / the neighbor
  steals the city / borders define push direction" pattern that also governs Yangtze.

### Y4. V27 complete guide — the five spawn factors
- URL: https://www.youtube.com/watch?v=iZQDOuTVcLY
- Title: "OpenFront.io V27 Complete Guide (Everything You Need to Know)" — channel Enzo Plays
- Published 2025-12-16; 37:24; 17,739 views.
- Player question: What should I actually evaluate before I commit to a spawn?
- Observations (from transcript):
  - "One of the most important decisions you're going to make in Open Front is choosing your
    spawn." Five factors: **pace, terrain, pocket, proximity, and map characteristics and
    dynamics.**
  - "Picking a spawn fast can be really good so that other people don't potentially pick your
    spawn."
  - Terrain: green/plains fastest, highlands/mountains slower with higher troop loss —
    "you definitely want to prioritize greenland if you can."
  - Proximity: "how close you are to other players is really central to success" — many
    players competing for the same space means you clear bots slower.
  - Annexation: surround a nation, click at 1%, it disappears; "at the start you're trying to
    expand as quickly as possible, and the best way is to annex other nations."
  - Positional play: "putting my borders in and cutting off all of these bots" extends the
    bot-clearing phase for long-term outscaling, at the cost of slower immediate power.
- Limitations: generic map (Ball); but it is the single best source for a reusable spawn
  decision framework, which this guide applies to Yangtze's geometry.

## Synthesis — the unique intent this guide will answer

Across all sources the recurring, map-specific question is: **On Yangtze River specifically,
which of the 9 default openings maximizes early FFA survival and growth, and what do I do in
the first few minutes on each?** The community answers are scattered (generic placement
advice, personal ratios, win-rate anecdotes, new-map feel) and none of them touch Yangtze
River by name. This guide consolidates:
1. A spawn decision framework (pace / terrain / pocket / proximity / map-dynamics from Y4 +
   position-terrain-others from R1) applied to the 9 concrete openings.
2. Per-opening verdicts grounded in the local terrain parse (Changzhou on the pipe, corners
   Wuhu/Shanghai, Daishan Island the only true island, all main-land openings have port access).
3. A first-few-minutes action list per archetype (ratio ramp from R2, port-vs-city rule from
   R2/Y3, clear NPCs early from Y1, don't get boxed-in from Y4).
4. Failure modes and counters (died-without-port from R2, neighbor-steals-city from Y3,
   over-sending from R2, defense-post lockout from Y2, no-friends adjacency from R1).

No rule/number/version boundary above is taken from Reddit or YouTube; all of those are
re-verified against the commit, `info.json`, `manifest.json`, `Maps.gen.ts`, and the local
`map4x.bin` parse.
