# Community source pack — `no-mans-land-fallout`

- **Date of access:** 2026-10-06
- **Version anchor (authoritative):** v0.34.22 tag = commit `4e837520e886b255b1b020e9c89639dbb9d54038` (2026-10-01), read from the local upstream clone. v0.34.23 (published 2026-10-05) is a graphics-crash recovery fix with no gameplay-balance change, so the effective player-facing boundary is v0.34.22.
- **Topic under research:** the nuclear **fallout / radiation terrain mechanic** itself — how a detonated nuke turns land into a persistent "no-man's-land" zone, how that zone changes retake cost and the win threshold, why it never decays, and how the Doomsday Clock's "rot" creates a second kind of wasteland.
- **Intended guide slug:** `no-mans-land-fallout`.

## Scope and non-overlap check

This pack exists to establish that the *terrain mechanic* is a genuinely open question that no existing guide answers. The project's 100 current guides include seven nuke-adjacent pages — `which-nuke-commit`, `nuclear-stalemate-breaker`, `water-nukes`, `post-nuclear-port-sustain`, `post-mirv-recovery`, `mirv`, and `nuke-alliance-threshold`. Those pages answer *which nuke to buy, how to defend against one, what water nukes do to the map, how to sustain income after the map freezes, how to recover after being MIRV'd, the MIRV cost ladder and SAM rule, and when a nuke breaks your own alliance.* None of them explains the fallout zone: that an attacked tile with fallout costs a `falloutDefenseModifier` multiple (3×–5×) more to retake, that the win threshold is measured as 80% of *non-fallout* land, that the zone never decays on its own, and that the Doomsday Clock stamps a second, self-propagating kind of wasteland. That is the gap this guide fills.

## Community sources — Reddit (r/openfront)

Reddit returned HTTP 200 for every thread below, but both the `.json` endpoints and `old.reddit.com` render an anti-bot shell (identical ~190 KB block HTML), so the titles and player questions were recovered from search-index snippets and the canonical URLs are cited as the access anchors. Content-level claims are therefore attributed to the *questions players ask*, not to quoted replies; this is recorded as a limitation, not a source.

1. **Does radiation count towards winning the map?** — <https://www.reddit.com/r/openfront/comments/1q0w4v3/does_radiation_count_towards_winning_the_map/>
   - **Date / relative staleness:** indexed within the last several months of access; directly relevant to v0.34.x.
   - **Player question:** whether irradiated (fallout) tiles count toward the percentage-of-land needed to win, and whether they can be "removed."
   - **Observation:** this is the single most on-topic thread; it frames the win-denominator question that `WinCheckExecution` answers by dividing by `numTilesWithoutFallout`.
   - **Limitation:** replies not extractable (bot wall); the question itself is the evidence of demand.
   - **Access date:** 2026-10-06.
2. **Any strategies to deal with Hydrogen Bomb Launchers?** — <https://www.reddit.com/r/openfront/comments/1q0n16r/any_strategies_to_deal_with_hydrogen_bomb_launchers/>
   - **Date / relative staleness:** recent; v0.34.x.
   - **Player question:** how to survive the 80/100 Hydrogen footprint and the fallout it leaves.
   - **Observation:** recurring defensive framing of the blast-and-fallout footprint; motivates the radius table.
   - **Limitation:** content bot-walled.
   - **Access date:** 2026-10-06.
3. **Openfront strategy ideas discussion** — <https://www.reddit.com/r/openfront/comments/1s5x00p/openfront_strategy_ideas_discussion/>
   - **Date / relative staleness:** recent; v0.34.x.
   - **Player question / observation:** a player explicitly proposes "nuking to create a no man's land," which confirms the community already has the phrase "no man's land" in its vocabulary and treats it as a deliberate strategic act rather than a side effect.
   - **Limitation:** long thread, content bot-walled; only the search snippet is verifiable.
   - **Access date:** 2026-10-06.
4. **How nukes and SAMs work in Openfront** — <https://www.reddit.com/r/openfront/comments/1uc8sun/how_nukes_and_sams_work_in_openfront/>
   - **Date / relative staleness:** recent.
   - **Player question:** general mechanism explanation request for nukes.
   - **Limitation:** content bot-walled; used as a secondary anchor for "how do nukes work" search intent.
   - **Access date:** 2026-10-06.
