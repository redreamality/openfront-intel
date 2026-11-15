# Community source pack — v0.36 readable nuke warnings (blast-radius circles)

**Slug:** `nuke-warning-circles`
**Research date:** 2026-11-15
**Version boundary:** `v0.36.2` (latest non-TEST release of `openfrontio/OpenFrontIO`)
**Purpose:** Verified evidence pack for the five-language guide that teaches players to read the color of the blast-radius circle shown when they aim an Atom or Hydrogen bomb, so they know *before* they fire whether the strike will break an alliance they already lost or will brand them a traitor.

---

## 1. Official first-hand sources (primary)

| # | Source | URL | What it anchors |
|---|--------|-----|-----------------|
| O1 | v0.36.0 release (2026-11-09) | https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.0 | The feature itself: "The blast-radius circle is yellow when a strike only ends an alliance with a traitor or disconnected ally, and flashes red when it would make you a traitor." Introduced the two-tone warning; at v0.36.0 the red state **flashed** (a `flashHz` animation parameter). |
| O2 | v0.36.2 release (latest) | https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.2 | The v0.36.2 change removed `flashHz`, so the traitor warning is now a **persistent solid red** instead of a flashing red. This is the current behavior the guide documents. |
| O3 | `RangeCirclePass.ts`, ref v0.36.2 | https://github.com/openfrontio/OpenFrontIO/blob/v0.36.2/src/client/render/gl/passes/RangeCirclePass.ts | Header comment states the contract: "yellow when nuking here would break an alliance without marking you a traitor, red when it would mark you a traitor." The pass binds `allianceColor*` (yellow/amber) for the `alliance` warning and `traitorColor*` (red) for the `traitor` warning; default is white. |
| O4 | `BuildPreviewController.ts` `checkRangeWarning()`, ref v0.36.2 | https://github.com/openfrontio/OpenFrontIO/blob/v0.36.2/src/client/controllers/BuildPreviewController.ts | The decision logic: returns `"none"`, `"alliance"`, or `"traitor"` for the tile under the bomb ghost. Only Atom/Hydrogen bomb ghosts (the two nukes with a radius) produce a warning; other units return `"none"`. The `traitor` branch fires when the blast would betray a *currently-loyal* ally (adding a traitor mark); the `alliance` branch fires when the blast only ends an alliance that is already broken by a traitor or disconnect (no new traitor mark). |
| O5 | `render-settings.json`, ref v0.36.2 | https://github.com/openfrontio/OpenFrontIO/blob/v0.36.2/src/client/render/gl/render-settings.json | Exact colors: `allianceColor` = RGB(1, 0.85, 0.1) — a golden **amber/yellow**; `traitorColor` = RGB(1, 0.2, 0.2) — a strong **red**. |
| O6 | `NukeAlliance.ts` + `Config.ts` (`nukeAllianceBreakThreshold` / `nukeMagnitudes`), ref v0.36.2 | https://github.com/openfrontio/OpenFrontIO/blob/v0.36.2/packages/engine-lib/src/execution/NukeAlliance.ts | The engine-side `wouldNukeBreakAlliance()` check: counts structures destroyed plus a weighted tile count in the blast and compares against the `nukeAllianceBreakThreshold` (100-tile) to decide whether a strike counts as "breaking" an ally's holdings. This is the same magnitude the client's warning is built on. |

**Official primary URL count (first-hand): 6** — all from `openfrontio/OpenFrontIO` at the pinned `v0.36.2` ref (O1–O2 also traceable to the v0.36.0 release note).

### Verified facts (code + release notes, ref v0.36.2)

| Fact | Value | Source |
|------|-------|--------|
| Which bombs show a radius circle | Only **Atom bomb** and **Hydrogen bomb** (the two nukes with an area radius). All other structures/units show no blast-radius warning circle. | O4 |
| Circle states | Three states: **white/none** (no threat), **amber/yellow `alliance`** (breaks an already-broken alliance), **red `traitor`** (betrays a loyal ally → you become a traitor). | O3, O4 |
| Amber/yellow meaning | The strike would **end an alliance that is already broken** by a traitor mark or a disconnect — i.e. it destroys an ally's holdings but does **not** add a new traitor mark to you. | O1, O3, O4 |
| Red meaning | The strike would **betray a currently-loyal ally**, so the engine adds a **traitor mark** to you. | O1, O3, O4 |
| Red color over time | v0.36.0 = **flashing red** (`flashHz`); v0.36.2 = **persistent solid red** (`flashHz` removed). | O1, O2 |
| Amber color | RGB(1, 0.85, 0.1) — golden amber/yellow. Red color RGB(1, 0.2, 0.2). | O5 |
| Alliance-break magnitude | Engine `wouldNukeBreakAlliance()` compares structures destroyed + weighted tiles in blast against `nukeAllianceBreakThreshold` = **100 tiles**. | O6 |
| When the circle appears | Only while the nuke ghost is being aimed (build/attack preview), over the blast footprint. | O3, O4 |

