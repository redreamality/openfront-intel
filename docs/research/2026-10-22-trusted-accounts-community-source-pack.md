# Community source pack — trusted-accounts (2026-10-22)

Topic: **What trusted accounts are in OpenFront and how to get one** (slug `trusted-accounts`).
Intent: a player hits the locked Ranked button after v0.35 and needs to know what "trusted" means, how to earn it, and what it gates. This is the primary answer for that question; no existing guide owns it (ranked guides mention the gate in passing only).
Access date: 2026-10-22. Version boundary: stable `v0.35.2` (tag commit `08b63c054897c030e6516e0731ab7cc62b2998b7`, release published 2026-10-17).

## Official primary sources (OpenFront first-hand)

1. **v0.35.0 release body** — https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.0
   - "Two new ranked queues: Free For All … and Clan Wars … Ranked now needs a trusted account, and the clan leaderboard gets an ELO column."
   - "Ranked is limited to trusted accounts, with lock icons on the Ranked button and modal — Evan"
   - "Level Plutonium is held until your account is trusted, and the rewards list says so — Lewis"
2. **v0.35.2 release (current stable boundary)** — https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.2
3. **Tag source, player-facing copy** — `resources/lang/en.json` at tag `08b63c054897c030e6516e0731ab7cc62b2998b7`, `matchmaking_modal` block:
   - `not_trusted`: "Ranked is limited to trusted accounts."
   - `not_trusted_info`: "Your account becomes trusted after you play more public games, or right away with any purchase."
   - `not_trusted_info_crazygames`: "Your account becomes trusted after you play more public games." (CrazyGames build: no purchase shortcut)
   - `limit_reached`: "You're out of free ranked matches." / `limit_reached_info`: "Free matches refill daily. Subscribe for unlimited ranked play." (a separate gate, not trust)
   Raw: https://raw.githubusercontent.com/openfrontio/OpenFrontIO/08b63c054897c030e6516e0731ab7cc62b2998b7/resources/lang/en.json
4. **Tag source, enforcement** — `packages/shared/src/CloseCodes.ts`: `NotTrusted: 4103`; `tests/client/Matchmaking.test.ts` (the client queues regardless of tier and the 4103 close sets the not-trusted modal); `src/client/Matchmaking.ts` (modal copy selection, "stops without reconnecting when the service refuses as untrusted").
   Raw: https://raw.githubusercontent.com/openfrontio/OpenFrontIO/08b63c054897c030e6516e0731ab7cc62b2998b7/packages/shared/src/CloseCodes.ts

Observation: the trust rule itself ("play more public games, or right away with any purchase") is server-side and intentionally vague in the public copy — no public game-count threshold is stated anywhere in the tag source. The guide must therefore say "the number is not published" and never invent one.

## Reddit (3 threads opened and analyzed)

1. **r/OpenFront, "Trusted accounts - what are they and why" (post 1wgiqr8)** — https://www.reddit.com/r/OpenFront/comments/1wgiqr8/
   - Player question: what does the locked Ranked button mean; is it a ban?
   - Observation: the top answer explains it as an anti-abuse gate on the new ranked queues introduced with v0.35; players report the lock disappearing after several days of casual public matches.
2. **r/OpenFront, trusted-account lockout discussion (post 1wgh3ht)** — https://www.reddit.com/r/OpenFront/comments/1wgh3ht/
   - Player question: brand-new account, Ranked greyed out, "what do I need to do?"
   - Observation: replies distinguish the trust lock from the daily free-match limit; several note the CrazyGames build does not offer the purchase fast-track shown on the website.
3. **r/OpenFront, ranked queue discussion (post 1uurl7q)** — https://www.reddit.com/r/OpenFront/comments/1uurl7q/
   - Player question: which ranked queues exist and what do they require.
   - Observation: users list the four queues (1v1, 2v2, FFA, Clan Wars) and note the same trust gate applies to all of them; Clan Wars additionally requires clan membership.

Limitations: pullpush.io index of the threads; exact vote counts and full comment trees not exhaustively archived; the threads reflect the v0.35 launch window (October 2026) and the rule may be tightened in later releases — re-verify against the next release tag.

## YouTube (3 videos opened, subtitles verified)

1. **TheBiff — "I Tried OpenFront's NEW Ranked Mode! (v35 Update)" (49:07, 2026-10-17)** — https://www.youtube.com/watch?v=I1eW-ILqRp8
   - Subtitles: the video hits the not-trusted lock on a fresh test account, reads the modal copy aloud ("becomes trusted after you play more public games, or right away with any purchase"), and explains the lock as the gate on the new v35 ranked queues.
2. **Papi Flex — "OpenFront V35 🧠 New Brain Rot Map!" (12:05, 2026-10-16)** — https://www.youtube.com/watch?v=870D5LMsSO4
   - Subtitles: v35 overview; mentions the trusted-account requirement as the entry rule for the new ranked queues; shows the lock icon on the Ranked button.
3. **Ultimus_Rex — "Whoever controls Taiwan, controls the game..." (59:46, 2026-10-22)** — https://www.youtube.com/watch?v=YcQ_nGtik1Y
   - Subtitles: current-map playthrough on the stable v0.35.2 client; useful as a dated confirmation that the v35 feature set (including the ranked/trust UI) is what the live client ships today.

Limitations: auto-generated subtitles; claims in narration treated as community context, while every rule, number and version boundary in the guide was re-verified against the v0.35.2 tag source and release bodies above.

## Research notes (what the guide must get right)

- The trust gate landed with v0.35.0 (2026-10-17 stable line); it gates **all four** ranked queues (1v1, 2v2, FFA, Clan Wars), not just the new ones — the v0.34-era ranked 1v1/2v2 queues inherit it too.
- Earning trust: play public games (number not published) or make any purchase (website build only; the CrazyGames build has no purchase shortcut — different modal copy confirms it).
- Enforcement path: the client always queues; the server closes the socket with close code `4103` (`NotTrusted`) for untrusted accounts; the client then shows the not-trusted modal and stops reconnecting. The lock icons on the Ranked button/modal are the pre-queue signal.
- Trust also gates the **level Plutonium reward track**: level Plutonium is held until the account is trusted, and the rewards list says so (v0.35.0 release body).
- Do **not** conflate with the separate free-match budget: "You're out of free ranked matches / Free matches refill daily. Subscribe for unlimited ranked play" is a subscription gate that can appear even on trusted accounts; it is a different modal line with a different fix.
- Clan Wars adds a second gate on top of trust: clan membership (clan_required / invalid_clan modal copy).
- Player decisions this changes: (a) a locked Ranked button is not a ban and does not need support contact — it lifts by playing public games; (b) a purchase unlocks ranked instantly on the website build but is optional; (c) on CrazyGames the only path is public games; (d) new accounts should expect the Plutonium level rewards to be held until trust; (e) if the modal instead says "out of free ranked matches", the account is already trusted and the fix is daily refill or a subscription.
- Version boundary: verified on `v0.35.2` tag `08b63c054897c030e6516e0731ab7cc62b2998b7`; re-check the next official release tag if the copy or close codes change.
