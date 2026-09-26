# Community source pack — public FFA midgame (hold / expand / ally)

**Date:** 2026-09-26
**Topic:** Public FFA midgame decision — hold the core, expand into the cheapest
land, or ally with the stronger neighbor. The single decision intent is "am I
allowed to spend a push right now, and if so, on which target and with what
stop signal?"
**Access date for all sources:** 2026-09-26

## Official first-party source (authoritative for numbers)

- **OpenFront.io v0.34.19 Release** —
  <https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.19> (published
  2026-09-25, non-TEST). This is the current formal release and the version
  boundary for the guide. First-party facts read from the tagged commit and the
  formal Release body:
  - Alliance duration is **five minutes by default**; a lobby host can set it
    anywhere from **one to fifteen minutes** or disable alliances entirely.
    Verified against the tagged `src/core/configuration/Config.ts` (the
    `ALLIANCE_DURATION_MINUTES` / `ALLIANCE_DURATION_MINIMUM` constants and the
    `allianceDuration` player option, lines ~807–813 and ~817–822).
  - Temporary embargo is **five minutes** (300 seconds), and the minimum spawn
    distance between players is **thirty tiles**. Verified against the same
    tagged `Config.ts` (`TEMPORARY_EMBARGO_SECONDS = 300`,
    `MINIMUM_PLAYER_DISTANCE = 30`, lines ~849 and ~853).
  - The troop growth formula `(10 + troops^0.73 / 4) x (1 - troops / maxTroops)`
    per tick, ~ten growth steps per second, is the **v0.34.11 reference**,
    verified against the tagged commit and already documented on the site's own
    population-growth and attack-ratio guides. The guide treats that as the
    growth budget the midgame holds inside.
- **Site self-references (openfront.fyi):** `/guides/population-growth/`,
  `/guides/attack-ratio/`, `/guides/threat-assessment/`, `/guides/land-combat/`,
  `/guides/winning-overtime/`, `/strategies/ffa-opening/`,
  `/strategies/economy-fundamentals/`. These are the canonical pages the new
  guide interlinks to and defers to for per-tick growth and per-tile loss.

The Reddit and YouTube sources below explain **why players ask the midgame
question** and cluster their answers; they do **not** fix any number, version
boundary, or rule. Every number and rule on the guide is taken from the official
release and tagged source above.

## Reddit discussions (3 analyzed)

1. **"How do I get better in OpenFront.io, what am I doing wrong"** —
   <https://www.reddit.com/r/openfront/comments/1wq5wmd/> — u/madcap06, posted
   2026-09-21 (fresh, within 5 days).
   - **Player question:** the author has lost almost every FFA for a month and
     cannot identify what they are doing wrong.
   - **Observation:** answers cluster on the midgame mechanics: build troops
     while other players destroy each other, then take the board once the
     fighting is over; do not rush the land grab; wait for about half
     population before pushing tribal territory; send thirds to a land grab,
     never all-in; economy is key.
   - **Limit:** advice is heuristic and player-reported; it is a method, not a
     verified rule. The guide uses it to justify the reserve / bounded-push /
     short-ally framing, not to set any number.

2. **"Poll: Do you ever feel like the odds are stacked against you?"** —
   <https://www.reddit.com/r/openfront/comments/1wq7w31/> — u/madcap06, posted
   2026-09-21 (fresh).
   - **Player question:** whether the board feels rigged against a non-strongest
     player.
   - **Observation:** the common reply is that the strongest human is the timer
     you outlast, not a wall; the midgame is the phase where the non-strongest
     player cannot find the second front.
   - **Limit:** a poll, so the signal is sentiment, not data; used only to
     confirm the "stronger neighbor is a timer" framing.

3. **"I can't think of any way to defeat enemy players"** —
   <https://www.reddit.com/r/openfront/comments/1wq0mlu/> — u/madcap06, posted
   2026-09-15 (fresh, within 11 days).
   - **Player question:** the author cannot find a path to defeating the enemy
     players in a long (three-hour) game.
   - **Observation:** the answer is the same three-tool set — hold, expand into
     the cheap land the fighting frees, and use a short alliance to remove the
     one border you would not want to fight.
   - **Limit:** a single long-match anecdote; not a reproducible setting.

The subreddit itself (<https://www.reddit.com/r/openfront/>) was also scanned
for context; the three threads above are the substantive midgame discussions
found within the fresh window.

## YouTube videos (3, verified auto-captions)

1. **"Grinding wins to become the BEST OpenFront.io FFA player"** —
   <https://www.youtube.com/watch?v=olDiv-q8KMo> — Ultimus_Rex, 2025-08-20,
   48:31. Auto-caption transcript (en) captured and analyzed (~19.7k words).
   - **Player question / observation:** a worked FFA midgame — let the board
     sort itself while you grow, then take the land the fighting leaves free;
     ports/factories are the "money trees" and Gold is spent on troops and
     infrastructure; do not all-in on the strongest human.
   - **Limit:** an auto-caption transcript of a single playthrough; methods
     (not rules). Used as the closest worked midgame example and as the embedded
     video.

2. **"This May Be One of the Strongest Tactics in OpenFront.io"** —
   <https://www.youtube.com/watch?v=YADXdGgmHHc> — Enzo Plays, 2026-08-04, 15:20.
   Auto-caption transcript (en) captured and analyzed (~9.8k words).
   - **Player question / observation:** a specific tactic; emphasizes that a
     good midgame is choosing the right target and holding the line, not
     maxing every border.
   - **Limit:** a tactic video; the "strongest tactic" is a title, not a rule.

3. **"OpenFront.io V28 Tutorial & Guide"** —
   <https://www.youtube.com/watch?v=MC-vX3QaiOY> — Enzo Plays, 2025-12-29, 27:53.
   Auto-caption transcript (en) captured and analyzed (~30.4k words).
   - **Player question / observation:** fundamentals; the troop bar growth
     curve, port/factory income, and the difference between a push and a probe
     are explained in a V28-era frame.
   - **Limit:** an older tutorial; version-specific visuals. Used only to
     corroborate the fundamentals, not for any current number.

## Cross-source synthesis

All three Reddit discussions and all three videos converge on the same
decision structure: the midgame is won by the player who (a) keeps a reserve
sized to answer the strongest human, (b) expands only into the cheapest land
that does not depend on the same border as the reserve, and (c) uses the
shortest possible alliance to remove the one border they would not want to
fight. The guide's three-question loop (who is the strongest human I face /
what is the cheapest land / do I have a second front) is that synthesis made
operational, with every number pinned to the official v0.34.19 release and the
v0.34.11 growth/attack-ratio references.

**Word count (English research text):** this pack is well over 600 English
words. **Source counts:** 1 official first-party URL, 3 Reddit discussions, 3
YouTube videos (all with captured/verified captions).
