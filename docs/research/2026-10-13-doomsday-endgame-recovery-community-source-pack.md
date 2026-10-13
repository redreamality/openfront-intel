# Community source pack — doomsday-endguide-recovery

Date: 2026-10-13. Slug: `doomsday-endgame-recovery`. Topic (single intent): the attacker-side / marked-challenger
Doomsday endgame — how the side below the rising land-share bar breaks a fortified opponent and forces elimination
inside the 30s→150s rot window without itself being pinned below the bar.

Method note: Reddit and YouTube direct-page fetches are bot-walled on this host (HTTP 403 / "Blocked" pages). The
community layer below is therefore built from search-index retrievals that expose each thread's title, URL and
verbatim snippet (a verifiable access layer), plus full transcripts for the four cited YouTube videos. All rules,
numbers and version boundaries are re-verified against the authoritative `openfrontio/OpenFrontIO` tag `v0.34.24`
source (`git show v0.34.24:<path>`) and the repo's generated `src/data` files, not against community claims.

## Official primary sources (1 required; more listed)

1. `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/configuration/Config.ts` — primary.
   `DOOMSDAY_CLOCK_DEFAULTS` (lines 216–244): `warnSeconds: 30`, `drainStartPercent: 2`, `drainMaxPercent: 5`,
   `drainRampSeconds: 90`, `drainFloorPercent: 5`, `floorStartPercent: 40`, `floorDecaySeconds: 90`,
   `rotDeathSeconds: 150`; `SAMCooldown(): 90`, `SiloCooldown(): 90`, `defaultSamRange(): 70`,
   `maxSamRange(): 150`, `samRange(level) = 150 - 480/(level+5)`, `samUpgradeDuration = SAMCooldown/2 = 45`;
   nuke costs `Atom 750_000`, `Hydrogen 5_000_000`, `MIRV 25_000_000 + 15_000_000 × prior launches` (4th launch = 190M),
   `MissileSilo 1_000_000`; `maxTroops(player)` sublinear (≈100k at one tile), AI multipliers 0.33–1.25.
2. `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/game/DoomsdayClock.ts` — primary.
   Wave/bar ladder: `LEVELS = [200,400,700,1100,1700,2500,3500]` basis points = 2/4/7/11/17/25/35%;
   `LEVELS_TEAM = [300,600,1000,1500,2100,2800,3500]` = 3/6/10/15/21/28/35%; `graceSeconds: 600`; four speed presets
   with final bars at 35:00 (normal, 168s ramps/54s pauses), 45:00 (slow, 240/70), 25:00 (fast, 102/31) and 15:00
   (turbo, 36/8). Comments: bar tuned from 85 tournament games (runner-up end share never exceeded 21.6%).
3. `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/MIRVExecution.ts` — primary.
   `warheadCount = 350`; warheads spawn in a burst ≤10 ticks before impact; each staged warhead capped at
   `warheadCount`.
4. `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.24` — latest non-TEST release (2026-10).
   Upstream `main` is 168 commits ahead of the tag at research time.

## Reddit threads (r/Openfront) — accessed via search-index snippets on 2026-10-13

1. `https://www.reddit.com/r/Openfront/comments/1p0hv53/how_to_survive_a_mirv/` — "How to Survive a MIRV"
   (≈1y old). Player question: how to survive a MIRV when you are the target. Key observation (verbatim snippet):
   "Won a game because we all went nuclear on each other, but I had over 70 SAMs and was left with over 500k troops"
   — a large SAM count converts a MIRV into a survivable, partially-leaked event rather than elimination.
   Limitation: survivor's-account; no build math. Access date 2026-10-13.
