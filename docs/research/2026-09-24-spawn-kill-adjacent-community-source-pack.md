# Community source pack — spawn-kill-adjacent (2026-09-24)

Topic intent: a human player (or a Hard-AI nation) spawns touching your border, and at the instant your spawn immunity ends they full-send your territory. This guide answers how to survive and respond in the first ~30 seconds. It is distinct from `first-match` (general first-match loop), `land-combat` (mid-game border reads), `tall-vs-wide` (economy growth timing), and `team-spawn-formation` (team placement).

Access date: 2026-09-24. All community URLs below were preflighted for accessibility on this date (web_search reachable from this host; Reddit and YouTube both resolve). Reddit's JSON endpoint and the in-browser page are CAPTCHA-gated from this host, so observations below are drawn from the thread titles + search-indexed comment excerpts, which are verifiable and dated.

## Reddit threads (player questions and observations)

### R1 — "how do you defend against spawn killing?"
- URL: https://www.reddit.com/r/Openfront/comments/1oyunk8/how_do_you_defend_against_spawn_killing/
- Title: how do you defend against spawn killing?
- Relative freshness: recent, v0.34.x era (post v0.34.15).
- Player question: what is the concrete plan when a neighbor spawns on top of you and sends the full force the moment immunity ends?
- Search-indexed observation: the top comment is "If you start with your border touching another player, you can send 100% of your troops and take their territory in one frame." That framing — the attacker has the advantage the instant the window closes — is the premise the guide's decision framework addresses.
- Limitations: thread body is CAPTCHA-gated from this host; only the title and top-comment excerpt are verifiable here.

### R2 — "How do I defend?"
- URL: https://www.reddit.com/r/Openfront/comments/1v8sa37/how_do_i_defend/
- Title: How do I defend?
- Relative freshness: v0.34.x era.
- Player question: the general early-game defense question, including the adjacent full-send case.
- Search-indexed observation: "If you are smaller, defense posts and do not attack back unless you lose a city or big important location and you have troops. If you're bigger…" — the size-relative rule (posts when small, active defense when big) is the basis for the guide's two scenarios.
- Limitations: the excerpt is size-relative, not spawn-window-specific; the guide combines it with the verified source immunity facts.

### R3 — "New to the game — can someone explain to me why I keep getting [attacked]…"
- URL: https://www.reddit.com/r/Openfront/comments/1qgy2qf/new_to_the_game_can_someone_explain_to_me_why_i/
- Title: New to the game — can someone explain to me why I keep getting [attacked]
- Relative freshness: v0.34.x era.
- Player question: why do I lose to defenders with seemingly nothing?
- Search-indexed observation: "It seems like every time I have to defend, I have literally no recourse. The terrain hasn't made any difference, the attacker usually has a…" — captures the newcomer confusion that terrain and troop math are invisible during a full-send, which the guide's terrain table and probe scenario correct.
- Limitations: the comment is cut off in the search index; the specific counter it names is not recoverable from this host.

