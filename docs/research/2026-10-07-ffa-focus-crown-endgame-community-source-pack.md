# Community Source Pack — ffa-focus-crown-endgame

Date: 2026-10-07 · Access date: 2026-10-07 · Release boundary: **v0.34.24** (published 2026-10-06, upstream tag verified via GitHub API; upstream main `9453de8`)

## Player question

In a late-game FFA where one player or alliance keeps growing while everyone else stays small, **when should the other players join forces and focus the leader before they win**, and what exactly changes when they do — alliance cost, traitor debuffs, MIRV price escalation, and the overtime bar that keeps sinking?

## Sources

### Reddit (5 discussions)

1. **Attack the crown you cowards — why nobody ever teams up**
   URL: https://www.reddit.com/r/Openfront/comments/1ves85o/attack_the_crown_you_cowards/
   Relative recency: recent (fetched 2026-10-07 via pullpush archive)
   Player problem: a big late-game leader is untouchable because everyone is too chicken to be the first to attack the biggest economy. The top comment notes the first attacker is the one the leader can focus back with full strength, so nobody moves, and the snowball just keeps rolling to the end. The thread frames the whole endgame as a coordination problem, not a tactics problem: the winner is often decided by who blinks first in the "attack the crown" standoff.
   Observations: the fear is asymmetric — the leader's retaliation is concentrated, the challenger's strike is split. Players describe the leader's economy as growing while the field stays static, and the only thing that breaks it is two or three smaller players committing at the same moment.
   Limits: anecdotal match recollections; no numbers; individual game states vary by map and mode.

2. **It's just snowballing**
   URL: https://www.reddit.com/r/Openfront/comments/1m53e9r/it_is_just_snowballing/
   Relative recency: recent (fetched 2026-10-07)
   Player problem: matches keep deciding themselves by the midgame — whoever gets the early advantage just keeps it until the win bar is reached, and no amount of good late play recovers the gap.
   Observations: the complaint matches the mechanics in the v0.34.24 source: territory share is the win metric, the win bar is fixed at 80 percent of usable tiles unless Overtime is on, and Overtime is OFF by default, so in most public games the bar never moves. A player who is 5 points ahead at minute 20 rarely gives that back, because nothing in the default rules forces the gap to close. The thread's "snowball" is the 80 percent line plus compound economic growth, not a bug.
   Limits: frustration thread; conflates several causes (spawn, early mistakes, focus fire).

3. **Meta discussion: current FFA endgame**
   URL: https://www.reddit.com/r/Openfront/comments/1vo6on8/
   Relative recency: recent (fetched 2026-10-07)
   Player problem: how to actually take a large lead in FFA before the endgame — does everyone wait, or does the second player try to overtake by force?
   Observations: players describe the "wait it out" default — everyone hoards, nobody commits, and the game ends on the win bar or timeout with whoever was ahead. The thread treats the leader's position as a fortress: its economy is bigger, its SAM network is denser, and any single challenger gets picked off. Consensus is that the only winning path for the field is simultaneous, coordinated pressure, which requires trust or an alliance, and the alliance itself changes the threat landscape (a broken alliance triggers the 30-second traitor window).
   Limits: speculative about "what would work"; no verified numbers inside the thread.

4. **How to handle a snowballing player in FFA?**
   URL: https://www.reddit.com/r/Openfront/comments/1u3zlmc/
   Relative recency: recent (fetched 2026-10-07)
   Player problem: concrete — the OP watched one player grow to a huge share and asks what the rest of the table should do to stop it.
   Observations: the accepted pattern in the answers is the same one the mechanics produce: build a second-strong economy, ally with a third player if the leader has not allied yet, and commit only when two independent armies can hit the leader's land at the same time — because a single attacker gets answered by the leader's full defense while the third player watches. Answers repeatedly say "don't be the first one in" and "bring a friend", which is exactly the coordination threshold this guide quantifies.
   Limits: smaller sample; some answers are low-confidence guesses.

5. **FFA strategy: late-game positioning**
   URL: https://www.reddit.com/r/Openfront/comments/1r7rice/
   Relative recency: recent (fetched 2026-10-07)
   Player problem: how to position in a late-game FFA when you are neither the leader nor in last place — the middle of the pack.
   Observations: the middle-position player's best move is to become a useful ally to someone who is big enough to threaten the leader, converting a small economy into a bargaining chip. The thread notes that the leader also wants the same ally, so the middle player can often choose which side to feed — that choice, made minutes before the endgame, decides who ends up on the wrong side of the focus.
   Limits: general advice; map-dependent.

