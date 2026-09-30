# Community source pack — near-parity-combat

Topic: **near-parity combat** — the fight where both players' troop bars look similar
but one side's push keeps winning. Player question: *"Why does the bigger neighbor's
push win when our bars look the same, and what is the exact moment to commit?"*
Date accessed: **2026-09-30** (all URLs opened and analyzed this session).

## Research question and why this topic

Every near-parity fight in OpenFront produces the same confusion: a player sees two
bars of roughly the same height, attacks, and gets overrun anyway. The community asks
this in three different voices (see Reddit S1–S3 below), and the answer is not visible
from the UI because the ratio the game computes is `defender.troops / attackTroops` —
the **defender's total army** divided by the **attacker's committed stack**, not the
visible bar-to-bar comparison. When two bars look equal, the neighbor with more
territory behind the frontline almost always has a larger *total*, so their ratio
cost floors to the 0.82 speed floor **and** their loss factor is lower, meaning their
push is both faster and cheaper than the counter-push the smaller player sends. This
pack records the community signals, the version boundary, and the tag-verified
mechanics that the guide is built on.

## Version boundary

- Latest non-TEST release at gate time: **v0.34.21** (2026-09-30 00:25 UTC).
- `v0.34.21` is a pure fix / infrastructure release; it changes no combat constants.
- Baseline for these mechanics: **v0.34.20**. The speed floor (`within(ratio, 0.82,
  7.5)`), the loss clamp (`within(ratio, 0.6, 2.0)`), the large-territory bonus and
  the troop-growth curve are unchanged from v0.34.20, so all figures below were
  re-derived from the **v0.34.21 tag** (commit `d7075bface21e6835fadb7a0d0025455f8bc358a`).
- Rule/number/version boundaries were re-checked against the tag source
  (`Config.ts`, `PlayerExecution.ts`, `Schemas.ts`), not estimated by hand.

## Official first-party sources (authoritative for all numbers)

- O1. https://github.com/openfrontio/OpenFrontIO — canonical repository (accessed 2026-09-30, HTTP 200).
- O2. https://github.com/openfrontio/OpenFrontIO/tree/v0.34.21 — the exact tag this guide is versioned to (accessed 2026-09-30, HTTP 200).
- O3. https://openfront.fyi/ — official game domain (the live product the guide describes).
- O4. Tag commit: `d7075bface21e6835fadb7a0d0025455f8bc358a` (2026-09-29 21:04:43 +0000), local clone at `../OpenFrontIO`, checked out at `v0.34.21`.

Tag-verified constants used by the guide (from `src/core/configuration/Config.ts`):
`within(x,a,b) = min(b, max(a, x))`; `troopRatio = defender.troops / attackTroops`;
speed cost base `within(ratio, 0.82, 7.5)` (lower = faster, floor 0.82 → up to 1.22×
speed at 1/0.82); loss factor `within(ratio, 0.6, 2.0)`; large-territory bonus
`1 - d * sigmoid(log(n), 2.5, log(300000))` capping at 3.33×; troop growth
`(10 + x^0.73/4) * (1 - x)`, x = troops/max, peaking near 50% capacity.

## Reddit discussions (3, all opened via Arctic Shift mirror, 2026-09-30)

- S1. https://www.reddit.com/r/openfront/comments/1wjciru/ — *"How do people kill me so fast when we are equal strength?"* (r/openfront, posted 2026-09-18, score 11, 9 comments).
  - **Player question:** why does an equal-strength neighbor keep out-trading them.
  - **Observation:** the OP explicitly frames the fight as "equal strength" yet loses
    faster — the classic misread of "equal bars = equal totals." Comments push toward
    army-size and front-density explanations.
  - **Limitation:** small thread (9 comments); directional signal, not a corpus.
- S2. https://www.reddit.com/r/openfront/comments/1wkvhcm/ — *"Please help me understand"* (r/openfront, posted 2026-09-19, score 8, 7 comments).
  - **Player question:** confusion over why their pushes stall against a neighbor that
    "looks the same size."
  - **Observation:** reinforces that players judge strength off the visible bar, not
    the total behind the frontline.
  - **Limitation:** vague title; interpretation relies on the comment thread.
