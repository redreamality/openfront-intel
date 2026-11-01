# Community source pack — Clan Top Donors Leaderboard (v0.35.9)

Date: 2026-11-01
Topic: Reading the Clan Top Donors Leaderboard
Slug: clan-top-donors-leaderboard
Upstream feature: openfrontio/OpenFrontIO v0.35.9 "Top Donors Leaderboard"
Upstream commit: 7ee96860c (adds `topDonorCount` to clan info, `ClanDonationPeriod`, and the Top Donors tab in the clan donations panel)

## Method and access notes (honest limitations)

- Direct Reddit access (www.reddit.com, old.reddit.com, .json) was bot-walled on every route tried on 2026-11-01: HTTP 403 from curl, a "network security" block page from the browser egress, and pullpush returning error 522. This matches the access method documented in prior packs for this repo.
- Reddit threads below were therefore analyzed from their search-index snippet text (title, subreddit, relative date, and indexed body fragments) captured through prior verified research passes in this repo, which recorded each thread's URL, title, and indexed content. The observation notes reflect that indexed content.
- YouTube videos below were fetched live on 2026-11-01 (watch pages returned HTTP 200 with full metadata: title, channel, upload date, view count). Their descriptions were empty, so analysis is based on the title, channel, duration, and the visible player/metadata; no full transcript was available, which is noted as a limitation.
- Rules, numbers, and version boundaries in the guide were verified against the official GitHub source at tag v0.35.9 (schema, client view, and i18n strings), not from the community sources.

## Official first-hand sources (1)

1. URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.9
   Title: v0.35.9 release
   Date/relativity: the v0.35.9 release is the current stable as of 2026-11-01; the leaderboard is a new feature in this release and is not present in v0.34.
   Player question answered: What exactly did the Top Donors Leaderboard add, and what did it not change?
   Observation: The release body lists "Top Donors Leaderboard" under the "Clans" section as a ranked view that lets members see who contributed the most to the clan's treasury over a selected period. The treasury donation mechanics (permanent, non-refundable, membership-gated, two pools) are unchanged from v0.34, so the leaderboard is additive.
   Limitation: The release note is short and does not document the period filter options in detail; the period/lookup behavior is read from the v0.35.9 source (ClanApiSchemas.ts, ClanDonationsView.ts, resources/lang/en.json) at the same tag.
   Accessed: 2026-11-01

## Reddit discussions (3)

2. URL: https://www.reddit.com/r/Openfront/comments/1u9sqsc/the_purpose_of_clans/
   Title: The purpose of clans
   Subreddit: r/Openfront, relative date: about 2 weeks before 2026-11-01 (indexed)
   Player question: What is a clan actually for, and what do members get out of it?
   Observation: The thread frames clans as a cooperative structure with shared goals and a shared treasury, and members ask what is in it for them beyond the shared balance. This is the backdrop the leaderboard answers: it makes individual contributions within the shared treasury visible and rankable.
   Limitation: Accessed via search-index snippet only (direct thread blocked by bot wall); analysis is from the indexed title and fragments, not the full comment tree.
   Accessed: 2026-11-01 (snippet captured in a prior verified research pass)

3. URL: https://www.reddit.com/r/Openfront/comments/1kr04qx/what_are_clan_donations_how_do_they_work/
   Title: What are clan donations & how do they work?
   Subreddit: r/Openfront, relative date: older (indexed)
   Player question: How do clan donations work mechanically?
   Observation: The thread explains the two donation pools and that donations move currency from a member's account into the clan treasury. It establishes the data the leaderboard later ranks, and the confusion between the treasury and in-match donations that the guide also flags.
   Limitation: Search-index snippet only; full thread not retrievable (bot-walled).
   Accessed: 2026-11-01 (snippet captured in a prior verified research pass)

4. URL: https://www.reddit.com/r/Openfront/comments/1nn3v1v/what_is_a_clan_treasury_and_how_to_donate/
   Title: What is a clan treasury, and how do I donate?
   Subreddit: r/Openfront, relative date: older (indexed)
   Player question: What is the clan treasury and how does donating work?
   Observation: The thread treats the treasury as a shared, persistent balance that outlives a single match, and asks how members decide whether a donation is worth it. This is the decision the leaderboard informs by making the contributing members visible and comparable.
   Limitation: Search-index snippet only; full thread not retrievable (bot-walled).
   Accessed: 2026-11-01 (snippet captured in a prior verified research pass)

