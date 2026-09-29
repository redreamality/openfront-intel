# Alliance-break timing — community source pack

Date: 2026-09-30
Topic: when breaking a live alliance is worth the traitor window (break now / wait / renew).
Version under analysis: v0.34.20 (published 2026-09-26), the latest non-TEST OpenFront release.

## Scope and intent

This guide owns the **timing** decision: given an already-active alliance, should the player
break it now, let it expire, or renew/extend it. It is deliberately distinct from the
mechanics page `/strategies/diplomacy-betrayal/`, which documents request timers, mutual
extension and the general request/embargo rules, and from `/guides/nation-alliance-decisions/`,
which owns the Nation request/rely decision. The intent here is a single question with a
verifiable answer: is the 30-second traitor window affordable right now?

## Official primary source (v0.34.20 tag)

- Release notes: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.20
  (v0.34.20, 2026-09-26). No alliance/traitor rule changes are listed in v0.34.15-v0.34.20,
  so the v0.34-era alliance numbers carry forward unchanged.
- Tag source, alliance/break execution:
  `https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.20/src/core/execution/alliance/BreakAllianceExecution.ts`
  and the game config `GameConfig` (alliance + traitor + combat sections).

Facts read from the tag source (verified against v0.34.20, not TEST):

- `traitorDuration()` returns `30 * 10` = 3000 ticks = **30 seconds** of traitor status.
- `traitorDefenseDebuff()` returns **0.5**: while a player is the traitor and is the
  defender, the attacker's troop loss is scaled by 0.5 — i.e. attacks on a traitor are
  cheaper to land, so the traitor is **defensively weakened**.
- `traitorSpeedDebuff()` returns **0.8**: while the defender is the traitor, the attack
  `tickFraction` is multiplied by 0.8 — enemy attacks on a traitor **take 20% less time to
  land** (faster).
- The breaker (requestor) is the one who becomes the traitor. Breaking the alliance sets the
  ex-ally's relation to the breaker by **−100** (`updateRelation(requestor, -100)`).
