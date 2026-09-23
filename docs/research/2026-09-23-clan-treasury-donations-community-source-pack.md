# Community & Source Pack — Clan Treasury Donations

Access date: 2026-09-23. Topic: the **clan treasury** — moving the signed-in player's own currency into a clan's shared balance — versus the unrelated **in-match ally donation** (giving gold or troops to an ally mid-game). This source pack separates the two, records every community source actually opened, and anchors every rule, number, and version boundary to primary OpenFront sources.

## Scope note: two different "donations"

OpenFront has two features that both use the word "donate," and the community frequently conflates them. This guide targets the **clan treasury**, a persistent, out-of-match feature shipped in v0.34.0 (commit `0a4302a0`, PR #5041, "feat(clan): donate player currency to the clan treasury"). It moves currency from the player's account wallet into the clan's `softBalance` (caps) or `hardBalance` (plutonium). The other feature — `donateGold` / `donateTroops` in the in-match radial menu — transfers in-match gold or troops to an ally inside a single game lobby and is a different mechanic entirely. The i18n strings confirm the split: the treasury dialog is `clan_modal.donate_subtitle` ("Move currency from your account to the clan treasury"), while the in-match strings are `ally_donate` / `donate_gold` / `donate_troops`. Getting this distinction right is the single most important decision a player must make before touching the treasury button.

## Official primary sources (OpenFront)

- Release **v0.34.0** (the version that introduced the treasury donate UI). Verified tag exists in the upstream clone.
  https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.0
- The introducing commit, PR #5041, full SHA `0a4302a09946ba5cc0ef723faa56b1637ceb694e`, dated 2026-08-18.
  https://github.com/openfrontio/OpenFrontIO/commit/0a4302a09946ba5cc0ef723faa56b1637ceb694e
- Client API contract (`donateToClan`, `fetchClanDonations`, `ClanCurrencyType = "soft" | "hard"`), as of tag v0.34.16.
  https://github.com/openfrontio/OpenFrontIO/blob/v0.34.16/src/core/ClanApi.ts
- Zod schemas for `ClanInfo` (`softBalance` / `hardBalance` as decimal bigint strings) and the donation ledger row (`ClanDonationSchema`).
  https://github.com/openfrontio/OpenFrontIO/blob/v0.34.16/src/core/ClanApiSchemas.ts
- The donate overlay itself, including the irreversibility copy and per-open idempotency key.
  https://github.com/openfrontio/OpenFrontIO/blob/v0.34.16/src/client/components/clan/ClanDonateDialog.ts
- OpenFront.io (official game home).
  https://openfront.io/

Verified mechanics pulled from those sources (not player speculation):
1. **One-way and final.** API doc comment: "Moves currency from the caller's own wallet into the clan treasury. One-way and final: the API never credits a clan balance back to a player." Player-facing copy: "Donations are permanent and non-refundable. Currency given to the clan can never be returned to you."
2. **Idempotent retry.** One idempotency key is minted per dialog open and reused for every submit; a retry after a dead network "replays the original 201 without moving more currency," so a flaky connection cannot double-spend.
3. **Two currencies.** `soft` = caps (the amber, earned currency), `hard` = plutonium (the green, premium real-money currency). The hard-currency path carries extra player-facing warning copy: "Plutonium is premium currency. Once donated it cannot be refunded, withdrawn, or moved back to your account."
4. **Members-only.** `donateToClan` returns a `403 → clan_modal.donate_not_member` ("You must be a clan member to donate."). The donation history page is also members-only.
5. **Amount is a whole number.** `amount` is sent as a decimal string (int64 server-side); the dialog validates "Enter a whole number greater than 0" and rejects a `400 "Insufficient balance"`.
6. **Balance display.** `ClanInfo.softBalance` / `hardBalance` are public (no membership gate) and are decimal bigint strings, "0" when empty, never a JSON number. They exceed `Number.MAX_SAFE_INTEGER`, so must be compared/summed with BigInt.
7. **The ledger is not the balance.** The donations endpoint (`GET /clans/:tag/donations`) lists only *player* donations. The schema comment is explicit: "the clan's win-share cut, admin adjustments and refund reversals are separate ledger reasons the endpoint excludes — so summing `amount` is not the clan balance; use ClanInfo.softBalance/hardBalance." This is schema-level evidence; the server-side spend path (what the treasury funds in-match) is not present in the open-source repo at v0.34.16, so the guide treats "what the treasury is spent on" as the one point the player must confirm in-game rather than assume.

## Reddit threads actually opened and analyzed (via api.pullpush.io mirror; reddit.com blocks direct fetch)

For each thread: URL, title, date, the player question, the observation, and the limitation.

1. https://www.reddit.com/r/Openfront/comments/1u9sqsc/the_purpose_of_clans/ — "The purpose of Clans?" (2026-06-19). Player question: what is a clan actually for, and why did the poster's clan drop off the leaderboard mid-climb. Observation: the clan leaderboard is a **win/loss ratio** (poster cited rank 32 at a 3.4 ratio over ~200 games), and the leaderboard has an activity gate — a clan that stops playing "official" games vanishes from the list, which is the poster's core frustration. Limitation: the thread is about the leaderboard, not the treasury; it establishes that clan value is community + ranked climb, which is the context in which a treasury makes sense.
2. https://www.reddit.com/r/Openfront/comments/1kr04qx/clan_and_ffa/ — "Clan and FFA" (2025-05-20). Player question: if clans exist, what is the point of FFA when clans team up? Observation: same-clan / same-flag players *do* team in FFA, and the frustration is real; commenters confirm it is not universal (some team with the biggest neighbor regardless of flag). Limitation: this is the "why be in a clan at all" objection that a treasury guide must answer — a treasury is a signal of a clan that coordinates rather than one that just farms FFA.
3. https://www.reddit.com/r/Openfront/comments/1nn3v1v/clubsclan/ — "Clubs/clan" (2025-09-21). Player question: how do you actually join a clan? Observation: the answer given is that clans are run through Discord ("95% of clans are run through Discord servers"), and joining is social/external, not in-game. Limitation: confirms that the treasury is a *member* feature — you cannot donate to a clan you are not in, and getting into a real clan is a Discord step.
4. https://www.reddit.com/r/Openfront/comments/1skwdvo/been_playing_since_before_factories_on_mobile/ — "let's make a clan?" (2026-04-14). Player question: how to recruit a clan, tag format. Observation: clan tags are short (5-digit) identifiers; recruitment happens on the OpenFront Discord (dedicated channel). Limitation: recruitment thread; relevant only to the precondition (be a member) of donating.
5. https://www.reddit.com/r/Openfront/comments/1vbwx0a/i_made_a_guidetutorial_for_winning_team_games/ — "I made a guide/tutorial for winning TEAM GAMES!" (2026-07-31). Player question: how to win team games. Observation: this is the **in-match** troop/gold donation context — the OP's guide covers "troop donations," "frontliner and backliner roles," and "the 42% rule" as in-lobby economy. Limitation: this is the *other* donation (in-match ally gold/troops), used here precisely to document the confusion and to keep the treasury guide from drifting into it.

Community consensus distilled: (a) the treasury is a real, relatively new, member-gated feature; (b) clans are the unit of persistent identity and the leaderboard is a ratio, not a point total; (c) joining/running a clan is a Discord-first activity; (d) the in-match donation is a separate, much more frequently discussed mechanic that people often call "the treasury" by mistake.

## YouTube videos actually opened and analyzed (page metadata + captions track present; caption *text* endpoint returned 0 bytes in this environment, so claims are grounded to title/channel/description and to source, not to caption transcription)

1. https://www.youtube.com/watch?v=q7nNbrEFSrM — "I am OFFICIALLY joining the BEST Clan in OpenFront?!" — channel TheBiff, published 2026-01-20, ~1353 views, 1h00m. A clan-joining/roster video; establishes that joining a notable clan is a content event and that clans have a visible membership + Discord. Captions track present (`caps=asr`) but text unfetchable here.
2. https://www.youtube.com/watch?v=olDiv-q8KMo — "OpenFront.io V28 Tutorial & Guide" — channel Enzo Plays, published 2025-12-29, ~119,943 views, 27m53s. Broad how-to-play; the in-match economy/donation section is what a treasury reader will compare against. Captions track present; text unfetchable here.
3. https://www.youtube.com/watch?v=IeR36481zsI — "OpenFront.io v31 Tutorial" — channel Enzo Plays, published 2026-04-25, ~56,808 views, 19m12s. Same channel's v31 tutorial; used to bracket version recency (v31 < v34.0), i.e. these tutorials predate the treasury feature and therefore cannot document it.

The consistent YouTube finding is the absence: no tutorial covers the treasury, because the feature shipped in v0.34.0 and the high-view tutorials are v27–v31. That gap is itself a finding — the treasury is under-documented in community video, which is the reason this guide exists.

## Rules/numbers/version boundaries pinned to primary sources (not to the community posts)

- Shipped in **v0.34.0**; still present and unchanged in the current release **v0.34.16** (tag verified in the upstream clone). The v0.34.16 release is telemetry-only and made no treasury changes.
- Soft = caps, hard = plutonium; both int64 decimal strings on the wire.
- One-way, non-refundable, members-only, idempotent-retry, whole-number ≥ 0, 400 on insufficient balance.
- The donation ledger lists player donations only; the true balance is `ClanInfo.softBalance` / `hardBalance`; other ledger reasons (win-share cut, admin adjustments, refund reversals) exist but are excluded from the public donations list.
- In-match `donateGold` / `donateTroops` are a different feature; do not confuse with the treasury.

## Open question carried into the guide

The open-source client defines the treasury *deposits* and the *balance display*, but the open repo at v0.34.16 does not expose the server-side **spend** path for the treasury (what the pooled caps/plutonium are actually consumed by in a clan context). The guide therefore states deposits and balances as verified, and frames "what does the treasury buy you in-game?" as the one thing a player should confirm with their clan / in the live game, rather than asserting an unverified in-game effect. This keeps the guide decision-useful (when and how much to donate) without inventing an unverified mechanic.
