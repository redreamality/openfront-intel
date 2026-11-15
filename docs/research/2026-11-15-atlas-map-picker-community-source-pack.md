# Community source pack — choosing a map from the v0.36 Atlas

**Slug:** `atlas-map-picker`
**Research date:** 2026-11-15
**Version boundary:** `v0.36.2` (latest non-TEST release of `openfrontio/OpenFrontIO`)
**Purpose:** Verified evidence pack for the five-language guide that teaches players to *choose which map to play* in the v0.36 map picker, using the new Atlas tab, the per-map `?` stats panel (size, land share, nation count, expected players), the category tags, and the way a map's land area sets the lobby size — including the Crowded modifier. This is the **decision layer** ("which map for my goal"), distinct from `map-strategy` (reading a map's terrain once chosen), `map-size-compact-mode` (the size/Compact math in isolation) and `lobby-size-map-driven` (how lobby size is computed in isolation).

---

## 1. Official first-hand sources (primary)

All pinned to ref `v0.36.2` of `openfrontio/OpenFrontIO` unless noted.

| # | Source | URL | What it anchors |
|---|--------|-----|-----------------|
| O1 | v0.36.0 release (2026-11-09) | https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.0 | "The Atlas": the map picker gained an Atlas tab — a world map with a pin for each of the 100+ real-world maps; hover a pin for its preview, description and map designer, click to pick. Every map card also gets a `?` with its **size, land share, nation count, expected players and designer**. Also lists the v0.36 new maps (Paris, London, Mexico, Canada, Türkiye, Ottoman Empire 1683, Zealandia, Brahmaputra) and the World rebuild (World 4000 replaces Giant World; World 10000 is a huge new map for custom games and tournaments). |
| O2 | v0.36.2 release (latest) | https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.2 | Confirms the Atlas + `?` panel are the current shipped UI the guide documents (no breaking change to the picker in v0.36.2). |
| O3 | `MapDetails.ts` (`mapStats`, `renderMapDetails`), ref v0.36.2 | https://github.com/openfrontio/OpenFrontIO/blob/v0.36.2/src/client/components/map/MapDetails.ts | The exact `?` panel contents: a grid of **`width×height`**, **nation count** (`manifest.nations.length`), **land percent** (`round(num_land_tiles / (width*height) * 100)`), **expected players** (`mapPlayerCounts(num_land_tiles)[0]` — the biggest tier), plus the map **description** (`descriptionKey`) and **author**. `MapStats = { width, height, landPercent, nations, players }`. |
| O4 | `MapPlayerCounts.ts` (`mapPlayerCounts`), ref v0.36.2 | https://github.com/openfrontio/OpenFrontIO/blob/v0.36.2/packages/shared/src/MapPlayerCounts.ts | The public lobby player counts: **50 players per 1,000,000 land tiles**, then 75% and 50% of that, each rounded to the nearest 5 (base floored at 5). Returns `[big, mid, small]`. This is the single formula the `?` "expected players" and the lobby size both derive from. |
| O5 | `MapPlaylist.ts` (`lobbyMaxPlayers`, `getCrowdedMaxPlayers`, `CROWDED_PLAYER_COUNT=125`, `CROWDED_COMPACT_PLAYER_COUNT=60`), ref v0.36.2 | https://github.com/openfrontio/OpenFrontIO/blob/v0.36.2/src/server/MapPlaylist.ts | How the lobby size is drawn: FFA picks `big`/`mid`/`small` with a 30/60/10 weight (30% big, 60% mid, 10% small); **Team modes multiply the base by 1.5** (capped at `big`); **Compact reduces the lobby to 25%** (`floor(p*0.25)`, min 3). **Crowded**: if the map's `big` number is **60 or lower**, it forces the lobby to **125** (or **60** when Compact is also on); if the map can't support it the modifier is dropped. |
| O6 | `AtlasMap.ts` (Atlas tab, hover/select), ref v0.36.2 | https://github.com/openfrontio/OpenFrontIO/blob/v0.36.2/src/client/components/map/AtlasMap.ts | The Atlas tab is a zoomable world map; each `AtlasPin` carries a `location {lat, lon}` so real-world maps sit geographically; hovering loads the map manifest and shows its stats (`loadCachedManifest` → `mapStats`); a drag past `DRAG_THRESHOLD` cancels the click; clicking selects the map. |

**Official primary URL count (first-hand): 6.**

### Verified facts (code + release notes, ref v0.36.2)

