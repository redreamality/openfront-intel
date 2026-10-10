# Cape Cod map — community source pack

Generated 2026-10-10. This pack records the community and official sources analyzed for the
Cape Cod map guide (`/guides/cape-cod/`). Every gameplay fact, number, and version boundary in
the guide is verified against the upstream OpenFrontIO repository; the community sources below
are used only to identify player language, confusion, real match situations, and repeated
questions. Community posts are not treated as rules authority.

## Player question and the answer gap

The single player question this page answers is: **on Cape Cod, which side of the map should I
take and how do I play the one chokepoint that actually connects the two land masses?** A new
player who lands on the spawn screen sees thirty-one named towns — Plymouth, Falmouth,
Nantucket, Chatham, Wellfleet, and so on — and has no idea which cluster they belong to, what
the map is really made of, or where the game will force a fight. The gap is that Cape Cod is not
one island and it is not one peninsula: it is three playable zones (a mainland, the Cape itself,
and a string of islands) that meet at exactly one narrow crossing, the Cape Cod Canal. The guide
turns the raw spawn list into a decision table.

## Target keyword cluster

Target cluster is the "OpenFront Cape Cod map" query family: `openfront cape cod map`,
`openfront.io cape cod spawn`, `cape cod map openfront which side`, `openfront v34 new maps`,
`cape cod canal openfront`. Neighbouring clusters are the generic v34 new-maps search and the
existing map/FFA-opening pages. Current landing is the official map list and the community wiki
map page; the existing intel site had no dedicated Cape Cod answer, which is the answer gap this
new page fills. Data cutoff for the search signal is the GSC final window that closes on
2026-11-06; a missing or stale GSC export is recorded as unknown, not as zero demand. This is a
community-sourced teaching topic with no strong existing search rank, so it is produced as a
teaching exploration under the weekly cap.

## Official evidence (rules authority)

- OpenFrontIO pull request #5071, which added the Cape Cod map asset and rotation entry:
  https://github.com/openfrontio/openfrontio/pull/5071
- The commit that landed it in the verified local clone, `3223573e8`:
  https://github.com/openfrontio/openfrontio/commit/3223573e8
- The v0.34.0 release that shipped the map to players (fetched and cached as release JSON):
  https://github.com/openfrontio/openfrontio/releases/tag/v0.34.0
- The shipped `manifest.json` for the map, which lists the authoritative 31 spawn nations, the
  750×620 `map4x` grid, and `num_land_tiles` of 143,346, was read directly from the clone.
- A local parse of `map4x.bin` confirmed 143,346 land tiles, 31 nation spawns, and two large
  land components (mainland ~76,600 tiles, Cape ~48,700 tiles) separated by water, plus several
  island components.

## Reddit sources (3+)

Each entry records the player question, the usable observation, its limits, and the access date.

1. https://www.reddit.com/r/Openfront/comments/1vubmgg/ — "Does anyone know anything about v34?"
   Player question: what does v34 actually change and are the new maps worth playing. Usable
   observation: genuine first-contact curiosity about the new content and maps, the exact moment
   a new player needs orientation. Limit: general v34 thread, not Cape-Cod-specific; no rules
   facts. Accessed 2026-10-10.
2. https://www.reddit.com/r/Openfront/comments/1wi93jx/ — "OpenFront.IO Steam Release + V34
   Update — Everything You Need to Know". Player question: a digest of the Steam release and the
   v34 update. Usable observation: the community is framing v34 as a release worth a full
   walkthrough, which supports a dedicated new-map page. Limit: summary post; map-level detail is
   thin and it is not a Cape Cod source. Accessed 2026-10-10.
3. https://www.reddit.com/r/Openfront/comments/1wj9pcj/ — "I used to send 20% of my troops once I
   stopped expanding into wildland in games." Player question: when and how much force to commit
   to a crossing once a border is established. Usable observation: real players reason about
   committed-force ratios at a fixed border, which is exactly the decision the Cape Cod Canal
   forces. Limit: an economy/troop-ratio thread, not map geometry; used for player language only.
   Accessed 2026-10-10.

## YouTube sources (3+)

1. https://www.youtube.com/watch?v=PQVpzkTLIek — Ultimus_Rex, "OpenFront v34 just dropped… |
   OpenFront.io". General v34 reaction covering the update and new map content; used for version
   context. No dedicated Cape Cod segment was transcribed, so it is cited as v34 context, not as
   Cape Cod evidence. Accessed 2026-10-10.
2. https://www.youtube.com/watch?v=qZB_CHmA4Kw — Lonely_Millennial, "OpenFront.IO Steam Release +
   V34 Update — Everything You Need to Know". Release walkthrough that pairs with the Reddit
   digest thread; used to confirm the release framing. Accessed 2026-10-10.
3. https://www.youtube.com/watch?v=Nit1uODzT7M — Enzo Plays, "Every Map in Openfront.io
   Timelapse". A full map tour including the new map, used to confirm the map is present in the
   playable rotation and to orient on its overall shape. Accessed 2026-10-10.

Rejected source: https://www.youtube.com/watch?v=PUXUzd8eO6Q — "The new OpenFront map is
CRAZY…" (Ultimus_Rex). The transcript shows it is actually a V31 discussion mislabeled as the new
map, so it is excluded as v34 / Cape Cod evidence rather than cited.

## Terrain verification notes

The guide's core geometric claims come from the local clone, not the community: two separate land
components (mainland ~76,610 tiles, Cape ~48,725 tiles at `map4x`), the narrowest water crossing
between them of about 2 tiles on the `map4x` grid (roughly 5 full-resolution tiles) near row 236
through row 241, which is the Cape Cod Canal; and a wide bay region on the south side where the
gap opens to hundreds of tiles. The thirty-one spawns split into 12 mainland towns, 10 Cape
towns, and 9 island/peninsula starts. All of this is stated in the guide as repository-verified,
and the community sources above are cited only for the player question they raise.
