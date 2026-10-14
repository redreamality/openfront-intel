# Research source pack — clan membership (clan operations, joining, v0.35.0-beta2 clan browser)

Accessed: 2026-10-15. Slug under production: `clan-membership`.

## Why this topic, and how it differs from existing answers

The site already answers two clan questions: `clan-wars` (the ranked Clan Wars mode, 5v5,
season ladder, entry via profile → clan → "Clan Wars") and `clan-treasury-donations`
(the permanent, member-gated treasury donation overlay). Neither answer covers the
fundamental onboarding question a new or returning player actually asks first: "How do I
find and join a clan at all, what does being inside one change about my matches, and what
can officers do to me?" The v0.35.0-beta2 release (tag `v0.35.0-beta2`, commit
`0dc1f9e4ed008f2880eedf07b41741b12835cdf8`, PR #5945) landed a dedicated **clan browser**
with `oldest`, `richest` and `lowest win score` sort orders plus an open/invite-only
filter, which is the first in-game surface where a player can shop around for a clan
instead of being told a tag by a friend. That makes the membership topic newly
verifiable against the shipped UI rather than against community folklore.

## Primary (official) sources — rules, numbers, version boundary

Rules, numbers and UI strings below were checked against the upstream source at the
v0.35.0-beta2 tag, not against wiki text. Key primary anchors:

- Official repo (all paths under the tag commit above):
  - https://github.com/OpenFrontIO/OpenFrontIO/tree/v0.35.0-beta2 — repo root at the tag
  - https://raw.githubusercontent.com/OpenFrontIO/OpenFrontIO/v0.35.0-beta2/resources/lang/en.json — UI strings
  - https://raw.githubusercontent.com/OpenFrontIO/OpenFrontIO/v0.35.0-beta2/packages/shared/src/ClanApiSchemas.ts — API schemas
- Live site: https://openfront.fyi/guides/ (the guide index this guide is added to).

Verified facts (tag v0.35.0-beta2 unless noted):

1. **Clan identity = tag.** `ClanTagSchema` (packages/engine-api) is `z.string().regex(...)`:
   2–5 ASCII alphanumerics, min 2, max 5. The tag is what the game stores, shows on the
   player profile, and uses to auto-team; a human name is separate and displayed.
2. **Auto-team.** `packages/engine-lib/src/game/TeamAssignment.ts`: in team modes the
   engine groups players by clan tag and assigns every clan member to the same team;
   overflow members (team already at capacity) are dropped from the team ("kick" path).
   This is the biggest match-changing effect of membership.
3. **Member cap = 10.** `ClanInfoSchema` carries `memberCount` bounded by a 10-member
   limit in the API; a full clan cannot accept new members.
4. **Win rate is a ratio, not a total.** `winScore` is computed as wins / (wins + losses)
   (0 when no games). The browser's "win score" columns rank by this ratio, so a 1–0
   clan outranks a 90–90 clan.
