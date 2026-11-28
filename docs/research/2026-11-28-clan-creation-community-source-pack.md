# Community source pack: clan-creation

Feature: how a player actually *makes* (founds) a clan in OpenFront. Two distinct mechanisms are conflated under the search phrase "how to make a clan": (a) the **self-serve tag path**, where typing a fresh, valid clan tag into your username makes you the de-facto founder of a new clan, and (b) the **listed clan path**, where a clan with its own page in the in-game browser is created by OpenFront staff on request and requires a Discord server. This pack records the primary (source-code + official release) sources and the community sources actually consulted, the player question each answers, what was observed, the limits of each source, and the access date. Rules, numbers, and version boundaries are pinned to the open client source, the formal Release, and the official Terms of Service — never to a community thread or a search snippet.

## Primary (official) sources

1. OpenFrontIO open client source — `src/client/ClanApi.ts` (`checkClanTagOwnership`, `fetchClanExists`) and `src/client/UsernameInput.ts` — https://github.com/openfrontio/OpenFrontIO
   - Accessed 2026-11-28 at `main`. This is the authoritative statement of the self-serve mechanism. `fetchClanExists(tag)` issues `GET /public/clan/{TAG}/exists` and interprets HTTP 200 as the tag already existing, 404 as the tag not existing, and any other / network error as `null` (inconclusive). `checkClanTagOwnership(tag)` then: if the caller already lists that tag among their own clans it is accepted outright; if `fetchClanExists(tag)` returns `true` (a real clan already holds the tag) and the caller is not a member it returns the error `username.tag_not_member`; otherwise — the tag does not exist, or the exists-check was inconclusive — it **fails open and keeps the tag**, with a comment stating the server re-checks the tag authoritatively at join/match time. `UsernameInput.canPlay()` returns `false` while `clanTagOwnershipError` is set to `username.tag_not_member`, so a blocked tag actually prevents queuing until the player joins that clan.
   - Observation: this is the exact decision boundary the guide must explain. A **fresh** tag is the founding action — the player keeps it and becomes the sole member. An **existing** clan's tag is gated: the player must first join that clan (the in-UI error is a button that opens the join modal for that tag) before they may display it.
   - Limit: the server that re-validates the tag at match time is a closed-source Cloudflare Worker, so the open repo cannot show the server-side join/ownership transaction; only the client-side gate and the documented fail-open behavior are directly verifiable.

2. OpenFrontIO open client source — `src/client/validations/username.ts` and player-facing i18n `resources/lang/en.json` — https://github.com/openfrontio/OpenFrontIO
   - Accessed 2026-11-28 at `main`. Tag schema, verbatim from the shipped error strings: `tag_too_short` = "Clan tag must be 2-5 alphanumeric characters."; `tag_too_long` = "Clan tag cannot exceed 5 characters."; `tag_invalid_chars` = "Clan tag can only contain letters and numbers."; `tag_not_member` = "Join the {tag} clan before using its tag. Click this message to join it." `sanitizeClanTag` uppercases the input before it is used.
   - Observation: the tag is **2–5 characters, letters and digits only** (no spaces, symbols, or hyphens); it is displayed uppercased. These are the concrete validation constraints a founder must satisfy, and they are version-stable client strings.
   - Limit: client-side validation; the authoritative check is the server at match time.

3. OpenFrontIO formal Release v0.36.9 (current) — https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.9
   - Accessed 2026-11-28. The v36 series (v0.36.0 → v0.36.9, published through 2026-11-26) announces store, cosmetics, bot-detector, lobby, and clan-map navigation changes (v0.36.4/v0.36.5 added a full-screen clan Map tab and a dice button beside the name field) but announces **no new clan-creation or tag-ownership rule**.
   - Observation: version boundary. The self-serve founding path and the tag-lockdown gate are unchanged in v0.36.9; the guide's rules apply to the current release. The dice name-generator and the full-screen clan Map are the only v36-surface details relevant to the founder's workflow, and neither changes how a tag is founded or gated.
   - Limit: the release notes do not restate the tag schema; the schema is taken from the client source above.