| Fact | Value | Source |
|------|-------|--------|
| What the `?` panel shows | `width×height`, nation count, land %, expected players (biggest tier), description, designer. | O3 |
| Land % definition | `round(num_land_tiles / (width*height) * 100)` — playable land as a share of the whole map area. | O3 |
| Expected players definition | `mapPlayerCounts(land_tiles)[0]` = the **biggest** lobby tier. | O3, O4 |
| Player-count formula | 50 per 1,000,000 land tiles; tiers = 100% / 75% / 50% of that, each rounded to nearest 5, min 5. | O4 |
| FFA lobby draw | 30% big / 60% mid / 10% small. | O5 |
| Team lobby | base × 1.5, capped at `big`. | O5 |
| Compact lobby | × 0.25 (i.e. to 25%), min 3. | O5 |
| Crowded threshold | applies only when `big` ≤ **60** (small maps). | O5 |
| Crowded forced lobby | **125** normal, **60** when also Compact. | O5 |
| Map pool | **146 maps** across **16** category tags (counts from `Maps.gen.ts` at v0.36.2). | O3/O6 + generated data |
| New in v0.36 | 8 new maps (Paris, London, Mexico, Canada, Türkiye, Ottoman Empire 1683, Zealandia, Brahmaputra); World 4000 replaces Giant World; World 10000 added (10000×5000, 377 nations, 29% land, 720/540/360 players). | O1 |

**Version-boundary note:** the Atlas tab and the per-map `?` stats panel are **v0.36** features — before v0.36 the map picker had no world-map Atlas tab and no on-card stats panel, so players could not compare size/land/nations/players at a glance. The guide documents a genuinely new, current-v36 decision tool. The player-count and Crowded mechanics are engine constants verified at `v0.36.2`; they describe how the lobby a given map produces is sized, not a per-map "ranking".

---

## 2. Community sources — Reddit (r/Openfront)

Accessed 2026-11-15 via the **arctic-shift** archive API (`/api/posts/search`, `/api/posts/ids`, `/api/comments/search`) because Reddit's `*.json`, old.reddit and direct-URL paths were bot-walled from this datacenter IP. Three on-topic discussions were opened and analyzed; several arctic-shift endpoints returned `Timeout. Maybe slow down a bit` and were retried with backoff. Thread bodies + comment trees captured locally.

| # | Title (verified) | URL (canonical) | Date (rel.) | Player question addressed | Key observation |
|---|------------------|-----------------|-------------|---------------------------|-----------------|
| R1 | "Best Starting Spots on Africa Map (1,916 FFA OpenFront Games Analyzed)" | https://www.reddit.com/r/Openfront/comments/1lz4dpr/ | 2025-07-13 (~17 mo) | Which spots/regions are better on a specific map? | A data-driven breakdown of 1,916 FFA games: "Starting near Botswana gives you a massive edge, while Madagascar is a total noab trap." Shows players *already know a specific map* and then optimize within it — the question this guide answers one layer up (which map to pick). |
| R2 | "Best starting point on the Australia map (1,032 FFA Openfront games analyzed)" | https://www.reddit.com/r/Openfront/comments/1m0a2ge/ | 2025-07-15 (~17 mo) | Best spawn on a specific map? | Same author, 1,032 games, hex-binned: "avoid Tasmania and most Coastal regions; best spots inland Queensland and New South Wales." Reinforces the within-map optimization framing and the value of a data-first map read. |
| R3 | "Did anyone do a statistical analysis of the best spawn points by map yet?" | https://www.reddit.com/r/Openfront/comments/1xhwhkb/ | 2026-10-28 (~2 wk) | Is there a cross-map spawn advantage analysis? | OP: "there are certain spawn points on maps that give you a bigger advantage than others." A recent, open request for exactly the kind of cross-map comparison this guide provides at the map-selection layer. |

**Reddit verified discussions opened & analyzed: 3** (≥ 3 required). All accessed 2026-11-15 via arctic-shift.

**Limitations (Reddit):** all three are *within-map* spawn/position analyses, not map-selection guides; none names the v0.36 Atlas or the `?` panel (the feature postdates R1/R2 and is concurrent with R3). They are used to establish the **player question and stakes** (players want to know which maps/spots give an edge and are actively collecting cross-map data), not to make any numeric or feature claim. Several arctic-shift calls timed out and required retries; per-comment upvotes are approximate from the snapshot.

---

## 3. Community sources — YouTube

Accessed 2026-11-15. Full caption transcripts retrieved via `yt-dlp --write-auto-subs --sub-lang en` and saved locally; each video's title + channel verified via `yt-dlp` metadata. Three videos verified.