2. `https://www.reddit.com/r/Openfront/comments/1uyt479/doomsday_clock_gameplay/` — "Doomsday clock gameplay?"
   (recent). Player question: what does the "battle royale zone" actually do? Key observations: top-voted answers
   describe it wrongly as a shrinking circle ("If you fall below the required % of land owned, you have only a short
   time before your troops are dwindled down to 5% of max cap and all your warships become 1 hit") and as
   "basically guaranteed to be eliminated." This is exactly the misconception the guide corrects: the drain floors at
   5% and a side that climbs back over the bar stops bleeding; rot (150s) is the finisher, not the drain.
   Limitation: community interpretation, several answers contradict each other. Access date 2026-10-13.
3. `https://www.reddit.com/r/Openfront/comments/1lpvn6z/stacking_sams_is_a_mistake/` — "Stacking SAMs is a mistake"
   (recent). Player question: is a dense SAM ring worth its gold? Key observations (verbatim snippets): "100% chance
   to intercept Atomic Bombs · 80% chance to intercept Hydrogen Bombs · 50% change to intercept MIRV Warhead";
   "Sams are realy weak under mirv, unless you stack them on a island, but island sams are weak facing simple 5M
   missiles." This is the per-warhead interception model the guide's leaked-warhead framing rests on, and the reason
   a fortified island is only partially MIRV-proof. Limitation: community-stated percentages; the per-warhead 50% is
   directionally consistent with the `warheadCount = 350` staged-burst model but the exact probability is not
   re-verified in this pass. Access date 2026-10-13.
4. `https://www.reddit.com/r/Openfront/comments/1ri6noi/how_are_you_supposed_to_recover_from_a_mirv/` —
   "How are you supposed to recover from a MIRV?" (≈1y old). Player question: can you come back after a MIRV at all.
   Sentiment is split between "MIRVs should be removed" and counter-strategies (keep enough gold for a counter-MIRV,
   ally/eliminate the launcher). Useful as the demand-side signal that a recovery path is the gap players feel.
   Access date 2026-10-13.
5. `https://www.reddit.com/r/Openfront/comments/1ud6jy8/mirvs_are_too_op_and_boring_get_them_gone/` —
   "MIRVS ARE TOO OP AND BORING GET THEM GONE!" (recent). Player question: do endgame nukes make late games drag?
   Observation: "Games would just regularly drag on for an hour plus... Most open front games have overstayed their
   welcome by 40 minutes." Context for why the Doomsday clock's rising bar and 150s rot deadline exist as anti-stall.
   Access date 2026-10-13.

## YouTube videos (transcripts retrieved and analyzed) — accessed 2026-10-13

1. `https://www.youtube.com/watch?v=F5AYX-f_GI4` — "Building the NEXT GEN DOOMSDAY FORTRESS" (Doomsday-mode build).
   Question the video answers: how to build a fortress that survives Doomsday pressure. Observations from the
   transcript: layered defense of missile silos + SAMs around a bunker-bust core; SAMs placed to cover the frontier
   the bar forces open; the fortress's value is that it survives the drain's floor, not that it stops a MIRV.
   Limitation: build showcase, no stated win condition vs a MIRV.
2. `https://www.youtube.com/watch?v=gELep7-LFG4` — "OPTIMAL BUILD STRATEGY" (endgame economy). Question: when do
   MIRVs stop being affordable? Transcript observations: explicit endgame MIRV price ladder "…the price would get up
   to 70 million… quadruple MIRV… 190 million" (matching the source formula 25M + 15M×prior = 190M on the 4th
   launch), "74 SAMs", and "100% SAM coverage" as the defensive end-state. This transcript independently corroborates
   the source cost model. Limitation: commentary, numbers approximate.
3. `https://www.youtube.com/watch?v=vl_DSKzDodw` — "How to throw a certain victory" (endgame push). Question: how
   does a strong side force the endgame? Transcript observations: "stacking SAMs", "119 Sams", stacking ports/cities
   for income, then a concentrated push. Supports the guide's attacker framing that a fortified, high-income side is
   what the marked challenger must break. Limitation: winner's retrospective.
4. `https://www.youtube.com/watch?v=oOPm1TJULSY` — "The Key to Endgames in OpenFront.io". Question: what decides
   the endgame? Transcript observations: endgame is push + annexation of border tiles; the side with the higher
   maxTroops and cleaner frontier wins territory races. Supports the guide's "buy a few tiles above the bar"
   threshold-purchase move. Limitation: general advice, mode-agnostic.

## Research findings (synthesis, ≥600 words)

