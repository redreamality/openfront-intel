# Canary Islands map — community & official source pack

Date: 2026-10-31 · Slug: `canaryislands-map` · Automation: openfront content loop

This pack records every source actually opened and analyzed while researching the
Canary Islands v0.35 map guide, plus the official first-hand evidence that every number,
rule, and version boundary in the guide traces back to. Reddit was blocked to direct
`.json`, `old.reddit.com`, and browser access on 2026-10-31 (direct thread requests
returned a 302 redirect to the login page with `reason=lor2`; the browser session was
bot-walled). The Reddit entries below were therefore analyzed from the search-index body
text that the search engine returned for each thread (titles plus actual comment bodies),
and each one is recorded here with its access limitation. YouTube sources were opened
directly; oEmbed titles, author names, and `uploadDate` metadata were verified for every
video, and `--list-subs` confirmed English (original) subtitles exist for each. Subtitle
transcripts could not be pulled in this environment because `yt-dlp` requires a
JavaScript runtime (deno) that is not installed, so the YouTube observations below are
grounded in the verified video metadata and search-index bodies rather than full
transcripts — that limitation is recorded per video.

## Official first-hand sources (primary)

- Official Canary Islands map manifest at the formal v0.35.9 tag:
  https://github.com/openfrontio/OpenFrontIO/blob/v0.35.9/resources/maps/canaryislands/manifest.json
  (verified HTTP 200 at access time; 4000 × 1400 landscape grid, `num_land_tiles` 592,368,
  76 core Spanish `ic` nations plus 5 Moroccan `ma` settlements = 81 named places,
  `team_frequency` 10, `multiplayer_frequency` 3, theme `africa`, no `special_team_count`.)
- Official v0.35.0 formal Release notes (first shipping version of the map):
  https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0
  (the v0.35.0 milestone that shipped the Canary Islands; verbatim: "an island map with
  shortened crossings, high in team rotation". The directory does not exist at the v0.34.x
  tags, confirming v0.35.0 as the first shipping version.)
- Official v0.35.5 formal Release notes (two-team spawn boundary — negative evidence):
  https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.5
  (the release that added 2-team spawn configuration named only Madagascar, Rio de
  Janeiro, Bab el-Mandeb and New Zealand — Canary Islands is NOT in that list, so it is a
  team-rotation-weighted map, not a dedicated two-team map.)
- Official v0.35.9 formal Release notes (current release cursor):
  https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.9
  (published 2026-10-30; a maintenance release with no map changes, so the v0.35.0
  manifest facts above are still current at the release cursor.)

## Community — YouTube (opened; oEmbed + uploadDate verified)

- https://www.youtube.com/watch?v=uyXs3pahgMA — Enzo Plays, "How to Win Team Games in
  OpenFront.io", uploaded 2026-03-09, ~6,301 views. Description: "Team games are just
  kind of team games... Hope the tips are helpful." English (original) subtitles exist
  (confirmed via `--list-subs`). Player question answered: how to hold a team front and
  balance a shared front against expansion room — directly relevant to a map weighted
  `team_frequency` 10. Limitation: transcript not pulled (no JS runtime for yt-dlp);
  observation grounded in verified title, author, date, and description.
- https://www.youtube.com/watch?v=1DOz7xdxbr8 — vari, "New Patch: Mad Maps, Ranked Game
  Modes?!", uploaded 2026-10-21, ~4,930 views. Description: "Here we go in our first game
  of version 35! What even is this map?!" with a Brain Rot and a Hong Kong FFA. English
  (original) subtitles exist. Player question: what do the new v35 maps feel like on first
  play. Limitation: transcript not pulled (no JS runtime); the video plays other v35 maps
  (Brain Rot, Hong Kong), so it is used as general v35 first-impression context, not as
  Canary-specific footage.
- https://www.youtube.com/watch?v=I8ahblrA7UA — Ultimus_Rex, "I controlled this map's
  GREATEST TRADE ZONE! | OpenFront.io", uploaded 2026-04-18. Description links the
  creator's OpenFront skin shop; English (original) subtitles exist. Player question: how
  does a wide, coast-heavy island map reward trade-zone and port control. Limitation:
  transcript not pulled (no JS runtime); used as coastal/trade island-play context, not as
  Canary-specific footage.

## Community — Reddit (search-index body; direct access blocked)

All four threads are from r/Openfront, the subreddit where OpenFront.io discussion lives.
Direct `.json` and `old.reddit.com` access were each refused on 2026-10-31 (302 → login
with `reason=lor2`), so the analysis below is from the comment bodies the search engine
surfaced for each thread.

- https://www.reddit.com/r/Openfront/comments/1x4j6cn/ — "🔍Possible Changes Coming to
  v35🔍". The post lists the v35 map-change set that explicitly names Canary Islands
  alongside Vancouver Island, Pulicat Lake, New Zealand, Rio de Janeiro, Bab el-Mandeb
  Strait, Horn of Africa, Madagascar, and Cape of Good Hope. Access limitation: body read
  from search index; live page blocked.
- https://www.reddit.com/r/Openfront/comments/1s7r6pj/ — "Open Front guide" (u/
  Stock-Breakfast7245, ~7 months old). Top comment: island players can "spawn on mainland
  or smth and then boat over to the island which would be a better strategy then spawning
  on an island"; "choose somewhere where their isn't many players, as then you can get
  more land, also spawning near a corner/edge and boxing a lot of land is a great idea";
  "Make sure u protect it with warships... it is used in late game usually." Access
  limitation: comment body read from search index; live page blocked.
- https://www.reddit.com/r/Openfront/comments/1nx2yer/ — "So you got addicted to OpenFront
  but keep losing? [Beginner's guide to the early game]". Body: "Especially in the early
  game, you don't have to wait until your troops are around 50% of your max unit count...
  expanding into unclaimed terrain boosts the max so high that expanding early is worth
  it. Personally, I wait until I gain about 400 troops, and then send half of them out to
  claim new territory"; "There is one exception to this rule where early naval invasions
  are good: If you're worried about getting boxed in... you will need new expansion
  opportunities. I like to send naval invasions with 1% of my troops out to far away bots
  to invade a single pixel of territory." Access limitation: body read from search index;
  live page blocked.
- https://www.reddit.com/r/Openfront/comments/1wh8t6v/ — "How do yall feel about the 0.34
  changes?" (u/Meta_Mushroom, September 15, 2026). Body: "I like all the little QOL
  changes, but I think the gold nerf went a little bit too far... One nice thing is that
  you don't have to worry as much about evil mitos lobbing nukes from a pixel on the other
  side of the map." Access limitation: body read from search index; live page blocked.

## Observed player questions

- What does the Canary Islands board actually look like (nation count, land area, grid
  orientation, the Spanish/Moroccan naming split)?
- How does a `team_frequency` of 10 change the way team games play on this map versus a
  standard island or continent map?
- Where should a player spawn, and does the "spawn on mainland then boat over to the
  island" advice apply to a wide 4000×1400 island field?
- How do shortened crossings and a small multiplier for player count shape a mid-sized
  lobby here compared to a deep open continent?
- Is Canary Islands a two-team spawn map? (Answer: no — v0.35.5 named other maps; it is
  team-rotation-weighted instead.)

## Access date

All sources accessed 2026-10-31. Reddit direct access blocked (302 → login); YouTube
oEmbed titles, authors, and upload dates verified for every cited video, with English
subtitles confirmed present but transcripts not pulled (no deno runtime); official
manifest and releases read at the exact tags above (manifest and v0.35.0 tag both
returned HTTP 200 at access time).
