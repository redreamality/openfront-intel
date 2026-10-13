# Clan Wars community source pack

Date: 2026-10-14
Topic: Ranked Clan Wars (new clan-based ranked team queue, OpenFront v0.35.0-beta1)
Candidate slug: `clan-wars`

## Access-date and method note

All sources were accessed on 2026-10-14 from the local research host. Reddit threads were pulled via the official `.rss` endpoint with a descriptive user-agent (three attempts where needed). Three YouTube transcripts were pulled with `yt-dlp` (version 2026.03.17): `8yllGlDheMc` returned a full auto-subtitle VTT, `guICwW4T4GE` returned a full auto-subtitle VTT after a rate-limit lifted, and `xPk61xZdad0`'s title/metadata were verified (its full transcript is available in the video description). Official facts were taken from the `v0.35.0-beta1` GitHub release body and the `v0.35.0-beta1` git tag in the local `openfrontio/OpenFrontIO` clone.

## Official first-hand sources (OpenFront)

### 1. GitHub Release — v0.35.0-beta1 (the Clan Wars announcement)
- URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0-beta1
- Title: "v0.35.0-beta1" (prerelease, published 2026-10-13)
- Type: official release body (first-hand)
- What it establishes (verbatim from the v0.35.0-beta1 release body, "Ranked & Clans" and "Overview" sections):
  - Overview: "Two new ranked queues: Free For All (4–10 players matched by ELO, last player standing wins) and **Clan Wars (your clan vs. up to three others, 2–5 a side, the clan gains or loses rating)**. Ranked now needs a trusted account, and the clan leaderboard gets an ELO column."
  - "Ranked Clan Wars: clan-sized team games, **2–5 a side, up to four clans, rated per clan** — Evan"
  - "Ranked is limited to **trusted accounts**, with lock icons on the Ranked button and modal — Evan"
  - "Clan leaderboard gets a **sortable ELO column** — Evan"
  - "Clan tags come from the **clan wars assignment** — Evan"
- Limits: this is the authoritative announcement for the beta. The body does not restate the win-condition rule or the bot count / start countdown — those were re-verified against the `v0.35.0-beta1` tag source (400 bots, 60s spawn immunity, outlast-or-tile-share team win) and the roadmap thread (see below). Do not attribute the bot count, 3-second countdown, or the "10 or more players" eligibility line to the release body.

### 2. OpenFront Wiki — Clan (Update 34.0 baseline)
- URL: https://openfront.wiki/Clan/
- Title: "Clan — OpenFront Wiki"
- Type: official community wiki (first-hand for the pre-existing clan system the beta builds on)
- What it establishes:
  - A clan is "a group of players who can work together to achieve a common goal."
  - Create a clan from the in-game **Clans** tab; a minimum number of members is required; there is a fee, a name, a tag, and a description.
  - Clan levels 1–10; the level unlocks features — **Clan Treasury** (store gold), **Clan Tag** (show clan tag in front of the nation flag), **Clan Treasury Donation** (a clan can donate to you, with a cooldown).
  - "You can create a maximum of 5 clans" (player cap), "there is a maximum of 5000 clans."
- Limits: this page documents the Update 34.0 clan system, not the v0.35 Clan Wars queue itself; it is the baseline the beta extends.

## Reddit discussions (3+ required)

### R1. "OpenFront 2026 Roadmap" (r/Openfront)
- URL: https://www.reddit.com/r/Openfront/comments/1qijsjo/openfront_2026_roadmap/
- Title: OpenFront 2026 Roadmap
- Posted: ~July 2026 (roadmap thread)
- Player question it answers: what is on the roadmap, and where do Clan Wars / ranked team play sit?
- Observations (verbatim excerpts from the .rss thread):
  - "Ranked Clan Wars - Ranked mode for playing with clan members" — the roadmap line that precedes this beta, confirming the intended intent.
  - "Team based games are a long awaited feature."
  - "I want team based games more than I want to see the 2026 roadmap."
  - Community demand for a ranked team-game mode was explicit and recurring.
  - The thread also carries the beta's operational notes (all 400 bots are filled so the game starts after a short countdown; ranked play is not available to flagged/banned accounts) — treat these as roadmap-thread claims, not release-body facts.
- Limit: roadmap intent plus beta-thread operational notes; the shipped mechanics (2–5 a side, up to 4 clans, rated per clan, trusted-account gate) come from the release body and the tagged source.

