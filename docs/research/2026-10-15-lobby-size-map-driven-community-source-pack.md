# Community source pack — lobby-size-map-driven (2026-10-15)

Topic: **the 125-player public-lobby cap is removed in v0.35, and lobby size is now derived
from each map's land-tile count** — PR #5548, commit `d1c7a6a11f77eb4d53772745e7ead03d0b01c161`
("Remove the 125 player cap from public lobbies", merged 2026-09-19), present in v0.35.0-beta1
(`ab5cc6115`) and v0.35.0-beta2 (`0dc1f9e4e`) and absent from the current stable v0.34.25
(`dfd9e478b`). Player question this guide answers: *which lobbies actually get bigger now, what
the new size number will be for a given map and mode, how the randomness works, and how that
changes the decision of which map and mode to pick.*

Access date for all sources: 2026-10-15 (Russia TZ 9 / UTC+10). Direct `reddit.com` HTML, the
`old.reddit.com` mirror, the `.json` endpoint and several redlib instances were all gated from
this environment (JS challenge, login redirect, or 403), so the Reddit threads were opened and
analyzed through the pullpush.io archive mirror, which returns the same selftext; official
numbers were re-checked against the `openfrontio/OpenFrontIO` tags, the PR body, the release
body, and the authoritative `tests/server/MapPlaylistLobbySize.test.ts`.

## Official first-hand sources (ground truth)

- PR #5548 "Remove the 125 player cap from public lobbies", commit `d1c7a6a11f77eb4d53772745e7ead03d0b01c161`,
  merged 2026-09-19, in v0.35.0-beta1 and v0.35.0-beta2; the stable v0.34.25 `lobbyMaxPlayers`
  still ends with `p = Math.min(p, MAX_PLAYER_COUNT)` where `MAX_PLAYER_COUNT = 125`.
  https://github.com/openfrontio/OpenFrontIO/pull/5548
- Implementation at v0.35.0-beta2: `src/server/MapPlaylist.ts` — `lobbyMaxPlayers` (the final
  `Math.min(p, MAX_PLAYER_COUNT)` line is gone) and `calculateMapPlayerCounts`, which now reads
  `base = Math.max(roundToNearest5((landTiles / 1_000_000) * 50), 5)` and returns
  `[base, roundToNearest5(base * 0.75), roundToNearest5(base * 0.5)]`.
  https://github.com/openfrontio/OpenFrontIO/blob/v0.35.0-beta2/src/server/MapPlaylist.ts
- Authoritative test that pins the five affected maps' tier numbers:
  `tests/server/MapPlaylistLobbySize.test.ts` (The Box 4,194,304 land tiles → 210/160/105).
  https://github.com/openfrontio/OpenFrontIO/blob/v0.35.0-beta2/tests/server/MapPlaylistLobbySize.test.ts
- v0.35.0-beta1 release notes (published 2026-09-19): "Lobby sizing follows the map. The
  125-player cap is gone. Lobby size now comes from the map, so The Box fits 210, Alps 185 and
  Middle East 170."
  https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0-beta1
- v0.34.25 (current stable, the build still live on the public servers):
  https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.25
- Game site (player-facing entry point): https://openfront.fyi/

## Reddit (community) — opened and analyzed

1. "Possible Changes Coming to v35" — r/Openfront, u/Meta_Mushroom, post `1x4j6cn`, 2026-10-13.
   https://www.reddit.com/r/Openfront/comments/1x4j6cn/possible_changes_coming_to_v35/
   A player collated the v35 milestone PRs and wrote a "Larger Public Lobbies" section that
   quotes the merged PR #5548 and prints a before/after table for the five affected maps across
   FFA (new/old) and Team (new/old). This is the community's own statement of exactly which maps
   change and to what numbers, so it is the bridge between the official release claim and what
   players are actually discussing. Observation: the post is explicit that the old cap applied to
   every scheduled lobby, which is why the new behaviour is a pure increase on the maps whose
   base tier exceeds 125. Limitation: the post is AI-assisted and warns that some items "could
   already be present in earlier builds", so the version boundary had to be re-verified against
   the stable and beta tags (stable v0.34.25 still caps at 125; both betas do not).

2. "Actual Balancing Feedback and Ideas" — r/Openfront, u/EntertainerTrick6711, post `1kg8dtt`,
   2026-05-06.
   https://www.reddit.com/r/Openfront/comments/1kg8dtt/actual_balancing_feedback_and_ideas/
   A long balance thread where the author complains that when "there are 50, 100, even 150
   players on a map, its not very balanced", and argues the map resolution should scale with
   player count so that "some players physically cannot expand" stops happening. Observation:
   this is the demand the v0.35 change responds to — bigger maps should host bigger, fairer
   lobbies instead of a hard ceiling. It also surfaces the failure mode (dense land, slow
   expansion) that the guide's "when it breaks" section treats. Limitation: it is a proposal,
   not a report of the change, and predates the PR by months, so it frames intent rather than the
   shipped formula.

