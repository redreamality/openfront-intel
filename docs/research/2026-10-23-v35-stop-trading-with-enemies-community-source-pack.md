# Community Source Pack — v0.35 Stop Trading with Enemies (global embargo keeps ally trade)

Topic: the v0.35.0 change where the global embargo button, previously "Stop Trading with All", becomes "Stop Trading with Enemies" and now preserves trade with allies and teammates while cutting hostile partners. Slug: `stop-trading-with-enemies-v35`. Access date: 2026-10-23.

## Source inventory

### Reddit (3 accessible threads analyzed)

1. "Please Add a 'Stop Trading with ALL/Stop Trading with Non-Allies' feature." — r/1024x1024, id `1nofirn`, created 2025-09-23 (UTC).
   URL: https://www.reddit.com/r/1024x1024/comments/1nofirn/
   Player question: how to embargo everyone in one action without five separate clicks, especially on mobile.
   Observation: this is the literal feature request that v0.35.0 shipped. A commenter says "add stop trade all/non-al[lies]" and describes the five-click manual embargo as a "disability" on mobile, and PC players agree the per-person embargo is "annoying as f not having it in one key". The request for a "non-allies" scope is exactly what the v0.35.0 rename to "Stop Trading with Enemies" implements: cut everyone, keep allies.
   Limitation: thread predates v0.35, so it describes the pre-v35 behavior where the global embargo also cuts allies; it is used as the primary evidence of the player pain point that the v0.35.0 feature fixes.
   Accessed: 2026-10-23 via pullpush.io comment API (2 comments).

2. "embargoes are one of the best ways to end stalemates in ffa" — r/1024x1024, id `1vwmgv2`, created 2026-07-24 (UTC).
   URL: https://www.reddit.com/r/1024x1024/comments/1vwmgv2/
   Player question: how to break a stalemate in FFA using economic pressure.
   Observation: the thread argues embargo is the cheapest denial tool in FFA because it costs no units and no gold. Commenters describe the "embargo then attack" pattern: "I used attack p1 and then bag symbol" and "they might send the message 'lets be trade partners', as many do when embargoed, and you send 'attack [P1]!'". The stalemate framing matches the guide's FFA scenario.
   Limitation: thread is v34-era, so it does not mention the ally-skip; it is used for the FFA decision framing and the embargo-then-attack pattern that the guide warns against as an escalation.
   Accessed: 2026-10-23 via pullpush.io comment API.

3. "Stop Trading Hotkey" — r/1024x1024, id `1u7og0k`, created 2026-06-17 (UTC).
   URL: https://www.reddit.com/r/1024x1024/comments/1u7og0k/
   Player question: whether there is a hotkey to stop trading with everyone.
   Observation: a commenter confirms the actual mechanism: "right-click on yourself, you can click 'Stop trading with All'. Then you can right-click on specific enemies/allies and click 'Start trading' to only trade with select people." This is the pre-v35 UI flow that the v0.35.0 rename changes. Another commenter notes "a lot of times in team games they will have clusters of warships patrolling from multiple different people so it's almost impossible", which is the team-mode trade-pressure context the guide covers.
   Limitation: thread is v34-era, so it describes the pre-v35 button label and flow; it is used for the UI mechanics and the team-mode pressure framing.
   Accessed: 2026-10-23 via pullpush.io comment API (3 comments).

### YouTube (3 videos with verifiable English auto-subtitles)

4. "We were STALEMATED, but I had a SECRET TRADE PARTNER! | OpenFront.io | Ultimus_Rex" — id `Q3idombLQB8`, uploaded 2025-05-06.
   URL: https://www.youtube.com/watch?v=Q3idombLQB8
   Observation: directly on-topic. The player narrates being stuck in a stalemate until they secured a secret trade partner, and the subtitle transcript contains "stop trading" (x2), "trade" (x75), "ally" (x225), "alliance" (x106), and "port" (x81), in the context of the decision to embargo rivals while keeping a partner's trade line open — exactly the tension v0.35.0 resolves with the ally-skip.
   Limitation: video predates v0.35, so it describes the pre-v35 behavior where the global embargo also cuts allies; used as evidence of the secret-trade-partner / stalemate decision that the v0.35 feature now makes possible.
   Accessed: 2026-10-23 via yt-dlp English auto-subtitle download (97,970 subtitle words).