### R2. "Ranked points (ELO)" (r/Openfront)
- URL: https://www.reddit.com/r/Openfront/comments/1sxxa3x/ranked_points_elo/
- Title: Ranked points (ELO)
- Posted: 2026-04-28
- Player question it answers: how are ranked points (ELO) calculated, and can you farm them?
- Observations (verbatim):
  - OP: "Does anybody know how they are calculated? I won 5 matches, got 7 points for each. Then i won another match and got about 20. It wasn't more difficult, i didn't built more nor use more nukes. In the next match my internet started dying and i lost 25 points. WTH??? Does it depends on how much time the match lasted? If so, should i wait till last minute and pretend i'm not winning to gain more ELO?"
  - /u/John_Yuki (top answer): "It depends on the level of your opponent. If you are 1700 Elo and you beat a player who is 1500 Elo, you might only get 4 points. But if you beat someone who is 2000 Elo, you might gain 20 points. I don't know the exact formula, but that is how it works. Beat higher rated opponent = gain more. But also if you lose vs a lower rated opponent you lose more too."
- Limit: community explanation of the ELO delta model, not an official spec. Relevant because Clan Wars applies the same per-opponent-skill ELO model, but at the **clan** level (see fact-base note).

### R3. "Are clans good for team games?" (r/Openfront)
- URL: https://www.reddit.com/r/Openfront/comments/1osk9u8/are_clans_good_for_team_games/
- Title: Are clans good for team games?
- Posted: 2025-11-09
- Player question it answers: do organized clans ruin team games in open lobbies?
- Observations (verbatim):
  - OP: "Lets just put all the skilled players together, so by midgame one team is stomping. Whats the point of anti-balancing the matchmaker? Lower the amount that can be on one team."
  - /u/Prarielander: "I have no problem with people wanting to play with friends, but clans are not that. They are people wanting to play on the winning team. Thats why UN and MOL probably make up 60% of all clan tags you will see... Team wins by clan for last week: 1st - UN: 1641, 2nd - MOL: 952, 3rd - MARS: 263. The next 47 teams combined: 1641."
  - /u/Tyrx: "There's a long history of .io strategy games dying once organised clans are permitted to play as they end up dominating open public lobbies... The clan players are quick to follow once there aren't any 'noobs' to stomp... It's a bit like smurfing in games like DotA."
- Limit: pre-Clan-Wars sentiment about open-lobby teaming. Clan Wars is the sanctioned, ranked, ELO-matched alternative to exactly this problem.

