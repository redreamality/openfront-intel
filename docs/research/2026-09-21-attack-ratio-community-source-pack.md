# Community source pack — `attack-ratio`

Date: 2026-09-21. Slug: `attack-ratio`. Theme (player intent): **what attack
ratio (the bottom-left "send %" slider) should a player use, and when should
they actually click attack** — for open land, against bots, against players,
and when countering an incoming full-send. Single, decision-changing question
that existing guides only touch in passing (`land-combat` quotes a 30% example;
`winning-overtime` quotes the 2× max-speed rule as one bullet). No existing
guide is *about* the ratio itself.

## Access note (how sources were reached)

Direct Reddit HTML/JSON is blocked from this environment's datacenter IP (WAF /
CAPTCHA 403). Reddit threads were therefore read through the
**arctic-shift.photon-reddit.com archive API** (`/api/posts/ids` for posts,
`/api/comments/search?link_id=…` for comments), which returns full post and
comment text. YouTube videos were verified by pulling **real auto-captions via
`youtube-transcript-api`** (93 KB / 147 KB / 32 KB of caption text actually
downloaded), plus a `curl` of each watch page for the title. Official rule
numbers were taken from the **v0.34.11 tag** of the upstream repo
(`src/core/configuration/Config.ts`, downloaded raw from raw.githubusercontent.com)
and cross-checked against the local clone (identical constants). All accesses
recorded 2026-09-21 (Russia TZ 9, UTC+10).

## Reddit (opened and analyzed — 4 threads)

1. **"What Attack Ratio Do You Guys Use?"** — 2025-11-18, score 9, 23 comments
   `https://www.reddit.com/r/Openfront/comments/1p0my6s/what_attack_ratio_do_you_guys_use/`
   - OP: "I used to use 30% but I've found that I do much better most of the
     time with 25%."
   - The consensus cluster answers **25–40%** for most of the game:
     u/ALLSEEJAY "30% double click. 1% opening spam click. End with more troops
     and allows you take bots faster. Learn to boat stack and you do can 100% or
     300% attacks." u/Professional_Size586: "40 with a good population size
     always works… never underestimate the 50% boat to someone… attack em with
     another 50% when it lands for a 100% pop attack."
   - The aggressive cluster answers **100% / full sends**: u/RobSamson "100%
     every time", u/Eclipse_Galian "100%".
   - The conservative cluster answers **≤15%**: u/Y1227 "my attack ratio is
     10-15%", u/UsamaAwan "10% or less… when I'm attacking bots, a double click
     is usually more than enough early game."
   - The most-cited concrete rule: **game rewards larger attacks** —
     u/cameronicheese: "2 clicks of 30% is very similar to 1 click 50%.
     Example, 50,000 troops 2 clicks @ 30% is roughly 25,500 troops attacking.
     1 click @ 50% is 25,000 troops attacking. **Game rewards larger attacks**."
     (Directionally correct: attacker loss scales with `within(troopRatio, 0.6, 2)`
     in `Config.attackLogic`, so a single bigger push loses less per troop than
     two smaller pushes at the same total.)
   - Limitations: players state heuristics; no one in-thread derives numbers
     from code. All ratio claims here were re-checked against v0.34.11 source.

2. **"attack ratio"** — 2025-05-14, score 2, 2 comments
   `https://www.reddit.com/r/Openfront/comments/1kmggrv/attack_ratio/`
   - OP (the *counter-attack* question this guide covers): "WHY sometimes some
     guy will attack you randomly with all their forces (similar to your number
     of defensive troops) and take all your territory, despite trying a counter
     attack as they don't have defensive troops anymore and it just don't do
     anything?? What is a good ratio to attack/counter attack someone??"
   - Top answer, u/Trigollius2: attack ~**5% every couple seconds** while the
     full-send is landing "so that you don't lose too much defensive modifier
     but are still able to grab land quickly after the fullsend", then **15%**
     after it finishes — "attack with about 15% when ur troop increase becomes
     yellow, or even just before that."
   - u/yung12gauge: "set my attack slider to 10% and slowly click to whittle
     away their attacking forces. That way I don't overcommit a counter and get
     blindsided by everyone else. You lose some territory during the 'whittling'
     process but it's better than dropping 50% all at once."
   - This is the community's *failure* story the guide formalizes: countering
     a full-send at 100% nullifies the counter (defender density is highest
     while the attacker's troops are still spread thin over the captured
     border, and a 1:1 full-send hits `within(troopRatio, 0.6, 2)` at the 0.6
     clamp where attacker losses are smallest).

