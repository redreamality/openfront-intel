# Community source pack — ffa-trapped-middle (2026-09-28)

## Decision intent and version boundary

This pack supports one player decision in Free-For-All midgame play: **when your
position is "trapped middle" — wedged between two or more neighbors who are about as
strong as you, so that attacking either of them leaves you exposed to the others and
holding still lets everyone on your border stay on the growth curve and keep getting
stronger — what to do instead of the reflex move.** It does not reteach how to pick a
spawn, how to read troop ratios, how to place a Defense Post, or how to price a MIRV,
and it does not replace the late-game endgame read. It answers the FFA question of
*what a middling border position is actually worth, and which of the four visible
moves — attack the weakest neighbor, hold and let everyone grow, pick an axis of
alliance, or trade land for time — is correct before the numbers flip against you.*
The version boundary is the released v34 line; the numbers the guide prices the
decision against come from the tagged v0.34.20 source (the latest non-TEST release as
of access date) and the site's generated `formulas.json`, which is generated from the
same source tree.

The community question is consistently phrased as "why do I keep getting rolled when
my neighbor is about my size," "how do I survive the midgame when everyone around me
is growing," and "I'm stuck in the middle with three people about as strong as me —
what now." The recurring community answers split along two axes: attack the weakest
first (the Meta_Mushroom pattern), or hold Gold and a defense line and wait for the
two neighbors to eat each other (the philippzk67 pattern). Both are defensible; the
guide's job is to make the player choose between them explicitly, with the v34 numbers
visible, instead of defaulting to the move they make by instinct.

## Access method and limitations

The four Reddit threads were pre-checked via the public Arctic Shift archive endpoint
(`arctic-shift.photon-reddit.com/api/comments/search?link_id=<id>`), which returns
comment JSON for each thread; direct `www.reddit.com`, `old.reddit.com`, and
`i.reddit.com` URLs returned HTTP 403 (bot wall) and a browser session was refused
by the same wall, so the archive endpoint was the only viable path and was used for
all four threads. All four threads returned full comment content and are used here;
no thread was discarded. The three YouTube watch pages were pre-checked and their
`en` caption (VTT) files downloaded in this run via `yt-dlp --write-auto-subs`;
title, channel, upload date, duration, and view count metadata were extracted from
the same `yt-dlp` call. Automatic captions can mistranscribe game terms (for example
"timing" is sometimes rendered as the surrounding commentary rather than the named
tactic), so the analysis uses captions for timestamped player behavior and stated
strategy, never as numeric authority. No numeric claim in this pack is taken from a
Reddit comment or a video caption; every rule, cost, and version boundary comes from
the official release, the tagged v0.34.20 source, or the site's generated formula
data.

## Official first-hand sources

1. **OpenFront `v0.34.20` release**, published 2026-09-26 (tag `feba4a51`):
   <https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.20>. This is the
   public boundary for the v34 stable line that the guide prices the trapped-middle
   decision against; the release body covers lobby and naval-render hardening only,
   so no gameplay-rule or formula change is introduced between the v34 line's
   structural releases and this tag.

2. **OpenFront `v0.34.20` tagged source — `Config.ts`**:
   <https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/core/configuration/Config.ts>.
   This anchors the troop-side of the trapped-middle math: the troop growth rate
   `toAdd = (10 + troops^0.73 / 4) × (1 − troops / maxTroops)`, the troop cap base
   and the per-City `+250,000` troop-cap step, and the attack-loss ratio ladder
   (`within(defender/attacker, 0.6, 2)` for per-tile attacker loss scaling at
   `0.463 + 0.0039 × defender-per-tile`, with the speed `within(…, 0.82, 7.5)`
   window) that determines whether a middling attacker can take a middling
   defender without losing the follow-up.

3. **OpenFront `v0.34.20` tagged source — `AttackExecution.ts`**:
   <https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/core/execution/AttackExecution.ts>.
   This is the execution path for the move the guide prices: per-tile attacker
   loss, defender loss equal to its average per-tile troop count, and the
   second-slope speed change above the 20× ratio window.

