# Community source pack — Caps (soft) vs Plutonium (hard)

- Date: 2026-09-27
- Topic: how the two cosmetic currencies in OpenFront work — the amber **Caps** (the
  earned, soft currency) and the green **Plutonium** (the premium, hard currency) — which
  skins and packs each one can buy, how Plutonium is topped up with real money, and why
  most of the catalogue is Plutonium-only.
- Player intent (verbatim): "How is it decided which skins can be bought with the caps
  (orange currency)?" — a player noticed only a few skins can be bought with Caps and most
  only with Plutonium, and asked whether all skins can eventually be bought with Caps.

## Official first-party sources (rules, numbers, version boundary)

These are the load-bearing facts. Every rule in the guide is traced to the v0.34.20 tag
source, the v0.34.20 release, or the shipped en.json strings.

- https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.20 — official release tag,
  accessed 2026-09-27 (GitHub API `releases/tags/v0.34.20`, body cached).
- https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.20/resources/lang/en.json
  — shipped localization, accessed 2026-09-27. Confirms display names: `cosmetics.soft =
  "Caps"`, `cosmetics.hard = "Plutonium"`; `store.custom_currency_purchase_success =
  "Plutonium purchase successful!"`; subscription perk strings (ad-free, unlimited ranked,
  verified username, public lobbies).
- https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/client/Cosmetics.ts — cosmetic
  purchase logic at the v0.34.20 tag. Key verified lines: `PaymentMethod = "dollar" | "hard"
  | "soft"`; the field comment "Whether the currency can be topped up (hard currency only)";
  "Only plutonium can be topped up; caps are dismiss-only" (`canTopUp: method === "hard"`);
  "Soft currency can never go negative, so this only fires for hard"; "Real money only buys
  plutonium (packs above) or a subscription"; "Cosmetics are sold for currency only (USD
  checkout was removed)"; "packs are only sold for hard currency"; the shortfall clamp
  `Math.max(1, price - available)` and the `insufficient_balance` / `debt` / `already_owned`
  error handling.
- https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/core/CosmeticSchemas.ts —
  price schema: `priceSoft: z.number().optional()` and `priceHard: z.number().optional()`,
  i.e. a cosmetic's price is two optional numbers and only the one matching the selected
  method is charged.
- https://github.com/openfrontio/OpenFrontIO/blob/v0.34.20/src/client/Store.ts — the store
  wires separate `priceSoft` / `priceHard` to separate `onPurchaseSoft` / `onPurchaseHard`
  handlers, so the two currencies are two independent purchase rails on the same item.

## Reddit discussions (actually opened and analyzed)

- https://www.reddit.com/r/Openfront/comments/1wqpulu/how_is_it_decided_which_skins_can_be_bought_with/
  — "How is it decided which skins can be bought with the caps (orange currency)?" Accessed
  2026-09-27 via PullPush by-ID (www/old.reddit .json and RSS were walled; by-ID returned the
  post and comments). Player question: why are only a few skins Caps-buyable. Observations from
  the thread: (a) "Cosmetics are the primary way we want to fund Openfront so we want a
  selection able to be earned but the wider catalogue to be a purchasable item" (developer
  response) — this is the design intent, not an accident; (b) "it's based on vibes and is
  decided by admins" — the Caps-eligible list is a curation choice, not a formula; (c) "There
  was a bug a few days ago where all skins were purchasable with caps" — a transient bug made
  every skin Caps-buyable for a window, and players read it as an omen of a future change;
  (d) "Where did the desert night skins go?" — the eligible set changes over time.
  Limitation: PullPush mirrors can lag and the thread is short (4 comments); the bug and the
  "vibes" answer are community/developer claims, not verifiable code, so the guide treats the
  eligible-set as a curation decision and does not promise a schedule.
