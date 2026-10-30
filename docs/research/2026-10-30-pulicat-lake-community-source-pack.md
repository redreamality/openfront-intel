# Pulicat Lake — Community Source Pack (2026-10-30)

Research pack for the dedicated **Pulicat Lake** map guide. Pulicat Lake is a new v0.35
Asian map: an enclosed lagoon with a single sea entrance and a pirate island in the door.
This pack records the community discussions, videos/subtitles, and official sources actually
opened and analyzed, the player questions they raise, and the limitations of each source.
All numeric rules were re-verified against the formal v0.35.0 release (2026-10-16), the
official upstream map manifest, the engine source, and the linked community guides.

## Player questions driving the topic

The OpenFront subreddit and YouTube v0.35 coverage cluster around the same question for a
lagoon map: *what actually decides a Pulicat Lake game?* Three sub-questions recur.
First, the geometry question: the lagoon has only one sea entrance, so a small number of
Warships at the strait can gate every crossing — the community's "warship screen" complaint
("Micro boat spamming needs a massive fix", r/Openfront) is really about how a single hull
denies a whole lane. Second, the economy question: the pirate island sitting in the entrance
is a natural Warship dock and piracy hub, so players ask how to convert that position into
income and how shoreline piracy protection limits a pirate. Third, the spawn question: with
only 12 named Indian nations across a 1,176×1,796 board that is roughly 40% land, which
coast to commit to before the countdown ends.

## Reddit sources (opened and analyzed)

1. **A Guide to Warships** — r/Openfront, 2026-10-10 (submission `1x2nyco`).
   URL: https://www.reddit.com/r/Openfront/comments/1x2nyco/a_guide_to_warships/
   Player question: how do Warships actually behave — cost, combat, veterancy, retreat,
   healing. Observed: a community-published reference that the engine source confirms
   (base 1,000 HP; rolled shell 200–300; 130-tile detection; 20-tick cooldown; 75% auto
   retreat; 150-tile passive 10 HP/s heal; docked heal `10 + 50 × (port level / docked
   warships)`; 3-level +20% per-level veterancy; cost ladder 250k/500k/750k/1M). Limitation:
   a single author's summary, not an official doc; numbers were re-checked against the tag.
   Access date: 2026-10-30.
2. **A Guide to Piracy** — r/Openfront, submission `1x1r675`.
   URL: https://www.reddit.com/r/Openfront/comments/1x1r675/a_guide_to_piracy/
   Player question: how does piracy income work and when is it worth it. Observed: piracy
   uses the same distance-based payout as trade; the distance already traveled counts
   toward the payout; a sweet spot near 378 tiles; a 20-tick (2 s) shoreline protection
   that refreshes on each shoreline tile makes piracy along narrow rivers effectively
   impossible; a Warship cannot pirate allied, same-team, or own-port-bound trade ships;
   25 captured trade ships = one veterancy level. Limitation: the distance-based payout
   formula is reproduced as an image, so the exact per-tile coefficient was not re-derived
   here and the guide treats the payout as directionally (not numerically) fixed.
   Access date: 2026-10-30.
3. **Micro boat spamming needs a massive fix** — r/Openfront, 2026-10-13 (submission `1x4l4q7`).
   URL: https://www.reddit.com/r/Openfront/comments/1x4l4q7/micro_boat_spamming_needs_a_massive_fix/
   Player question: why does a small boat spam feel unstoppable and how do you stop it.
   Observed: the attacker's complaint that one country can "infinity spam small population
   boats" with no answer; the community's own answer is the Warship screen, which is exactly
   the mechanic a single-entrance lagoon like Pulicat rewards. This is the decision context
   for the map's strait. Access date: 2026-10-30.
4. **Is Faroe Islands Still in FFA Rotation?** — r/Openfront, 2026-07-27 (submission `1v8g6ig`).
   URL: https://www.reddit.com/r/Openfront/comments/1v8g6ig/is_faroe_islands_still_in_ffa_rotation/
   Player question: which maps actually rotate after the v0.35 map additions. Observed:
   players notice old maps fading as the twelve new maps enter the pool, which is the rotation
   context for Pulicat Lake's `multiplayer_frequency` of 3 (a rarer public draw).
   Access date: 2026-10-30.

