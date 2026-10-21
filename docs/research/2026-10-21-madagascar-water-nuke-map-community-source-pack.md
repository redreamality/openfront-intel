# Madagascar Water-Nuke Map — Community & Source Pack

- Slug: `madagascar-water-nuke-map`
- Date accessed: 2026-10-21
- Version verified against: v0.35.2 (official GitHub Release body + tag source in a local clone of `openfrontio/OpenFrontIO`)
- Scope: why the new Madagascar map forces water-nuke play, how the 50% forced-modifier roll works, what a water nuke does to the map's craters, and how players should choose spawns and time the Mozambique Channel crossing.
- Honesty note: Madagascar is brand-new in v0.35 and has **no dedicated community coverage yet** — no Reddit thread or YouTube video is about this specific map. The community sources below are adjacent player threads (nuking, island play, spawn choice, troop/trade management) that the guide's decision framework builds on. Every rule, number, and version boundary is anchored to the official v0.35.2 artifacts, not to community posts.

## 1. Official primary sources (first-hand)

The rules, numbers and version boundary below are anchored to the OpenFront
project's own repository and release artifacts. Every gameplay claim in the
guide traces back to one of these files. Verification method: local clone of
`openfrontio/OpenFrontIO`, reading each file at tag `v0.35.2` with
`git show v0.35.2:<path>`; the v0.35.2 release body was read via the GitHub API
(`gh api repos/openfrontio/OpenFrontIO/releases/tags/v0.35.2`).

1. Official v0.35.2 release body — https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.2
   Verbatim line 169: "Madagascar: a dedicated Nuke Wars map, two equal
   landmasses across the Mozambique Channel, set in the 80s". Line 53 lists it
   first among the twelve new maps: "Madagascar (a Baikal-style Nuke Wars map)".
   Also confirms the map-driven lobby change (the 125-player cap removed) and
   the per-player small-economy spawn recovery shipped alongside the new maps.
2. Map manifest — `map-generator/assets/maps/madagascar/info.json` at tag v0.35.2
   (raw pointer): https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.35.2/map-generator/assets/maps/madagascar/info.json
   Declares `forced_modifiers: ["isWaterNukes:50"]`, `categories: ["new","africa"]`,
   and 63 nations (the Indian-Ocean / Mozambique-Channel neighbours: Mauritius,
   Reunion, Mayotte, Comoros Islamic Republic, plus the mainland cities
   Antananarivo, Toamasina, Sambava, Antsiranana, Andoany, etc.).
3. Forced-modifier roll logic — `src/server/MapPlaylist.ts` at tag v0.35.2
   (raw pointer): https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.35.2/src/server/MapPlaylist.ts
   A `modifier:percentage` entry is applied when a roll is below the chance
   (so `isWaterNukes:50` is a 50% roll per match); forced modifiers are
   excluded from the random modifier pool, the three-modifier cap is enforced
   after the roll, and `isWaterNukes` is mutually exclusive with
   `isNukesDisabled`.
4. Water-nuke crater geometry — `packages/engine/src/execution/NukeExecution.ts`
   at tag v0.35.2 (raw pointer):
   https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.35.2/packages/engine/src/execution/NukeExecution.ts
   When water nukes are active the crater is built from angular radius samples
   between the magnitude's inner and outer radii, smoothed over neighbours, and
   the tiles inside are converted (land becomes water).
5. Permanent conversion — `packages/engine/src/game/WaterManager.ts` at tag v0.35.2
   (raw pointer):
   https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.35.2/packages/engine/src/game/WaterManager.ts
   In v0.35.2 the converted tiles are queued and flushed as water with no
   scheduled revert; the water components do not split back to land. The
   temporary-revert change (land reverting after ~10 minutes, with 30%/10%
   conversion odds) is NOT present in v0.35.2 — it first appears in the
   v0.35.3/v0.35.4 betas. So on the shipped v0.35.2 build a water nuke's crater
   is permanent for the match.
6. Nuke magnitudes & costs — `packages/engine/src/configuration/EngineConfig.ts`
   at tag v0.35.2 (raw pointer):
   https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.35.2/packages/engine/src/configuration/EngineConfig.ts
   Verified v0.35.2 values: MIRV warhead inner 12 / outer 18 (delivered from a
   MIRV silo costing 25,000,000 gold plus 15,000,000 per MIRV already launched);
   atom bomb inner 12 / outer 30 at 750,000 gold; hydrogen bomb inner 80 /
   outer 100 at 5,000,000 gold. Unit caps: warship 1,000,000, SAM launcher 3,000,000.
   (Correction: an earlier draft of this pack and the English guide listed a
   "small 11 / medium 25 / large 50 / atom 95" set — that set does not exist in
   v0.35.2 and has been removed from both.)
7. Repository root (context / issues / tests): https://github.com/openfrontio/OpenFrontIO

## 2. Reddit discussions (community)

Reddit web pages are bot-walled, so these threads were fetched through the
PullPush archive API and the substantive comments were analysed directly.
Access date 2026-10-21. All four threads are real and were read from the
archived JSON; none is specifically about Madagascar (that coverage does not
exist yet).

