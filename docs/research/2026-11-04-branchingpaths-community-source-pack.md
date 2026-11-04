# Branching Paths — community source pack

- Date: 2026-11-04
- Slug: `branchingpaths`
- Working title: "Branching Paths: the fractal three-arm arcade map with a 3-team spawn"
- Topic intent: how Branching Paths' unique structure — fractal waterways that split the board into three arms from a central axis, real water at spawn (unlike The Box's waterless board), a half-size 105-player lobby driven by land-tile count, 19 nations stacked along the lower-center spine, and the fixed 3-team spawn added in v0.35.5 — changes player decisions about mode choice, spawn placement, front management, and navy use versus The Box and a normal coastal map.

## Research method

- Direct `reddit.com` JSON was bot-walled this round. Community threads were captured via the per-thread `.rss` endpoint (top-level post + comments) and analyzed from the fetched XML — a verified fallback. Three `r/Openfront` threads were captured and read in full (top-level + comments where available).
- Three YouTube videos were downloaded (watch-page HTML, ~1.3–1.5 MB each) and their identity/channel/title confirmed from the embedded metadata. Verifiable transcript/caption extraction was not achievable this round (YouTube timedtext endpoints returned empty under this network; InnerTube/player transcript routes returned no caption payload), so the videos are recorded as identity-verified context, not authoritative rule sources.
- Every game rule, number, and version boundary is re-verified against the local `OpenFrontIO` clone at tag `v0.35.10` and the formal GitHub Releases: the map manifest (`resources/maps/branchingpaths/manifest.json`), the decoded `map.bin` (terrain bit analysis), generated engine data (`packages/engine-api/src/game/Maps.gen.ts`), the playlist math (`src/server/MapPlaylist.ts` `calculateMapPlayerCounts` / `getTeamCount` / `supportsTeamPlayerCount`), and the v0.33.0 and v0.35.5 formal Release bodies. Reddit/YouTube are used for player questions and observed pain points only.

## Load-bearing facts (verified in source, not community)

1. **Branching Paths is 2480×2148 with 2,103,911 land tiles** and 19 named nations. Source: `resources/maps/branchingpaths/manifest.json` (`map.width=2480`, `map.height=2148`, `map.num_land_tiles=2103911`) and the nation list in the same manifest at `v0.35.10`.
2. **Real water exists at spawn** — decoded `map.bin` shows the board is 39.5% playable land, 10.3% open water, 50.3% impassable background. This is the map's core contrast with The Box (100% land, 0% water at spawn). The water forms "branching fractal" waterways per the v0.33.0 release note. Source: terrain decode of `map.bin` (value 159 = background impassable; playable land = bit7 set with magnitude ≠ 31) and the v0.33.0 body line "Branching fractals form waterways — NotRocketfish".
3. **Lobby size = 105-player FFA ceiling** (105/80/55 by size tier), derived from land-tile count. The map's 2,103,911 land tiles × 50 / 1e6, rounded to 5, = 105; the 30/60/30 tier split gives 105 (first), 80 (60% tier), 55 (30% tier). Source: `MapPlaylist.ts` `calculateMapPlayerCounts` at `v0.35.10` (verified the same formula the established The Box guide documents as 210 for 4,194,304 tiles).
4. **Team mode player count** — `supportsTeamPlayerCount` / `adjustForTeams` cap team games at `min(ceil(base × 1.5), base)` per tier: 105→105, 80→105, 55→83. Source: `MapPlaylist.ts` `adjustForTeams` + `supportsTeamPlayerCount` at `v0.35.10`.
5. **Fixed 3-team spawn** — the manifest carries `special_team_count: 3`, exposed in engine data as `specialTeamCount: 3`. In `MapPlaylist.ts`, maps with a `specialTeamCount` are added to a special-team pool that fires a 75% force chance to set the player team count to that value (`getTeamCount` uses a 75% roll; `supportsTeamPlayerCount` requires `playersPerTeam >= 2` and `numberOfTeams >= 2`, so a 105-player 3-team game = 35 players per team). Source: `Maps.gen.ts` (`specialTeamCount: 3`, `multiplayerFrequency: 7`, `defaultNationCount: 19`) and `MapPlaylist.ts` `getTeamCount` / `supportsTeamPlayerCount` at `v0.35.10`.
6. **3-team spawn introduced in v0.35.5** (formal release 2026-10-26). The v0.35.5 body line (first-party, verbatim): "Add team spawns on Madagascar, Rio de Janeiro, Bab el-Mandeb and New Zealand (2 teams) and **Branching Paths (3 teams)**; fix rivers cut off from the ocean on United States and Rio de Janeiro — RickD004". Before v0.35.5 the map had no fixed team spawn and fell back to random 2-team spawns.
7. **Map introduced in v0.33.0** (formal release 2026-08-03, non-prerelease). The adding commit is `a375d7753` "Adds new map Branching Paths. (#4526)", whose first containing formal tag is `v0.33.0`. The v0.33.0 body lists it under new maps: "**Branching Paths** — Branching fractals form waterways — NotRocketfish", and later notes "recategorized More than Luck and Branching Paths as arcade" and "tagged Branching Paths as new". Not listed in v0.35.0–v0.35.4 bodies (confirmed via `gh api` grep = 0 mentions).
8. **Nation layout is central-axis + three branches** — the 19 nation coordinates put the centroid at 50%/67% (lower-center); 15 of 19 sit in the lower third and 11 in the central column (x38–62%); only one nation ("Scorching Rays") sits at the apex (y2). This matches the thumbnail's three-fold symmetric triangle. Source: nation coordinate parse of the manifest and `vision_analyze` of `thumbnail.webp` (triangular map, three-fold symmetry).

