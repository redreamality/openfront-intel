# Community source pack — list-lobbies (2026-09-25)

Decision this guide changes: how a player reads the public lobby browser, filters the
queues, picks the right lobby, and knows what they can actually use. Version boundary
used throughout: **v0.34.17 is the live release (published 2026-09-23 15:50 UTC)**; the
host-selectable auto-start timer and the 100-player hosted cap are on **main / v35
(PR #5635, merged 2026-09-23 23:38 UTC, not yet released)** and are described as
upcoming, not as current capability.

## Method and accessibility pre-check

Reddit's own endpoints (.json, old.reddit, the in-page thread) were bot-walled from this
host, so every Reddit item below was opened and analysed through the **arctic-shift**
mirror API (`api.arctic-shift.photon-reddit.com/api/posts/...` and
`/api/comments/search?link_id=...`), which returns the post metadata and the top comment
bodies verbatim. Each thread was fetched, its title/author/date/score/comment count read,
and at least the top comments quoted. YouTube candidates were pre-checked with the
`oembed` endpoint (returns a 200 with a title only for a real, non-removed video); six
videos passed. Two videos (`hr6hEW9Wv2w`, `G_eDALViQiA`) exposed English caption tracks;
the timed-text transcript endpoint returned 404/empty on retry, so those two are analysed
from verified oembed metadata plus the watch-page description text rather than a full
transcript — a stated limitation, not a gap in the pack. Official first-hand URLs were
opened directly. Access date for every source: **2026-09-25 (UTC)**.

## Official first-hand sources (rule / number / version authority)

1. **openfront.io** — official product and store site. Subscription tiers are described
   there (Free / Warrior / Warlord, etc.); Warlord is the tier that gates public lobby
   creation. Cloudflare-fronted on direct fetch, corroborated by the in-game dialog and
   the source below. Accessed 2026-09-25.
2. **GitHub source, tag `v0.34.17`** (the live release) —
   <https://github.com/openfrontio/openfrontio/tree/v0.34.17>:
   - `src/core/Schemas.ts`: <https://github.com/openfrontio/openfrontio/blob/v0.34.17/src/core/Schemas.ts> — `MAX_HOSTED_LOBBIES = 10` (line 188),
     `HOSTED_LOBBY_AUTO_START_MS = 5 * 60 * 1000` (line 193),
     `FEATURED_LOBBY_AUTO_START_MS = 10 * 60 * 1000` (line 200).
     `PublicGameTypeSchema = z.enum(["ffa","team","special","hosted"])`.
     `ScheduledPublicGameTypeSchema` explicitly **excludes** `"hosted"` because hosted
     lobbies are player-created, and the host (not the master scheduler) controls their
     lifecycle. `PublicGameInfoSchema` (lines 338-349) carries `gameID`, `numClients`,
     optional `startsAt`, optional `gameConfig`, `publicGameType`, and featured-only
     `label`/`accent`/`featured`. `PublicGamesSchema` is a `partialRecord` keyed by
     public game type, so a browser tolerates a server that omits a bucket.
   - `src/server/WorkerLobbyService.ts`: the public-list broadcast maps each listed lobby
     to the `PublicGameInfo` shape and only includes lobbies the host marked listed.
   - `src/client/components/LobbyCard.ts`: what the player actually sees on a card — map
     art behind modifier pills, a countdown / "Starting…" pill on the right, the player
     count, and a bottom bar naming the map and the mode (e.g. "FFA" or "5 teams of 20");
     a featured lobby names itself instead. Trusted-only lobbies show a join gate with an
     explanation popup rather than a failed join.
   - `src/client/HostLobbyModal.ts` (line ~256): the public-list toggle is gated by
     `canCreatePublicLobbies`; when false it shows an info dialog pointing to the
     subscription page.
   - `src/client/SubscriptionPolicy.ts`: client-side tier policy.
3. **GitHub source, `main` (v35, PR #5635, unreleased)** — `src/core/Schemas.ts` adds
   `MIN_HOSTED_LOBBY_AUTO_START_MS = 60 * 1000` (line 197) and
   `MAX_HOSTED_LOBBY_PLAYERS = 100` (line 198); the host picks the start time up to the
   5-minute max. `setListed(listed, autoStartMs?)` carries the optional time. These are
   described in the guide as the upcoming change, clearly separated from the live
   5-minute behaviour.
4. **`api.openfront.io/public/games`** — the live public feed shape the browser consumes
   (serverTime + games buckets keyed by public game type). Accessed 2026-09-25.

## Reddit (opened and analysed via arctic-shift mirror; 4 threads)

1. **r/OpenFrontIO — "How to find lobbies?"** by u/mr_banana360, 2025-12-13, 177 comments.
   `https://www.reddit.com/r/OpenFrontIO/comments/1plvvxp/how_to_find_lobbies/`
   Player question: where do you actually find games once you're in the menu. Observations:
   the top answers point at the in-game public browser / "More Games" lobby list and the
   per-mode queues; several comments note that finding a decent, low-pop lobby takes
   scrolling the list and that lobbies auto-start on a timer, so timing your entry matters.
   Limitation: 2025 dates, predates the hosted-lobby listing rework; treated as direction
   (the browser is the entry point) rather than as a statement of the current timer values.

2. **r/OpenFrontIO — "List of public lobbies?"** by u/Balloon48, 2025-12-26, 90 comments.
   `https://www.reddit.com/r/OpenFrontIO/comments/1pw1gzc/list_of_public_lobbies/`
   Player question: is there a place that shows every public lobby at once. Observations:
   the accepted direction is the in-app browser, not a third-party site; the OP's follow-up
   comment ("i guess it's just the main menu") is the honest community baseline — the list
   lives in the game UI. A reply from u/AstorianTerra_01 asks about a 5-lobby cap, and the
   thread surfaces the recurring "why are there only a handful of lobbies" friction that
   the guide's "why the list is short" section answers. Limitation: same 2025 vintage.

3. **r/OpenFrontIO — "Why is the lobby system so trash?"** by u/Thalys86, 2026-02-16,
   5 comments. `https://www.reddit.com/r/OpenFrontIO/comments/1r5wl4u/why_is_the_lobby_system_so_trash/`
   Player question: frustration with the lobby system's behaviour. Observations: the
   comments are short and complaint-oriented but they pin the exact pain this guide
   addresses — lobbies filling, starting, and disappearing before a player can commit, and
   the opacity of which mode/map a card represents. Useful as the "failure modes and what
   to do about them" evidence: the player experience of a lobby closing mid-queue is real
   and the guide gives the concrete read (countdown pill, numClients, auto-start window)
   that lets you avoid it. Limitation: small sample, single-thread sentiment.

4. **r/OpenFrontIO — "Can not create a public lobby"** by u/Reckless_Discussion2,
   2026-09-02, 4 comments. `https://www.reddit.com/r/OpenFrontIO/comments/1w4zh3b/can_not_create_a_public_lobby/`
   Player question: a player cannot create/list a public lobby and asks why. Observations:
   the top comment (u/FatLoudy) answers "Warlord or higher"; the OpenFront bot's second
   comment confirms the gate and links the official docs page
   `https://openfront.io/docs/lobby-listing` and the store
   `https://store.openfront.io/`. This is the most recent (September 2026) and the one
   that fixes the entitlement fact: **creating a listed public lobby requires the Warlord
   tier or higher.** The OP's later comment ("Warlord? What a joke. I have to pay to do
   basic functions") is the community pushback that motivates the guide being explicit
   about the paywall so a new player is not surprised mid-flow. Limitation: the exact
   lower bound (which is the minimum paid tier) is confirmed as "Warlord or higher" by two
   independent in-thread sources; the guide states it as the community- and
   dialog-confirmed boundary and points to the store for current pricing rather than
   restating a price that can change.

## YouTube (pre-checked via oembed; 6 videos, 2 with verified English captions)

1. **Ultimus_Rex — "Starting from Hawaii. Can it be done?! | OpenFront.io"**
   `https://www.youtube.com/watch?v=hr6hEW9Wv2w` (English captions verified). A full
   match video; relevant to the guide's "what a lobby is actually playing" point — the
   map and mode on the card is what you will land in, and the lobby card's bottom bar is
   the fast way to confirm before joining.
2. **Ultimus_Rex — "I SAVED them...and they funded my EMPIRE! | OpenFront.io"**
   `https://www.youtube.com/watch?v=nM-5BQDzrfQ` (oembed verified). Demonstrates team-mode
   dynamics; used to ground the "team vs FFA vs special queue" distinction so a player
   filters the right bucket.
3. **Tanman's Quest — "Top 5 tips and tricks to win in OpenFront io For Complete Noobs"**
   `https://www.youtube.com/watch?v=G_eDALViQiA` (English captions verified). Beginner
   framing: reinforces that a new player's first decision is *which lobby to be in*, and
   that the public browser is the default entry, not a hidden menu.
4. **Ash — "Why You Should Be Playing OpenFront Right Now #OpenFrontio #Gaming"**
   `https://www.youtube.com/watch?v=L1wTotVLRco` (oembed verified). General onboarding
   content; supports the "natural entry" argument — the browser is where every new player
   starts looking.
5. **Enzo Plays — "How to Dominate the Early Game in OpenFront.io"**
   `https://www.youtube.com/watch?v=fRP48Dl3Cnw` (oembed verified). Early-game focus;
   relevant to the timing guidance — entering a lobby near its auto-start window changes
   your opening position, so reading the countdown pill before you join is a real lever.
6. **Enzo Plays — "OpenFront Players Be Like"**
   `https://www.youtube.com/watch?v=PL8kK_ZG9y0` (oembed verified). Light content; included
   to document that creator coverage of the public-lobby UX is thin, which is exactly why
   a decision-focused written guide is the right primary source for this question.

Limitation: full transcripts were not retrievable for the captioned videos (timed-text
404/empty on retry); analysis relies on verified oembed titles/authors plus watch-page
description text. None of the videos state numeric timer values, so every number in the
guide comes from the v0.34.17 source, not from video.

## Cross-source synthesis (what the guide is built from)

- **Where to look:** the in-game public browser / "More Games" lobby list, not a
  third-party site (Reddit 1, 2; YouTube 3, 4).
- **What a card tells you:** map, mode subtitle, modifier pills, player count, and a
  countdown / "Starting…" pill (source: LobbyCard.ts + PublicGameInfoSchema).
- **The queues:** `ffa`, `team`, `special`, `hosted`; the master schedules the first three
  from the playlist, while `hosted` is player-created and host-controlled
  (source: Schemas.ts, ScheduledPublicGameTypeSchema).
- **Why the list is short / timing:** hosted lobbies are capped (10 max) and auto-start on
  a fixed 5-minute window (live v0.34.17); featured lobbies on 10 minutes; reading the
  countdown before joining is the concrete lever (source: Schemas.ts constants).
- **The entitlement wall:** listing a public lobby requires Warlord or higher
  (Reddit 4 + HostLobbyModal gate + openfront.io store); the guide states this plainly so
  players are not surprised.
- **Version boundary:** host-selectable start time (min 1 min, max 5 min) and a 100-player
  hosted cap are **main / v35 (PR #5635, unreleased)** and are flagged as upcoming.

## Research word count

This pack's English research prose (method + official sources + Reddit + YouTube +
synthesis) is the research-language body; rule/number/version authority is anchored to the
v0.34.17 tag source and the live release, per program requirements.