4. **OpenFront `v0.34.20` tagged source — `units.json` / `formulas` (Defense Post bonus, Betrayal penalty, Large-attacker bonus, Large-army sigmoid)**:
   <https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/core/execution/Util.ts>.
   Defense Post multiplies attacker damage taken and slows attack speed within 30
   tiles; the Betrayal penalty halves defense and cuts speed by 20% for 30 seconds
   and is the cost of the "ally then break" move the guide lists as a failure mode;
   the Large-attacker bonus `(100k/tiles)^0.7` for attackers above 100k tiles is
   the term that makes a held border position more valuable the longer you hold
   it (because a bigger held position attacks cheaper per tile).

5. **Site-generated `src/data/formulas.json` (generated from the same tagged source)**:
   <https://github.com/openfrontio/openfront-intel/blob/main/src/data/formulas.json>.
   Used to cross-check every number the guide states, so the guide can cite the
   site's own generated formula database as the reader-visible authority without
   re-deriving the math from source.

## Reddit threads (4)

1. **`1ok7ymj` — "noob tip request"** (r/OpenFront), accessed 2026-09-28:
   <https://www.reddit.com/r/OpenFront/comments/1ok7ymj/> — the OP asks for noob tips
   and the top-voted answers form the community's default "how do I win FFA" playbook.
   Direct on-theme content: **Meta_Mushroom** (score 3) — "If you always end up
   between a bunch of people as strong as you, then you might need to work on your
   early game. Ride the growth curve and go for annexations. I usually have 1–2 people
   a lot weaker than me, and I grab their early cities/ports. If I'm unable to take
   anything early on, I start an alliance with everyone except the weakest player on
   my border, and wait for them to attack someone else. I send about 50% of my troops
   at them when my population is about 60% (staying on the growth curve)." This is the
   pack's anchor for the **attack-the-weakest-first** branch of the trapped-middle
   decision, with the 60%-of-max-troops and 50%-of-troops-sent numbers as the
   community's working heuristic. Also: **horatiobanz** (score 2) on spawn choice
   and the "ally with anyone you can't immediately beat" rule, and **No_Caterpillar2687**
   (score 3) on "ally with anyone you can't immediately beat, and never betray" plus
   the trademax-on-homogeneous-maps fallback.

2. **`1no19k3` — "how to even survive until midgame"** (r/OpenFront), accessed 2026-09-28:
   <https://www.reddit.com/r/OpenFront/comments/1no19k3/> — the OP is midgame-dead
   against same-size neighbors. **Big_Donkey_254** (score 6) — "this game is very
   snowbally and if you aren't constantly growing and eating up weaker players you'll
   eventually become the weaker player that gets eaten up. aka you can't 'just
   survive'," which is the pack's anchor for why holding still in a trapped-middle
   position is not free: every tick of stillness is a tick where the neighbors'
   troop growth curves stay above yours. **sydney-speaks** (score 3) — "My problem is
   when someone who is the same size as me, with the same number of cities and troops
   attacks and steamrolls me inexplicably," which is the pack's anchor for the
   ratio-clamp effect: at defender/attacker ≈ 1.0 the per-tile loss window
   (`within(…, 0.6, 2)`) is in its flat middle, so a same-size attack is the most
   expensive per tile the attacker can pay, and the defender's counter at the same
   ratio is equally expensive — the "trapped" feeling is the ratio math, not a
   random roll. **Choice-Knee1759** (score 2) on boating mechanics (troops regenerate
   during the boat ride, so a middling defender can be hit with more than its max
   troop count), and **AnonymousArizonan** (score 1) on "your opponent smells
   weakness and goes in — usually with a significant troop advantage and a lot in
   reserve," which is the pack's anchor for the perception side of the trapped
   position: a middling player who visibly holds a border is read as the soft target
   by every neighbor, not just the one being held.

