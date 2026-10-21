# Community source pack — FFA runaway-leader gang-up (v35 "smarter nations")

Slug: `ffa-runaway-leader`
Topic: In a Free-for-All, the v35 Nation AIs stop helping the runaway
territory leader and start pressuring it — nukes, ground strikes, and alliance
rejection — and players want to know exactly when that flip happens and how to
change the outcome.
Research date: 2026-10-22. Accessed via pullpush.io (Reddit JSON mirror) and
YouTube oEmbed + indexed transcript excerpts; rules and numbers re-verified
against the OpenFrontIO source at tag `v0.35.2` and the v0.35.0 official
release notes.

## Official primary sources

- OpenFrontIO v0.35.0 release notes — https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0
  Published 2026-10-16. The "Smarter nations" section is the primary statement
  of the mechanic: "Nations play more like the humans who win: ... and in FFA
  gang up on a runaway leader. Easy nations keep their old behaviour." The
  "Nations" sub-section adds: "Retaliation, naval warfare and pressure on a
  runaway FFA leader: nations answer attacks before saving, route boats around
  warships, send warship squads at blockades, and don't sail past 300/500 tiles."
  This is the single authoritative sentence that names the mechanic and
  scopes it to non-Easy FFA.
- Tag source (v0.35.2) — `packages/engine/src/execution/nation/NationUtils.ts`
  `findRunawayLeader` and `runawayLeadFactor`; `NationNukeBehavior.ts`
  `findFFACrownTarget` and `CROWN_NEAR_WIN_SHARE = 0.5`; `NationMIRVBehavior.ts`
  `steamrollCityGapMultiplier` / `steamrollMinLeaderCities` /
  `victoryDenialThresholdPercent`; `AiAttackBehavior.ts` `findCrownTarget`;
  `NationAllianceBehavior.ts` `isRunawayLeader`. Nation AI behaviour files are
  byte-identical between `v0.35.2` and upstream HEAD, so these facts are bound
  to a real released tag.

## Reddit discussions (analyzed)

1. r/Openfront — "new bots will have some sort of hatred toward you"
   https://www.reddit.com/r/Openfront/comments/1ucr1z5/new_bots_will_have_some_sort_of_hatred_toward_you/
   Player question: the leader feels targeted and the community is debating
   whether it is personal hatred or the bots' targeting. Observation: players
   on higher difficulties repeatedly describe the big player getting swarmed by
   several AI nations at once, and the thread treats it as an AI behaviour
   change rather than bad luck. Relevance: this is the exact player-facing
   symptom the runaway-leader gang-up produces; the thread's ambiguity is
   resolved by the `findRunawayLeader` threshold. Limitation: anecdotal, no
   tile counts, difficulty not always stated.

2. r/Openfront — "how to win in endgame"
   https://www.reddit.com/r/Openfront/comments/1mezz59/how_to_win_in_endgame/
   Player question: how to close out an FFA when one player is far ahead.
   Observation: top advice converges on coordinating with the AI and other
   players against the leader, and on the win bar being share not net worth.
   Relevance: confirms the player-side half of the decision (the AI is a
   potential ally once it decides the leader is runaway). Limitation: pre-v35
   answers do not cite the exact trigger; the guide fills that gap.

3. r/Openfront — "open front guide"
   https://www.reddit.com/r/Openfront/comments/1sp7m6m/open_front_guide/
   Player question: a condensed guide request; several commenters ask what
   changed with the new nation AI. Observation: the most upvoted points are
   about not being the first to attack and about the AI now nuking land and
   retaliating. Relevance: situates the runaway-leader behaviour inside the
   broader "smarter nations" package, and shows players asking whether the AI
   is now a reliable third attacker. Limitation: general guide thread, FFA
   detail is incidental.

## YouTube videos (verified live via oEmbed; transcript excerpts from index)

1. The ULTIMATE OpenFront.io Tutorial and Strategy Guide! — Ultimus_Rex
   https://www.youtube.com/watch?v=EdcdsayA_ac
   Relevance: broad FFA strategy; the endgame section frames the leader
   problem as "when do the rest of the table commit." Transcript confirms the
   focus/alliance framing that the AI gang-up accelerates. Limitation: tutorial
   pace, does not quantify the AI trigger.

2. I Fought the TOP Players in a GIANT OpenFront.io Tournament — Ultimus_Rex
   https://www.youtube.com/watch?v=J43d0-oGpGQ
   Relevance: high-stakes ranked FFA; shows the leader getting pressure from
   multiple directions late. Transcript excerpts describe the late-game focus
   as the deciding factor. Limitation: tournament context, lobby-specific.

3. Is the FACTORYMAXXING Strategy really THAT GOOD?? | OpenFront.io — TheBiff
   https://www.youtube.com/watch?v=ht4C1VwueOc
   Relevance: economy-first FFA; directly relevant to how fast a player can
   become the runaway leader and what the AI does once the city gap opens.
   Transcript discusses growth-vs-defense tradeoffs that feed the leader's
   tile and city counts. Limitation: strategy critique, not an AI mechanics
   breakdown.

## Synthesis of the player questions

Across all six sources the recurring questions are: (a) "Why do several nations
suddenly attack the biggest player?" — answered by the `findRunawayLeader`
3x / 2x / 1.5x tile-ratio threshold (Easy: none). (b) "Will the AI help me or
attack me if I am the leader?" — answered by the three consumer paths (crown
nuke with the 30/20/10% gap thresholds and the 50% near-win hard target,
ground `findCrownTarget` on Hard/Impossible and the Medium 10%-already-attacking
rule, and alliance rejection via `isRunawayLeader`). (c) "When does the AI
launch a MIRV at the leader?" — answered by the city-count steamroll
(leader cities vs runner-up × 2/1.5/1.25/1.15, min cities 20/10/10/8) and the
victory-denial threshold (75/65/55/40%). (d) "Can I stay the leader and still
win?" — answered by the failure/counter section: keep the gap under the
trigger, avoid the near-win 50% nuke window, and use the Easy exception. Every
rule and number in the guide is bound to the tag source or the v0.35.0 release
notes; the Reddit and YouTube sources establish the player-facing question and
the community framing, not the numeric rules.

## Boundaries and caveats

- The mechanic is FFA-only and disabled on Easy difficulty (the code returns
  `null` for `GameMode !== FFA` and `difficulty === Easy`). Team mode is
  outside scope for the gang-up, though the MIRV steamroll and victory-denial
  paths also apply in Team for lone-vs-team share.
- Community posts are anecdotal and pre-dating or post-dating v35; they do not
  by themselves establish the numeric thresholds. The thresholds are read from
  the `v0.35.2` source, which is what the guide's version boundary cites.
- "Pressure on a runaway FFA leader" in the release notes is the umbrella; the
  three consumer code paths are the concrete implementation the guide
  documents.
