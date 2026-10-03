# Community Source Pack: Structure Capture and Denial — OpenFront

Accessed: 2026-10-03. Candidate Reddit and YouTube URLs were pre-checked before selection.
Direct Reddit HTML/RSS was unavailable from this environment, so the three exact canonical
post IDs were resolved through search and their full self-post/comment records were opened
through Arctic Shift. YouTube metadata and English caption files were downloaded and read
locally. Community material establishes the player problem and practical language; every
mechanical rule and number below is checked against the official v0.34.22 tag.

## Reddit discussions (3 opened and analysed)

### R1. "Deleting structures ruins the game"

- URL: https://www.reddit.com/r/Openfront/comments/1olm5yi/deleting_structures_ruins_the_game/
- Date: 2025-11-01 UTC. Score 53 and 26 comments in the archived record.
- Player problem: a player attacks a similarly sized rival for valuable infrastructure, but
  the defender deletes every structure before the advancing territory reaches it. The author
  sees the behaviour as discouraging equal-size fights and rewarding only overwhelming attacks.
- Observation: capture value changes attack selection. A City, Port, Factory, Silo, or SAM is
  not decorative loot; it can be the reason an otherwise marginal border push is worthwhile.
  The defender therefore needs a denial decision, while the attacker needs a timed route to
  the exact structure tile rather than a vague goal of "taking land."
- Limitation: this is a balance complaint written before the current delayed-delete behaviour.
  It proves the demand and the old frustration, not the current timing. The guide does not
  treat its requested removal of deletion as a rule or recommendation.

### R2. "Deleting structure fix"

- URL: https://www.reddit.com/r/Openfront/comments/1om0fnf/deleting_structure_fix/
- Date: 2025-11-02 UTC. Score 7 and 11 comments in the archived record.
- Player problem: preserve the legitimate use of demolition for reorganising island layouts,
  but stop instant mass denial when a player is being conquered.
- Observation: the post proposes exactly the contest that now matters to players: deletion
  should take time, and an enemy who reaches the structure before the timer expires should
  keep it. That makes the visible countdown a race with two different win conditions. The
  defender wins by holding the tile until deletion; the attacker wins by changing the tile's
  owner before expiry. This is the central intent for the guide.
- Limitation: the post is a suggestion, not proof that a particular delay was implemented.
  The official tag supplies the actual 300-tick mark duration, the 300-tick player cooldown,
  the ownership checks, and the transfer behaviour.

### R3. "Please help me get good"

- URL: https://www.reddit.com/r/Openfront/comments/1uf8smc/please_help_me_get_good/
- Date: 2026-06-25 UTC. The analysed reply is comment `otq2hda`.
- Player problem: a new player asks for decisions that improve real match results, not merely
  a control list. An experienced reply recommends taking bot kills first, then waiting until
  Nations have spent troops attacking neighbours before moving in to take their structures.
- Observation: infrastructure capture is a target-timing problem as well as a demolition
  race. The attacker should observe the owner's troop commitment, name the asset being won,
  and enter when the approach can be completed without abandoning the home reserve. The
  reply's examples (Cities, Ports, Factories and existing rail networks) support treating the
  acquired network as the reward, not just the enemy's remaining land.
- Limitation: the advice is anecdotal and does not distinguish every capturable type or the
  Defense Post exception. The guide uses it only for the "wait, then take the infrastructure"
  decision; capture semantics come from source.

## YouTube videos / verifiable captions (3 opened and analysed)

### Y1. "OpenFront.io V28 Tutorial & Guide" — Enzo Plays

- URL: https://www.youtube.com/watch?v=olDiv-q8KMo
- Published: 2025-12-29. Length: 27:53.
- Caption evidence: at about 12:28 the guide introduces Defense Posts as inexpensive local
  fortifications; at about 15:10 it explains and demonstrates that a captured Defense Post
  self-destructs instead of becoming the attacker's building.
- Observation: players can easily generalise from captures of Cities or Ports and expect a
  post to flip as well. The exception must appear in the direct answer and in the target table,
  because it changes the attacker's reward from "gain a post" to "remove a defense zone."
- Limitation: v28 tutorial and auto-generated English captions. The qualitative visual is
  useful, but current behaviour is asserted only after matching PlayerExecution in v0.34.22.

### Y2. "OpenFront.io V27 Complete Guide (Everything You Need to Know)" — Enzo Plays

- URL: https://www.youtube.com/watch?v=iZQDOuTVcLY
- Published: 2025-12-16. Length: 37:24.
- Caption evidence: around 11:25 the radial construction choices identify Factory, City,
  Missile Silo and Defense Post; around 20:09 the player pushes through the land containing a
  Defense Post and explains that it disappears on capture.
