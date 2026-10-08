# Community source pack: territory-size attack speed

Research date: 2026-10-09 (Asia/Vladivostok). The candidate question is: “Why can two OpenFront players with similar troop bars move across the same border at very different speeds, and when is a large-territory full send actually justified?” This pack records the player language and examples used to choose the guide. Community posts identify the confusion; gameplay facts below are checked against the official v0.34.24 release and tagged source.

## Reddit discussions

### 1. Defender Territory Size Speed Modifier

- URL: https://www.reddit.com/r/Openfront/comments/1wwtoq6/defender_territory_size_speed_modifier/
- Accessed: 2026-10-09 through the PullPush Reddit archive API after the canonical Reddit page returned a rate-limit response.
- Posted: 2026-10-03 (relative to research date); score 1; no comments at retrieval.
- Player question/problem: The author isolates the defender-side territory-size effect and says a larger defender can make an attack faster, not slower. They quote a maximum of about 142.5% for that component and point out that it multiplies with the attacker's territory modifier. They also connect equal-sized territories and a full send with outrunning a MIRV after a betrayal.
- Useful observation: Players are already trying to turn the modifier into an emergency timing rule. The guide must preserve the useful intuition (large territories can accelerate the attacker's arrival into them) while separating that speed result from troop losses, nuke flight time, and the risk of emptying the reserve.
- Limitation: The post is an image-backed short guide and does not show the exact release, formula, or tick convention. Its percentages are treated as a lead, not as authoritative numbers.

### 2. Territory Size Speed Modifier (another short guide)

- URL: https://www.reddit.com/r/Openfront/comments/1ww9t8c/territory_size_speed_modifier_another_short_guide/
- Accessed: 2026-10-09 through the PullPush Reddit archive API; canonical post text was available in the archive response and the linked image was identified as the author's calculation.
- Posted: 2026-10-02; score 1; no comments at retrieval.
- Player question/problem: The author says territory size has a drastic speed effect only when a player owns a large fraction of the map, that the curve flattens before the whole 4,194,304-tile “box” map, and that maximum troop capacity does not appear to affect attack speed.
- Useful observation: This is the cleanest community boundary for the new article: do not confuse a larger troop cap with a larger territory. The actual speed input is owned-tile count, and the effect is intentionally smooth rather than a threshold that suddenly turns on.
- Limitation: It is a one-post calculation with no match replay, no version tag, and no independent code citation. The current guide recomputes examples from `Config.ts` instead of repeating the image percentages.

### 3. Please help me understand

- URL: https://www.reddit.com/r/Openfront/comments/1wkvhcm/please_help_me_understand/
- Accessed: 2026-10-09 through the PullPush Reddit archive API.
- Posted: 2026-10-01; score 1; no comments at retrieval.
- Player question/problem: The player describes having roughly 200k troops like a neighbor, slowly taking a 30k AI nation, then watching the neighbor erase that nation in seconds and later counterattack their own country. They ask why similar totals do not produce similar wars.
- Useful observation: This is the decision failure the guide must solve. The visible country total hides the active attack stack, the defender's tile density, terrain, border size, and both territories' speed bonuses. The answer should give a short pre-send ledger rather than claim a single “correct” attack percentage.
- Limitation: The post has no map, replay, terrain state, or exact attack slider, so it cannot validate a numerical outcome. It is evidence of the recurring player intent, not a combat test.

### 4. How Terrain Affects Attacks

- URL: https://www.reddit.com/r/Openfront/comments/1wwxm5w/how_terrain_affects_attacks/
- Accessed: 2026-10-09 through the PullPush Reddit archive API.
- Posted: 2026-10-03; score 1; no comments at retrieval.
- Player question/problem: The post compares Plains, Highlands, and Mountains and explains that terrain changes attack speed, troop loss, and the bias of the next captured tile.
- Useful observation: Terrain is the most important confounder when a player tests territory speed. A large attacker on a mountain edge can still look slow, while a smaller attacker on plains can look fast. The new guide therefore uses terrain as a required second read and links to the dedicated terrain and land-combat pages instead of reprinting their entire formulas.
- Limitation: The percentages are a community summary and not the complete v0.34.24 attack model; they are used only to motivate route comparison.

## YouTube videos and subtitles

### 1. This Simple OpenFront Strategy Wins Almost Every Game!

- URL: https://www.youtube.com/watch?v=fDkfEDIh3tY
- Accessed and metadata opened: 2026-10-09 with yt-dlp. Published 2026-09-05 by Ash; 11:30.
- Subtitle observations: The creator frames the opening as a snowball: uncontested land creates more income, cities, and troops, and greener terrain produces faster early expansion. The practical lesson is that a territory advantage is valuable because it compounds into later actions, not because the troop bar alone is larger.
- Limitation: The video is strategy commentary, not a code-level explanation of the logistic territory modifier. Its claims are used to understand player decision language only.

### 2. How to Snowball Every OpenFront Game – Best Early Game Guide

- URL: https://www.youtube.com/watch?v=Z0gUv3gyfms
- Accessed and subtitle track opened: 2026-10-09 with yt-dlp. Published 2026-07-19 by Sinful73; 11:01.
- Subtitle observations: The transcript repeatedly tells players to choose greener terrain, expand before the war, and treat every extra city and tile as future troops and income. It also recommends changing the attack ratio after the free land is taken. That is useful evidence that players already treat “snowball” as one combined idea; the new guide separates owned-tile speed from cap, regen, and the attack slider so a player can identify which advantage is active.
- Limitation: The guide predates v0.34.24 and does not quantify the current territory-size function.

### 3. The ULTIMATE OpenFront.io Tutorial and Strategy Guide!

- URL: https://www.youtube.com/watch?v=EdcdsayA_ac
- Accessed and subtitle track opened: 2026-10-09 with yt-dlp. Published 2025-04-29 by Ultimus_Rex; 32:14.
- Subtitle observations: The tutorial tells players to use the terrain overlay, keep a reserve, read attack percentages, and treat cities as capacity and economy decisions. It explains that battles can look different despite similar visible totals because the route and local conditions differ. This supplies the older player vocabulary that the new v0.34.24 formula needs to correct.
- Limitation: The video predates the v34 combat rewrite and is intentionally broad. It is not used for current coefficients or release claims.

### 4. OpenFront Beginner Guide (2026) | How to Win Your First Games

- URL: https://www.youtube.com/watch?v=7J5zwb_s_Cg
- Accessed and subtitle track opened: 2026-10-09 with yt-dlp. Published 2026-07-04 by Lonely_Millennial; 12:21.
- Subtitle observations: The guide teaches the troop bar, attack slider, terrain colors, and the idea that regeneration peaks around 42% of cap. It tells new players to ask whether a send leaves another border undefended. Those are exactly the three quantities that must not be conflated in the new article: troop-cap/regen, owned-territory speed, and reserve risk.
- Limitation: It is an onboarding video and does not isolate attacker-versus-defender territory size.

## Official fact anchors and synthesis

- Release: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.24 (published 2026-10-06; v0.34.24 fixes the non-border attack exploit that let repeated invalid attacks grow troops past the cap).
- Tagged source: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/configuration/Config.ts
- Tagged execution context: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/AttackExecution.ts

The v0.34.24 `Config.ts` implementation is the source of truth. It uses a smooth logistic `largeTerritoryBonus` with a 300,000-tile midpoint and steepness 2.5. The attacker loss bonus uses depth 0.7 (approaching a 0.3 floor for huge territories), the defender loss-side bonus uses depth 0.3 (approaching a 0.7 floor), and the speed-only attacker bonus uses depth 0.73 (approaching a 0.27 floor). The attack tick fraction multiplies the attacker speed bonus, defender bonus, terrain tile cost, troop-ratio speed cost, and border-size denominator. The same source separately computes troop loss from the clamped defender-to-attack-stack ratio, large-territory loss bonuses, and defender troops per tile. A large owned area therefore changes speed and losses, but it never replaces the active attack-stack, terrain, density, or reserve checks. The release's exploit fix also matters: an attack against a target that is not actually adjacent no longer provides a refund loop or a way to exceed the cap. The finished guide will turn these facts into a SCALE decision loop: **S**ize both territories, **C**heck the active stack and terrain, **A**ssign a bounded objective, **L**eave a response reserve, and **E**xit when the speed advantage no longer buys a safe result.
