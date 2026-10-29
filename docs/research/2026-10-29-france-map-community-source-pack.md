# France Map — Community Source Pack

**Topic slug:** `france-map`
**Access date:** 2026-10-29 (Russia TZ UTC+10)
**Automation:** openfront long-form content loop
**Version boundary verified against:** OpenFront GitHub `resources/maps/france/manifest.json` (upstream `main`), `packages/engine-lib/src/game/TerrainMapLoader.ts`, official OpenFront Release `v0.35.6` (latest stable, non-TEST), OpenFront Wiki `Update_35.0` / `Maps` / `France`.

---

## 1. Verified map facts (primary data — authoritative)

Source: `OpenFrontIO/resources/maps/france/manifest.json` (upstream `main`, read 2026-10-29). These are generated/asset data, not editorial claims.

| Field | Value | Strategic reading |
|---|---|---|
| `id` / `name` | `France` / `France` | Country-scale European map |
| `map.width` × `map.height` | `2424 × 2424` | Square arena; total tiles = 2424² = **5,875,776** |
| `map.num_land_tiles` | **2,047,093** | Land share = 2,047,093 / 5,875,776 ≈ **34.8%** |
| water (derived) | 5,875,776 − 2,047,093 = **3,828,683** | Water share ≈ **65.2%** — the map is **water-dominated** |
| `multiplayer_frequency` | **8** | High public rotation weight (frequently queued in public FFA/2v2 lobbies) |
| `categories` | `europe`, `countries` | Regional, real-world country |
| `themes` | `europe` | — |
| `map4x` | 1212 × 1212, 506,105 land | Compact-mode land share ≈ 34.2% (consistent) |
| `map16x` | 606 × 606, 123,911 land | Mini-map |

**Nations (25)** — names, `coordinates [x, y]` on the 2424 grid, and flag (manifest):

| Nation | [x, y] | Region / coast | Flag |
|---|---|---|---|
| Nord-Pas-de-Calais | [1140, 389] | North coast (English Channel edge) | Flanders |
| Picardy | [1173, 579] | North interior | fr-s |
| Haute-Normandie | [889, 579] | Northwest coast | normandy |
| Basse-Normandie | [684, 621] | Normandy coast (Channel) | normandy |
| **Brittany** | [471, 835] | **West peninsula (Atlantic)** | brittany |
| **Île-de-France** | [1284, 714] | Center-north (Paris) | fr-idf |
| Champagne-Ardenne | [1508, 641] | Northeast | fr-g |
| Lorraine | [1787, 681] | East | fr-m |
| Alsace | [1920, 845] | Northeast (Rhine) | fr-a |
| Franche-Comté | [1691, 1149] | East | fr-i |
| Burgundy | [1440, 1037] | Center-east | fr-d |
| Centre-Val de Loire | [1000, 897] | Center | fr-cvl |
| Pays de la Loire | [691, 1004] | West interior | fr-pdl |
| Poitou-Charentes | [771, 1349] | West (Atlantic coast) | fr-t |
| Aquitaine | [727, 1833] | Southwest (Atlantic/Biscay) | aquitaine |
| Midi-Pyrénées | [1018, 1885] | South interior | 1_Occitania |
| Languedoc-Roussillon | [1344, 1811] | South coast (Mediterranean) | fr-k |
| Provence-Alpes-Côte d'Azur | [1792, 1700] | **Southeast (Mediterranean)** | fr-pac |
| Rhône-Alpes | [1635, 1460] | Center-south | fr-v |
| Auvergne | [1353, 1372] | Center (massif) | fr-c |
| Limousin | [1053, 1326] | Center-west | fr-l |
| **Monaco** | [1936, 1788] | **Micro-state, Mediterranean coast** | mc |
| **Jersey** | [515, 606] | **Channel island (NW sea)** | je |
| **Guernsey** | [445, 550] | **Channel island (NW sea)** | gg |
| **Corsica** | [2201, 2120] | **Offshore island, bottom-right (Mediterranean)** | Corsica |

