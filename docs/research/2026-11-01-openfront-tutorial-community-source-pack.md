# OpenFront beginner / how-to-play — community & official source pack

Date: 2026-11-01 · Slug: `openfront-tutorial` · Automation: openfront content loop

This pack records every source actually analyzed while researching the
"how to play / first match" beginner guide, plus the official first-hand evidence
that every number, rule, and version boundary in the guide traces back to. Reddit
direct access (`.json`, `old.reddit.com`, reader proxy) is bot-walled to this
automation, so the Reddit entries below were analyzed from the search-index body
text (titles plus actual comment bodies) that the search engine returned for each
thread; each is recorded with that access limitation. YouTube sources were
identified from search results and their public chapter lists / descriptions.

## Official first-hand sources (primary)

- Official OpenFront.io site (game, modes, rules of play): https://openfront.io/
- Official OpenFront source repository (formulas, units, structures data):
  https://github.com/openfrontio/OpenFrontIO
- Official OpenFront.io tutorial video (official channel, "OpenFront is a PvP battle
  royale where you build economy forge alliances and launch bombs in order to
  dominate the map"): https://www.youtube.com/watch?v=EN2oOog3pSs (2025-11-22).
  This is the official first-hand how-to-play video used to confirm the core loop
  framing (economy → alliance → bombs → dominate the map).

The guide's numeric facts (troop-growth curve `toAdd = (10 + t^0.73/4) ×
(1 − t/max)` with a peak near ~42% of max; City +250,000 troop cap per level;
Port/City/Factory 125,000 cost; Defense Post 50,000 cost with ×5 magnitude / ×3
speed within 30 tiles; terrain plains 80 / 16.5, highland 100 / 20, mountain 120 /
25; Atom Bomb 750,000 / radius 12/30, Hydrogen Bomb 5,000,000 / radius 80/100, MIRV
25,000,000; alliance 5-minute minimum; betrayal ×0.5 defense / ×0.8 speed for 300
ticks; train revenue 10,000 / 25,000 / 35,000) are grounded in the project's
v34-verified generated data (`src/data/formulas.json`, `structures.json`,
`units.json`) and re-verified locally with a numeric sweep of the growth curve.

## Community — YouTube (search-identified, public chapters/descriptions)

- https://www.youtube.com/watch?v=fKCWgr5_nwo — "How to Play Openfront.io For
  Beginners (Tutorial)" (2025-06-05). Explicit beginner basics: spawn, troops,
  early expansion, attack ratio. Player question: what are the fundamentals needed
  to win a first game.
- https://www.youtube.com/watch?v=8bxcAsJJXJg — "The Ultimate Openfront.io
  Beginner's Guide" (Enzo Plays, 2025-02-23, ~105K views). Public chapters include
  game setup and spawn, mid-game, endgame and victory. Player question: full
  first-match flow from spawn to victory.
- https://www.youtube.com/watch?v=juN62z0QfB4 — "ULTRA COMPLETE OpenFront.io
  Tutorial" (Node, 2025-05-11, ~61K views). Public chapters cover positioning from
  the start, terrain choice and effective expansion, missiles and anti-missiles,
  ports/warships/naval control, economy management, and when to attack. Player
  question: what mechanics actually decide the match.
- https://www.youtube.com/watch?v=9LOx9lFJn6I — "Openfront.io Beginner's Guide:
  Mechanics, Tips, & Tricks" (Enzo Plays, ~66K views). Public chapters include how
  defense posts work (12:16) and how SAMs work (14:19). Player question: how
  defensive structures change a match.
- https://www.youtube.com/watch?v=IeR36481zsI — "OpenFront.io v31 Tutorial"
  (Enzo Plays, ~67K views). Version-specific tutorial used as a version-boundary
  reference (mechanics shift between v25 → v31 → v34).
- https://www.youtube.com/watch?v=Wci8kBDxR80 — "OpenFront.io V25 Tutorial"
  (2025-09-05). Public chapters: Spawn (0:14), Early Game and Troops (3:16), Early
  Infrastructure and Alliances (8:31), Warships (12:54). Player question: the
  concrete early-game sequence.

## Community — Reddit (search-index body; direct access bot-walled)

All threads are from r/Openfront. Direct `.json`/reader access was bot-walled on
2026-11-01, so analysis is from the comment bodies the search engine surfaced.

- https://www.reddit.com/r/Openfront/comments/1lxfi5c/ — "Here's my guide for
  beginners". Top post: select a grassland patch on the edge without many players,
  with access to sea/river; send ~20% of troops right away then set attach ratio
  to ~35%; expand at ~40% checkpoints; when free land runs out, conquer bots by
  encircling them (annex without spending troops), save mountains for last; spend
  gold on cities first, then ports and forts; make the PvE→PvP shift deliberate.
  Access limitation: body read from search index.
- https://www.reddit.com/r/Openfront/comments/1ki04d2/ — "I don't get this game".
  Top comment: take empty terrain first, then bots, then nations, then attack
  players only as a last resort; population growth follows a bell curve peaking at
  ~50% of total population; a basic beginner mistake is dumping the entire starting
  population to expand instantly, which then makes recovery very slow. Access
  limitation: comment body read from search index.
- https://www.reddit.com/r/Openfront/comments/1hr5jfv/ — "Openfront Introduction".
  Terrain matters (capture grasslands/plains faster than mountains); full sending
  during the start is a bad choice because growth depends on current vs max
  population; surround bots/players completely to capture their territory without
  losing troops. Access limitation: comment body read from search index.
- https://www.reddit.com/r/Openfront/comments/1mbgxi0/ — "Best advice for a
  beginner". Be patient, don't rush; finish a conquest or the enemy strikes back;
  treat the game geo-politically; don't attack with 100% of your population because
  it invites the easiest land grab. Access limitation: comment body read from
  search index.
- https://www.reddit.com/r/Openfront/comments/1nh9m9b/ — "How to expand early
  game". No single objectively correct answer; balance growth rate vs grabbing land;
  the game is broken into phases and is all about snowballing; early mistakes are
  very hard to recover from. Access limitation: comment body read from search index.
- https://www.reddit.com/r/Openfront/comments/1lsl68g/ — "Beginners guide: How to
  start playing". Meta-thread where the community corrects wrong numbers in a
  popular site ("terrains buff/debuff numbers off by a few percents", "regen curve
  illustration is wrong") — used as the reason this guide re-verifies every number
  against generated data instead of copying a site. Access limitation: body read
  from search index.

## Observed player questions (merged across sources)

- Where should a first-match spawn go, and why does terrain/plains vs mountains
  matter to early growth?
- How does the population/troop growth curve work, and why is "dumping" your whole
  army early a mistake? (Bell curve / ~42% working level.)
- What is the correct early sequence: empty land → bots → nations → players?
- When do you build cities/ports/factories, and what does a city raise (troop cap)?
- How do defense posts, SAMs, and missiles change the decision to attack?
- How does the plan change between free-for-all and nations-vs-people, small vs
  large boards, and between recent versions?

## Access date

All sources accessed 2026-11-01. Reddit direct access bot-walled (analyzed from
search-index bodies); YouTube identified via search with public chapters/
descriptions; official site, repo, and official tutorial video used as first-hand
anchors; numeric facts grounded in the project's v34-verified generated data and
re-verified locally.
