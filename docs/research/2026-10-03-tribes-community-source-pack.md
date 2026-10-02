# Community Source Pack: Tribes (neutral Bot AI) — OpenFront

Accessed: 2026-10-03. All candidate URLs pre-checked (HTTP 200) before analysis.
Official first-party: OpenFront source at the pinned v0.34.22 tag (see Official below); the
official openfront.io player page and community wiki `openfront.wiki/Tribes/` were reached
(HTTP 200) and cross-checked for the player-facing tribe description.

## Reddit discussions (≥3, actually opened/analysed)

### R1. "How do I even win a game on Openfront?"
- URL: https://www.reddit.com/r/Openfront/comments/1u2p2np/how_do_i_even_win_a_game_on_openfront/
- Subreddit: r/Openfront. Relative recency: recent (v33/v34 era).
- Player question: beginners repeatedly die early; they do not know which AI to take first.
- Observation: the winning loop is expand through the weak, passive entities (bots/tribes)
  and only commit against Nations when you can delete them outright; the weak entities are
  the safe, repeatable early target because they push small, lose disproportionately, and do
  not build up the way Nations do.
- Limitation: comment thread; numbers are player-reported, not engine values — used only for
  intent and phrasing, every rule/number in the guide comes from the v0.34.22 tag source.

### R2. "Open Front Guide"
- URL: https://www.reddit.com/r/Openfront/comments/1s7r6pj/open_front_guide/
- Subreddit: r/Openfront. Relative recency: recent.
- Player question: consolidated beginner guide request.
- Observation: tribes are the "free" early land source — they spawn in large numbers, hold
  little, and are the intended first annexation targets; Nations are the dangerous late AI.
  Players conflate "bots" (tribes) and "nations" in casual speech, which is the core
  confusion the guide resolves.
- Limitation: self-posted guide, unversioned; used for the naming confusion, not for figures.

### R3. "I can consistently beat AI level Impossible. Am I just good?"
- URL: https://www.reddit.com/r/Openfront/comments/1ohrzg0/i_can_consistently_beat_ai_level_impossible_am_i/
- Subreddit: r/Openfront. Relative recency: recent.
- Player question: is beating Impossible Nations a skill signal or luck?
- Observation: the differentiator is handling the two AI classes separately — the many small
  weak tribes are farmed for land/economy early, while the few strong Nations are the real
  late-game fight. Beating Impossible is largely a function of not overextending against
  Nations, not of fighting tribes (which are the easy part).
- Limitation: single-player anecdote; used to confirm the tribes-vs-Nations split is the
  actual decision boundary players are confused about.

## YouTube videos / verifiable transcripts (≥3, actually analysed)

### Y1. "The ULTIMATE OpenFront.io Tutorial and Strategy Guide!" — Ultimus_Rex
- URL: https://www.youtube.com/watch?v=EdcdsayA_ac
- Length 32:14, ~30.8K views, published 2025-04-28.
- Observation: explicit "Bot Taking" vs "Nation Taking" phase split (08:45 / 09:55). The
  stated rule: "Difference between bots and nations — do not aggro Nations unless you can
  take them out immediately — farm [structures]". Bots/tribes are the safe early farm;
  Nations are only engaged when immediately beatable.
- Limitation: v33-era video; the bot/nation distinction and the farm-first ordering match the
  current tag source, but specific troop numbers are not asserted and are not reused.

### Y2. "OpenFront.io v31 Tutorial" (channel walkthrough)
- URL: https://www.youtube.com/watch?v=IeR36481zsI
- Observation: verbatim: "Right to the right of the name, it says tribe. And tribes are like
  the basic component of … entities in the game that you use to get an initial start to get
  gold. They can't build buildings, they're really weak." Strong players "surround bots in
  order to take them out"; annexation at low ratio (click with a small % and the surrounded
  target disappears). Directly confirms: tribes = weak, non-building, early gold/land source,
  taken by surround/annex.
- Limitation: v31 (pre-v31 tribes were standard strength; v31 weakened them). Used for the
  qualitative behaviour, with the version boundary handled from the v31 changelog + tag.

### Y3. "OpenFront Beginner Guide (2026) | How to Win Your First Games"
- URL: https://www.youtube.com/watch?v=7J5zwb_s_Cg
- Observation: "The other dots are AI, either tribes, which I'll call bots from now on, or
  nations. Don't worry about spawning near bots. In fact, that's exactly what you want. They
  will become your first targets and give you extra land and gold when you conquer them. What
  you do want to avoid is spawning boxed in by several real players." Confirms the spawn
  decision: seek nearby tribes for a soft start, avoid being boxed by humans.
- Limitation: 2026 beginner framing; numbers not asserted, used for the spawn-near-tribes
  decision and the tribe/nation/human triad.

### Y4 (supporting). "How to Dominate the Early Game in OpenFront.io"
- URL: https://www.youtube.com/watch?v=fRP48Dl3Cnw
- Observation: early-game efficiency; spawn quickly into a big pocket of soft (green)
  terrain so the first annexations are cheap. Supports the "farm tribes fast in a soft
  pocket" framing; no hard numbers reused.

### Y5 (supporting). "This Tactic is ESSENTIAL for V28" — Enzo
- URL: https://www.youtube.com/watch?v=xgD7a7TvcZs
- Observation: live annexation play: "we're almost setting up for a nice three-for-
  annexation… around 20K, as soon as either [player] pushes, I'm just going to go for them."
  Illustrates the low-cost surround-then-annex pattern against weak targets.