3. "More game rooms per minute" — r/Openfront, u/No_Dish9053, post `1no1e5v`, 2025-09-23.
   https://www.reddit.com/r/Openfront/comments/1no1e5v/more_game_rooms_per_minute/
   A player asks for multiple matches with different maps and modes rather than a single option
   every minute, and notes the game has well over 20,000 players. Observation: it grounds why a
   single large lobby is a scarce, contested resource, which is what makes the new map-driven
   size a meaningful decision input rather than a cosmetic number. Limitation: it is about lobby
   throughput, not player-count capping, so it is used only to frame the "why it matters" angle.

## YouTube (community) — opened and analyzed (English auto-captions verified)

1. Ultimus_Rex — "125 players on a map with NO water is CRAZY. | OpenFront.io", id `uLShpuNOTWE`,
   published 2026-09-24, 56:35, ~11,758 views.
   https://www.youtube.com/watch?v=uLShpuNOTWE
   A full 125-player free-for-all on a waterless, land-heavy map. The opening subtitle is "125
   player free-for-all on the Alps map", and the video is about how crowded a land-dense map
   feels when it fills to the cap. Observation: it is the player-facing evidence of what a
   maxed-out big lobby actually looks and feels like — many simultaneous fronts, slow early
   expansion, a constant threat of being surrounded. That is exactly the experience the v0.35
   change extends to 185/210 players on the same maps. Limitation: it is recorded at the old
   125 cap, so the 185/210 numbers are not yet in the footage.

2. TheBiff — "They put 125 players on This TINY Map! | OpenFront.io", id `-FnCKANbpHE`,
   published 2026-09-18, 55:15, ~6,855 views.
   https://www.youtube.com/watch?v=-FnCKANbpHE
   A 125-player lobby on a small map, used to show how crowded lobbies break on small maps.
   Observation: it is the counter-example the guide needs — the removal only helps maps that are
   genuinely land-rich, and small maps with a forced crowded modifier get the opposite treatment.
   This is why the guide splits the five big maps from the rest. Limitation: it demonstrates the
   failure mode, not the new behaviour.

3. Ultimus_Rex — "How to Win a 125 Player OpenFront Game", id `UJgjkpQU5Bw`, published 2026-06-10,
   17:21, ~2,822 views.
   https://www.youtube.com/watch?v=UJgjkpQU5Bw
   A tactical walkthrough for surviving a 125-player free-for-all: positioning, expansion order,
   and when to commit to a front. Observation: it supplies the decision content the guide adapts
   to the new sizes — in a 210-player lobby the same positional logic has to be stretched across
   more fronts, which changes how early you commit. Limitation: it is a strategy video, not a
   source for the formula, so it informs the decision and failure sections only.

## Key grounded rules (from #5548 + tag source + test file)

- The old `lobbyMaxPlayers` ended with `p = Math.min(p, MAX_PLAYER_COUNT)` (125) as a
  performance cap applied to **every** scheduled lobby. The v0.35 `lobbyMaxPlayers` removes that
  final line entirely; the only remaining ceiling is the map's largest tier `l`, so the player
  count is now `min(mode === Team ? ceil(base * 1.5) : base, l)`.
- The tier numbers come from `calculateMapPlayerCounts(landTiles)`:
  `base = max(roundToNearest5((landTiles / 1_000_000) * 50), 5)`, then
  `[l, m, s] = [base, round5(base * 0.75), round5(base * 0.5)]`.
- FFA picks a tier by a single uniform roll: `base = r < 0.3 ? l : r < 0.6 ? m : s` (30% large,
  30% medium, 40% small). Team uses the same roll for the base tier but then sets
  `p = ceil(base * 1.5)`, clamped to `l`.
- The five affected maps (per the test file land-tile inputs): The Box 4,194,304 → 210/160/105
  (team up to 158); Alps 3,672,000 → 185/140/95; Middle East 3,449,078 → 170/130/85; Two Lakes
  3,426,935 → 170/130/85; Mare Nostrum 2,644,620 → 130/100/65. Only The Box and Alps exceed the
  old 125 cap in their largest tier; Middle East, Two Lakes and Mare Nostrum are now simply
  "map-proportional" rather than capped.
- The Crowded modifier is a **separate** weighted modifier that, when a map's largest tier is 60
  or lower (small maps), forces the count to `CROWDED_PLAYER_COUNT` (125) or
  `CROWDED_COMPACT_PLAYER_COUNT` (60) if compact is also enabled. It does not apply to the five
  big maps because their largest tier is far above 60.
- Compact mode is unchanged by #5548: `p = max(3, floor(p * 0.25))` applied after the base is
  chosen, so a compact lobby is always a quarter of the normal size and never re-hits a 125 cap.
- **Version boundary:** the removal is in the v0.35.0-beta1/beta2 playtest builds and is **not**
  in the current stable v0.34.25. On stable, every scheduled lobby is still hard-capped at 125,
  so The Box and Alps still start at most at 125.

## English research word count target

The notes above plus the guide's own fact base clear the 600 English research-word floor for the
source pack.
