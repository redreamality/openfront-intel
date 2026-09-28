# Community source pack — Black Sea FFA openings

- Proposed guide slug: `black-sea-ffa-openings`
- Research question: **On the Black Sea map in a public FFA, should a player choose the broad southern/eastern land arc, a river-separated western/northern pocket, a tight coast, or a crowded corner, and what is the first exit plan for each?**
- Current official boundary: OpenFrontIO `v0.34.20`, published 2026-09-26.
- Access date for every source and local check: **2026-09-29**.
- Evidence rule: Reddit and YouTube establish player questions, vocabulary, observed dilemmas, and failure modes. Map geometry, rotation weight, version status, and any numeric claim come from the official tagged repository or the shipped tagged map binary.

## Topic choice and non-duplication boundary

The proposed page owns a map-specific pre-spawn decision: where to place on the Black Sea ring, which exit must remain open, and when an early boat is an escape rather than an economic luxury. It is not a renamed version of an existing answer. `map-strategy` teaches the generic concepts of connected land, water networks, terrain, and spawns. `europe-ffa-openings` covers the much larger standalone Europe map. `world-map-ffa-spawns` covers Giant World/World first pockets, and `yangtze-river-ffa-openings` applies a separate pipe-river geometry to nine Yangtze landmarks. `ffa-midgame-strategy` begins after the opening and asks whether to hold, expand, or ally. The Black Sea page instead owns the pre-match sector choice and the first land/water exit on this specific ring-shaped map.

Cross-source demand is coherent. The direct Black Sea videos compare central Turkiye, Georgia/Armenia, Romania, and a crowded northwest start rather than claiming one magic coordinate. Reddit repeatedly asks whether an apparently good position is still good after many players select it, whether a central start's options outweigh its exposure, and when a tiny naval foothold is justified to avoid being boxed in. The official map then explains why those dilemmas recur: nearly half the passable land belongs to one large southern/eastern component, while river-separated western and northern components offer natural edges but less room and fewer land exits.

## Accessibility preflight and retrieval method

The three canonical Reddit RSS endpoints returned HTTP 403 safety pages on 2026-09-29, so they were not counted from title snippets or inaccessible HTML. Their full post bodies, metadata, and archived replies were successfully opened through the Arctic Shift `api/posts/ids` and `api/comments/search?link_id=` endpoints; the canonical Reddit URLs below remain the public citations. One broad Arctic Shift search initially returned an API timeout, then the exact-ID endpoints succeeded. A later broad comment-body search also timed out and was abandoned because it was unnecessary.

All three counted YouTube watch pages were preflighted with `yt-dlp`. Metadata resolved and an `en-orig` caption track was listed and downloaded for each. The notes below come from the full caption files, not search-result summaries. A fourth video (`G6zTcvslVio`) was also preflighted successfully but is not needed for the minimum and is not counted below.

## Reddit discussions actually opened and analyzed (3)

### R1 — Direct Black Sea completion attempt

- URL: https://www.reddit.com/r/Openfront/comments/1ld9ioa/
- Title: “Winning On Every Map, Online, 3/24 - Black Sea”
- Date / relative age: posted 2025-06-17; about fifteen months old at access.
- Player question: What does a full-map Black Sea win attempt look like, and what still threatens a player who has survived the geographic opening?
- Observations: The author says they normally aim for 100% on these map-completion attempts, identifies their late position as southern Ukraine, and reports surviving four MIRVs before another inbound MIRV forced them to stop waiting for a perfect screenshot. One reply argues that different maps produce different MIRV reachability and therefore demand different strategies. This is useful context for the opening guide because choosing a northern or western pocket cannot be evaluated only by the first two minutes: the position also needs room for separated late structures and a route into the rest of the ring.
- Limitations: This is a screenshot/showcase thread with only two archived replies, not a spawn tutorial. It supports the existence of Black Sea-specific strategic demand and a late-game failure mode, but it does not prove that southern Ukraine is strong or weak. No mechanic or numeric rule is taken from it.
- Accessed: 2026-09-29 via Arctic Shift full post and comments records.

### R2 — Position, terrain, player density, and the boxed-in exception