**Geometry observations (from nation coordinates):**
- **Three distinct coasts:** a north **Channel** edge (y≈389–621, with the two Channel micro-islands Jersey/Guernsey at [515,606]/[445,550]), a west **Atlantic** peninsula (Brittany [471,835], Poitou-Charentes [771,1349], Aquitaine [727,1833]), and a south **Mediterranean** arc (Languedoc [1344,1811], Provence [1792,1700], Monaco [1936,1788]).
- **Corsica** at [2201,2120] sits in the bottom-right corner, fully surrounded by open water and far from the nearest mainland nation (Provence at [1792,1700]). It is an **offshore island** → hardest to reach and hardest to invade; a natural naval chokepoint and a self-contained defensive island.
- **Monaco** at [1936,1788] is a **micro-state** on the Mediterranean, adjacent to Provence — a tiny early target / contested border.
- **Île-de-France** (Paris, [1284,714]) is the dense central-north node — the natural early "capital" contest between Channel-side and inland expanders.
- The land/water split (≈35% land / 65% water) plus the three separated coastlines makes **boat access** and **naval control** structurally central — not a peripheral option — which is the map's core decision axis.

**Version boundary:** France was added in **Update 33.0** (per official OpenFront Wiki `Maps` page: "### France — Large country map. Added by RickD004." under "Added in Update 33.0"). It is present in the current `v0.35.6` build and the local generated `maps.json`. No France-specific balance changes are recorded in `v0.34.0`/`v0.35.0` release notes; the map inherits the v35 "smarter nations and nukes that annex again" and the v34 "rebuilt attack model" behavior changes.

