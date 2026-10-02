# Nuke alliance-break threshold — community source pack

Date: 2026-10-02
Topic: when a nuke **automatically breaks your own alliance** — the 100 weighted-tile
threshold, the "any allied structure in the blast" rule, the launch-time (not impact-time)
check, the self-nuke exemption, and why a MIRV forces the break unconditionally.
Version under analysis: v0.34.22 (tag `4e837520e886b255b1b020e9c89639dbb9d54038`), the
latest non-TEST OpenFront release at analysis time.

## Scope and intent

This guide owns the **automatic** alliance-break decision that the nuke itself triggers. It
is deliberately distinct from:

- `/guides/alliance-break-timing/` — when to **manually** break an already-active alliance
  and whether the 30-second traitor window is affordable. That page is about the player's
  deliberate diplomatic action; this page is about the game's **unprompted** break that a
  nuke fires off on your behalf.
- `/strategies/diplomacy-betrayal/` — request timers, mutual extension and the general
  request/embargo rules.
- `/guides/nuclear-stalemate-breaker/`, `/guides/nuke-barrage-vs-sam-wall/` — nuclear
  offense/defense against a **stalemate** or a **SAM wall**, not the alliance-boundary
  question.
- `/guides/water-nukes/`, `/guides/nuke-calculator/`, `/guides/mirv-launch-timing-cold-war/` —
  water/terrain effects, cost math, and MIRV **timing** respectively.

The single question with a verifiable answer: **how much of an ally's territory can I nuke
without triggering an automatic break — and when does the MIRV remove that choice entirely?**

## Official primary source (v0.34.22 tag)

- Release notes / tag: `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.22`
  (v0.34.22). No nuke/alliance threshold changes are listed in the v0.34 line, so the
  v0.34-era threshold numbers carry forward unchanged.
- Tag source, threshold + structure check:
  `https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.22/src/core/execution/Util.ts`
  (verified HTTP 200 at analysis time).
- Tag source, launch-time break:
  `https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.22/src/core/execution/NukeExecution.ts`
- Tag source, MIRV unconditional break:
  `https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.22/src/core/execution/MIRVExecution.ts`
- Tag config, threshold + magnitudes:
  `https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.22/src/core/configuration/Config.ts`

Facts read from the tag source (verified against v0.34.22, not TEST):

- `Config.nukeAllianceBreakThreshold()` returns **100** in v0.34.0, v0.34.5, v0.34.10 and
  v0.34.22 — stable across the v0.34 line.
