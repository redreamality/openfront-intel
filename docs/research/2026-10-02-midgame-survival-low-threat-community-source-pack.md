# Community source pack — midgame-survival-low-threat

- Date: 2026-10-02
- Slug: midgame-survival-low-threat
- Version boundary: verified against v0.34.21 tag (SHA d7075bf), OpenFront v34 release cycle.

## Primary question (across sources)

"I survived the early game, but I'm no longer the weakest player. None of the players who can reach me are weaker than me — the bigger ones are too far or have their own enemies. The strongest players keep glancing my way. I can't beat them head-on right now. How do I stop getting annexed or nuked before the nuclear endgame?"

This is the inverse of threat assessment (which guide is about *choosing a target to beat*). This guide is about *avoiding being targeted* while you're below the predator tier.

## Reddit discussions (accessed 2026-10-02 via arctic-shift archive; direct reddit.com blocked to curl)

1. r/Openfront — "Survival guide 'Plan B': Minimal value, maximal threat" (2026-01-11, score 16, 4 comments)
   URL: https://www.reddit.com/r/Openfront/comments/1qaa7vw/survival_guide_plan_b_minimal_value_maximal_threat/
   Player question: how to survive the midgame when you're "too strong to be ignored but too weak to win."
   Observation: OP's doctrine — stop looking like easy prey by keeping value low (few exposed cities, no obvious gold hoard) while making the *threat* of your position high (a SAM, a silo, a defensible border). The top comment frames the same idea: a player who is "worth it" gets targeted; a player who is "annoying to get" gets skipped. Limitation: single-player anecdote, no map named.

2. r/Openfront — "Mid-Game Strategy Shift to Industrialization" (2025-10-28, score 11, 6 comments)
   URL: https://www.reddit.com/r/Openfront/comments/1oii584/midgame_strategy_shift_to_industrialization/
   Player question: at what point do you stop expanding and start building for the long war?
   Observation: the consensus is that a midgame player who keeps expanding into visible new land *announces* growth to every strong neighbor. Shifting to industrialization (cities/ports/factories) and holding the core is the standard "stop being a target" move. Commenters add that once you stop growing visibly, the big players fight each other and your window opens. Limitation: focused on economy, not deterrence mechanics.

3. r/Openfront — "How to even survive until mid-game?" (2025-09-22, score 6, 15 comments)
   URL: https://www.reddit.com/r/Openfront/comments/1no19k3/how_to_even_survive_until_midgame/
   Player question: beginners getting deleted in the first minutes.
   Observation: the survival answers that recur: don't let any neighbor hold a visible troop advantage over you; bank gold before every push so you can *defend* the next tick rather than just attack; keep a SAM or a silo early so you are "annoying to get" even as a small player. This is the small-player variant of the same doctrine — the midgame version is when the threat has to *outweigh* your visible value. Limitation: early-game framing.

4. r/Openfront — "If I can't stop a player from defeating me, how do I make sure their defeat [is costly]?" (2026-07-07, score 9, 18 comments)
   URL: https://www.reddit.com/r/Openfront/comments/1upxw32/iff_i_cant_stop_a_player_from_defeating_me_how_do_i_make_sure_their_defeat/
   Player question: if I'm going to lose anyway, what makes them pay for it?
   Observation: the thread is explicitly about making your defeat expensive — a SAM that forces an N+1 bomb salvo, a silo that can trade nukes, a border that costs troops to take. This is the "maximal threat" half of the Plan B doctrine stated by an attacker-facing player. Limitation: the player is already accepting loss; the midgame guide wants the player to *avoid* that point.

5. r/Openfront — "What to do when you are griefed" (2026-08-14, score 2, 6 comments)
   URL: https://www.reddit.com/r/Openfront/comments/1vo2uqo/what_to_do_when_you_are_griefed/
   Player question: someone small is harassing you; do you ignore or hit?
   Observation: the "ignore the small target" instinct is the same logic that protects a midgame player — the strong players' attention is a scarce resource, and you survive by *not* being the cheapest use of it. Useful as the mirror of the doctrine. Limitation: small-sample, about griefing not midgame positioning.

## YouTube walkthroughs (accessed 2026-10-02; captions verified via yt-dlp timedtext)

1. "The ULTIMATE OpenFront.io Tutorial and Strategy Guide!" — Ultimus_Rex, 2025-04-28, ~39,991 views, 32:14
   URL: https://www.youtube.com/watch?v=EdcdsayA_ac
   Transcript: C:\Users\Remy\.codex\automations\openfront\cache\sub_EdcdsayA_ac.en.vtt
   Relevant content: explicitly defines the pre-nuclear middle game and the "you don't want to be the easy target" posture; the "more troops than any neighbor, they won't attack you" rule; the "save gold so you can defend the next tick" discipline; SAM launchers as deterrence ("a level-N SAM intercepts N bombs before cooldown"); ports as the late-game survival economy once eliminations stop. Limitation: tutorial framing, not a survival-specific video.

