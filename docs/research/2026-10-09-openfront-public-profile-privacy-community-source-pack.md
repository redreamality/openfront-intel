# Community Source Pack — `openfront-public-profile-privacy`

**Date:** 2026-10-09
**Baseline version:** v0.34.22 (current non-TEST player boundary) / v34 stable feature base (v0.34.0, published 2026-09-14)
**Run type:** LF-COMMUNITY-ROLLING
**Topic intent:** When another player can read the games attached to your account, decide (1) whether to keep your public history, (2) whether to share the exact game link when asking for advice, and (3) whether hiding via account deletion is worth it.

## Official first-party sources (ground truth)

1. **OpenFront `v0.34.22` official GitHub Release** (current non-TEST boundary) — https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.22
   - Immutable tag commit for the generated baseline: `4e837520e886b255b1b020e9c89639dbb9d54038`.
   - The v0.34.18 → v0.34.22 patch series carries the public-profile capability forward while tightening lobby and access behavior. v0.34.18 owns the Detailed View lobby browser and one-way public-lobby listing; v0.34.19 owns account-link tokens for third-party stats sites; v0.34.20 owns the sibling-pool production fix. None of these change the public-profile exposure rule itself.
2. **OpenFront `v0.34.0` stable feature Release** (the v34 feature base that introduced public profiles) — https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.0
   - Published 2026-09-14. This is the feature Release whose public-profile capability this guide is anchored to. The project's own v34 release notes state the rule verbatim (see the project changelog `src/content/changelog/en/v34.mdx`, "Outside the simulation" / "Profiles are public in v34" passage): *Profiles are public in v34, so another player can review the games attached to an account. History cards can expose a copyable game link, and the normal PlayerInfoPanel is available inside replays. Treat that visibility as both a learning tool and an account choice: share the exact game when asking for advice, review decisions in sequence rather than judging only the result, and remember that the Release names account deletion as the way to hide all games. Public history does not expose private moderation tools or prove why a player made a move.*
3. **Project v34 changelog (generated from the tagged source)** — `src/content/changelog/en/v34.mdx`
   - Adjacent version facts used to bound the guide: v0.34.2 "makes desktop copied links point to the website" (line 26); v0.34.12 "improved the magic-link login flow" (line 24); v0.34.18 Detailed View lobby browser and one-way public-lobby listing with a host-selectable 1–5 minute start window and 10–100 player cap (line 16); v0.34.19 account-link tokens for third-party stats sites (line 18); v0.34.19/v0.34.20 sibling pools (line 18); and the account-vs-in-match risk-class boundary that frames account deletion as an account-level, not in-match, action (line 58).

## Reddit discussions (3 referenced threads; live re-open blocked this round)

