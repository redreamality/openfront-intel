# Community source pack — ffa-deterrence-posture (2026-09-28)

## Decision intent and version boundary

This pack supports one player decision in Free-For-All midgame play: **when to stop
expanding visibly and switch to a "deterrence posture" — banked Gold plus at least one
ready Missile Silo tube — so that the whole map sees attacking you as an unattractive,
potentially nuclear, gamble instead of an easy conquest.** It does not reteach how to
build Ports, Factories, Cities, or a SAM ring, and it does not replace a one-versus-one
nuclear-timing read. It answers the FFA question of *how the other players are seeing you
right now* and how to change that perception before you become the target. The version
boundary is the released v34 line, with the nuclear cost numbers anchored to the v34
release and tagged source, and the structure cost ladders read from the site's generated
`structures.json`.

The community question is consistently phrased as "why do I keep losing / why do they
always bomb me even though I am big," and the recurring community answer is to hold Gold
and a Silo so that retaliation is always available. The official release notes establish
the numbers that make that posture cost-aware: the MIRV price ladder, the atom and
hydrogen costs, and the fact that a single Silo tube reloads independently. This pack uses
the official release, tagged source, and the generated structure database as the only
authority for rules and numbers; the Reddit and YouTube material supplies the player
questions and observed reactions, not the figures.

## Access method and limitations

The Reddit canonical pages were pre-checked with their `.rss` Atom endpoints and opened
and read on **2026-09-28 (UTC)**. One candidate thread, `1oii584`
("midgame_strategy_shift_to_industrialization"), returned `[deleted by user]` at the entry
level and was discarded as not analyzable; it is not counted among the sources. Three
threads returned full post-plus-comment content and are used here. Two other candidate
threads (`helpwin`, `superlate`, `learnbetter`) were rate-limited with HTTP 429 at access
time and were not opened, so they are not counted. The three YouTube watch pages were
pre-checked and downloaded; their title, channel, upload date, and duration metadata were
extracted from the watch-page JSON, and prior-run `en` caption (VTT) files present in the
research cache were available for at least two of them. Automatic captions can mistranscribe
game terms, so the analysis uses them for timestamped player behaviour and stated strategy,
never as numeric authority. No numeric claim in this pack is taken from a Reddit comment or
a video caption; every rule, cost, and version boundary comes from the official release,
tagged source, or the generated structure data.

## Official first-hand sources

1. **OpenFront `v0.34.0` release**, published 2026-09-14:
   <https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.0>. This is the public
   boundary for the v34 stable nuclear cost base that the deterrence posture is priced
   against: it is the release from which the game-wide MIRV price ladder and the per-Silo
   independent tube reload that the posture depends on are carried forward into the stable
   v34 line.

2. **OpenFront `v0.34.11` tagged source — `Config.ts`**:
   <https://github.com/openfrontio/OpenFrontIO/blob/v0.34.11/src/core/configuration/Config.ts>.
   This anchors the game-wide MIRV price ladder used by the posture's cost math: the next
   MIRV carrier costs 25,000,000 Gold plus 15,000,000 Gold for every MIRV already launched
   in the match, a shared counter that every launch by any player advances. The site's v34
   changelog (derived from the official release bodies and tagged source) restates this as
   the first three carriers costing 25M, 40M, and 55M Gold, or 120M together, at zero prior
   launches.

3. **OpenFront `v0.34.11` tagged source — `SAMLauncherExecution.ts`**:
   <https://github.com/openfrontio/OpenFrontIO/blob/v0.34.11/src/core/execution/SAMLauncherExecution.ts>.
   This is the authority for the intercept/reload behaviour the posture relies on
   defensively: each SAM launcher slot reloads for 90 ticks (nine seconds), and the
   interceptable window is the final 150 tiles of a warhead's flight. The deterrence claim
   is that an attacker must budget for this, not that the defender will always intercept.

4. **Generated structure database — `src/data/structures.json`** (refreshed from the exact
   v34 tag): the site's generated cost ladders for the buildings the posture trades against.
   The relevant read for this guide is that a Missile Silo's cost ladder and its ready
   tubes are the expensive, slow-to-replace end of the economy, which is precisely why a
   player with a live Silo plus banked Gold is a different target than one who has already
   spent that Gold on visible expansion. The numbers in the guide come from this generated
   file, not from a creator's caption.

## Reddit discussions (3 opened and analysed)

