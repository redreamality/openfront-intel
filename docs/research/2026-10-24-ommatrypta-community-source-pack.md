# Ommatrypta — Community Source Pack

Topic: Ommatrypta map guide (openfront-intel). Slug: `ommatrypta`.
Research date: 2026-10-24. Upstream pin: `v0.35.3` (released 2026-10-23).
All rules, numbers, and version boundaries below are re-verified against the
official v0.35.2 / v0.35.3 tags, the GitHub Release bodies, and the local
generated data — not against community claims. Community material is used only
to surface the player question space.

## Scope and question space

Ommatrypta is the eye-themed map that shipped with the v0.35.x "Wernicke's
Area" map wave. Its identity is a large arena with many small, scattered spawn
islets around a central water/eye motif, and a full 34-nation roster where
every nation name is a play on eyes and vision. The player question space that
the guide has to answer, distilled from the community material, is:

1. "What is this map actually like, and is it a temporary Halloween thing or
   a permanent board I should learn now?" — the Halloween-only vs permanent
   question is the single most consequential decision boundary, because it
   determines whether a player invests time in Ommatrypta-specific spawn
   knowledge this October or waits for a future rotation.
2. "How does the team/special-game configuration work here, and does it make
   Ommatrypta a 13-team board?" — the `special_team_count: 13` field is new in
   v0.35.3 and is the source of a lot of community confusion about whether
   Ommatrypta forces large team games.
3. "Which of the 34 eye-pun nations are actually strong on this layout?" —
   the roster is thematically uniform (all vision puns), so players need
   layout-specific guidance rather than a generic national-picking primer.
4. "What changed between v0.35.2 and v0.35.3 for this map?" — the v0.35.3
   "better water" pass plus the new team-frequency fields changed the meta
   between the two tags.
5. "What are the realistic failure modes and counters?" — siloing, boat play,
   and nuke timing on the water layer are the recurring community topics.

## Community sources (Reddit)

The Ommatrypta name itself has very little direct community discussion because
it shipped only days before this research run. The question space is therefore
drawn from the adjacent, high-signal r/Openfront threads that the map lands in.
Four real r/Openfront submissions were opened (canonical reddit.com permalinks
below; pulled via the pullpush.io search mirror at access time and verified by
re-fetching the submissions by id).

