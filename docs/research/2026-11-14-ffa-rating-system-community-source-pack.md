# FFA Rating / OFstats FFA Rating — Community Source Pack

- **Topic:** How OpenFront's OFstats FFA Rating works after v36.0 (the new ranked FFA ladder that replaced the old ranked queue).
- **Slug:** `ffa-rating-system`
- **Access date:** 2026-11-14
- **Release boundary:** OpenFront `v0.36.0` (formal release) introduced the OFstats FFA Rating; current config anchor `v0.36.2`.
- **Official primary URL:** https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.0
- **Official docs (secondary):** https://ofstats.io/leaderboard/how-it-works
- **Source tag:** https://github.com/openfrontio/OpenFrontIO/tree/v0.36.2

## Reddit discussions analyzed

1. **OFstats.io — Track OF games, players, and stats** — https://www.reddit.com/r/Openfront/comments/1qp9fxj/ (published 2026-01-28). The pinned announcement thread for the OFstats tracker. Player questions here center on what the tracker records and how it differs from in-game stats. Observation: players treat OFstats as the canonical scoreboard and ask whether their public FFA play is already being tracked even before a rating is shown. Limit: this is an announcement thread, so it frames the feature but does not describe the rating algorithm.
2. **Ranked FFA is weird right now** — https://www.reddit.com/r/Openfront/comments/1x8iv60/ (published 2026-10-17, inside the v36 window). Players describing how the early v36 ranked FFA felt and what they expected versus what shipped. Observation: confusion between the old ranked queue and the new OFstats ladder is the single most common complaint; several posters ask whether a hidden rating is already being computed. Limit: subjective impressions, not authoritative mechanics.
3. **[deleted by user]** — https://www.reddit.com/r/Openfront/comments/1tbsina/ (published 2026-05-13). Content was removed by the author; the RSS still returns the title, date, and thread metadata. Observation: the title is no longer readable, so this thread contributes only as a dated marker of earlier ranked-FFA discussion and cannot be used for a specific claim. Limit: body unavailable; excluded from any factual assertion.
4. **Will there be a ranked FFA?** — https://www.reddit.com/r/Openfront/comments/1w8cojy/ (published 2026-09-05). A pre-v36 thread where players ask directly whether a ranked FFA ladder is coming. Observation: the question that v36.0 answers; the replies track anticipation and the request for a season structure. Limit: predates the feature, so it documents demand rather than mechanics.

## YouTube videos analyzed (verifiable subtitles)

1. **I Tried OpenFront's NEW Ranked Mode! (v35 Update)** — TheBiff — https://www.youtube.com/watch?v=I1eW-ILqRp8 (uploaded 2026-10-17). Verifiable English subtitle track retrieved. Relevant because it captures the player experience of ranked modes and the shift into the v36 era; useful for how players talk about ratings, seasons, and placement in practice.
2. **I Turned myself into the Most ISOLATED Player? | OpenFront.io** — TheBiff — https://www.youtube.com/watch?v=cFoRz9cHvPM (uploaded 2026-10-02). Verifiable English subtitle track retrieved. FFA-focused gameplay commentary; useful for how solo FFA play reads to an external audience and how isolation and spawn position drive FFA outcomes.
3. **This Map Is Brain Rot | OpenFront.io** — DougyJr — https://www.youtube.com/watch?v=k31CnvXsPFA (uploaded 2026-10-18). Verifiable English subtitle track retrieved. FFA/map commentary inside the v36 map window; useful for which maps players expect the new ladder to run on and how map shape interacts with FFA strategy.
4. **How to Win in Openfront.io (Multiplayer Tutorial)** — Enzo Plays — https://www.youtube.com/watch?v=ehR2j15ttag (uploaded 2025-05-14). Verifiable English subtitle track retrieved. Older, so it documents the pre-ladder FFA fundamentals that the new rating now measures; useful as a baseline for what "winning FFA" means to players.

## Official first-party sources

- **v0.36.0 formal release notes** — https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.0 — the authoritative statement that the OFstats FFA Rating replaced the old ranked FFA queue and that it uses an 8-rank ladder with a top-250 leaderboard.
- **v0.36.2 tag source** — https://github.com/openfrontio/OpenFrontIO/tree/v0.36.2 — the `FfaTier.ts`, `FfaSeason.ts`, `FfaRatingApi.ts`, `FfaRatingPanel.ts`, and `LeaderboardPlayerList.ts` files that define the 22 concrete rank labels (Iron III up to Grandmaster), the ten-game calibration, the ten-human minimum, the ± uncertainty value, and the hidden-by-uncertainty leaderboard rule.
- **OFstats leaderboard how-it-works** — https://ofstats.io/leaderboard/how-it-works — the operator's explanation of how the OFstats leaderboard computes and displays ratings.

## Player questions merged across sources

- What is the difference between the old ranked FFA queue and the new OFstats FFA Rating, and which one is actually live now?
- How is my FFA rating calculated, and what does the ± value mean?
- How many games do I need before I get a real rank, and is there a hidden calibration?
- When does the season reset, and what happens to my rank at the boundary?
- Why is my name missing from the leaderboard even though I have played FFA?
- Which maps and lobby sizes is the ladder played on, and does a small lobby change the rating?

## Observations

- The dominant community confusion is the old-versus-new ranked FFA boundary: many players still assume the old queue exists after v36.0.
- Players overestimate the calibration: several assume a separate queue or an entry cost, when in practice calibration is simply the first ten public FFA matches.
- The hidden-by-uncertainty rule is the least understood mechanic and the most frequent "where is my rank" question; it is driven by the ± value being too large, most often right after a season reset.
- Map shape and spawn isolation are discussed constantly in the FFA footage, but the rating itself is mode-scoped: it tracks FFA skill and does not depend on which map is loaded.

## Limitations

- Reddit thread 3 was deleted, so it contributes no claim.
- YouTube captions are auto-generated where noted; quotes from them are treated as community sentiment, not as official mechanics.
- All authoritative rules, numbers, and version boundaries are verified against the v0.36.0 release body and the v0.36.2 tag source, not against community posts.
