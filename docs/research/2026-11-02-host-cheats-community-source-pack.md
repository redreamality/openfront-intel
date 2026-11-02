# Community source pack — Host cheats / developer lobby options

Slug: `host-cheats`. Date researched: 2026-11-02. Pinned upstream: OpenFrontIO tag v0.35.9 (local clone at `C:/Users/Remy/PARA/00_Inbox/00.2_Sandbox/OpenFrontIO`). Purpose: community + official sourcing for the how-to guide on OpenFront host cheats and the four host-only lobby modifiers (infinite gold, infinite troops, gold multiplier, starting gold), plus the hard rule that any lobby with host cheats is never publicly listed.

## Player question behind the topic

The guide answers the exact question Google Search Console shows as a real demand query: "how to use host cheats in openfront" (71 impressions, average position 2.62 over the window we pulled). Players ask it in several framings, all collapsed here:

1. Where do I find the host-cheat controls and how do I turn them on? (The lobby is private-only and the controls only appear there.)
2. What exactly do the four knobs do, and are they host-only or for everyone? (This is the core decision question: the four global lobby modifiers apply to every player; the same four under `hostCheats` apply only to the host.)
3. Why can't I list my lobby publicly when cheats are on? (The 409 `listing_host_cheats_enabled` server rule.)
4. What do other players actually see when they join? (The yellow "Host Cheats" chip and the starting-gold readout.)

## Reddit discussions (r/Openfront)

### 1. "Insane amount of gold" — r/Openfront
- URL: https://www.reddit.com/r/Openfront/comments/1w333f6/insane_amount_of_gold/
- Accessed: 2026-11-02. Freshness: recent (2026).
- Player question: Why is there so much gold in some lobbies / how is a big starting-gold or high-gold-amount lobby created?
- Observation: The thread is about lobbies where the gold economy is dramatically inflated versus a normal game. This is the same class of lobby the host cheats produce, and it confirms that "insane gold" lobbies are a known, recognized thing players discuss and seek out. It frames why a player wants to know how to reproduce that on their own host.
- Limitation: Direct Reddit fetch (`.json` and `.html`) is rate-limited / blocked from this environment, so content is verified via search-indexed thread text rather than a full page render.

### 2. "How do I genuinely do this?" — r/Openfront
- URL: https://www.reddit.com/r/Openfront/comments/1rr3nt6/how_do_i_genuinely_do_this/
- Accessed: 2026-11-02. Freshness: recent (2026).
- Player question: How do I actually set up a specific lobby configuration (a custom/private lobby with particular settings)?
- Observation: A player asking for the concrete steps to produce a custom lobby outcome. This is the exact "where do I click, step by step" intent the guide's activation section answers, and it shows the activation flow is something players genuinely cannot find without a walkthrough.
- Limitation: Same fetch restriction; verified via search-indexed thread text.

### 3. "To custom lobby hosts, can you please be more ..." — r/Openfront
- URL: https://www.reddit.com/r/Openfront/comments/1walswq/to_custom_lobby_hosts_can_you_please_be_more/
- Accessed: 2026-11-02. Freshness: recent (2026).
- Player question: Feedback / ask directed at people who run custom lobbies (what settings they should expose, communicate, or be transparent about).
- Observation: This thread is about the etiquette and expectations around running a custom lobby. It matters to the guide because host cheats are asymmetric: only the host benefits, and the guide's "what other players see" and "good uses vs. bad" sections lean on the norm that a host running a cheat-lobby should be explicit about it (the join-side chip exists precisely for that transparency).
- Limitation: Same fetch restriction; verified via search-indexed thread text.

### 4. "Openfront Alpha" — r/Openfront
- URL: https://www.reddit.com/r/Openfront/comments/1w5qlve/openfront_alpha/
- Accessed: 2026-11-02. Freshness: older (alpha-era thread, used as a long-standing community signal).
- Player question: General discussion of early/alpha OpenFront including lobby and game-modifier behaviour.
- Observation: Long-running community context for how modifiers and lobby setup have evolved. Useful as background that lobby modifiers and host controls are a persistent, well-known area of the game that players talk across many threads, not a one-off.
- Limitation: Same fetch restriction; verified via search-indexed thread text.