2. "How to Win" — Enzo Plays, 2025-05-14, ~96,198 views, 15:49
   URL: https://www.youtube.com/watch?v=ehR2j15ttag
   Transcript: C:\Users\Remy\.codex\automations\openfront\cache\sub_ehR2j15ttag.en.vtt
   Relevant content: the midgame "hold vs expand" tension; the "if I get early annexations I do better" logic; the "I don't want to go in that direction — he's got 25 cities" threat read; the "I need to betray someone" pivot; the trader-debuff "50% less effective defense" consequence of breaking an alliance. Limitation: attacker framing — the player is winning; the survival guide is the *inverse* of this.

3. "Nuking MYSELF" — TheBiff, 2026-01-29, ~1,561 views, 52:09
   URL: https://www.youtube.com/watch?v=oEUAWETFd5E
   Transcript: C:\Users\Remy\.codex\automations\openfront\cache\sub_oEUAWETFd5E.en.vtt
   Relevant content: a long midgame where the player is *below* the predator tier and survives by (a) renewing alliances to stay "not a good target," (b) placing a silo and SAM early so the cost of attacking goes up, (c) banking gold for a hydrogen before the endgame, (d) making the "easily nukeable" big player *more* annoying to get than the player themselves. Limitation: small audience, single map, the player still gets nuked at the end — which is exactly why the doctrine must be stated as *reduce probability*, not *guarantee*.

## Official first-party URL

- OpenFront v0.34.21 GitHub Release: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.21
- OpenFront docs (strategy overview): https://openfront.io/docs/strategy/

## Verified v0.34.21 mechanics (from tag d7075bf Config.ts + NationNukeBehavior.ts + GameImpl.ts)

- Atom bomb: flat 750,000 gold.
- Hydrogen bomb: flat 5,000,000 gold.
- MIRV: 25,000,000 gold base, +15,000,000 per MIRV already launched.
- Missile silo: flat 1,000,000 gold; 10-tick build; upgradable.
- SAM launcher: (numUnits+1) × 1,500,000, capped at 3,000,000; 30-tick build; upgradable.
- Defense post: (numUnits+1) × 50,000, capped at 250,000; 5-tick build.
- City: min(1,000,000, 2^numUnits × 125,000); 2-tick build; upgradable.
- Port: min(1,000,000, 2^numUnits × 125,000); 5-tick build; upgradable.
- SAM cooldown: 90 ticks. Silo cooldown: 90 ticks.
- SAM level-N intercepts N nukes before going on cooldown (NationNukeBehavior.ts:777 comment).
- On Hard/Impossible, Nations avoid SAM-interceptable trajectories (NationNukeBehavior.ts:141–148) — so SAMs *deter* AI but do not block them at higher difficulties; vs human players they are a real cost.
- Traitor defense debuff: 0.5 (halves defender troop loss); traitor speed debuff: 0.8 (80% troop gain); 30-second duration (Config.ts:287–295, applied at Config.ts:933–934).
- Alliance duration: default 5 min, lobby-configurable 1–15 min or disabled (referenced in ffa-midgame-strategy; confirmed by community walkthroughs).
- Spawn immunity: 5 × 10 ticks (from _meta.json liveConfig, v0.34.21).

## Cross-source merge

The recurring player question is: **"I'm below the predator tier, the strong players keep eyeing me, how do I stop being the next target?"**

The recurring answers across Reddit and YouTube are three:

1. **Stop being visibly growing.** Hold the core, convert to industrialization (cities/ports), and let the big players fight each other over the frontier. (Reddit 1oii584, 1no19k3; YouTube EdcdsayA_ac.)
2. **Make the cost of targeting you go up.** A SAM, a silo, a defensible border, and a banked hydrogen turn you from "easy prey" into "annoying to get." The strong players' attention is scarce; you survive by not being the cheapest use of it. (Reddit 1qaa7vw, 1upxw32, 1vo2uqo; YouTube oEUAWETFd5E.)
3. **Stay out of the betrayal spiral.** The traitor debuff (0.5x defense, 0.8x speed, 30s) is the concrete cost of breaking an alliance; the midgame survival player should keep alliances *where the cost of breaking them is higher than the gold you'd save*. (YouTube ehR2j15ttag, oEUAWETFd5E; Reddit 1qaa7vw.)

This is distinct from:
- `threat-assessment` (choosing a target to *beat*, not avoiding being targeted).
- `ffa-midgame-strategy` (single-neighbor hold/expand/ally decision; this guide is the *multi-predator* case).
- `ffa-trapped-middle` (the neighbors are *your* size; here the predators are *stronger*).
- `ffa-deterrence-posture` (building the threat from *your* expansion; here the player is *below* the tier and must deter a stronger player).
- `nuclear-stalemate-breaker` (both players have silos and the question is how to break the deadlock; here one player has no nuclear yet and is being watched).
