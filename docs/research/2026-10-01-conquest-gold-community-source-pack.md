# Conquest Gold community source pack

Access date: 2026-10-01. Version boundary: official non-TEST Release `v0.34.21`, tag commit `d7075bface21e6835fadb7a0d0025455f8bc358a`.

## Research question and evidence boundary

The player question is not merely "how much Gold does conquest pay?" It is the decision question: **when should a player spend the troops and accept the new border required to finish a Bot, Nation, active Human, or apparently inactive Human?** The community material repeatedly shows players waiting for a weakened target, racing another player for the remaining Cities, or deciding that the visible prize is too small to justify more commitment. That evidence establishes the need for a target-classification and finish-cost framework. It does not establish the payout formula.

All numerical rules in the guide therefore return to the official `v0.34.21` tag and its dedicated tests. Community statements about profitability, target strength, stored Gold, buildings, or timing remain observations from particular matches. They are not treated as universal mechanics. In particular, no Reddit post or YouTube caption is used to prove the full Bot/Nation transfer, the half-Human transfer, integer rounding, or the zero-transfer gate for a Human who never attacked.

## Reddit discussions actually opened and analyzed

### 1. Insane baikal speedrun (9:43)

- URL: https://www.reddit.com/r/OpenFront/comments/1wu1pnh/
- Title: `Insane baikal speedrun (9:43)`
- Date / relative age: 2026-09-30 UTC; about one day old at access.
- Player question: What sequence of weakened targets lets a player convert a crowded Baikal match into a fast finish?
- Observation: The author reports absorbing 12 Cities after two eastern players full-sent each other, then taking 30 Cities after another fight and nuclear betrayal left two western players with no troops. The author next swept a player who had spent all troops on somebody else. The recurring decision is to let other combat create a cheap finishing window, then secure the land and structures before another survivor can do so. This supports a guide that prices the final commitment and third-party contest rather than reading the target's original size.
- Limitation: This is a self-reported speedrun plus replay link and image, not a controlled test of conquest Gold. It does not expose the defeated balances or prove which player type paid what amount. It is used only for target timing, cleanup pressure, and the risk/reward language of taking the finish.
- Accessed: 2026-10-01. The canonical Reddit URL returned HTTP 200 in preflight; post text was read through the Arctic Shift exact-ID endpoint after broad keyword search proved unreliable.

### 2. How do I win the late game?

- URL: https://www.reddit.com/r/OpenFront/comments/1wojrbn/
- Title: `How do I win the late game?`
- Date / relative age: 2026-09-23 UTC; about one week old at access.
- Player question: Why did a playable late-game position fail, and which target should have been finished before it recovered?
- Observation: The detailed replay feedback repeatedly identifies missed windows rather than a single build-order error. It points to a free City that another player claimed, argues that the player attacked Nations without enough harvestable value, and later identifies a moment when a rival fell to roughly 700k troops but was allowed to recover. The comment also shows the other side of the finish: removing one player improved the author's position, yet the new middle position and weak economy remained dangerous. That directly supports treating the reward, the last-tile race, and the resulting border as one decision.
- Limitation: The comments are player analysis of one replay and contain many strategic opinions, including economy and nuclear advice that the conquest-Gold guide does not adopt as rules. Approximate troop and cash observations are replay commentary, not source-of-truth game constants. No comment proves the payout multiplier.
- Accessed: 2026-10-01. Post and comment bodies were read from Arctic Shift by exact post ID and `link_id`; the canonical URL is retained for readers.

### 3. Simple guide on how to win

- URL: https://www.reddit.com/r/OpenFront/comments/1vjvm8p/
- Title: `Simple guide on how to win`
- Date / relative age: 2026-08-09 UTC; about seven weeks old at access.
- Player question: How should a player choose attacks across early, middle, and late game without losing the ability to snowball?
- Observation: The author advises attacking Humans of similar or greater size only after they are weakened or occupied, and says that much midgame infrastructure is gained through conquest. Even though the post is broad, those two points reveal the unresolved player decision behind this topic: conquest can be economically valuable, but only after another event has lowered the finishing cost. The post also emphasizes patience for an attack window, which fits a framework that can return "wait" when hidden balance, Human activity, or third-party ownership remains uncertain.
- Limitation: This is one experienced player's general guide. It contains numerous prescriptive figures and tactics that are not validated here, and its use of "conquest" does not distinguish captured structures from transferred Gold. The final article must not turn those opinions into official payout rules.
- Accessed: 2026-10-01 through the canonical URL preflight and Arctic Shift exact-ID body.

