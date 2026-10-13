# Source pack: How to Choose Your Spawn (OpenFront.io)

Date: 2026-10-13
Topic intent: the *general* spawn-decision problem — how to evaluate candidate spawn
positions and what to do with a weak one, across any map and any public mode. This is
distinct from the existing `team-spawn-formation` (team placement shape),
`world-map-ffa-spawns` (World-map FFA two-exit heuristic), and `spawn-kill-adjacent`
(defending an adjacent full-send). This guide owns the *evaluation framework* before
the window closes.

## Version boundary

All rules, numbers, and mechanics below were verified against the formal
**v0.34.24** tag of the `openfrontio/OpenFrontIO` repository (release dated
2026-10-06). Spawn mechanics were read directly from the tagged source, so the
version-sensitive numbers are the v0.34.24 values. The guide states this boundary in
every language.

## Official first-hand sources (openfrontio GitHub)

1. https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.24 — formal release
   page (verified HTTP 200 on 2026-10-13). Establishes the version boundary.
2. https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/SpawnExecution.ts
   — the spawn-phase execution logic. Verified in the local `OpenFrontIO` clone at tag
   v0.34.24: `SpawnExecution` (a) resolves the phase type from game mode, (b) validates
   the selected tile against the map, and (c) runs the spawn phase.
3. https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/Util.ts
   — `getSpawnTiles()`: a candidate is a valid spawn only if the tile is a *normal* land
   tile, the map validates it, and a **BFS radius-4** footprint around it contains no
   owned land and is entirely walkable. So a "spawn" is a 9-by-9-ish region that must be
   all neutral, walkable land — not a single point.
4. https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/configuration/Config.ts
   — `numSpawnPhaseTurns()`: manual multiplayer = **300 ticks**, random spawn = **150
   ticks**, singleplayer = **100 ticks**. Spawn **immunity = 50 ticks**.
   `minDistanceBetweenPlayers = 30` (Manhattan tiles) for random placement.

## Derived mechanics (grounded, not community claims)

- Tick = 100 ms, so 300 ticks ≈ 30 s manual, 150 ticks ≈ 15 s random, and the 50-tick
  post-window immunity ≈ 5 s of protected growth.
- During the spawn phase a *human* cannot send a full-force player attack at a player who
  is still immune; the engine rejects human attacks on an immune target. But expansion into
  neutral land and bot capture does **not** check player immunity, so the window is a
  *growth window*, not a freeze.
- A **Hard-AI Nation** is not subject to the human immunity rule and can commit its force
  the moment the window closes — so a hard nation on your border is a full threat the
  entire time the window is open.
- In **Random Spawn** the manual favorite is ignored; placement enforces at least 30
  Manhattan tiles between already-placed players, and the separation check can relax after
  repeated attempts on a crowded board. Random mode does **not** allow a re-roll.
- The first border contact has a terrain cost: Plains cheapest, Highland moderate,
  Mountain most expensive for both sides.

## Reddit discussions (r/Openfront) — ≥3

Accessed via the r/Openfront RSS/search endpoints on 2026-10-13. Note: RSS returns post
titles and comment bodies but not vote counts or comment depth, so "engagement" is read
from the number of distinct responding users, not from score.

1. **"How do you choose a good spawn?"** —
   https://www.reddit.com/r/Openfront/comments/1nrl7iu/how_do_you_choose_a_good_spawn/
   (2025-09-27, /u/InterestingLeather28). The single most on-topic thread. OP has a couple
   of wins but "still don't have a great grasp on what is a good spawn." Responses read:
   - /u/[deleted]: "Don't box yourself in a corner. Don't be scared of early fights. Lots of
     people will cut you off and you need an avenue of expansion all the time; as soon as
     you can't kill any bots you must make smart allies and begin to attack players."
   - /u/Ready_Bit7902: prefers novel areas, but always checks two things — (1) minimum
     players around it, (2) ability to build ports without them being easily taken.
   - (additional responding users present in the parsed thread).
   **Observation:** the community's recurring answer to "what is a good spawn" is
   *an expansion avenue + a defensible port*, not a country name.
2. **"What do you think about the maps?"** —
   https://www.reddit.com/r/Openfront/comments/1mdwuot/what_do_you_think_about_the_maps/
   Adjacent threads discussing maps/spawns surfaced in the same search batch
   (e.g. "Places I think would be good OpenFront maps", "Why do people spawn in the
   middle of maps"). **Observation:** players conflate "good map" with "good spawn" and
   frequently recommend spawning away from the crowded center.
   **Limitation:** comment depth beyond top-level replies was not retrievable via RSS;
   treat these as directional community sentiment, not measured preference data.
3. Search batch `spawn` (restrict_sr=1, sort=relevance) —
   https://www.reddit.com/r/Openfront/search/?q=spawn&restrict_sr=1 — returned ~30+ posts
   on 2026-10-13, including spawn-selection posts and map-opening posts. **Observation:**
   spawn quality is one of the most repeated beginner questions in the subreddit.

## YouTube videos — ≥3 (titles + descriptions verified 2026-10-13)

1. **"What Happens if You Get an OP Spawn? | OpenFront.io"** — Enzo Plays —
   https://www.youtube.com/watch?v=aaCW7Ftv5N4 (16 min). Frames the opening around spawn
   luck and how to capitalize or escape.
2. **"I have found the Ultimate Spawn Strategies | OpenFront.io"** — TheBiff —
   https://www.youtube.com/watch?v=S9Uipx_RRpU (23 min). A strategy-focused spawn video.
3. **"What Happens When You Get the Best Spawn on the Map? | OpenFront.io"** — Enzo Plays —
   https://www.youtube.com/watch?v=f9z64v0QJvU (11 min).
   **Observation:** the creator ecosystem treats the spawn as the highest-leverage early
   decision and builds whole videos on the best/OP case, confirming the player question is
   real and recurring. **Limitation:** caption/timedtext extraction was unreliable this
   session (NOCAPS/0-byte), so the analysis is from titles, durations, and descriptions,
   not transcripts.

## Player question (merged)

Across Reddit and YouTube the same question appears: *how do I know, before the window
closes, whether this spawn is good, and if it isn't, what do I do?* The merged answer this
guide delivers is an evaluation framework (usable land, exits, nearest threat, naval
dependency, contested path), the four failure shapes, the Hard-Nation exception, the
repositioning tool, and mode/map adjustments — all stated against v0.34.24.

## Access notes

- All Reddit content retrieved 2026-10-13 via r/Openfront RSS (`.rss`) and RSS search;
  `.json` endpoints were login-walled this session, so RSS is the verifiable path.
- GitHub `v0.34.24` tag source verified locally in the `OpenFrontIO` clone (git show at
  tag) and release page verified HTTP 200.
- Access date for every source above: 2026-10-13.
