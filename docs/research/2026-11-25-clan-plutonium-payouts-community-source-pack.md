# Community source pack: clan-plutonium-payouts

Feature: OpenFront clan Plutonium payouts — a clan leader sends Plutonium from the pooled clan fund to current members. Shipped in v0.36.3 (commit `ced0c4e0a`, PR #6393 "Let clan leaders send Plutonium from the clan fund to members") and still present in the current release v0.36.7.

This pack records the community and primary sources actually consulted, the player question each answers, what was observed, the limits of each source, and the access date. Rules, numbers, and version boundaries are pinned to the formal Release, tag source, generated data, or the official Terms of Service — never to a community thread.

## Primary (official) sources

1. OpenFront.io Terms of Service, §8.14 "Clans and clan funds" — https://openfront.io/terms-of-service.html
   - Accessed 2026-11-25. Authoritative on the governance of the feature: who controls the fund, the limits regime, visibility, reversals, freezes, and the no-trading rule. Key verbatim facts: "Only the leader can send Plutonium from it, and only to other current members of the clan, not to themselves." Limits are "set and may change, including daily limits for each clan and each member, a minimum time in the clan before a member can receive, a wait before a new leader can send, a wait before a former leader can receive from the clan they led, and account eligibility requirements, such as not being banned." Sends are visible to every member (who sent, who received, how much, when, and whether reversed). Sends are final except where reversed; reversals happen for fraud, chargebacks, refunded payments, abuse, breaches, or legal requirement, and the operator may freeze a clan's sending. No selling, trading, or raffles of clan-fund Plutonium, sends, or positions for value outside the service.
   - Limit: the ToS states limits exist and may change but does not publish the numeric cap values or the exact membership-days/cooldown figures; those are server-side and not in the open client.

2. OpenFrontIO formal Release v0.36.3 — https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.3
   - Accessed 2026-11-25. Official release notes state: "Clan leaders can now send Plutonium from the clan fund to members, and every member can see where it went." This is the version boundary: the feature is live from v0.36.3 onward.

3. OpenFrontIO source tag v0.36.3 and v0.36.7 (client) — https://github.com/openfrontio/OpenFrontIO
   - Accessed 2026-11-25. Verified at tag: `src/client/components/clan/ClanSendFundsView.ts` and `src/client/components/clan/ClanFundShared.ts` (present in both v0.36.3 and v0.36.7), ship commit `ced0c4e0a` (PR #6393). Player-facing i18n strings from `resources/lang/en.json` at v0.36.7: "send_funds" = "Send Plutonium"; "send_funds_amount_hint" = "Up to {amount} for {name} right now"; "send_funds_confirm_message" = "Send {amount} Plutonium from the [{tag}] fund to {name}? This can't be undone."; "payouts_explainer" = "Plutonium the leader has sent from the clan fund. Every send is listed here."; "payouts_empty" = "No payouts yet. If the leader sends Plutonium from the fund..."; refusal strings "The clan has reached today's sending limit.", "Sending from the clan fund isn't available yet.", "An earlier send from this page went through". `ClanFundShared.ts` confirms the payouts ledger lists every send and a `reversedAt` field marks reversals.
   - Limit: the client is open source; the server that enforces the caps and eligibility is not, so the exact daily-cap and membership-days numbers cannot be asserted from the repo.

## Reddit discussions (r/Openfront)

4. "The purpose of clans" — https://www.reddit.com/r/Openfront/comments/1u9sqsc/the_purpose_of_clans/
   - Accessed 2026-11-25. Player question: what is a clan actually for, and why do people keep one? Observation: the durable clans run through a Discord, treat the leaderboard as a win/loss ratio to hold, and have named members who can be confirmed to still be playing. The weak-clan thread is really about FFA same-flag teaming and "what's the point of clans," where pooled currency is the wrong answer because the shared reason to keep playing is missing.
   - Limit: pre-dates v0.36.3; does not mention payouts. Direct JSON fetch was bot-walled; content read via search-index snippet.

5. "A few questions for people who play team games" — https://www.reddit.com/r/Openfront/comments/1wlz1ja/a_few_questions_for_people_who_play_team_games/
   - Accessed 2026-11-25. Player question: how do team-game economies and clan coordination actually work in practice? Observation: recurring questions about pooling resources and rewarding members who show up, and about the difference between in-match transfers and out-of-match commitments.
   - Limit: generic economy thread; no payout-specific claims. Direct fetch bot-walled; snippet only.

6. "Guys how do I make Plutonium and Caps" — https://www.reddit.com/r/Openfront/comments/1x0m2ks/guys_how_do_i_make_plutonium_and_caps/
   - Accessed 2026-11-25. Player question: how do you actually acquire the premium (Plutonium) and earned (Caps) currencies? Observation: newcomers confuse the two currencies and conflate earning, buying, and receiving; this is the confusion a payout (a received transfer) sits inside. Reinforces that payout currency is Plutonium specifically, not Caps.
   - Limit: acquisition thread; no payout content. Snippet only.

7. "3500 Plutonium in prizes — 2-week FFA challenge" — https://www.reddit.com/r/Openfront/comments/1wpzlbd/3500_plutonium_in_prizes_twoweek_ffa_challenge/
   - Accessed 2026-11-25. Player question: is a Plutonium prize pot credible and how is it distributed? Observation: the community's recurring desire for transparent, visible distributions of premium currency; a payout ledger that every member can see is exactly the transparency these prize discussions demand.
   - Limit: a challenge thread, not a feature thread. Snippet only.

8. "OpenFront Masters updates — major announcement" — https://www.reddit.com/r/Openfront/comments/1v4p4fl/openfront_masters_updates_major_announcement/
   - Accessed 2026-11-25. Player question: what changes in the competitive/Masters ecosystem and how do they affect clan spending? Observation: competitive framing makes the fund a retention and coordination budget for a stable roster rather than a gift; supports the "recurring small transparent payout" recommendation.
   - Limit: announcement thread. Snippet only.

## YouTube videos

9. "Openfront.io — Ultimate Guide to Clans" (channel video) — https://www.youtube.com/watch?v=tN-U6dN6wP8
   - Accessed 2026-11-25. Player question: how do clans work end to end? Observation: high-level clan overview covering structure, recruitment, and roles; predates v0.36.3 so it cannot document the payout and therefore serves as the version-boundary example.
   - Limit: pre-v0.36.3; no transcript accessible via the fetch path; used for version-gap and recruitment context.

10. "OpenFront.io — Ultimate Guide to Clans and Economy" — https://www.youtube.com/watch?v=qZB_CHmA4Kw
    - Accessed 2026-11-25. Player question: how does clan economy work? Observation: covers currency and pooling; again pre-v0.36.3, reinforcing that the payout is newer than the high-view clan content.
    - Limit: pre-v0.36.3; transcript not directly accessible; used for version-gap and economy framing.

11. "OpenFront Beginner Guide (2026) | How to Win Your First Games" (Lonely_Millennial, ~119K views, Jul 2026) — https://www.youtube.com/watch?v=7J5zwb_s_Cg
    - Accessed 2026-11-25. Player question: the broader economy and late-game mechanics (ports, trade, warships, nukes) that determine how much surplus a clan can afford to pool and pay out. Observation: chapters on building the economy and late-game mechanics give the income context that sets how large a recurring payout is sustainable; post-v0.36.3 in calendar but pre-dates any payout-specific tutorial, so the payout remains an undocumented gap even in current beginner content.
    - Limit: beginner scope; payout not covered; transcript accessed via the description/chapters index.

## Access notes and method

- Reddit direct `.json` and `old.reddit.com/.json` endpoints returned empty / 403 to both a plain curl User-Agent and a browser session (bot-walled); the Reddit content above is recorded from the search-index snippets returned for each URL on 2026-11-25. This is a real limitation: the Reddit observations are snippet-level, not full-thread.
- YouTube pages did not expose inline transcripts through the fetch path; video content is recorded from the description and auto-generated chapters returned in search results on 2026-11-25.
- All rule, number, and version-boundary claims in the guide are pinned to the primary sources (ToS §8.14, the v0.36.3 Release, and the v0.36.3/v0.36.7 tag source). The exact daily-cap and membership-days figures are intentionally not asserted because they are server-side and absent from the open client and the ToS.