- URL: https://www.reddit.com/r/Openfront/comments/1nx2yer/
- Title: “So you got addicted to OpenFront but keep losing? Don't worry, there's help [Beginner's guide to the early game]”
- Date / relative age: posted 2025-10-03; about twelve months old at access.
- Player question: How should a player choose a spawn when the best-looking terrain is crowded, and how can they avoid being trapped after the initial expansion?
- Observations: The post reduces placement to position, terrain, and other players. It favors edges or corners with water access over exposed centers, but warns that many players often select the same obviously good location. It discourages slow early naval attacks except when the player is about to be boxed in; in that case it recommends a very small foothold on a distant bot to preserve a later route. It also warns against thin land “snakes” that can be cut. The replies preserve the important counterargument: a central spawn can create more expansion options for a confident player, while another player says a river-side central start can be powerful but will soon be boxed by people and requires careful alliance play. A late reply states the exact unresolved tradeoff: choose the player-riddled good spot or the bad-terrain empty spot?
- Limitations: The examples are generic and the guide predates v34. Player percentages and build sequences are personal heuristics, not rules. The value for this project is the decision conflict and failure vocabulary, which will be tested against Black Sea geometry rather than copied as a fixed build order.
- Accessed: 2026-09-29 via Arctic Shift full post and 20 archived comments.

### R3 — Water access, early ratios, and contested advice

- URL: https://www.reddit.com/r/Openfront/comments/1qt4cz8/
- Title: “My best strategy in openfront.io”
- Date / relative age: posted 2026-02-01; about eight months old at access.
- Player question: How aggressively should a player clear the opening, and should a water-adjacent or island position buy a City, Port, or escape route first?
- Observations: The author starts near a 20% send setting, moves toward 46–50% to clear early bots/nations, and says to build a Port when water is available or a City when landlocked. They describe dying after failing to build a Port. The discussion is more useful than the prescription: several replies cap normal pressure nearer 30–40% because visible weakness attracts attacks; one player explicitly recommends choosing a seaside position, expanding on land and by ship together, spreading structures, and using Ports; another says to spawn several bot layers away from player neighbors. Replies also distinguish a trapped island from a viable fortress: an isolated player needs Port income and a Warship before Cities become useful, while an exposed land player needs reserve troops. These disagreements support a conditional framework rather than a single ratio.
- Limitations: The original post has a low score and its advice is disputed. No percentage, cost, or island rule will be stated as fact from this thread. It is retained because the replies expose the exact coastal tradeoffs a Black Sea player must resolve.
- Accessed: 2026-09-29 via Arctic Shift full post and 19 archived comments.

## YouTube videos with verified captions (3)

### Y1 — Central Turkiye versus Georgia/Armenia and Romania

- URL: https://www.youtube.com/watch?v=JTXUypEGJ2I
- Title: “60 Player Battle Royale Around The Black Sea” — vari
- Date / relative age: published 2026-06-27; about three months old; 41:57 total, with Black Sea FFA as game one through the 22:50 recap.
- Player question: Which Black Sea sector supplies water, an initial pocket, and continued access without turning the start into a coastal trap?
- Observations: At the opening the player calls the chosen location “a pretty central spawn in Turkey.” River access lets them place farther back from the coast while keeping a decent pocket. They say Turkiye is considered a meta start but that they personally often prefer Georgia/Armenia and have recently used Romania. Their concise test is more useful than the ranking: water access, a decent pocket, and access to the rest of the map. During the early game, nearby players commit to Ports at different times, alliances shape whether trade and boats are safe, and a transport sent along the coast is shot down. This is a direct Black Sea match that demonstrates why coastline access and coastline exposure are different variables.
- Limitations: This is one edited high-skill match, not a controlled comparison of sectors. “Meta” is the creator's community language, and no universal win rate follows from it. The guide should use the three-factor test and scenario, not assert that Turkiye or Georgia is always best.
- Accessed: 2026-09-29; watch metadata plus complete `en-orig` WebVTT captions verified.

### Y2 — Crowded northwest and the lost land exit

- URL: https://www.youtube.com/watch?v=p8HCWSRlJBY
- Title: “Can I Control The CHAOS Of This Spawn?” — vari
- Date / relative age: published 2026-05-31; about four months old; 38:53 total, with a no-modifier Black Sea FFA from 17:30 to the 37:11 recap.
- Player question: What should a player do when an attractive northwest Black Sea corner is overcrowded and offers no clear annexation path?
- Observations: The second match is announced as a 50-player Black Sea FFA, which the creator calls crowded. They spawn in the northwest, plan reasonably early boats, then notice many players compressed into the same corner. With no clear annexation opportunity, they push east specifically to secure water access and try to cut north. Moldova takes two bots and a City first, while another player cuts off the northern route. This supplies a concrete failure chain: nominal edge safety does not compensate for too many human markers; loss of the first land gate makes the early boat an escape option, not merely a Port-economy play.
- Limitations: It is one match and the later loss also involves alliance and silo mistakes, so the spawn alone cannot explain the outcome. “Northwest” is a visual sector description rather than an official spawn label. The guide should present it as a crowded-state scenario with observable stop signals.
- Accessed: 2026-09-29; watch metadata plus complete `en-orig` WebVTT captions verified.

### Y3 — A reusable spawn evaluation vocabulary

- URL: https://www.youtube.com/watch?v=iZQDOuTVcLY
- Title: “OpenFront.io V27 Complete Guide (Everything You Need to Know)” — Enzo Plays
- Date / relative age: published 2025-12-16; about nine months old; 37:24.
- Player question: Which variables should be evaluated before committing to a spawn, especially when other players are still placing?
- Observations: The guide names five factors: pace, terrain, pocket, proximity, and map characteristics/dynamics. It recommends selecting promptly enough not to lose a desired pocket, preferring easier terrain where possible, and treating proximity to human players as central because too many competitors shrink the usable bot pocket. It also explains the counterweight: a central position can have more directions to expand, while a nominal pocket can fail when several people compete for it. These factors give the Black Sea guide a neutral vocabulary for comparing sectors without turning nation labels into a tier list.
- Limitations: This is a generic v27 guide played on other maps. It cannot establish Black Sea geometry or current v34 numbers. Its role is to provide a reusable decision vocabulary; all current facts are checked independently below.
- Accessed: 2026-09-29; watch metadata plus complete `en-orig` WebVTT captions verified.

## Official first-hand sources and fact anchors

### O1 — Current formal Release boundary

- URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.20
- Title: OpenFrontIO Release `v0.34.20`
- Date / relative age: published 2026-09-26; three days before access.
- Player question: Which shipped version may the guide claim to describe?
- Observations: This is the latest formal non-TEST Release at research time. Its notes contain lobby-pool and loading/telemetry fixes, not a Black Sea map rebalance. The guide can therefore state a `v0.34.20` verification boundary while using the tagged Black Sea assets unchanged at that tag.
- Limitations: Absence from one Release note does not prove a map has never changed; tagged assets and history supply the positive evidence.
- Accessed: 2026-09-29 through the GitHub Release API/CLI and tag checkout.

### O2 — Original map addition

- URL: https://github.com/openfrontio/OpenFrontIO/commit/903a630953b506dbc005d66a2e9df240fd15b403
- Title: “added Black Sea”
- Date / relative age: committed 2025-01-02; about twenty-one months old.
- Player question: Is Black Sea a current v34 novelty or an established map with a longer community history?
- Observations: Git history traces the asset to this addition, followed by manifest/nation metadata and generator migrations. That age explains why there are both older Reddit discussions and fresh v34 matches without requiring the guide to treat the map as newly released.
- Limitations: The initial commit is provenance, not the current geometry authority; current numbers come from the v0.34.20 tag.
- Accessed: 2026-09-29 from local official Git history.

### O3 — Tagged manifest and nation landmarks

- URL: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/resources/maps/blacksea/manifest.json
- Title: `resources/maps/blacksea/manifest.json` at `v0.34.20`
- Date / relative age: tagged 2026-09-26; current official asset at access.
- Player question: How large is the map, how much land does it contain, and which geographic labels can the guide use as stable landmarks?
- Observations: Full resolution is 1500×1100 with 1,165,868 land tiles. The `map4x` gameplay asset used for the reproducible parse below is 750×550 with exactly 285,772 land tiles. Nine official nation markers provide geographic landmarks: Bulgaria, Turkiye, Romania, Moldova, Ukraine, Russia, Georgia, Armenia, and Circassia. These are not fixed public-FFA player spawns; players place freely during the spawn phase.
- Limitations: A manifest lists dimensions and markers but does not rate a sector or expose current human placement. The guide must never present nation markers as mandatory start points.
- Accessed: 2026-09-29 from the local official tag and GitHub blob.

### O4 — Tagged rotation weights

- URL: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/core/game/Maps.gen.ts
- Title: generated Black Sea map configuration at `v0.34.20`
- Date / relative age: tagged 2026-09-26.
- Player question: Can a normal public FFA actually roll Black Sea, and how prominent is it in rotation?
- Observations: Black Sea has `multiplayerFrequency: 6`, `ffaFrequency: -1`, `teamFrequency: -1`, and nine default nation markers. The `-1` is a fallback signal, not exclusion.
- Limitations: Weight 6 is a playlist weight, not a 6% probability; the denominator depends on every other map in the playlist.
- Accessed: 2026-09-29 from the official tag.

### O5 — FFA fallback behavior

- URL: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/server/MapPlaylist.ts
- Title: `MapPlaylist.ts` at `v0.34.20`
- Date / relative age: tagged 2026-09-26.
- Player question: What does Black Sea's `ffaFrequency: -1` mean in the actual playlist builder?
- Observations: For an FFA playlist, the server uses `ffaFrequency` when it is at least zero and otherwise falls back to `multiplayerFrequency`. Black Sea therefore contributes six entries to the normal FFA map pool. Players can receive it through ordinary public FFA rotation; no custom lobby is required.
- Limitations: This proves inclusion and relative weighting only. It does not guarantee when a particular user will see the map.
- Accessed: 2026-09-29 from the official tag after enumerating the tag tree to confirm the real path.

### O6 — Shipped terrain binary and reproducible geometry parse

- URL: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/resources/maps/blacksea/map4x.bin
- Title: Black Sea `map4x.bin` at `v0.34.20`
- Date / relative age: tagged 2026-09-26.
- Player question: Which parts of the ring supply broad connected land, which are river-separated pockets, and where is water access immediate?
- Observations: The local parser read all 412,500 bytes using the project's terrain encoding (`0x80` land bit; lower magnitude 31 would be impassable). The binary contains 285,772 passable land pixels and 126,728 water pixels, matching the manifest's land count exactly. It has 26 passable-land connected components. The largest contains 140,632 pixels, or 49.2% of all passable land, and includes the Turkiye, Russia, Georgia, Armenia, and Circassia landmarks: the broad southern/eastern arc is one continuous land arena. Bulgaria (18,554), Romania (8,636), Moldova (10,530), and Ukraine (17,938) each sit on different smaller components separated by water/river channels. At a 50-pixel `map4x` radius, passable-land share is Turkiye 98.8%, Russia 97.9%, Georgia 96.8%, Armenia 96.1%, Bulgaria 95.6%, Moldova 94.3%, Romania 93.3%, Ukraine 89.0%, and Circassia 59.3%. Distance to water from those landmarks ranges from Romania 4 and Moldova 9 to Georgia 37 and Turkiye 49 `map4x` pixels.
- Limitations: These are landmark samples, not guarantees about a player's freely chosen FFA coordinate, and `map4x` pixels are an analysis scale rather than a UI distance unit. Local land share measures geometric room, not terrain attack cost, player density, or victory probability. The guide should use the values to define sector archetypes and scenarios, not publish a rigid nation tier list.
- Accessed: 2026-09-29 from the local official tag; parser retained in the automation cache, outside the project tree.

## Cross-source synthesis for the guide writer

The strongest answer is conditional. A player should not select “Turkiye” or “northwest” by name and then stop thinking. During the countdown, compare four observable inputs: usable local land, current human-marker density, immediate water access, and the number of distinct exits into the ring. The broad southern/eastern component offers the most continuous room and matches Y1's central-Turkiye pocket, but its connectivity also creates more future land contact. The western/northern components trade raw room for natural water/river edges; Y2 shows that their value collapses when many players select the same corner and consume the few land gates. A tight Circassia-like coast has immediate sea access but much less local land in the sampled radius, so it needs an explicit inland or boat exit before the countdown ends.

A useful draft framework is **RING**: **Room** (local passable pocket), **Indicators** (how many human markers contest it), **Navigation** (water access and whether an early transport is safe), and **Gates** (at least one land expansion gate plus one fallback). The default call is to choose the least-contested location that clears all four checks, not the visually “best” coast. If the preferred pocket gains several human markers, move before the timer ends. If a western/northern pocket has only one land gate, secure it before buying infrastructure. If that gate is already contested, send a minimal escape foothold only when the loss of all expansion room is otherwise imminent; do not confuse a slow transport with normal early growth.

Two evidence-backed scenario shapes are ready for the article. Scenario A can use a 50-player northwest lobby like Y2: several players are in the same corner, no clear annexation exists, and a rival can take two bots plus the only City/land route. The decision is to move the spawn, or secure water and the gate immediately rather than execute a normal economic opening. Scenario B can use Y1's central southern start: river/sea access is retained while the starting point sits back from the coast in a large pocket. The player can clear land first, then add a Port once neighboring Ports create real trade, but must preserve a path to the rest of the map and avoid treating “meta” as protection from crowding.

Expected failure modes are also distinct from the site's existing guides: selecting the famous sector after it becomes overcrowded; spawning directly on the coast and sacrificing inland room; choosing a river pocket without identifying its only gate; launching a large early transport that delays land growth; and placing permanent infrastructure on the first exposed shoreline. Opponent counterplay includes racing the same gate, annexing the remaining bots, screening transports with a Warship, and using the continuous southern/eastern arc to approach from land. Map/mode adjustments should say that lower-player FFA increases the value of broad continuous land, crowded FFA raises the value of a second exit, and Team mode changes the problem because allies can deliberately occupy adjacent components and coordinate crossings.

## Counted-source summary

- Reddit discussions actually opened and analyzed: **3** (requirement 3).
- YouTube videos with complete verified captions actually opened and analyzed: **3** (requirement 3).
- Official first-hand OpenFront sources: **6** (requirement 1), including a formal Release, original commit, tagged manifest, generated map config, playlist implementation, and shipped binary.
- All rule, rotation, geometry, date, and numeric claims are anchored to official sources. Community claims remain observations or hypotheses.
- English research prose exceeds the 600-word minimum; an exact local count is recorded after file creation.