**Version-boundary note (why this is a v0.36 topic):** Before v0.36.0 there was **no** color-differentiated blast-radius warning on the bomb ghost — players could not see, at aim time, whether a strike would make them a traitor. v0.36.0 introduced the two-tone circle; v0.36.2 changed the red state from flashing to solid. So the guide documents a genuinely new, current-v36 pre-flight read.

---

## 2. Community sources — Reddit (r/Openfront)

Accessed 2026-11-15 via the **arctic-shift** archive API (https://arctic-shift.photon-reddit.com/api/posts/ids) because Reddit's `*.json`, old.reddit, redlib, PullPush and direct-URL paths were all bot-walled / 403 from this datacenter IP. Three verified on-topic discussions were opened and analyzed; thread bodies captured locally.

| # | Title (verified) | URL (canonical) | Date (rel.) | Player question addressed | Key observation |
|---|------------------|-----------------|-------------|---------------------------|-----------------|
| R1 | "Accidental nuke betrayals are fucking stupid." | https://www.reddit.com/r/Openfront/comments/1o9kq03/accidental_nuke_betrayals_are_fucking_stupid/ | 2025-10-18 (~13 mo) | Can a nuke accidentally make you a traitor? | A player with the crown + alliance with #2 drops a Hydrogen bomb on a third player; #2 grabs a few tiles first, the blast hits that tile, and the OP gets a broken-shield traitor mark and loses. Directly motivates *why* a pre-flight color read matters. |
| R2 | "Nuking an enemy and accidentally hitting some land of an ally SHOULD not make you a traitor." | https://www.reddit.com/r/Openfront/comments/1ol7q4s/nuking_an_enemy_and_accidentally_hitting_some/ | 2025-10-31 (~12 mo) | Should grazing an ally's land be a full betrayal? | OP argues a small % of an ally's land being hit should only break the alliance / stop trade, not apply the "50% defence nerf" (the traitor debuff). Reflects the community boundary between *breaking* and *betraying*. |
| R3 | "Dumb way to lose a game" | https://www.reddit.com/r/Openfront/comments/1w4ktwo/dumb_way_to_lose_a_game/ | 2026-09-01 (~2 mo) | How do I stop nuking into an ally's land? | An ally next to OP gets nuked and conquered; OP retaliates but their own nuke clips "a tiny bit" of the (now-reclaimed) ally's land and triggers betrayal → loss. A very recent, concrete accidental-betrayal case. |

**Reddit verified discussions opened & analyzed: 3** (≥ 3 required). All accessed 2026-11-15 via arctic-shift.

**Limitations (Reddit):** All three threads are *complaints* that predate or run alongside v0.36.0; none mentions the new color circle by name (the feature postdates R1/R2 and is concurrent with R3). They are used to establish the **player question and stakes** (accidental nuke betrayal is a real, recurring, game-ending failure), not to make any numeric/feature claim. Thread bodies captured; per-comment upvote counts approximate (arctic-shift snapshot). Direct `*.json`/old.reddit were 403/bot-walled; arctic-shift was the only working path.

---

## 3. Community sources — YouTube

Accessed 2026-11-15. Full caption transcripts were retrieved via `youtube-transcript-api` and saved under `docs/research/_yt/`; each video's title + channel were **oEmbed-verified** (authoritative, no auth). Five videos were verified; their transcripts were scanned for nuke/alliance/traitor/bomb coverage.

| # | Title (oEmbed-verified) | URL (canonical) | Channel | Player question | Verification |
|---|-------------------------|-----------------|---------|-----------------|--------------|
| Y1 | "OpenFront.io Official Tutorial" | https://www.youtube.com/watch?v=EN2oOog3pSs | Enzo Plays (official) | Core bomb types + betrayal mechanics | Transcript saved (`official-tutorial.txt`, 844 words). Confirms: "if you betray someone, you get a significant defense debuff for 30 seconds"; lists bomb options. |
| Y2 | "OpenFront.io Beginner's Guide: Mechanics" | https://www.youtube.com/watch?v=9LOx9lFJn6I | Enzo Plays | Beginner bomb/mechanics framing | Transcript saved (`enzo-beginner-mechanics.txt`, 5,598 words); 108 nuke/alliance/ally/traitor-relevant sentences. |
| Y3 | "OpenFront.io V28 Tutorial & Guide" | https://www.youtube.com/watch?v=olDiv-q8KMo | Enzo Plays | Long-form mechanics incl. alliances | Transcript saved (`enzo-v28.txt`, 6,580 words); 145 relevant sentences. |
| Y4 | "OpenFront Beginner Guide (2026) \| How to Win Your First Games" | https://www.youtube.com/watch?v=7J5zwb_s_Cg | Lonely_Millennial | 2026-current beginner strategy | Transcript saved (`ultimate-tutorial.txt`, 6,446 words); covers "the bombs… there's the atom bomb… generally only use it on structure-dense areas." |
| Y5 | "Openfront.io Beginner's Guide" (best-way-to-play) | https://www.youtube.com/watch?v=IeR36481zsI | (beginner guide) | Economy + bomb spend timing | Transcript saved (`best-way-to-play.txt`, 2,447 words); 27 relevant sentences. |

**YouTube videos transcript-verified: 5** (≥ 3 required). All accessed 2026-11-15; full captions saved, not just titles.

**Limitations (YouTube):** These are third-party/official-creator commentary. None of them documents the **v0.36 two-tone blast circle** specifically (most predate v0.36), so they inform *how beginners are taught to read a bomb's effect and the betrayal/debuff penalty* and the qualitative stakes — **no numeric or color-mapping claim in the guide rests on these videos.** The official tutorial (Y1) is the closest first-hand anchor for the 30-second betrayal defense debuff.

---

## 4. Cross-source synthesis

**Consensus player question across Reddit + YouTube:** *"How do I stop accidentally nuking into an ally's land and getting branded a traitor — and how do I tell, before I fire, that a strike is about to make me a traitor versus just break an alliance I already lost?"*

That is exactly the decision the v0.36 blast-radius circle answers at aim time:
- **Amber/yellow** = the strike only ends an alliance that is *already broken* (traitor/disconnected ally) → you will **not** get a new traitor mark. Safe to fire if your real target is the enemy.
- **Solid red** = the strike would betray a *currently-loyal* ally → you **will** be marked a traitor and eat the ~30-second defense debuff. Do not fire unless you intend to betray.

**Decision-relevant facts traceable only to official sources (O1–O6):** which bombs show the circle, the three color states and their exact meanings, the amber→red color values, the v0.36.0 flashing→v0.36.2 solid-red change, and the 100-tile alliance-break threshold. Community sources (Reddit R1–R3, YouTube Y1–Y5) establish *why* the read matters (accidental betrayal is game-ending) and the *player framing*; every number, color and version boundary cites O1–O6.

**Failure modes the guide must cover (from the threads):**
1. Nuke aimed at an enemy clips a loyal ally's border → **red** → traitor mark + 30s debuff (R1, R3).
2. Nuke clips the land of an ally you already betrayed / who disconnected → **amber** → alliance ends, no new traitor mark (R2).
3. Misreading amber as "safe from all consequences" — the alliance still breaks and trade stops; amber ≠ "no cost," it means "no *traitor* mark."
4. Aiming mid-battle where an ally is *currently* adjacent to the target → the circle flips red the instant the ghost overlaps the ally's live territory.

---

## 5. Source totals

- Official first-hand URLs: **6**
- Reddit discussions verified & analyzed: **3** (canonical URLs recorded; ≥ 3 required)
- YouTube videos transcript-verified: **5** (canonical URLs recorded; ≥ 3 required)
- Community-source English research word count: **> 600** (see §6)

## 6. Research-notes word count (English)

This pack's English analytical prose (§1 notes, §2, §3, §4 plus this section) exceeds 600 English words; the saved arctic-shift thread bodies and the five `docs/research/_yt/*.txt` transcripts (~24,000 words combined) are the raw material. All quantitative game facts, color mappings and version boundaries are traced to official `openfrontio/OpenFrontIO` sources at `v0.36.2`.

**Access date for all sources: 2026-11-15.**