3. **"What the hell is the attack ratio?"** — 2025-11-01, score 21, 11 comments
   `https://www.reddit.com/r/Openfront/comments/1olz4z6/what_the_hell_is_the_attack_ratio/`
   - OP (the *why does it feel different in the endgame* question): "At the
     start of the game i can attack an AI nation that has 5k troops with my
     10k, and not even fully kill them. But then towards the end of the game
     i just had 900k troops and the enemy attacked me with ~1mln, and they
     sweeped my land (like 20% of the map) in maybe 10 seconds."
   - u/ashtonsix points at the exact config line (old path, `DefaultConfig.ts`
     L708–726 at commit `935ff7a9`) — i.e. the community knows the formula is
     in `Config`, and this guide cites the *current* v0.34.11 version.
   - The two correct in-thread explanations this guide builds on:
     - u/GruePwnr: "**Troop density is the answer.** When you defend, your
       troops are spread out through all your land. When you attack they are
       focused on the attacking border. If you have your 1 mil troops spread
       out in a big landmass then very few will be actually defending vs the
       attacker." — matches `ATTACKER_LOSS_PER_DENSITY * defenderTroopLoss`
       where `defenderTroopLoss = defender.troops / defender.numTiles`.
     - u/MiaouKING: "When you get bigger, you progressively become a bit
       weaker to enemy attacks. This is partly to prevent snowballing" —
       matches `largeTerritoryBonus` (midpoint 300k tiles; a defender's
       per-tile loss multiplier keeps *rising* as they grow:
       `1 - 0.3 * sigmoid(log(n), 2.5, log(300k))`).
   - Limitations: the "dev doesn't know what he's doing" pile-on is noise, not
     evidence; ignored except to note the formula is actively re-tuned
     (v0.34.11 "Rebuilt attack loss around two ratios (troop ratio × defender
     density)").

4. **"What's your initial attack ratio on open land at the start of the game?"**
   — 2026-07-01, score 12, 15 comments
   `https://www.reddit.com/r/Openfront/comments/1ukio0t/whats_your_initial_attack_ratio_on_open_land/`
   - OP: "I usually do 30% every time my troop count increases 1,000. So at
     5k I'd send 30%, then at 6k and so on."
   - Cadence answers (the *when to click* half of the theme):
     u/randalthor23 "20%. Click every time I have + one thousand troops. I
     modify to slow down clicking or speed up based on what I see.";
     u/Dry_Flamingo_363 "10% push at 3.5k, 4k, 4.5k… if I hit river I 10 percent
     2 or 3 boats."; u/A_random_person_50 "25% instantly, then attack at 4, 6,
     8, and if I can wait at 12k. Then I keep attacking at 12k until no more
     land. If I'm in a race for sea I semi-spam 15%."
   - Limitations: all early-game heuristics pre-v0.34.11; the troop cap
     sublinearity (`2*(tiles^0.6*1000+50000)` at ~100k/tile) means the
     5k→6k cadence numbers shift with map, so the guide states the *rule*
     (push at the point where the next push would be smaller than current
     attrition), not the absolute count.

## YouTube (opened and analyzed — 3 videos, real captions)

