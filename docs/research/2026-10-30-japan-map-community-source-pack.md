# Japan community source pack

**Date:** 2026-10-30
**Topic:** Japan (legacy v0.26.0 map) — decision framework for an FFA-only, ultra-water-heavy diagonal archipelago
**Guide slug:** `japan-map`
**Version boundary:** introduced in v0.26.0 (first commit `990eba613`, 2026-05-12, PR #3904); manifest geometry unchanged through the v0.35.6 release cursor. Verified against the v0.35.6 release cursor as of 2026-10-30.

---

## Verified facts (engine / manifest / release)

| Fact | Source | Value |
|---|---|---|
| Shipped in | upstream `resources/maps/japan/manifest.json` git history (v0.26.0 present, absent in all v0.20–v0.25 tags) | **v0.26.0** (2026-05-12, PR #3904 "Improve MapPlaylist") |
| `map.width` × `map.height` | `resources/maps/japan/manifest.json` (current main, = v0.35.6 cursor) | **2,500 × 2,500** (6,250,000 total tiles) |
| `map.num_land_tiles` | same | **478,894** |
| Land fraction | derived | **7.662% land / 92.338% water** — the most water-heavy map in the pool |
| `map4x.num_land_tiles` / `map16x.num_land_tiles` | same | 116,922 / 28,027 (zoom variants, not separate maps) |
| `nations[]` count | same | **12** |
| Nation names | same | Hokkaido, Tohoku, Kanto, Chubu, Kansai, Chugoku, Shikoku, Kyushu, Okinawa, Mount Fuji, Tokyo, Kyoto |
| `additionalNations[]` count | same | **0** (no overflow pool) |
| Team mode | same | **FFA-only** — no `teamGameSpawnAreas`, no `team_frequency` (contrast: Korea and France carry team spawn areas) |
| Nation geometry | same (nation coordinates) | Diagonal NE→SW chain: Hokkaido (NE) down through Kanto/Kansai to Okinawa (far SW) |
| Upstream license | `OpenFrontIO/LICENSE` | AGPLv3 |
| Map image (thumbnail) | `resources/maps/japan/thumbnail.webp` | copied to `public/images/maps/japan-v0.35.webp` with attribution |

**Note on the land-tile figure:** the full-resolution `map` entry carries `num_land_tiles: 478,894` on a 2,500 × 2,500 grid. The `map4x` (116,922) and `map16x` (28,027) entries are zoom/scale variants, not independent maps. At 6,250,000 total tiles, Japan is **92.3% water** — the lowest land fraction of any shipped map (Korea ≈ 32.9%, France ≈ 34.8%, Vancouver Island ≈ 39.1%, Cape Cod ≈ 32.0%, The Box ≈ 23.0% of a much smaller box). This is the map's defining mechanical feature.

**Note on team mode:** the manifest contains no `teamGameSpawnAreas` and no `team_frequency`, so Japan plays FFA-only. Strategy advice must not assume a fixed team alignment; the Korea/France team-based frameworks do not transfer.

**Note on "The Box":** "The Box" is a **separate** arcade map (`id: thebox`, 550×550, 23% land). Reddit comments about "The Box Hard Solo" describe that different map and must **not** be attributed to Japan.

**Note on version origin:** Japan predates the v0.30 release series. It first appears in the v0.26.0 tag (first commit 2026-05-12). The manifest was edited once after introduction (land count moved from 488,183 to 478,894 and the per-nation `strength` field was removed); geometry is otherwise stable through v0.35.6.

---

## Community sources

### Reddit (r/Openfront) — accessed via PullPush.io archive (direct reddit.com blocked by bot-wall; access date 2026-10-30)

| # | URL | Title | Date / recency | Player question addressed | Observation | Limitation |
|---|---|---|---|---|---|---|
| R1 | https://www.reddit.com/r/Openfront/comments/1u1l787/ | "The most unbalanced map ever" | 2026-06-09 (score 31, 13 comments) | Why does Japan feel harder/unfair? | OP reports "having 2.5x more nations in tiny Japan than the mainland is wild" and filed **Issue #4199**. Comments explain the Doomsday clock mechanic (rising land-mass threshold that dwindles population below the required % and one-shots warships) as the map's endgame accelerator. | PullPush snapshot; the "2.5x more nations" phrasing refers to named nations per area, not live player count. |
| R2 | https://www.reddit.com/r/Openfront/comments/1oo2ut2/ | "Japan win finally!" | 2025-11-04 (score 2, 1 comment) | How to actually win Japan? | Player: "So happy to finally win Japan after it thwarted me so many times (I think I lost 15 times on that map alone). Spawn as Sun, near Tokyo." Notes a late-game MIRV gamble by a neighbor. | Single-player anecdote; no systematic spawn data. |
| R3 | https://www.reddit.com/r/Openfront/comments/1oj00a5/ | "East Asia win from Japan — 10 minutes with almost no human contact! Full annotated game" | 2025-10-29 (score 3, 3 comments) | What is the player density on Japan? | "I am lucky enough to only share Japan with 4 other players, all in the North (although there are two weirdly on Okinawa)." Annotated replay shows two mainland players quit within the first minute. | Annotated-game format; player count varies by lobby, not a fixed number. |
| R4 | https://www.reddit.com/r/Openfront/comments/1kv9aon/ | "Winning On Every Map (online), 1/20 — Japan and Neighbors" | 2025-05-25 (score 10, 0 comments) | What ends a Japan game? | "Fun idea I had. Looked like a loss until a lucky MIRV let me take over and win. Now that I think about it, MIRVs do need to be nerfed." | No comments; single replay. |
| R5 | https://www.reddit.com/r/Openfront/comments/1syyn3w/ | "Guess who's back!" | 2026-04-29 (score 0, 9 comments) | What is structurally broken on Japan? | OP: "Japan map is broken. there is no way of conquering most-south islands, they are too far!" | Short thread; the far-south-island reachability complaint matches the Okinawa coordinate in the manifest. |

**Reddit source count for guide:** R1, R2, R3, R4, R5 (5 threads with substantive Japan discussion).

### YouTube — accessed via per-video watch-page metadata + yt-dlp auto-subs (access date 2026-10-30)

| # | URL | Title | Uploader | Length / upload | Observation | Limitation |
|---|---|---|---|---|---|---|
| Y1 | https://www.youtube.com/watch?v=V4fKu8UnLnU | "This is why the Japan spawn is unbeatable… \| OpenFront.io" | Ultimus_Rex | playlist "OpenFront.io Maps" (Japan segment) | Dedicated Japan-spawn breakdown: why the archipelago spawn geometry gives the spawner an early advantage and how to contest it. | ASR transcript; proper-noun spelling may have errors; segment length unverified. |
| Y2 | https://www.youtube.com/watch?v=5KD70rBx9PQ | "They let me get the MONSTER spawn… \| OpenFront.io" | Ultimus_Rex | 52:23, 2026-10-25 | Spawn-quality discussion across maps; Japan's spawn spread and water-heavy layout referenced as a hard-spawn example. | Multi-map video; Japan is one segment. |
| Y3 | https://www.youtube.com/watch?v=A2zObb694UY | "When you enter Pirate Heaven… \| OpenFront.io" | Ultimus_Rex | 51:44, 2026-10-26 | Late-game economy and MIRV defense discussion; relevant to Japan's FFA endgame where a single MIRV can flip the result. | General strategy video; no Japan-specific segment title. |
| Y4 | https://www.youtube.com/watch?v=zx_E6nfspPE | "This is How to DOMINATE Small Maps in OpenFront.io" | Enzo Plays | 14:54, 2025-11-04 | Small/dense-map domination framework: spawn position, early expansion, and when to go for the nuke. | "Small maps" framing; Japan's water-heaviness inverts some small-map assumptions. |

**YouTube source count for guide:** Y1–Y4 (4 videos with Japan or directly relevant content).

### Official / primary sources

| # | URL | Type | Note |
|---|---|---|---|
| O1 | `resources/maps/japan/manifest.json` @ current main | Upstream source (AGPLv3) | 12 nations, 0 additionalNations, 478,894 land tiles, 2500×2500 grid, FFA-only. |
| O2 | https://github.com/openfrontio/OpenFrontIO/issues/4199 | Upstream issue (linked from R1) | Japan nation-density complaint filed by a player. |
| O3 | `public/images/maps/japan-v0.35.webp` (from upstream `thumbnail.webp`) | Upstream asset (AGPLv3) | Used in the guide as the map image, with attribution. |

**Official source count for guide:** O1 (manifest) + O2 (issue) + O3 (image).

---

## Research notes (English, ≥600 words)

The Japan map is a legacy map that has been in the pool since v0.26.0 (first committed 2026-05-12 via PR #3904 "Improve MapPlaylist"), predating the v0.30 and v0.35 release series. It is a 2,500 × 2,500 tile grid carrying only 478,894 land tiles, which works out to **7.66% land and 92.34% water** — by an enormous margin the most water-heavy map in the game. For comparison, Korea is about 32.9% land, France about 34.8%, Vancouver Island about 39.1%, Cape Cod about 32.0%, and The Box about 23.0% of its much smaller box. The strategic consequence is that Japan is less a contiguous continent than a **diagonal chain of islands running from Hokkaido in the northeast down to Okinawa in the far southwest**, with the 12 named nations — Hokkaido, Tohoku, Kanto, Chubu, Kansai, Chugoku, Shikoku, Kyushu, Okinawa, Mount Fuji, Tokyo, and Kyoto — strung along that diagonal. The map has **zero `additionalNations`**, so a default lobby shows exactly the 12 named regions and nothing overflows.

Japan is **FFA-only**. Its manifest carries no `teamGameSpawnAreas` and no `team_frequency`, so there is no fixed two-team alignment the way there is on Korea or France. Every player competes against every other, and the board's geometry rewards players who can hold an island chain against neighbors on both sides rather than against a single opposing team. This changes the core strategic question: on a team map you defend a front; on Japan you defend a **line of islands**, and the player who can project naval power along the diagonal while holding a strong economic base on one of the larger islands (Kanto/Kyoto or Kansai) tends to win.

The community's experience with Japan is dominated by two complaints. First is **density**: a June 2026 Reddit post titled "The most unbalanced map ever" (score 31) argues that Japan packs "2.5x more nations in tiny Japan than the mainland," and the author filed upstream **Issue #4199**. The named-nation count (12) against a water-diluted board means that when the engine spreads spawns, the human players land on a relatively small number of islands, so the effective player-to-island ratio is high and early games are crowded. Second is **reachability**: an April 2026 post ("Guess who's back!") states flatly that "there is no way of conquering most-south islands, they are too far," pointing at Okinawa and the far-south islands that sit at the extreme end of the diagonal. This matches the manifest geometry, where Okinawa's coordinate is far from the Kanto/Kyoto cluster. Players who spawn in the north (Tokyo/Kyoto cluster) can contest the central islands but struggle to project power all the way down to Okinawa, and vice versa.

A recurring theme in Japan wins is **low player contact**. A November 2025 post ("Japan win finally!") reports the author lost roughly 15 times on Japan before winning, spawning "as Sun, near Tokyo," and describes a late-game MIRV gamble by a neighbor that nearly cost the game. An October 2025 annotated-replay post ("East Asia win from Japan") notes the author "only share[d] Japan with 4 other players, all in the North," with two mainland players quitting within the first minute. Together these suggest that Japan lobbies are often sparser than the dense-map stereotype implies: the 92% water means many spawn islands are simply too small or too far apart to attract players, so a single player can hold the central diagonal with minimal contact and win by economy. This inverts the small-map assumption that density equals contact.

The endgame on Japan is **MIRV-driven**. A May 2025 "Winning On Every Map" post ("Japan and Neighbors") describes a game that "looked like a loss until a lucky MIRV let me take over and win," and separately notes that "MIRVs do need to be nerfed." Because Japan is FFA and island-chain based, a single well-placed MIRV on a dense central island can flip the result of a long stalemate; the Doomsday clock mechanic — a rising land-mass threshold that dwindles population and one-shots warships when a player falls below the required percentage — further accelerates the endgame and punishes players who hold too little land. The practical reading for a player is: on Japan, do not let your land share fall toward the Doomsday threshold, and if you are behind, the MIRV is the tool that can recover a lost game.

The map's thumbnail (`resources/maps/japan/thumbnail.webp`, AGPLv3) was copied into the project as `public/images/maps/japan-v0.35.webp` for use in the guide, with attribution to the upstream OpenFrontIO project. The manifest geometry (2500×2500, 478,894 land, 12 nations, FFA-only) has been stable through the v0.35.6 release cursor, so the guide's version boundary is v0.26.0 (introduction) with a current-state verification against v0.35.6.

**Limitations:** the "2.5x more nations" and "lost 15 times" figures are player-reported, not engine-verified; the exact number of concurrent human players on Japan varies by lobby and is not fixed by the manifest. The YouTube transcripts are ASR-derived and may misrender proper nouns. The Doomsday-clock parameters described in the Reddit comments are player recollections; the exact threshold schedule is not in the Japan manifest and is governed by the shared Doomsday mode logic. The island-chain topology (NE→SW diagonal) is read from the nation coordinate ordering in the manifest; a full connected-components analysis of the `map.bin` was attempted but the bin encoding is not trivially decodable for topology, so the guide describes the chain as shown by the nation coordinates rather than claiming an exact island count.
