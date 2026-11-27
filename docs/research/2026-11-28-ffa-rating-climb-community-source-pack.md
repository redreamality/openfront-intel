# Community Source Pack — FFA Rating Climb (v36)

- **Slug:** `ffa-rating-climb`
- **Date:** 2026-11-28
- **Topic:** How to actually climb the OFstats FFA Rating ladder — maximising rating
  gain per game in the v36 free-for-all mode.
- **Existing main answer:** `ffa-rating-system` is a **mechanics reference**
  ("how the ladder works": the 22-rank ladder, calibration, seasons, win screen,
  leaderboard tabs). This pack feeds a **distinct decision intent** — *how to play
  so your rating moves up as fast as possible* — so the new page is not a
  re-titled duplicate; it changes what a player does with their rating games.

## Source inventory

| # | Type | URL | Title | Date / timeliness |
|---|------|-----|-------|-------------------|
| 1 | Official (first-hand) | https://ofstats.io/leaderboard/how-it-works | How the OpenFront FFA Rating Works \| OFstats | Live page, opened 2026-11-28 |
| 2 | Official (first-hand) | https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.0 | v0.36.0 release body (OFstats FFA Rating shipped) | Released 2026 (v36 series) |
| 3 | Official source | tag `v0.36.2` — `src/client/components/ffaRating/*.ts` | OFstats rating display + eligibility source | v0.36.2 stable tag |
| 4 | Reddit | https://www.reddit.com/r/Openfront/comments/1x8iv60/ranked_ffa_is_weird_right_now/ | "Ranked FFA is weird right now" (u/Meta_Mushroom) | Oct 17, 2026 |
| 5 | Reddit | https://www.reddit.com/r/Openfront/comments/1lx86rq/i_analyzed_7000_world_map_ffa_games_to_see_how/ | "I analyzed 7,000 World Map FFA games to see how people win" | 2026 |
| 6 | Reddit | https://www.reddit.com/r/Openfront/comments/1wq5wmd/what_am_i_doing_wrong/ | "What am I doing wrong?" (0 wins in public FFA for a month) | 2026 |
| 7 | Reddit | https://www.reddit.com/r/Openfront/comments/1wk0784/at_which_rank_you_are_counted_as_good_or_pro/ | "At which rank are you counted as good or pro?" | 2026 |
| 8 | Reddit | https://www.reddit.com/r/Openfront/comments/1wp79p6/i_won_my_first_ever_ffa/ | "I won my first ever FFA!!!!" | 2026 |
| 9 | YouTube | https://www.youtube.com/watch?v=7J5zwb_s_Cg | "OpenFront Beginner Guide (2026) \| How to Win Your First Games" — Lonely_Millennial | 2026 (opened, transcript captured) |
| 10 | YouTube | https://www.youtube.com/watch?v=fDkfEDIh3tY | "This Simple OpenFront Strategy Wins Almost Every Game" — Ash | 2026 (opened, transcript captured) |
| 11 | YouTube | https://www.youtube.com/watch?v=hSK0aK-pAF0 | "The Ultimate Guide To Smooth FFA Wins" — TheBiff | 2026 (opened, transcript captured) |
| 12 | YouTube | https://www.youtube.com/watch?v=EdcdsayA_ac | "The ULTIMATE OpenFront.io Tutorial and Strategy Guide!" — Ultimus_Rex | 2026 (opened, transcript captured) |
| 13 | YouTube | https://www.youtube.com/watch?v=I1eW-ILqRp8 | "I Tried OpenFront's NEW Ranked Mode! (v35 Update)" — TheBiff | v35 (pre-rating; used only for ladder context) |

All three-plus Reddit threads and three-plus YouTube videos above were actually
opened and analysed (Reddit via search-index full text after the direct page
returned a bot wall; YouTube via oEmbed metadata plus the caption text). The
official OFstats page was opened directly in the browser and its full text
captured.

## Player questions surfaced

- "How fast does my rating actually move, and which wins are worth the most
  points?" (threads 4, 7)
- "I have no FFA wins yet — what am I doing wrong in public FFA?" (thread 6)
- "Is playing more games by itself what earns rating, or is it the results?"
  (official page Q&A: "Does playing more earn points by itself?")
- "How do the top players grind the FFA ladder?" (threads 4, 8)

## Key observations (community)

- **Wide skill gap early in a season.** Thread 4: "there hasn't been enough time
  for people to hit their correct ELO," so lobbies are lopsided — the underdog
  wins and the betrays-and-gobbles pattern dominate. This is the high-uncertainty
  window the official page quantifies (± ≥ 130 → median +166 on a win), and it is
  the single biggest rating-gain opportunity of the season.
- **Small, fast lobbies.** Thread 4 notes 3–6 humans on a big map, games ending
  quickly, little trade, "best strategy is to focus on cities, only the first
  few discounted ports," and almost no MIRVs. A rating climb guide must tell a
  player that a *rated* game needs 10+ spawned humans and one human winner, so a
  3-player lobby does not count at all — grinding in tiny lobbies earns zero.
- **Stats sites as the ladder.** Threads 4, 6, 7 repeatedly point to OFstats /
  TrackerFront / OFratings for placement, spawn heatmaps (ofstats.io/maps) and
  win-rate benchmarks. The community treats the profile (elo, ±, tier, peak) as
  the standing to climb, confirming the decision intent of this guide.
