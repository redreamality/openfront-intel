# Community Source Pack — Crown position: survive the MIRV and hold the lead

Topic (working title): **Crown position: survive the MIRV and hold the lead**
Date compiled: 2026-10-05
Game version under review: **OpenFrontIO v0.34.22** (upstream tag `v0.34.22`, published 2026-10-01T22:36:17Z, upstream main commit `4e837520`)
Generated data baseline: project `src/data/_meta.json` (upstreamVersion `v0.34.22`, generated 2026-10-04/05)

## Research intent and player problem

The guide targets a single, repeated community question that no existing main answer owns: **you are the biggest nation (the "crown" position) in a late game, and the fastest way the game ends is someone MIRVing you to stop the snowball — so how do you survive the strike and keep the lead until Overtime / the 80% territory threshold ends the match in your favor?** The question is decision-changing because the crown holder faces a unique, non-symmetric threat: the attacker's MIRV does not need to win a ground war, it only needs to break the leader's army long enough for the leader's share of the map to fall below the win bar. Every Reddit thread and video below feeds that same intent from a different angle (the target's frustration, the attacker's tactic, the "stay just under the crown" counter-strategy, and the Overtime math that the crown holder is racing against).

There is no existing guide in `src/content/guides/` that owns this intent. Verified by search: `winning-overtime` owns the Overtime threshold crossing from a neutral position (defend vs. attack the bar), `doomsday-clock` owns the Doomsday Clock mode rules, `sam-launchers` owns SAM launcher placement and cooldown, `mirv` and `mirv-launch-timing-cold-war` own the *attacker's* MIRV decision, and `ffa-endgame-commit`/`ffa-deterrence-posture` own FFA late-game posture. None of them answers "you are first place and about to be MIRVed; here is the survive-and-hold plan." This guide is the holder-side answer.

## Reddit sources (read in full, via Arctic Shift API)

1. **Openfront — "Need help winning from crown position"** (post `1vwt0q1`, r/Openfront, 2026-08-24)
   - URL: https://www.reddit.com/r/Openfront/comments/1vwt0q1/need_help_winning_from_crown_position/
   - Player problem: a recurring crown holder asks why they keep losing from first place.
   - Observations from comments (read): the top replies converge on one diagnosis — the crown holder is being **MIRVed as a tactic** to stop their snowball ("it is a valid tactic to MIRV someone who has crown when MIRV is still affordable to prevent them from snowballing"). Counter-strategies named by players: (a) **do not take the crown** — hold a slightly smaller region with higher pop and economy so you are "essentially untouchable" and have "an anti-mirv setup"; (b) if you already have ~half the board, you can **survive the MIRV** by using **Defense Posts + Hydro** to refill after the strike; (c) **watch the enemy gold count** (sort the leaderboard by gold) and if someone is about to be able to afford the MIRV, **launch your own MIRV first**; (d) several winners describe winning as the **"grey man"** around 4th/5th place, then surging cities so that "when the crown gets a MIRV I can show up." One player notes the top-tier players who *do* get the crown hold it to the end — so it is possible to keep it, but only with a plan.
   - Limitations: anecdotal, no numbers in-thread; the "survive with Defense Posts + Hydro" claim is the load-bearing one and is what this guide verifies against source.

2. **Openfront — "CROWN IS THE ENEMY"** (post `1ww3kbs`, r/Openfront, 2026-10-02)
   - URL: https://www.reddit.com/r/Openfront/comments/1ww3kbs/crown_is_the_enemy/
   - Player problem: a community thread built entirely around the observation that being first is a liability.
   - Observations (read): the thread title itself is the thesis — the crown is a target. Comments reinforce that mid-game the leader "usually get[s] cut down," and that the win rate of the persistent first-place player is lower than the win rate of a strong-but-not-first "grey man." This is the strongest single confirmation that the guide's premise (the crown is the most dangerous position to hold in a late game) is a real, felt community pattern rather than an invented one.
   - Limitations: opinion thread; no mechanic detail; used as thematic corroboration, not as a rules source.

