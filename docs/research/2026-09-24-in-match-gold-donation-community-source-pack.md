# In-match Gold Donation — community source pack (2026-09-24)

Topic: when a player should donate **gold** (not troops) to a teammate in a live Team match, using the in-match `donate_gold` / `donate_troops` radial action (`SendResourceModal`, presets 10/25/50/75/100%, 100-tick per-target cooldown). Distinct from the Clan Treasury (`clan-treasury-donations`) and from the `strategies/team-roles` donation switch/cooldown framing.

Access date: 2026-09-24. All rules/numbers re-verified against the official `v0.34.17` tag and generated data below.

## Official primary sources (rules, numbers, version boundary)

- https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.17/src/core/execution/DonateGoldExecution.ts — executes the gold transfer: `removed = player.removeGold(amount); recipient.addGold(removed)`; guarded by `canDonateGold`.
- https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.17/src/core/game/PlayerImpl.ts — `canDonateGold` (alive, friendly, human-to-human, 100-tick per-target cooldown via `lastGoldDonationTo.get(recipientUid)`), `donateGold`, and the comment "Configures donations to humans only."
- https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.17/src/core/configuration/Config.ts — `donateCooldown` default 100 ticks, `donateGold` / `donateTroops` config fields, `goldAdditionRate`, `goldMultiplier` (default 1).
- https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.17 — latest non-TEST release (2026-09-23); telemetry/stats only, no gameplay change.
- Version boundary: `DonateGoldExecution.ts` first appears in `v0.32.0` (earlier `v0.31.12-beta`); present through `v0.34.17`. Game tick rate = 10 ticks/second, so 100 ticks = 10 seconds.

Confirmed mechanics (from the tag source):
- Gold and troop donations are **human-to-human only** (a human cannot donate to a bot; a bot cannot receive). Bots have 0 gold.
- Both players must be **alive** and the target must be **friendly** (same team / allied).
- Cooldown is **100 ticks (10 s) per (donor, recipient) pair**, tracked separately for gold and for troops. You may donate to a different teammate immediately.
- The send modal presets are **10 / 25 / 50 / 75 / 100 %** of your current balance, with a fine slider. **Gold has no recipient capacity cap** ("Internal capacity only for troops; gold is unlimited"), unlike troops which are capped by the recipient's troop capacity.
- `Relation` (trust/loyalty) is an AI-only concept; in-match donations between human teammates do not modify any human-facing relationship. The only effect of an in-match gold donation is the gold itself.

## Reddit discussions (actual content, via PullPush archive)

1. https://www.reddit.com/comments/1l6qn9o/ — "Why does no one send troops?" (r/OpenFront, ~25 comments, oldest 2025-06-09). Player question: how/why do teammates send resources; many say the action is hard to find. Observations: players discover donation late ("I had to watch a video before I knew that it was even an option"); veterans run a backline "feeder" at ~75% workers / 75% attack and send 10–20k troops to keep a surrounded ally holding; community agrees the donate option is easy to miss. Limit: thread is troop-framed but the same radial menu carries `donate gold`, and the confusion ("how do I send money or troops") is shared.
2. https://www.reddit.com/comments/1qzbghj/ — "Why do teammates hoard troops?" (r/OpenFront, ~9 comments, oldest 2026-02-08). Player question: teammates keep all their troops/gold and die. Observations: 30–50% of players don't know donation exists; an SOS emoji is the de-facto "send me help" signal; spamming the send button to 4–5 non-donating players has "turned around some losing team games"; several request a "donate / ignore" prompt on request messages. Limit: small thread.
3. https://www.reddit.com/comments/1mnvtuw/ — "Average Openfront team game teammates" (r/OpenFront, ~25 comments, oldest 2025-08-12). Player question: what do good team players actually do. Observations: a new player "took a couple minutes of frantic searching to figure out how to send money or troops… deeply unintuitive design… behind the 'i' in a circle"; the winning shape repeatedly described is a **protected feeder in the back pumping a single designated steamroller** ("pump a single player with troops to be the designated steamroller"); several argue a few big supported players beat many equal players; ports/cities debate is live. Limit: mixed topics (roles, spawning, griefer teammates).

## YouTube videos (EN subtitles verified and parsed)

1. https://www.youtube.com/watch?v=xPk61xZdad0 — "OpenFront Team Game Guide - How to Win More Team Games" (Lonely_Millennial, 2026-07-31). Economy/team play walkthrough; covers worker-vs-attack ratio, front-line support, and sending resources to keep an ally alive. Subtitle text parsed (≈5.3k words).
2. https://www.youtube.com/watch?v=hhpCq14EeCA — "This is how you make HUGE MONEY! | OpenFront.io" (Ultimus_Rex, 2026-03-28). Trade/economy focus; gold accumulation and trade-route income (gold as the spendable resource). Subtitle text parsed (≈31k words); direct gold-donation relevance is low (economic framing), used to ground the "gold funds production" premise.
3. https://www.youtube.com/watch?v=MjZnWlOAH58 — "I controlled the MOST VALUABLE trade route! | OpenFront.io" (Ultimus_Rex, 2026-04-23). Trade-route dominance and city economics; reinforces that cities/ports convert land into gold income, which is what a donated gold burst should buy. Subtitle text parsed (≈40k words).

## Merged player questions → guide intent

- "How do I even send gold/troops to a teammate?" (all three Reddit threads + xPk61xZdad0) → where the action lives and the presets.
- "Why does no one donate / why do teammates hoard?" (1l6qn9o, 1qzbghj) → the decision rule for *when* to send and *gold vs troops*.
- "What does a good backline feeder actually do?" (1mnvtuw) → gold-to-feeder vs troops-to-anchor role logic and the single-steamroller snowball.

## Guide intent (unique, non-overlapping)

The guide owns the **in-match gold-donation decision**: which ally gets gold vs troops, how the per-target 10-second cooldown and the 10/25/50/75/100 % presets shape the call, and how to avoid feeding a doomed ally. It does not cover the Clan Treasury (stored pool, between matches) or the generic donation switch/cooldown framing (team-roles), so it is not a duplicate of either existing answer.
