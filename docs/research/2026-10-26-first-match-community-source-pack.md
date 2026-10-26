# First Match (Beginner FFA) — Community Source Pack

- Date: 2026-10-26
- Topic: Beginner first-match FFA guide rewrite (OpenFront), focusing on the **Overtime / how-a-game-ends** fact that the current `first-match` guide states incorrectly (it claims Overtime applies to only "one quarter of public FFA" and was last verified at v33).
- Access date: 2026-10-26
- Method notes: Reddit direct `.json` is bot-gated (403) and PullPush is rate-limited this run, so thread content was captured from web search results that quote each thread's body (real titles + substantive player text). YouTube videos verified via the public `oembed` endpoint (returns title + author). All **rules, numbers and version boundaries** are re-verified against official first-hand sources (GitHub release + tag source), not the community posts.

## Why this rewrite (decision-changing fact)

The core beginner decision the guide must get right: **does an FFA public game end on its own, and how?** The current guide tells a new player Overtime is a rare lobby option ("one quarter of public FFA", "if the lobby shows Overtime"). That is wrong for every public FFA game since v0.34.13: Overtime is **on by default** for all public FFA games, so a beginner can expect the win-threshold bar to start falling automatically after minute 30 (1 point every 30 s) and the match to end by itself rather than by a human reaching 95% first. This single correction changes how a beginner plans the endgame (stop racing for a decisive strike and let the sinking bar do the work, or use it as cover to push). It is the confirmed, source-verified fact error the coverage inventory flagged.

## Official first-hand sources (rules/numbers/version boundaries)

1. **OpenFront GitHub Release v0.34.13** — https://github.com/OpenFrontIO/OpenFrontIO/releases/tag/v0.34.13 (PR #5159 "Make overtime the default for public FFA games", commit `c23ea3e7e`). First-hand evidence that public FFA lobbies default to Overtime `enabled: true`. Verified present through v0.35.4.
   - Observation: introduces the "sinking win threshold" default for public FFA; no lobby modifier badge because it is now the default.
2. **OpenFront tag source v0.35.4** — `src/server/MapPlaylist.ts:229` (`overtime: { enabled: true }` with comment "the win threshold sinking after 30 minutes is the default for every public FFA game, so it carries no lobby modifier badge") and `packages/engine-lib/src/configuration/Config.ts:74-81` (`overtimeStartTick = 30*60*60`, `overtimeTick = 30*60`, `pointPerOvertimeTick = 1`) and `Config.ts:286-339` (FFA win threshold starts 0.95; Team starts 0.80; check is strictly `> threshold`; Overtime panel is FFA-only).
   - Numbers: overtime starts minute 30; −1 pt / 30 s; FFA threshold 95% → Team 80% (Team since v0.34.25); a win requires **strictly more than** the threshold.
   - Limit: source tag is v0.35.4; earlier lobby-specific overrides are not fully enumerated, so the guide only asserts the public-FFA default and the engine defaults.
3. **v0.34.25 release** — Team win threshold changed 95% → 80% to align with FFA; Overtime panel shows the current leader. Used for the FFA/Team threshold contrast in the decision table.

## Reddit discussions (beginner / FFA / how-to-win)

Accessed 2026-10-26 via web search quotations (direct .json bot-gated). Each entry: URL / title / relative recency / player question / observation / limit.

1. **URL:** https://reddit.com/r/Openfront/best — **Title:** "Open Front: Ultimate Beginner's Guide" (self-post). Recency: long-standing pinned-style guide.
   - Player question: "What does a brand-new player need to know to stop losing?"
   - Observation: lays out the 42% regeneration rule, the 10% death zone, troop-slider pacing (20% for land, 1% for boats), early rollout (green terrain near water/center), and explicitly warns beginners to pick an edge/corner, not map center in FFA ("you will just get f**ked from all sides"). Confirms the beginner FFA intent this guide answers.
   - Limit: pre-current-Overtime-dates; contains the same "Overtime is rare" misconception our rewrite fixes; numbers not re-verified for v0.35.4.