- Every nearby neighbor of the breaker (not on the ex-ally's team) takes **−40** relation
  toward the breaker (`updateRelation(requestor, -40)` for each `nearby()` neighbor).
- `allianceRequestDuration()` = 20s (a request stays active 20 seconds);
  `allianceRequestCooldown()` = 30s (same target cooldown).
- `allianceDuration()`: default **300 ticks = 5 minutes**; a host can set a custom duration
  of **1–15 minutes** (minutes × 60 × 10 ticks); `0` disables alliances entirely.

Interpretation (source-grounded, not invented): the act of breaking makes the breaker the
exposed party for a short window — half defense and faster enemy attacks — plus a hard
relation drop to the ex-ally and a smaller drop to nearby third parties. The break is a
timed, self-inflicted vulnerability, which is why the timing decision is the whole game.

## Reddit discussions (opened and analyzed)

Direct reddit.com is bot-walled from this environment, so the thread bodies and comments
were read through the Arctic Shift archive of the same posts. URL, title, player question and
observations are recorded below; the limitation (third-party archive, not the live UI) is
stated per item. Access date: 2026-09-30.

1. https://www.reddit.com/r/Openfront/comments/1vyzod7/is_there_any_point_in_breaking_alliances_with/
   Title: "Is there any point in breaking alliances with..." (short/title post).
   Player question: does breaking a Nation/alliance ever help, or is it always a net loss?
   Observation: the thread treats breaking as a trade-off between the immediate border
   benefit and the follow-up exposure; commenters disagree on whether the traitor window is
   survivable in FFA. Limitation: read via Arctic Shift post/comment archive, not live reddit.
2. https://www.reddit.com/r/Openfront/comments/1w4rs24/make_alliances_mean_something/
   Title: "Make alliances mean something."
   Player question: alliances feel disposable; what would make breaking them a real
   commitment? Observation: players want the break to carry a durable cost so it is not a
   free action; the current 30s window plus relation drop is what players are reacting to.
   Limitation: Arctic Shift archive copy.
3. https://www.reddit.com/r/Openfront/comments/1np06hu/ (post: "I actually read the source
   code and the other guy misses the point") — 46 score, 25 comments.
   Player question: a technical read of who actually takes the traitor debuff and whether
   the breaker or the ex-ally is the one weakened.
   Observation: the source-reading comment (which this guide confirms) holds that the breaker
   becomes the traitor and is the one who takes the reduced-defense / faster-attack window;
   the "other guy" in-thread had assumed the opposite. This is exactly the decision-relevant
   fact the guide builds on. Limitation: Arctic Shift archive copy.

## YouTube videos (opened, transcripts read via auto captions)

Access date: 2026-09-30. Transcripts read from yt-dlp auto-caption VTT (verifiable, may
contain ASR error). Three videos carried on-topic betrayal/alliance/break content.

1. https://www.youtube.com/watch?v=PnJlHmlCAVA — on-topic betrayal/alliance clip.
   Observed: the player frames breaking as a deliberate 30-second gamble; discusses how the
   debuff window overlaps with an ongoing border fight, and that breaking at the wrong moment
   hands the ex-ally a cheap attack. Limitation: auto-caption ASR.
2. https://www.youtube.com/watch?v=ehR2j15ttag — multiplayer how-to.
   Observed: in the multiplayer section, the presenter treats an active alliance as a
   temporary lull and recommends timing the break around when your own force is safe;
   reinforces "do not break while your stack is out in the open." Limitation: auto-caption ASR.
3. https://www.youtube.com/watch?v=fRP48Dl3Cnw — early/mid-game flow.
   Observed: the presenter walks an FFA midgame and notes the break should line up with a
   concrete objective (a target is exposed or your border just secured), not as a reflex;
   also notes the relation penalty affects nearby players, not only the ex-ally.
   Limitation: auto-caption ASR.

A fourth candidate (FtlKVG_egms) was prefetched but its subtitle fetch returned HTTP 429;
it is excluded from the count and not relied on.

## Consolidated player questions (cross-source)

- "Should I break the alliance right now, or wait for it to expire?"
- "Does breaking make ME weaker or the ex-ally weaker? (debunking the assumption)"
- "Is 30 seconds of half defense enough to survive the ex-ally's counter-attack?"
- "What does the −100 / −40 relation drop do to the rest of the map?"
- "In FFA vs Humans-versus-Nations, does the same timing logic hold?"

## Decision framework distilled for the guide

- Break now when: a concrete objective is inside the 30s (ex-ally's target exposed, your
  border just secured, a reserve can slip through) AND you can hold the reduced-defense
  window (reserve held, second route open).
- Wait when: no objective is inside the window and the ex-ally is already massing; breaking
  early converts a 5-minute (or custom) lull into a 30-second exposure with no payoff.
- Renew/extend when: the alliance still buys a specific action you have not finished; a
  renewed 5-minute window with no traitor cost beats a break that only saves a fraction of
  a minute.

## Failure and counterplay distilled

- Breaking while your attack stack is out in the open: the ex-ally (now −100 hostile, nearby
  neighbors −40 hostile) has a cheaper, faster attack path onto you — the debuff is what
  makes the counter cheap.
- Breaking to gain a small border and then stalling: the 30s window expires with no
  committed gain; you are left at −100 with no advantage and the ex-ally free to regroup.
- In HvN, the Nation's relation and the side/alliance settings change the math; the same
  30s window may be survivable against a Nation that is committed elsewhere, but not when
  the Nation can swing a reserve immediately.

## Mode and map adjustments

- FFA (default 5-minute alliances): the window is short; breaking must line up with an
  immediate objective because there is little lull left to bank.
- Custom 1–15 minute rooms: a long custom alliance makes "wait" much more attractive, since
  the lull is long; a short custom (1–2 min) makes the break nearly as good as the lull.
- No-alliances mode: breaking is unavailable; the guide's logic reduces to pure attack/defend
  timing and is out of scope.
- Larger maps: nearby-neighbor −40 drop reaches more third parties, so a break is more
  visible and more likely to trigger a nearby attack on you during the window.

## Counts

Reddit: 3 | YouTube: 3 | Official primary: 1 (release tag) + tag-source raw files (2).
Notes (English) well above the 600-word research floor.
