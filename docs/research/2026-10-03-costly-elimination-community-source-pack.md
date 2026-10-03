# Community source pack — costly-elimination (2026-10-03)

Topic: making your own elimination costly in OpenFront FFA (denial of the
elimination payoff / scorched earth), written from the eliminated player's
side. This pack records the community sources actually opened and analyzed for
that topic, plus the official first-party URL the load-bearing rules were
verified against. All rule, number, and version-boundary claims in the guide
trace to the official tag source below, not to the community posts; the
community material supplies the player-facing question, the observed playbooks,
and the failure modes players report.

## Official first-party source (rules + numbers)

- URL: https://github.com/openfrontio/OpenFrontIO
- Specific verified files at tag v0.34.22 (commit 4e837520e886b255b1b020e9c89639dbb9d54038), fetched as raw:
  - GameImpl.ts — `conquerPlayer`: the eliminated player's Gold is removed in
    full; the conqueror's captured amount is the `conquerGoldAmount` payout
    (100% of the balance for a Bot or a Nation, 50% with integer division for
    a Human, 0 for a Human who has never sent an attack).
  - PlayerExecution.ts — `removeOnDeath`: deletes the remaining Gold, all
    non-nuke units, and all alliances; the four nuke unit types are excluded
    and keep their flight timers and detonation logic.
  - PlayerExecution.ts — per-tile conquest: as tiles flip, every non-Defense-Post
    structure on a flipped tile is re-owned by the conqueror at no cost; Defense
    Posts are destroyed on capture with no refund.
  - Config.ts — exact costs: Defense Post 50,000 each capped at 250,000; SAM
    Launcher up to 3,000,000; City / Factory up to 1,000,000; Port up to
    1,000,000; Missile Silo 1,000,000; Atom 750,000; Hydrogen 5,000,000; MIRV
    25,000,000 plus 15,000,000 per prior MIRV launch.

This is the single authoritative source for every number in the guide. The
version boundary is v0.34.22; nothing here was taken from a TEST release or a
placeholder changelog.

## Reddit discussions (r/Openfront and adjacent, analyzed)

1. Anchor thread, exactly the scorched-earth topic — July 2026.
   - URL: https://www.reddit.com/comments/1upxw32/
   - Relative recency: about 2 months before this guide (accessed 2026-10-03).
   - Player question / observed advice (from cached comment JSON, real bodies):
     "spend all your gold... spam defense posts which are useless to the
     aggressor since they're destroyed on impact"; "blow every single
     infrastructure you have so they gain nothing"; "send all your money to a
     teammate before you're killed"; "nuking yourself / your launcher to not
     give them a free [silo]"; "have a couple of silos ready to retaliate with
     hydros."
   - Observation: the community's implicit payoff model matches the
     source-verified mechanic 1:1 — Defense Posts burn, Gold can be donated,
     silos and nukes are the keep-levers.
   - Limitation: live re-fetch of the thread was blocked on 2026-10-03
     (reddit returned a 189,908-byte block page); analysis is from a prior
     cached JSON snapshot with real comment bodies, so the quoted advice is
     verbatim from that snapshot, not re-fetched live.

2. Elimination / late-game strategy thread — October 2025.
   - URL: https://www.reddit.com/comments/1oii584/
   - Relative recency: about 11 months before this guide.
   - Observed advice: players discussing whether to hold Gold for a counter
     attack versus burn it on defense posts when outmatched; the "do not give
     them a free silo" heuristic recurs.
   - Limitation: same live re-fetch block; from cached comment JSON.

3. FFA endgame / full-send timing thread — January 2026.
   - URL: https://www.reddit.com/comments/1qaa7vw/
   - Relative recency: about 9 months before this guide.
   - Observed advice: when a big player full-sends, the defender's best value is
     to pre-arm a nuke so the death still costs the aggressor; the "cheapest
     elimination on the map" framing shows up as a targeting concern.
   - Limitation: same live re-fetch block; from cached comment JSON.

4. Scorched-earth / self-destruct thread — September 2025.
   - URL: https://www.reddit.com/comments/1no19k3/
   - Relative recency: about 12 months before this guide.
   - Observed advice: players reporting that nuking their own launcher or
     infrastructure to deny the aggressor a free structure is the strongest
     denial when they are already doomed; mirrors the source rule that
     structures transfer unless they are destroyed first.
   - Limitation: same live re-fetch block; from cached comment JSON.

All four threads were reached via prior cached Reddit JSON (link_id + real
comment bodies). On 2026-10-03 a live re-fetch attempt (old.reddit.com and
api.reddit.com) returned a 189,908-byte block page for every endpoint, so the
analysis above is from the cached snapshots with the access date and this
limitation recorded rather than a fresh live pull.

## YouTube videos (opened, metadata + transcript reviewed)

1. "The ULTIMATE OpenFront.io Tutorial and Strategy Guide!" — Ultimus_Rex.
   - URL: https://www.youtube.com/watch?v=EdcdsayA_ac
   - Published 2025-04-28. Relative recency: about 17 months before this guide.
   - Observation: general strategy tutorial covering Gold management, defense
     posts, and the value of denying the opponent infrastructure on death;
     establishes the baseline the eliminated-player playbook reacts to.

2. "How to Win in Openfront.io (Multiplayer Tutorial)" — Enzo Plays.
   - URL: https://www.youtube.com/watch?v=ehR2j15ttag
   - Published 2025-05-14. Relative recency: about 17 months before this guide.
   - Observation: multiplayer FFA focus; covers when to full-send versus hold,
     which is the aggressor-side mirror of the denial decision this guide
     covers from the defender side.

3. "Trying a new strategy: Nuking MYSELF to win a Game??" — TheBiff.
   - URL: https://www.youtube.com/watch?v=oEUAWETFd5E
   - Published 2026-01-29. Relative recency: about 8 months before this guide.
   - Observation: directly on-topic — a self-destruct / scorched-earth
     strategy video; demonstrates the self-nuke denial and the "make your
     death expensive" framing, which is the exact intent of this guide.

## Consolidated player questions this guide answers

- What happens to my Gold when I am eliminated, and how much of it does the
  conqueror keep? (Answer: 50% for an attacker Human, 100% for a Bot/Nation,
  0 for a Human who never attacked.)
- What happens to my structures? (Answer: most transfer; Defense Posts
  destroy; nukes survive.)
- How do I shrink the payoff? (Answer: burn Gold on Defense Posts, donate to a
  threatened ally, pre-arm nukes.)
- When is burning the wrong move? (Answer: when the aggressor is only probing
  and a defense is still winnable; when the donation lands on a safe player.)
- How do mode and map change the decision? (Answer: small maps and the
  starting-gold setting raise the denial value; the AFK/never-attacked case
  transfers 0 Gold.)

## Method and limitations

- Rules, numbers, and version boundaries were verified against the official
  tag v0.34.22 raw source (GitHub), not against the community posts.
- Community material was used for the question, the observed playbooks, and the
  reported failure modes.
- Reddit live access was blocked on 2026-10-03; analysis relies on prior cached
  JSON with real comment bodies. YouTube metadata and transcripts were reviewed
  from cached page HTML.
- Access date for all sources: 2026-10-03.
