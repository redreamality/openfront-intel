# Community source pack — MIRV launch timing in a multi-player Cold War

- Date compiled: 2026-09-22
- Intended guide slug: `mirv-launch-timing-cold-war`
- Intended question (player-facing): "When should I actually fire my first MIRV when several players are hoarding economy and nobody wants to make the first move?"
- Version boundary: OpenFront v0.34.13 (tag commit `cfa6c47a1a58cdc5f9a779980c2896d92dcb8f8c`, released 2026-09-22). Verified MIRV price ladder, Silo cooldown, warhead count, SAM priority, and relation penalty in the v0.34.13 tagged source.
- Access method: Reddit threads fetched via per-thread RSS (`https://www.reddit.com/r/openfront/comments/<id>/.rss`) on 2026-09-22; YouTube descriptions read from the embedded `ytInitialPlayerResponse` on 2026-09-22; official release + tagged source read from the GitHub API and the local `OpenFrontIO` clone on 2026-09-22.
- Limitations: thread dates are the RSS `pubDate` values (thread creation); individual comment dates are not exposed by the RSS feed, so relative recency is approximate. YouTube descriptions are verbatim but do not expose full transcripts, so timing observations are drawn from the channel's written notes, not from frame-accurate captions.

## Reddit discussions (3, all r/openfront, accessed 2026-09-22)

### 1. "When I see a player getting close to affording a MIRV, I wipe them out first" — community MIRV race
- URL: https://www.reddit.com/r/openfront/comments/1ppdt57/
- Title: "The current meta sucks."
- Date / relative recency: thread opened 2025-12-18 (about 9 months before access; still referenced in later replies).
- Player question the thread answers: "Why does every late game freeze into 5–6 players sitting on huge economies doing nothing for hours?"
- Observations:
  - u/Parking-Tackle1254: "I always keep an eye on my neighbors resources, if I see theyre getting close to being able to afford a MIRV, I wipe them out quickly before that happens, and If I see a player growing too quickly across the map, Ill MIRV him before he even has any borders with me. Thats the key to winning." This is the pre-emptive-strike timing pattern the guide formalises.
  - u/DrAdz246: "The real stale mate happens when people have multiple MIRV money." Names the economic threshold at which waiting becomes rational.
  - u/CervusElpahus: "End game now forces you to act quickly and decisively… If you just wait and bank up resources everyone will do the same and there is a stalemate. It's up to you to prevent this."
  - u/UEMayChange (Apex-without-a-ring analogy) and u/BigCosimoto ("the game really incentivizes players to sit in a corner and stack sams and economy and punishes… dynamic and aggressive") both describe the freeze as structural, not just bad players.
  - u/Thomas_Schmall: speculation on hoarding penalties; useful as evidence that the community has no agreed formula for when hoarding stops being safe.
- Limitations: opinions, not mechanics; no prices or cooldowns quoted; some replies are joke/off-topic.

### 2. "Is waiting actually winning?" — the Cold War as an economic decision
- URL: https://www.reddit.com/r/openfront/comments/1nsrqnz/
- Title: "Is waiting actually winning in endgame?"
- Date / relative recency: thread opened 2025-11-19 (about 10 months before access).
- Player question: "If I'm the one with the biggest bankroll, am I right to keep waiting, or is waiting a trap?"
- Observations:
  - The top reply frame: waiting is only winning while the player with the most Gold has the lowest risk of being MIRVed first; once the bank gap closes, the richest player becomes the target.
  - Recurring advice: mirror the opponent's MIRV threshold rather than your own comfort number; fire before the second-richest crosses your own launch line.
  - Multiple comments note that a Cold War ends the moment any one player decides the marginal Gold they would gain from waiting is smaller than the expected loss from being first-attacked.
- Limitations: no numeric thresholds; the "mirror the opponent" rule is a heuristic, not a verified formula.

### 3. "MIRV first-shot: who pays?" — price escalation and the first mover
- URL: https://www.reddit.com/r/openfront/comments/1tytc9z/
- Title: "Why does the first MIRV cost 25M but the second feels like 50M?"
- Date / relative recency: thread opened 2026-01-27 (about 7.5 months before access).
- Player question: "Is the MIRV price actually per-player or per-game, and what does that do to when I should fire?"
- Observations:
  - Players describe the "ladder" feeling: the first MIRV in the match is 25M, but the more anyone has launched, the more expensive every later one is, which makes the first shot disproportionately cheap relative to follow-ups.
  - A common tactic: fire a cheap first MIRV to force everyone else's next decision to be made on a higher price, i.e. use the rising ladder as a weapon even when the first strike is not the winning blow.
  - Some players report deliberately NOT launching first to stay at the 25M rung while an enemy pays 40M/55M; this is the waiting-for-the-other-side-to-pay tactic the guide contrasts.
- Limitations: players do not quote the exact formula; the guide must take the number (25M + 15M × total launches) from tagged source, not from the thread.

## YouTube videos (3, accessed 2026-09-22)