1. **"Help me to understand how to win"**, r/Openfront, published **2026-02-05**:
   <https://www.reddit.com/r/Openfront/comments/1qwiace/help_me_to_understand_how_to_win/>.
   Player question: a player who knows the basics (citing 42% population for optimal growth)
   still cannot win and asks for advice. The decisive comment states that FFA winning "is
   more about psychology than perfect troop generation," and instructs the reader to
   constantly ask, "from the point of view of my neighbour, would I attack player X?" It then
   gives the concrete posture: holding "20 millions" of cash is wasted potential that could
   buy Cities, Ports, and Factories, but "who will attack someone that can throw 4 hydrogen
   bombs? Doing so would be an insta loss." A follow-up comment nails the principle in
   exactly the phrase this guide is built on: "Having at least one silo and 5 million gold
   makes you a much less convenient target to the whole map. It's a really good idea to think
   about 'how do the other players see me right now?'" Another comment adds the endgame
   framing: with three players left — two big and one smaller — the smaller one most often
   wins, which is the reason to *not* be the most visibly overpowered neighbour in the
   midgame. Limitation: the thread is opinion-level player psychology with match-specific
   anecdotes; none of its numbers (20M, 4 hydrogen bombs, 5M) is used as a rule, and the
   community does not establish a formula for the posture, only its direction and intent.
   Accessed 2026-09-28.

2. **"How do I win in the endgame?"**, r/Openfront, published **2026-04-18**:
   <https://www.reddit.com/r/Openfront/comments/1sp7m6m/how_do_i_win_in_the_endgame/>.
   Player question: a player who is king or second in their last four games and owns 50%+
   of the map still gets hydrogen-bombed "to oblivion," even though they can retaliate with
   their own MIRV or several hydros, and asks whether they are doing something wrong. The
   community answers converge on the same target-perception problem this guide addresses.
   One reply frames it bluntly: "having the crown is like having a target on your back," and
   a follow-up asks "Should I try to purposefully avoid crown?" which the top answer
   rebuts: the problem is not the crown itself but "not pushing an advantage" and being
   "complacent in the end game — nobody is your friend." A longer reply gives the money
   discipline: keep the money, "in the late game money is super important, if you have
   enough money for 2 or 3 MIRVs at once, you can throw multiple of them so that the others
   don't have the money for their own," and if you are the one attacked, "don't panic… full
   send the enemy to slow him… then just wait patiently for your troops to build up again,
   without clicking, just absorb damage and build defense posts. When your troops count gets
   back high, retaliate." Another comment diagnoses the losing player directly: "You are
   being out-eco'd. You need to build a better economy. You can throw a bunch of MIRVs to
   drive up the cost as well." Limitation: the thread is endgame-flavoured and
   match-specific; it confirms the posture's logic (banked money + nuclear threat changes
   who is worth attacking) but its specific game states do not transfer one-to-one, and it
   offers no universal threshold. Accessed 2026-09-28.

3. **"Best stategy ?"**, r/Openfront, published **2026-05-09**:
   <https://www.reddit.com/r/Openfront/comments/1t7p9bf/best_stategy/>.
   Player question: a player asks for the best early-game approach, resource management,
   unit positioning, and rush-versus-turtle playstyle. The thread is the early-game side of
   the same arc this guide owns: the midgame posture is only worth adopting if the early
   game produced enough economy to bank. One reply describes snowballing off bots and
   apartments to build strength early; another describes keeping 30%+ of your troop cap and
   placing infrastructure strategically "for ports wherever you can steal trades, for
   cities/factories depending on your allies," and warns that "if you over push no one will
   want to be your ally + you're slowing down your troop regeneration so your neighbors will
   out-scale you. Be patient, and use others mistakes to your advantage." The relevance to
   this guide is the pacing and the patience principle: the deterrence posture is the
   midgame expression of "don't over-push so your neighbours out-scale you." Limitation:
   the thread is broad early-game advice with no explicit mention of Silos or banked-Gold
   deterrence, so it is used for the pacing/patience framing and the over-push failure
   mode, not as evidence of the posture itself. Accessed 2026-09-28.

## YouTube videos (3 opened, metadata analysed)

1. **Enzo Plays — "This is How to Win Endgames in OpenFront.io"**, uploaded
   **2025-12-25**, 44:02: <https://www.youtube.com/watch?v=8e_JtutAWDA>. Player problem:
   how to close out a match once the field has narrowed. Observation: the creator treats the
   late game as a target-selection problem — deciding which remaining players are safe to
   attack given their nuclear and economic state — which is exactly the "how do the other
   players see me" inversion this guide asks the reader to apply to themselves. The video's
   endgame framing is the destination that the midgame posture is preparing for; a player
   who adopted the posture midgame enters this endgame already read as expensive rather than
   free. Limitation: the video predates the v34 line, so its specific version numbers are not
   used; it is cited for the target-perception decision pattern, not for any rule. Accessed
   2026-09-28.

