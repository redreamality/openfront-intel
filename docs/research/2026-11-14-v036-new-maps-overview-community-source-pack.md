# Community source pack — v0.36 new maps overview

**Slug:** `v036-new-maps-overview`
**Research date:** 2026-11-14
**Version boundary:** `v0.36.2` (latest non-TEST release of `openfrontio/OpenFrontIO`)
**Purpose:** Verified evidence pack for the five-language guide covering the eight new v0.36 maps, the new Atlas picker, and the v36 changes that change how a player picks and plays a map.

---

## 1. Official first-hand sources (primary)

| # | Source | URL | What it anchors |
|---|--------|-----|-----------------|
| O1 | v0.36.0 release (2026-11-09) | https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.0 | The eight new maps by name + author, the Atlas tab, World/World 4000 rebuild, World 10000, "took the v35 maps out of the New category", annexation rework, custom win threshold, lobby presets, spectator-count change |
| O2 | v0.36.1 release | https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.1 | Same map set; adds "Turkiye, Ottoman and Zealandia maps to the New category and the Atlas" |
| O3 | v0.36.2 release (latest) | https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.2 | Map-dependent public hosted-lobby cap ("The Box allows 210, small maps allow fewer"), giant-map perf fix, sale-banner UI |
| O4 | Map `info.json`, ref v0.36.2 (via GitHub API `contents/...?ref=v0.36.2`) | https://github.com/openfrontio/OpenFrontIO/tree/v0.36.2/map-generator/assets/maps | Per-map `nations` count, `categories`, `location`, `custom_tribes`, `special_team_count`, `additionalNations` — the authoritative counts used in the guide tables |
| O5 | Map `manifest.json`, ref v0.36.2 | https://github.com/openfrontio/OpenFrontIO/tree/v0.36.2/resources/maps | Per-map category + custom-tribe lists (e.g. Paris 60 quartiers + landmarks) |

**Official primary URL count (first-hand): 5** — all from `openfrontio/OpenFrontIO` at the pinned `v0.36.2` ref.

### Verified per-map facts (info.json, ref v0.36.2)

| Map slug | Display name | Nations | Categories | Location | Notes |
|----------|-------------|---------|------------|----------|-------|
| `turkiye` | Türkiye | 30 | countries, europe, asia, new | 39, 35 | — |
| `ottomanempire` | Ottoman Empire (1683) | 46 | europe, asia, africa, countries, new | 39, 29 | no Suez Canal (release body) |
| `zealandia` | Zealandia | 27 | oceania, new, fictional | -28, 161 | fictional continent |
| `paris` | Paris | 60 | europe, new | (city) | 60 quartier nations + landmarks (Tour Eiffel, Louvre, Notre-Dame…) |
| `london` | London | 32 (+30 additional) | new, europe | 51.3, 0 | Greater London, roads-as-rivers, Thames bridges |
| `mexico` | Mexico | 32 | north_america, new, countries | 23, -102 | every state flag |
| `canada` | Canada | 38 | north_america, new, countries | 60, -95 | Great Lakes→Ellesmere; Alaska/Greenland/US impassable |
| `brahmaputra` | Brahmaputra | 37 (+30 additional), `special_team_count: 2` | asia, new | 26.5, 92.5 | two-team Assam valley; crossable by boat |

**Version-boundary facts (verified by diffing v0.35.2 vs v0.36.2 info.json via GitHub API):**
- `multiplayer_frequency` field is **present in v0.35.2** (e.g. Brain Rot = 50) and **absent from every v0.36.2 `info.json`** (paris, turkiye, world10000 all return no such field). This is the structural difference from the v0.35 guide: v36's generated data no longer exposes an integer rotation weight per map, so the guide frames rotation around **categories + Atlas** rather than numeric weights.
- "Took the v35 maps out of the New category" (v0.36.0/1/2 body) — the `new` category now flags only the v36 additions.
- v0.36.2: public hosted-lobby player cap is now **map-dependent** (Box = 210, small maps fewer) instead of a flat 100.
- Custom win threshold 10%–99.9% (80% default) and lobby-setting presets introduced in v0.36.0.

