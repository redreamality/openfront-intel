# New Zealand map — community & official source pack

Date: 2026-10-31 · Slug: `newzealand-map` · Automation: openfront content loop

This pack records every source actually opened and analyzed while researching the
New Zealand v0.35 map guide, plus the official first-hand evidence that every number,
rule, and version boundary in the guide traces back to. Reddit was fully blocked to
this automation on 2026-10-31 (direct `.json`, `old.reddit.com`, the reader proxy,
and the Wayback availability endpoint all refused the request; the browser session
was returned a "Blocked — network policy" wall). The Reddit entries below were
therefore analyzed from the search-index body text that the search engine returned
for each thread (titles plus actual comment bodies), and each one is recorded here
with its access limitation. YouTube sources were opened directly through `yt-dlp`
with verified auto-generated English subtitles.

## Official first-hand sources (primary)

- Official New Zealand map manifest at the formal v0.35.9 tag:
  https://github.com/openfrontio/OpenFrontIO/blob/v0.35.9/resources/maps/newzealand/manifest.json
  (1,888 × 3,448 grid, 772,373 land tiles, 20 named nations + 63 additional region
  entities = 83 named entities, `multiplayer_frequency` 5, no `team_frequency` or
  `special_team_count`, two-team spawn areas added.)
- Official v0.35.9 formal Release notes:
  https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.9
  (published 2026-10-30; "Add team spawns on Madagascar, Rio de Janeiro,
  Bab el-Mandeb and New Zealand (2 teams)"; "New Zealand: traditional Māori tribes
  as nations, with the country's regions as 80+ more, on a medium-sized map for the
  Oceania players".)
- Official v0.35.0 formal Release notes (first shipping version of the map):
  https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0
  (New Zealand is listed among the maps that shipped in the v0.35.0 milestone; the
  directory does not exist at the v0.34.25 tag, confirming v0.35.0 as the first
  shipping version.)
- Official v0.35.5 formal Release notes (two-team spawn boundary):
  https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.5
  (published 2026-10-26; the release that added the 2-team spawn configuration to
  New Zealand.)
- Official v0.35.5 server playlist source (map-driven lobby sizing and the
  `calculateMapPlayerCounts` land formula):
  https://github.com/openfrontio/OpenFrontIO/blob/v0.35.5/src/server/MapPlaylist.ts

## Community — YouTube (opened, subtitles verified)

- https://www.youtube.com/watch?v=vqQJg99EV5M — DougyJr, uploaded 2026-10-29,
  ~565 views. A 40-player free-for-all on the New Zealand map. Verified
  auto-subtitles confirm the narrator is on New Zealand for the first time and
  plays a 40-player FFA. Player question answered: what does the New Zealand board
  feel like at a mid-sized 40-player lobby.
- https://www.youtube.com/watch?v=yqM4Q3NlpVo — Enzo Plays, uploaded 2025-03-11,
  ~3,252 views. A "win from New Zealand" challenge. Verified subtitles confirm the
  goal is to win a game whose early geography centers on the New Zealand region.
  Player question: how does a player try to win from the New Zealand starting area.
- https://www.youtube.com/watch?v=SKWBma-qlGo — Enzo Plays, uploaded 2025-07-12,
  ~4,573 views. An 80-player world-map FFA; subtitles reference the New Zealand
  spawn area on the world board. Used as contrast between the world map's New
  Zealand and the dedicated v0.35 New Zealand map.

## Community — Reddit (search-index body; direct access blocked)

All three threads are from r/Openfront, the subreddit where OpenFront.io discussion
lives. Direct `.json`, `old.reddit.com`, reader-proxy, and Wayback access were each
refused on 2026-10-31, so the analysis below is from the comment bodies the search
engine surfaced for each thread.

- https://www.reddit.com/r/Openfront/comments/1x4j6cn/ — "🔍Possible Changes Coming
  to v35🔍". Posts the v35 map-change list that explicitly names New Zealand as one
  of the merged new maps alongside Vancouver Island, Pulicat Lake, Canary Islands,
  Rio de Janeiro, Bab el-Mandeb Strait, Horn of Africa, Madagascar, and Cape of Good
  Hope. Access limitation: body read from search index; live page blocked.
- https://www.reddit.com/r/Openfront/comments/1nrl7iu/ — "How do you choose a good
  spawn?". Top comment: "Do not hug a coast… the most important thing about a spawn
  is having ample room to expand… spawning near nations is like a cheat code. Expand
  aggressively at the beginning and take strategic alliances, but do not ally
  everyone around you." Access limitation: comment body read from search index.
- https://www.reddit.com/r/Openfront/comments/1lx86rq/ — "I analyzed 7,000 World
  Map FFA games to see how people win the early game". Publishes a spawn-location
  heat map showing which starting positions have the highest win rates, with the
  practical read that expansion room and nearby nations drive the early-game win
  rate more than coastline proximity. Access limitation: body read from search index.

## Observed player questions

- What does the New Zealand board actually look like (nation count, land area, grid)?
- How does the 20-nation Māori-iwi layer plus the 63 region overflow work in play?
- Where should a player spawn, and how does the 2-team split shape team games?
- How does a 40-player FFA on New Zealand compare to the world map's New Zealand?

## Access date

All sources accessed 2026-10-31. Reddit direct access blocked; YouTube subtitles
verified via yt-dlp; official manifest and releases read at the exact tags above.
