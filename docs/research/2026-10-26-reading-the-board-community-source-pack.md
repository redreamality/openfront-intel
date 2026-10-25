# Community source pack — reading the board (opponent information)

Accessed 2026-10-26. All rules, numbers, and version boundaries below were re-verified against the official
`openfrontio/OpenFrontIO` source at tag `v0.35.4` and the official first-party pages; community sources are used
only to establish the *player intent* (what question they are asking and why it changes their decision), never
for game facts. Reddit was bot-walled to direct fetch on 2026-10-26, so thread content was captured verbatim from
search-index excerpts of the real threads; each excerpt was checked for a quoted player comment before citation.

## First-party / official sources (used for facts)

- `https://openfront.io/` — official game site, in-game help text. Confirms the per-entity info display "shows the
  player type (Human, Nation, or Tribe), a Nation's attitude toward you (Hostile to Friendly), defending troops, gold,
  and the number of Warships and buildings they have"; the **Attacking Troops Overlay** setting ("Show attacker vs
  defender troop counts on active front lines"); the **Gold** control-panel element ("the amount of gold you have and
  the rate at which you gain it"); and the 25% retreat cost ("You can retreat troops by clicking the red X button. This
  will cost the lives of 25% of your attacking troops."). Captured 2026-10-26 via search index (site timed out to
  direct fetch from the automation host; `openfront.dev`, the official experimental host, returned HTTP 200).
- `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.4` — latest non-TEST, non-prerelease Release; the
  version boundary for every fact in this guide. Verified via GitHub API (`draft=false`, `prerelease=false`).
- `v0.35.4` tag source: `src/client/hud/layers/PlayerInfoOverlay.ts` (info panel fields: gold box, troop bar with
  green total / orange attacking overlay / right-aligned max cap; player type; alliance and traitor states with
  countdowns; `attackingTroops` computed at lines 519–540); `packages/engine-lib/src/configuration/Config.ts`
  (troop-cap formula `2 * (numTilesOwned^0.6 * 1000 + 50000) + cityTroops` at line 346); `src/client/components/
  baseComponents/ranking/` (Game Info modal sort list: TotalGold, StolenGold, NavalTrade, ConqueredGold, Lifetime).
- `https://openfront.miraheze.org/wiki/Gold` and `.../wiki/Troops` — official team-maintained wiki (linked from the
  official site): gold rate window, troop-cap dependency on territory and city levels, and that bots gain at half the
  human rate. HTTP 200 verified 2026-10-26.

## Reddit (player intent; ≥3 distinct threads, real URLs)

