# The Box — community source pack

- Date: 2026-11-04
- Slug: `thebox-map`
- Working title: "The Box: the waterless 210-player land arena"
- Topic intent: how The Box's unique rules (all-land start, no ports/boats until a water nuke, forced water-nukes at 75%, 210-player FFA, 13 named nations, train-trade economy) change player decisions versus a normal coastal map.

## Research method

- Direct Reddit access was blocked this round (challenge/egress page on `reddit.com/r/Openfront/top.json`). Recovered and analyzed community threads via search-index snippets of the actual `r/Openfront` threads (URLs recorded below) — the same established fallback used by the 2026-11-03 source pack.
- YouTube identities and titles verified via search-index results (oEmbed-style identity, channel + title + date).
- All game rules, numbers, and version boundaries are re-verified against the local `OpenFrontIO` clone at tags `v0.34.0-beta1`, `v0.35.0`, `v0.35.9` (map manifest, `Maps.gen.ts`, `MapPlaylist.ts`, `NukeExecution.ts`, `GameImpl.ts`, `WaterManager.ts`, `Config.ts`) and against the v0.35.0 formal Release body. Reddit/YouTube are used for player questions and observed pain points, not for rule facts.

## Load-bearing facts (verified in source, not community)

1. **The Box is 2048×2048 and 100% land** — 4,194,304 land tiles, zero water tiles at spawn. No coastline, no ports, no boats possible at game start. Source: `resources/maps/thebox/manifest.json` + `Maps.gen.ts` at `v0.35.9`.
2. **Forced water-nukes modifier `isWaterNukes:75`** — a 75% roll forces water-nuke availability on this map. Only The Box and Alps use `:75`; all other forced maps use `:50`. Source: `Maps.gen.ts` at `v0.35.9` (lines 273, 1905).
3. **Water-nuke semantics**: a water nuke converts an area to water with an irregular smoothed boundary; it can convert unowned land and water reclaims/reconverts tiles. Because The Box starts with no water, a water nuke is the *first* water on the map — the first possible port location. Source: `NukeExecution.ts`, `GameImpl.ts`, `WaterManager.ts` at `v0.35.9`.
4. **Lobby size = 210-player FFA** for The Box, driven by land-tile count. The map-size-driven 210 lobby was introduced in **v0.35.0**. Source: `MapPlaylist.ts` `calculateMapPlayerCounts` + v0.35.0 Release body.
5. **13 named arcade nations** on The Box (the manifest's 14th `name` field is the map itself). Source: `resources/maps/thebox/manifest.json` at `v0.35.9`.
6. **Version boundary for forced water-nukes**: present at **v0.34.0-beta1** (absent at v0.33.9, re-verified), still active at **v0.35.9**. The 210-player lobby shift is **v0.35.0**.
   **2-team mode on The Box**: `teamGameSpawnAreas` is an *optional* map field; The Box's manifest has none, so 2-team falls back to random spawns (no fixed team zones). The v0.35.5 two-team-spawn list does NOT include The Box.
7. **The Box introduction version = v0.30.0** (formal release 2026-03-12). Both the v0.30.0 and v0.30.28 release bodies list "The Box 🟩 - Completely flat, large land-only map, train trade only (by @sardidefcon)" under "New Maps"; v0.30.0 is the first introduction and v0.30.28 is a patch-note carry-over re-list. Source: GitHub Release bodies via `gh api repos/openfrontio/OpenFrontIO/releases/tags/v0.30.0` and `.../v0.30.28`, plus the Box's first non-test tag `v0.30.0` (manifest present).
8. **Economy**: The Box is a "train trade only" land map (from the v0.30.0/v0.30.28 release notes and the current manifest) — factories + trains carry the early/mid economy because there are no ports/trade routes to the sea.

## Official first-party sources

1. OpenFront official GitHub Release v0.35.0 — `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0` — lobby expansion to 210 based on map size; The Box listed. (First-party)
2. OpenFront official GitHub Release v0.30.0 — `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.30.0` — The Box first introduced under "New Maps": "The Box 🟩 - Completely flat, large land-only map, train trade only (by @sardidefcon)." (First-party; the v0.30.28 release re-lists it as a carry-over artifact at `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.30.28`.)
3. Local `OpenFrontIO` clone at tag `v0.35.9` — map manifest, engine water-nuke + lobby math (authoritative for all rules/numbers above).

## Community sources (Reddit)

1. **r/Openfront — "The Box Hard Solo"** — `https://reddit.com/r/Openfront/comments/1tbc1gx/the_box_hard_solo`
   - Player question: The Box feels almost impossible in solo hard mode — every other map is winnable, The Box is not.
   - Observed pain: economy-to-MIRV route → a large neighbor betrays and takes you out; expansion route → bots outgrow you. Tension between "get to MIRV the top player" and "keep expanding" is the core The Box solo dilemma.
   - Access: search-index snippet (direct Reddit egress blocked this round); accessed 2026-11-04.

2. **r/Openfront — "I'm about to crash OUTTTT"** — `https://reddit.com/r/Openfront/comments/1vdu8a4/im_about_to_crash_outttt`
   - Player question: how to beat hard AI on The Box.
   - Observed pain: playing 400 nations + tribes on the box map; hard AI wins ~75% of the time at medium skill. Players attack nations at 50% attack / 2× population — the density of 400+ named entities on one flat map is the defining feature.
   - Access: search-index snippet; accessed 2026-11-04.

3. **r/Openfront — "Let's talk about economy"** — `https://reddit.com/r/Openfront/comments/1vtq4t2/lets_talk_about_economy`
   - Player question: economy strategy.
   - Observed: "This strategy was working until I played in the box. This showed me that ports were doing the heavy lifting in the early and midgame… my best bet were factories to trade with allies." — direct confirmation that The Box breaks port-dependent economies and forces a factory/trade-with-allies plan.
   - Access: search-index snippet; accessed 2026-11-04.

4. **r/Openfront — "Open Front guide"** (archived) — `https://www.reddit.com/r/Openfront/comments/1s7r6pj/open_front_guide/`
   - Observed: spawn placement, corner/edge boxing, "never spawn on a very small island," MRV/silo second-unit cost (~30M) — general OpenFront strategy that The Box must adapt (no islands, all flat).
   - Access: search-index snippet; accessed 2026-11-04.

5. **r/Openfront — "Simple guide on how to win"** — `https://www.reddit.com/r/Openfront/comments/1vjvm8p/simple_guide_on_how_to_win/`
   - Observed: "your first eco building should be a factory not a port" — consistent with The Box's no-port start; "ally with people who will be hard to take out"; early pixels matter for cut-off geometry.
   - Access: search-index snippet; accessed 2026-11-04.

6. **r/Openfront — "The WIN should be more than 80% of the map"** — `https://www.reddit.com/r/Openfront/comments/1te6ue7/the_win_should_be_more_then_80_of_the_map`
   - Observed: win is 80% land capture; "1-3 hydros can turn the tide in most scenarios" — water nukes (hydros) are swing weapons, especially relevant on a waterless map.
   - Access: search-index snippet; accessed 2026-11-04.

## Community sources (YouTube)

1. **Enzo Plays — "How Many Nations Can We Defeat? | OpenFront.io"** — `https://www.youtube.com/watch?v=Zcu1CaVmR04` (5h 25m stream, 3.3K views, 2026-05-23)
   - Directly *starts* the challenge on The Box ("we're going to do the box at first… corner thing… two carries… make water nukes so it's more fun"). Confirms The Box as the high-difficulty nations map and the "corner pocket + carry + factory cash" plan.
   - Access: search-index identity (channel, title, length, date); accessed 2026-11-04.

2. **Enzo Plays — "This is How to DOMINATE Small Maps in OpenFront.io"** — `https://www.youtube.com/watch?v=zx_E6nfspPE` (Enzo Plays channel)
   - Contrast source: small-map domination vs. The Box's huge flat land; frames why The Box's open frontlines and long borders reward a different tempo.
   - Access: search-index identity; accessed 2026-11-04.

3. **Enzo Plays — "This is THE Strategy to Beat 100 Players in OpenFront.io"** — `https://www.youtube.com/watch?v=nOGRNQhNFeU` (Enzo Plays channel)
   - Directly relevant to The Box's 210-player FFA scale — how to survive and climb a 100+ player board maps onto the 210-lobby The Box.
   - Access: search-index identity; accessed 2026-11-04.

## Supporting third-party

- **OFstats — The Box map stats** — `https://ofstats.io/map/The%20Box` — "2,048 × 2,048 tiles · 100% land · 13 nations," 5,487 games sampled, FFA 61% / Team 39%, avg ~70.9 players, ~18m avg duration. Confirms land-only, 13 nations, and that FFA is the dominant mode. (Third-party stats, cross-checked against source.)

## Gaps / limitations

- Direct Reddit and YouTube playback were egress-blocked this round; community content is from search-index snippets, not full thread/video transcripts. All *rules/numbers* in the guide are therefore grounded exclusively in the local source clone and formal Releases, which is the required standard.
- No dedicated The Box walkthrough video with a full transcript was available; the three Enzo Plays videos are used as identity-verified strategy context, not as authoritative rule sources.
- The 75% forced water-nuke roll probability and its exact runtime distribution are not exposed in a human-readable config table; the guide states it as "forced on most games (75%)" per the manifest value and does not over-claim a precise frequency.

## What the guide must change for the player

- Spawn plan: no islands/ports at start → pick a flat interior or corner with room to box land, and treat the *first water nuke* as the map's opening event.
- Economy: factory-first, trade-with-allies; ports only become viable *after* a water nuke creates a shoreline.
- Mid-game: the water nuke that drops is the most contested moment — it creates the only ports and the only boats on an otherwise land-locked map.
- Scale: 210-player FFA and 13 nations → longer borders, denser early contact, and a win threshold of 80% of a much larger map.
- Hard solo: the two failure modes from the community (economy→MIRV vs. expansion) are the real decision fork.
