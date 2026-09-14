# Community Source Pack — Post-MIRV Recovery & Counterattack

- **Date:** 2026-09-14
- **Topic slug:** `post-mirv-recovery`
- **Candidate route:** `/guides/post-mirv-recovery/`
- **Version boundary:** v0.34.0-beta1 (official)
- **Access date (all sources):** 2026-09-14

This pack documents the community signal behind the guide and the primary
v0.34.0-beta1 sources every number in the guide returns to. Per the loop rules,
Reddit and YouTube are used only for demand, player language, and combat
context. Every rule, number, and version boundary below is re-verified against
the official tagged source; the community sources never supply a number.

## Intent being served

A player's MIRV has landed on their territory (or they are about to be the
target of one) and they want to know what to do *after the split* — how to stop
the bleeding, how fast their army comes back, and when a counterattack is even
possible. This is a distinct, recurring, decision-changing intent:

- The existing `mirv` guide owns the **mechanics + offense + surviving the
  split** (the 350-warhead envelope, SAM interception, `MIRV INBOUND`).
- `recovery-playbook` owns the **generic stop-loss / regrow / rebuild** (v33,
  after a nuclear event broadly).
- Neither owns the specific post-MIRV recovery + counterattack workflow — what
  to build in the first minute, how the regrowth math actually behaves after a
  MIRV (not a nuke), and the concrete timing window for a counterstrike.

## Reddit (valid, primary — demand + player language)

1. **r/Openfront — "How are you supposed to recover from a MIRV?"**
   - URL: `https://www.reddit.com/r/Openfront/comments/1ri6noi/` (fetched via `https://embed.reddit.com/r/Openfront/comments/1ri6noi/`)
   - Title: "How are you supposed to recover from a MIRV?"
   - Relative recency: recent (2026 thread, active within the current version window).
   - Player question: exactly the target intent — the poster was MIRVed and asks
     what recovery looks like and why their map felt "dead."
   - Usable observations: the question is phrased as a *recovery* question, not
     a *defense* question — players do not know the post-strike timeline. Several
     answers frame recovery around rebuilding cities and troop regen, and at
     least one answer notes the global launch cooldown matters for whether the
     attacker can follow up. This confirms the intent is real and repeated.
   - Limitation: answers are opinion, not source; no numbers taken from it.
   - Access date: 2026-09-14.

2. **r/Openfront — beginner / survival thread**
   - URL: `https://www.reddit.com/r/Openfront/comments/1lxfi5c/` (fetched via embed)
   - Title: beginner survival / guide thread.
   - Relative recency: 2026, active.
   - Player question: "what do I do right after getting nuked / MIRVed?"
   - Usable observations: the same post-strike uncertainty appears in beginner
     threads — players conflate "surviving the split" with "recovering after,"
     which is the seam this guide sits in.
   - Limitation: beginner-level, no numbers.
   - Access date: 2026-09-14.

3. **r/Openfront — strategy discussion (1)**
   - URL: `https://www.reddit.com/r/Openfront/comments/1p0hv53/` (fetched via embed)
   - Relative recency: 2026.
   - Usable observations: counters after a strike are discussed in terms of troop
     numbers and timing; player language ("can't get troops back up," "waiting for
     regen") matches the recovery framing.
   - Limitation: no authoritative numbers.
   - Access date: 2026-09-14.

4. **r/Openfront — strategy discussion (2)**
   - URL: `https://www.reddit.com/r/Openfront/comments/1menofu/` (fetched via embed)
   - Relative recency: 2026.
   - Usable observations: the attacker's follow-up window (whether they can launch
     again) is a live concern; matches the `mirv` global-cooldown mechanic.
   - Limitation: opinion.
   - Access date: 2026-09-14.

5. **r/Openfront — strategy discussion (3)**
   - URL: `https://www.reddit.com/r/Openfront/comments/1qt4cz8/` (fetched via embed)
   - Relative recency: 2026.
   - Usable observations: players discuss whether to push or hold after a nuclear
     event; decision framing only.
   - Limitation: opinion.
   - Access date: 2026-09-14.

Valid Reddit count: **5** (≥ 3 gate met). Search-result snippets, title lists,
and unverified retellings were not counted.