The Doomsday clock is an anti-stall mechanism, not a battle-royale circle, and the community is confused about that
distinction. Release-note language ("battle royale style zone gameplay", "a doom zone closes in and drains troops and
warships") reads like a shrinking safe-zone, and the top community answers in `1uyt479` describe exactly that: a
circle that squeezes, below which you "start losing population (basically guaranteed to be eliminated)." The source
disproves this reading. In `DoomsdayClock.ts` the required share of the map rises in seven waves — 2/4/7/11/17/25/35%
on a 10:00 grace — chosen by the speed preset (final bar at 35:00/45:00/25:00/15:00). A side caught below the bar gets
a `warnSeconds` 30s flashing cooldown, then its troops bleed down, but only to a floor: the drain starts at 2%/s,
ramps linearly over 90s to 5%/s, and the cap itself decays from 40% of max toward a 5% floor over another 90s. The
drain stops the instant the side climbs back over the bar. So the clock's true threat model is: squeeze territory so
that the doomed side becomes easy to conquer, and hand the enemy a 150s window in which the doomed side's territory
rots to nothing (`rotDeathSeconds: 150` is a deadline measured from the skull, not a rate). The floor, not the drain,
is the comeback window: at ~5% of a sublinear maxTroops (≈100k on a single tile, so ~4–5k troops) a player still has
a usable strike force.

That reframing changes the attacker's endgame decision in two ways. First, the marked challenger does not have to
eliminate the leader to win — it has to (a) not fall below the rising bar itself and (b) break the leader's fortress
hard enough that the leader cannot hold a share above the bar. The community's "recover from a MIRV" threads
(`1ri6noi`, `1p0hv53`) show the leader's end-state is a dense SAM ring: one player reported surviving with "over 70
SAMs and over 500k troops." Against that, the per-warhead interception model (100% atomic, 80% hydrogen, ~50% per
MIRV warhead, per `1lpvn6z`) means a MIRV is not a clean kill on a fortified island — 350 staged warheads leak a
fraction through, which is both the leader's hope and the challenger's opening. The `gELep7-LFG4` transcript
("74 SAMs", "100% SAM coverage", the 70M→190M MIRV ladder) shows that reaching that coverage is expensive, so the
leader is often one MIRV short of "100% coverage" and the challenger can exploit the gap by forcing the leader to
spend its last reserve on a SAM ring instead of a MIRV.

Second, the 150s rot deadline is the challenger's real clock, not the leader's. A side that holds the bar above the
leader and keeps the leader's territory rotting wins even without a MIRV — the leader is eliminated at 150s whatever
it holds. The endgame videos (`oOPm1TJULSY`, `vl_DSKzDodw`) converge on the same practical move: win the territory
race on the frontier (annexation, clean borders, higher maxTroops) rather than trading nukes. The `doomsday-endgame-
recovery` guide turns this into three branches — threshold-purchase (buy a few tiles above the bar so the clock stops
marking you), the 30s→150s rot-window strike (hit while the leader is at the 5% floor and its SAM ring is re-arming),
and the counter-MIRV denial (keep enough gold that the leader cannot buy 100% coverage) — with two fully worked
scenarios carrying explicit numbers, a failure-and-counterplay table, and mode/map adjustments. This is a single,
verifiable intent that no existing guide owns: `crown-position-mirv-defense` is the leader's view, `doomsday-clock`
is the mechanics table, and `post-mirv-recovery` is the post-strike rebuild; the marked challenger breaking a
fortress below the bar is the gap.

Limitations and honest access notes: all community numbers are from search-index snippets and video transcripts, not
live thread bodies (direct fetch is bot-walled); the 50% per-warhead MIRV interception is community-stated and not
re-derived from source in this pass (the `warheadCount = 350` staged-burst model is source-verified, but the exact
interception probability per warhead was not located); `maxTroops` is sublinear in territory and the "≈100k at one
tile" / "≈4–5k at the 5% floor" figures are the source's own comments, not measurements. All hard numbers in the
guide (30s warn, 40→5% floor over 90s, 150s rot, 2/4/7/11/17/25/35% ladder, 90-tick SAM cooldown / 45s upgrade /
70→150 range, 25M+15M MIRV cost / 350 warheads) are re-verified against tag `v0.34.24`.