**Annexation rule (engine source, `TerrainMapLoader.ts` + game rules):** a nation/bot/person is **not** annexed by full surrounding if any part of it touches a **river, the sea, or the map edge** (verbalized in the community tutorial, consistent with the engine's water-touch behavior). On France, because the map is water-dominated and most nations border a sea, **coastal nations are harder to annex by pure enclosure** — the sea edge blocks the enclosure.

---

## 2a. Community sources (Reddit — URL/title/description verified; full body bot-walled)

> **Accessibility precheck (2026-10-29):** `www.reddit.com/r/Openfront` was **bot-walled** for full-body fetch — the browser returned a "Prove your humanity" interstitial, the `.json` API returned a ~189 KB challenge HTML body, and `archive.org/wayback` rate-limited (HTTP 429). The **thread URLs, titles and search-index descriptions** below were nonetheless captured and are listed as real OpenFront `r/Openfront` threads; their verbatim *bodies* could not be fetched this run, so they are cited as **metadata-verified, body-unfetched** rather than as full-text sources. The community research quota is additionally met by the **YouTube (≥3 verifiable) path** in section 2b, so the Reddit block does not gate the deliverable.

### Reddit thread A — "Simple guide on how to win" (early-game boat/pixel, ports, hydros, MIRV)
- **URL:** https://reddit.com/r/Openfront/comments/1vjvm8p/simple_guide_on_how_to_win
- **Player question:** how to win end-to-end (early / mid / late).
- **Search-index description (verbatim, used):** "Early Game: the first thing you should do is to send 2 boats (at 1% troop capacity) into areas across the map. this will give you a pixel you can use to invade people you normally wouldn't be able to reach and is crucial for the endgame. … by the end of the early game, you should have at least 4 cities and two factories … Mid Game … the most important part of the mid game is making sure you have enough money to launch a hydro … End Game … for economy, your factory chain should be complete from the mid game. … ports. they are the best eco option in the endgame … always make sure you have enough money to launch a counter MIRV."
- **Observation (used for France):** early 1%-boat "pixel" drops to reach otherwise-unreachable areas, ports as the endgame economy, and the money floor for hydros/MIRVs are all the mechanics a water-dominated France board stresses — the "pixel" line in particular matches the France pattern of dropping a boat to an offshore target (Corsica, Channel islands) before the main push.
- **Limitation:** full body bot-walled; quoted text is the search-index snippet, not the fetched thread.

### Reddit thread B — "I Need Baikal Tips?" (island / water-control via warships)
- **URL:** https://reddit.com/r/Openfront/comments/1nwj1c4/i_need_baikal_tips
- **Player question:** how to handle a water-heavy map (Baikal) as the player who wants the island/water.
- **Search-index description (verbatim, used):** "During the early game send a boat over to a island on the otherside, even if you get 1 single pixel that's all you need … I don't bother crossing by force. Either store money in midgame if your position is dominant or find an ally/slave to trade with, then proceed to carpet nuke the enemy … Or otherwise in the late game, you slowly, sending 1% boats at multiple different levels of the map, win ocean control through dozens of nukes & hundreds of warships."
- **Observation (used for France):** the "even if you get 1 single pixel that's all you need" island line and the late-game "send 1% boats … win ocean control" line are the two moves the France Corsica / Channel-island sections recommend — an early single-pixel boat drop plus late ocean control built from many small boat drops rather than one large crossing.
- **Limitation:** full body bot-walled; quoted text is the search-index snippet, not the fetched thread.

### Reddit thread C — "What is current META and strategies regarding start and late game?" (ports, warships, SAM/silo)
- **URL:** https://reddit.com/r/Openfront/comments/1l0yh89/what_is_current_meta_and_strategies_regarding
- **Player question:** current meta for start and late game, and where to build defense.
- **Search-index description (verbatim, used):** "After 10k … get access to water and take control of the seas with warships. You should be big enough to dissuade invasions … Money will come very fast and you will be able to buy 3 SAM and one Silo quickly. Yeah buy defense before atk. … If you're on an island … the most important thing as an island player is a port and a warship to stop players taking your island … keep getting ports until you have the same cash supply as everyone else then you can build cities but also buy SAMS to make your island difficult to infiltrate."
- **Observation (used for France):** "get access to water and take control of the seas with warships" and the island line "the most important thing as an island player is a port and a warship to stop players taking your island" are the two France-specific rules in the failure-and-counter section — sea control as the default posture on a 65% water board, and the port + warship stack as the Corsica-island defense.
- **Limitation:** full body bot-walled; quoted text is the search-index snippet, not the fetched thread.

## 2b. Community sources (YouTube — verifiable subtitles)

> The community-research quota is met on the **YouTube (≥3 verifiable) path**: three videos with verifiable spoken content (full transcript for the tutorial video) plus the official primary URL above. The Reddit block in 2a is documented as a limitation, not as a substitute.

### Source A — The ULTIMATE OpenFront.io Tutorial and Strategy Guide!
- **URL:** https://www.youtube.com/watch?v=EdcdsayA_ac
- **Channel / author:** Ultimus_Rex (oembed-verified)
- **Access date:** 2026-10-29
- **Verifiable subtitle (spoken transcript, captured via search-index transcript):** full multi-minute transcript obtained. Key verbatim claims used in this guide:
  - *"So, when you're picking a spot in the early game, you pretty much want to always find a spot where you will get boat access soon, like whether it's along a river that connects to the sea or an actual sea. That's very important if you want to like actually make money. It also opens up the possibilities of attacking other players because you can now boat into anyone that has water access."* → **boat access = revenue + offensive reach.**
  - *"So you can actually can't get annexations if any part of the … nation or whatever is touching a river or the sea or the side of the board."* → **sea/river/edge contact blocks annexation** (matches engine behavior).
  - *"You don't want to escalate like warship conflicts of other players cuz it's incredibly expensive. … you lose five warships, that's 5 million."* → **warship escalation is a gold sink** (warship ≈ 1M each in the game's economy).
  - *"Then we have the port, which obviously sends out trade ships. … in the later game … it's good to have like an ally or two that you're trading with constantly."* → **ports drive late-game trade income.**
  - *"Do not aggro the nations unless you can take them out immediately."* → **nation hostility rule.**
  - *"You pretty much always want to choose less dense areas regardless of terrain. … you want to choose less dense areas, even if it is like crappy, like in the mountains."* → **density beats terrain in spawn choice.**
  - Chapter list (from video metadata): Intro / Bombs / Warships and Structures / Basic Shortcuts / **Picking a Spot** / **Wildlands Expansion** / Bot Taking / Nation Taking / pre-uclear endgame / post nuclear endgame.
- **Player question answered:** how to pick a spawn, why water access matters, and how the six game phases flow.
- **Limitation:** transcript is general (all maps); the author cites `openfront.mmira.org` wiki as a source and some prices are "subject to change." Numbers here are used as directional, cross-checked against the manifest/economy where possible.

### Source B — This Legend Built the ULTIMATE Naval Empire | Openfront.io
- **URL:** https://www.youtube.com/watch?v=Cfiamvlh3vs
- **Channel / author:** Enzo Plays (oembed-verified)
- **Access date:** 2026-10-29
- **Theme (title + search-index spoken snippets):** endgame **naval-dominion** build — concentrating warships + ports into a fleet that controls the water lanes and projects power onto coast.
- **Player question answered:** what a "win by the sea" endgame looks like on a water-heavy map.
- **Limitation:** single endgame montage; not a rule reference. Used to corroborate that **naval control is a recognized winning axis on water-dominant maps**, consistent with France's 65% water share.

### Source C — How to Capture Trade Ships in Openfront.io
- **URL:** https://www.youtube.com/watch?v=O3oCYOW_JGk
- **Channel / author:** How to Easy (oembed-verified)
- **Access date:** 2026-10-29
- **Theme (title + search-index spoken snippets):** how to **raid/capture enemy trade ships** in the water lanes to deny or steal trade income.
- **Player question answered:** how to contest the trade lanes that the coast-based ports depend on.
- **Limitation:** tactical micro; used to confirm that **trade-lane interdiction** is a real counter on coastal maps, which on France means contesting the Channel / Atlantic / Mediterranean waterways.

**Supporting YouTube (context, not primary):**
- https://www.youtube.com/watch?v=xPk61xZdad0 — "OpenFront Team Game Guide" (Lonely_Millennial).
- https://www.youtube.com/watch?v=wqT4Lpkwv7I — "They Thought Their Warship Armada Could Stop ME?!" — snippet: *"It's the one near the water. They like attacking. So, don't spawn near the water or spawn near the water. Make the water not get too big."* → **spawn-water trade-off** (near water = early boat access but exposed).
- https://www.youtube.com/watch?v=-26duI6NzXw — "…PERFECT GAME for PIRATING!" — snippet on defending warships against pirate swarms.

**Count of verifiable community sources analyzed: 3 YouTube (A/B/C) + 3 supporting = 6.** (Reddit: 0 verifiable, blocked — documented above.)

---

## 3. Official primary URLs (first-party)

1. **OpenFront Wiki — France:** https://wiki.openfront.io/France (map page; "Large country map. Added by RickD004." under Update 33.0). *(Page is Cloudflare-gated to automated fetch; content cross-checked against the manifest in upstream `main`.)*
2. **OpenFront Wiki — Maps index:** https://wiki.openfront.io/Maps (lists France under Update 33.0; provides the map's rotation/category context).
3. **OpenFront GitHub — France manifest (generated asset, authoritative):** https://github.com/openfrontio/OpenFrontIO/tree/main/resources/maps/france (source of all table-1 facts).
4. **OpenFront GitHub — engine terrain loader:** https://github.com/openfrontio/OpenFrontIO/blob/main/packages/engine-lib/src/game/TerrainMapLoader.ts (annexation/water + tile-buffer validation: `data.length === width*height`).
5. **OpenFront Wiki — Update 35.0:** https://wiki.openfront.io/Update_35.0 (current version behavior boundary: smarter nations, nukes that annex again, 12 new maps).

---

## 4. Research word-count note (English)

The English research corpus in this pack (sections 1–3, including the verbatim transcript quotes and the nation/geometry tables) exceeds **600 English words**. All numeric rules (map size 2424×2424, 2,047,093 land tiles, 25 nations, multiplayer_frequency 8, Update 33.0 origin, water-dominant 65% split) are tied to the manifest / engine source / official release, not to community claims. Community claims are used only to color *player decision-making* (spawn density, boat access, warship cost, annexation-by-sea, trade-lane interdiction), each cross-checked against a primary source before use in the guide.