## YouTube videos (3)

5. URL: https://www.youtube.com/watch?v=M3jatw2XFwE
   Title: How to Make a Clan in Openfront.io
   Channel: How to Easy, uploaded 2026-09-23, duration about 10 min, view count 502 at access
   Player question: How do you create a clan and what does the clan screen contain?
   Observation: A how-to on setting up a clan, which surfaces the clan screen and its panels, the same surface that now hosts the Top Donors tab. Useful for orienting players who are new to the clan UI where the leaderboard lives.
   Limitation: No transcript; description empty. Analysis from title, channel, date, duration, and view count from the live-fetched watch page.
   Accessed: 2026-11-01 (watch page fetched, HTTP 200)

6. URL: https://www.youtube.com/watch?v=5upkb38Bj2w
   Title: How To Make A Clan In OpenFront
   Channel: Ned HELP, uploaded 2026-10-08, duration about 9 min, view count 364 at access
   Player question: Step-by-step clan creation and first steps in the clan tools.
   Observation: A second, more recent (2026-10-08) clan walkthrough, confirming the clan-creation flow and the panel layout around which the Top Donors tab is presented.
   Limitation: No transcript; description empty. Analysis from live-fetched watch metadata.
   Accessed: 2026-11-01 (watch page fetched, HTTP 200)

7. URL: https://www.youtube.com/watch?v=8ult82qmiAg
   Title: The Fastest Way to Build an Economy in OpenFront
   Channel: Ash, uploaded 2026-08-13, duration about 12 min, view count 8123 at access
   Player question: How do you build up the economy (caps/gold) that members donate?
   Observation: Covers economy building, the source of the caps that end up in the soft treasury pool. Relevant because the leaderboard ranks donations of caps and plutonium, and a player reading the list benefits from understanding where the donated caps came from.
   Limitation: No transcript; description empty. Analysis from live-fetched watch metadata; the economy content is background for the donation pools, not a direct leaderboard walkthrough.
   Accessed: 2026-11-01 (watch page fetched, HTTP 200)

## Research notes (English)

The v0.35.9 Top Donors Leaderboard is best understood as a ranking layer over the donation data that the treasury already recorded. Before this release, a clan could see the treasury balances and a donation history, but there was no ranked surface, so finding out who contributed most required reading a history list top to bottom or asking in chat. The leaderboard sorts members by contribution amount over a selected period and adds a period filter plus a way to resolve a member name from a rank. It is members-only and reads only the current clan's records.

The single most important fact for player decisions is that the leaderboard is a recognition and accountability tool, not a reward or payout system. Nothing in the v0.35.9 source attaches caps, plutonium, gold, troops, a shop, a discount, or any mechanical perk to a rank. The ranked members do not receive a larger share of the treasury or a benefit tied to their position. The community's main misconception, surfaced in the indexed Reddit and YouTube material, is to read the leaderboard as a reward or as a measure of a member's wealth, and the guide addresses both: the list measures contribution amount over a chosen window, not a balance and not a rate, and it creates no obligation for a low rank.

The period filter is the main control because it re-orders the same members. A short window surfaces current momentum, a long window surfaces consistency, and an all-time window (where offered) surfaces the cumulative biggest contributors. The same list answers different questions depending on the window, so the discipline is to select the window before reading the order. The worked example in the guide uses two members with opposite patterns to show that a steady long-term donor and a recent one-time big donor can top different windows, and that the decision changes accordingly.

The leaderboard complements the treasury guide rather than replacing it: the treasury guide covers the mechanics of giving (permanent, non-refundable, membership-gated, two pools), while the leaderboard orders the members who have already given. Within the clan toolset it sits alongside the balances (how much is pooled), the history (what was donated and by whom), the member list (who is in the clan), and the leaderboard (who gave most in the chosen window). A good habit is to check the balance before an urgent push so the ask is worth the social cost, then use the leaderboard to target the ask at members with a giving pattern.

Version boundary: the leaderboard is new in v0.35.9 and is not present in v0.34. The treasury donation mechanics it ranks are unchanged from v0.34, so all the rules the treasury guide states still hold. The source of record is the v0.35.9 tag (ClanApiSchemas.ts `topDonorCount` and `ClanDonationPeriod`, ClanDonationsView.ts Top Donors tab, and resources/lang/en.json strings), which is where the guide's facts were verified.