3. **Openfront — "How do I win the late game?"** (post `1wojrbn`, r/Openfront, 2026-09-23)
   - URL: https://www.reddit.com/r/Openfront/comments/1wojrbn/how_do_i_win_the_late_game/
   - Player problem: general late-game win condition.
   - Observations (read): the thread separates the two late-game win paths — crossing the territory threshold (Overtime / 80%) and eliminating a rival — and shows players confusing "being big" with "being able to hold it." Several comments tie the late-game win to **holding a territory share that the opponents cannot push you below**, which is exactly the crown-holder's hold problem restated.
   - Limitations: broad thread; used to anchor the "hold the lead = hold a territory share above the win bar" framing.

4. **Openfront — "Can anyone explain this ending speed?"** (post `1wmxe2v`, r/Openfront, 2026-09-22)
   - URL: https://www.reddit.com/r/Openfront/comments/1wmxe2v/can_anyone_explain_this_ending_speed/
   - Player problem: a match ends unusually fast from the crown position.
   - Observations (read): the thread is about a leader whose match ended abruptly once they were struck and their share dropped below the threshold — community members explain the **Overtime bar mechanic** (the win percentage starts high and falls over time until the leader must cross it) as the reason the ending was fast. This is the holder-side view of the same Overtime math that `winning-overtime` covers from the neutral view.
   - Limitations: single-match post; used for the Overtime-threshold narrative and its holder-side implications.

5. **Openfront — "Why do people randomly hydro from across the map?"** (post `1w5fcj6`, r/Openfront, 2026-09-02)
   - URL: https://www.reddit.com/r/Openfront/comments/1w5fcj6/why_do_people_randomly_hydro_from_across_the_map/
   - Player problem: long-range nuke harassment of a distant leader.
   - Observations (read): comments confirm that **Hydrogen bombs are used to chip the biggest target from across the map**, and that a crown holder takes repeated long-range strikes rather than one clean ground battle. This matters to the guide because the crown holder's defense budget must absorb **sustained long-range nuke pressure**, not just a single MIRV.
   - Limitations: about Hydro, not MIRV; used as the "sustained pressure" input to the defense-budget section.

(All Reddit content was retrieved and analyzed via the Arctic Shift archive API — `arctic-shift.photon-reddit.com` — on 2026-10-05, because Reddit blocks direct scraping; the canonical reddit.com URLs above are the stable, human-readable links to the same threads.)

## YouTube sources (transcripts retrieved and analyzed via yt-dlp auto-captions)

1. **"MELTS Crowns"** (video `Wb-oPRxlAKA`)
   - URL: https://www.youtube.com/watch?v=Wb-oPRxlAKA
   - Angle used: the **attacker's** strategy for taking the crown by annexation — what the crown holder must not do. The 6,300-word transcript walks the annexation/enclosure sequence that removes a leader, confirming the holder's core failure mode: letting a neighbor close a pocket around the core. Used as the counter-play the holder must avoid and the reason the core must stay compact.
   - Limitations: attacker-perspective; no defense numbers; used to define the threat the defense answers.

2. **OpenFront v27 guide (late-game defense walkthrough)** (video `iZQDOuTVcLY`)
   - URL: https://www.youtube.com/watch?v=iZQDOuTVcLY
   - Angle used: a 16,500-word transcript covering **late-game defense, SAM placement, and nuke defense**. Confirms the community's canonical defense stack (SAM launcher coverage of the core, layered defense posts, economy buffer) and the tempo at which a leader should rebuild after a strike.
   - Limitations: predates v0.34.22 (a v27-era video), so all numbers are re-verified against the v0.34.22 source before being used; used for the defensive structure, not for version-specific numbers.