## Official first-party sources

### O1. OpenFront source, pinned tag v0.34.22 (commit 4e837520) — authoritative
- Repo: https://github.com/OpenFrontIO/OpenFrontIO (pinned release; matches project pin)
- Verified in tag source (this run, read-only):
  - `src/core/execution/SpawnExecution.ts` (~101): a player of `PlayerType.Bot` gets a
    `TribeExecution` attached — tribes are the Bot player type; Nations are `PlayerType.Nation`.
  - `src/core/execution/TribeExecution.ts` (full): `activeDuringSpawnPhase(): false` (inactive
    in spawn phase); on each attack tick it (a) accepts ALL incoming alliance requests and
    accepts alliance extensions when the human has requested renewal (`acceptAllAllianceRequests`),
    (b) deletes one of its own structures per tick (`deleteNextStructure`), (c) attacks. The
    attack is gated by per-tribe `attackRate` 40–80 ticks and a `shouldAttack` gate using
    `triggerRatio` 50–60% and `reserveRatio` 30–40%; its first attack targets Terra Nullius.
    Target selection (`AiAttackBehavior`): `getNeighborTraitorToAttack()` returns only
    *non-friendly* neighbors, so a tribe you are currently allied with is not picked as a
    traitor target while the alliance holds; the eligible roll is `chance(3) = 1-in-4`
    (`chance(odds) = 1/(odds+1)`), then `attackRandomTarget()` shuffles nearby non-friendly
    players (skipping Nations/Humans with a 1-in-3 skip) as a fallback. Key player implication:
    a tribe is passive toward you *while friendly*, but the alliance has a TTL — it auto-
    extends only if *you* request renewal; if you do not renew, it lapses, the tribe becomes
    non-friendly again, and it can then re-target you. Treat the friendly icon as a renewable
    buffer, not a permanent truce.
  - `src/core/configuration/Config.ts`:
    - `attackAmount` (~997): Bot attackers send `troops()/20` (5%); humans/Nations send `troops()/5` (20%).
    - `startManpower` (~1005): Bot starts with exactly `10_000` Troops (Nations 12,500–31,250
      by difficulty; humans 25,000).
    - `maxTroops` (~1035): Bot cap = `maxTroops/3` (roughly 1/3 of a human's cap).
    - `troopIncreaseRate` (~1065): Bot growth `toAdd *= 0.5` (about half the refill rate).
    - `BOT_DEFENDER_LOSS_MULT = 0.7` (~131): when a Human/Nation is the attacker, the defender
      loses `troops() * 0.7` if it loses — i.e. attackers against a Bot take only 70% of a
      normal loss, ~30% fewer losses than fighting a human-sized target.
  - `src/core/Schemas.ts:564`: `bots: zb.uint({ max: 400 })` — up to 400 tribes in a lobby.
  - `src/client/SinglePlayerModal.ts:99`: singleplayer default `bots: 400`.
- This is the single authoritative source for every number, formula, and version boundary in
  the guide.

### O2. OpenFront official player page + community wiki (cross-check, HTTP 200)
- https://openfront.io/ — the player-facing page documents the three AI/player types
  (Human, Nation, Tribe) and notes tribes are the weakest and least likely to ally, matching
  the tag source (note: the wiki phrasing "less likely to ally" is the older default; current
  `TribeExecution` accepts all alliance requests — the guide uses the tag source as truth).
- https://openfront.wiki/Tribes/ — community wiki on the official wiki host; cross-check for
  the player-facing description (weak, non-building early entities).

### O3. Project changelog (version boundary)
- `src/content/changelog/en/v31.mdx`: v31 "Tribes … Standard strength → Weakened" — "Speeds up
  early expansion". Establishes that current (v34) tribes are the weakened variant, so early
  farming is faster than pre-v31.
- `src/content/changelog/en/v33.mdx` / `v34.mdx`: tribe names / classic bot-color settings are
  cosmetic; no change to the weak/annexable behaviour.

## Cross-source synthesis (drives the guide)

1. Two AI classes, one confusion: players say "bots" for both tribes and Nations. The guide's
   job is to separate them: tribes = `PlayerType.Bot` (many, weak, non-building, no spawn
   phase, self-demolishing, always-accepting alliances); Nations = `PlayerType.Nation` (few,
   strong, build Cities/structures, difficulty-scaled).
2. The decision: farms first. Tribes are the safe early land/gold source — spawn near them
   (not near several humans), expand through a soft pocket, annex the weak ones with a low
   ratio/surround, and only engage Nations when you can delete them outright.
3. Numbers from the tag (not community): 10,000 start, cap/3, half refill, 5% attack size,
   0.7 defender-loss multiplier vs human/Nation attackers, up to 400 per game, random
   40–80 tick attack cadence, 50–60% trigger / 30–40% reserve, and a 1-in-4 per-tick roll to
   attack a non-ally (a currently-friend tribe is not targeted while the alliance holds). The
   version boundary: v31 weakened tribes; v34 changes are cosmetic only.
4. Anti-patterns to flag: aggroing Nations before you can delete them; being boxed in by
   humans instead of near tribes; assuming an accepted tribe alliance is permanent (it lapses if you do not renew, after which
   the tribe can re-target you); treating tribe numbers as fixed (all cadence/ratio
   values are per-tribe random ranges).