3. **`1qwiace` — "help me to understand how to win"** (r/OpenFront), accessed 2026-09-28:
   <https://www.reddit.com/r/OpenFront/comments/1qwiace/> — the OP asks for a win
   framework. **philippzk67** (score 11) — "of my neighbor, would I attack player X?
   If let's say your main neighbor just betrayed someone else, you're safe and could
   even go really low on troops attacking someone else. But if he's really strong, and
   you're a juicy target, then do not attack the guy next to you that is slightly
   weaker. This is where it makes sense sometimes to have a lot of cash at hand,"
   which is the pack's anchor for the **perception / hold-and-bank-Gold** branch of
   the trapped-middle decision: holding Gold and a visible deterrent changes which
   neighbor attacks you next, and that choice is worth more than the immediate land
   gain from attacking the weakest neighbor. **pinkcuppa** (score 3) — "Once you
   realise the timing, tempo and work your alliances well and how to scale, the game
   is very simple," on the timing side of the decision. **xx420mcyoloswag** (score 2)
   on "if one player has gold for a hydro you should have enough for one too" as the
   bank-Gold heuristic.

4. **`1nh9m9b` — midgame / growth-curve thread** (r/OpenFront), accessed 2026-09-28:
   <https://www.reddit.com/r/OpenFront/comments/1nh9m9b/> — the OP asks how to keep
   growing in the midgame. **Blubbertube** (score 12) — "In an ideal world you would
   want to attack to perfectly maintain max growth. You can't do that because everyone
   else will grab all the land first. You have to balance getting a reasonable growth
   rate and grabbing a reasonable amount of land. The tighter the area around you the
   more you need to attack to grab land while you can," which is the pack's anchor for
   the **growth-rate vs land** trade that defines the trapped-middle position: a tight
   border forces faster land-grabbing, which is exactly the move that exposes you to
   the neighbors you're not attacking. **7sidedmarble** (score 4) on spawn distance
   as the number-one variable, and **GruePwnr** (score 2) — "Set attack size to 30%
   and attack whenever your growth rate goes past the peak and down into yellow
   numbers. This will give you a balance between land and population expansion," as
   the community's working tempo number for the land-vs-growth loop. **lieding**
   (score 3) — "You can build defenses to hold the front lines and ask for help from
   your allies … Or you can wait until the person you are fighting a border with is
   attacked elsewhere. Or you can become their ally," which is the pack's anchor for
   the **axis-of-alliance** branch: the third move available to a trapped-middle
   player is to make one of the neighbors your ally so the border on that side stops
   being a front, leaving a single front to manage.

## YouTube videos (3)

1. **Enzo Plays — "How to Beat Impossible Mode on World (Openfront.io Tutorial)"**
   (2025-05-26, 15:11, ~8,144 views):
   <https://www.youtube.com/watch?v=bQBij54QM9w>. On-theme caption content (accessed
   2026-09-28, `en` auto-caption VTT, 8,827 words cleaned): the narrator calls out
   that "there might have been an update that changes some of these attack ratios"
   mid-tutorial, which is the pack's anchor for the version-boundary caveat the
   guide's version section carries (the community's own tutorial content is stale
   against the current v34 line, so the guide prices the decision from tagged source
   rather than from tutorial commentary). The expansion pacing ("get a city when I
   have the cash for it, keep expanding") is the pack's anchor for the growth-curve
   tempo the trapped-middle decision is made against.

2. **Risk4Ever — "How To Win At OpenFront.io - Multiplayer Guide For Beginners"**
   (2025-03-06, 11:49, ~7,982 views):
   <https://www.youtube.com/watch?v=1fpszw34sQg>. On-theme caption content (accessed
   2026-09-28, `en` auto-caption VTT, 6,839 words cleaned): "simply minimize attack
   ratio with 30 … in the beginning of a game i simply like to use right where my
   attack [ratio is]" — the pack's anchor for the community's default 30% attack-size
   tempo, the same number `GruePwnr` gives in `1nh9m9b`. "Usually it's best to
   [spawn] the green place in which is easier to expand but if you play a lot with
   [more] players then you should [be] going for places in which [you have more
   options]" — the pack's anchor for the spawn-choice branch that determines whether
   the player ends up trapped-middle at all.