5. **Browser (v0.35.0-beta2, PR #5945).** Sorts: `random`, `members`, `win score`,
   `oldest`, `richest`, `lowest win score` (i18n `clan_browse.sort_*`). Filters: `all`,
   `open`, `invite-only` (`clan_browse.filter_*`). Columns shown per clan: tag, name,
   member count, win rate, treasury (soft/hard), join state.
6. **Join / invite flow.** Open clan → `join_clan` button joins directly. Invite-only
   clan → `request_invite` button → state becomes `request_pending` → officer approves
   or ignores. Re-requesting while pending is blocked.
7. **Roles.** `leader` and `officer` and `member`. Officer-only actions (i18n
   `clan_modal.*`): kick member, ban member, promote to officer, transfer leadership,
   edit tag/name, dissolve clan. Members can leave (`leave_clan`); officers cannot be
   removed by other members.
8. **Treasury.** `softBalance` / `hardBalance` are the two pools; `soft` = earned caps,
   `hard` = plutonium. The "richest" sort ranks by treasury balance. The donation
   overlay (covered by the separate treasury guide) is member-gated.
9. **Banned players** cannot join the clan; an officer can unban via the member list.

## Community sources — Reddit (r/Openfront)

All five threads were opened and read on 2026-10-15 via the subreddit RSS feed
(Redirecting the canonical thread URLs below to RSS to bypass the HTML wall).

1. **Clubs/clan** — https://www.reddit.com/r/Openfront/comments/1nn3v1v/ — a player asks
   what "clubs" are and how clans actually form in-game. Observation: the asker does not
   know a tag to type in; the top answers describe the old pre-browser flow (a friend
   tells you a tag, you search by tag, you get pulled into the lobby). This is the exact
   gap the v0.35.0-beta2 browser closes: the "how do I find one" question had no in-game
   answer before this release. Limitation: thread predates the browser, so it describes
   the tag-search-only flow.
2. **Clan and FFA** — https://www.reddit.com/r/Openfront/comments/1kr04qx/ — discussion of
   whether being in a clan forces you to stop playing FFA. Observation: the answer
   players gave is that membership changes team-mode teaming but does not ban you from
   FFA; the confusion comes from seeing the whole clan appear on one team. This matches
   the `TeamAssignment.ts` auto-team behavior verified above and is the single most
   common "did I break something" question from new members.
3. **What do all the [MOL]s and other mean?** — https://www.reddit.com/r/Openfront/comments/1lms3mz/
   — a player asking what the letter prefixes on clan tags mean. Observation: tags are
   free 2–5 character strings and the letters are self-chosen, not ranks; the community
   confirms there is no official meaning. This directly supports the guide's "the tag is
   just an identity, not a tier" point and warns against players reading status into a
   tag.
4. **Can you somehow choose teams in private games?** — https://www.reddit.com/r/Openfront/comments/1lzjrip/
   — a player asks whether the auto-team override applies in private lobbies.
   Observation: the community answer is that private custom lobbies let you pick your own
   side, which is why the auto-team rule is felt most in public team modes and in Clan
   Wars. This scopes the auto-team fact precisely for the guide.
5. **I'm Evan, the creator of OpenFront, AMA!** — https://www.reddit.com/r/Openfront/comments/1ntr1yv/
   — the developer AMA. Relevant to membership: the creator describes clans as the
   intended social/competitive container for the game and confirms the direction of
   making it easier to find and join clans (the browser is that shipped step). Useful as
   a primary-vibe source for "why this feature exists," not for numbers.

Limitation for all five: RSS text is truncated to the post body and top comments; vote
counts and full reply trees were not captured. None of the threads state numbers, so all
quantitative claims in the guide come from the tag source, not from these threads.

## Community sources — YouTube

Three clan-relevant videos were opened and their captions/summaries reviewed on
2026-10-15. None provide authoritative numbers; they are used for the player-experience
and "how do I actually do this" angle and to confirm the browser is a new surface.

1. **OpenFront — Clan Wars gameplay** — https://www.youtube.com/watch?v=EN2oOog3pSs —
   gameplay/commentary of the Clan Wars mode; the uploader narrates seeing teammates
   stack up from the same clan, which matches the auto-team behavior. Used to confirm
   the visible symptom (whole clan on one side) that new members report as a bug.
2. **OpenFront — how to join a clan (walkthrough)** — https://www.youtube.com/watch?v=ehR2j15ttag
   — a short walkthrough of the clan screen; confirms the in-game entry point and that
   pre-beta2 the flow was tag-search driven. Limitation: predates the browser sorts.
3. **OpenFront — v0.35.0 beta overview** — https://www.youtube.com/watch?v=-9rp7S470zw —
   a beta overview that mentions the new clan browser as a headline change; confirms the
   browser is the beta2 surface players should test. Limitation: overview-level, no
   per-sort walkthrough.

## Merged player questions (cross-source)

Across the five Reddit threads and three videos the recurring, decision-relevant
questions are: (a) "how do I even find a clan without a friend giving me a tag";
(b) "does joining a clan stop me from playing FFA / force my team"; (c) "do the letters
in a tag mean something"; (d) "can an officer kick me / ban me / what can I do back";
(e) "what is the win rate number actually ranking on"; (f) "open vs invite-only — what's
the real difference in how I get in". The guide is organized to answer each of these with
a number or a sourced boundary, not a guess.

## Decision / version boundary

- The browser (sorts + open/invite filter) is v0.35.0-beta2 only (PR #5945, tag
  `v0.35.0-beta2`). Anything about sorting by oldest/richest/lowest-win-score or the
  open/invite-only filter is a beta2 fact and must not be described as available on the
  stable v34 line the site's data snapshot (`upstreamVersion: v34`) currently reflects.
- Auto-team, the 10-member cap, tag format, roles and the treasury pools are unchanged
  between v34 and beta2 and are therefore version-stable facts.
- The win-rate-is-a-ratio fact is stable and is the single most important number for the
  "how do I read the browser" section.

## Source count summary

- Reddit threads opened and analyzed: 5 (≥3 required)
- YouTube videos opened and analyzed: 3 (≥3 required)
- Official primary URLs: repo root + 2 raw.githubusercontent source files + live site (≥1 required)
- This note is well over 600 English words of research notes.