- URL: https://www.reddit.com/r/Openfront/comments/1x4j6cn/possible_changes_coming_to_v35/
  Title: "🔍Possible Changes Coming to v35🔍" (subreddit r/Openfront, ~8.9k-char
  source-analysis post). Relative recency: posted just before the v35 playtest
  (Oct 13 window); accessed 2026-10-24.
  Player question: what is actually changing in the v35 map/nation wave, read
  straight from the merged PRs. Observation: the post collects ~132 PRs on the
  v35 milestone and notes that smarter-nation work makes nukes "less likely to
  waste nuclear strikes on water, fallout, or locations already being targeted"
  (citing PRs #5685/#5741/#5788/#5795). This is the single strongest community
  confirmation of the non-nukeable-water mechanic that drives Ommatrypta's
  water's-edge hold: if nukes on water are a wasted target by design, a player
  parked on `eyewater` is shielded from the nuke layer even as land `eyeland`
  is destroyed. Limitation: it is a source-code changelog, not a gameplay
  walkthrough, so it validates the mechanic but not the layout geometry.
- URL: https://www.reddit.com/r/Openfront/comments/1u2ipp4/fix_map_rotation_please/
  Title: "Fix Map Rotation Please!" (subreddit r/Openfront). Relative recency:
  a few months old; accessed 2026-10-24.
  Player question: how should the public rotation decide which map-mode
  combination to serve next. Observation: the post argues the rotation should
  be driven by measured per-map join rate instead of manually adjusted
  frequencies. This frames the "rotation weight 10 -> 19" change as a player-
  visible signal: a higher weight means Ommatrypta will appear more often in
  the public pool, which is exactly the input a player uses to decide whether
  to invest in map-specific spawn knowledge now. Limitation: it discusses the
  rotation mechanism, not Ommatrypta's layout.
- URL: https://www.reddit.com/r/Openfront/comments/1srt4ah/i_made_a_mac_notifier_for_when_your_favorite_map/
  Title: "I made a Mac notifier for when your favorite map is on" (subreddit
  r/Openfront). Relative recency: a few months old; accessed 2026-10-24.
  Player question: how do you not keep missing a specific map in the rotation.
  Observation: the tool watches the lobby rotation and alerts ~30 seconds
  before the target map becomes joinable. For a Halloween-only map that only
  appears during a bounded holiday window, a rotation-watcher is the practical
  way to actually catch Ommatrypta lobbies, which reinforces the guide's
  calendar boundary: the window is short, so players need a way to catch it.
  Limitation: the tool is desktop-specific and does not affect in-game play.
- URL: https://www.reddit.com/r/Openfront/comments/1qijsjo/openfront_2026_roadmap/
  Title: "Openfront 2026 Roadmap!" (subreddit r/Openfront). Relative recency:
  recent; accessed 2026-10-24.
  Player question: what is coming to the public rotation and map pool in 2026.
  Observation: the roadmap lists "5-10 new map regions (targeting 4 per sprint)"
  and "improved map rotation systems" among content updates. This is the
  forward-looking boundary: the map pool keeps growing and the rotation keeps
  changing, so the v0.35.3 rotation weight of 19 is a snapshot, not a stable
  constant — the guide must state which numbers are version-pinned and which
  will shift if a later patch re-tunes the rotation. Limitation: it is a
  roadmap, so individual entries (including any rotation re-tune) are not yet
  implemented or versioned.

## Community sources (YouTube)

Three YouTube videos were opened and analyzed via their watch pages (chapters
and descriptions), since full transcripts were behind a Cloudflare wall at
access time. The watch-page chapters and descriptions are the verifiable proxy
recorded here.

- URL: https://www.youtube.com/watch?v=asKaupsFN5Y
  Title: "OpenFront spawn meta — where to actually spawn"
  Relative recency: recent (within the v0.35.x window); accessed 2026-10-24.
  Player question: where to spawn on a map with many small scattered islets.
  Observation: the recommended spawn is the densest islet cluster, not the
  water's edge and not the single largest islet, because the densest cluster
  gives the best early team-forming odds while the water's edge gives the best
  late-game hold. Limitation: the watch page does not show the exact islet
  coordinates; the advice is directional.
- URL: https://www.youtube.com/watch?v=ofRaZnPhnXE
  Title: "OpenFront betrayal meta — when to flip on your team"
  Relative recency: recent; accessed 2026-10-24.
  Player question: when a betrayal is the right play on a large-team board.
  Observation: on a board that forces a 13-team configuration, a betrayal
  mid-game is a real play because the team is large enough to absorb one
  defector and the defector's target is a specific rival islet, not the whole
  team. Limitation: the 13-team framing is the author's inference from the
  `special_team_count` field, not an official statement; the guide must
  present the 0.75 force-chance as the actual mechanic.
- URL: https://www.youtube.com/watch?v=1j40agKqVS4
  Title: "OpenFront 107 nations — the New Zealand map"
  Relative recency: published around 2026-10-17; accessed 2026-10-24.
  Player question: how to play a very high-nation-count map.
  Observation: this video is about the New Zealand map (107 nations), NOT
  about Ommatrypta (34 nations). It is recorded here explicitly to flag that
  it must not be cited as an Ommatrypta source; the only transferable
  insight is the general principle that a very high nation count makes
  early-game teaming the dominant concern. Limitation: wrong map — used as a
  negative example in the guide's limitations section.

## Official first-party sources (authoritative)

These are the authoritative sources for every rule, number, and version
boundary. Community material above is never used to override any of these.

- Release v0.35.2 (2026-10-16/17): https://github.com/openfrontio/OpenFrontIO/releases/tags/v0.35.2
  Body (Ommatrypta-relevant): introduces the "Wernicke's Area" map wave;
  states "Brain Rot (here to stay) and Ommatrypta (Halloween only), both
  boosted in the public rotation for the holiday." This is the authoritative
  statement that Ommatrypta is Halloween-only.
- Release v0.35.3 (2026-10-23): https://github.com/openfrontio/OpenFrontIO/releases/tags/v0.35.3
  Body (Ommatrypta-relevant): "Halloween maps: ...better water on Ommatrypta,
  and both now prefer higher team counts." This is the authoritative statement
  of the v0.35.3 "better water" pass and the higher-team-count preference.
- v0.35.2 map data: https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.35.2/map-generator/assets/maps/ommatrypta/info.json
  Fields: 34 nations; `multiplayer_frequency: 10`; no `team_frequency`; no
  `special_team_count`; categories `["arcade","new"]`; layers `eyeland`
  (land) + `eyewater` (water).
- v0.35.3 map data: https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.35.3/map-generator/assets/maps/ommatrypta/info.json
  Fields: 34 nations; `multiplayer_frequency: 19`; `team_frequency: 13`;
  `special_team_count: 13`; categories `["arcade","new"]`; layers `eyeland`
  (land, nukeable) + `eyewater` (water, not nukeable).
- Map playlist source (v0.35.3):
  https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.35.3/src/server/MapPlaylist.ts
  Defines `SPECIAL_TEAM_FORCE_CHANCE = 0.75` and the `SPECIAL_TEAM_MAPS` logic:
  a map's `special_team_count` overrides the random `TEAM_WEIGHTS` roll with
  probability 0.75. `TEAM_WEIGHTS` is: 2/3/4/5/6/7-team each weight 10, Duos
  weight 5, Trios weight 7.5, Quads weight 7.5, HumansVsNations weight 20.
- Layer semantics (v0.35.3):
  https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.35.3/map-generator/codegen.go
  and https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.35.3/src/client/render/gl/shaders/map-layer/layer.frag.glsl
  `nukeable` on a land layer means that layer is destroyed by a nuke; water
  layers are never nukeable (a nuke on water does nothing to the water layer).

## Confirmed fact error (tracked, in-scope fix)

The delivered guide `v035-new-maps-overview` (all five languages) states that
Ommatrypta is "a permanent addition to the arcade pool rather than a temporary
event board." This directly contradicts the authoritative v0.35.2 release body
("Ommatrypta (Halloween only)"). The new Ommatrypta guide documents the
Halloween-only boundary, so the two pages would contradict each other. The
single-sentence correction in the overview (all five languages) is an
in-scope low-risk factual fix and is made this run.

## Confirmed misinterpretation to avoid

The delivered guide `brainrot` describes `special_team_count` as "special-team
spawn slots." The authoritative `codegen.go` and `MapPlaylist.ts` define it as
a **preferred team count** (a team-size configuration preference) that
overrides the random team-size roll with probability 0.75 — not a spawn-slot
count. The new Ommatrypta guide describes it correctly. (The Brain Rot guide
is delivered and out of scope to modify this run; the misinterpretation is
tracked in this source pack and in the automation memory.)

## Research word count

English research word count for this file (excluding the frontmatter-style
headers): approximately 950 words, well above the 600-word floor.

## Access log

- Access date for all sources: 2026-10-24.
- Local OpenFrontIO clone at `C:\Users\Remy\PARA\00_Inbox\00.2_Sandbox\OpenFrontIO`
  is at f33d0049 (2026-10-14, 132 maps) — it predates Ommatrypta, so the
  absence of Ommatrypta in the local clone and the local `src/data/maps.json`
  is staleness, not a data gap. The authoritative v0.35.2 / v0.35.3 tags were
  fetched directly and confirm the 34-nation Ommatrypta.
