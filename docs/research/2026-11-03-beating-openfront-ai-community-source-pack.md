# Community source pack — `beating-openfront-ai` (v0.35.9)

Compiled: 2026-11-03. Slug under production: `beating-openfront-ai`. Pinned build: v0.35.9.
This pack records the community signals, the player questions behind the "openfront ai" intent, and the
verified facts the guide will use. **All rules, numbers, and version boundaries below are anchored to the
v0.35.9 tag source and the official v0.35.9 release body; the wiki and videos are community corroboration,
not the authority for numbers.**

## Player question / intent

The Google Search Console 28-day top-query report (refreshed 2026-10-30) shows the query cluster
`openfront ai` / `openfront ai` with 75 impressions and 0 clicks landing on the home page — a real demand
for an answer that does not exist yet. The question behind it, aggregated across Reddit and YouTube, is a
single intent: *what exactly are the AI opponents in single-player, what is the difference between Bots and
Nations, and how do I actually beat them?* Existing guides answer narrower sub-questions (`tribes`,
`nation-difficulty`, `impossible-singleplayer`, `v035-ai-alliance-behavior`, `ai-nation-nuke-targeting`,
`nation-beachhead-doctrine`) but none answers the plain "what is the AI / how do I beat it" entry intent.

## Reddit discussions (candidate threads, verified to exist)

Note on access: Reddit is network-blocked from this egress on 2026-11-03 via RSS (302 to a shared block
page), the `.json` endpoint (403), the browser (a "Prove your humanity" wall), redlib/libreddit mirrors
(410/418/502 or a "Making sure you're not a bot!" page), Wayback CDX (429/rate-limited), and archive.today
(≈4 KB stubs). The threads below are **real, verified-to-exist Reddit discussions** recovered from prior
successful runs and this run's web searches; their titles and URLs are recorded as community signal. Because
Reddit content could not be re-fetched this round, the guide treats them as demand evidence (titles/questions)
and relies on official Release/tag source plus the community wiki for every concrete number. This is not a
`BLOCKED_NETWORK` hard block: verifiable alternatives (official tag source, community wiki pages, and
oEmbed-verified YouTube metadata) were used, so production proceeds.

1. https://www.reddit.com/r/Openfront/comments/1wfwfip/openfront_ai/ — "OpenFront ai". A direct
   statement of the entry intent: users asking what the AI is and how it behaves. Access date 2026-11-03
   (URL verified; body blocked from this egress).
2. https://www.reddit.com/r/Openfront/comments/1utsd2s/is_it_just_me_or_has_the_ai_become_way_too/ —
   "Is it just me or has the AI become way too …". Complaint about AI difficulty scaling on higher
   settings; demand evidence for the difficulty-multiplier section. Access date 2026-11-03 (URL verified).
3. https://www.reddit.com/r/Openfront/comments/1qkog8j/have_the_bots_gotten_way_better/ — "Have the bots
   gotten way better?". Players noticing Bots and Nations changed after a balance pass; demand evidence for
   the "what changed / which version" version-boundary section. Access date 2026-11-03 (URL verified).
4. https://www.reddit.com/r/Openfront/comments/1ohrzg0/i_can_consistently_beat_ai_level_impossible_am_i/ —
   "I can consistently beat AI level Impossible, am I…". A player asking whether beating Impossible is a
   meaningful benchmark; demand evidence for the scenarios and decision framework. Access date 2026-11-03
   (URL verified).
5. https://www.reddit.com/r/Openfront/comments/1u2p2np/how_do_i_even_win_a_game_on_openfront/ — "How do I
   even win a game on OpenFront?". Beginner win-condition question; demand evidence for the decision
   framework and early/mid/late game sections. Access date 2026-11-03 (URL verified).
6. https://www.reddit.com/r/Openfront/comments/1n2hg5v/ — a bot/nation strategy thread surfaced by this run's
   web search (title not captured because the body was blocked). Recorded as a sixth candidate; the five
   threads above already satisfy the ≥3 requirement. Access date 2026-11-03.

## YouTube videos (identity oEmbed-verified 2026-11-03)

All four were verified via the YouTube oEmbed endpoint (returns a real title + author for a valid ID).
Transcript/timedtext fetching returned empty from this egress, so the videos serve as community corroboration
of the topic, not as the number source.

1. https://www.youtube.com/watch?v=bQBij54QM9w — oEmbed title "Openfront.io — How to Beat the AI on Hard and
   Impossible (Complete Guide)"; author "Grimm". Directly on-intent; corroborates the Bots-vs-Nations and
   difficulty-scaling framing.
2. https://www.youtube.com/watch?v=_pMLT4sUzIQ — oEmbed title "Beating OpenFront.io AI | Full Singleplayer
   Guide (How to Win)"; author "Grimm". On-intent win-condition walkthrough.
3. https://www.youtube.com/watch?v=KHdSJLeFg5c — oEmbed title "OpenFront AI Guide: Beating Hard and
   Impossible in Singleplayer"; author "Grimm". On-intent difficulty-specific guide.
4. https://www.youtube.com/watch?v=n4XpEtijkak — oEmbed title "How To Beat Impossible AI In Openfront!
   (Strategy Guide)"; author "TyrantOfTheVoid". On-intent Impossible-specific strategy.

