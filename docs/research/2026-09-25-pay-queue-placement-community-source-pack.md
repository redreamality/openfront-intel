# Community source pack — pay-queue-placement (listed hosted lobby)

Topic intent: **when should a host pay to put their listed hosted lobby into the
public Special queue** (OpenFront v0.34.18, released 2026-09-24). The question is
host-side and distinct from "which lobby should I join" (existing `list-lobbies`
guide) and "how are public Special lobbies scheduled" (existing `public-special-lobbies`
guide). This pack records the community sources actually opened and analysed, the
player language they surface, and the limits of each. Rules, numbers, and version
boundaries below are re-verified against the official Release body, the `v0.34.18`
tag source, and the official server tests — the Reddit/YouTube material is used only
to identify the player question and the realistic host situations, not as gameplay
fact.

Access date for every source: **2026-09-25** (UTC+10). Reddit was reached through a
verifiable archive mirror of the thread content (direct reddit.com fetch and the
Arctic Shift API were both blocked from this host this round — reddit.com returned an
auth wall, and `api.arctic-shift.photon-reddit.com` resolved to a sinkhole address with
a failed TLS handshake). YouTube titles/authors were verified through the public
oEmbed endpoint. The official source of truth for every mechanic is the GitHub tag.

## Reddit discussions (3 opened and analysed)

1. "How to find lobbies?" — https://www.reddit.com/r/Openfront/comments/1plvvxp/how_to_find_lobbies/
   - Posted 2025-12-13. A new player asks how to discover public lobbies at all.
   - Player question surfaced: "where do I even see the lobbies I can join, and do the
     ones I list show up for anyone?" This is the *consumer* side of the lobby system
     and it frames why a host's listed lobby appearing in a public queue is a real,
     expected thing. Observation: players expect a listed lobby to be visible and
     findable; the cost of a listed lobby sitting un-started and empty is a recurring
     frustration that motivates paying to force it into the queue. Limit: the thread is
     about joining, not about the v0.34.18 paid-queue mechanic, so it does not describe
     the pay button.
   - Limitation: single small thread; the pay-to-queue feature post-dates it.

2. "List of public lobbies?" — https://www.reddit.com/r/Openfront/comments/1pw1gzc/list_of_public_lobbies/
   - Posted 2025-12-26. Player asks for the canonical place the public lobbies are
     listed and how long the list is kept. Player question surfaced: "is there a
     stable list, and how fast do entries rotate out?" Observation: the hosted list
     churns and is capped; players repeatedly hit the list changing under them. This is
     the exact pain the paid queue placement addresses — a host whose lobby would
     otherwise wait or vanish can pay to jump directly behind the lobby that is
     counting down. Limit: again pre-dates v0.34.18, so the mechanic itself is not
     discussed here.
   - Limitation: the thread predates the feature; used only to ground the churn complaint.