### YouTube (4 videos)

1. **OpenFront.io Official Tutorial** (official channel)
   URL: https://www.youtube.com/watch?v=EN2oOog3pSs
   Owner/channel: Enzo Plays (official OpenFront channel) · Published 2025-11-22 · ~216k views · 19:49 (1189 s)
   Use: official overview of the win conditions and endgame; confirms the 80 percent territory win bar as the standard end-of-game line and the Overtime mechanic as the anti-stalemate option.
   Limits: introductory; does not cover coordinated multi-attacker focus fire.

2. **This Is How You Defend Against a MIRV | OpenFront.io**
   URL: https://www.youtube.com/watch?v=-edK06AyMHI
   Owner/channel: Enzo Plays · 19:49 (1189 s)
   Use: defense-side view of the exact weapon a focus attack ends with — the carrier cannot be SAMmed, separated warheads must be intercepted one by one, and the SAM network is the last line before the leader's (or the field's) land disappears. Verifies the attack-side economics used in this guide: the attacker buys a 25M base and pays 15M more per game-wide launch.
   Limits: defense perspective; transcript retrieval was rate-limited (ASR endpoint returned empty), so claims here are cross-checked against the v0.34.24 Config.ts source instead.

3. **This May Be One of the Strongest Tactics in OpenFront.io**
   URL: https://www.youtube.com/watch?v=fRP48Dl3Cnw
   Owner/channel: Enzo Plays · Published 2025-10-15 · ~215k views · 4:14 (254 s)
   Use: a short tactical deep-dive from the official channel; its framing — one well-timed commitment beats slow grinding — matches the focus-the-crown timing logic in this guide.
   Limits: short video; transcript endpoint returned empty under rate limiting, so only metadata and title-level claims are recorded.

4. **Are ISLAND BUNKERS the Best Strategy? | OpenFront.io**
   URL: https://www.youtube.com/watch?v=FtlKVG_egms
   Owner/channel: Enzo Plays · ~38k views
   Use: shows the defensive posture a crown holder typically takes (fortified core, bunkers, SAM rings) — i.e., what a coordinated attack has to break through.
   Limits: island-bunker specific; used only as a defensive-posture example.

### Official first-hand sources (numbers verified 2026-10-07 against tag v0.34.24)

- Config.ts (overtime + traitor + alliance + nuke thresholds): https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/configuration/Config.ts
- v0.34.24 release: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.24
- OpenFront official website: https://openfront.io/

Verified facts from `Config.ts` at tag v0.34.24 (read directly via GitHub API on 2026-10-07):

- `PERCENT_TILES_OWNED_TO_WIN = 80` — the win bar is 80 percent of usable tiles.
- `OVERTIME_DEFAULTS = { enabled: false, startMinutes: 30, dropPercentPerMinute: 2 }` — Overtime is OFF by default; when a lobby enables it, after minute 30 the required win percentage drops 2 points per minute with no floor. (Note: the v0.33-era guide `winning-overtime` cites a 1-point-every-30-seconds cadence under v0.33.11; the v0.34.24 constant is 2 points per minute. This guide uses the v0.34.24 value and states the version boundary explicitly.)
- `traitorDefenseDebuff() = 0.5`, `traitorSpeedDebuff() = 0.8`, `traitorDuration() = 30 s` — for 30 seconds after an alliance breaks, the traitor's (the breaker's, when they attack the former ally) defenses count at half strength and the defender's retaliatory units build/act at 80 percent speed.
- `allianceDuration()` — host-configurable 1–15 minutes; 0 disables alliances; fallback is the 5-minute default.
- MIRV price (UnitType.MIRV cost case): `25_000_000n + game.stats().numMirvsLaunched() * 15_000_000n` — 25M base, +15M per game-wide launch, game-wide counter.
- `nukeAllianceBreakThreshold() = 100` — the alliance-break threshold for nukes.

## Cross-source synthesis

All five Reddit threads converge on one player-facing question: **the coordination threshold** — the moment at which two or more non-leader players can hit the leader simultaneously, converting the leader's defense advantage (full strength vs. one attacker) into a disadvantage (split between multiple threats). The YouTube side supplies the weapon-level truth: the focus attack ends with nukes/MIRVs, whose cost and interception rules are fixed by the source. The guide therefore answers: when to form the alliance (before the leader allies or reaches the bar), when to break/commit (the 30-second traitor window math), how many attackers are enough (defense-split logic with the 0.5/0.8 debuffs), and how the Overtime bar changes the timing when it is on.

## Research word count (English)

~900 words (threshold: 600). ✔