## YouTube sources (opened and analyzed via subtitles)

1. **OpenFront v0.35 new maps / strategy walk-through** (video `EdcdsayA_ac`, auto-captions).
   URL: https://www.youtube.com/watch?v=EdcdsayA_ac
   Observed: the creator explicitly waits for the v0.35 meta to "solidify" and pulls most
   facts from the openfront.mmira.org wiki; the video covers v0.35 strategy recommendations
   including Warships (26 subtitle mentions) and Port building (32). It treats the new maps
   as a tempo/rotation shift. Subtitle file: `sub_EdcdsayA_ac.en.vtt`. Access date: 2026-10-30.
2. **OpenFront v0.35 gameplay, 210-player FFA** (video `1j40agKqVS4`, auto-captions, ~51 min).
   URL: https://www.youtube.com/watch?v=1j40agKqVS4
   Observed: long-form FFA commentary where Warships, boats, and Port control dominate the
   late game; the comment confirms that in a dense FFA the naval lane and Port dock are the
   deciding infrastructure. Subtitle file: `sub_1j40agKqVS4.en.vtt`. Access date: 2026-10-30.
3. **OpenFront v0.35 new maps round-up** (video `ZVqFS-RJcYc`, auto-captions).
   URL: https://www.youtube.com/watch?v=ZVqFS-RJcYc
   Observed: a shorter v0.35 new-maps pass; used to confirm the community treats the new
   water maps as the headline v0.35 content. Subtitle file: `sub_ZVqFS-RJcYc.en.vtt`.
   Access date: 2026-10-30.

## Official first-party sources

1. **OpenFront v0.35.0 release (2026-10-16)** — first-party.
   URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0
   Quote (release notes): "Pulicat Lake: a lagoon with a single sea entrance, and a pirate
   island in the door — Panindhra Tallapudi", plus a follow-up "Better terrain for Pulicat
   Lake". This is the authoritative one-line description the guide is built on.
2. **Official upstream map manifest** — first-party data.
   Path: `resources/maps/pulicatlake/manifest.json`. Facts: id `PulicatLake`, name
   "Pulicat Lake", categories `["asia","new"]`, grid `1176 × 1796`, `num_land_tiles`
   `851,671`, `multiplayer_frequency` 3, `special_team_count` 2, 12 nations all flagged
   `in` (Chittamur, Dugarajapatnam, Nelapattu, Sriharikota, Sullurpeta, Venadu, Irakkam,
   Sunnambukulam, Elavur, Annamalaicheri, Pulicat, Gummidipoondi). Grid total 1176×1796 =
   2,111,616 tiles; 851,671 land ⇒ ~40.3% land / ~59.7% water, so it is a genuinely water-heavy
   board.
3. **Engine source (warship and trade mechanics)** — first-party.
   Paths: `packages/engine-lib/src/configuration/Config.ts` (Warship `info = { maxHealth: 1000 }`),
   `packages/engine/src/configuration/EngineConfig.ts` (cost `min(1_000_000, (n+1)*250_000)`,
   patrol 100, targeting 130, 75% retreat), and `packages/engine/src/execution/WarshipExecution.ts` /
   `ShellExecution.ts` (shell 200–300 + 20%/level, 20-tick cooldown).

## Limitations

- The two v0.35 map videos are auto-generated captions; proper nouns and exact numbers are
  unreliable, so they are used for the *decision theme* (Warship/Port dominance), never for
  a numeric claim.
- The piracy payout coefficient is an image in the community guide and was not re-derived;
  the guide describes piracy income qualitatively (distance-based, distance-traveled counts,
  one payout to the pirate) rather than giving a false exact gold figure.
- Pulicat Lake's `multiplayer_frequency` of 3 means public data on actual match play is thin;
  the guide states strategy from terrain and verified mechanics, and marks live-client values
  to verify.