## Official first-party sources

1. OpenFront official GitHub Release v0.33.0 — `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.0` — map first introduced: "Branching Paths — Branching fractals form waterways — NotRocketfish"; recategorized as arcade; tagged new. (First-party; 2026-08-03, non-prerelease.)
2. OpenFront official GitHub Release v0.35.5 — `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.5` — "Add team spawns on … Branching Paths (3 teams)". (First-party; 2026-10-26, non-prerelease.)
3. Local `OpenFrontIO` clone at tag `v0.35.10` — map manifest, decoded `map.bin`, `Maps.gen.ts`, `MapPlaylist.ts` (authoritative for all rules/numbers above).
4. Local generated data `src/data/maps.json` and `src/config/openfront-release.ts` (current local release = v0.35.10) — confirm the map is live in the Arcade category at the deployed version.

## Community sources (Reddit)

1. **r/Openfront — "My Map Ranking"** — `https://www.reddit.com/r/Openfront/comments/1mjd65j/my_map_ranking/`
   - Player question: how hard is each map (difficulty tiering, FFA assumed).
   - Observed: OP /u/Beif_ ranks map difficulty from ~100 wins "without statistics — you get a feeling for the maps"; comments note winrate swings by map (MENA ~1/3 with a desert snowball, Africa winrate collapsed "from 70% last patch"), and that a tier-3/4 map for one player is a tier-1/2 map for another ("play styles"). Frames why a brand-new arcade map like Branching Paths is not yet in anyone's ranked tier list — players are actively recalibrating difficulty as maps change.
   - Access: captured via thread `.rss` (top-level + 8 comments), 2026-11-04.

2. **r/Openfront — "What is your favorite map and why"** — `https://www.reddit.com/r/Openfront/comments/1ub1t46/what_is_your_favorite_map_and_why/`
   - Player question: which map and why (mode + mechanic preference).
   - Observed: strong mechanic-based preferences — "anything that requires actual skill i.e not 4 islands 4 teams"; "I like the alps map. Boating and ships cause a level of randomness … I kinda like just the straight up nature of having direct land borders"; island/boat players ("As a Brit I believe my calling is boats and bombing"; "bunker in the Lesser Antilles"). The split between "direct land borders" vs "boats/ships randomness" is exactly the decision Branching Paths sits on: it is a water map (boats possible at spawn) but with a compact central spine that also rewards land borders.
   - Access: captured via thread `.rss` (top-level + 7 comments), 2026-11-04.