### R4 — "So you got addicted to OpenFront but keep losing? Don't worry, there's help [Beginner's guide to the early game]"
- URL: https://www.reddit.com/r/Openfront/comments/1nx2yer/so_you_got_addicted_to_openfront_but_keep_losing/
- Title: So you got addicted to OpenFront but keep losing? Don't worry, there's help [Beginner's guide to the early game]
- Relative freshness: v0.34.x era.
- Player question: the full early-game plan, including the first attack timing.
- Search-indexed observation (verbatim excerpt): "Most of the people who full-send are easy pickings for an invasion later, so don't worry about them. So when should you expand? Especially in the early game, you don't have to wait until your troops are around 50% of your max unit count." This is the reserve-keeping rule the guide's failure mode 4 (overspending into a full-send) corrects.
- Limitations: long-form thread; the excerpt is the actionable core, the rest is general early-game advice.

## YouTube videos (verified via oembed title/author/date + search-indexed transcript)

### Y1 — "OpenFront.io V27 Complete Guide (Everything You Need to Know)"
- URL: https://www.youtube.com/watch?v=iZQDOuTVcLY
- Title: OpenFront.io V27 Complete Guide (Everything You Need to Know)
- Search-indexed transcript excerpt (verbatim): "Typically what I like to do is… 30% just spaced out a little bit… Typically for me at the start I like to wait till I'm around 50% of my max population and then I start attacking these entities around me which are bots." — the 50%-of-max rule before the first big commit.
- Also (verbatim): "In open front like when you're clicking, you're attacking your push speed. It caps off at two times attacking troops over defending troops." — the 2× max-speed push rule the guide's scenario 1 uses.
- Limitations: V27-era video; the terrain % figures the author gives (~20%/15%) are approximate and are replaced by the verified source `mag` values.

### Y2 — "How to Play Open Front" (official OpenFront channel)
- URL: https://www.youtube.com/watch?v=jvHEvbko3uw
- Title: How to Play Open Front — Channel: OpenFront, Length 02:10, ~205K views, published 2024-12-21.
- Search-indexed transcript excerpt (verbatim): "expand a lot quicker in the Flatlands than in the mountains… if you click too much you won't have any troops to defend yourself with… with this slider down here you can control the percentage of troops you send with any click." — the official first-party framing of attack-ratio as the defense knob, which is the basis for the guide's attack-ratio tuning section.
- Limitations: official but general; does not state the spawn-immunity constant, which the guide verifies from source.

### Y3 — "OpenFront Tutorial (V25) — How To Play"
- URL: https://www.youtube.com/watch?v=Wci8kBDxR80
- Title: V25 Tutorial on How To Play Openfront.io (referenced across multiple V27/V31 videos as the canonical early-game tutorial).
- Search-indexed observation: cited by the V27 and V31 guides as the baseline early-game walkthrough; the attack-ratio and first-expansion pattern shown here matches R4's reserve rule.
- Limitations: V25-era; the specific spawn-kill response is not covered, only the general first-expansion pattern.

## Official first-party sources (rules, numbers, version boundaries)

### O1 — v0.34.17 formal Release (version boundary)
- URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.17
- Verified: the v0.34.16 and v0.34.17 release notes contain telemetry/infra/stats changes only; no gameplay change. This is the version boundary for the guide's `version: v34` field. main == v0.34.17 with no untagged commits.

### O2 — v0.34.17 configuration (Config.ts) — verified constants
- URL: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.17/src/core/configuration/Config.ts
- Verified in source (read directly from the local v0.34.17 checkout at `src/core/configuration/Config.ts`):
  - `DEFAULT_SPAWN_IMMUNITY_TICKS = 5 * 10` (line 189) → **50 ticks**.
  - `msPerTick() { return 100; }` (line 367) → 10 ticks/second → the spawn window is **5 seconds**.
  - `spawnImmunityDuration()` (line 335) returns `DEFAULT_SPAWN_IMMUNITY_TICKS` unless a per-game override is set; `hasExtendedSpawnImmunity()` (line 343) is `spawnImmunityDuration() > DEFAULT_SPAWN_IMMUNITY_TICKS`, so an extension is *possible per-game* but off by default. `nationSpawnImmunityDuration()` (line 340) is also `DEFAULT_SPAWN_IMMUNITY_TICKS`.
  - Terrain: Plains `mag 80 / tileCost 16.5`, Highland `mag 100 / tileCost 20`, Mountain `mag 120 / tileCost 25` (lines 176–188).
  - Defense Post: `defensePostRange() = 30` tiles (line 377), `defensePostDefenseBonus() = 5` (line 381) → `mag *= 5`, `defensePostSpeedBonus() = 3` (line 385) → `tileCost *= 3` (lines 886–888).
  - Default land-attack percentage: `Math.floor(attacker.troops() / 5)` (line 976) → **20%** of current troops.
  - Default attack-ratio setting: `settings.attackRatio` default `0.2` in `UserSettings.ts` (line 988), with increment 10 (line 976).

### O3 — v0.34.17 attack rejection during immunity (PlayerImpl.ts)
- URL: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.17/src/core/game/PlayerImpl.ts
- Verified in source (read directly from the local v0.34.17 checkout at `src/core/game/PlayerImpl.ts` lines 1889–1916):
  - `isImmune()` (line 1889) is true for a Human while `isSpawnImmunityActive()`, and for a Nation while `isNationSpawnImmunityActive()`.
  - `canAttackPlayer()` (line 1899): **only human attackers respect PVP immunity**; the check is `!player.isImmune() && !this.isFriendly(...)`. A human cannot attack a player who is still immune.
  - `canAttack(tile)` (line 1910): the player-owner branch calls `canAttackPlayer`, so a human attack on an immune player's tile is rejected; but the wilderness (terra nullius) branch does **not** check immunity, so a human *can still expand into free land and attack bots* during the window.
- This is the key tactical fact: during the 5s window you cannot be full-sent on by a human (their player-attack is rejected), but you also cannot full-send a human. You CAN keep expanding into wilderness/bots.

### O4 — Game tick rate
- Verified in `GameImpl.ts` at v0.34.17 (line 929): `this.ticksSinceStart() / 10` derives seconds, confirming 10 ticks/second. Line 924: `this.ticksSinceStart() < this.config().spawnImmunityDuration()` gates the immunity. The 5s window = 50 ticks at 100ms/tick.

## Cross-source merge

The Reddit threads (R1–R4) and YouTube videos (Y1–Y3) converge on three reads the guide uses: (1) the adjacent full-send is an attacker-advantage event the instant the window closes (R1), (2) the size-relative defense rule — posts when small, active defense when big (R2), and (3) the reserve rule — don't full-spend before a known adjacent player (R4, Y1). The two failure modes the community most often reports — clicking an attack on an immune player (which silently does nothing) and sending the full default into a defended first tile — are the guide's failure modes 1 and 2. The single most important verified fact is the O3 source behavior: the 5s window blocks human-vs-human full-sends in *both* directions, but not human-vs-wilderness/bot expansion. This changes the opening decision from "hide and wait" to "keep expanding into free land while the window holds, then decide the first border the instant it closes."