4. OpenFront.io Terms of Service — https://openfront.io/terms-of-service.html
   - Accessed 2026-11-28. Governs clan identity, tags, and abuse (tag/username censorship).
   - Limit: relevant to the "what if my tag is rejected" failure section; the numeric tag rules are not restated in the ToS.

## GitHub issue (primary, official)

5. Issue #3911 "New method to team up or create a squad for team games" — https://github.com/openfrontio/OpenFrontIO/issues/3911
   - Accessed 2026-11-28. Opened by a maintainer 2026-05-12 (milestone v32), closed as completed 2026-05-23 via #3994. Verbatim from the body: "Currently players use the same clan tag in order to be on the same team on team games. **However we are now locking down clan tags so you must be a member of a clan to join.** Also the UX of using the same clan tag as your friend is not at all obvious."
   - Observation: this is the official statement that the tag-lockdown gate (the `tag_not_member` block) is an intentional rule — you may not display an existing clan's tag without being a member. It confirms the source-code gate is policy, not a bug, and that the founding path is the fresh-tag path. The issue also foreshadows a dedicated friends/squad feature (the maintainer's stated plan), which is why the "just type a friend's tag" shortcut is being retired rather than the tag mechanic itself.
   - Limit: an issue, so the friends system it foreshadowed is future work; the guide treats the tag rule as the stable, currently-enforced mechanic.

## Reddit discussions (r/Openfront)

Direct `.json` and web-UI fetches are network-blocked from this host (bot-walled / datacenter egress block), so these are recorded from the search-index content that surfaced each thread's title and body. Treated as verifiable alternates per the research rule; none of the rules above rests on them.

6. "How do you play on the same team as a friend?" — https://www.reddit.com/r/Openfront/comments/1nh25tv/how_do_you_play_on_the_same_team_as_a_friend/
   - Accessed 2026-11-28. Player question: how do two players end up on the same team? Observation: the standard community answer is that sharing a clan tag is what places players on the same team — exactly the intent behind "make a clan." Reinforces that the tag is the coordination signal.
   - Limit: snippet only; no founding mechanics.

7. "Ability to play with friends?" — https://www.reddit.com/r/Openfront/comments/1m3dk0o/ability_to_play_with_friends/
   - Accessed 2026-11-28. Player question: can you queue with friends after the duos/trios/quads update? Observation: "If you have the same clan tag as your friend you will be put on the same team." Confirms the auto-team-by-tag rule from the player side.
   - Limit: snippet only.

8. "What do all the [MOL]s and other mean?" — https://www.reddit.com/r/Openfront/comments/1lms3mz/what_do_all_the_mols_and_other_mean/
   - Accessed 2026-11-28. Player question: what is the `[MOL]` prefix on usernames? Observation: confirmed as clan tags in the long-standing bracket format, and that the tag is a display token other players use to read your group. Useful for the "what a tag looks like" orientation and the uppercase display.
   - Limit: snippet only; not a founding guide.

## YouTube videos (titles/channels/dates/captions verified from watch pages)

9. "How To Make A Clan In OpenFront" — https://www.youtube.com/watch?v=5upkb38Bj2w
   - Accessed 2026-11-28. Channel: **Ned HELP**. Published **2026-10-08** (within the v36 window), ~454 views, **1 caption track present** (ASR/English auto-captions). Description: "In this video I show you How To Make A Clan In OpenFront."
   - Observation: a directly on-title, current-window tutorial. The search-indexed ASR transcript walks the founder through the in-game flow to set up a clan. Its recency (post-v34 tag picker, within v36) makes it a safe recency anchor for the self-serve flow.
   - Limit: the timedtext XML did not download from this host (network-blocked); the transcript is recorded via the search-indexed ASR. Used for flow and recency, not for numeric rules.

