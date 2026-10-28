# Vancouver Island community source pack

**Date:** 2026-10-28
**Topic:** Vancouver Island (v0.35.0 new map) — decision framework for a land-heavy, nation-sparse board
**Guide slug:** `vancouver-island-map`
**Version boundary:** v0.35.0 (shipped 2026-10-16, formal GitHub release `openfrontio/OpenFrontIO` tag `v0.35.0`); verified against the v0.35.6 release cursor as of 2026-10-28.

---

## Verified facts (engine / manifest / release)

| Fact | Source | Value |
|---|---|---|
| Shipped in | v0.35.0 release notes | 2026-16-10 (v0.35.0, "New maps" section) |
| Map description in release notes | v0.35.0 release body | "30+ nations from the Pacific Northwest" (credited to RickD004) |
| `map.num_land_tiles` | `resources/maps/vancouverisland/manifest.json` (v0.35.0 tag) | **2,012,664** |
| `map.width` × `map.height` | same | 2,600 × 1,980 |
| `map4x.num_land_tiles` / `map16x.num_land_tiles` | same | 117,919 / 491,184 |
| `nations[]` count | same | **32** |
| `nations[]` flag distribution | same | `britishcolumbia`: 26, `Washington`: 2, `Vancouver`: 1, **none (unflagged)**: 3 |
| Unflagged nation names | same | Kwakwaka'wakw Nation, Coast Salish Nation, Nuu-chah-nulth Nation |
| `additionalNations[]` count | same | **30** (all `flag: britishcolumbia`; names include Whistler, Tsawwassen, Ladysmith, etc.) |
| Compact-mode nation count | `NationCreation.ts` → `getCompactMapNationCount` | `Math.floor(32 × 0.25)` = **8** |
| Lobby size tiers (land-driven, v0.35+) | `lobby-size-map-driven.mdx` formula: `roundTo5(landTiles × 50 / 1,000,000)`, min 5; medium = ×0.75, small = ×0.5 | **100 / 75 / 50** (FFA); **150 / 113 / 75** (Team, ×1.5) |
| 125-player cap removed in v0.35 | v0.35.0 release notes; `lobby-size-map-driven.mdx` | "Removed the 125 player cap from public lobbies" (PR #5548, FloPinguin) |
| Nation overflow logic | `NationCreation.ts` → `createRandomNations` | If `configNations` > 32, overflow drawn from `additionalNations` (30), then procedurally named |
| Upstream license | `OpenFrontIO/LICENSE` | AGPLv3 |
| Map image (thumbnail) | `resources/maps/vancouverisland/thumbnail.webp` | copied to `public/images/maps/vancouver-island-v35.webp` with attribution |

**Note on land-tile figure:** the full-resolution `map` entry carries `num_land_tiles: 2,012,664`. The `map4x` (117,919) and `map16x` (491,184) entries are zoom/scale variants, not independent maps. The lobby-size formula uses the full-resolution count.

**Note on "30+ nations":** the release notes say "30+ nations from the Pacific Northwest." The manifest has 32 named nations plus 30 `additionalNations`, so the "30+" figure is consistent with the 32 main-island nations (26 BC + 2 Washington + 1 Vancouver) plus the 3 unflagged First Nations entities. The 30 `additionalNations` are overflow names, not active nations in a default lobby.

**Note on lobby sizes:** the v0.35 land-driven sizing (PR #5548) replaced the flat 125 cap. For Vancouver Island's 2,012,664 land tiles the base tier is 100, with medium at 75 and small at 50. These numbers are derived from the documented formula applied to the manifest value; the formula itself is verified in the existing `lobby-size-map-driven` guide and the v0.35.0 release notes.

---

## Community sources

### Reddit (r/Openfront) — accessed via PullPush.io archive (direct reddit.com blocked by bot-wall; access date 2026-10-28)

| # | URL | Title | Date / recency | Player question addressed | Observation | Limitation |
|---|---|---|---|---|---|---|
| R1 | https://www.reddit.com/r/Openfront/comments/1vu9yct/ | "Vancouver Island map is a thing" (v0.35 map thread) | ~2026-10 (v0.35 beta/release window) | What is Vancouver Island and is it a good map? | Thread confirms the map is land-heavy, nation-sparse; players note the Pacific Northwest naming and the unflagged First Nations entities. | PullPush snapshot; comment count reflects archive date, not live count. |
| R2 | https://www.reddit.com/r/Openfront/comments/1mdwuot/ | v0.35 map discussion (general) | ~2026-10 (v0.35 beta) | Which new maps are worth playing? | Vancouver Island mentioned as the largest land-tile map in the v0.35 batch; players discuss spawn spread on wide boards. | General map thread; Vancouver Island is one of many topics. |
| R3 | https://www.reddit.com/r/Openfront/comments/1ux386l/ | v0.35 lobby size / map-driven sizing discussion | ~2026-10 (v0.35 beta) | How big will Vancouver Island lobbies be? | Players note the 125-cap removal and the land-driven formula; Vancouver Island's ~100-player large tier is discussed. | Formula discussion; individual numbers are player estimates, not engine-verified. |
| R4 | https://www.reddit.com/r/Openfront/comments/1wq9f3a/ | "I made a menu bar notification for when your…" | ~2026-10 (v0.35 window) | Peripheral (tooling); included for v0.35 context | Mentions v0.35 in passing; no Vancouver Island-specific content. | Weak relevance; included to round out the v0.35 research set. |

**Reddit source count for guide:** R1–R3 (3 threads with substantive Vancouver Island discussion). R4 is context only.

### YouTube — accessed via uvx yt-dlp auto-subs (access date 2026-10-28)

| # | URL | Title | Uploader | Transcript length | Observation | Limitation |
|---|---|---|---|---|---|---|
| Y1 | https://www.youtube.com/watch?v=SKWBma-qlGo | v0.35 new maps review / gameplay | (community) | 17,044 words | Covers Vancouver Island geography: the island's coastline, the inlet network, and the nation spread. Mentions the map's size relative to other v0.35 maps. | ASR transcript; proper-noun spelling may have errors; no timestamps verified. |
| Y2 | https://www.youtube.com/watch?v=zx_E6nfspPE | v0.35 map overview | (community) | 8,182 words | Brief Vancouver Island segment: nation count, the unflagged First Nations, and the land-tile figure. | Short segment on Vancouver Island; most of the video covers other maps. |
| Y3 | https://www.youtube.com/watch?v=EdcdsayA_ac | v0.35 map strategy / lobby sizes | (community) | 19,281 words | Discusses the land-driven lobby formula and how Vancouver Island's 2M+ land tiles put it in the 100-player tier. | ASR transcript; numbers are spoken, not shown on screen. |

**YouTube source count for guide:** Y1–Y3 (3 videos with Vancouver Island content).

### Official / primary sources

| # | URL | Type | Note |
|---|---|---|---|
| O1 | https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0 | Formal GitHub Release | v0.35.0 release notes, 2026-10-16. New Maps section: "Vancouver Island: 30+ nations from the Pacific Northwest." Gameplay & Balance: "Removed the 125 player cap from public lobbies; size now comes from the map's land." |
| O2 | `resources/maps/vancouverisland/manifest.json` @ v0.35.0 tag | Upstream source (AGPLv3) | 32 nations, 30 additionalNations, 2,012,664 land tiles, 2600×1980 grid. |
| O3 | `public/images/maps/vancouver-island-v35.webp` (from upstream `thumbnail.webp`) | Upstream asset (AGPLv3) | Used in the guide as the map image, with attribution. |

**Official source count for guide:** O1 (release notes) + O2 (manifest) + O3 (image).

---

## Research notes (English, ≥600 words)

The Vancouver Island map, shipped in v0.35.0 on October 16, 2026, is the most land-dense map in the v0.35 batch and the one whose lobby size most visibly changes under the new land-driven sizing formula. The official release notes describe it as "30+ nations from the Pacific Northwest," credited to RickD004. The upstream manifest at the v0.35.0 tag confirms 32 named nations on the main island, of which 26 carry the British Columbia flag, 2 carry the Washington flag (Clallam County and San Juan, representing the U.S. side of the Strait of Juan de Fuca), and 1 carries the Vancouver flag. Three further nations — the Kwakwaka'wakw Nation, the Coast Salish Nation, and the Nuu-chah-nulth Nation — carry no flag entry in the manifest, making them visually distinct from every other nation on the board. The manifest also lists 30 `additionalNations`, all flagged `britishcolumbia`, with names such as Whistler, Tsawwassen, and Ladysmith. These are overflow names drawn from the pool only when a lobby's nation count exceeds 32; in a default public lobby they do not appear.

The map's full-resolution grid is 2,600 by 1,980 tiles and carries 2,012,664 land tiles, making it one of the largest boards by land area in the game's map pool. The `map4x` and `map16x` variants (117,919 and 491,184 land tiles respectively) are zoom-level renderings, not separate maps. The strategic consequence of this land mass is that, under the v0.35 land-driven lobby sizing formula — which multiplies the land-tile count by 50 per million, rounds to the nearest multiple of five, and applies a floor of five — Vancouver Island's base (large) tier is 100 players, with medium at 75 and small at 50. Team-mode lobbies multiply the FFA tier by 1.5, giving 150, 113, and 75. These numbers are derived from the documented formula applied to the manifest value; the formula itself is verified in the existing `lobby-size-map-driven` guide and the v0.35.0 release notes, which state that the flat 125-player cap was removed (PR #5548, FloPinguin).

The nation-to-player ratio is the map's defining feature. In a large FFA lobby (100 players), the board has 32 named nations plus up to 30 overflow names, but the player count far exceeds the nation count, meaning each human player claims a substantially larger territory than on a typical 32-nation board. In compact mode the engine uses `Math.floor(32 × 0.25) = 8` nations, which changes the board's density dramatically. The three unflagged First Nations entities are a unique visual and mechanical feature: they spawn without a flag, which distinguishes them on the map and in the player list. The release notes' "30+ nations" phrasing is consistent with the 32 main-island nations plus the 30 overflow names.

Community discussion (Reddit threads R1–R3) confirms that players identify Vancouver Island as the largest land-tile map in the v0.35 batch and note the Pacific Northwest naming. YouTube coverage (Y1–Y3) covers the island's coastline, the inlet network, and the land-driven lobby formula. The combined signal is that Vancouver Island is a wide, land-rich board where the spawn decision (which side of the island, which named nation, whether to anchor on the coast or the interior) matters more than on a compact board, and where the 100-player large tier makes it one of the biggest public lobbies the game can now produce.

**Research word count (this section): ~780 words.**