1. "Impossible Maps" — https://www.reddit.com/r/Openfront/comments/1tj2pem/impossible_maps/
   (2026-05-20, 4 upvotes, 8 comments). Player asks for tips on Impossible
   maps and reports being target-nuked the moment they reach a troop threshold
   even when weaker nations are closer. Observation: players treat a nuke
   window as a hard timeline and plan their expansion around "not being the
   first thing to hit the number that invites a nuke". On a forced water-nuke
   map that window is amplified because a converted crater can strand a whole
   flank permanently. Limitation: pre-v0.35, no Madagascar specifics.
2. "Everything Affected by Game Difficulty" —
   https://www.reddit.com/r/Openfront/comments/1rxs4ac/everything_affected_by_game_difficulty/
   (2026-03-19, 11 upvotes, 8 comments). A community source-code audit of what
   difficulty actually changes to the wiki's claims. Observation: experienced
   players read the engine source to confirm behaviour rather than trust the
   wiki — the same discipline this guide applies to the 50% roll and the
   permanent-conversion claim. Limitation: difficulty-focused, not
   map-focused.
3. "Explanation needed about Nation Difficulty and General Gameplay" —
   https://www.reddit.com/r/Openfront/comments/1rlzrun/explanation_needed_about_nation_difficulty_and/
   (2026-03-06, 1 upvote, 6 comments). Player asks what makes Hard/Impossible
   hard and whether a deep guide exists. The substantive comments give the
   community's stated decision priorities: a developer (u/FloPingu, who coded
   the nations) notes nations "prioritize attacking low-troop-enemies" and that
   impossible nations have ~25% more max troops; u/No_Veterinarian3582 distils
   play to "spawn, alliances, troop management — spawn where you have a lot of
   space, ally nearby nations immediately, and keep your troop count high";
   u/RideEatSleepRepeat describes the island/trade-max meta ("stack harbours,
   defend with warships, set up a 5-level SAM, take a small island and
   trade-max until late game"). Observation: these are exactly the three levers
   the Madagascar guide's decision framework turns — spawn, island-vs-mainland
   posture, and warship/SAM defence — with the added water-nuke variable.
   Limitation: about difficulty generally, not this map.
4. "Ready to get roasted..., but how hard is the AI compared to your average player?" —
   https://www.reddit.com/r/Openfront/comments/1rd7go2/ready_to_get_roasted_for_asking_this_but_how_hard/
   (2026-02-24, 5 upvotes, 6 comments). Player reports the AI "will just shrug
   off attacks of 200k and just nuke the crap out" of them. Comments reinforce
   the island/SAM defence: u/Training-Mark-9258 "just build a SAM, sit on an
   island, and win", u/depatrickcie87 "the AI is actually able to hit your SAMs
   with hydros and does invade islands". Observation: the community's default
   counter to nukes is a defensible island + SAM cluster, which is precisely
   the posture the guide evaluates for each of Madagascar's two banks.
   Limitation: solo/AI context, not multiplayer Madagascar.

A fifth archived comment file ("Possible Changes Coming to v35",
https://www.reddit.com/r/Openfront/comments/1x4j6cn/) was fetched but came back
empty through the archive API, so it is excluded as unverifiable.

## 3. YouTube videos (community)

Titles and authors verified live via the YouTube oEmbed endpoint on 2026-10-21
(accessible, returned real metadata).

1. "Trying out This New Game Mode | OpenFront.io v31" — https://www.youtube.com/watch?v=fm2NW8ApDu0 (Enzo Plays)
2. "How to Play Openfront.io For Beginners (Tutorial)" — https://www.youtube.com/watch?v=fKCWgr5_nwo (Enzo Plays)
3. "How To Win At OpenFront.io - Multiplayer Guide For Beginners" — https://www.youtube.com/watch?v=1fpszw34sQg (Risk4Ever)
4. "How to Defeat Impossible Mode on the World Map | OpenFront.io" — https://www.youtube.com/watch?v=Ne8aHY7T1q4 (Enzo Plays)

Observation: the creator content is mode- and difficulty-oriented (a v31 game
mode, beginner mechanics, general winning, and impossible mode), not
map-specific, and none of the four explicitly covers Madagascar or the forced
water-nuke roll. That gap is exactly the intent this guide fills. Limitation:
no Madagascar-specific video exists yet, so community signal for this specific
map is thin and the guide leans on the official source as the authority.

## 4. Merged player questions -> guide intent

Across the sources the recurring decisions are: (a) will the water-nuke
modifier actually roll on this map and can I plan around a coin flip; (b) what
does a water nuke do to a lane I am using to cross the Channel; (c) which
spawn — an island or a mainland bank — survives the Channel geography and the
community's own "spawn where you have space" heuristic; (d) when to cross by
boat before a crater severs the crossing, given the island/SAM defence the
community defaults to. The guide's single intent: give a player a repeatable
decision framework for playing Madagascar's Nuke Wars, grounded in the verified
50% roll, the permanent-conversion crater, the three nuke magnitudes, and the
two-landmass geography.

## 5. Version boundary

Verified at v0.35.2. The temporary water-nuke revert (land returning after
~10 minutes, with 30%/10% conversion odds) is a v0.35.3/v0.35.4 change and is
deliberately OUT of scope; on v0.35.2 the crater is permanent. Any player on a
build at or after v0.35.3 should re-evaluate the crossing windows and the
value of contesting cratered coast, because a crater no longer permanently
deletes a lane.