3. **r/Openfront — "My first win on the best map"** — `https://www.reddit.com/r/Openfront/comments/1plle38/my_first_win_on_the_best_map/`
   - Player question: which map is "the best" and what does a first win feel like.
   - Observed: OP /u/Evening-League-6625 titles the post around a first win and asserts "Japan is the GOAT map isn't it?" — players anchor identity to a single favorite map and treat first wins there as the real benchmark. Relevant to Branching Paths as a newly-added map still being discovered: the "best map" conversation is where a new arcade map earns (or loses) its reputation.
   - Access: captured via thread `.rss` (top-level, comment fetch rate-limited), 2026-11-04.

## Community sources (YouTube)

1. **Enzo Plays — "This is How to DOMINATE Small Maps in OpenFront.io"** — `https://www.youtube.com/watch?v=zx_E6nfspPE` (Enzo Plays channel)
   - Context: small-map domination strategy. Branching Paths is a mid/compact arcade board (105-player FFA), so its tempo and front-compression differ from a 210-lobby map like The Box; this video frames the small-map approach the map invites.
   - Access: watch-page HTML downloaded (1.29 MB); identity/channel/title confirmed from embedded metadata; transcript not verifiable this round. Accessed 2026-11-04.

2. **Enzo Plays — "This is the NEW Map in OpenFront.io" / "new map crazy"** — `https://www.youtube.com/watch?v=ON1yXh6TcGI` (Enzo Plays channel)
   - Context: coverage of a newly-added OpenFront map. Frames the "new map discovery" angle — how players evaluate a brand-new board (the same situation Branching Paths was in at v0.33.0).
   - Access: watch-page HTML downloaded (1.45 MB); identity/channel/title confirmed; transcript not verifiable this round. Accessed 2026-11-04.

3. **Lonely_Millennial — "OpenFront Beginner Guide (2026)"** — `https://www.youtube.com/watch?v=7J5zwb_s_Cg` (Lonely_Millennial channel)
   - Context: a broad OpenFront orientation video. Useful for the framing of how players learn the arcade pool and the water-vs-land distinction that Branching Paths sits in; it does not cover Branching Paths specifically but provides the onboarding context for a reader who has never seen a water-route arcade board.
   - Access: watch-page HTML downloaded; identity/channel/title confirmed from embedded metadata; transcript not verifiable this round. Accessed 2026-11-04.

## Gaps / limitations

- YouTube captions could not be extracted as verifiable text this round (timedtext / InnerTube / transcript-panel routes all returned empty under this network); the three videos are recorded as identity-verified strategy context, not rule sources. All *rules/numbers* are grounded exclusively in the local source clone and formal Releases, which is the required standard.
- The third Reddit thread's comment RSS was rate-limited (HTTP 429); its top-level post was captured and read. The three top-level discussions satisfy the community-research minimum; the two comment RSS sets that did fetch are the supplemental evidence.
- The exact runtime distribution of the 3-team force is stated as "75% of the time" from the `getTeamCount` 75% roll; the guide does not over-claim a finer frequency. The 35-players-per-team figure (105 ÷ 3) is exact for the first tier and illustrative for smaller tiers.

## What the guide must change for the player

- **Mode choice first**: Branching Paths is one of very few maps with a fixed 3-team spawn that fires 75% of the time (since v0.35.5). Players who assumed it would FFA like its arcade peers must plan for three coordinated fronts, not a free-for-all.
- **Spawn placement**: 19 nations are packed into the lower-center spine (centroid 50%/67%, 15 of 19 in the lower third). A spawn deep in the center means immediate multi-front contact; the single apex nation and the three arms are the only places with room to breathe.
- **Water vs land**: unlike The Box, there is real water at spawn (10.3%), so ports/boats are available from minute one — but the three arms mean waterways branch and re-branch, so a navy is both a route and a chokepoint.
- **Scale**: 105-player FFA (half The Box's 210) means shorter borders and faster early contact; the central axis is the contested spine.
- **The decision fork**: pick Branching Paths over The Box when you want water routes + team coordination and a smaller board; pick The Box when you want the pure land war at double the scale.
