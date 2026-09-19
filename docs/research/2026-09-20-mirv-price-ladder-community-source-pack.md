# MIRV price ladder — community source pack

Topic: **When does the OpenFront MIRV price ladder make you commit to a late-game strike versus save your Gold and win another way?**

Access date: 2026-09-20. All rules/numbers below were re-verified against the tagged
`openfrontio/OpenFrontIO` source (v0.34.11 and earlier tags), not from community claims.
Community sources are used for the *player question* and the *stale belief* that the ladder
corrects, never for the rule itself.

## Player question this pack answers

Players who read the shipped MIRV guide (or older beta-era threads) expect every MIRV to cost a
fixed 25M with a 60-second global launch lockout. In the current live game that is no longer the
rule: the price rises every time anyone launches a MIRV this game, and there is no global
cooldown. The decision this pack drives is the late-game one — at the 3rd, 4th, or 5th rung of
the ladder, is the strike still worth the escalating Gold, or should you spend that Gold on a
troop push / Overtime / Doomsday route instead.

## Community sources (observed)

### Reddit

1. `https://www.reddit.com/r/OpenFront/comments/1uu4imt/` — late-game FFA strategy thread.
   Players describe "we're both sitting on nukes and nobody moves" stalemates in FFA endgames and
   ask when to break it. Observed question: when does holding your nuclear option become a
   dead end? Limit: anecdotal, no version cited, pre-v0.34 ladder wording mixed in.
2. `https://www.reddit.com/r/OpenFront/comments/1wchltw/` — "why is my second nuke more expensive
   than my first" style confusion. Multiple commenters assume a flat price and are surprised the
   menu shows a higher number. Observed question: is the price bug or intentional? Limit: commenters
   do not cite the config, and a few still cite the reverted 60-second cooldown.
3. `https://www.reddit.com/r/OpenFront/comments/1vo2uqo/` — deterrent / "who blinks first" thread.
   Frames MIRVs as a mutual-deterrent that can lock a game. Observed question: how do you turn a
   deterrent into a decision without dumping 80M+ on a warhead cloud that SAMs eat? Limit: no
   numbers, no version.
4. `https://www.reddit.com/r/OpenFront/comments/1l0yh89/` — MIRV build timing thread. Players
   budget "three MIRVs = 75M" from the flat-price assumption and are caught out when the 3rd costs
   more. Observed question: what is the real total budget for a planned MIRV salvo. Limit: the
   75M figure is the stale flat-price math, not the current ladder.
5. `https://www.reddit.com/r/OpenFront/comments/1p9ch79/` — endgame "save or spend" discussion.
   Contrasts saving the last big nuke as insurance versus spending it to force a threshold cross.
   Observed question: does the escalating price make the *last* nuke too expensive to be a deterrent
   at all? Limit: speculative, no source pack.

### YouTube

1. `https://www.youtube.com/watch?v=OhsWefrclk4` — OpenFront endgame/MIRV strategy video.
   Transcript cached to `C:\Users\Remy\.codex\automations\openfront\cache\OhsWefrclk4.en.vtt`.
   Narration walks through a late FFA where the two leaders trade nukes and the game stalls; the
   creator describes committing a "big last nuke" to force a win. Observed question: when the
   deterrent stalls, is the all-in strike the winning move? Limit: no config citation, beta-era
   flat-price framing.
2. `https://www.youtube.com/watch?v=EdcdsayA_ac` — MIRV vs SAM explanation. Covers the carrier and
   separated warheads and the per-warhead SAM interception model. Useful for the defense section.
   Limit: does not discuss the price ladder.
3. `https://www.youtube.com/watch?v=sotJMCOIwhk` — nuclear endgame walkthrough. Shows a player
   choosing between a MIRV and a ground push to finish a stalemate. Observed question: when the
   nuke is the expensive option, when does the troop push win instead? Limit: no version, no cost
   numbers.
4. `https://www.youtube.com/watch?v=EN2oOog3pSs` — OpenFront strategy talk covering nuke deterrence
   and when to break a standoff. Observed question: how to convert a deterrent standoff into a
   concrete decision. Limit: general, no ladder specifics.

## Official first-party sources (rules/numbers verified here)

- Release notes, `openfrontio/OpenFrontIO` v0.34.0 (stable): https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.0
  — lists the MIRV rework items (normalized warhead speed, removed map-edge benefit, blocked
  launches right after an alliance, cancel in-flight MIRVs on alliance). Confirms the v0.34 line is
  the current player-facing release boundary.
- Tagged source, `Config.ts` at v0.34.11 (cached `Config.v3411.ts`): MIRV cost is
  `25_000_000n + game.stats().numMirvsLaunched() * 15_000_000n` (0 for infinite-gold test players).
  This is the live rule.
- Tagged source, `Config.ts` at v0.34.0-beta1: MIRV cost is a flat `25_000_000` wrapper — the
  **experiment** that the shipped `mirv.mdx` documents. It was reverted; v0.34.0 stable and every
  release through v0.34.11 use the ladder.
- Tagged source, `Config.ts` at v0.33.9 and v0.33.14: the same `25M + 15M×N` ladder. So the ladder
  predates v0.34.
- Tagged source, `StatsImpl.ts` at v0.34.11: `_numMirvLaunched` is a single global counter
  incremented in `bombLaunch` when `type === UnitType.MIRV`. It is game-wide (all players share it)
  and increments when a MIRV **spawns/launches**, not when it lands.
- Tagged source, `Config.ts` at v0.34.11: `SiloCooldown()` is 90 ticks per silo slot; MIRV carrier
  speed 15, warhead speed 22 (`nukeSpeed`). There is **no global 60-second launch cooldown** in the
  v0.34.x line — that block existed only in the reverted beta1 experiment.

## Verified rule summary (authoritative for the guide)

- Cost of the (N+1)th MIRV this game = `25,000,000 + N × 15,000,000` Gold, where N = total MIRVs
  already launched this game by any player.
- Rung table: 1st = 25M, 2nd = 40M, 3rd = 55M, 4th = 70M, 5th = 85M. Cumulative for the first k:
  k=1 → 25M, k=2 → 65M, k=3 → 120M, k=4 → 190M, k=5 → 275M.
- The counter is global: an opponent's MIRV raises your next price too.
- The price rises on launch (spawn), so a MIRV that is built and launched has already committed the
  cost even before it reaches the target.
- No global launch cooldown in the current release; each Missile Silo slot reloads on its own
  90-tick timer, so tempo is limited by silo slots and the money, not by a shared lockout.

## Limits and caveats

- Community sources carry the stale flat-25M / 60s-cooldown belief; none of them were used to set
  a number. The rule is taken exclusively from the tagged source and release notes.
- The ladder has no hard cap in the source read here; the rung table above is shown to N=4 for
  realism (most FFA endgames see at most a few MIRVs).
- v0.34.0-beta1 is the only tag where the flat 25M rule is true; the guide's version boundary must
  state that the current player-facing release (v0.34.0 through v0.34.11) uses the ladder.
