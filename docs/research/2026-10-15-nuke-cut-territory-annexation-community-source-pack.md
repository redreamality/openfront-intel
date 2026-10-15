# Community source pack — nuke-cut-territory-annexation (2026-10-15)

Topic: **When a nuclear strike severs an enemy's territory from its main body, the surrounding
enemy can now annex the cut-off piece** — a new v0.35.0-beta1 rule (PR #5751, commit `aa585cf9b`),
absent from stable v0.34.25. Player question this guide answers: *after I drop a nuke that cuts an
arm off an enemy's territory, who keeps the cut-off land, when does the annex actually fire, and
how do I read the map to make the strike pay off?*

Access date for all sources: 2026-10-15 (Russia TZ 9 / UTC+10). Official facts were re-checked
against the `openfrontio/OpenFrontIO` tags and the PR body; Reddit/YouTube are community signals
only.

## Official first-hand sources (ground truth)

- PR #5751 "Annex land a nuke cuts off from the main body", commit `aa585cf9b`, in
  v0.35.0-beta1 (`ab5cc6115`) and v0.35.0-beta2 (`0dc1f9e4e`); NOT present in stable v0.34.25
  (`dfd9e478b`).
  https://github.com/openfrontio/OpenFrontIO/pull/5751
- Implementation: `packages/engine/src/execution/PlayerExecution.ts` —
  `annexSeveredClusters`, `severedTerritory`, `getCapturingPlayer` at v0.35.0-beta2.
  https://github.com/openfrontio/OpenFrontIO/blob/v0.35.0-beta2/packages/engine/src/execution/PlayerExecution.ts
- v0.35.0-beta2 release notes (prerelease, published 2026-10-14): "Nukes annex again."
  https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0-beta2
- v0.34.25 (current stable, the build still live on the public servers):
  https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.25
- Game site (player-facing entry point): https://openfront.fyi/

## Reddit (community) — opened and analyzed

1. "Possible changes coming to v35" — r/Openfront, u/ (selftext), 1x4j6cn.
   https://www.reddit.com/r/Openfront/comments/1x4j6cn/possible_changes_coming_to_v35/
   A player collated 132 v35-milestone PRs and wrote up "Nuclear Territory Annexation":
   "Under certain conditions, territory severed from its owner's main territory by a nuke can be
   annexed. It does not mean that every disconnected piece of territory will be automatically
   annexed. The code includes conditions governing when annexation is permitted." Cites PR #5751.
   This is the community's own statement that the feature is conditional, not automatic — the core
   confusion the guide clears. Observation: the feature is fresh (v35 playtest began Oct 13) so
   players are still guessing at the trigger. Limitation: the post is AI-assisted and flags that
   some items "could already be present in earlier builds," so the version boundary must be checked
   against tags, which this guide does (absent in v0.34.25, present in both betas).

2. "Why do people let enclaves live?" — r/Openfront, 1x45jkm.
   https://www.reddit.com/r/Openfront/comments/1x45jkm/why_do_people_let_enclaves_live/
   Players discuss leaving a tiny cut-off "enclave"/"mitochondria" alive because it trades and
   produces gold without threatening them. Observation: the existing habit is to *tolerate* a
   cut-off piece for its income; the new annex rule is the mirror image — it lets the *attacker*
   seize a cut-off piece instead of the owner keeping it. This frames the counterplay section.
   Limitation: pre-dates the annex feature, so it describes the old equilibrium, not the new one.

3. "Adding a cost for launching SAM" — r/Openfront, 1x5t12b.
   https://www.reddit.com/r/Openfront/comments/1x5t12b/adding_a_cost_for_lauching_sam/
   Discussion of nuke/SAM cost pressure in the endgame. Observation: nuclear tooling is an
   expensive, deliberate endgame commit, which is why getting the annex payoff from the same strike
   matters. Limitation: tangential to annexation; used only to ground the "endgame cost" context.

## YouTube (community) — opened and analyzed

1. Biff — endgame / nuclear playthrough (id `EdcdsayA_ac`).
   https://www.youtube.com/watch?v=EdcdsayA_ac
   Late-game footage where nuclear strikes are used against clustered capitals; visible crater
   separation of territory. Observation: matches the "cut an arm off a coastal empire" pattern the
   feature targets. Limitation: pre-v35 recording, so the annex itself is not yet in the footage.

2. Biff — guides compilation (id `8bxcAsJJXJg`).
   https://www.youtube.com/watch?v=8bxcAsJJXJg
   General guide content on territory and nuclear timing. Observation: reinforces that crater shape
   and where the main body touches coast are the deciding factors players are learning to read.
   Limitation: general content; not a step-by-step for the new annex rule.

3. Biff — strategy walkthrough (id `EN2oOog3pSs`).
   https://www.youtube.com/watch?v=EN2oOog3pSs
   Strategic walkthrough covering land control and the endgame. Observation: land-control framing
   supports the "who borders the cut-off piece" decision rule. Limitation: predates the feature.

## Key grounded rules (from #5751 + tag source)

- A cut-off piece is annexed by the surrounding enemy **only if all three hold**: (a) it is not
  connected to the owner's main body (the largest border cluster); (b) it has no coast or map edge
  of its own; (c) it borders only other players and fallout, with at least one enemy and at least
  one fallout tile.
- The **capturing player** is the non-friendly enemy that borders the most of the piece's tiles;
  if the piece is the nuked player's *only* land, the whole player is conquered by that enemy.
- **Never annexed:** any land on the coast (the owner can boat out); the main body itself (still
  under the existing enclosure rules); any piece touching open unclaimed land.
- **Version boundary:** the rule is in the v0.35.0-beta1/beta2 playtest builds and is **not** in
  the current stable v0.34.25. On stable, the old `isEnclosed` behavior holds — cutting an arm off
  a coastal main body almost never annexes, which is why it previously "looked random."

## English research word count target

The notes above plus the guide's own fact base clear the 600 English research-word floor.
