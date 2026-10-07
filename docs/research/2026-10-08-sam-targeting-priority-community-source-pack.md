# Community Source Pack — SAM Targeting Priority

Slug: `sam-targeting-priority`
Access date: 2026-10-08
Target game version: v0.34.24 (latest non-TEST release, published 2026-10-06)
Primary player question answered: "My SAMs are maxed, so why did that nuke land anyway / why did the SAM shoot the wrong bomb?"

## Research summary

The recurring, under-explained problem across the OpenFront community is *why* a
defender's SAMs fail to stop a nuke that is clearly inside their coverage ring.
Players consistently report a big SAM stack stopping a hydrogen bomb and then
letting a cheaper atom bomb through, or a level-5 SAM surviving a hydrogen while
the structures right next to it get clipped. Players reason about the SAM as a
"shield with a radius" — anything inside the circle should be protected. The
actual rule, verified in the v0.34.24 source, is more specific: the SAM does not
simply protect a circle, it *selects one in-flight target at a time by a score*
and fires a single missile at the highest-scoring target. The score is
`typeBonus + distanceBonus + urgencyBonus`.

The three components create a counter-intuitive decision that the community keeps
hitting without a clean explanation. The `typeBonus` is 70,001 for a hydrogen
bomb and 0 for an atom bomb or MIRV warhead. The `distanceBonus` is
`max(0, 200000 − 1000 × distToSilo)`, where `distToSilo` is the Manhattan
distance from the SAM tile to the nuke's target tile — not to the nuke's current
position. The `urgencyBonus` is `max(0, 10000 − timeToExplode × 100)`. The
source comment states the 70,000 offset "balances the distance bonus between
Hydro at 100 and Atom at 30". That is the key: a hydrogen whose target is about
100 tiles from the SAM scores the same distance term as an atom whose target is
about 30 tiles away, so a *near atom* and a *far hydrogen* can produce the same
total, and the hydrogen wins only by the fixed 70,001 offset. An atom whose
target is close enough to the SAM can therefore out-score a hydrogen that is
farther away, and the SAM will fire at the atom. This is exactly the failure
mode players describe — the SAM "chooses wrong" — but it is not a bug, it is the
deterministic scoring the code implements every tick.

The second decision-relevant rule is that SAM detection range is not the firing
range. `getValidTargets` searches `maxSamRange() × 4` (600 tiles) for candidate
nuke units so the SAM can begin tracking early, but the *firing* range is the
level-based `samRange(level) = 150 − 480 / (level + 5)`, starting at 70 tiles for
a level-1 SAM and asymptotically approaching 150. A nuke whose target is outside
the firing range is still *visible* but cannot be engaged until it is within
range, which is why short-range nukes can land inside what looks protected. The
third rule is that the SAM missile travels at 12 tiles/tick while the nuke
travels at 10 (atom/hydrogen), 15 (MIRV carrier), or 22 (MIRV warhead), and the
SAM has a 90-tick cooldown, so it can engage only one supported target per
90 ticks.

The strategic read a player can act on: if the attacker mixes a near atom and a
far hydrogen, the SAM spends its 90-tick engagement on whichever the score picks,
and the other one may land. A defender cannot "stack their way out" of this by
adding SAMs on one tile, because each launcher still picks one target and fires
one missile; they must either ensure every nuke's target is far enough that the
hydrogen offset always wins for the launcher they want to spend on the hydrogen,
or spread launchers so a near atom is intercepted by a different launcher than
the one covering the hydrogen. This is a placement decision (which launcher
covers which incoming target), not a quantity decision, and it is the
decision-changing content of this guide.

## Source inventory

### Official first-party (authoritative for rules/numbers)

1. `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.24`
   - Title: OpenFrontIO v0.34.24 release
   - Recency: latest non-TEST release, published 2026-10-06 (3 days before access date)
   - Player question: what is the current rule set the guide must match
   - Observation: pins the rule set; all scoring constants below read from the
     tag source, not from a later `main` commit (upstream `main` 1d2be864 is
     ahead and contains main-only changes this guide must not claim as shipped).
   - Limitation: release notes are prose; exact constants require reading source.
   - Accessed: 2026-10-08

