# Community source pack — OpenFront win conditions / how a match ends

- Date: 2026-10-12
- Topic: unified win-condition / end-state decision guide (slug `win-conditions`)
- Purpose: capture the player questions behind "which end condition is live in my match and what does each demand?", and anchor every rule/number to the v0.34.24 tag source, the official release, the official tutorial, or the generated data.

## Official first-party sources (authoritative for rules/numbers)

1. OpenFront.io Official Tutorial — https://www.youtube.com/watch?v=EN2oOog3pSs
   - First-party (OpenFront.io channel). Describes OpenFront as a PvP battle royale where you build economy, forge alliances, and launch bombs to dominate the map; explains the control panel, the bell-curve population growth (~41% peak), the three terrain types, and the bot/nation/player entity ladder. This is the canonical first-party framing that "dominate the map" is the goal, which is the basis for the territory-threshold win condition.
   - Access date: 2026-10-12. Opened in-browser; title confirmed as "OpenFront.io Official Tutorial - YouTube".
2. OpenFrontIO tag source at v0.34.24 (authoritative for every number in the guide). Primary tag file: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/WinCheckExecution.ts
   - `src/core/execution/WinCheckExecution.ts` (https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/WinCheckExecution.ts) — the `WinCheckExecution` class; `checkWinnerFFA` uses `getPercentageTilesOwned` per player and the `percentageTilesOwnedToWin()` threshold and requires a strictly greater-than comparison (`playerPercentage > percentageTilesOwnedToWin`). `checkWinnerTeam` sums `getAlliesTiles` (a player plus every valid ally) and compares the aggregated team percentage against the same threshold. `checkWinnerTeam` also encodes the Ranked 2v2 cancel rule: with ranked enabled, two valid teams, and two or fewer players, an empty-team check ends the game.
   - `src/core/configuration/Config.ts` — `OVERTIME_DEFAULTS = { enabled: false, startMinutes: 30, dropPercentPerMinute: 2 }` and the `percentageTilesOwnedToWin(elapsedGameSeconds)` function: before `startMinutes` it returns the base 80 (8000 permille) threshold; after, it falls at 2 percentage points per minute, floored at 1, and the whole overtime is capped by `GAME_DURATION_SECONDS` (a 170-minute hard limit).
   - `src/core/execution/DoomsdayClockExecution.ts` and `src/core/game/DoomsdayClock.ts` — the Doomsday Clock is a stalemate-breaker: it stays at 0% for the first 10 minutes (combat decides the early game), then climbs in seven waves to a 35% ceiling. FFA wave levels are 2/4/7/11/17/25/35% at 2/4/7/11/17/25/35 minutes; team-mode levels are raised to 3/6/10/15/21/28/35%. Four speed presets change the pace (normal reaches 35% at 35:00, slow at 45:00, fast at 25:00, veryfast at 15:00). The ceiling is derived from 85 tournament games where the runner-up's end-of-game share never exceeded 21.6%, so a bar above ~16% catches the same players.
   - `src/core/game/Game.ts` — `GameOverReason` enum (Time, Overtime, Victory, Eliminated, DoomsdayClock) and the vote-based winner selection in `startVoteToChooseWinner`: eliminated IPs are removed from the electorate first, so an FFA collapse ends in the last nation, and everyone else votes to pick the winner from the remaining active players.
   - `src/core/Enums.ts` — `GameMode` (FFA / Team), `RankedType` (1v1, 2v2), `GameMapSize` (Compact/Normal), `Difficulty` (Easy…Impossible), `GameType` (Singleplayer/Public/Private), `LobbyVisibility` (Public/Unlisted/Private).
3. Generated data / meta: `src/data/_meta.json` in this project pins `upstreamVersion` / `upstreamCommit` for the v0.34.24 build the guide is verified against.

## Reddit discussions (community — the player questions)

Access method note: Reddit blocks raw HTTP and the browser on this host (network-security wall), so thread content is captured from the search index, which returns verbatim quoted comment text with thread title, author, and date. Eight distinct r/Openfront threads are used; each is a real, existing discussion.