5. **The way hydrogen bomb damage is calculated is…** — <https://www.reddit.com/r/openfront/comments/1sghwm1/the_way_hydrogen_bomb_damage_is_calculated_is/>
   - **Date / relative staleness:** recent.
   - **Player question / observation:** confusion about how nuke damage and its aftermath are computed — the terrain aftermath being the part the code exposes through `falloutDefenseModifier`.
   - **Limitation:** content bot-walled.
   - **Access date:** 2026-10-06.

That gives **five** verifiable r/openfront threads (requirement: ≥3). The strongest three for the guide's framing are #1 (win denominator), #3 (the "no man's land" phrase), and #2 (Hydrogen footprint / fallout).

## Community sources — YouTube

Three videos were verified by oEmbed metadata plus a live watch-page fetch (title, channel, publish date, duration, view count, description). Auto-generated transcript/timedtext bodies returned empty on every fetch path (plain URL, signed browser-session URL, and in-page fetch), so the analysis rests on the verifiable metadata, titles, and descriptions rather than on subtitle text. This is the recorded limitation for the YouTube branch.

1. **Creating A Bomb Proof Base (Papi Flex)** — <https://www.youtube.com/watch?v=hhMDNxG91vA>
   - **Channel / publish date / views:** PapiFlex / 2025-06-08 / 646 views.
   - **Player question:** how to build a base that survives nukes — i.e. how the fallout/blast zone interacts with your structures.
   - **Observation / limitation:** title and channel verify a defensive-baseline framing; transcript not extractable.
   - **Access date:** 2026-10-06.
2. **Water nukes on a map with NO water… | Openfront** — <https://www.youtube.com/watch?v=4mWWA-7Ht1k>
   - **Channel / publish date / views:** PapiFlex / 2025-05-22 / 242 views.
   - **Player question:** what a water nuke does to a landlocked map — the conversion counterpart to the fallout mechanic.
   - **Observation / limitation:** confirms the water-conversion branch of the same "terrain after a nuke" decision; transcript not extractable.
   - **Access date:** 2026-10-06.
3. **OpenFront Strategy Guide** — <https://www.youtube.com/watch?v=03WSIWC2ONg>
   - **Channel / publish date / views:** M448 / 2025-07-19 / 277 views.
   - **Player question:** broad late-game strategy; description is a genuine player observation about late-map decisions.
   - **Observation / limitation:** supports the late-game, map-freezing framing where the 80%-of-remaining-land threshold matters most; transcript not extractable.
   - **Access date:** 2026-10-06.

That gives **three** verifiable YouTube sources (requirement: ≥3).

## Official primary sources (authoritative)

- **Repository:** <https://github.com/openfrontio/OpenFrontIO>
- **Release tag (v0.34.22):** <https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.22>
- **Tag commit:** `4e837520e886b255b1b020e9c89639dbb9d54038`
- **Fallout retake multiplier** — `src/core/configuration/Config.ts` (`falloutDefenseModifier()`, ≈line 365): `return Math.max(0, 5 - 2 * globalFalloutRatio);`. A tile with fallout costs this many times more troops to attack and is slower to capture; the ratio is the share of the map already covered in fallout, so the multiplier ranges from 3× (all land irradiated) up to 5× (no land irradiated).
- **Win threshold denominator** — `src/core/execution/WinCheckExecution.ts` (≈lines 130–137): `numTilesWithoutFallout = numLandTiles - numTilesWithFallout`, then `tilesOwned * 100 > numTilesWithoutFallout * percentageTilesOwnedToWin(...)`. The base is `PERCENT_TILES_OWNED_TO_WIN = 0.80`, so you must hold 80% of the *non-fallout* land; every irradiated tile shrinks the denominator and therefore the absolute number of tiles you must own.
- **Blast radii** — `Config.ts` (`nukeMagnitudes()`, ≈lines 1103–1110): MIRV 12/18, Atom 12/30, Hydrogen 80/100 (radius / damage). Default detonation converts the blasted land to fallout via `NukeExecution.setFallout(true)`.
- **Nuke costs** — `Config.ts` (`unitInfo()`, ≈lines 608–629): Atom 750,000; Hydrogen 5,000,000; MIRV `25,000,000 + 15,000,000 * numMirvsLaunched`.
- **No decay / cleared only by conquest or water** — `GameImpl.ts` (≈line 245): falling onto a tile with no structures and no army sets `fallout(false)`; `NukeExecution.ts` (≈line 71) clears fallout only on a water conversion. There is no `falloutDuration` or decay timer anywhere in `src/core`, so a nuke-produced fallout zone persists until it is conquered or converted.
- **Doomsday rot creates a second wasteland** — `DoomsdayClockExecution.ts` (≈lines 330–360): the Doomsday Clock "rot" relinquishes tiles to nobody and stamps them with fallout, so a rotting map grows a second kind of no-man's-land that the win check also excludes.