1. `https://www.reddit.com/r/Openfront/comments/1ko9k8e/how_does_everyone_builds_their_army_faster_at_the` —
   "how does everyone build their army faster at the start of the game". Players explain the troop growth curve and
   the colored `(+troops)` gain indicator ("Notice how the (+troops) changes colour and is bigger the more troops you
   have?"). Intent: understanding the growth number players watch every second — the same signal this guide teaches
   to read on *opponents*.
2. `https://www.reddit.com/r/Openfront/comments/1noo8jb/i_actually_read_the_source_code_and_will_explain` —
   "I actually read the source code and will explain how attacks work". High-intent signal that a meaningful share of
   the player base reaches for the *source code* to understand what is visible and how it works — i.e. the
   information model is not intuitive from play alone.
3. `https://www.reddit.com/r/Openfront/comments/1qwiace/help_me_to_understand_how_to_win` — "Help me to understand
   how to win". Recurring advice: "Dont over attack", "pick a segregated area", "how to work your alliances" and
   reading opponents' positions — the decision context (when to commit) that better information changes.
4. `https://www.reddit.com/r/Openfront/comments/1olmuld/its_all_based_on_luck` — "It's all based on luck". The top
   replies push back with "You need to keep your troop counts high as often as possible so when that luck factor
   strikes you can take advantage" — i.e. the meta is about maintaining a reading advantage and troop posture rather
   than luck.
5. `https://www.reddit.com/r/Openfront/comments/1lxfi5c/heres_my_guide_for_beginners_whats_missing_tried` — a
   community beginner guide; notes "Only attack when you have an advantage like when they're busy with another war,
   too expanded" — the advantage is judged by *reading* the opponent's committed state.

Player question consolidated across threads: *how do I know what an opponent can do right now, and what is actually
visible to me about them?* The recurring frustration is that the visible numbers (gold, troop bar, gain color) are
present but not *decoded* — players see the raw values and do not know what they imply about attack timing, growth,
or vulnerability.

## YouTube (≥3 videos, verifiable subtitles/transcripts; all IDs confirmed to resolve via oembed 2026-10-26)

1. `https://www.youtube.com/watch?v=IeR36481zsI` — "OpenFront.io v31 Tutorial" (Enzo Plays). Transcript explicitly
   teaches reading an opponent via the info panel: "if you hover over another nation like Russia, you can see that
   their max troops is 265K, but they're actually only at 33K. So, they're sending out a lot of troops. That means
   their growth isn't that good." Also: growth caps ~41% of max population; the orange number "goes to green when your
   growth is increasing... when you start to get down on the bottom side of the growth curve, it goes to orange";
   pushes cap at 2× attackers over defenders; traitor (broken shield) = massive defense debuff ~30s; alliances ~5 min.
   **This is the single strongest corroboration of the exact reading this guide formalizes.**
2. `https://www.youtube.com/watch?v=fRP48Dl3Cnw` — "How to Dominate the Early Game in OpenFront.io" (Enzo Plays).
   Growth curve "peaks out around 41% of your population"; "if you look around, you can often see that different bots
   send out attacks at different points in time. And when they send out an attack, they are much more vulnerable to
   your own pushes" — reading the committed state to find soft targets.
3. `https://www.youtube.com/watch?v=EdcdsayA_ac` — "The ULTIMATE OpenFront.io Tutorial and Strategy Guide!"
   (Ultimus_Rex). "Keep your troops high to prevent people from beating you up" — posture as a public signal; endgame
   reads (who can afford MIRVs) come from reading each player's territory and economy.
4. `https://www.youtube.com/watch?v=iZQDOuTVcLY` — "OpenFront.io V27 Complete Guide" (Enzo Plays) — early/mid/late
   factor walkthroughs; used for version-history context (the info panel has been stable across these versions).
5. `https://www.youtube.com/watch?v=7J5zwb_s_Cg` — "OpenFront Beginner Guide (2026) | How to Win Your First Games"
   (Lonely_Millennial) — 2026-dated, confirms the information model is unchanged for current players.

## What changes a player's decision (consolidated)

- The gold box and its rate tell you an opponent's *economic posture* (building up vs spending) and roughly how
  close they are to a big build (city / warship / nuke) — so you can time an attack before they commit gold.
- The troop bar's green total vs the orange committed portion vs the right-aligned max cap tell you the opponent's
  *reserve depth* and where they sit on the growth curve (41% = fastest growth; near-cap or near-zero = slower).
- Hovering an enemy and seeing a low total against a high cap (the 265K/33K example) signals they have *committed*
  most of their troops to an active push and are growing slowly — a concrete timing window.
- The default-on Attacking Troops Overlay turns every frontline into a live attacker-vs-defender number, letting you
  read the push-speed advantage (2× threshold) without estimating.
- The Game Info modal's sort list (StolenGold, ConqueredGold, NavalTrade) surfaces who has been raided or is trading,
  i.e. who is weakened or who has a trade line you can pressure.
- Failure modes the community hits: misreading a high displayed total as "safe to attack now" when the growth rate is
  actually slow; ignoring the gain-color (orange = low on the curve) and pushing into a regenerating opponent; and
  missing the traitor / broken-shield window that makes an attack far cheaper.