3. **"Defensemaxxing" (OpenFront defense walkthrough)** (video `JhfNn-VdYt8`)
   - URL: https://www.youtube.com/watch?v=JhfNn-VdYt8
   - Angle used: a 9,100-word transcript on **maximizing a defensive position** — SAM coverage, defense-post density, and holding a border while the economy refills the army. The most direct community treatment of "how a big player defends," and it matches the source-verified mechanics (SAM launcher range scaling, defense-post mag/speed bonus).
   - Limitations: strategy video, no source-cited numbers; cross-checked against `Config.ts` and generated `units.json` before any figure appears in the guide.

## Official first-party sources (rules, numbers, version boundary)

1. **OpenFrontIO release v0.34.22** (official, first-party)
   - URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.22
   - Used as the version boundary and for release-note facts (MIRV/SAM/nuke/Overtime behavior in the current build). Published 2026-10-01T22:36:17Z; body ~31,300 characters.
2. **OpenFrontIO source at tag `v0.34.22`** (official, first-party, read from the upstream clone)
   - `src/core/execution/MIRVExecution.ts`: `warheadCount = 350`; the MIRV spawns up to 350 warheads (`stagedTargets.length >= this.warheadCount`).
   - `src/core/execution/SAMMissileExecution.ts`: the MIRV **carrier** "can't be intercepted, only its warheads" — SAMs can only engage the individual warheads, not the launching MIRV.
   - `src/core/execution/nation/NationMIRVBehavior.ts`: `MIRV_COOLDOWN_TICKS = 300` (30 s between a nation's MIRVs); AI leader-targeting uses victory-denial / steamroll thresholds.
   - `src/core/configuration/Config.ts`: `PERCENT_TILES_OWNED_TO_WIN = 80`; `OVERTIME_DEFAULTS = { enabled:false, startMinutes:30, dropPercentPerMinute:2 }` (after 30 min the win bar falls 2 percentage points/minute, no floor); `DOOMSDAY_CLOCK_DEFAULTS` (rot death at 150 s); `traitorDuration() = 30 s`, `traitorDefenseDebuff() = 0.5`, `traitorSpeedDebuff() = 0.8` (a betrayal halves defense and 20% speed for 30 s).
   - Generated data `src/data/units.json` (v34): SAM Launcher `cost=1,500,000`, `build 300 ticks`, cooldown 90 ticks, range scales 70→150 tiles by level; "v33 treats in-flight MIRV warheads as normal SAM targets"; SAM Missile free, gated by cooldown, default speed 12 tiles/tick; Defense Post `cost=50,000`, `build 50 ticks`, defense zone mag ×5, speed ×3.
3. **OpenFrontIO upstream main** (official, first-party)
   - Clone HEAD / tag: `v0.34.22`, commit `4e837520`; verified `git describe --tags` → `v0.34.22`.

## Verified game facts used by the guide (v0.34.22)

- The **crown** is a cosmetic on the #1 player of the troops leaderboard (`LeaderboardModal.ts`, `WebGLFrameBuilder.ts`) — it marks the player everyone targets.
- A **MIRV** launches **350 warheads**; the carrier cannot be SAMmed, only the individual warheads can. SAM Launcher cost **1,500,000** gold, 300-tick build, 90-tick cooldown, range 70→150 tiles; SAM Missile free, 12 tiles/tick.
- **Overtime**: win requires **80%** of tiles; after **30 minutes** the required bar drops **2 points/minute** with no floor, so the crown holder is racing a falling bar.
- **Betrayal / traitor**: attacking an ally makes you a traitor for **30 s** with defense **×0.5** and speed **×0.8**.
- **Doomsday Clock** (mode): territory rots away, rot death at **150 s** after the skull.
- A **Hydro** from across the map is used to chip the leader; the crown holder faces sustained long-range nuke pressure.

## Decision-changing outcome the guide must produce

The guide must let a crown holder (1) read whether they can survive a MIRV given their army size, defense posts, and SAM coverage; (2) choose between **hold the crown** and **drop to just-below-crown ("grey man")** based on a concrete threshold; (3) place a defensible core that absorbs the 350-warhead burst plus follow-up long-range nukes; and (4) time their Overtime crossing against the falling bar. Each section carries a number or a clear situation, so the reader can act on it in a live match.