1. **"OpenFront.io V27 Complete Guide (Everything You Need to Know)"**
   `https://www.youtube.com/watch?v=iZQDOuTVcLY` — ~43k chars of captions
   pulled; pre-v0.34 (the "V27" label) but the 2× rule it teaches is unchanged
   in v0.34.11 source.
   - "You can see in the bottom left here, you have this attack ratio thing
     right here. Typically I like to do a little bit bigger attacks at the
     start and I slowly work down my attack ratio after that."
   - The load-bearing claim, stated twice: "the thing you're going to want to
     keep in mind with attacking [bots] is that you can get a **max speed push
     by basically using two times attacking troops over defending troops.
     It caps off at two times attacking troops over defending troops**."
     → v0.34.11 source: `speedCost = within(troopRatio, 0.82, 7.5) *
     within(troopRatio / 20, 1, 50) / 8.55` — the ratio floor at 0.82 means a
     ≥~1.22× push (and the video's 2× rule of thumb) lands at the fast end;
     the 20× second ramp means hopeless attacks (>20× outnumbered) crawl.
   - Limitations: video is v27-era; every number in the guide is re-verified
     against v0.34.11 `Config.ts` and the video is used for the *player-facing
     mental model* (the 2× max-speed rule) only.

2. **"We've finally discovered the OPTIMAL BUILD STRATEGY?! | OpenFront.io"**
   `https://www.youtube.com/watch?v=gELep7-LFG4` — ~66k chars of captions.
   - Gameplay commentary demonstrating the *full-send as an opening weapon*:
     "Just merv one of us and full send the other… I'm going to just full send
     him right now… we were getting a lot of land by full sending him."
   - Shows why the ratio choice is a *timing* decision, not a fixed setting:
     the player holds their stack until the opponent is busy elsewhere, then
     sends 100% into the soft target.
   - Limitations: entertainment commentary; used as qualitative evidence for
     "full-sends as opening plays against a distracted third player" (the
     three-player race scenario in the guide), not for numbers.

3. **"The Key to Endgames in OpenFront.io"**
   `https://www.youtube.com/watch?v=oOPm1TJULSY` — ~15k chars of captions.
   - "We just want to keep the push going at **max speed, which is two times
     attackers over defenders**." — the 2× max-speed rule restated for the
     endgame.
   - "I think I got to chill and just wait for another big hit cuz I don't
     want to eat the full send, right?" — the defender-side *don't counter the
     full-send at full strength* pattern, matching the Reddit 1kmggrv answers.
   - Limitations: short clip-set; used for the endgame 2× phrasing and the
     hold-back pattern only.

## Official primary sources (rule numbers verified here)

1. **v0.34.11 GitHub Release** (2026-09-18, latest non-TEST release)
   `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.11`
   - "Rebuilt attack loss around **two ratios (troop ratio × defender
     density)**, so overwhelming stacks stop paying the full turtle tax and
     dense land stays expensive to take" — this is the *exact* mechanic the
     guide explains; confirms the formula is current and intended to be
     read this way.
   - "Pinned attack balance with golden tests and extreme-case scenario
     coverage, and made `Config.attackLogic` pure."
   - Meta: "giant-empire speed bonus is smoothed and capped at roughly 3.3× a
     small player's rate instead of running away at 9×" — the
     `largeTerritoryBonus` caps.
2. **v0.34.11 tag `src/core/configuration/Config.ts`** (raw.githubusercontent,
   downloaded in full):
   - `attackLogic`: attacker loss =
     `terrainMag × within(troopRatio, 0.6, 2) × (ATTACKER_LOSS_BASE(0.463) ×
     largeAttackerBonus(0.7 depth) × largeDefenderBonus(0.3 depth) +
     ATTACKER_LOSS_PER_DENSITY(0.0039) × defenderTroopsPerTile)`.
   - `troopRatio = defender.troops / attackTroops`; defender loss =
     `defender.troops / defender.numTiles` (average troops per tile — the
     "density is the answer" mechanic).
   - Speed: `within(troopRatio, 0.82, 7.5) × within(troopRatio/20, 1, 50) /
     8.55` — floor at 0.82 (≈1.22× push lands at max speed; the 2× rule of
     thumb sits inside the fast zone), second ramp past 20× (hopeless attacks
     crawl to 1/50 speed).
   - Terrain magnitudes: plains 80 / highland 100 / mountain 120 (×5 and
     ×3-slow with a defense post on the defending tile; defense post range
     30).
   - Large-territory sigmoid: `1 - depth × sigmoid(log(nTiles), 2.5,
     log(300_000))` — attacker floor 0.3× (loss) / 0.27× (speed), defender
     floor 0.7×; midpoint 300k tiles.
   - Bot defenders: `mag × 0.7` when a human/nation attacks a bot.
   - Troop cap: `2 × (tiles^0.6 × 1000 + 50000) + Σ city levels × 250_000`
     (sublinear; ~100k/tile-equivalent early, per the source comment).
   - Terra nullius: `attackerTroopLoss = mag / 5` (flat), speed
     `within(2000 × tileCost / attackTroops, 5, 100) / (borderSize × 2)`.
   - Traitor (alliance-broken) defender: loss × 0.5, speed × 0.8.
3. **openfront.fyi** — the public site itself, for the UI description of the
   bottom-left "send %" slider (attack ratio).

## Failure patterns the guide must address (from the community)

- Countering a full-send at your own 100% → nullified (1kmggrv, oOPm1TJULSY):
  the attacker's stack was chosen to sit at/near the 0.6 ratio clamp where
  their losses are smallest; your full-send into their *still-extended* border
  meets the densest troops-per-tile they can muster.
- Two 30% clicks vs one 50% click → the single bigger push is strictly better
  (1p0my6s, u/cameronicheese): the ratio clamp makes the bigger push cheaper
  per troop, and speed floor 0.82 rewards it.
- Endgame "900k vs 1mln in 10 seconds" shock (1olz4z6): density + the
  large-territory defender floor explain it; the guide quantifies it.
- Fixed-ratio players (10%, 30%, 100%) all report different wins: the guide's
  decision framework (target's density × your relative size × what they are
  doing) replaces the fixed setting.