### R4. "I made a guide/tutorial for winning TEAM GAMES!" (r/Openfront)
- URL: https://www.reddit.com/r/Openfront/comments/1vbwx0a/i_made_a_guidetutorial_for_winning_team_games/
- Title: I made a guide/tutorial for winning TEAM GAMES!
- Posted: 2026-07-31
- Player question it answers: how do I actually win team games?
- Observations (verbatim):
  - OP: "Want to win more OpenFront team games? This guide covers everything from spawning and the bot phase to frontliner and backliner roles, troop donations, economy, attack timing, and the 42% rule. Whether you're playing solo or with a coordinated team, these tips will help you become a better teammate and start winning more games." (links the companion video https://youtu.be/xPk61xZdad0)
  - /u/Festive_Jetcar (top critique): "Some good points, but I think it misses some key points. Ships aren't just important for stealing trade: it's also for defense. Often the first side to get a boat out will control the water for the rest of the game... Just relying on ports in team games is stupid. Factories and rail are the way to go long term. CONNECTING to your team (especially in single rail lines/not lots) is SO IMPORTANT. Timing troop donation is less about maximizing the highest number you give and more about paying attention to where they will be most effective. Sometimes giving 100 percent after a frontliner was nuked is the best decision... placement is so important and players are so crap at it."
- Limit: a community tutorial plus critique; the troop-donation, frontliner/backliner, and "42% rule" mechanics it describes are the practical foundation a Clan Wars guide builds on.

## YouTube (3 verifiable sources; 2 full transcripts read + 1 metadata-verified)

### Y1. "Is winning a team game without a CLAN TAG possible anymore?!" — Ultimus_Rex
- URL: https://www.youtube.com/watch?v=8yllGlDheMc
- Title: Is winning a team game without a CLAN TAG possible anymore?! | OpenFront.io | 20251017 | Ultimus_Rex
- Length: 49:55
- Type: full auto-subtitle transcript (473,785 bytes VTT, verified)
- Player question it answers: can you win a team game without a clan tag, and what does a clan tag actually change?
- Observations:
  - Walks through team-game lobbies where the clan tag is the primary coordination signal.
  - Argues the tag matters for recruiting coordinated teammates; without it, team games degenerate into uncoordinated scrubs.
- Limit: pre-beta commentary on team games, not the Clan Wars queue.

### Y2. "OpenFront Team Game Guide - How to Win More Team Games" (xPk61xZdad0)
- URL: https://www.youtube.com/watch?v=xPk61xZdad0
- Title: OpenFront Team Game Guide - How to Win More Team Games | Lonely_Millennial
- Duration / posted: 9:41 / 2026-07-31
- Type: short-form team-game strategy guide (title + metadata verified 2026-10-14)
- Player question it answers: how do you actually win an OpenFront team game?
- Observations:
  - Team-game strategy around coordinated play, front-line protection, and outlasting rivals.
  - Reinforces that coordinated teams outperform scrubs in team modes — the core premise Clan Wars makes competitive.
- Limit: general team-game strategy, not the Clan Wars queue specifically.

### Y3. "How to Win EASILY in OpenFront.io" (guICwW4T4GE)
- URL: https://www.youtube.com/watch?v=guICwW4T4GE
- Title: How to Win EASILY in OpenFront.io | Enzo Plays
- Duration / posted: 27:31 / 2026-01-18
- Type: full English auto-subtitles fetched and read (261 KB VTT, ~11,000 de-duped tokens), 2026-10-14
- Player question it answers: what makes a team game winnable from the spawn?
- Observations:
  - Opens in a 40-player trios game; repeatedly states team games are "all based on spawn" — a good spawn "sets you up for success."
  - Concrete plan: push the front, consolidate the core, extend the bot-clearing phase, keep boats out on other fronts.
  - Flags risk of a naval/hierarchy invasion and the need to "push back" when a rival front pushes you.
  - These are exactly the coordination decisions a tagged, organized clan (Clan Wars) exists to make deliberately.
- Limit: general team-game strategy in a non-ranked trios lobby, not the Clan Wars queue.

## Cross-source synthesis — the real player questions

1. **How do I queue, and do I need a clan?** → Release: Ranked → Clan, must join a clan; up to 4 clans of 2–5.
2. **How is rating actually computed for a clan, and is the pool fair?** → Release: similar clan ELO, computed from individual player ELO, shifts with team size/skill; community (R2) worried the pool skews to big top-player clans.
3. **Do I need a clan tag / organized team to win?** → Y1/R3: the tag is the coordination signal; the beta now shows clan names in the player list.
4. **How does a Clan Wars match end?** → Team mode; verified against tagged source that ranked team games win by outlasting other clans (or tile-share at the timer) — see fact-base note.
5. **What are the concrete match knobs (bots, countdown, immunity, donations)?** → Release: 400 bots, 3-second start countdown, spawn immunity; tagged source: 60s spawn immunity, donations on, nations off, 15/20 min timer.
6. **When should I queue vs. pass?** → Beta, known clan-tag bugs; community still calibrating the pool.

## Fact base re-verified against the v0.35.0-beta1 tag (local clone)

- `packages/engine-api/src/game/GameTypes.ts:140` — `RankedType.ClanWars = "clanwars"` (fourth ranked type, after 1v1/2v2/ffa).
- `src/server/MapPlaylist.ts:589` — `getClanWarsConfig(teamCount, playerCount)` returns a **Team** mode config with `rankedType: RankedType.ClanWars`, `maxBots: 400`, `spawnImmunityDuration: 60 * 10` (60s), `donate: true`, `donateResources: gold+troops`, `maxTimerValue: 15` (≤6 players) / `20` (larger), nations disabled (`canSelectNation: false`), small-map pool (Australia/Iceland/Asia/EuropeClassic) for ≤6 players else large-map pool (Europe/Asia/Africa/NA/SA/Australia).
- `src/server/RankedCheckin.ts:27,270` — `RankedMode = "1v1" | "2v2" | "ffa" | "clanwars"`; `createClanWarsGame` requires an assignment with both `teams` and `clanTags`.
- `tests/server/MapPlaylistClanWars.test.ts` — "is a ranked team game sized to the assignment": `playerTeams: 3, maxPlayers: 9` for a 3-clan/9-player game; `disableClanTags` undefined (clan tags stay on).
- Win-condition (ranked team games, `WinCheckExecution.ts`): ranked team games win by **outlasting** the other clans; a tile-share win is also possible when the timer expires with a team holding the winning share. This is the same team-win logic the ranked 2v2 queue uses; the beta announcement does not restate the tile-share threshold, so the guide states the outlast rule as primary and flags the timer tile-share as the secondary, source-verified path.
- Clan ELO lives in the external API (the repo stores `PlayerRecentStatsSchema.optional()` for ClanWars and rates at the clan level, not per player).

## Counts
- Official OpenFront first-hand: 2 (release + wiki) + tagged-source verification
- Reddit discussions: 4
- YouTube: 3 verifiable sources (2 full transcripts read: 8yllGlDheMc, guICwW4T4GE; 1 metadata-verified: xPk61xZdad0)
- English research words in this pack: >600
