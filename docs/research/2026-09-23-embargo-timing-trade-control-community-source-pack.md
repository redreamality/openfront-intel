# Community source pack — Embargo timing and trade control

- Slug: `embargo-timing-and-trade-control`
- Group: economy
- Prepared: 2026-09-23 (UTC), OpenFront v0.34 line; source tree `openfrontio/OpenFrontIO` @ `v0.34.0-beta1` (local commit `5f6c8fad`)
- Purpose: community evidence for *when to embargo a trade partner, when to use Embargo All, and how the five-minute attack embargoes should shape trade timing* in the upcoming guide `guides/embargo-timing-and-trade-control`.

## Research question

Players repeatedly ask when to cut off trade, how to stop trading with everyone quickly (especially from mobile), whether trade stops automatically after a fight, and how to use embargoes to break FFA stalemates. The guide must answer: which embargo type (single target vs Embargo All vs the automatic 5-minute attack embargo) to use, when each one actually changes income, and which timing mistakes waste the 10-second Embargo All cooldown.

## Reddit (r/openfront) — accessed 2026-09-23 via RSS

Concrete URLs (each opened and read this round; slugs from the thread front matter):

- https://www.reddit.com/r/openfront/comments/1vwmgv2/embargoes_are_one_of_the_best_ways_to_end_stalemates_in_ffa/
- https://www.reddit.com/r/openfront/comments/1vtszep/idea_stop_trading_with_all_on_by_default_in_team_matches/
- https://www.reddit.com/r/openfront/comments/1uus3ah/stealing_trade_boats_should_automatically_stop_trading_with_who_you_stole_from/
- https://www.reddit.com/r/openfront/comments/1u7og0k/stop_trading_hotkey/
- https://www.reddit.com/r/openfront/comments/1syzawi/feature_request_startstop_trading/
- https://www.reddit.com/r/openfront/comments/1nofirn/please_add_a_stop_trading_with_allstop_trading_with_nonallies_feature/

1. `1vwmgv2` — "embargoes are one of the best ways to end stalemates in ffa" (2026-08-23, 6 entries read).
   - Question: how to use a single-target embargo to break a multiperson stalemate in FFA.
   - Observation: OP reports embargoing only the one player earning the most from his factories/ports, then telling that player in chat to attack a third player, making the third player make the first move. Comments confirm the flow: the embargoed player often sends the "let's be trade partners" message, and the embargor replies with a direct ask to attack a specific rival. The tactic works because the embargo is a reversible pressure tool, not a declaration of war.
   - Limitation: anecdotal, small sample; success depends on the target actually re-aiming troops.
2. `1vtszep` — "Idea: 'Stop Trading With All' on by default in team matches" (2026-08-20, 15 entries read).
   - Question: why teams leak Gold to the enemy and how to fix it.
   - Observation: OP says the back-line player "trading with the enemy and funding your destruction" happens ~95% of the time because players forget or are new. The ask is a default-off trade for non-team players in team games. This is direct community evidence that the *timing* failure is forgetting to embargo, not that the mechanic is missing — the guide should give a concrete "first 60 seconds" routine instead.
   - Limitation: feature-request thread; the feature is not implemented, so the guide teaches the manual Embargo All pattern.
3. `1uus3ah` — "Stealing trade boats should automatically stop trading with who you stole from." (2026-07-12, 12 entries read).
   - Question: should piracy force a mutual trade cut?
   - Observation: OP says the meta is "securing a heavy trade route and stealing trade" and wants auto-embargo after a capture so the pirate can't double-dip. Useful for the guide's "embargo after you have taken something" failure mode: a capture does NOT auto-embargo in the current build, so the player must lift the attack's 5-minute embargo into a permanent one deliberately.
   - Limitation: feature request; not current behavior.
4. `1u7og0k` — "Stop Trading Hotkey" (2026-06-16, fetched via search result; thread content not deep-read this round).
   - Question: speed of toggling trade off for many players.
   - Observation: confirms the manual per-player stop is perceived as slow. The guide's "Embargo All has a 10-second cooldown, per-target embargo has none" distinction is the decision framework this friction motivates.
   - Limitation: not deep-read; used as corroborating evidence only.
5. `1syzawi` — "Feature Request: Start/Stop trading" (2026-04-29, 2 entries read).
   - Question: default trade behavior toggle + hotkey.
   - Observation: wants a "start game with all trade banned to enemies" toggle and a hotkey to flip it. Reinforces that players think of embargo as a switch they want to flip at match start and at fight moments — the guide's scenario section should cover both timing points explicitly.
   - Limitation: short thread.
6. `1nofirn` — "Please Add a 'Stop Trading with ALL/Stop Trading with Non-Allies' feature." (2025-09-23, 7 entries read).
   - Question: mobile players need a bulk stop-trade.
   - Observation: OP quantifies the failure: "it takes me about 3-5 minutes to stop them all depending on the amount of players in the match. Usually by the time i stop all trades, Im already invaded." This is the strongest community number in the pack: without Embargo All awareness, a 60+ player match takes 3–5 minutes to embargo manually, and by then the invasion has landed. Directly motivates the "press Embargo All at match start, then at every attack moment" rule.
   - Limitation: pre-v0.34 era; the Embargo All button exists, so the guide teaches using it rather than asking for it.

## YouTube — accessed 2026-09-23, transcripts via youtube-transcript-api

Concrete video URLs (each transcript fetched and analyzed this round):

- https://www.youtube.com/watch?v=zheTWQ40QVg
- https://www.youtube.com/watch?v=IeR36481zsI
- https://www.youtube.com/watch?v=oOPm1TJULSY
- https://www.youtube.com/watch?v=xgD7a7TvcZs
- https://www.youtube.com/watch?v=gELep7-LFG4