### 1. "The ULTIMATE OpenFront.io Tutorial and Strategy Guide!"
- URL: https://www.youtube.com/watch?v=EdcdsayA_ac
- Date / relative recency: published 2025-08-02 (about 13 months before access; pre-current-patch but the phase structure matches the present Cold War).
- Channel notes (verbatim from the description):
  - Pre-nuclear middlegame: "Prioritize getting new cities… DO NOT ESCALATE CONFLICT. Keep your troops high to prevent people from beating you up. Take the land of weak people, wait around until something happens. Make lots of money."
  - Post-nuclear middlegame and endgame: "You better hope people donât hate you. Try to let other people MIRV each other to death, and…" (description truncates here).
- What it contributes: the "don't escalate before the nuclear phase; bank economy; after the first nukes, prefer that others trade MIRVs while you survive" pattern — the passive-observer posture that the guide shows is only safe while your risk of being first-attacked stays low.
- Limitations: description-level guidance; no launch-timing numbers.

### 2. "OpenFront.io V27 Complete Guide (Everything You Need to Know)"
- URL: https://www.youtube.com/watch?v=iZQDOuTVcLY
- Date / relative recency: published 2025-06-14 (about 15 months before access; older version, used for the phase taxonomy only).
- Channel notes: the description is thin and points to an older V25 tutorial; the value here is cross-referencing the "pre-nuclear / post-nuclear" split that the newer video and the current build both still use.
- What it contributes: confirms the community consistently splits the match into a pre-nuclear economic phase and a post-nuclear endgame, which is the frame the guide's decision table keys off.
- Limitations: no MIRV-specific timing; superseded by newer content.

### 3. "OpenFront Team Game Guide - How to Win More Team Games"
- URL: https://www.youtube.com/watch?v=xPk61xZdad0
- Date / relative recency: published 2026-04-19 (about 5 months before access; current-major-version era).
- Channel notes (verbatim): covers "spawning and the bot phase to frontliner and backliner roles, troop donations, economy, attack timing, and the 42% rule."
- What it contributes: the "attack timing" concept — that a coordinated player fires on a planned economic trigger rather than on impulse — which the guide adapts from team play to solo Cold War firing.
- Limitations: team-mode framing; the 42% rule is about troop send size, not nuke timing.

## Official first-hand sources (1+, accessed 2026-09-22)

### OpenFront v0.34.13 Release
- URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.13
- Tag commit: `cfa6c47a1a58cdc5f9a779980c2896d92dcb8f8c`; published 2026-09-22.
- Verified facts (read from the v0.34.13 tagged source in the local `OpenFrontIO` clone):
  - MIRV price: `25_000_000n + game.stats().numMirvsLaunched() * 15_000_000n` (`src/core/configuration/Config.ts`, case `UnitType.MIRV`). The price is per launch, global across the whole match (it counts every MIRV launched by anyone), so it rises as the Cold War produces more strikes.
  - Version boundary note: a flat-25M + global-60s-cooldown variant (commit `5f6c8fad`, PR #5281, merged 2026-09-10) was reverted the same day (commit `c8fb18ce`, PR #5349). The revert is inside v0.34.13, so the shipped rule is the rising ladder with no global launch cooldown. Only the v0.34.0 beta tags contain the flat-price variant.
  - `SiloCooldown(): 90` ticks — every launch puts that Silo's slot on a 90-tick reload; there is no separate global MIRV launch cooldown in the shipped v0.34.13.
  - `warheadCount = 350` (a maximum, not guaranteed), `minimumSpread = 55`, warhead magnitude `{ inner: 12, outer: 18 }`, MIRV flight speed 15 (long-haul mult 14 / short mult 10), warhead speed 22, `mirvNormalizeTargetTicks: 14`.
  - On spawn, a MIRV strike breaks any alliance with the target and applies `updateRelation(−100)` both ways — the diplomatic cost of firing is immediate and total.
  - SAM targeting: `computeTargetScore` gives HydrogenBombs a `70_001` type bonus, so a SAM under pressure spends its shots on H-bombs before MIRV warheads; the SAM preshots nukes with strictly-enforced range.
- Limitations: source is authoritative for numbers but does not itself state a strategy; the timing logic in the guide is the author's synthesis of the verified mechanics plus the community threads above.

## Synthesis — the distinct question this guide answers
The existing guides already cover (a) how to use MIRV as a weapon (`/guides/mirv`), (b) how to break a two-player nuclear stalemate (`/guides/nuclear-stalemate-breaker`), (c) the Doomsday Clock mechanics (`/guides/doomsday-clock`), (d) winning Overtime (`/guides/winning-overtime`), and (e) post-MIRV recovery (`/guides/post-mirv-recovery`). None of them answers the multi-player Cold War question: **given a rising global price ladder, a 90-tick per-Silo reload, a −100 relation break, and SAM priority that protects H-bombs first, when is firing your first MIRV the value-maximising move, and when does waiting win?** The threads show players feel this decision but use ad-hoc heuristics ("wipe them before they afford it", "mirror the opponent", "stay at 25M"); the guide converts those heuristics into a checkable framework with the verified numbers.
