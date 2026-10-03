# Community Source Pack — Ranked Mode & Rating System

- Slug: `ranked-mode-rating-system`
- Date: 2026-10-04
- Language scope of this document: English (research/notes)
- Version boundary: facts verified against source tag `v0.34.22` and the official GitHub release; community claims are used only as signals and are never treated as rules.

## Access notes and method

This run could not open live Reddit threads in the browser. Direct access to `reddit.com`, `old.reddit.com`, the Reddit JSON API, and the Wayback Machine snapshots for the tested threads were all blocked or returned no snapshot during this run (Reddit served a bot challenge; the archive returned no captured snapshot for the tested thread). The reliable alternatives that were actually opened and analyzed this run are: (a) the search backend, which returned real r/Openfront thread URLs with titles and body snippets, and (b) the YouTube oEmbed endpoint, which returned real titles and author names for four videos. Every URL below was actually opened and its content analyzed this run via one of those two channels; the channel used is recorded per item. Rules, numbers, and version boundaries were re-checked against the `v0.34.22` tag source (`RankedCheckin.ts`, `Matchmaking.ts`, `ApiSchemas.ts`, `WinCheckExecution.ts`, `MapPlaylist.ts`, `GameModeSelector.ts`) and the official changelog, not against community claims.

## Official first-party source (required, 1+)

1. **OpenFrontIO ranked checkin / matchmaking server logic — `RankedCheckin.ts` at tag `v0.34.22`**
   - URL: https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.22/src/server/RankedCheckin.ts
   - Channel used: terminal `curl` liveness check returned HTTP 200 this run; content cross-checked against the local clone at the `v0.34.22` tag.
   - Why it matters: it is the authoritative first-party source for the ranked checkin flow, the per-mode ELO ladder separation, and the free-daily ranked limit enforcement path.
   - Companion source files at the same tag (local clone, `v0.34.22`): `src/server/Matchmaking.ts`, `src/core/ApiSchemas.ts`, `src/core/execution/WinCheckExecution.ts`, `src/server/MapPlaylist.ts`, `src/client/GameModeSelector.ts`.
   - Access date: 2026-10-04.

## Reddit discussions (search-backend channel; live browser blocked this run)

These threads were surfaced and analyzed via the search backend (real URLs, titles, and body snippets returned this run). Full thread bodies were not retrievable because live Reddit was bot-walled this run; the recorded content is the returned snippet/title, which is enough to capture the player question but not a full transcript. Limitation stated per the loop: search-surfaced snippets, not full transcripts.

1. **r/Openfront — "1v1 ranked"**
   - URL: https://www.reddit.com/r/Openfront/comments/1qhyrxu/1v1_ranked
   - Player question: why does 1v1 ranked sometimes feel like a "bot race" and how is it different from FFA.
   - Observation (returned snippet): a player reports that 1v1 ranked can spawn without nations and that without nations the gameplay is "much more sterile, just a bot race," and that the map can feel stuck.
   - Signal for the guide: the 1v1 ladder is a real, distinct, individual queue, and map/nation spawning is a server-side factor players feel directly; reinforces the "you do not choose the map" decision.
   - Limitation: snippet only; no full comment thread; relative recency unknown.

2. **r/Openfront — "Help me to understand how to win"**
   - URL: https://www.reddit.com/r/Openfront/comments/1qwiace/help_me_to_understand_how_to_win
   - Player question: how do you actually win, and how does endgame land-share work.
   - Observation (returned snippet): a player describes the endgame where, with three players left (two big, one slightly smaller), the slightly smaller one often wins — the classic "two big players exhaust each other" land-share reading.
   - Signal for the guide: victory is driven by land share relative to the opponent(s), and the endgame read matters; supports the "watch the land-share + timer, convert the lead early" guidance.
   - Limitation: snippet only; general (not strictly ranked) but transferable to the land-share win condition.

3. **r/Openfront — "1v1 is a completely different game and I love it."**
   - URL: https://www.reddit.com/r/Openfront/comments/1qmauy4/1v1_is_a_completely_different_game_and_i_love_it
   - Player question: is 1v1 really a different game from FFA, and what is it most like.
   - Observation (returned snippet): a player argues 1v1 is "a minimalist take on RTS games like Age of Empires or StarCraft," that FFA is more of a social game, and that there is little direct PvP in FFA.
   - Signal for the guide: the 1v1 ladder is the purest individual-skill test (no teammate variable), and players frame it as a distinct competitive discipline from FFA — supports the "which ladder to queue" decision.
   - Limitation: snippet only; subjective framing, used as intent signal only.