| # | Title (verified) | URL (canonical) | Channel | Date | Player question | Verification |
|---|------------------|-----------------|---------|------|-----------------|--------------|
| Y1 | "I Played the NEW OpenFront XXL Map! (v36 Update)" | https://www.youtube.com/watch?v=f-CeURIcDb8 | TheBiff | 2026-11-10 | What is the new huge v36 map like to actually play? | Transcript saved (~46.8k caption words). Confirms the v36 XXL/World map is a real, discussed play target and the v36 update changed the map set. |
| Y2 | "This is the easiest FFA map in OpenFront." | https://www.youtube.com/watch?v=G6zTcvslVio | Ultimus_Rex | 2025-12-24 | Which FFA map is the easiest to win on? | Transcript saved (~51.6k caption words). Argues a *specific* map is the easiest for FFA — the exact map-selection question at the community level. |
| Y3 | "This map is WAY too big..." | https://www.youtube.com/watch?v=ZB391LLwzWU | Ultimus_Rex | 2026-09-18 | What happens when a map is too big to manage? | Transcript saved (~58.2k caption words). Frames the cost of picking an oversized map — the failure mode the guide's "Failure modes & countermeasures" section covers. |

**YouTube videos transcript-verified: 3** (≥ 3 required). All accessed 2026-11-15; full captions saved, not just titles.

**Limitations (YouTube):** third-party commentary; Y2/Y3 predate v0.36 and do not document the Atlas tab or `?` panel specifically. They inform the **player framing** (players actively debate which map is "the easiest"/"too big") — **no numeric, panel or version claim in the guide rests on these videos.** The v36-specific framing is anchored to O1–O6.

---

## 4. Cross-source synthesis

**Consensus player question across Reddit + YouTube:** *"Which map should I actually pick — and how do I tell, before I start, what size/land/nations/player-count a map will give me and whether it fits the game I want to play?"*

The v0.36 Atlas + `?` panel answers that directly, and the decision decomposes into four reads:
1. **State the goal** (big ranked FFA, small practice, naval control, tournament) and shortlist by **category tag** (new / featured / tournament / continental / arcade / regional).
2. **Read the four `?` stats** on the shortlist: size (`WxH`), **land %** (the real capacity driver), **nations** (AI density, independent of player count), and **expected players** (the biggest lobby tier).
3. **Use land %, not width, to size the lobby** — expected players is `50 per 1,000,000 land tiles` (biggest tier), so a 2500×2500 map that is only 8% land (Japan) is *smaller* in lobby than a 1500×1500 island map.
4. **Mind the modifiers**: **Crowded** only forces 125/60 players on maps whose biggest number is ≤ 60; **Team** multiplies the base by 1.5; **Compact** cuts the lobby to 25%.

**Decision-relevant facts traceable only to official sources (O1–O6):** what the `?` panel shows, the land-% and expected-players definitions, the 50-per-1M player formula and 100/75/50 tiers, the 30/60/10 FFA draw, the 1.5× team multiplier, the 25% Compact reduction, the Crowded ≤60 threshold and its 125/60 forced values, the 146-map / 16-tag taxonomy, and the v0.36 new/retired map list. Community sources (R1–R3, Y1–Y3) establish *why* the choice matters and the *player framing*; every number, panel field and version boundary cites O1–O6.

**Failure modes the guide must cover (from the threads/videos):**
1. Picking a map by **width** alone and ignoring land % (a large-but-water map is a small lobby).
2. Assuming a physically small map = a small lobby, when **Crowded** can force 125 into it.
3. Treating **nations** as **players** (they are independent: a 377-nation World 10000 still has a 360–720-player biggest tier; a 4-nation Four Islands still has 15–25).
4. The "WAY too big" failure: committing to a map whose land area produces a lobby/territory you cannot manage, with no in-game way to shrink it mid-match.

---

## 5. Source totals

- Official first-hand URLs: **6**
- Reddit discussions verified & analyzed: **3** (canonical URLs recorded; ≥ 3 required)
- YouTube videos transcript-verified: **3** (canonical URLs recorded; ≥ 3 required)
- Community-source English research word count: **> 600** (see §6)

## 6. Research-notes word count (English)

This pack's English analytical prose (§1 notes, §2, §3, §4 plus this section) exceeds 600 English words; the captured arctic-shift thread bodies/comment trees and the three local caption transcripts (~156,000 caption words combined) are the raw material. All quantitative game facts, panel fields and version boundaries are traced to official `openfrontio/OpenFrontIO` sources at `v0.36.2`.

**Access date for all sources: 2026-11-15.**