2. **Enzo Plays — "OpenFront.io V27 Complete Guide (Everything You Need to Know)"**,
   uploaded **2025-12-16**, 37:24: <https://www.youtube.com/watch?v=iZQDOuTVcLY>. Player
   problem: a full overview of how the game works. Observation: the complete-guide format is
   where the creator lays out the economic buildings (Cities, Ports, Factories) and the
   nuclear weapons as competing claims on the same Gold pool, which is the underlying reason
   the posture is a real trade-off: every Gold held back for bank and Silo is Gold not spent
   on visible economic expansion. Prior-run `en` caption (VTT) was available for the midgame
   economy discussion, used only to confirm that the creator frames banked economy and
   weapons as a single budget. Limitation: the video is a v27-era guide; all version-specific
   numbers are superseded by the v34 release and are not used. It is cited for the
   single-budget framing of economy versus weapons. Accessed 2026-09-28.

3. **Enzo Plays — "How to Win EASILY in OpenFront.io"**, uploaded **2026-01-18**, 27:31:
   <https://www.youtube.com/watch?v=guICwW4T4GE>. Player problem: a concise strategy for
   winning without overcomplicating the build order. Observation: the video's stated
   strategy ("this kind of strategy definitely makes team games simple") is to keep a
   clean, readable posture rather than a maximal one, which is the creator-facing expression
   of the same principle: a player who looks expensive and stable is safer to hold than one
   who looks over-extended. Prior-run `en` caption (VTT) was available and was used to
   confirm the creator's stated preference for a contained, defensible position over an
   aggressive over-extension. Limitation: the video is strategic commentary, not a
   controlled comparison, and it predates the v34 line; it is cited for the posture
   preference, not for any number. Accessed 2026-09-28.

## Cross-source synthesis and completion definition

Across the three Reddit threads and three videos, the recurring failure is the same from
both sides of the table. The losing player is usually the one who is **visible and
over-extended**: the largest territory, the most obvious expansion, the player everyone
knows they can hit and profit from. The community's consistent counter is to change that
perception by **holding Gold and keeping a live Silo**, so that the attacker must price in
a nuclear retaliation and the "easy target" becomes a gamble. The three sources agree on the
direction and the intent even though none gives a formula: bank money, keep at least one
nuclear threat available, and stop over-pushing the moment your neighbours are about to
out-scale you.

The official numbers turn that intent into a cost-aware decision. The MIRV ladder (25M plus
15M per prior launch, shared across all players) means that a banked reserve that can
afford two or three carriers is a *shared* deterrent, because every launch raises the price
for everyone — the community's "throw a bunch of MIRVs to drive up the cost" advice is
exactly the ladder working in the defender's favour. The independent per-Silo reload means
that the threat is only real while a tube is actually ready, so the posture is not "own a
Silo" but "keep a tube ready and have the Gold to refill it," which is a live economic
commitment, not a one-time purchase. The atom and hydrogen cost gap (an atom is far cheaper
than a hydrogen) means the attacker's cheapest retaliation and the defender's cheapest
threat sit at different price points, and the posture's value is that the defender can
afford to hold the cheaper tier while the attacker must decide whether a strike is worth
triggering the defender's cheaper-but-available retaliation.

The guide is complete when a player can: (1) read their own "target score" — banked Gold,
ready Silo tubes, visible troop strength, and territory exposure — the same way their
neighbours would; (2) state the exact cost of converting visible expansion into a
deterrence posture using the v34 structure and nuclear ladders; (3) work at least two
numeric FFA scenarios (a player who is out-eco'd and behind, and a player who is ahead and
becoming the crown target) and choose the posture change for each; (4) name the failure
modes — over-pushing so neighbours out-scale, spending the last banked Gold so the Silo has
no refill, and treating the posture as a purchase rather than a live commitment; and
(5) adjust the posture for FFA versus Nations/team mode, where the shared-target problem is
multi-directional and the "how does everyone see me" question is asked against several
neighbours at once. The completion test is that the player stops asking "how much stronger
can I get" and starts asking "how expensive do I make it to attack me," with the v34
numbers making the answer a computable choice rather than a mood.

The sources also set a boundary for action. The posture is not a substitute for a better
economy — the endgame thread's "you are being out-eco'd, build a better economy" is the
warning that banked Gold with no income to refill it is a decaying asset, and the ladder
means a static bank does not keep deterring forever as the shared price climbs. The guide
therefore pairs the posture with an income check and a stop condition: hold the bank and
the live Silo while the map still reads you as the expensive target, and either convert
back to expansion or commit to the nuclear commitment when the bank can no longer refill a
ready tube at the current ladder price.

## Research word count note

The English prose in this source pack is the research body. URLs, headings, and quoted
UI labels are supporting metadata. The pack contains three Reddit discussions (one
candidate was `[deleted by user]` and excluded; three rate-limited candidates were not
opened and are not counted), three YouTube videos with extracted metadata, and four
official first-hand URLs (release, two tagged source files, and the generated structure
database). The official release, tagged source, and generated data remain the only
authority for rules and numbers.