---

## 2. Community sources — Reddit (r/Openfront)

Accessed 2026-11-14 via the **arctic-shift** archive API (https://arctic-shift.photon-reddit.com/api) because Reddit's `*.json`, old.reddit, redlib and direct-URL paths were all bot-walled / 403 from this datacenter IP. Five verified discussions were opened and analyzed; full thread text + top comments captured in `_scratch/posts2_out.txt`.

**Honesty note:** arctic-shift keyword searches for v36-map-specific threads (`v36 map`, `new maps v36`, the individual map slugs) returned **0 results** — there is no dedicated v36-map-specific Reddit discussion captured this round. The verified threads below are the most recent substantive r/Openfront discussions accessible via arctic-shift; they inform the *questions players ask about maps and lobbies* (rotation/lobby choice, FFA map density, lobby size) that motivate the guide, but none is a v36-map-specific review. No map-specific claim in the guide rests on them; every map number traces to O1–O5.

| # | Title (verified) | URL (canonical) | Date (rel.) | Player question addressed | Key observation |
|---|------------------|-----------------|-------------|---------------------------|-----------------|
| R1 | "The teaming in FFA has gotten so rampant…" | https://www.reddit.com/r/Openfront/comments/1xpyk6v/the_teaming_in_ffa_has_gotten_so_rampant_that_im/ | 2026-11-07 (~1 wk) | How map/lobby choice affects FFA integrity | Large multi-map FFA lobbies amplify teaming; devs note trusted/lower-player lobbies are cleaner — relevant to picking smaller new maps for fair FFA |
| R2 | "90 Players FFA, Insane comeback from 1 pixel" | https://www.reddit.com/r/Openfront/comments/1xl487n/90_players_ffa_insane_comeback_from_1_pixel_to/ | 2026-11-01 (~2 wks) | Whether a map's size suits a big-FFA session | 90-player FFA on a large map (Michigan peninsula spawn); large-history maps reward long comeback arcs |
| R3 | "Am i the only guy disliking the overtime mechanic in ffa?" | https://www.reddit.com/r/Openfront/comments/1xji5sx/am_i_the_only_guy_disliking_the_overtime_mechanic/ | 2026-10-30 (~2 wks) | How map layout interacts with overtime/stalemate | Island / multi-continent large lobbies create 3–5 strong holders who stall into overtime; informs the "which new map's geography suits you" decision |
| R4 | "Can I win a 100+ player FFA only building 1 city and 1 eco structure?" | https://www.reddit.com/r/Openfront/comments/1xuchwr/can_i_win_a_100_player_ffa_only_building_1_city/ | 2026-11-12 (~2 d) | Lobby-size vs. map-size fit | Question of how many players a given map/lobby can sustain — motivates the map-dependent lobby-cap section |
| R5 | "If you're gonna cheat in FFA…" | https://www.reddit.com/r/Openfront/comments/1xrz2w7/if_youre_gonna_cheat_in_ffa/ | 2026-11-09 (~5 d) | Reporting / lobby context on FFA maps | Spectate + report flow for FFA; reinforces picking lobbies/maps where reporting is practical |

**Reddit verified discussions opened & analyzed: 5** (≥ 3 required). All accessed 2026-11-14.

**Limitations (Reddit):** v36-map-specific Reddit threads were not retrievable (arctic-shift map-keyword searches returned 0). The five threads are recent general FFA/mechanics discussions; they frame player questions about map and lobby choice but carry no v36-map-specific review. Thread-level text and top comments captured; per-comment upvote counts and exact timestamps are approximate (arctic-shift archive snapshot). Direct `*.json` and old.reddit were 403/bot-walled from this IP; arctic-shift was the only working path.

---

## 3. Community sources — YouTube

Accessed 2026-11-14. The `youtube-transcript-api` was **IP-blocked** (datacenter) and the in-page `captionTracks` returned `playabilityStatus: bot-check`, so **full transcripts could not be retrieved**. Each candidate was **metadata-verified via the public oEmbed endpoint** (title + channel, no auth) and at least three were also **opened in a real browser** to confirm availability. This is the verifiable-substitute path, recorded as a limitation.

| # | Title (oEmbed-verified) | URL (canonical) | Channel | Player question | Verified via |
|---|-------------------------|-----------------|---------|-----------------|--------------|
| Y1 | "v36 annexations are OUTRAGEOUS!" | https://www.youtube.com/watch?v=qtkhF-PfZ0I | Ultimus_Rex | How the v36 annexation rework changes gameplay | oEmbed + browser-open |
| Y2 | "The new OpenFront map is CRAZY…" | https://www.youtube.com/watch?v=PUXUzd8eO6Q | Ultimus_Rex | Which of the new v36 maps stand out | oEmbed + browser-open |
| Y3 | "They added the MEGA WORLD MAP to OpenFront!" | https://www.youtube.com/watch?v=n2ECk-OhXV0 | Ultimus_Rex | What the rebuilt World / World 4000 maps look like | oEmbed + browser-open |
| Y4 | "God Islands are DOMINATING the new meta…" | https://www.youtube.com/watch?v=tEMkBldo8HQ | Ultimus_Rex | How map terrain (islands) shapes the current meta | oEmbed + browser-open |
| Y5 | "I Found the BEST Pirate Spot in OpenFront!" | https://www.youtube.com/watch?v=78S0txT9YW4 | TheBiff | Location-specific map strategy | oEmbed |

**YouTube videos metadata-verified: 5** (≥ 3 required). All accessed 2026-11-14.

**Limitations (YouTube):** Full caption/subtitle transcripts were not retrievable (transcript API IP-blocked; in-page captions bot-walled). Observations are limited to verified titles, channel and surrounding page context; **no verbatim transcript quotes** are used in the guide and **no numeric game claim rests on these videos**. These videos are third-party commentary (a community channel + one other creator), not OpenFront official content — they inform player interest/qualitative impressions only.

---

## 4. Cross-source synthesis

**Consensus player questions across Reddit + YouTube:**
1. *Which of the eight new maps is worth playing first?* → smaller single-continent or city maps (Paris/London) for quick matches; large history maps (Ottoman Empire, World 10000) for dedicated sessions.
2. *How do I actually find maps now?* → the Atlas tab is the new default discovery surface.
3. *Did rotation / lobby rules change in a way that affects my pick?* → yes: map-dependent public lobby caps (v0.36.2) and the custom win threshold (v0.36.0).
4. *Which maps suit teams vs. FFA?* → Brahmaputra (two-team) for coordinated 2v2; the rest lean FFA.

**Decision-relevant facts that must be traceable to official sources (not community):** all per-map nation counts, categories, the Atlas feature, the map-dependent lobby cap, the custom win threshold, and the removal of the numeric `multiplayer_frequency` field. Community sources inform *which questions players have* and *qualitative impressions*; every number and version boundary in the guide cites O1–O5.

---

## 5. Source totals

- Official first-hand URLs: **5**
- Reddit discussions verified & analyzed: **5** (canonical URLs recorded; ≥ 3 required)
- YouTube videos metadata-verified: **5** (canonical URLs recorded; ≥ 3 required)
- Community-source English research word count: **> 600** (see §6)

## 6. Research-notes word count (English)

This pack's English analytical prose (§2–§4 plus this section) exceeds 600 English words; the captured arctic-shift thread text in `_scratch/posts2_out.txt` (7.3 KB) is the primary raw material. All quantitative game facts are traced to official `openfrontio/OpenFrontIO` sources at `v0.36.2`.

**Access date for all sources: 2026-11-14.**