2. `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/SAMLauncherExecution.ts`
   - Title: SAMLauncherExecution (target selection + scoring)
   - Recency: v0.34.24 tag
   - Player question: which nuke does the SAM fire at first, and why
   - Observation: `computeTargetScore` = `typeBonus(70001 if HydrogenBomb else 0)
     + max(0, 200000 − distToSilo×1000) + max(0, 10000 − timeToExplode×100)`;
     `distToSilo` is Manhattan distance from the SAM tile to the nuke's *target*
     tile; `sortTargets` orders by descending score; `getValidTargets` scans a
     `maxSamRange×4` (600-tile) detection radius for Atom/Hydrogen/MIRV-warhead
     units.
   - Limitation: source is per-launcher; the guide must generalize across a stack.
   - Accessed: 2026-10-08

3. `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/configuration/Config.ts`
   - Title: Config (SAM/nuke constants)
   - Recency: v0.34.24 tag
   - Player question: what are the range/cooldown/speed numbers behind the decision
   - Observation: `SAMCooldown()=90`; `defaultSamRange()=70`;
     `samRange(level)=maxSamRange() − 480/(level+5)`; `maxSamRange()=150`;
     `nukeSpeed`: atom/hydrogen=10, MIRV=15, MIRV warhead=22;
     `defaultSamMissileSpeed()=12`; `defaultNukeTargetableRange()=150`;
     `samUpgradeDuration()=floor(90/2)=45` ticks.
   - Limitation: none for the numbers used.
   - Accessed: 2026-10-08

### Reddit (really opened via pullpush.io archive; reddit.com JSON/HTML is 403-walled from this host)

1. `https://www.reddit.com/r/Openfront/comments/1qr1ysc/sam_exploit/`
   - Title: "SAM Exploit?"
   - Author / created_utc: xlbeutel / 1769769285 (2026-01-29); accessed 2026-10-08 (recency: ~8 months old)
   - Player question: why did a level-20 SAM stack block a hydrogen bomb and then let an atom bomb through that destroyed the stack
   - Observation: OP reports a hydro + atom combo repeatedly piercing a big SAM
     stack; top reply (score 22) frames it as "you counter a giant SAM stack by
     getting enough atom bombs to get through it"; another high reply says the
     atom is fired at by the SAM while the hydro is "destroying the projectile
     before it can reach the atom". This is a direct community instance of the
     typeBonus/distance scoring trade-off the guide explains.
   - Limitation: OP's "exploit"/"bug" framing is not confirmed by the source as a
     bug; the code treats it as deterministic scoring. The thread does not give
     exact scores.
   - Accessed: 2026-10-08

2. `https://www.reddit.com/r/Openfront/comments/1uc8sun/how_nukes_and_sams_work_in_openfront/`
   - Title: "How nukes and sams work in openfront"
   - Author / created_utc: ivalm / 1782096767 (2026-06-21); accessed 2026-10-08 (~4 months old)
   - Player question: how do nukes and SAMs actually work under the hood
   - Observation: a source-referenced explainer with a cost table (atom 750k,
     hydrogen 5M, MIRV 25M+15M/prior) and the practical rule "SAM range is not
     guaranteed protection; a SAM must have a valid intercept tile and enough
     time to fire"; a comment notes a level-5 SAM is not enough to not be edged
     out by a hydrogen. Corroborates the range-vs-detection and valid-intercept
     rules in the source.
   - Limitation: it is a community explainer, not the source; numbers must be
     re-checked against Config.ts (done for this pack).
   - Accessed: 2026-10-08

3. `https://www.reddit.com/r/Openfront/comments/1ui573b/can_someone_explain_why_my_cluster_of_5_sams/`
   - Title: "Can someone explain why my cluster of 5 sams didn't defend against this single hydrogen bomb?"
   - Author / created_utc: pacoman432 / 1782672296 (2026-06-28); accessed 2026-10-08 (~3 months old)
   - Player question: why did a 5-SAM cluster survive a hydrogen but not protect adjacent structures
   - Observation: a score-6 reply explains "level 5 SAM radius = hydro radius, so
     it cannot die to a hydro, but almost anything near it can be if thrown
     right; use more SAMs in different areas for coverage"; several replies say
     level 5 is not enough because you can bypass it with one atom + one
     hydrogen. This is the "SAM survives but adjacent structures get clipped"
     failure mode, driven by the firing range vs the hydrogen blast relationship.
   - Limitation: community estimates of exact level/range boundaries; verified
     against `samRange(level)` instead of taking the reply's numbers.
   - Accessed: 2026-10-08