- `wouldNukeBreakAlliance()` (Util.ts:51-95) returns `false` immediately if there are **no
  allies** (the nuker's ally set is empty). Otherwise it breaks on the **first** of two
  conditions, checked in this order:
  1. **Any allied structure** in the **outer** blast ring (`magnitude.outer`) is destroyed —
     checked with `game.anyUnitNearby(targetTile, magnitude.outer, Structures.types, ally)`.
     This is checked **before** the tile count and returns `true` on the first match.
  2. Otherwise, per ally, the weighted tile count in the outer ring where **inner-ring
     tiles weigh 1.0 and outer-ring tiles weigh 0.5** (`d2 <= inner2 ? 1 : 0.5`); the break
     fires when a running per-ally count exceeds the threshold with a **strict `>`**
     comparison (`newCount > threshold`). So a count of exactly 100 does **not** break; 101
     does.
- `listNukeBreakAlliance()` (Util.ts:100-129) is the "find every angered player" variant. It
  collects every player whose weighted tile total **> 100**, **plus** every owner of a
  structure within `magnitude.outer` (the structure rule adds the owner directly, no count
  needed). It includes unallied players — the alliance break is applied only to the ones who
  are actually allies, but the angered set is broader.
- `NukeExecution` launch path: at launch (`this.player.buildUnit(this.nukeType, ...)`,
  NukeExecution.ts:212-220) the code calls `this.maybeBreakAlliances()` **only when**
  `this.nuke.type() !== UnitType.MIRVWarhead`. So the break is evaluated **at launch**, the
  moment the missile spawns from the silo — **not** at impact — and MIRV **warheads** are
  exempt from this launch-time threshold check.
- `MIRVExecution.tick()` (MIRVExecution.ts:88-98): once the MIRV missile actually spawns,
  the code checks `this.player.allianceWith(this.targetPlayer)`; if an alliance exists it
  calls `this.player.breakAlliance(alliance)` **unconditionally** (no tile threshold, no
  structure test). It then sets **mutual** relation to **−100** when the target is a
  different player. The comment is explicit: "Betrayal on launch — only once the missile has
  actually spawned, so a fizzled launch pays no diplomatic cost." A MIRV launch carries
  **350 warheads** (`defaultNumWarheads` = 350).

Interpretation (source-grounded, not invented): a **normal** Atom/Hydrogen bomb is a
**surgical** tool against an ally — you can delete up to ~100 weighted tiles of their
territory (roughly ~100 inner tiles, or ~200 outer-ring tiles, or a mix) and **not** break
the alliance, provided the blast touches none of their **structures**. The threshold exists
precisely so a targeted strike does not automatically end the alliance. A **MIRV** is the
opposite: firing one at an ally **always** ends the alliance the instant it launches, with
no surgical option, and it is by far the heaviest tool (350 warheads). The decision the
player faces is therefore "keep the alliance and strike surgically, or commit fully and
accept the forced break + traitor window."

## Reddit discussions (opened and analyzed)

Direct reddit.com is bot-walled from this environment, so the thread bodies and comments
were read through the Arctic Shift archive of the same posts. URL, title, player question
and observations are recorded below; the limitation (third-party archive, not the live UI)
is stated per item. Access date: 2026-10-02.

1. https://www.reddit.com/r/Openfront/comments/1wtqrp3/ — "Allies should not be able to nuke
   you without a betrayal debuff."
   Player question: should an **ally's** nuke automatically trigger a betrayal? This is a
   direct reflection of the automatic-break mechanic the guide documents.
   Observation: the thread is built on the premise that a nuke fired across an alliance line
   carries a diplomatic cost, and commenters argue about whether that cost should be
   unconditional (the MIRV behavior) or gated by a threshold (the Atom/Hydrogen behavior).
   One commenter describes placing a structure on the coastline precisely so an incoming
   blast that crosses into their ring is treated as a **structure hit** — confirming the
   "any allied structure in the outer ring = instant break" rule in play, not just the tile
   count. Limitation: read via Arctic Shift post/comment archive, not live reddit.
2. https://www.reddit.com/r/Openfront/comments/1wrxd6x/ — nuke/SAM/betrayal discussion.
   Player question: how to get a nuke through an opponent's (or teammate's) defense without
   triggering a break.
   Observation: a top comment reports "I nuked myself to bypass the SAMs — it's not a
   problem," i.e. **self-targeting** a nuke does not produce an alliance break, which matches
   the source rule that your own tiles are never in the nuker's `allySmallIds`. This is the
   self-nuke exemption the guide makes explicit. Limitation: Arctic Shift archive copy.
3. https://www.reddit.com/r/Openfront/comments/1ws8jh3/ — nuke/alliance/betrayal thread.
   Player question: whether the alliance survives a "small" nuke on an ally's border.
   Observation: commenters split on whether a nuke that clears an ally's border troops but
   spares their buildings ends the alliance; the split maps directly onto the two rules
   (tile threshold vs. structure hit). Limitation: Arctic Shift archive copy.
4. https://www.reddit.com/r/Openfront/comments/1ws2h6x/ and
   https://www.reddit.com/r/Openfront/comments/1ws87og/ — adjacent nuke/alliance threads used
   as supporting color on how players talk about the "I nuked my ally" moment. Observation:
   both treat an accidental break as a surprise the player did not intend, reinforcing that
   the automatic break is a decision trap rather than an intended action. Limitation: Arctic
   Shift archive copies.

## YouTube videos (opened, transcripts read via auto captions)

Access date: 2026-10-02. Transcripts read from cached auto-caption VTT/TXT (verifiable, may
contain ASR error). Three on-topic videos; mention counts of nuke/bomb/alliance/traitor/MIRV
terms in the transcript: 144, 144 and 86 respectively.