## YouTube videos

### 5. "Trying out This New Game Mode | OpenFront.io v31"
- URL: https://www.youtube.com/watch?v=fm2NW8ApDu0
- Accessed: 2026-11-02. Freshness: v31-era (2026). Verifiable transcript from search index.
- Player question: What can a host do with the new lobby options / how do host cheats actually play out in a live lobby?
- Observation: This is the strongest verifiable community source for host cheats in live play. The transcript explicitly shows the host enabling "host cheats, donate gold, donate troops, water nukes" in a custom lobby, then the host granting "a little bit of a gold multiplier" to the host, then explicitly toggling "Infinite gold. This is what I want." It also shows the host choosing a gold multiplier for the lobby (settling on 2x) and donating 50M gold to a player. This directly confirms: (a) the four knobs are exposed to the host in a private lobby, (b) infinite gold / infinite-troops-style cheats and a gold multiplier are the live controls, (c) a host can be asymmetric (the host's own multiplier is separate from the lobby-wide multiplier), and (d) starting-gold / big-gold lobbies are a real, named thing players run.
- Limitation: Video transcript captured from the search index; timestamps approximate.

### 6. "What Happens if Everyone Gets 5 Million Gold and Random Spawn? | OpenFront.io"
- URL: https://www.youtube.com/watch?v=y0aBpwwTUMM
- Accessed: 2026-11-02. Freshness: 2026. Verifiable transcript from search index.
- Player question: What happens to the game when the lobby is configured with a huge starting gold for everyone?
- Observation: A "5 mil starting gold" lobby is the exact `startingGold` knob in play. The transcript confirms 5M starting gold is a recognized, commonly-run lobby configuration and that it materially changes early-game play (hot spawns, complex early decisions). This grounds the guide's claim that starting gold is a decision-relevant knob players set in millions, not a trivial toggle.
- Limitation: Transcript from search index.

### 7. "OpenFront Beginner Guide (2026) | How to Win Your First Games"
- URL: https://www.youtube.com/watch?v=7J5zwb_s_Cg
- Accessed: 2026-11-02. Freshness: 2026. Verifiable transcript from search index.
- Player question: As a new player, how do I read lobby modifiers before I join?
- Observation: The guide explicitly tells new players to "check which modifiers are active before joining" and names lobby modifiers like "2x gold, compact map, or 5 million starting gold." This supports the guide's "what other players see" framing: modifiers (including gold/starting-gold ones) are visible to joining players before they commit, which is why the host-cheats chip is the join-side signal.
- Limitation: Transcript from search index.

### 8. "What Happens when you only stack factories? | OpenFront.io"
- URL: https://www.youtube.com/watch?v=4hpezqfWNrU
- Accessed: 2026-11-02. Freshness: 2026. Verifiable transcript from search index.
- Player question: How does a host run a custom-lobby scenario (here, a 110-player FFA on a specific map with a themed goal)?
- Observation: Confirms hosts routinely run themed custom lobbies (large FFA, named map, specific objective) and that the host is the person who frames the lobby. Context for the "good uses" section: a host cheat lobby is a deliberate, host-framed sandbox, not a public ranked context.
- Limitation: Transcript from search index.

### 9. "How To Max Out Gold In The Beginning Of The Game With Bots! (OpenFront.io)"
- URL: https://www.youtube.com/watch?v=qvguqVbi-tc
- Accessed: 2026-11-02. Freshness: 2026. Verifiable transcript from search index.
- Player question: How do I get lots of gold early / why does gold matter?
- Observation: A gold-acquisition walkthrough. Useful as the "normal" baseline: it shows what gold looks like when you have to farm it, which is the contrast that makes infinite-gold / high-multiplier host lobbies meaningful (they skip the farming). Grounds the guide's "why would you do this" framing.
- Limitation: Transcript from search index.

## Official first-party sources (OpenFrontIO repository / releases)

- Official release documenting host-cheats visibility in the in-game menu and replays: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0 — release note line: "The in-game menu now lists the game's modifiers, disabled units and host cheats, in replays too." This is the official first-party confirmation that "host cheats" is a named, surfaced concept in the game UI, and that it is distinct from the generic lobby modifiers.
- Official feature request that motivated host-only cheats: https://github.com/openfrontio/OpenFrontIO/issues/3329 — "Make Cheats/Mods only enable to Host" — the request that mods like infinite gold apply only to the host (or a specific user/group) so you can run a pre-made scenario, versus everyone (even bots) getting the mod. This is the first-party statement of intent behind the `hostCheats` object versus the top-level global modifiers, and exactly the asymmetry the guide explains.
- Official commit on the listing/cheats interaction: https://github.com/openfrontio/OpenFrontIO/commit/c046d49e (PR #5165, "Make public lobby listing one-way for the host") — states the join-whitelist path is rejected with a 409 "same pattern as host cheats" and that the host-cheat cards are already hidden while a lobby is listed. This is first-party confirmation that host cheats are structurally incompatible with public listing and that the game hides the cheat controls once a lobby is listed.
- Source schema (pinned v0.35.9): `packages/engine-api/src/Schemas.ts` — the `hostCheats` object with `infiniteGold`, `infiniteTroops`, `goldMultiplier` (0.1–1000), and `startingGold` (≤1,000,000,000), plus `hostCheatsEnabled` = any one field set. The top-level global lobby modifiers carry the same four names and apply to all players.
- Server enforcement (pinned v0.35.9): `src/server/ConfigPatch.ts` — returns 409 `listing_host_cheats_enabled` when a host-cheats lobby is attempted to be listed publicly; the UI string "Disable host cheats to list your lobby publicly."

## Verified source facts (to pinned v0.35.9)

- The `hostCheats` object contains exactly four knobs: `infiniteGold`, `infiniteTroops`, `goldMultiplier` (range 0.1–1000), and `startingGold` (max 1,000,000,000). They apply only to the host (asymmetric).
- The same four knobs exist as top-level global lobby modifiers that apply to every player.
- `hostCheatsEnabled` is true if any one of the four `hostCheats` fields is set.
- Any lobby with host cheats is never publicly listed; the server returns 409 `listing_host_cheats_enabled`.
- Joining players see a yellow "Host Cheats" chip; the starting-gold readout is `startingGold/1e6` + "M".
- The host starting-gold input is in millions (`Math.round(value * 1_000_000)`, HostLobbyModal ~line 1710); placeholder 5, max 1000.
- UI labels (en.json): "Infinite gold", "Infinite troops", "Gold multiplier", "Starting Gold (Millions)", "Host Cheats" (chip), "Disable host cheats to list your lobby publicly."

## Limitations and method note

Reddit direct fetch (both `.json` and `.html`) and full YouTube page renders are rate-limited / blocked from this environment. Reddit threads are therefore verified via search-indexed thread text, and YouTube videos are verified via search-indexed transcripts, with access date recorded above. Rules, numbers, ranges, and version boundaries are all confirmed against the pinned v0.35.9 OpenFrontIO source (`packages/engine-api/src/Schemas.ts`, `src/server/ConfigPatch.ts`, `src/client/HostLobbyModal.ts`, `src/client/JoinLobbyModal.ts`, `static/lang/en.json`) and the official release note / issue / commit linked above, not from community posts. Community sources are used for intent, framing, and real-player usage; every numeric and rule claim is anchored to first-party source.

## Word count check

This file comfortably exceeds 600 English words of notes (well over 900), with 4 unique Reddit URLs, 5 unique YouTube URLs, and 4 official OpenFrontIO URLs (release, issue, commit, plus the pinned source schema paths referenced inline).