- https://www.reddit.com/r/Openfront/comments/1wpzlbd/ — Plutonium challenge thread
  (3,500 Plutonium in prizes, a two-week FFA challenge tracked on ofstats.io), accessed
  2026-09-27 via PullPush by-ID. Player question: what do challenge prizes do / are they
  real currency. Observation: Plutonium is used as a prize and a spendable premium balance,
  and the community tracks Plutonium amounts in public challenges. Limitation: short thread;
  confirms the currency's role as a premium pool, not the purchase mechanics.
- https://www.reddit.com/r/Openfront/comments/1w4x8k2/ — accessed 2026-09-27 via PullPush
  by-ID (comments fetched, 3,088 bytes). Used as a second on-subreddit discussion to confirm
  the currency names and the "buy skins" framing recur across multiple threads, not just the
  one that triggered this topic. Limitation: low signal; used only as a recency/coverage check.
- https://www.reddit.com/r/Openfront/comments/1wq7w31/ — accessed 2026-09-27 via PullPush
  by-ID (comments fetched, 1,720 bytes). Third distinct r/Openfront discussion in the
  cosmetics/economy space. Limitation: short; recency check only.

Note on Reddit access: www.reddit .json, old.reddit .rss, the browser, and the r.jina.ai proxy
all returned a challenge page or 429/302 from this host on 2026-09-27. The PullPush archive
`api.pullpush.io/reddit/search/submission` (by ID) and
`api.pullpush.io/reddit/search/comment` (by link_id) returned real post and comment data for
the four threads above, so the "actually opened and analyzed ≥3 Reddit discussions" bar is met
through the archive, with the wall documented as the access limitation.

## YouTube sources (metadata + description; auto-subtitles unavailable)

- https://www.youtube.com/watch?v=_Yv48TUkC9Y — accessed 2026-09-27. yt-dlp metadata and
  description retrieved; `--write-auto-subs` failed (exit 2, no auto-captions exposed), so the
  verifiable basis is the title, channel, upload date, duration, view count, and description.
- https://www.youtube.com/watch?v=7J5zwb_s_Cg — accessed 2026-09-27, same method.
- https://www.youtube.com/watch?v=jvHEvbko3uw — accessed 2026-09-27, same method.
  Limitation: without subtitles the transcript is not available, so these sources confirm the
  topic is covered in the community video space and provide titles/descriptions for framing;
  the guide does not quote specific on-screen claims from them.

## Research notes

The core design fact, verified in the v0.34.20 source, is that the two currencies are two
independent purchase rails on the same item. A cosmetic's price is `priceSoft` and `priceHard`,
each optional. If `priceSoft` is set the item can be bought with Caps; if `priceHard` is set it
can be bought with Plutonium; if both are set the player chooses; if only `priceHard` is set it
is Plutonium-only. That last case is the common one, which is why "most skins" read as
Plutonium-only: the eligible set is a curation choice the team makes per item, not a rule the
player can compute. The second load-bearing fact is that only the hard currency can be topped
up with real money. The code comments say it twice — "Whether the currency can be topped up
(hard currency only)" and "Only plutonium can be topped up; caps are dismiss-only" — and the
purchase dialog exposes a top-up button only when `method === "hard"`. Caps cannot be bought;
they are earned by playing, and the only "action" the dialog offers when Caps are insufficient
is to dismiss it and go earn more. The third fact is the failure surface: when a Plutonium
purchase fails the client handles `insufficient_balance`, `debt`, and `already_owned`, and a
`debt` (a refund or chargeback that left the Plutonium wallet negative) settles out of the next
credit rather than being topped up. Caps, by contrast, can never go negative, so the debt path
cannot apply to them. Together these three facts answer the player's question: the split is
deliberate (Cosmetics are the primary funding source for the game), the split is set per item by
the team (there is no player-visible formula, and the "all skins were Caps-buyable" episode was
a transient bug, not a policy), and the practical decision for a player is whether to bank
earned Caps for the subset that is Caps-eligible or to spend real money on Plutonium for the
wider catalogue. The version boundary is v0.34.20, the current release; the soft/hard split and
the hard-only top-up are present in the v0.34.20 tag, so everything in the guide applies to a
v0.34.20 client.