## YouTube videos actually opened and analyzed

### 1. How to Dominate the Early Game in OpenFront.io

- URL: https://www.youtube.com/watch?v=fRP48Dl3Cnw
- Channel: Enzo Plays.
- Date / relative age: 2025-10-15; about eleven and a half months old at access.
- Player question: When should a player stop expanding blindly and finish a Bot at low cost?
- Observation: From about 01:19 the narration waits for a troop window rather than attacking every available Bot. Around 02:01 it acts after a Bot has committed troops and is temporarily weak. The useful signal is not a universal troop threshold: it is that the finishing cost changes after the target spends force elsewhere, so the same land can move from "wait" to "take" without any change to its nominal size.
- Limitation: The video predates the current tag and covers early-game play, not the anti-idle Human transfer branch. Its automatic English captions were checked for the cited segment, but no number in the captions is treated as an official mechanic.
- Accessed: 2026-10-01. Watch page metadata and English automatic subtitles were downloaded and inspected; subtitle cache remains outside the repository at the automation cache path.

### 2. How to Snowball Every OpenFront Game - Best Early Game Guide

- URL: https://www.youtube.com/watch?v=Z0gUv3gyfms
- Channel: Sinful73.
- Date / relative age: 2026-07-19; about ten weeks old at access.
- Player question: Which war produces a profitable snowball instead of a long drain?
- Observation: At about 08:43 the video recommends selecting a player who is already losing. Around 09:13 it stresses completing the elimination before the target recovers, and at 09:17 summarizes the idea as "Quick wars are profitable." This is the clearest community statement for the guide's finish-cost side: a reward cannot justify an open-ended war, while a controlled last phase can convert a weakened target before a rival or recovery changes the inputs.
- Limitation: "Profitable" is the creator's strategic judgment, not a promise about transferred Gold. The video does not distinguish Bot, Nation, attacked Human, and never-attacked Human, so it cannot supply the guide's payout table. Only the decision context and player vocabulary are retained.
- Accessed: 2026-10-01 through the watch page and verified English automatic subtitles.

### 3. How Speed Run OpenFront.io

- URL: https://www.youtube.com/watch?v=Gcrg8hL4C9I
- Channel: Enzo Plays.
- Date / relative age: 2025-09-24; just over one year old at access.
- Player question: During a speedrun, when is a remaining pocket worth contesting for its City, Port, land, or last Gold?
- Observation: Around 02:08-02:30 the player evaluates a contested cleanup in terms of City, Port, and "the last of the gold," then explicitly treats roughly 44k Gold as too small to justify excessive commitment. Near 05:08 the run again closes a weakened target quickly. This supplies a concrete player-facing contrast between nominal loot and opportunity cost: a small payment can be ignored when the contest costs tempo, while land or a structure can still justify the finish for a different reason.
- Limitation: The match is an old speedrun and the spoken 44k is a momentary observation, not a payout coefficient or guaranteed balance display. The guide may use the idea of a conservative range but must not promote this one match value as a threshold.
- Accessed: 2026-10-01 through the watch page and verified English automatic subtitles.

## Official first-hand OpenFront sources

### Formal Release boundary

- URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.21
- Title: `v0.34.21`.
- Date / relative age: published 2026-09-30 UTC; current formal non-TEST Release at access.
- Player question answered: Which immutable public version should own the article's present-tense claims?
- Observation: The Release fixes input, login-session, labeling, and dependency issues. It does not claim that conquest Gold changed in this patch. The guide must therefore say "verified at v0.34.21," not "introduced in v0.34.21."
- Limitation: The Release body alone does not document the payout branches; tagged implementation and tests below provide that evidence.
- Accessed: 2026-10-01.

### Type-based payout classifier

- URL: https://github.com/openfrontio/OpenFrontIO/blob/d7075bface21e6835fadb7a0d0025455f8bc358a/src/core/configuration/Config.ts#L735-L743
- Title: `Config.ts` - `conquerGoldAmount()`.
- Date / relative age: immutable v0.34.21 tag commit.
- Player question answered: What proportion of the remaining balance is considered for each defeated player type?
- Observation: Bot and Nation return the full balance; the other types in this path return half through integer division. This owns the 100% and 50% claims and the rounding-down boundary.
- Limitation: This function does not contain the Human zero-attack gate; reading it alone would incorrectly imply that every Human pays half.
- Accessed: 2026-10-01 from the official tagged source.