5. "This SECRET Strategy Allows You to DESTROY Even the STRONGEST Enemies | OpenFront.io | Enzo Plays" — id `djZf_XbuGVo`, uploaded 2025-07-28.
   URL: https://www.youtube.com/watch?v=djZf_XbuGVo
   Observation: the video covers a 40-player game strategy built around trade and alliance pressure. The subtitle transcript contains "stop trading" (x6), "trade" (x60), "ally" (x233), and "port" (x96), in the context of choosing which trade lines to cut against the strongest enemy while preserving useful ones.
   Limitation: video predates v0.35, so it describes the pre-v35 behavior where the global embargo also cuts allies; used for the trade-line-cutting decision and the Port cost framing.
   Accessed: 2026-10-23 via yt-dlp English auto-subtitle download (83,544 subtitle words).

6. "The ULTIMATE OpenFront.io Tutorial and Strategy Guide! | Ultimus_Rex" — id `EdcdsayA_ac`, uploaded 2025-04-29.
   URL: https://www.youtube.com/watch?v=EdcdsayA_ac
   Observation: a comprehensive tutorial covering the trade economy and embargo as a denial tool. The subtitle transcript contains "embargo" (x3), "trade" (x24), "ally" (x396), and "port" (x48), in the context of the overall strategy guide that the embargo timing and trade control guides build on.
   Limitation: video predates v0.35, so it does not mention the ally-skip; used for the broad trade/embargo/ally framing and the Port cost context.
   Accessed: 2026-10-23 via yt-dlp English auto-subtitle download (74,129 subtitle words).

### Official first-hand source

7. OpenFront v0.35.2 GitHub Release body.
   URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.2
   Statement: "Stop Trading with All is now Stop Trading with Enemies and keeps trade with your allies."
   This is the authoritative statement of the v0.35.0 change. Tag SHA: 08b63c054897c030e6516e0731ab7cc62b2998b7.
   Accessed: 2026-10-23 via `gh api -X GET 'repos/openfrontio/OpenFrontIO/releases/tags/v0.35.2'`.

### Tag source verification

8. v0.35.2 tag source: `packages/engine/src/game/PlayerImpl.ts`, `canEmbargoAll()` method.
   The method returns false for self, Bots, `isOnSameTeam`, and `isAlliedWith`. The `isAlliedWith` skip is the v0.35.0 addition.
   Accessed: 2026-10-23 via `git show v0.35.2:packages/engine/src/game/PlayerImpl.ts`.

9. v0.34.25 baseline: `src/core/game/PlayerImpl.ts`, `canEmbargoAll()` method.
   The method returns false for self, Bots, and `isOnSameTeam` only. No `isAlliedWith` skip.
   Accessed: 2026-10-23 via `git show v0.34.25:src/core/game/PlayerImpl.ts`.

10. v0.35.2 tag source: `packages/engine/src/configuration/EngineConfig.ts`.
    `embargoAllCooldown(): Tick` returns 1200; `temporaryEmbargoDuration(): Tick` returns 480; `Port: StructureCost` is `cost: 400_000, multiplier: 1.1`; `tradeShipGold` is a base amount; `smallEconomySpawnBoost` fades over 6 levels.
    Accessed: 2026-10-23 via `git show v0.35.2:packages/engine/src/configuration/EngineConfig.ts`.

## Research notes

The v0.35.0 change is narrow: the single-player embargo command is untouched, and only the global embargo command gained the ally-skip. The shared 1200-tick cooldown between the two commands is the binding constraint, and the 480-tick temporary embargo duration is the denial window. The global embargo has no 100-influence, capital, or trade-port requirement; the only requirements are a clear cooldown and at least one eligible hostile player. The relation penalty from an embargo does not come from the embargo itself but from a separate Port-attack action, which is why the guide keeps the embargo and the attack as separate decisions.

The existing v0.34 guide `embargo-timing-and-trade-control` claims the global embargo "needs 100 influence plus a live capital plus a trade port", but the tag source at both v0.34.25 and v0.35.2 shows no such requirement. This guide corrects that error and does not repeat it.
