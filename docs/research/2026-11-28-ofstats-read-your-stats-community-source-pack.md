# Community source pack — ofstats-read-your-stats

Accessed 2026-11-28. Candidate slug: `ofstats-read-your-stats` ("Read your OpenFront stats: where your numbers live and which to act on").

## Research question

Players searching "openfront stats" / "ofstats" (GSC 28-day: ~915 impressions across variants, near-zero CTR, landing on the raw `/database/` page) want to know (a) where their numbers actually live, (b) which of the many numbers a player can see actually changes a decision, and (c) what to do when the numbers lag or look wrong. No existing guide answers the discovery-and-reading intent; `ffa-rating-climb` and `ranked-mode-rating-system` cover the rating mechanics and are cross-linked, not duplicated.

## Reddit discussions (r/Openfront)

- https://www.reddit.com/r/Openfront/comments/1qkt9j4/leaderboard/ — "Leaderboard" (Sep 2026). Player asks "Is there a way to see a leaderboard of solo wins? … my stats don't update there." Top answer points to the official endpoint: "you can see the 1v1 ranked top 50 though api.openfront.io/leaderboard/ranked". Confirms the public ranked endpoint is the community-known answer for top-50 ranked stats.
- https://www.reddit.com/r/Openfront/comments/1sxxa3x/ranked_points_elo/ — "Ranked points (ELO)" (Apr 2026). Player confused why one win gave +7 and the next ~+20; "Does it depend on how much time the match lasted?" Top answer: the swing depends on the opponent's rating, not fixed per win. Grounds the "read the swing, not the win/loss line" advice.
- https://www.reddit.com/r/Openfront/comments/1wcck8i/how_is_ppl_seeing_thier_stats_after_game/ — "How is ppl seeing their stats after game?" (Sep 2026). Answers: in-game you open your account (top-right), go to "games", each game has a leaderboard button and a replay button; and "you can also use https://ofstats.io/games (make sure to log in so it's your stats and not someone with the same name)". Confirms both in-game surfaces and the login caveat for third-party sites.
- https://www.reddit.com/r/Openfront/comments/1x0tqqn/openfront_pros_tell_me_are_my_stats_good_and_what/ — "openfront pros, tell me, are my stats good and what do I improve, win rate is 8%" (Oct 2026). Top answer: "check out your stats on Trackerfront, OFstats, or OFratings. I prefer Trackerfront for its simplicity. If you want to know how to improve, you really have to post a replay or two." A commenter adds "Not meaningful like that. If you play mainly team games, 8% is extremely low. If you play FFA in small lobbies it's bad. If you play in 100+ player lobbies, it's fine." Confirms the three-site convention and that win rate must be read against the mode and lobby size.
- https://www.reddit.com/r/Openfront/comments/1wxnptb/the_game_should_have_stats_that_include_top/ — "The game should have stats that include top rankings per game" (Oct 2026). Comment: "it's quite possible to have a lower win rate than someone else but be a better player — top five in half of all games… you're still better." Supports the placement/finish-line nuance over raw win count in FFA.
- https://www.reddit.com/r/Openfront/comments/1o3ka48/are_there_any_good_strategy_guides_for_beginners/ — "Are there any good strategy guides for beginners?" (2025). "They make decisions so fast it's hard to know the rationale… are people just awesome at eyeing the four corner panels and stats and doing math?" Confirms the beginner pain: the HUD stats are visible but not understood.

## YouTube sources

- https://www.youtube.com/watch?v=v-mdYfLSLpI — "How to Play Openfront.io (Beginners Tutorial)". Walks the core HUD and panels; used to ground where in-game stats surface.
- https://www.youtube.com/watch?v=8bxcAsJJXJg — "The Ultimate Openfront.io Beginner's Guide". Mechanics and tips; grounds the "which numbers matter" framing for new players.
- https://www.youtube.com/watch?v=syvi06z5WVA — "OpenFront Complete Beginner Guide (2026) | How to Win Free For All". 2026-era FFA guide; grounds FFA win-condition and placement framing.
- https://www.youtube.com/watch?v=7J5zwb_s_Cg — "OpenFront Beginner Guide (2026) | How to Win Your First Games". 2026-era; corroborates current tutorial coverage and what a "first win" looks like.
- https://www.youtube.com/@OpenFrontAcademy — channel with "How to Play OpenFront.io — Beginners Guide to Win Your First Game". Used for the "watch a top-10 player's commentary" advice (community names Ultimus Rex / top-10 players as the best replay-review model).

## Official primary source

- https://github.com/openfrontio/OpenFrontIO/blob/main/docs/API.md — official OpenFront API documentation. The `GET /public/leaderboard/ranked` endpoint (per-ladder 1v1/2v2/ffa, top entries, ~15-minute refresh) and `GET /public/clans/leaderboard` (top 100 by weighted wins). Verified live on 2026-11-28: the ranked response returns `rank`, `elo`, `peakElo`, `wins`, `losses`, `total`, `username`, `level`, `prestige`, `legend`.

## Key observations

1. The official ranked leaderboard endpoint is the canonical, community-cited place for top-50 ranked numbers; it refreshes roughly every 15 minutes, so a just-finished match is not there yet.
2. OFstats, Trackerfront, and OFratings are the three third-party stat sites the community converges on; OFstats is the one OpenFront links from the FFA rating UI. All require login to attribute stats to the right player.
3. The most common player confusion is treating the rating swing as a fixed reward, and treating win rate as absolute without normalizing by mode and lobby size.
4. Placement (top-5/top-10 finish) is the nuance that separates "win count" from "actually good" in FFA, where only one player can win.
5. Numbers that change a decision: ranked Elo and its swing per game, peak Elo, wins/losses/total (the raw base), level/prestige/legend (cosmetic progression, not skill), and FFA tier rating with its ± uncertainty and placement adjustment.

## Limitations

- Direct Reddit JSON fetches were blocked this session (bot walls); thread content above is from search-indexed excerpts, so dates are approximate where not shown.
- OFstats/Trackerfront/OFratings are third-party; their exact field sets change between updates, so the guide references them as community convention rather than authoritative schema.
- FFA tier ladder (Iron→Grandmaster, 10 calibration games, divisions I–III on the first seven tiers) was verified against v0.36 tag source (FfaTier.ts, FfaRatingSummary.ts), not the live API.