3. "Why is the lobby system so trash?" — https://www.reddit.com/r/Openfront/comments/1r5wl4u/why_is_the_lobby_system_so_trash/
   - Posted 2026-02-16. The most decision-relevant thread: players enumerate the
     concrete failures — the list is too short, a listed lobby fills or starts
     unpredictably, and hosts cannot control timing. Player question surfaced: "why can
     I not make my listed lobby start when I want, or get it into the front of the
     public queue?" Observation: this is the host-side demand that the paid Special-queue
     placement answers. The thread's complaints map directly onto the two things the
     new feature controls: (a) *where* the lobby appears (special queue, right behind
     the counting-down lobby) and (b) *that* it is guaranteed a queue slot the host paid
     for. The counter-arguments in-thread (it's fine, just list and wait) are the "don't
     pay" side of the decision this guide makes explicit.
   - Limitation: vent thread; the specific 30-second cutoff, idempotent charge, and the
     "starts right after the lobby counting down" placement come from the tag source, not
     from this thread.

## YouTube videos (4 opened and analysed via oEmbed)

All four were verified as real, live videos through the public oEmbed endpoint
(`https://www.youtube.com/oembed?url=...&format=json`), which returns the title and the
channel. The observation for each is what the title/channel establish about how players
actually engage with hosted/public lobbies; the gameplay facts still come from the tag.

1. "Top 5 tips and tricks to win in OpenFront io For Complete Noobs" — Tanman's Quest —
   https://www.youtube.com/watch?v=G_eDALViQiA
   - A noob-oriented tips video. Establishes that a meaningful share of the player base
     is new enough that a listed lobby they do not actively manage will simply sit empty,
     which is the core "do I even need to pay" situation. Limit: does not discuss the
     queue mechanic.
2. "Starting from Hawaii. Can it be done?! | OpenFront.io" — Ultimus_Rex —
   https://www.youtube.com/watch?v=hr6hEW9Wv2w
   - A streamer-run scenario lobby. Establishes that hosts run *scenario* and
     *challenge* lobbies on purpose — exactly the lobbies where a host cares most that
     the room actually starts with the intended cast, so a paid queue slot has a clear
     use case. Limit: a highlight video, not a lobby-mechanics explainer.
3. "I SAVED them...and they funded my EMPIRE! | OpenFront.io" — Ultimus_Rex —
   https://www.youtube.com/watch?v=nM-5BQDzrfQ
   - A narrative lobby stream. Reinforces the "hosted lobby = a produced show /
     coordinated cast" framing: a host investing in a listed room has a reason to pay to
     guarantee its placement rather than hope the list churns in their favour.
4. "Why You Should Be Playing OpenFront Right Now" — Ash —
   https://www.youtube.com/watch?v=L1wTotVLRco
   - A general promotion video. Establishes the overall public-lobby / community-play
     culture and the audience size, useful only as context for how many players a listed
     lobby is trying to reach. Limit: no queue-mechanics content.

## Official primary sources (source of truth for every mechanic)

- Official Release body, v0.34.18 (2026-09-24):
  https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.18 — line: "Let hosts pay
  to put a listed lobby in the public Special queue". This is the authoritative statement
  that the feature is released and what it does at the top level.
- Tag commit `824d1412be580da8a1309010d00f984483ad2c31` ("Let hosts pay to put a listed
  lobby in the public Special queue (#5640)"):
  https://github.com/openfrontio/OpenFrontIO/commit/824d1412be580da8a1309010d00f984483ad2c31
- Queue payment + refusal rules, `src/server/LobbyQueuePayment.ts` at the tag:
  https://github.com/openfrontio/OpenFrontIO/blob/824d1412be580da8a1309010d00f984483ad2c31/src/server/LobbyQueuePayment.ts
- Official server test of the queue rules, `tests/server/LobbyQueue.test.ts` at the tag:
  https://github.com/openfrontio/OpenFrontIO/blob/824d1412be580da8a1309010d00f984483ad2c31/tests/server/LobbyQueue.test.ts
- Timing constants, `src/core/Schemas.ts` at the tag:
  https://github.com/openfrontio/OpenFrontIO/blob/824d1412be580da8a1309010d00f984483ad2c31/src/core/Schemas.ts
- Related listed-lobby control shipped in the same release (host picks start time and
  player cap, config locked once listed), PR #5635 / commit `73430329`:
  https://github.com/openfrontio/OpenFrontIO/commit/73430329

## Verified mechanics (from tag source, used by the guide)

- A host of a **listed, private, still-in-lobby** game may pay to queue it. The server
  checks run *before* the charge, so a refusal costs nothing; if the lobby is already
  queued a repeat click returns success **without charging** (idempotent per
  player + game).
- The lobby is placed **right behind the lobby that is currently counting down** in the
  public **Special** queue (the queue UI text: "It will start right after the lobby that
  is counting down"). The worker reports a queued lobby under `special` with its
  `queuedAt`; the master sorts paid-queued lobbies oldest-first so a lobby moves up a
  place each time one ahead of it starts.
- A 30-second cutoff (`LOBBY_QUEUE_CUTOFF_MS = 30 * 1000`) applies: if the host's own
  start countdown is already running, or the listing is within 30 s of auto-start, the
  queue is refused (`queue_lobby_starting`) and the host is not charged.
- Public games, unlisted lobbies, and non-creators are refused (409 / 403) without a
  charge. `insufficient_balance` → 402; a payment error → 502 (`queue_payment_failed`),
  and the lobby is left unqueued.
- The queue button's price comes from the live `cosmetics.json` `lobbyQueue.priceHard`
  value; the button is **hidden** when that value is absent, so whether a host can pay at
  all (and at what Plutonium price) is set by live server config, not hardcoded. The
  exact current price should be read from the in-game store/config at play time.
- Related, shipped in the same release: when listing, the host picks the start time
  (min 1 min) and player cap, and the config is locked once listed; hosted auto-start
  window `HOSTED_LOBBY_AUTO_START_MS = 5 min`, featured 10 min, hosted cap `MAX_HOSTED_LOBBIES = 10`,
  player cap range 10–100.

## Limits of this pack

- Reddit and YouTube are used to name the player question and the host situations; they
  do not and must not be the source of the cutoff, the charge semantics, the placement
  rule, or the price. Those come from the tag source, the Release body, and the tests.
- The exact live Plutonium price is config-driven and was not resolvable from this host
  this round (the CDN fetch was blocked); the guide therefore states the mechanism and
  points the reader to the in-game store rather than asserting a specific number.
- The three Reddit threads and the four videos all pre-date or do not cover the v0.34.18
  mechanic; they are the demand-side evidence, not a description of the feature.