- **First-win framing.** Thread 8 and 6: most new players take weeks / hundreds
  of games for the first FFA win and keep "misplaying endgames." The climb guide
  must connect *winning* (the one outcome that banks points) to *placing well*
  (structures captured, gold, which softens a loss), not just surviving.
- **7,000-game dataset.** Thread 5 (World map, ~7,000 FFA games): winners are
  ~43% more likely to send boats early, ~33% more likely to use the map edges,
  and "waiting longer is a winning strategy — winners attack at ~1:06." These are
  the concrete levers (boats, edge land, patience) that a rating-climb player
  should bank wins with.
- **Win-rate benchmarks.** Thread 7: ~10–15% win rate is "good," ~30% "great,"
  and near the top "60–80%." Useful for a player calibrating how many wins per
  block of rated games they should expect while climbing.

## YouTube observations

- **7J5zwb_s_Cg** (Lonely_Millennial): the whole game is "timing" — wilderness
  attacks near the 42% growth sweet spot, bot annexations, city timing, walls
  against weak players. Directly the levers that convert a rated game into a
  win.
- **fDkfEDIh3tY** (Ash): concrete opening economy — wait to 3,500 troops, 10%
  attacks on green wilderness every +1,000 troops, stop expanding when green is
  gone, farm bots at 2×, only fight players who already erred. A repeatable win
  routine a climber can run in rated games.
- **hSK0aK-pAF0** (TheBiff): conservative spawn in a hard-to-take green pocket,
  early city on the defensive edge, then a big push once troops peak — the
  "smooth FFA win" arc.
- **EdcdsayA_ac** (Ultimus_Rex): pre-nuke midgame = prioritise new cities, a
  couple of warships in trade zones, keep troops high, take weak land, earn
  gold; post-nuke = let others MIRV each other, keep a trading partner, do not
  push 80% land unless no one can MIRV. The endgame decision that decides the
  single win the rating banks.
- **I1eW-ILqRp8** (TheBiff, v35): historical ranked-FFA context only; the v36 OFstats
  system replaces it, so it is cited for background, not current rules.

## Official facts pinned (for the guide body)

- Everyone starts at **1500**; around **2320** ≈ a 50% win chance in a typical
  40-player lobby. (OFstats how-it-works)
- A rated game: **public FFA, not a special lobby, ≥ 10 humans actually spawned,
  exactly one human winner, ≥ 40 s total duration, and you spawned + logged in.**
- **Season 1** starts from everyone's **Nov 5, 2026** rating; the weekend before
  launch was a break. Season 0 (through Nov 5) stays on profiles/final standings.
- **Season 1:** ratings carried over; everyone's ± widened at the season start,
  "as if they had been away 20 days," so the first games move a player more.
- **Median change table** (win/loss, by band, ± < 90):
  - under 1600, win chance <1% → win **+29.8**, loss −0.3
  - 1600–1900, 3% → win +18.2, loss −0.8
  - 1900–2200, 13% → win +9.7, loss −1.7
  - 2200+, 41% → win +4.8, loss −3.4
  - high uncertainty (± ≥ 130, any rating), win chance <1% → win **+166.0**, loss −5.1
- **No fixed "+20 for a win":** beating a stronger field earns more; losing a
  game you were expected to win costs more. Non-winners get a **placement
  adjustment** (ordered by structures captured, gold breaks ties; survival time
  alone does not rank you) that softens a loss or costs extra — strongest while
  new, fades with more rated games. Winners get no placement adjustment.
- **Decay / recency:** for a player averaging 2–3 rated games a day, ~**70%** of
  a rating's influence comes from the last two months, ~**85%** from the last
  three. No fixed cutoff; "does playing more earn points by itself" is answered
  no — results and the field you face do.
- **Board eligibility:** ≥ **10 rated games** (Season 0 counts); at **2100
  (Diamond)+** also a **± ≤ 60**, else an idle player's ± grows and they drop
  off until a few games bring it back. Below 2100 there is no uncertainty gate.
- **Tiers (fixed bands):** Iron <1300 · Bronze 1300–1500 · Silver 1500–1700 ·
  Gold 1700–1900 · Platinum 1900–2100 · Diamond 2100–2300 · Master 2300–2500 ·
  Grandmaster 2500+. Each tier below Grandmaster has divisions I/II/III.
- Display: rating shown with uncertainty (`1613 ± 85`), source
  `FfaTier.ts` `formatRatingWithUncertainty`; profile fields `elo`, `uncertainty`,
  `tier`, `peak`, `calibrationGames` (`FfaRatingSummary.ts`); rated-game criteria
  `FfaRatingEligibility.ts`.

## Limits / cautions

- Reddit direct pages returned a bot wall; content captured via the search index
  (full text of each thread), so individual upvote counts are approximate.
- Thread 4 is from the *v35* ranked-FFA queue (Oct 17), which v36 replaced; it
  is used for the community's reading of small/lopsided lobbies and the ELO
  settling, not for current queue rules.
- The 7,000-game dataset (thread 5) is World-map only; transfer the levers
  (boats, edges, patience) across maps with caution.
- OFstats median changes are *medians*, not fixed awards; an individual game's
  swing depends on the lobby and the player's current ±.
- Access date for all sources: 2026-11-28.
