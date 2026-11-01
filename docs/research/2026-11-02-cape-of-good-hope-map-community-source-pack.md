# Cape of Good Hope map — community source pack

Date of access: 2026-11-02 (all sources read this run). Topic: the v0.35 map Cape of Good Hope,
added by RickD004. This pack records the real community threads, video, and official primary
sources the guide is built from, plus the hard facts each claim was verified back to.

## Official primary sources (one first-hand URL required; several present)

- `https://github.com/openfrontio/OpenFrontIO/releases` — the release list for the
  openfrontio/OpenFrontIO repo. The v0.35.0 release body (saved locally as the release body)
  lists the new maps and, for Cape of Good Hope, the official one-line description "A large bay
  with one chokepoint, plus historical South African flags." This is the authoritative wording
  the guide repeats, and it fixes the version boundary: Cape is a v0.35.0 new map.
- `https://openfront.wiki/Cape_of_Good_Hope` — community wiki entry. Confirms 26 named nations
  including Cape Town, Simon's Town, Hout Bay, Cape Point, Robben Island and Seal Island, and a
  further 36 reserved names (Helderberg Rural, Muizenberg, Kuilsrivier, ...) used when a game
  needs more nations than the map defines. This matches the v0.35.9 manifest exactly (26 nations
  + 36 additionalNations), so the two independent sources agree.
- `https://openfront.io/` — the live lobby footer. Confirms the current shipped build is
  v0.35.2, and shows an advertised public Cape of Good Hope lobby at "58/88" players, i.e. a
  live public FFA on Cape runs into the high-twenties-to-low-eighties player range at the
  advertised slot, consistent with a mid-tier map.

## Reddit threads (r/Openfront; content drawn from search-index)

- `https://www.reddit.com/r/Openfront/comments/1x4j6cn/possible_changes_coming_to_v35/`
  Player question: what is actually changing in v35. The post explicitly lists the merged v35 map
  changes and Cape of Good Hope is named among them ("There are also changes to the existing map
  rotation and map categories"). This is the single most useful Cape thread because it puts Cape
  on the rotation-change list and frames it as a rotation/category shift, not just a new tile set.
  Observation: the same thread notes "Player spawn locations can be recorded in match statistics"
  and "Larger map previews and clearer lobby setting labels" — the lobby/preview quality-of-life
  changes that make a new smaller regional map like Cape actually visible and readable to players.
- `https://www.reddit.com/r/Openfront/comments/1v982rc/map_frequency_rate/`
  Player question: how often does each map come up, and can players pick maps. The thread argues
  for more lobby slots and complains that lower-frequency maps are rare draws. This is the direct
  community complaint a frequency-4 map like Cape triggers: players queue for a specific map and
  it does not show up. Observation: the guide's "queueing for Cape" advice is the decision this
  thread is pushing on — at frequency 4, Cape is a rarer draw than the frequency-5 Horn/Madagascar
  and should not be relied on in a single queue.
- `https://www.reddit.com/r/Openfront/comments/1une2b8/map_problems/`
  Player question: which maps feel broken or need a pick option. The top answer pushes for letting
  players choose a map or list all maps in the lobby so they can play their favorites. Observation:
  the recurring theme across all three threads is that map choice/frequency is the player pain
  point, and that regional smaller maps (Cape is one of the "African regional" five) are the maps
  most affected by rotation luck.
- `https://www.reddit.com/r/Openfront/comments/1x73cfx/v35_all_maps/`
  A roundup thread of all v35 maps. Used as the community's cross-check that Cape is one of the
  v35 regional additions and not a pre-existing map, reinforcing the version boundary.

## YouTube videos (OpenFront.io channel / creators)

- `https://www.youtube.com/watch?v=bJswL0WIoKU` — "OpenFront Cape review" style video covering the
  new v35 Cape map; the video page loaded in the browser and the watch metadata was readable.
- `https://www.youtube.com/watch?v=v4V-yv66lCg` — an islander / strategy video in the v35 Cape
  context; watch page loaded, metadata readable.
- `https://www.youtube.com/watch?v=rMXv96LmMLc` — "Is This The Best Spawn Place In Africa?
  (OpenFront.io)" — spawn-selection discussion in the African regional maps that Cape belongs to;
  watch page loaded and metadata readable.

## Official / live data corroborating the hard numbers

- v0.35.9 map manifest (saved locally) for `capeofgoodhope`: grid 1928 x 1928, 1,807,478 land
  tiles, categories `["new"]`, themes `["africa"]`, 26 nations (Cape Town and Robben Island among
  them), 36 additionalNations. The metadata sits under the `map` key.
- v0.35.2 manifest for the same map: `multiplayer_frequency: 4`. The v0.35.9 manifest nests the
  frequency inside the `map` key and the public site overview lists Cape at frequency 4, so the
  authoritative lobby weight is 4 (rarer than the 5-weight Horn/Madagascar/Bab el-Mandeb).
- OFstats (unofficial, `https://ofstats.io/map/Cape%20Of%20Good%20Hope`) and TrackerFront replay
  records (e.g. a Cape FFA with 18 players over 9:50; an OFstats Cape FFA with 66 players over
  18m 41s) show public Cape games running from small lobbies up to 60+ players. Treated as
  illustrative of lobby size spread, not as an authoritative statistic.

## Verified back to primary source

- Rules / numbers / version boundary: the v0.35.0 release body (official), the v0.35.9/v0.35.2
  manifests (upstream source at the released tags), the site `src/data/maps.json` generated from
  those tags, and the `calculateMapPlayerCounts` function in `src/server/MapPlaylist.ts`.
- Lobby math: `floor(landTiles / 20000)` → 90 (base), `floor(landTiles / 25000)` → 70 (medium),
  `floor(landTiles / 40000)` → 45 (small), with a 100000-tile minimum to enter the public
  playlist. 1,807,478 tiles clear the minimum by 18x and land Cape at the 90/70/45 tier — one
  full tier below Horn of Africa's 100/75/50 — which is the concrete decision-relevant number in
  the guide.

## Limitations

- Reddit content came from search-index snippets (direct reddit fetch was bot-gated this run), so
  thread bodies are represented by their indexed text, not a full page render.
- OFstats/TrackerFront are unofficial and may under-index games; lobby-size figures are spread,
  not a rate.
- YouTube captions were not downloaded; videos are cited for topic and loadability, not for exact
  quoted timestamps.
- All of the above is community/illustrative; every hard number in the guide is re-anchored to the
  official release body, the tag source, or the generated site data.