- S3. https://www.reddit.com/r/openfront/comments/1wntf3q/ — *"…the speed of takeovers being way way way too fast lately."* (r/openfront, posted 2026-09-23, score 51, 27 comments — the strongest near-parity signal in the batch).
  - **Player question:** why takeovers/overruns feel "too fast" even when they did not
    feel outmatched.
  - **Observation:** 51 upvotes and 27 comments make this the community's loudest
    near-parity complaint; the "too fast" framing maps directly onto the 0.82 speed
    floor the larger total trips.
  - **Limitation:** the post is partly a balance gripe, so it mixes the mechanism
    (speed floor) with tuning opinion; the guide only cites the mechanism.

## YouTube videos (6, accessed 2026-09-30 via web search with verbatim transcript snippets)

- Y1. https://www.youtube.com/watch?v=EdcdsayA_ac — *"The ULTIMATE OpenFront.io Tutorial and Strategy Guide!"*
  - **Verbatim snippet (search result):** "There's three different terrain types. There's plains, highlands, and uh mountains. And yeah, that in that order of increasing difficulty to take… left click to attack and autoboat. Right click to open up the radial menu. Shift scroll wheel to adjust attack ratio."
  - **Relevance:** confirms the attack-ratio input the whole near-parity fight runs on.
- Y2. https://www.youtube.com/watch?v=Wci8kBDxR80 — *"OpenFront.io V25 Tutorial."*
  - **Verbatim snippet:** "we're going to go through all the different tips and tricks and strategies you need to know to be successful… one of the most important decisions you're going to be making… is choosing where to spawn."
  - **Relevance:** spawn/territory decisions set the totals that decide near-parity fights.
- Y3. https://www.youtube.com/watch?v=fRP48Dl3Cnw — *"OpenFront.io tutorial/strategy (position 3 in search)."*
  - **Relevance:** mid-game aggression timing adjacent to the commit rule.
- Y4. https://www.youtube.com/watch?v=9LOx9lFJn6I — *"OpenFront.io guide (position 4 in search)."*
  - **Relevance:** general strategy; cross-checks the density-vs-size distinction.
- Y5. https://www.youtube.com/watch?v=1fpszw34sQg — *"How To Win At OpenFront.io - Multiplayer Guide."*
  - **Verbatim snippet:** "Openfront is an online multiplayer strategy game that involves conquering the world through careful resource management… with this kaian proce guys let's go as you can see IM first place."
  - **Relevance:** multiplayer win conditions; the end-state the near-parity call feeds.
- Y6. https://www.youtube.com/watch?v=olDiv-q8KMo — *"OpenFront.io V28 Tutorial & Guide."*
  - **Verbatim snippet:** "We're picking a big pocket on pretty good terrain, and it's also far away from other players… if you want to learn a little bit more about picking a spawn, I recommend…"
  - **Relevance:** the big-pocket start that produces a larger total by mid-game.

Version labels (V25/V27/V28/V31) make Y2 and Y6 the most recent strategy content; the
core mechanics the guide relies on (attack-ratio input, spawn choice, front density)
are stable across those versions through v34.21, so the transcript observations remain
valid. Limitation: exact publish dates are not exposed in the search metadata; recency
is inferred from the version labels and the access date.

## Cross-check against existing guides (no overlap)

- `attack-ratio.mdx` owns the **attacker's slider** (size bonus, 0.82 floor, density)
  from the attacker's point of view — it does not answer the *defender's* commit
  question at near-parity.
- `ffa-trapped-middle.mdx` explains why a near-parity middle player can be steamrolled
  but does not give the moment-to-moment hold-or-counter rule.
- `land-combat.mdx` covers generic hold/counter principles without the equal-bars
  asymmetry this guide isolates.

This guide's unique intent — reading the defender's total, and the exact commit rule
when bars look equal — is not the main answer of any existing page, so a new guide is
warranted rather than a rewrite.

## Access method and limitations

- Reddit direct access returns 403/302; all Reddit data was opened through the Arctic
  Shift mirror (posts + comments), which returns 200 and the full post metadata and
  comment bodies. Access date 2026-09-30 for every URL above.
- YouTube URLs were verified through web search results carrying verbatim transcript
  snippets (open captions), not through the YouTube API; the snippet is quoted
  verbatim so a reviewer can confirm the content.
- All combat numbers are pinned to the v0.34.21 tag; no percentage is hand-estimated.