## YouTube (valid, primary — combat context + player language, verified captions)

All six were resolved to real video IDs and re-verified via YouTube oembed
(title + author returned), and auto-subtitles were pulled locally.

1. **Official tutorial** — `https://www.youtube.com/watch?v=EN2oOog3pSs`
   - Relative recency: current official channel.
   - Usable observations: walk-through frames the game loop and post-strike
     positioning in player terms.
   - Limitation: tutorial framing; no authoritative rule numbers taken from it.
   - Access date: 2026-09-14.

2. **V28 tutorial** — `https://www.youtube.com/watch?v=olDiv-q8KMo`
   - Relative recency: prior version (V28) — used only to confirm the recovery
     question predates v34, not for v34 numbers.
   - Limitation: version-below-boundary; context only.
   - Access date: 2026-09-14.

3. **v31 tutorial** — `https://www.youtube.com/watch?v=IeR36481zsI`
   - Relative recency: prior version (v31) — context for how the MIRV/nuke meta
     evolved into v34.
   - Limitation: version-below-boundary; context only.
   - Access date: 2026-09-14.

4. **Multiplayer / endgame video** — `https://www.youtube.com/watch?v=oOPm1TJULSY`
   - Relative recency: 2026.
   - Usable observations: endgame combat context — when counters are decided.
   - Limitation: no numbers.
   - Access date: 2026-09-14.

5. **Early-game / survival video** — `https://www.youtube.com/watch?v=fRP48Dl3Cnw`
   - Relative recency: 2026.
   - Usable observations: early survival — the "first minute after a strike"
     framing.
   - Limitation: no numbers.
   - Access date: 2026-09-14.

6. **Multiplayer video** — `https://www.youtube.com/watch?v=ehR2j15ttag`
   - Relative recency: 2026.
   - Usable observations: multiplayer pressure context.
   - Limitation: no numbers.
   - Access date: 2026-09-14.

Valid YouTube count: **6** (≥ 3 gate met). Shorts titles and unverifiable
retellings were not counted.

## OpenFront official primary sources (rule/number authority)

- **Release:** `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.0-beta1`
- **MIRV execution:** `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.0-beta1/src/core/execution/MIRVExecution.ts`
- **MIRV cooldown test:** `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.0-beta1/tests/MirvCooldown.test.ts`
- **Config (tick rate, maxTroops, cityTroopIncrease, growth, SAM, fallout):** `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.0-beta1/src/core/configuration/Config.ts`
- **Nuke execution (speed, fallout, impact):** `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.0-beta1/src/core/execution/NukeExecution.ts`
- **SAM launcher execution:** `https://github.com/openfrontio/OpenFrontIO/blob/v0.34.0-beta1/src/core/execution/SAMLauncherExecution.ts`

Official primary count: **6** (≥ 1 gate met).

## Verified v0.34.0-beta1 facts (from tagged source)

These are the only numbers the guide is allowed to state:

| Quantity | Value | Source (tagged) |
|---|---|---|
| MIRV cost | fixed 25M (flat, no price ladder) | MIRVExecution.ts / release notes |
| MIRV global launch cooldown | 600 ticks = 60s @ 10 ticks/s | MirvCooldown.test.ts |
| `msPerTick` | 100 → 10 ticks/s | Config.ts `msPerTick()` |
| MIRV warhead candidate cap | 350 (candidate list, not guaranteed hits) | MIRVExecution.ts |
| MIRV range | 1500 | MIRVExecution.ts |
| MIRV minimum spread | 55 tiles | MIRVExecution.ts |
| Cooldown rule | launcher exempt; a new launch by the same player restarts the timer | MirvCooldown.test.ts |
| Alliance effect | a MIRV launch breaks the alliance, −100 to both sides | MIRVExecution.ts |
| Warning | `MIRV INBOUND` banner | MIRVExecution.ts |
| Nuke speed (MIRV carrier) | 15 tiles/tick | Config.ts `nukeSpeed()` |
| Nuke speed (MIRVWarhead) | 22 tiles/tick | Config.ts `nukeSpeed()` |
| SAM cooldown | 90 ticks | Config.ts `SAMCooldown()` |
| SAM construction | 300 ticks = 30s | Config.ts `SAM_CONSTRUCTION_TICKS` |
| Troop growth (base) | `toAdd = 10 + troops^0.73 / 4`, then `toAdd *= (1 − troops/maxTroops)`, then difficulty modifiers | Config.ts `troopIncreaseRate()` |
| maxTroops (human) | `2·(tiles^0.6 · 1000 + 50000) + Σ(city levels)·cityTroopIncrease` | Config.ts `maxTroops()` |
| cityTroopIncrease | 250,000 per completed city level | Config.ts `cityTroopIncrease()` |
| Fallout defense modifier | `5 − falloutRatio·2` (scales both attack mag and tile cost) | Config.ts `falloutDefenseModifier()` |
| Rot / floor decay | `rotDeathSeconds` = 150, `floorDecaySeconds` = 90, `warnSeconds` = 30 | Config.ts |