1. https://www.youtube.com/watch?v=Te65AYeYXbg — "These Teamers came out of NOWHERE?!"
   (TheBiff, published 2026-05-14).
   Observed: a teamer game where an ally's nuclear strike lands on the other team's position;
   the transcript frames the strike as the point at which the alliance relationship
   collapses, consistent with the launch-time automatic break. Limitation: auto-caption ASR.
2. https://www.youtube.com/watch?v=2dEZt4ri0OU — "What happens when you enter an endgame
   after 15 minutes? | OpenFront.io" (Ultimus_Rex, published 2026-08-13).
   Observed: an endgame walkthrough discussing when a nuclear option is worth committing
   against a neighbor you were previously allied with; the presenter treats the break as a
   one-way commitment rather than a reversible action. Limitation: auto-caption ASR.
3. https://www.youtube.com/watch?v=gELep7-LFG4 — "We've finally discovered the OPTIMAL BUILD
   STRATEGY?! | OpenFront.io" (Ultimus_Rex, published 2026-03-15).
   Observed: build/economy walkthrough that references nuclear endgame options and when a
   large strike is the right commitment; useful for the "heavy tool / commit fully" framing
   of the MIRV. Limitation: auto-caption ASR.

A fourth candidate (VZjhny9mn1A) was prefetched with 62 nuke/bomb/alliance mentions and held
as a backup; it is not relied on for the count.

## Consolidated player questions (cross-source)

- "Can I nuke my ally's border without the alliance ending?"
- "What exactly counts — tiles or buildings — and where is the line?"
- "Does a self-nuke (nuking my own territory to dodge SAMs) break anything?"
- "Why does a MIRV end the alliance even when I only wanted to hit one spot?"
- "Does it matter if I nuke before or after I break the alliance on purpose?"

## Decision framework distilled for the guide

- **Keep the alliance, strike surgically (Atom/Hydrogen):** aim so the weighted ally tile
  count stays ≤ 100 **and** no allied structure sits in the outer ring. This deletes
  territory/troops without the break and without the traitor window.
- **Accept the forced break (MIRV, or a nuke that clears a structure / > 100 weighted
  tiles):** use when the alliance is already worth nothing or you are committing to open
  war; the break is automatic at launch, you become the traitor for the 30-second window,
  and relation drops to the ex-ally and (for a MIRV) to −100 mutually.
- **Self-nuke as a tool:** to pierce a SAM wall or reposition, targeting your **own** tiles
  is the break-free option, because your own tiles are never in the ally set.

## Failure and counterplay distilled

- **Nuking an ally to "win" and finding the alliance is gone:** if the blast crosses an
  allied structure or clears > 100 weighted tiles, the break fires at launch and the 30s
  traitor window (half defense, faster enemy attacks) is now on you with no objective inside
  it — the same trap as a badly-timed manual break.
- **MIRV as a bluff:** a MIRV launch cannot be walked back — the alliance breaks the instant
  it spawns, so a "just in case" MIRV at an ally is an irreversible commitment.
- **Coastline/structure baiting:** an ally who deliberately parks a structure on the ring
  edge converts a "safe" territorial strike into a structure hit and forces the break on
  you; counter by checking the outer ring for allied buildings before you fire.

## Mode and map adjustments

- FFA (default 5-minute alliances): the surgical option is most valuable, because a
  threshold-clearing strike is a cheap way to shave an ally's position while the alliance
  still banks the 5-minute lull.
- Custom 1–15 minute rooms: a long alliance makes "strike surgically and keep the lull" even
  more attractive; a short one makes a forced break nearly free.
- Larger maps: the outer ring reaches more of an ally's territory, so the same bomb is more
  likely to cross a structure or clear > 100 weighted tiles — the safe zone shrinks relative
  to blast size.
- Humans-versus-Nations: a Nation ally's structure layout differs (fewer, more valuable
  buildings), so the structure rule is the dominant constraint there rather than the tile
  count.

## Counts

Reddit: 4 | YouTube: 3 | Official primary: 1 release tag + 4 tag-source raw files
(Util.ts, NukeExecution.ts, MIRVExecution.ts, Config.ts) at v0.34.22.
Notes (English) well above the 600-word research floor.