3. **Enzo Plays — "This Tactic is ESSENTIAL for V28 | OpenFront.io"**
   (2025-12-23, 31:07, ~2,393 views):
   <https://www.youtube.com/watch?v=xgD7a7TvcZs>. On-theme caption content (accessed
   2026-09-28, `en` auto-caption VTT, 18,557 words cleaned): "he did a timing that
   wasn't good … let this go down" at 00:25:43, the pack's anchor for the tempo
   failure mode the guide's failures section describes (a middling player who
   mis-times the land-grab against a same-size neighbor gets the follow-up attack
   from the third neighbor while the first is still resolving). "He's expanding a
   little slow … this is something I do kind of worry [about]" — the pack's anchor
   for the read the guide asks the player to make on each neighbor (is this neighbor
   expanding slow enough that the trapped-middle position is a temporary state, or
   is it a permanent one?).

## Cross-source synthesis

The four threads and three videos converge on a single structure for the
trapped-middle decision. The **attack-the-weakest-first** branch (Meta_Mushroom in
`1ok7ymj`, corroborated by the 30% tempo in `1nh9m9b`/Risk4Ever) is correct when the
weakest neighbor is meaningfully below the other two and the player's troop count is
still on the growth curve; the **hold-and-bank-Gold** branch (philippzk67 in
`1qwiace`) is correct when the two neighbors are about as strong as each other and
the player's deterrent (Gold, a Defense Post line, or a ready Silo) changes which
neighbor attacks next; the **axis-of-alliance** branch (lieding in `1nh9m9b`) is
correct when one neighbor has already been weakened by fighting a third neighbor and
can be made into an ally at low betrayal cost; and the **hold-and-wait** branch
(Blubbertube in `1nh9m9b`, the "can't just survive" warning in `1no19k3`) is the
failure mode the guide prices: holding still while the neighbors stay on the growth
curve is a losing default, not a neutral one. The v34 numbers (troop growth curve,
attack-loss ratio ladder, Defense Post multiplier, betrayal penalty, large-attacker
bonus) are the terms that let the player pick between the four branches explicitly
instead of by instinct, and the guide's two scenarios are built on exactly this
four-branch structure.

## Version boundary notes

- The v34 line's troop growth formula `toAdd = (10 + troops^0.73 / 4) × (1 − troops /
  maxTroops)` is unchanged across the v34 stable releases; the trapped-middle
  decision is priced against this curve, and any future change to the `0.73`
  exponent or the `10` base shifts the "attack the weakest at 60% of max" heuristic
  and should be re-verified before the guide's numbers are treated as current.
- The attack-loss ladder `within(defender/attacker, 0.6, 2)` and the speed window
  `within(…, 0.82, 7.5)` are the terms that make a same-size (ratio ≈ 1.0) attack
  the most expensive per tile; this is the mechanical cause of the "steamrolls me
  inexplicably" complaint in `1no19k3` and the guide's core ratio explanation.
- The Defense Post `×5` damage and `×3` speed multiplier within 30 tiles is the term
  that makes the hold-and-bank branch viable in the first place; without it a
  middling player holding a border has no cheap way to make the neighbor's attack
  unattractive.
- The Betrayal penalty (defense ×0.5, speed ×0.8, 30s) is the cost term for the
  axis-of-alliance branch: allying with one neighbor and then breaking the alliance
  to attack the other is a real move, but the penalty window is the price of that
  move and the guide's failure section lists it.
- The Large-attacker bonus `(100k/tiles)^0.7` above 100k tiles is the term that
  rewards holding a larger position over time, and is the mechanical reason a
  trapped-middle player who successfully breaks out of the middle into a larger
  position gains an attack-side edge against the now-weakened neighbors.

## Access log

- 2026-09-28 (UTC): all four Reddit threads fetched via Arctic Shift archive endpoint;
  all three YouTube videos' `en` caption VTT files downloaded via `yt-dlp`; title,
  channel, upload date, duration, and view count metadata extracted via `yt-dlp`.
- 2026-09-28 (UTC): `v0.34.20` tag `feba4a51` confirmed as the latest non-TEST release
  (published 2026-09-26); tagged source read for `Config.ts`, `AttackExecution.ts`,
  and the formula-bearing units; site-generated `formulas.json` cross-checked against
  the same source tree.
- Direct Reddit access (www / old / i) returned HTTP 403 at access time; the Arctic
  Shift archive endpoint was the only viable path and was used for all four threads.