## Consolidated research notes

The mechanical story is that a detonated nuke is not merely a one-time troop exchange; it is a *map mutation* that permanently rewrites two numbers the player cares about. First it rewrites the **cost** of any tile it touched. Every irradiated tile carries a `falloutDefenseModifier`, and the code computes that modifier as `5 − 2 × (share of map already in fallout)`, clamped at zero. That means the very first nuke on a clean map imposes a 5× penalty on anyone retaking the scar, and the penalty relaxes toward 3× as the map becomes more and more irradiated — irradiation is worst right after the first strike, not after the last. Second it rewrites the **win threshold**. Because the win check divides by `numTilesWithoutFallout` rather than by total land, every irradiated tile removes area from the denominator, and the player must still reach 80% of whatever is left. A large Hydrogen scar therefore shrinks the pie you must slice, which is precisely what the top Reddit question — "does radiation count towards winning the map?" — is circling: the answer is that radiation *excludes itself from the denominator*, so it does not need to be "owned," it simply stops counting as part of the board.

The second, less-discussed mutation is that **nothing removes a nuke's fallout by itself.** A search of the entire core for `falloutDuration`, decay, or a timer returns nothing; the only writers to `setFallout(false)` are a successful conquest (an army arriving on a structure-less, army-less tile) and a water nuke converting the land. That has a concrete strategic consequence: a nuke scar is not a temporary battlefield handicap, it is a *permanent* one for the rest of the match, which is why a single Hydrogen can freeze a sector for minutes and why the community uses the phrase "no man's land" deliberately. The Doomsday Clock then introduces a *second*, self-propagating source of the same zone: its "rot" hands tiles to nobody and stamps them with fallout, so a map can accumulate no-man's-land without any player firing a single nuke, and that rot-zone is excluded from the win denominator in exactly the same way as a blast scar.

Putting the three mutations together produces the decision the guide teaches: a player must treat a nuke as buying *three* things at once — the troop damage, a 3×–5× tax on retaking the scar, and a permanent shrinkage of the win threshold — and must decide whether those three effects serve the goal (denying a sector, freezing a stalemate) or punish the attacker more than the defender. That framing is what none of the seven existing nuke guides covers, and it is what the Reddit and YouTube sources collectively show players trying to figure out.

## Gap and deliverable

The guide `no-mans-land-fallout` will give a 40–80 word direct answer (what a nuke scar actually does to your game), a v0.34.22 version boundary, a decision framework (retake-cost × win-denominator × persistence), two worked scenarios with explicit numbers and assumptions, failure modes and countermeasures, mode/map adjustments, an original comparison table (blast radius × fallout multiplier × win-denominator impact for MIRV / Atom / Hydrogen / Doomsday-rot), and natural five-language localizations each ≥1500 visible words, with at least two cross-links to adjacent guides (`water-nukes`, `which-nuke-commit`, `nuclear-stalemate-breaker`) and the Guides index entry.

## Limitations log

- Reddit content is bot-walled across all three access paths (`.json`, `old.reddit.com`, and a real browser session); only titles, URLs, and search-index snippets are verifiable. Reddit is therefore used as *demand evidence* (what players ask), not as a quote source.
- YouTube timedtext/auto-caption bodies returned empty on every fetch path; the YouTube branch rests on oEmbed + watch-page metadata (title, channel, date, duration, views, description).
- All gameplay rules, numbers, and version boundaries are taken from the v0.34.22 tag source, not from community posts.