- Observation: the important player action is capturing the land under the structure. There
  is no separate "capture building" command: the ownership transition follows the tile. The
  sequence also makes the post exception visible during ordinary territorial advance.
- Limitation: v27 and automatic captions. The video predates the current tag and does not
  establish the 30-second delete window or the complete capturable list.

### Y3. "OpenFront.io Official Tutorial" — Enzo Plays

- URL: https://www.youtube.com/watch?v=EN2oOog3pSs
- Published: 2025-11-22. Length: 3:27.
- Caption evidence: from about 00:57 the tutorial separates Bot and Nation infrastructure;
  from 01:45 it explains the Defense Post's local border value; from 02:25 it states that all
  buildings except Defense Posts have levels and can be upgraded.
- Observation: a captured structure should be evaluated as a functioning levelled asset and
  as part of a route, not as a generic icon. A Factory without stations, a Port without a safe
  coast, or a Silo without a defensible core can be less valuable than the army spent reaching
  it. Defense Posts are both unlevelled and non-transferable, reinforcing the exception.
- Limitation: short official-facing overview rather than a capture tutorial. It supplies the
  infrastructure vocabulary and player-facing context; the tag code is authoritative.

## Official first-party sources and pinned facts

### O1. Formal release boundary

- Release: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.22
- Tag commit: `4e837520e886b255b1b020e9c89639dbb9d54038`.
- This is the newest non-draft, non-prerelease release verified on 2026-10-03. Its release
  notes do not introduce a newer structure-capture rule, so the guide pins implementation
  facts to the source at this exact tag and labels the verification date.

### O2. Delete rules and timing

- Source: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/core/execution/DeleteUnitExecution.ts
- Config: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/core/configuration/Config.ts
- UI: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/client/hud/layers/RadialMenuElements.ts
- `Config.deletionMarkDuration()` and `deleteUnitCooldown()` both return `30 * 10`: 300
  ticks, which is 30 seconds at the game's ten ticks per second. `DeleteUnitExecution`
  accepts only an active unit owned by the requesting player, on that same player's land,
  on land terrain, outside the spawn phase, after the cooldown. The radial selector further
  limits normal player use to completed, not-yet-marked structures within Manhattan distance
  5 of the selected tile. Marking records the player's cooldown immediately; expiry deletes
  the structure. The UI exposes no second action that cancels the mark.

### O3. Capture and the Defense Post exception

- Ownership loop: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/core/execution/PlayerExecution.ts
- Unit transfer: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.22/src/core/game/UnitImpl.ts
- Each PlayerExecution tick checks every structure against the owner of its tile. If the tile
  has no player owner, the structure is deleted. If another player owns it, Defense Post is
  destroyed and credits that captor; every other member of `Structures` is passed to
  `captureUnit`, which calls `UnitImpl.setOwner`. The structures relevant here are City,
  Port, Factory, Missile Silo, SAM Launcher, and Defense Post.
- `setOwner` begins with `clearPendingDeletion()`. It moves the same unit object between the
  old and new owners and does not reconstruct its level, health, missile timer queue, loaded
  state, or train-station flag. Therefore a capture before the demolition deadline saves a
  transferable structure and cancels its pending deletion. This is the exact mechanical fact
  behind the attacker's race. Defense Post never reaches `setOwner`; it is destroyed instead.

## Cross-source synthesis and guide contract

The community sources converge on one decision: infrastructure creates a contest between
**capture value** and **denial time**. The old complaint was that a defender could erase the
reward instantly. The proposed fix framed a timed race. The current tag resolves that race
with a 30-second pending-deletion mark and an equally long per-player delete cooldown. The
attacker does not click the building; they must make the tile change owner before the pending
deletion expires. If they do, the pending mark is cleared for a City, Port, Factory, Silo, or
SAM. If they reach a Defense Post, the zone is removed but no asset transfers.

The guide therefore needs two perspectives in one framework. The defender asks whether the
asset can be held for thirty seconds, whether its route remains useful, and whether denying it
is worth spending the one deletion opportunity that cannot be used again for another thirty
seconds. The attacker asks whether the chosen structure is actually valuable after capture,
whether the approach can reach its exact tile before expiry, and whether enough reserve remains
to keep it. This is not another general building guide or another annexation guide: it owns the
specific **keep, delete, capture, or bypass** decision after valuable infrastructure is already
under immediate territorial threat.

Two boundaries prevent overclaiming. First, community timestamps and percentages are examples,
not engine guarantees; all hard values come from v0.34.22. Second, "same object transfers" does
not promise that every surrounding route becomes useful to the captor: rail connectivity,
coast access, target range, mode settings, and the new owner's tactical position still decide
whether the captured asset pays. The guide must tell players to price the route and the hold,
not simply count the building icon.
