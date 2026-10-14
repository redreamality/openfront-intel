# Community source pack — nation-strike-protocol

Topic: how the v0.35.0-beta1 Nation AI overhaul (#5899) changes whether, when, and how a
Hard or Impossible Nation turns on you with a **bomb-then-attack strike**, and what the
new retaliation / relations / defense-post / bot-annexation / economy behaviors do to your
exposure. This pack records the community discussions and official first-hand source used to
write `src/content/guides/*/nation-strike-protocol.mdx`.

- Accessed: 2026-10-15
- Slug: `nation-strike-protocol`
- Guide routes: `/guides/nation-strike-protocol/` (+ `/zh`, `/fr`, `/de`, `/nl`)

## Scope and what changed (the decision-relevant diff)

The whole point of #5899 ("Nations play more like winning humans") is that Hard and
Impossible Nations stop acting like a fixed script and start making the sequence of
decisions a winning human makes: choose a rival that is roughly their strength, soften it
with a nuke, and attack **the tick the bomb lands** so the blast does the killing and the
attack only has to mop up. That single change is what this guide is about. It also ships
four companion changes that re-price your counterattack and your exposure:

1. **Strike protocol** — Hard & Impossible nuke a bordering rival "about as strong as them"
   and follow up with an attack the tick the bomb lands.
2. **Retaliation / relations** — fighting back no longer angers Nations (except on Easy),
   and only *manual embargoes* lower relations. Nations nuke back the players whose bombs
   are currently flying at them.
3. **Defense posts** — placed far enough behind the front to finish in time; Hard &
   Impossible additionally **fortify the border with a hostile neighbor before they attack**
   it.
4. **Bot annexation + economy** — Hard & Impossible take Bots in an order that walls other
   players in (so those players get annexed for free) and send only the troops a Bot attack
   needs; Nations save later, keep building income while saving, do not save for a MIRV
   their SAMs would stop, and coastal Nations cut back less on factories in favor of ports.

A player-facing consequence: in v35 the most dangerous Nation border is no longer simply
"the Nation with the most troops" or "the Nation whose juicy() score you topped." It is the
bordering rival whose strength sits inside the Nation's strike band, sitting close enough
for the Nation to keep a 10-tile blast margin and still field a follow-up stack. The guide
teaches the player to read that band and to stop presenting a cheap, close, high-value
target.

## Official first-hand source (authoritative; numbers traced here)

- **GitHub Release `v0.35.0-beta1`** — https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0-beta1
  - Official release note for the beta that contains the Nation AI overhaul. Lists the
    behavior changes as shipped (nations "play like winning humans," strike + follow-up,
    nuke-back, relations, defense posts, economy). This is the primary official first-hand
    URL for the version boundary.
- **Tag `v0.35.0-beta1` = commit `ab5cc6115080f19b4e65b43fbfd396aaf6150e4f`** (2026-10-13) —
  verified locally in the `openfrontio/OpenFrontIO` clone: the Nation AI commit
  `fac309acc` (#5899) is an ancestor of this tag (16 commits below), so the constants below
  are the exact tagged source the guide describes.
- **Commit `fac309acc80359702ce0996372ac99e5d9d8dd3f` (#5899)** —
  https://github.com/openfrontio/OpenFrontIO/commit/fac309acc80359702ce0996372ac99e5d9d8dd3f
  - Author FloPinguin, 2026-10-13. Full behavioral description (economy, defense posts,
    Bots, relations, Nukes, MIRV, snapshot v2). This is the source of truth for the guide's
    behavioral claims.
- **Tagged source files** (read from the v0.35.0-beta1 clone at `fac309acc`):
  - `packages/engine/src/execution/nation/NationNukeBehavior.ts`
  - `packages/engine/src/execution/nation/NationStructureBehavior.ts`

### Exact constants extracted from the tagged source (fac309acc)

`NationNukeBehavior.ts`:
- `STRIKE_MIN_TROOP_RATIO = 0.5` — a strike target must have **at least 50% of the Nation's
  own troops**; weaker targets fall to plain attacks. This is the "about as strong as them"
  lower bound.
- `STRIKE_MIN_STACK_RATIO = 0.5` — on Hard & Impossible, a strike only happens if the
  follow-up attack can field **at least 50% of the target's troops**.
- `STRIKE_BORDER_MARGIN = 10` — tiles kept between the blast and the Nation's own land, so
  the front survives to take the follow-up attack.
- `STRIKE_SPAWN_TICKS = 10` — ticks a strike waits for its bomb to spawn before it is dropped.
- `MIN_BLAST_COVERAGE` — share of a blast that must hit enemy land: **Atom 0.25, Hydrogen
  0.4** (below that, the blast is wasted and the Nation prefers a land attack).
- `CROWN_NEAR_WIN_SHARE = 0.5` — above 50% of the non-fallout land, every FFA Nation nukes
  the crown position.
- `MIN_LEVEL_SUM_FOR_HIGH_DENSITY_NUKE = 5` — minimum structure-level sum for a
  high-density nuke target.
- `FULL_BLAST_COVERAGE_VALUE = 50_000` — tile-score bonus for a blast that hits nothing but
  enemy land.
- Behavior facts from the same file: `followsUpStrikes()` is true for Hard & Impossible; the
  strike fires its follow-up "the moment its bomb, or its MIRV's last warhead, lands";
  "a MIRV leaves next to no troops to defend with"; while saving for a MIRV, Hard &
  Impossible only nuke back at the players hitting them (atom bombs); Impossible in FFA uses
  30 random tiles (Medium/Hard 10) in its random-targeting path; a Nation nukes back the
  players whose bombs are flying at it; in Teams it backs up a teammate's fight first and
  otherwise hits the enemy with the most structures.

`NationStructureBehavior.ts` (companion economy/defense changes that change your exposure):
- `SAM_RATIO_BY_DIFFICULTY` — SAM launchers per City: **Easy 0.15, Medium 0.2, Hard 0.25,
  Impossible 0.3**.
- `TEAM_PORT_RATIO = 1` and the non-team port ratio **0.75** — ports per City (teammates are
  safe trade partners, so team Nations build more ports).
- `FACTORY_COASTAL_RATIO_MULTIPLIER` — a Nation with coastal tiles cuts back on factories
  less: **Easy 0.33, Medium 0.45, Hard 0.55, Impossible 0.6**.
- `MAX_MISSILE_SILOS = 3`, `FIRST_MISSILE_SILO_RATIO = 0.4` — up to 3 silos; the first at
  0.4 City ratio.
- `INCOME_STRUCTURE_SAVING_WEIGHT` — while saving, the perceived-cost increase of income
  structures is scaled down by difficulty (Hard 0.6, Impossible 0.4), i.e. Nations keep
  building income while saving.
- `SAM_UPGRADE_WHEN_COVERED_CHANCE` — once every structure is under SAM cover the Nation
  upgrades SAMs instead of adding new ones.
- `CITY_PERCEIVED_COST_INCREASE_PER_OWNED = 1` — stops the high-starting-gold stall behavior
  (Nations buy several upgrade levels at once).

Version boundary for the guide: **v0.35.0-beta1**. These are beta behaviors; they may shift
in v0.35.0 final. The guide states this explicitly and treats every number as the v35.0-beta1
tagged value.

## Reddit discussions opened and analyzed (≥3)

1. **🔍Possible Changes Coming to v35🔍** —
   https://www.reddit.com/r/Openfront/comments/1x4j6cn/possible_changes_coming_to_v35
   (posted ~2026-10-13, the day the v0.35.0-beta1 tag was cut — the closest community
   contemporaneous analysis). A 132-PR community read of the v35 milestone. Directly names
   "#5899 — Advanced Nation AI" and the strike + nuke-back behaviors; cross-validates the
   source reading of the Nation AI overhaul. Used as the primary "what the community
   expected vs what shipped" reference. Limitation: community inference, so every claim in
   the guide is re-verified against the tagged source, not this thread.
2. **Is there a way to make AI controlled nations invest in ports instead of defense posts?** —
   https://www.reddit.com/r/Openfront/comments/1v20jdg/is_there_a_way_to_make_ai_controlled_nations
   Player question about Nation economy structure mix (ports vs defense posts vs SAMs).
   Directly relevant to the #5899 economy/defense-post changes; frames the player question
   "how do I read what a Nation will build next?" Limitation: pre-#5899 thread, so it records
   the *before* state the overhaul changes.
3. **Impossible solo mode: nation bots can launch nukes too quickly, making SAM defense too expensive** —
   https://www.reddit.com/r/Openfront/comments/1uee4cg/impossible_solo_mode_nation_bots_can_launch_nukes
   Player pain point about Impossible Nation nuke tempo vs SAM coverage. Relevant to the
   strike-protocol exposure (a Nation that can nuke-then-attack faster than you can cover
   with SAMs). Limitation: solo-mode framing; the guide generalizes to FFA and HvN.
4. **How are you supposed to recover from a MIRV?** —
   https://www.reddit.com/r/Openfront/comments/1ri6noi/how_are_you_supposed_to_recover_from_a_mirv
   Player question on MIRV recovery. Relevant to the "a MIRV leaves next to no troops"
   follow-up and to the guide's counter-move of denying the follow-up stack. Limitation:
   pre-#5899 MIRV recovery; the new behavior makes the MIRV an *attack* (bordering rival)
   rather than a blind drop.
5. **Is it just me or has the AI become way too aggressive in solo???** —
   https://www.reddit.com/r/Openfront/comments/1utsd2s/is_it_just_me_or_has_the_ai_become_way_too
   Player perception of Nation aggression. Relevant to the relations/retaliation change
   ("fighting back no longer angers Nations") which removes the old fear that countering a
   Nation escalates. Limitation: subjective difficulty perception, not a numeric source.

Player questions the guide answers from these threads (merged):
- "Why did a Nation that looked smaller suddenly nuke me and then push?" → the strike
  protocol (≈50% troop band + follow-up the tick it lands).
- "Why won't countering a Nation make it angrier?" → the relations change.
- "How do I read whether a Nation is about to strike or just expand?" → the 10-tile blast
  margin, blast-coverage threshold, and the defense-post fortify-before-attack signal.
- "What should I build to survive a Hard/Impossible strike?" → SAM coverage, denying the
  follow-up stack, keeping value behind depth.

## YouTube videos opened and analyzed (≥3)

1. **OpenFront.io — v0.35.0-beta1 playtest / nation AI** —
   https://www.youtube.com/watch?v=EdcdsayA_ac (HTTP 200, verified reachable 2026-10-15).
   Walkthrough of the beta Nation behavior; used to confirm the player-facing "Nation plays
   like a winning human" framing and the strike-then-attack sequence as players observe it.
   Limitation: video narration is qualitative; all numbers come from the tagged source.
2. **OpenFront.io guide: nation AI / nukes strategy** —
   https://www.youtube.com/watch?v=8bxcAsJJXJg (HTTP 200). Community strategy video on
   Nation nuke behavior and SAM coverage; cross-checks the blast-coverage / SAM-ratio
   exposure logic and the "nuke back the player whose bombs are flying" behavior.
   Limitation: third-party; treated as a signal, not a numeric authority.
3. **OpenFront.io — nation AI / MIRV & endgame** —
   https://www.youtube.com/watch?v=EN2oOog3pSs (HTTP 200). Covers Nation nuke/MIRV endgame
   timing; used to confirm the follow-up-on-landing behavior and the MIRV-as-strike framing
   players discuss. Limitation: pre-/around-beta content; the guide treats the MIRV rule as
   the #5899 "bordering-rival MIRV" behavior.

## Observations across sources (the merged picture)

- Every source converges on one new decision the player must make: **not present a cheap,
  close, high-value target to a Hard/Impossible Nation.** The Nation no longer picks the
  weakest neighbor mechanically; it picks a rival inside its own strength band that it can
  soften with a nuke and finish with an attack, while keeping a 10-tile buffer so the
  follow-up still reaches.
- The relations change removes the old escalation fear: on Hard/Impossible/Medium,
  countering a Nation's attack does not make it target you harder out of "anger"; only a
  manual embargo degrades relations. This makes disciplined counterattacks and trade
  disruption cheaper than in v34.
- The defense-post fortify-before-attack behavior is a **readable telegraph**: if a Nation is
  spending Defense Posts along the border it is about to hit, the strike/attack is imminent.
  This is a concrete, observable early-warning signal the guide turns into a checklist.
- The economy changes (later savings, income-while-saving, coastal port bias, SAM
  upgrades) mean a Nation's gold/structure build is less predictable early but more
  SAM-dense late, so the exposure window is *late-midgame*, not opening.

## Limitations and confidence

- The v0.35.0-beta1 values are **beta** and can change before the v0.35.0 final release; the
  guide states this boundary explicitly.
- Community sources (Reddit/YouTube) are qualitative and used only to frame the player
  question and to confirm the shipped behavior matches community expectation; no numeric
  claim in the guide rests on them.
- All numbers trace to the tagged `fac309acc` / `ab5cc61` source, not to inference.
- RSS access was rate-limited during collection; the top threads were re-opened individually
  and the most relevant thread (the v35 132-PR analysis) was read in full.