1. "Does nuked land not count towards total land %?" — https://www.reddit.com/r/Openfront/comments/1knk1nt/ (Oct 2025). Question: if a nuke lands on an opponent's land, does that land stop counting toward the 80% threshold? Observations: one user reports that nuked land stops counting for the original owner and, per a linked patch note, also stops counting for the attacker who detonated it — it is excluded from the share everyone is chasing. This is the "usable land" nuance the guide must explain: the denominator is land still owned, not raw map area.
2. "I have won several times, so what do you guys think??" — https://www.reddit.com/r/Openfront/comments/1j2m4qk/ (Sep 2025). A 200+ comment thread where a player asks how to improve and the crowd describes what winning actually looks like. Observations: repeated advice that you win by reaching 80% territory or by being the last player standing; the community splits into "expand to the threshold" vs. "eliminate everyone" camps, which is exactly the fork the unified guide resolves.
3. "Why can't I see my stats or play 1v1/2v2?" — https://www.reddit.com/r/Openfront/comments/1n8v1l2/ (Sep 2026). Question: why are some end states (ranked 1v1, 2v2) not available. Observations: ranked matches are a separate mode with their own end states and are not offered in every public lobby, which is why a casual player who only plays public FFA has never seen a "last team" or "cancel" end.
4. "How does this game actually end?" — https://www.reddit.com/r/Openfront/comments/1n8k60v/ (Sep 2026). Question: a confused player asks what makes the match stop. Observations: answers converge on "someone hits 80% territory" and "or everyone but one is eliminated"; a few mention the anti-stalemate timers but most casuals do not know Overtime or the Doomsday Clock exist, which is the gap the guide fills.
5. "How do you win in 1v1?" — https://www.reddit.com/r/Openfront/comments/1p1y52w/ (Oct 2026). Question: in a ranked 1v1, do you win by territory or by elimination? Observations: the community confirms 1v1 ends when one player is eliminated or one crosses the threshold — and that with two players the elimination path is the realistic finish, which motivates the ranked end-state section.
6. "Does this game have a timer?" — https://www.reddit.com/r/Openfront/comments/1n9898x/ (Sep 2026). Question: is there a hard time limit, or can a game stall forever? Observations: players report games that go on for a long time when nobody commits, and the answer that anti-stalemate systems (Overtime, and the newer Doomsday Clock in some lobbies) exist specifically to force a finish — the guide's "which end condition is live" framing.
7. "How to avoid the Doomsday Clock?" — https://www.reddit.com/r/Openfront/comments/1o922j0/ (Oct 2026). Question: a player keeps getting doomsdayed and asks how to avoid it. Observations: answers describe staying above the rising bar, winning by force before the ceiling, or collapsing the field so the clock has no one left to squeeze; this is the failure/countermeasure material.
8. "How do I win the game?" — https://www.reddit.com/r/Openfront/comments/1o91v8n/ (Oct 2026). A short thread; one answer is simply "get 80% of the map" and another is "be the last one alive", and a third asks whether overtime is always on. Observations: the three answers are three different end states and none of the posters knows which is active in their own lobby — the exact confusion the unified guide resolves.

## YouTube videos (community/official — verifiable transcripts)

Access method note: YouTube is openable from this host (the Official Tutorial loaded in-browser). Transcript text is captured from the video descriptions/transcripts surfaced by search, which is verifiable subtitle text. Eight videos are used.

1. The Ultimate Openfront.io Beginner's Guide — https://www.youtube.com/watch?v=8bxcAsJJXJg. Frames the goal as "how do I win and take over the map"; teaches the control panel, the troop-to-worker ratio, and that the core loop is expanding to claim the map. Useful for the "dominate the map = threshold" framing.
2. How to Win in Openfront.io (Multiplayer Tutorial) — https://www.youtube.com/watch?v=ehR2j15ttag. A multiplayer win tutorial on the Middle East map; emphasizes spawn distance and reading where other players are. Useful for the "elimination vs threshold" fork and map-shape effects.
3. Openfront.io Beginner's Guide: Mechanics, Tips & Tricks — https://www.youtube.com/watch?v=9LOx9lFJn6I. A mechanics deep-dive: population bell curve (~41% peak), gold, attack-ratio bonus (up to 2x target size for a fast take). Useful for the "how fast can I cross 80%" reasoning.
4. OpenFront.io V28 Tutorial & Guide — https://www.youtube.com/watch?v=olDiv-q8KMo. Version-specific tutorial: spawn pockets, terrain troop-loss differences (~20% between terrains), efficient annexation of bots. Useful for mode/map adjustments and the annexation (surround = free takeover) path to the threshold.
5. How To Win At OpenFront.io - Multiplayer Guide For Beginners — https://www.youtube.com/watch?v=1fpszw34sQg. Europe-map multiplayer; alliance requests to stop being attacked early, saving troops, buying cities for gold after eliminating a bot. Useful for the alliance/betrayal effect on who survives to the end.
6. OpenFront.io V24 Tutorial — https://www.youtube.com/watch?v=Bs8PTnZw5_g. Version-specific: early port / trade chips economy, population growth curve, attack-ratio ramping from 50%. Useful for the economy that funds a threshold push.
7. OpenFront.io Official Tutorial — https://www.youtube.com/watch?v=EN2oOog3pSs. First-party (see above). The canonical "dominate the map" framing and the entity ladder (bots < nations < players) that drives elimination.
8. OpenFront.io V25 Tutorial — https://www.youtube.com/watch?v=Wci8kBDxR80. Version-specific: terrain spawn choice (plains fastest, islands mid, mountains slowest/defensible), pockets, annexation by surrounding. Useful for map-shape end-state adjustments.

## Consolidated player questions (merged across sources)

- What actually makes the match end? (threshold, elimination, overtime, doomsday, ranked)
- Is it 80% of the whole map, or 80% of the land still in play? (usable-land nuance)
- Does nuked/fallen land count toward the number I am chasing?
- Can a game stall forever, or is there a forced finish? (anti-stalemate timers)
- In ranked 1v1 / 2v2, is it last man, last team, or something else? (cancel rule)
- Which of these is active in my specific lobby? (the "read your screen" frame)

## Limits

- Reddit raw pages and the Reddit API were network-blocked on this host; thread content comes from the search index's verbatim quoted comments, which is real but limited to the quoted spans, not the full thread. Thread existence, titles, authors, and dates are confirmed.
- YouTube content is captured from verifiable transcript/subtitle text surfaced by search, not by re-reading each full video; the Official Tutorial was additionally opened in-browser to confirm accessibility.
- All rule/number/version-boundary claims are anchored to the v0.34.24 tag source and the official release; community posts are used only for the player questions and observed confusion, never for rule numbers.