### Transfer handler and anti-idle Human gate

- URL: https://github.com/openfrontio/OpenFrontIO/blob/d7075bface21e6835fadb7a0d0025455f8bc358a/src/core/game/GameImpl.ts#L1386-L1427
- Title: `GameImpl.ts` - conquest Gold transfer.
- Date / relative age: immutable v0.34.21 tag commit.
- Player question answered: When does the classified amount actually move to the conqueror?
- Observation: The handler checks a defeated Human's sent-attack statistic. At zero, it sets the considered and captured values to zero, shows the no-Gold message, and skips the balance removal used for eligible transfers. Otherwise it adds the classified amount to the conqueror and removes the defeated eligible player's balance. This owns the anti-AFK boundary and prevents the guide from describing mere online presence, building, defending, or taking damage as qualifying activity.
- Limitation: Internal state can establish the rule but does not mean an opponent can see the exact statistic live. The guide must preserve uncertainty and use a zero-to-half planning range when Human activity is unconfirmed.
- Accessed: 2026-10-01 from the official tagged source.

### Dedicated regression tests

- URLs: https://github.com/openfrontio/OpenFrontIO/blob/d7075bface21e6835fadb7a0d0025455f8bc358a/tests/ConquerGold.test.ts#L20-L40 and https://github.com/openfrontio/OpenFrontIO/blob/d7075bface21e6835fadb7a0d0025455f8bc358a/tests/ConquerGold.test.ts#L62-L99
- Title: `ConquerGold.test.ts`.
- Date / relative age: immutable v0.34.21 tag commit.
- Player question answered: Which outcomes are explicitly protected by the official test suite?
- Observation: The tests cover full Bot Gold, full Nation Gold, half Gold for an attacked Human, and no Gold for a Human who never attacked. They also protect the message and balance behavior around the Human gate. A 10M planning example therefore has three distinct results: 10M from a Bot or Nation, 5M from an eligible Human, and 0 from a never-attacking Human.
- Limitation: Tests prove configured outcomes, not whether a live opponent can estimate the hidden balance or win the last-tile race.
- Accessed: 2026-10-01 from the official tagged tests.

## Cross-source synthesis for the guide

The six community sources converge on one decision pattern: wait until another fight, target expenditure, or positional mistake lowers the finishing cost; then finish quickly enough that the target cannot recover and a third party cannot take the remaining value. They also show why "wealthy target" is an incomplete label. Players discuss Cities, Ports, land, visible Gold, weakened troop counts, and the identity of the player who gets the cleanup. Those are separate benefits and risks. The article should therefore make the payout class one input inside a wider comparison of remaining balance, troop commitment, border geometry, last-tile ownership, and the first purchase after conquest.

The official sources add the rule community shorthand omits. Bot and Nation are full-balance targets. A Human with any recorded outgoing attack is a half-balance target with integer rounding down. A Human with no recorded outgoing attack is a zero-balance target for the conqueror even if passive income or high starting Gold left a large stored balance. That distinction changes a real choice: an 18M apparently idle Human cannot safely be priced as a 9M prize. If the land itself is not worth the troops and new border at a zero payout, the player should wait rather than make survival depend on an invisible activity flag.

The completion test for the guide follows directly from this synthesis. A reader should be able to classify the target, state a conservative remaining-balance range, distinguish observed Human aggression from assumed activity, price the force and exposure needed for the last tile, and name one immediate use for the received Gold. At least two numerical scenarios must show that the payout multiplier cannot rescue a bad border: one full Nation finish with third-party contest, and one Human case where the half or zero gate changes the call. No community-specific number becomes a rule unless the tagged source or tests independently support it.

## Source-count and access audit

- Reddit discussions actually opened and analyzed: **3** (requirement: at least 3).
- YouTube videos with watch metadata and verified English automatic subtitles actually analyzed: **3** (requirement: at least 3).
- Official first-hand OpenFront source groups: **4** (formal Release, payout classifier, transfer handler, dedicated tests; requirement: at least 1).
- Research notes: more than **600 English words**.
- Access recovery: the initial Arctic Shift keyword search returned HTTP 422 with `Timeout. Maybe slow down a bit`. Research recovered by paging without keywords, then using exact post IDs and `link_id` comments. This is an access-method failure, not missing evidence. Canonical Reddit URLs all passed HTTP 200 preflight. All three YouTube watch pages supplied metadata and usable English automatic subtitles.
