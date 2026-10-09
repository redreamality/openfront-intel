# Community source pack — `sub-hundred-elimination`

Topic: the sub-100-tile elimination threshold and the tile cascade — when a player actually
dies (below 100 tiles, not zero), and where the dead player's leftover land and gold go.
Access date: 2026-10-09. Verified against OpenFrontIO v0.34.24 tagged source.

## Official primary source (rules, numbers, version boundary)

- https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/AttackExecution.ts
  - `handleDeadDefender()` (line 432) fires only when `target.isPlayer() && target.numTilesOwned() < 100`.
  - The cascade is a bounded BFS (MAX_PASSES 100): each surviving tile of the dead player is
    assigned first to the finisher if any neighbor is owned by the finisher, otherwise to a
    non-friend neighbor of the dead player (the dead player's enemies). The finisher never
    inherits the dead player's entire territory, only the connected leftover tiles.
- https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/game/GameImpl.ts
  - `conquerPlayer(conqueror, conquered)`: gold transfer via `conquerGoldAmount`; a human's
    leftover warships/transports are captured by a same-team conqueror.
- https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/configuration/Config.ts
  - `conquerGoldAmount`: returns the full gold pile for a bot/nation, and `gold / 2n` (half)
    for a human. Gold transfer is skipped when the captured human sent zero attacks (never
    played) — the "conquered_no_gold" event.
- https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/PlayerExecution.ts
  - The same `numTilesOwned() < 100` floor is re-evaluated during the player tick
    (line 113) and used to force a cluster recomputation, confirming the threshold is a
    global elimination floor, not only an attack-time check.

## Reddit discussions (player questions and observed behavior)

- https://www.reddit.com/r/Openfront/comments/1no19k3/ — "How to even survive until mid-game?"
  Player question: a beginner kept getting taken out; top answers describe a snowball where the
  losing player "gets eaten", boats can be sent into a port to over-extend an ally, and warships
  are the main early defense. Directly relevant: players already reason about the moment a
  player is "gone" and who picks up the pieces, but none pin down the exact tile threshold or
  the leftover-land cascade. Limitation: advice is tactical, not a mechanics reference; dates
  predate the verified v0.34.24 tag, so numbers must come from source.
- https://www.reddit.com/r/Openfront/comments/1vpliu1/ — "How do I avoid getting taken out like this in the early game?"
  The OP states the exact failure this guide explains: "Someone attacks me, I don't have enough
  money for defense posts so I use troops, then **every other player cannibalizes me**. Same
  thing every time." Comments repeatedly tie survival to keeping troops above a share of max
  population and to not over-expanding. Directly relevant: "every other player cannibalizes me"
  is the plain-language description of the cascade's enemy-neighbor branch. Limitation: the
  thread answers with troop-management doctrine, not the threshold rule; it motivates the
  audience but the numbers are verified from source.
- https://www.reddit.com/r/Openfront/comments/1munevh/ — "Please show more statistics! (attack losses)"
  Players complain that large countries "randomly get a bonus to casualties" and that attack
  losses are unexplained; one commenter reconstructs the attack/defense loss formulas and notes
  defender losses scale with defender troop density. Directly relevant: it frames the
  "why did I just get eliminated" confusion this guide resolves, and shows that players cannot
  tell when a defense loss will push them under the elimination floor. Limitation: it is a
  feature-request thread from 2025-08, so it documents the gap rather than the rule.

## YouTube sources (verifiable video content)

- https://www.youtube.com/watch?v=8bxcAsJJXJg — "The Ultimate Openfront.io Beginner's Guide"
  Covers the three terrain types, the troop-to-worker gold slider, the attack ratio, sending
  boats around terrain, and the MIRV as an endgame "kill switch". Relevant: it establishes the
  beginner mental model (troops vs. gold vs. structures) that the elimination guide builds on —
  a player who dumps all troops into an attack can drop below the survival threshold. Limitation:
  the video predates the v0.34.24 tag and is framed as alpha-era, so it is used for framing, not
  for any number.
- https://www.youtube.com/watch?v=olDiv-q8KMo — "OpenFront.io V28 Tutorial & Guide"
  Walks through spawn choice, the attack ratio, terrain troop-loss differences (~20% between
  terrain types), annexation of surrounded bots, and ports/trade ships. Relevant: annexation and
  the "surround then the nation disappears" mechanic are the same engine path as the elimination
  cascade — once a player is below the floor, leftover land is reassigned. Limitation: version 28
  tutorial; mechanics are verified against the current tag, the video only motivates.
- https://www.youtube.com/watch?v=9LOx9lFJn6I — "Openfront.io Beginner's Guide: Mechanics, Tips, & Tricks"
  Explains the population bell curve (peak growth near ~41% of the curve), the troop-to-worker
  bar, attack ratio, and annexation by surrounding a territory so "as soon as you go through
  here, if they attack me, they just disappear." Relevant: it is the clearest community articulation
  of the surrounding-then-vanish behavior that the sub-100 cascade formalizes. Limitation: it does
  not state the numeric floor; the 100-tile threshold and the cascade ordering come from source.

## Research notes (English)

The single most repeated community question behind this topic is "why did everyone just take my
land the moment I got attacked?" The pattern is that a player spends their troops on defense or
on an overcommitted attack, the defense loss drops the player below a floor, and then the
player's remaining tiles are reassigned by the engine to the player who delivered the finishing
stroke and to that player's remaining enemies. The verified v0.34.24 rule is that the floor is
one hundred tiles, not zero: a player with ninety-nine tiles is already dead even though they
still visibly own a small blob of map. Because the cascade is a breadth-first sweep over the
dead player's surviving tiles, the finisher collects only the tiles that touch the finisher's
own border first, and every other surviving tile goes to whichever non-friend neighbor touches
it. That is why a third, uninvolved enemy who was bordering the victim can inherit land from a
kill it never participated in. The gold side is separate: the finisher receives half of a human
victim's gold (and the full pile of a bot or nation), and receives nothing if the human victim
never sent a single attack. The practical decision changes because of these three facts: a
player should not treat one hundred tiles as a buffer to "keep playing from", because crossing
it is terminal; a finisher should understand that a clean kill is worth less leftover land than
the surrounding neighbors get to claim, so positioning next to the victim before the final blow
matters as much as delivering it; and a small player sitting just above the floor is not safe,
because any defense loss that carries them under one hundred triggers the same cascade. None of
this is stated in the game's own UI, which is exactly the gap the Reddit threads flag. The guide
therefore anchors every number to the tagged source rather than to any single community thread,
and uses the community threads only to confirm that this confusion is real and recurring.