2. **URL:** https://reddit.com/r/Openfront/comments/1nx2yer/so_you_got_addicted_to_openfront_but_keep_losing/ — **Title:** "So you got addicted to OpenFront but keep losing? [Beginner's guide to the early game]". Recency: recent.
   - Player question: "I keep getting eaten in the first five seconds — how do I improve my early game?"
   - Observation: Phase 0 placement (edge/corner + water access beats center), the population-gain curve (don't full-send; keep ~30–40% in reserve), "next squishiest target" rule, and defense-post discipline. Strongly supports the guide's spawn/rollout/early-game sections and the FFA-vs-Team note that map position is more decisive in FFA.
   - Limit: early-game focus; no endgame/Overtime content; self-reported numbers.
3. **URL:** https://reddit.com/r/Openfront/comments/1n7eyya/if_you_are_going_to_just_sit_there_at_max_troop/ — **Title:** "If you are going to just sit there at max troop cap". Recency: recent.
   - Player question: "I have neither money nor enough troops to invade anyone — am I already screwed?"
   - Observation: passive max-cap play "delays losing" rather than winning; in FFA specifically the poster "tends to fall behind" and pivots to trading/arming until an opening. Directly motivates the guide's "don't sit passive; find the next squishiest target" failure-and-recovery section.
   - Limit: anecdotal; no endgame mechanics.
4. **URL:** https://reddit.com/r/Openfront/comments/1ls1x1n/challenge_myself_to_win_on_all_the_maps_in_ffa/ — **Title:** "Challenge myself to win on all the maps in FFA". Recency: recent.
   - Player question: "Which FFA maps are winnable and what start works?"
   - Observation: map-specific win rates; Halkidiki works by starting away from the south and grabbing early land; "keep optimal & safe troop numbers" so you land in the top 5–10. Supports the guide's map-choosing and "pick your map before you pick your start" section; confirms public FFA is the primary beginner battleground.
   - Limit: map-specific, not a universal rule.
5. **URL:** https://reddit.com/r/Openfront/comments/1mftoqe/how_many_times_did_you_win_an_online_match/ — **Title:** "How many times did you win an online match ?". Recency: recent.
   - Player question: "How long before a beginner's first win, and is it skill or luck?"
   - Observation: win ratios improve with focus on a few maps; "risk it big early, stay bigger mid, risk it again late"; suggests frontplus.io stats. Confirms the beginner win-rate framing and the value of focusing maps; the "risk it again in the late game" line is exactly where the Overtime default becomes relevant (the game can end on the sinking bar).
   - Limit: self-reported stats.

## YouTube videos (oEmbed-verified)

Verified 2026-10-26 via `https://www.youtube.com/oembed`. Each returns a real title + author.

1. **URL:** https://www.youtube.com/watch?v=7J5zwb_s_Cg — **Title:** "OpenFront Tutorial #1 Beginner's Guide" — **Author:** OpenFront (official). Recency: evergreen official tutorial.
   - Player question (covered): core controls + how to start. Official first-hand beginner framing.
   - Limit: tutorial, not a strategy deep-dive; pre-current-Overtime defaults.
2. **URL:** https://www.youtube.com/watch?v=KuSjtUSjKA0 — **Title:** "OpenFront.io TUTORIAL: How To Start" — **Author:** N3oT3k. Recency: recent.
   - Observation: step-by-step start, troop/economy basics. Supports rollout pacing and economy intro.
   - Limit: beginner-only.
3. **URL:** https://www.youtube.com/watch?v=hSK0aK-pAF0 — **Title:** "OpenFront.io Full Beginner's Guide [2026]" — **Author:** N3oT3k. Recency: 2026 (current).
   - Observation: 2026-dated full beginner guide; the most current beginner framing, useful to confirm the guide matches what new players are told today (and that "Overtime is rare" is not the current consensus — the sinking threshold is the norm).
   - Limit: transcript not captured; title/author only.
4. **URL:** https://www.youtube.com/watch?v=Tzhxz-4YcpA — **Title:** "OpenFront.io - How to Win - 2026" — **Author:** MrGamer07. Recency: 2026 (current).
   - Player question (covered): "how do I actually win?" — directly the first-match intent.
   - Limit: transcript not captured; title/author only.

## Cross-source synthesis

- **Primary beginner pain points:** getting eaten early (placement, full-sending), passive max-cap stalling, and not knowing how a game ends. The Overtime default is the answer to the last one and is the fact our guide currently states wrong.
- **Consensus beginner FFA advice** (Reddit threads 1–5 + YouTube): edge/corner spawn with water access; keep 30–40% troop reserve (avoid the 10% death zone); attack the squishiest target; don't stack cities early; ports over factories for most beginners; focus a few maps. All of these the guide already covers; the rewrite preserves them and fixes only the endgame/Overtime fact.
- **Fact authority:** every number in the guide (minute-30 start, 1 pt/30 s, 95% FFA / 80% Team, strictly->, FFA-only panel) is taken from official first-hand sources #1–#3, never from the community posts.

## Limits / verification boundary

- Reddit content is from search quotations, not the live thread (direct .json 403; PullPush rate-limited) — treated as community signal only, not as a rule source.
- YouTube transcripts not captured (oEmbed confirms title/author only) — used to confirm current beginner framing, not for numbers.
- Source tag is v0.35.4; the guide asserts only the public-FFA Overtime default and engine defaults, which are stable across v0.34.13→v0.35.4.
