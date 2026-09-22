# Community source pack — Should You Recall or Let an Attack Finish

Date: 2026-09-23
Automation ID: openfront
Guide slug: recall-or-cancel-attacks

## Research scope

This source pack supports the five-language guide `recall-or-cancel-attacks`, which answers the
decision question "when should you cancel a running OpenFront attack instead of letting it
finish?" The guide's central claim is that a recall against a human player carries a flat
twenty-five percent troop loss, a recall against a bot is free, land recalls always pay that
cost while sea recalls pay it only while the vessel is still on the attacker's own tile, and the
engine gives a twenty-tick cancel window. Community sources were consulted to check how players
actually ask the question and what the open-source rules say, while the numbers themselves were
re-verified against the tagged source at `v0.34.13` (`RetreatExecution.ts` sets `cancelDelay` to
twenty ticks and branches the malus on whether the target is a bot, and the land/sea difference is
that the malus is charged only when the current tile is still owned by the attacker).

## Official first-hand sources

- OpenFront.io (official game, the canonical rules source): https://openfront.fyi
- OpenFront.io GitHub repository and v0.34.13 release (first-hand, code-level rules source):
  https://github.com/openfrontio/OpenFrontIO
- Verified tag source: `RetreatExecution.ts`, `AttackExecution.ts` (`malusForRetreat`),
  `TransportShipExecution.ts`, and `configuration/Config.ts` (`msPerTick`) at tag `v0.34.13`.

## Reddit discussions

1. URL: https://www.reddit.com/r/openfrontio/comments/1pu6bpm/
   - Player question / observed theme: how to size and abort attacks and what happens to troops
     when an attack is cancelled.
   - Observation: threads in this subreddit treat attack sizing and aborting as a core
     intermediate decision, not an advanced niche, which supports the guide's framing of the
     recall as a decision every attack plan should contain.
   - Limitation: thread is community-sourced; the twenty-five percent and twenty-tick figures were
     not taken from it but re-verified in tag source. Accessed 2026-09-23.
2. URL: https://www.reddit.com/r/openfrontio/comments/1sapsxy/
   - Player question / observed theme: when to commit troops and how to recover when an attack
     goes wrong.
   - Observation: players ask for a recovery path after a bad commit, which is exactly the
     use-case the recall decision serves; the guide's failure-modes section reflects this.
   - Limitation: community-sourced; no numeric rule taken from it. Accessed 2026-09-23.
3. URL: https://www.reddit.com/r/openfrontio/comments/1msdu6z/
   - Player question / observed theme: troop-loss accounting across land and sea engagements.
   - Observation: the land-versus-sea loss difference is a recurring point of confusion in
     community threads, which the guide addresses directly in its asymmetry section.
   - Limitation: community-sourced; the specific land/sea charging rule was verified in source.
     Accessed 2026-09-23.

## YouTube videos

1. URL: https://www.youtube.com/watch?v=CqLgMnP1jqU
   - Theme / observation: walkthrough content on OpenFront attack and troop-loss decisions;
     reviewed for how the presenter reasons about committing versus retreating a force.
   - Limitation: transcript reviewed for thematic framing only; no numeric rule taken from it.
     Accessed 2026-09-23.
2. URL: https://www.youtube.com/watch?v=j-YsQz38AXg
   - Theme / observation: tactical content covering when to press and when to pull a force back;
     used to confirm the community treats retreat timing as a teachable decision.
   - Limitation: thematic review only. Accessed 2026-09-23.
3. URL: https://www.youtube.com/watch?v=xG0LCTYgb6o
   - Theme / observation: endgame and attack-ratio content; reviewed for how a losing fight is
     contrasted with a capped-loss exit, which the guide's decision framework mirrors.
   - Limitation: thematic review only; the twenty-five percent figure is source-derived.
     Accessed 2026-09-23.

## Synthesis

Across the community sources the recurring player questions are: how much do I commit, when do I
abort, and how do I get my troops back when the fight goes wrong. The guide answers all three by
turning the recall into a capped-loss tool with a fixed cost (twenty-five percent against a
player, free against a bot), a fixed timing window (twenty ticks), and a land-versus-sea charging
rule. The numeric rules were not taken from any community source; they were re-verified against
the tagged source at `v0.34.13`, and the community sources were used to confirm the questions the
guide must answer and the way players frame them.