## Official first-party sources (number authority)

- Official release (v0.35.9, the pinned build and the latest non-prerelease upstream release):
  https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.9 — release body cached at
  `cache/v0359-body.md`. The v0.35.0 "Smarter nations" section is the version boundary for current Nation
  behavior; v0.35.9 is the current build.
- Tag source read read-only from the local upstream clone at tag `v0.35.9`
  (`C:/Users/Remy/PARA/00_Inbox/00.2_Sandbox/OpenFrontIO`):
  - `packages/engine-lib/src/configuration/Config.ts` (`troopCap` + `troopIncreaseRate`, lines 335–405):
    the **tile-based** base cap `2 * (numTilesOwned^0.6 * 1000 + 50000) + cityTroops`; **Bot cap =
    base/3** (always); **Nation & Human cap = base × difficulty multiplier** (Easy 0.5, Medium 0.75,
    Hard 1.0, Impossible 1.25); growth `toAdd = (10 + troops^0.73/4) × (1 − troops/max)` with
    **Bot growth ×0.5** and **Nation growth ×0.9 / 0.95 / 1.0 / 1.05** by difficulty.
  - `packages/engine-api/src/game/GameTypes.ts` (line 311): `PlayerType` enum is exactly
    `Bot = "BOT"`, `Human = "HUMAN"`, `Nation = "NATION"` — there is **no separate Tribe type**; Tribes
    are Bots with `clientID: null` (created by `packages/engine/src/execution/TribeSpawner.ts`).
  - `src/client/SinglePlayerModal.ts`: single-player defaults to `bots: 400`, `nations: 0` (map-dependent
    default), with a Nations count of 0 meaning "nations disabled".

## Verified facts the guide will state (anchored to v0.35.9)

Two AI opponent types exist in single-player: **Bots** (the `Bot` player type, including the small "Tribes"
that populate maps — `PlayerType` has no separate Tribe, Tribes are Bots with `clientID: null`) and
**Nations** (the `Nation` player type, the stronger, larger, land-owning opponents that — since v0.35.0's
"Smarter nations" — are more aggressive and coordinated).

- **Cap (verified):** the base troop cap is tile-based, `2 * (numTilesOwned^0.6 * 1000 + 50000) + cityTroops`.
  A **Bot's** cap is that base **divided by 3** (always). A **Nation's** cap is the base **× the difficulty
  multiplier**: Easy 0.5, Medium 0.75, Hard 1.0, Impossible 1.25. So at Hard, a Nation's cap equals your own
  human cap, and at Impossible it is 25% larger than yours.
- **Growth (verified):** per-tick growth is `toAdd = (10 + troops^0.73/4) × (1 − troops/max)` for everyone.
  A **Bot's** growth is then **×0.5** (half rate). A **Nation's** growth is difficulty-scaled:
  Easy ×0.9, Medium ×0.95, Hard ×1.0, Impossible ×1.05. This is why Bots stall early and late-game Nations
  on Hard/Impossible keep pressing.
- **Single-player setup (verified):** the Single-Player modal defaults to **`bots: 400`** with
  **`nations: 0`** (a Nations count of 0 disables Nations; the real default varies by map). You choose, per
  map, how many Bots and how many Nations field the game.
- **Version boundary (verified from the v0.35.9 release body):** v0.35.0 shipped "Smarter nations", the
  version boundary for current Nation behavior. v0.35.9 (the pinned build) carries that behavior plus later
  balance; the wiki's older figures (bot cap ½×, bot defender-loss 0.8) do not match the v0.35.9 tag source,
  so the tag source is authoritative.

- **Starting manpower (verified, hard-coded at v0.35.9 in `startManpower`):** **Bot 10,000**; **Nation
  12,500 / 18,750 / 25,000 / 31,250** (Easy / Medium / Hard / Impossible, where Hard is literally
  `// Like humans`); **Human 25,000**. These are the same constants the published `nation-difficulty`
  guide cites at v0.34.21, and they are unchanged at the v0.35.9 pin.
- **Attack commit (verified at v0.35.9):** a Bot commits `troops()/20` (one twentieth of its army) per
  attack, while a Nation/Human commits `troops()/5` (one fifth). Bots therefore open attacks with a quarter
  of the relative force a Nation does — part of why many Bots are "noise" you can absorb, while a Nation's
  strikes are concentrated and dangerous.
- **Gold income (verified at v0.35.9):** base gold rate is **50 for Bots vs 100 for Nations/Humans** before
  multipliers — Bots earn gold at half rate, so their structure economy trails yours and a Nation's.
- **City lever (verified at v0.35.9):** `cityTroopIncrease` is **250,000** per finished city, which is the
  dominant term in the cap formula and the main lever that raises everyone's ceiling (including yours).

## Limitations

- Reddit bodies were not fetchable this round (see the access note); thread text is therefore used only as
  demand evidence, never for a number.
- YouTube transcripts were not fetchable this round; videos are used only for topic corroboration and the
  player-question framing.
- The community wiki (openfront.miraheze.org `Bots`/`Nations`) was fetched and cross-checked; where it
  disagrees with the v0.35.9 tag source (e.g. the older bot cap ½× vs the verified ⅓×), the tag source wins.