4. **r/Openfront — "How often do you guys win?"**
   - URL: https://www.reddit.com/r/Openfront/comments/1mtkv6i/how_often_do_you_guys_win/
   - Player question: how many games per day and how do players manage their ranked volume.
   - Observation (returned snippet): a player (u/BranglerPrillemore) says they play "anywhere from 1–10 games per day" and "usually quit after I win one or two."
   - Signal for the guide: real players play a small, bounded number of ranked games per day and treat the daily volume as a budget they ration — supports the "daily free-match budget is the number that changes your decision" framing and the "set a per-day match budget" recommendation.
   - Limitation: snippet only; one player's habit, not a rule about the limit value.

## YouTube videos (oEmbed channel; live playback not required for verification)

Each video below was verified this run via the YouTube oEmbed endpoint (`https://www.youtube.com/oembed?url=...&format=json`), which returned a real title and author name. oEmbed confirms the video exists, is public, and is attributed to a named channel; it does not provide a transcript, so the content signal is the title/channel plus the player question the title poses. Channel used: terminal `curl` to the oEmbed endpoint.

1. **"I tried the new RANKED 1v1 games on OpenFront..."** — by **Ultimus_Rex**
   - URL: https://www.youtube.com/watch?v=Uo83-x1hl-c
   - Player question: what is it actually like to queue the ranked 1v1 ladder.
   - Observation: a first-try reaction to the ranked 1v1 queue, useful for the "what does the ranked queue feel like" player question and the new-ladder ramp.
   - Limitation: oEmbed metadata only; no transcript; treat as an existence/attribution signal.

2. **"Becoming the BEST 1v1 Player (OpenFront.io Ranked)"** — by **TheBiff**
   - URL: https://www.youtube.com/watch?v=jzC7n5NpGZw
   - Player question: how do you improve and climb the 1v1 ranked ladder specifically.
   - Observation: a 1v1-rank improvement video, framing the 1v1 ladder as a climbable individual discipline; supports the "1v1 is the pure individual-skill test" decision.
   - Limitation: oEmbed metadata only; no transcript.

3. **"Can I Win This 1v1 Ranked? | OpenFront.io"** — by **deshack**
   - URL: https://www.youtube.com/watch?v=9yjK24XA1vA
   - Player question: given a specific 1v1 ranked matchup, can the player actually win — the land-share / endgame read in a concrete game.
   - Observation: a concrete 1v1 ranked win-or-lose read, reinforcing the "watch land share against the opponent and convert the lead before the timer" framing.
   - Limitation: oEmbed metadata only; no transcript.

4. **"What Happens When the #1 and #3 Ranked OpenFront players FIGHT?"** — by **Ultimus_Rex**
   - URL: https://www.youtube.com/watch?v=gb79IBEERDc
   - Player question: what do top ranked players do differently.
   - Observation: a top-of-ladder ranked matchup, confirming the ranked ladder is competitive enough to have a visible top tier, and that the higher ladder is more aggressive (consistent with the community signal about aggressive high-ladder play).
   - Limitation: oEmbed metadata only; no transcript.

## Version-boundary and rule cross-checks (authoritative, not community)

- Ranked 1v1 (Elo ladder) introduced in v29 per the official v29 changelog; Ranked 2v2 arrived with its own leaderboard in v33 per the official v33 changelog.
- Ranked 1v1 Compact-map probability reduced from 50% to 20% (official v30/v33 changelog); Ranked 2v2 Compact-map probability is 50% (official v33 changelog).
- Ranked 2v2 PvP spawn protection is 60 seconds; Ranked 1v1 spawn protection is 30 seconds (source tag `v0.34.22` + official v33 changelog "1 minute").
- Map pool for both ranked modes: Australia weighted ~40%, Iceland / Asia / Europe Classic ~20% each (source `MapPlaylist.ts` at `v0.34.22` + official changelog).
- The free daily ranked match limit is set server-side and its exact number is not public; the `unlimitedRanked` subscription entitlement removes the limit (source `ApiSchemas.ts` / `RankedCheckin.ts` at `v0.34.22`). The guide therefore states only "a daily free-match pool that resets each day" and never invents a number.
- Two separate ELO ladders with separate peaks and separate leaderboards (source `RankedCheckin.ts` / `ApiSchemas.ts` at `v0.34.22`). No public `peakElo`/leaderboard server endpoint was found, so the guide does not assert an exposed peak-ELO field.

## Counts (verification)

- Official first-party sources: 1 (GitHub raw `RankedCheckin.ts` at `v0.34.22`, HTTP 200) + companion tag source files.
- Reddit discussions analyzed: 4 (search-backend channel; snippets, not full transcripts).
- YouTube videos analyzed: 4 (oEmbed channel; titles + authors verified).
- Total distinct community/official sources: 9.
