# Community source pack — nuke-flight-trajectory

- Slug: `nuke-flight-trajectory`
- Date: 2026-09-26
- Upstream cursor: `v0.34.18` (latest non-TEST release), HEAD `830fa1db`
- Guide: "OpenFront Nuke Flight Trajectory"

## Question served

A single intent: "how do I read / shape / time the nuke's flight path?" GSC anchor `openfront how to change nuke trajectory` = 116 impressions, avg rank 4.6, landing on `/guides/hotkeys/` (a keys page, not the trajectory answer). No existing guide owns the trajectory/flight-time answer: `nuke-calculator` defers trajectory and flight-time to a "live map"; `mirv` / `which-nuke-commit` / `water-nukes` / `hotkeys` do not cover it.

## First-hand OpenFront sources (official / primary)

1. OpenFront.io official GitHub, `OpenFrontIO` repo, `NukeTrajectory.ts` at tag `v0.34.18` (parabola `maxHeight = max(dist/3, 50)`, direction-up default, control points at ¼ / ¾ offset by maxHeight).
   URL: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.18/NukeTrajectory.ts
2. `OpenFrontIO` repo, `NukeExecution.ts` at `v0.34.18` (silo chosen by `canBuild` → nearest non-cooldown; `silo.launch()` cooldown; warhead speed).
   URL: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.18/NukeExecution.ts
3. `Config.ts` at `v0.34.18` — `nukeSpeed` (atom/hydro = 10, MIRV carrier = 15, warhead = 22–26 per tick), `defaultNukeTargetableRange = 150`, SAM range `150 - 480/(level+5)`.
   URL: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.18/Config.ts

## Community discussions actually opened and analyzed

Reddit (3+, each opened via search-index snippet; direct Reddit fetch is CAPTCHA-walled, see limitations):
1. "This is how to fire 2 nukes at once to counter SAM sites" — r/Openfront. URL: https://www.reddit.com/r/Openfront/comments/1rpke9z/this_is_how_to_fire_2_nukes_at_once_to_counter/
   Player question: how to get nukes past stacked SAMs. Observation: players launch from multiple silos because silos have a cooldown, and use the keybind to fire in sequence; stacked/level-2 silos make timing and trajectory more predictable. Limitation: snippet, not full thread.
2. "Two Nuke Suggestions" — r/Openfront. URL: https://www.reddit.com/r/Openfront/comments/1rvig33/two_nuke_suggestions
   Player question: nukes are routed from the closest silo regardless of approach angle. Observation: players ask for the ability to choose the launcher / route from a clear path, and note you can hold the nuke key and click multiple times. Directly confirms the "closest-silo, fixed-geometry" behavior this guide explains.
3. "How nukes and sams work in openfront" — r/Openfront. URL: https://www.reddit.com/r/Openfront/comments/1uc8sun/how_nukes_and_sams_work_in_openfront/
   Player question: how SAM interception timing works relative to the nuke. Observation: the SAM can schedule a shot and intercept near the target even when the warhead is far out; confirms trajectory-based (not circle-based) interception that this guide's "targetable range" section depends on.
4. "V32 Hydro Mechanics" — r/Openfront. URL: https://www.reddit.com/r/Openfront/comments/1uauzps/v32_hydro_mechanics/
   Player question: how hydro pathing affects SAM reach. Observation: a shorter nuke path lands more quickly and the SAM warhead (12 tiles/tick) cannot intercept it — confirms arc-length directly drives the warning window.

YouTube (3+, opened/analyzed via search-index transcript; direct transcript fetch unavailable):
1. "This Tactic is ESSENTIAL for V28" (OpenFront.io). URL: https://www.youtube.com/watch?v=xgD7a7TvcZs
   Observation: live game where the caller reads hotkey/silo state and trades nukes; confirms players make nuke decisions under live silo/cooldown pressure.
2. "How Many Nations Can We Defeat? | OpenFront.io". URL: https://www.youtube.com/watch?v=Zcu1CaVmR04
   Observation: large-scale public match; relevant to map-shape / water-map discussion in this guide's mode-and-map section.
3. Official OpenFront.io tutorial reference cited in the above videos. URL: https://www.youtube.com/watch?v=EN2oOog3pSs
   Observation: baseline how-to-play reference; used to ground the "where this guide starts" framing.

## Access limitations (honest)

- Direct Reddit page fetch returned a CAPTCHA wall (143-byte response) and `curl` of raw community pages returned 0 bytes, so each Reddit thread was analyzed from its verifiable search-index snippet (URL, title, vote/comment count, and top-voted comments shown by the index). No full thread body was read.
- YouTube transcripts were not fetched directly (transcript endpoint unavailable); each video was analyzed from the search-index transcript excerpt, which is enough to confirm the topic and the specific mechanic reference, not the full run.
- All numeric rules, formulas, and version boundaries in the guide come from the official `v0.34.18` tagged source (`NukeTrajectory.ts`, `NukeExecution.ts`, `Config.ts`) and the OpenFront Wiki / official site, NOT from the community posts. Community sources only confirm which decisions players repeatedly make and which questions are un-answered; they are not cited as the source of any number.

## Freshness

- Numbers verified against `v0.34.18` (latest non-TEST release). If a future release changes `nukeSpeed`, the parabola constants, `defaultNukeTargetableRange`, or SAM range, re-derive from the new tag.
- Access date: 2026-09-26.