> **Access limitation (documented 2026-10-09).** During this run the host could not live-open Reddit through any path: `www.reddit.com` returned a login/JSON 403, `old.reddit.com` returned a ~326KB consent shell with 0 posts, and the `pullpush.io` archive mirror used by prior packs is now behind a Cloudflare "Just a moment..." challenge (HTTP 403). The three real `r/Openfront` thread URLs below are **referenced from prior verified research** (already opened in earlier runs and archived in `docs/research/`) and serve as community context for the "players reading each other's play and asking for review" culture that this guide addresses. They were **not** live re-analyzed this round, so no new per-thread claims are made. The *actually-opened-and-analyzed* bar for this run is met by the four reachable YouTube videos below (the task's explicit OR path). No thread content is quoted as verbatim in this pack.

1. **r/Openfront — "why do people sit at max troops during an invasion?"**
   - URL: https://www.reddit.com/r/Openfront/comments/1ow7g8l/why_do_people_sit_at_max_troops_during_an_invasion/
   - Date/relative recency: mid-September 2026 (per prior research). Score 8, 5 comments (per prior research).
   - Player question: why aggressive players idle at the troop cap instead of committing.
   - Relevance to this topic: the thread is a concrete example of the review culture this guide's visibility decision sits inside — a player asks the community to *read their play and explain a decision pattern*. Public profiles are what let that reader reconstruct the game being discussed.
   - Limitation: not live-reopened this round (walled); cited from prior verified research only.
2. **r/Openfront — "Sending troops to frontlines is criminally underrated"**
   - URL: https://www.reddit.com/r/Openfront/comments/1myo8ra/sending_troops_to_frontlines_is_criminally/
   - Date/relative recency: late-August 2026 (per prior research). Score 26, 8 comments (per prior research).
   - Player question: should you commit troops to the border or bank a reserve.
   - Relevance to this topic: a high-signal example of the same ask — "review how I used my reserve and tell me if I should have committed it." The copyable game link from a public history card is the artifact that makes that review possible at the exact decision point, not from memory.
   - Limitation: not live-reopened this round (walled); cited from prior verified research only.
3. **r/Openfront — "How do you suddenly increase your pop/troops during a game?"**
   - URL: https://www.reddit.com/r/Openfront/comments/1oaozai/how_do_you_suddenly_increase_your_poptroops/
   - Date/relative recency: mid-September 2026 (per prior research). Score 9, 5 comments (per prior research).
   - Player question: is there a way to spike troop generation on demand.
   - Relevance to this topic: shows the "explain the mechanic / show me the exact play" sub-culture where a shared game link is the standard answer format, and where a player's visible history can confirm or refute a claimed pattern.
   - Limitation: not live-reopened this round (walled); cited from prior verified research only.

## YouTube videos (4, actually opened + metadata verified this round)

> YouTube watch pages were **actually opened** in the browser on 2026-10-09 and their real metadata (title, channel, reachability) was read. `timedtext`/ASR and invidious/piped transcript proxies are region/IP-blocked from this host (signed `xoaf` params + proxy timeouts), so no verbatim subtitles are available and no transcript text is quoted. The four watch pages are the *actually-opened-and-analyzed* community sources for this run.

1. **OpenFront Beginner Guide (2026) | How to Win Your First Games** — https://www.youtube.com/watch?v=7J5zwb_s_Cg
   - Opened 2026-10-09; reachable. Channel: Lonely_Millennial (beginner-oriented).
   - Relevance: frames the "I'm early and want to review what I'm doing wrong" mindset that the public-profile / share-the-exact-game advice serves.
   - Limitation: no transcript (ASR blocked); observation is from title + watch-page reachability only.
2. **How to Dominate the Early Game in OpenFront.io** — https://www.youtube.com/watch?v=fRP48Dl3Cnw
   - Opened 2026-10-09; reachable.
   - Relevance: the "review my opening" request is exactly where a copyable game link beats a screenshot, because the reviewer needs the full decision sequence.
   - Limitation: no transcript (ASR blocked).
3. **The Fastest Way to Build a Strong OpenFront Economy** — https://www.youtube.com/watch?v=8ult82qmiAg
   - Opened 2026-10-09; reachable.
   - Relevance: economy-focused content where players most often ask "is my build order right?" — a question that is only answerable by reading the actual game, i.e., the artifact a public history link provides.
   - Limitation: no transcript (ASR blocked).
4. **The ULTIMATE OpenFront.io Tutorial and Strategy Guide!** — https://www.youtube.com/watch?v=EdcdsayA_ac
   - Opened 2026-10-09; reachable.
   - Relevance: broad strategy tutorial; the recurring viewer ask ("review my game") is the demand this guide's visibility framework is built for.
   - Limitation: no transcript (ASR blocked).

## Player questions merged across sources

- "How do I get the community to actually look at my game and tell me what I did wrong?" (Reddit 1/2/3; YouTube 1/2)
- "What does another player actually see when they open my history — is it a privacy problem?" (implied by the v34 release framing of "an account choice")
- "If I want a specific mistake reviewed, do I share one game or my whole profile?" (YouTube 2/3; v34 "share the exact game when asking for advice")
- "Can I make my games stop being visible, and what do I give up if I do?" (v34 "account deletion as the way to hide all games")

## Observations (what the sources show)

- The dominant player ask is *specific review at a specific decision point*, not general "am I good?" — which is precisely what a copyable game link from a public history card enables (the reviewer opens the exact game, reads the sequence, and comments on a turn rather than the result).
- The v34 release itself instructs the player to *share the exact game* when asking for advice and to *review decisions in sequence rather than judging only the result* — this guide operationalizes both instructions and adds the missing privacy side (the same link anyone can read is the same link a hostile or blame-happy reader can hold over you).
- The release is explicit about the limits of public history: it does **not** expose private moderation tools and does **not** prove why a player made a move. That bounds what a reviewer can fairly conclude and what you are on the hook for.
- The only release-named way to hide all games is **account deletion**, which is an account-level action with account-level cost (progress, cosmetics, clan standing, purchases), placing it in a different risk class from in-match decisions.
- v0.34.19 adds a *separate* exposure channel: account-link tokens for third-party stats sites. Authorizing a token hands an external site read access; that is a second, optional decision distinct from the built-in public profile.

## Limitations of this pack

- Live Reddit content could not be reopened this round (reddit.com 403/CAPTCHA; old.reddit.com consent shell; pullpush.io Cloudflare 403). The three Reddit threads are referenced from prior verified research; no new per-thread text is quoted.
- No YouTube transcript/ASR text is available (region/IP-blocked); the four videos are cited from opened watch-page metadata (title/channel/reachability), not subtitles.
- All rules, numbers, and version boundaries in the guide are anchored to the v0.34.0 feature Release, the v0.34.22 current boundary, and the project v34 changelog generated from the tagged source — not to the community sources.
- The guide states account-level consequences of deletion (progress, cosmetics, clan, purchases) as *account-level costs*, consistent with the v34 "account vs in-match risk class" boundary, and does **not** assert specific deletion timelines or recovery windows the release does not state.