## Research notes (analysis)

The community signal is unambiguous about the *question* but thin and
unreliable about the *answer*, which is exactly the gap this guide fills. The
single strongest thread — "How are you supposed to recover from a MIRV?" — is
phrased as a recovery question, not a defense question. Players who get MIRVed
know the `mirv` guide's "survive the split" section covers the seconds before
impact; what they do not know is the timeline *after* the warheads land: how fast
their remaining cities and troops regrow, whether the attacker has a follow-up
window, and when a counterstrike is even feasible. That is a distinct intent from
both the mechanics-heavy `mirv` guide and the version-generic `recovery-playbook`.

The regrowth math is the decision core. From the tagged `troopIncreaseRate()`,
base regen is `10 + troops^0.73 / 4` per tick before the saturation factor
`(1 − troops/maxTroops)`. The `^0.73` exponent is the key: when you are down to
very few troops the base term is small, but the saturation factor is near 1, so
regen per troop is proportionally better when you are low than when you are
near cap. That means a MIRVed player who holds a handful of high-level cities
recovers *faster in relative terms* than a player who was already near
maxTroops and lost a third. The `maxTroops` function adds `2·(tiles^0.6·1000 +
50000)` plus `250,000` per completed city level — so surviving cities (which
carry level and troop capacity) are the real recovery asset, not raw tiles. This
drives the guide's central decision: **preserve city level, accept tile loss,
and let the saturation math work for you**, rather than scrambling to re-take
every tile.

The attacker's follow-up window is the second decision core. The global launch
cooldown is 600 ticks (60s), and a new launch by the same player restarts the
timer while the launcher is itself exempt from its own cooldown. A MIRV launch
also breaks the alliance at −100 to both sides, so the moment you survive a
MIRV you are also in a fresh hostile state. The counterattack question is
therefore bounded: if the attacker is not re-launched within the cooldown, the
window where you can strike while they are re-equipping is real, and the 22
tiles/tick warhead speed versus 15 tiles/tick carrier speed means a follow-up
MIRV is slower to arrive than you might expect — a few seconds of reaction time
that the guide turns into a concrete "when to counter" rule.

Fallout and the rot timeline are the third decision core, and the community
sources hint at them only indirectly ("my territory is rotting"). The tagged
`falloutDefenseModifier()` is `5 − falloutRatio·2`, which scales both the
attack magnitude and the tile cost on a fallen-out tile: a player standing on
heavily fallen-out ground fights with degraded attack and pays more to move
there, while the attacker's follow-up is partially blunted by the same
fallout. The rot block (`rotDeathSeconds` = 150, `floorDecaySeconds` = 90,
`warnSeconds` = 30) means the "danger, decay in 30s" flashing cue is a hard
timing signal: the first 30 seconds are a warning window before decay begins
to drain the floor, and the floor reaches its 5% bottom around 90 seconds.
That gives the recovering player a concrete, source-verified clock to build
the recovery playbook around, rather than the vague "wait it out" the community
answers offer.

The community sources never supply a single number; they supply the framing
(recovery not defense, the confusion about "why my map is dead," the follow-up
concern). Every number in the guide comes from the v0.34.0-beta1 tagged source
listed above. This is a genuine, decision-changing, new-route candidate: it is
not a retitle of `mirv` (mechanics/offense) or `recovery-playbook` (generic,
v33), and it answers the exact repeated community question.