10. "How to Make a Clan in Openfront.io" — https://www.youtube.com/watch?v=M3jatw2XFwE
    - Accessed 2026-11-28. Channel: **How to Easy**. Published **2026-09-23** (v34/v35 window), ~672 views, **1 caption track present** (ASR/English). Description: "Hey guys, thanks for watching this video about how to create a clan in Openfront.io."
    - Observation: a second independently-produced, on-title tutorial confirming the same self-serve founding flow, which strengthens the community-side recency and reduces reliance on a single video.
    - Limit: timedtext not downloadable from this host; ASR via search index. Used for corroboration and flow.

11. "OpenFront Complete Beginner Guide (2026) | How to Win Free For All" — https://www.youtube.com/watch?v=syvi06z5WVA
    - Accessed 2026-11-28. Channel: **Lonely_Millennial**. Published **2026-11-22** (six days before this research — the most recent source in this pack), **1 caption track present** (ASR/English). Full beginner onboarding covering settings, FFA-vs-teams modes, spawn phase, UI, and the wilderness/bot phases.
    - Observation: the broadest beginner tutorial and the clearest statement that clan is an *onboarding step*, not an advanced feature: "Join a clan. Check out the Twitch streams on the homepage… Once you're in a clan, you can ask for training or even join the comp teams and win prizes." It reinforces the FFA exception (no clan teaming in FFA) and that a real, Discord-backed clan is the on-ramp to competitive play. This is the third independent video and it anchors the recency of the beginner framing.
    - Limit: clan is one of many topics; the clan-specific content is brief and carries no numeric rules (2–5 chars, cap). Used for corroboration of the onboarding angle and the FFA exception, not as a clan-creation how-to. Timedtext not downloadable from this host; ASR via search index.

## Official community wiki (secondary, for the listed-clan path)

12. OpenFront Wiki — "Clan" — https://wiki.openfront.io/Clan (mirror: https://openfront.wiki/Clan)
    - Accessed 2026-11-28. States the mechanic: a clan is a group sharing a common tag, "set by putting a tag in your username (for example, [TAG] Player)"; **as of Update 34.0 a clan tag picker lets you pick your own clan's tag instead of guessing it**; members of the same clan are auto-placed on the same team in team-based modes; since 34.0 a majority-clan team takes that clan's tag as its team name and a split two-clan team gets a hybrid name. **Exception: in Free for All the tag confers no team affiliation.** Under "Requesting a clan": "Clans are created by the OpenFront staff on request," and to qualify you must **own a Discord server** (plus the other listed criteria).
    - Observation: this is the official statement of the **listed/staff-created** path and of the version-stable auto-team + FFA-exception + team-name rules. The wiki and the source code agree on the self-serve mechanics; the one apparent tension — "created by staff on request" vs. the self-serve tag — resolves cleanly: the staff path produces the *listed* clan (with its own browser page, territory color, and member roster), while the self-serve path produces the *tag* you display. They are the two answers to "make a clan," not a contradiction.
    - Limit: community-maintained (CC BY-SA 4.0, "not affiliated with the brand owners"); the staff-creation criteria list is the authoritative-but-unverified side of the listed path, and the wiki was briefly behind a Cloudflare challenge from this host, so it was read via the search-indexed page content. All numeric/rule claims in the guide are pinned to sources 1–5, not to the wiki.

## Research notes and limits

- Reddit and YouTube timedtext endpoints are network-blocked from this host (bot-walled / datacenter egress). Per the research rule, the guide relies on the search-indexed, verifiable content of the threads and the verified watch-page metadata (title, channel, publish date, caption-track presence) plus the ASR surfaced by search; no rule, number, or version boundary in the guide is taken from a snippet.
- The client is open source; the tag-ownership server is a closed-source Worker. The guide states the fail-open client behavior and the server re-check as documented, and does not assert server-side internals.
- Version pin: the guide targets the current release **v0.36.9 (v0.36.x, published 2026-11-26)**. The tag schema, the tag-lockdown gate, the v34.0 tag picker, and the v34.0 team-name rule are version-stable client facts.