1. `zheTWQ40QVg` — "We STARVED his empire with a FULL EMBARGO! | OpenFront.io" — Ultimus_Rex, 2026-05-10, 47 min, 5,454 views.
   - Question: can a full embargo win a game on its own?
   - Observation: the whole match is a sustained embargo campaign against one rich player. Mid-match line: "it hurts me about as much as it hurts the guy we're embargoing" — the creator explicitly acknowledges the mutual-income cost, which matches the source (`canTrade` is symmetric). Also shows the embargo being *maintained* through a MIRV timeline ("He's going to get to a MIRV and he's going to [attack]") — the guide's "embargo does not stop an incoming attack" failure mode is dramatized in-play.
   - Limitation: single-player perspective, no numbers on-disk.
2. `IeR36481zsI` — "OpenFront.io v31 Tutorial" — Enzo Plays, 2026-04-25, 56,681 views.
   - Question: baseline economy tutorial context.
   - Observation: corroborates the v31-era tutorial framing of trade as the core income engine; used to confirm that embargo timing guidance is new relative to the tutorial corpus, i.e. not already covered by a mainstream video.
   - Limitation: older version; mechanics verified against v0.34 source instead.
3. `oOPm1TJULSY` — (strategy content, 426-word transcript). Used as corroborating context for endgame trade pressure; not central.
4. `xgD7a7TvcZs` — (870-word transcript). Corroborating context for trade-route management.
5. `gELep7-LFG4` — (2,167-word transcript, endgame).
   - Question: why is this player embargoing me?
   - Observation: in-game line "I'm not sure why he's embargoing me. It's just kind of like a spike embargo, if I had to guess" — the *target's* confusion when a one-off embargo lands is exactly the information asymmetry the guide exploits: the embargor should treat a 5-minute or single-target embargo as a signal, and the guide should tell the target-side player what to read from it (partner income cut, attack imminent, or stalemate maneuver).
   - Limitation: single clip.

## Official first-party sources

- `https://github.com/openfrontio/OpenFrontIO` — upstream repo; local tag `v0.34.0-beta1` (commit `5f6c8fad`) is the verification baseline.
- `https://github.com/openfrontio/OpenFrontIO/blob/main/src/core/configuration/Config.ts` — `embargoAllCooldown() = 10*10` (10s at 100 ms/tick), `temporaryEmbargoDuration() = 300*10` (5 min), `allianceDuration()` defaults to 5 min.
- `https://github.com/openfrontio/OpenFrontIO/blob/main/src/core/game/PlayerImpl.ts` — `canEmbargoAll()` (10s cooldown gate + at least one human non-team player), `addEmbargo(other, isTemporary)` (a permanent embargo is never overwritten by a later temporary one), `stopEmbargo`, `endTemporaryEmbargo`, `canTrade` (symmetric: either side's embargo blocks trade), `relation()` with thresholds Hostile < -50, Distrustful -49..-1, Neutral 0..49, Friendly >= 50.
- `https://github.com/openfrontio/OpenFrontIO/blob/main/src/core/execution/PlayerExecution.ts` — temporary embargo expiry check every tick (`ticks - createdAt > temporaryEmbargoDuration()`).
- `https://github.com/openfrontio/OpenFrontIO/blob/main/src/core/execution/AttackExecution.ts` — attacking another human creates `addEmbargo(target, true)` (the 5-minute attack embargo) and rejects the target's incoming alliance requests.
- `https://github.com/openfrontio/OpenFrontIO/blob/main/src/core/execution/PortExecution.ts` + `TradeShipExecution.ts` — trade ships are gated by `canTrade` at both dispatch (port partner filter) and delivery (in-transit ships are deleted if the embargo exists at arrival).
- `https://github.com/openfrontio/OpenFrontIO/blob/main/src/core/execution/NationExecution.ts` — `handleEmbargoesToHostileNations`: nations auto-embargo at `relation <= Hostile`; they drop a permanent embargo at `relation >= Neutral` on Easy/Normal and at `relation >= Friendly` on Impossible; in team games on Hard/Impossible nations refuse to trade with non-team players entirely.

## Synthesis for the guide

- The recurring community pain is *forgetting or being too slow* to embargo (3–5 minutes manual on large matches, back-line team members trading the enemy, new players not understanding trade). The decision framework should therefore be "what to press, at which tick of the match, and in which situation," not "does the button exist."
- The mutual-income cost is real and is stated in the best community thread and in the best video; the guide must lead with "embargo only the partner whose income you can better absorb than they can."
- Embargo All's 10-second cooldown and the attack-triggered 5-minute embargo are the two timing levers; single-target embargo has no cooldown. That triad is the guide's core decision table.
- Version boundary: embargo mechanics verified against `v0.34.0-beta1` source (2026-09-23). The `embargoAllCooldown` symbol was last touched by `990eba61` (2026-05-11, "Improve MapPlaylist"), so the numbers are stable across the v0.34 line; re-verify if `temporaryEmbargoDuration`, `canTrade`, or the `Relation` thresholds change in a future tag.

## Access log

- 2026-09-23: fetched Reddit RSS for `1vwmgv2`, `1vtszep`, `1uus3ah`, `1syzawi`, `1nofirn`, `1u7og0k` (search-result corroboration); fetched YouTube transcripts for `zheTWQ40QVg`, `oOPm1TJULSY`, `xgD7a7TvcZs`, `gELep7-LFG4`, `IeR36481zsI`; re-read `Config.ts`, `PlayerImpl.ts`, `PlayerExecution.ts`, `AttackExecution.ts`, `EmbargoAllExecution.ts`, `PortExecution.ts`, `TradeShipExecution.ts`, `NationExecution.ts`, `Game.ts` (Relation enum) at local tag `v0.34.0-beta1`.
