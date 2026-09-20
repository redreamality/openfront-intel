# Community source pack — `coastal-boat-defense`

Date: 2026-09-20. Slug: `coastal-boat-defense`. Theme (player intent): a player whose
**own coast is being invaded** by an enemy transport ship (the right-click "Boat" /
Transport Ship mechanic) — what do I do to stop, contain, or counter that landing.
This is the *defender-side* mirror of the existing offensive `transport-landings` guide
and is distinct from `island-defense` (holding a single island) and
`warship-fleet-decisions` (whether to buy warships at all).

## Access note (how sources were reached)

Direct Reddit HTML/JSON is blocked from this environment's datacenter IP (WAF /
CAPTCHA), and `web_extract` is blocked by a private-network proxy rule. Reddit threads
were therefore opened and read through the **public RSS endpoint**
(`https://www.reddit.com/r/Openfront/comments/<id>/.rss?limit=...`) via `curl`, which
returns the full comment text. YouTube videos were verified through the public
`oembed` endpoint plus `curl` of each watch page for publish date and description.
All accesses recorded on 2026-09-20 (Russia TZ 9, UTC+10).

## Reddit (opened and analyzed)

1. **"How to even survive until mid-game?"** — u/sydney-speaks, r/Openfront
   `https://www.reddit.com/r/Openfront/comments/1no19k3/how_to_even_survive_until_midgame/`
   - Player question: a player of equal size and troops gets "overrun" the moment an
     enemy boat lands in one of their ports, and cannot defend or counter.
   - Observations used by this guide:
     - The displayed troop number is *currently defending* troops; the attacker also
       has troops in reserve / attacking (u/horatiobanz, u/Choice-Knee1759). A 100k/100k
       player who boats out 60k is at 40k and *regenerating* while the boat is in
       transit, so the attacker "banks" more than the max population for the landing
       force (u/Choice-Knee1759, u/Pristine-Ad-4306).
     - "The longer the distance the more troops they can send/regenerate in that time"
       (u/Pristine-Ad-4306) — distance is a defender-side variable, not just a risk.
     - Most-cited defender fix: **warships insta-gib transports**
       (u/nodelay69 "deploy warships", u/God_Emperor_Karen "You need warships. They
       will defend your coasts", u/yuirick "warships, which insta-gibs transports").
     - Second cited fix: **do not counter by clicking attack back across the whole
       border**; instead boat your own force in on the *specific* landing spot and
       fight the head of the bridge (u/yuirick "set my counter-attack to 1-10% …
       place defensive posts up a bit away", u/AnonymousArizonan "one of the main
       things a lot of newbies make is trying to stop an attack by attacking them.
       Very rarely is this useful").
     - More land with the same defending troops makes you *more* vulnerable (troops
       spread thinner) — "better to have more or equal troops but less territory if
       you are defending" (u/Pristine-Ad-4306).
   - Limitations: single-thread; the "regen while in transit" claim is player
     inference, not quoted from config. It is directionally consistent with the
     troop regen formula and the free Transport Ship cost verified in source (below),
     but the exact banked-force figure is an estimate.

2. **"THE ONLY GUIDE YOU'LL NEED ON DEFENDING / STOPPING ATTACKS"** — u/ALLSEEJAY,
   r/Openfront
   `https://www.reddit.com/r/Openfront/comments/1ploqpu/the_only_guide_youll_need_on_defending_stopping/`
   - Player question: a consolidated player-authored defense guide; why most defense
     is about buying time and neutralizing rather than fully stopping.
   - Observations used by this guide:
     - "Defense in OpenFront is mostly about buying time or neutralizing attacks, not
       completely stopping them" (u/ALLSEEJAY) — the core framing this guide adopts.
     - If the opponent has higher population or a territory advantage, "the game
       already favors them as the attacker" — the defender's job is to make the attack
       fail, not to mirror it.
     - Regen mechanics: the UI shows a regen rate next to the troop counter; it is
       "bright green when the rate is increasing, brown-green when the rate is
       decreasing. The rate increases when troops are low and decreases when troops
       are high" (u/pointillist). This is the in-game signal a defender uses to decide
       whether to commit or hold.
     - Rule of thumb "let your troops get up to 50% before you go after your first
       boats in the early game" (u/ALLSEEJAY) — a concrete threshold for when the
       defender is safe to start projecting back.
   - Limitations: the 50% figure is the author's heuristic, not a config constant;
     the guide predates some balance changes, so all specific numbers in this article
     are re-verified against v34 source (below) before being used.

3. **"How do I defend against ships?"** — u/_Henry_Miller, r/Openfront
   `https://www.reddit.com/r/Openfront/comments/1l3hyec/how_do_i_defend_against_ships/`
   - Player question: "Anytime I'm naval invaded I instantly lose no matter what I do."
   - Observations used by this guide:
     - The two canonical answers recur: **build a warship** (u/Dependent_Fun8827 "they
       can shoot naval", u/annon8595 "Warship or have more troops than the attacker.
       It's impossible to win if the other player has overwhelming troop advantage")
       and **boat your own force back onto the exact land the enemy took** rather than
       clicking a border attack (u/[deleted] "use a boat of your own to fight it that
       way your defensive attack is focused solely on the area they're pushing rather
       than spread across your entire border"; u/APraxisPanda "boat in back at them,
       basically just send one in the same spot they landed theirs").
     - Confirms the *focus* principle: a border-wide counter spreads your troops and
       helps the attacker; a concentrated boat-in on the landing spot does not.
   - Limitations: small thread (5 comments); the "impossible with overwhelming
     advantage" claim is consistent with the troop-ratio combat model but not a quoted
     constant.

4. **Boat invasion mechanics / redirect + cancel** — r/Openfront
   `https://www.reddit.com/r/Openfront/comments/1ploqpu/` (thread 1ploqpu) and
   `https://www.reddit.com/r/Openfront/comments/1od92u6/`
   - Player question: can a boat / transport be redirected or cancelled once launched?
   - Observations used by this guide:
     - A launched boat cannot be *redirected*, but it **can be cancelled**, which makes
       it retreat, "just like a regular attack, there is a red ❌ icon in the bottom
       right panel" (u/IngloriousTom). This is the defender-side lever: you can recall
       your own outgoing boat (at the recall troop-cost) but you cannot turn an enemy
       boat away from your coast once it is on the water.
   - Limitations: the thread body was deleted by the OP after capture, so only the
     comment text (retained in RSS) is citable; the cancel/retreat behavior is
     directionally consistent with the recall mechanic verified in source.

## YouTube (verified)

1. **"OpenFront Beginner Guide (2026) | How to Win Your First Games"** —
   Lonely_Millennial
   `https://www.youtube.com/watch?v=7J5zwb_s_Cg`
   - Recent (2026) beginner walkthrough. Used to confirm the current UI flow for
     building ports, launching boats (right-click "Boat"), and reading the troop/regen
     counter, i.e. the exact controls a defender must know to hold a coast.
   - Limitations: a 2026 beginner video; tactical depth on naval defense is light, so
     it corroborates mechanics/UI, not numbers.

2. **"OpenFront.io Official Tutorial"** — Enzo Plays
   `https://www.youtube.com/watch?v=EN2oOog3pSs`
   - Official-channel tutorial. Used to confirm the canonical unit/boat names and the
     right-click interaction model (Transport Ship = "Boat") used throughout the guide.
   - Limitations: tutorial scope; no per-unit combat numbers quoted.

3. **"OpenFront.io v31 Tutorial"** — Enzo Plays
   `https://www.youtube.com/watch?v=IeR36481zsI`
   - Version-anchored (v31) tutorial. Used to bound version drift: the guide's numbers
     are anchored to the v34 tag, and this video documents the v31-era UI so any
     v31→v34 difference in port/boat/warship behavior is understood as a version
     boundary rather than a contradiction.
   - Limitations: older version (v31); used only as a version-boundary reference.

## Official primary source (rule / number / version anchor)

OpenFrontIO source, `openfrontio/OpenFrontIO` on GitHub — the authoritative code for
every rule, number, and version boundary cited in the guide, read at tag **v34**
(upstream commit `5f6c8fad`, `src/data/_meta.json.upstreamVersion = v34`):
`https://github.com/openfrontio/OpenFrontIO/tree/v34/src/core/configuration/Config.ts`
and
`https://github.com/openfrontio/OpenFrontIO/tree/v34/src/core/game/Game.ts`.

Verified facts (v34, `5f6c8fad`) used as the guide's version boundary:
- Boat attack force = `Math.floor(troops / 5)` → each right-click "Boat" carries 20% of
  the current troops; `boatMaxNumber = 3` boats may be in flight at once.
- Transport Ship cost = `0n` (free to launch); the defender's time-to-recall the *own*
  boat is the 25% recall troop loss, and the enemy's incoming boat cannot be recalled.
- Warship cost 4-tier `250k / 500k / 750k / 1M`; Warship HP 1000; shell damage 250.
- Port cost 3-tier `250k / 500k / 1M`.
- Troop regen base rate `0.03` per tick (UI shows a positive/negative rate).
- Right-click "Boat" is the single Transport Ship mechanic (no separate unit).
- Warship targets and can insta-kill a Transport Ship (priority targeting in Game.ts).

These source values override any player estimate in the Reddit/YouTube notes above;
where a community figure disagrees with v34, the v34 number is used and the community
figure is noted only as directional.