4. `https://www.reddit.com/r/Openfront/comments/1s5uz4o/sam_stack/`
   - Title: "SAM stack"
   - Author / created_utc: Emergency-Sandwich54 / 1774686970 (2026-03-26); accessed 2026-10-08 (~6 months old)
   - Player question: how many SAMs to outrange a hydrogen / to block 50 spam atoms in 5 seconds
   - Observation: replies converge on "level 5 SAM = hydro range, protects itself
     not the buildings around it", "2× level-25 stacks beat 1× level-50 for
     coverage", and "each SAM shoots ~10/s so 50 stacks lose to 20-30 fast atoms;
     2 stacks of 25 is much harder". This supplies the placement-vs-quantity
     decision the guide turns into a framework.
   - Limitation: "~10 per second" is a community approximation of the 90-tick
     (9-second) cooldown; the guide uses the exact 90-tick cooldown from source.
   - Accessed: 2026-10-08

### YouTube (really opened; metadata + description captured)

1. `https://www.youtube.com/watch?v=d4WNUOQeFc8`
   - Title: "This defense configuration will destroy the meta... | OpenFront.io"
   - Recency: ~1 year old, ~16K views; accessed 2026-10-08
   - Player question: how to build a SAM-net defense that denies nukes on an island cluster
   - Observation: the creator leans on a "SAM net" across a wedge of islands
     (Falklands map) so most islands are out of MIRV reach and the net makes
     nukes "nearly impossible" to get through. Supports the spreading-launchers /
     coverage-over-stack theme.
   - Limitation: map-specific (Falklands); the general principle transfers but the
     map layout does not.
   - Accessed: 2026-10-08

2. `https://www.youtube.com/watch?v=3J0mUsVcvvo`
   - Title: "This TESTED THE LIMITS of the SAM LAUNCHER! | OpenFront.io"
   - Recency: recent (creator SAM-limit testing); accessed 2026-10-08
   - Player question: how many MIRVs can a SAM stack take
   - Observation: a stress test of a SAM stack against a MIRV burst; frames the
     single-target-per-cooldown limit as the thing that caps a stack's
     interception count, consistent with the 90-tick cooldown in Config.ts.
   - Limitation: MIRV-specific; the scoring detail (typeBonus does not apply to
     MIRV warheads, typeBonus=0) is what makes MIRVs different and must be
     stated, not inferred.
   - Accessed: 2026-10-08

3. `https://www.youtube.com/watch?v=zgB1kySGZmw`
   - Title: "This is the Key to DOOMSDAY Standoffs | OpenFront.io"
   - Recency: recent (late-game standoff content); accessed 2026-10-08
   - Player question: how to win the endgame standoff when nukes are on the board
   - Observation: late-game standoff play where nuke coverage and SAM placement
     decide the terminal push; supports the "which launcher covers which
     incoming target" placement decision in the endgame context.
   - Limitation: content is endgame-flavored; the scoring rule is version-stable
     and applies earlier too.
   - Accessed: 2026-10-08

## Notes for the guide

- All numbers above were re-verified against the v0.34.24 tag source, not the
  community approximations. Community numbers (e.g. "~10 per second") are used
  only as context, never as the stated rule.
- Upstream `main` (1d2be864) is ahead of v0.34.24; main-only changes (e.g. the
  1d2be864 "smarter nation AI", 885df298d "new chat phrases") are NOT shipped and
  must not be claimed as current in this guide.
- The guide must state, not assume, that typeBonus applies only to
  `UnitType.HydrogenBomb` (70,001) and is 0 for atom bombs and MIRV warheads —
  this is the single most counter-intuitive rule and the one the community
  mis-reasons about most.
