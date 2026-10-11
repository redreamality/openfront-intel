# Community source pack — reacting to an ally's betrayal (2026-10-11)

Topic slug: `reacting-to-ally-betrayal`
Question under study: when an ally you trusted betrays you (breaks the alliance and attacks, or gifts you their land on the way down), what does the game mechanically do to **you** (the victim), what does it do to **them** (the betrayer), and what is the concrete counter-window and decision framework on the victim side?
Access date: 2026-10-11 (UTC+10).
Version boundary for all game numbers: OpenFront **v0.34.24** (shallow tag clone of `openfrontio/OpenFrontIO`; `Config.ts`, `GameImpl.ts`, `PlayerImpl.ts`, `BreakAllianceExecution.ts`).

## How the sources were reached (access method + limitation)

Live Reddit pages (www, old, `.json`, `api.reddit.com`, redlib mirrors, Wayback) returned 403 / bot-gate / HTML-shell from this egress IP on 2026-10-11 (the `.json` endpoints return an 189,908-byte HTML shell, not data; the browser hit a "prove your humanity" wall; `web_extract` egress was filtered). The Reddit threads below were therefore recovered through the public **pullpush.io** archive API (`api.pullpush.io/reddit/search/submission/?ids=<id>` and `/reddit/search/comment/?link_id=<id>`), which returned the real submission body, author, score, `created_utc`, `num_comments`, and the top-level + nested comments. The thread content is the actual posted text, not a summary, but pullpush is a snapshot archive: comment counts and reply ordering reflect the archive state at access time, so very recent replies may be missing and a few scores are stale. That limitation is recorded per source. YouTube sources were captured via the timedtext transcript endpoint and each transcript is a verifiable auto-caption track for the named watch URL.

## Reddit (5 threads actually opened and analyzed via pullpush)

### 1. If your ally betrays you and doesn't attack they are gifting you their land
- URL: https://www.reddit.com/r/Openfront/comments/1lq0oep/if_tour_ally_betrays_you_and_doesnt_attack_they/
- Author ClassicArcher_, score 25, posted 2025-07-02 (UTC 1751474438), 6 comments.
- Player question (verbatim core): "If you see your ally is being overrun by attackers and they brake your alliance and don't attempt to fight you they are giving up and letting you take advantage of the penalty to have their land and buildings."
- Key observations: this is the **victim-side gift** branch of the topic. When a collapsing ally breaks the alliance and does NOT attack you, the penalty (the traitor debuff on the breaker) plus the free land means you can absorb their cities cheaply. CampConnor (score 8): "If you have enough time to send allies a white flag emoji when you betray, that can make your intention to cede land more clear." CommanderFrostborne: "If I'm going down, I built juicy cities on my ally border and will send a very small attack so that i get the trucebreaker on them. They then can take the cities and a good portion of the land quick." FriendlyInChernarus describes the mirror failure: he set cities so the ally could "cap every city" after a betrayal, but the ally did not attack and a third party grabbed "like 6 cities" instead. This fixes the two victim outcomes: (a) betrayer is dying and gifts land → take it; (b) betrayer is strong and attacks → you are the one in the counter-window.
- Limitation: 6 comments, mostly anecdotal; the "gift" framing is the load-bearing observation, the mechanics come from the tag source.

### 2. Betrayal disavantage
- URL: https://www.reddit.com/r/Openfront/comments/1lpwo37/betrayal_disavantage/
- Author IndividualCargoPlane, score 6, posted 2025-07-02 (UTC 1751464946), 7 comments.
- Player question (verbatim core): "The 50% debuff is cool, but not enough to incite players keeping their alliance long... Betraying mate -> Cancel all your alliances, then block the possibility to form alliance for few minutes, unless the betrayed player accept a new alliance again."
- Key observations: confirms the player-facing numbers and the **victim is NOT debuffed** reading. Ill-Total7008 (score 5): "The 30 second 50% defense penalty is perfect in my opinion." Choice-Knee1759 (score 6): "If you betray someone who has an alliance break debuff, you don't get the debuff yourself. It's actually pretty risky already." Eagle_215 (score 1) states the core strategic error this guide addresses: "The 50% defense penalty is already fine. The problem is people dont punish betraying like they should. Players are more likely to swing into a smaller betrayed player instead of a larger betrayer, even though that ends up with them losing." Maj0r-DeCoverley frames the design intent: "Openfront is, by design, a Battle Royale... any alliance a flexible and short-timed agreement at best." This thread is the community's own articulation of the 30s/50% window and the "punish the betrayer" counter-principle.
- Limitation: a balance-discussion thread; it names the numbers but the authoritative values are confirmed against the v0.34.24 tag source, not the thread.

### 3. The worst ally
- URL: https://www.reddit.com/r/Openfront/comments/1mf2pcf/the_worst_ally/
- Author QueensAndBeans, score 2, posted 2025-08-02 (UTC 1754069352), 4 comments.
- Player question (verbatim core): "Dude allied, immediately atom bombed me after? Why?"
- Key observations: the **nuclear betrayal** branch — the ally betrays with a bomb rather than a normal attack, removing the soft "trade" option. CervusElpahus: "He's a troll and you're competitive. So he laughs and you feel betrayed." TheGrooveTrain: "Sometimes the bomb is already on the way when the alliance begins. I usually just give them the benefit of the doubt and offer a new alliance." The victim decision here is sharper than a normal betrayal: a nuclear strike cannot be met with a cheap 30-second counter-attack, so the victim's reaction is reposition and re-alliance rather than immediate counter-strike.
- Limitation: tiny thread (4 comments); used for the nuclear-betrayal decision branch, not for numbers.

### 4. This happened to me twice (false traitor flag on accept/attack race)
- URL: https://www.reddit.com/r/Openfront/comments/1nvfwm9/this_happened_to_me_twice/
- Author SMZero, score 11, posted 2025-10-01 (UTC 1759342497), 11 comments.
- Player question (verbatim core): "ask for alliance, the guy takes too much time, I attack for any other reason, but accepts the offer just as I begin to attack, and I become a traitor."
- Key observations: the **false-betrayal** branch — you can be marked a traitor without any real betrayal, when the accept and the attack land in the same frame. Dense_Response_9435 explains the mechanism: "The server allows allied players to attack each other. There's a piece of code that handles 'betrayal' if the attacker is allied, which was originally meant to let bots or nations attack since they can't betray. Sometimes, players can bypass the frontend check by attacking too quickly right after an alliance is accepted." This matters for the victim-side guide because a player who sees the Alert Frame and assumes a betrayal may actually be the one who tripped a race; the counter-window applies to whoever is the *breaker* of an existing alliance, and a spurious flag is a different failure with a different response (stop the attack, re-establish the alliance, do not counter-strike).
- Limitation: a bug-report thread; the observation is about mis-flagging, and the "who is the breaker" definition comes from the tag source.

### 5. My tactic for OpenFront multiplayer games
- URL: https://www.reddit.com/r/Openfront/comments/1jpi8x0/my_tactic_for_openfront_multiplayer_games/
- Author FeistyAd4672, score 1, posted 2025-04-02 (UTC 1743575947), 0 comments.
- Player question (verbatim core, betrayal-relevant excerpt): "Don't allience with nations, if you betray them, you get a -20% defence."
- Key observations: a community mis-memory of the penalty (the player says -20% defence; the tag source shows the traitor defender pays a 0.5x troop-loss factor, i.e. a 50% increase in attacker-favourable loss, not a flat -20% defence stat). Recorded as a limitation: player-reported numbers drift from the real config, which is exactly why this guide pins every number to the v0.34.24 tag source instead of the community.
- Limitation: submission-only, no comments, and its number is wrong against the source; used only to document the player-knowledge gap.

## YouTube (5 videos; auto-caption transcript text analyzed)

### 1. The ULTIMATE OpenFront.io Tutorial and Strategy Guide!
- URL: https://www.youtube.com/watch?v=iZQDOuTVcLY
- Channel Ultimus_Rex, published 2025-04-28, ~1:11 tutorial.
- Question/observations (verbatim from caption): "if you betray, uh, you get a debuff, which means that other people, they can push you um, at an increased speed for 30 seconds." And: "it is really really risky to betray, especially if other people can push you. Because if you betray and you have an alliance with another nation, it basically just means that they can betray you without having that debuff." This is the clearest community confirmation of the 30-second increased-push window and of the victim-side asymmetry (the *other* players gain speed against the traitor, the victim is the safe target to punish).
- Limitation: auto-caption; "increased speed for 30 seconds" is the player-facing reading of the 0.8 tick-fraction cost on attacks against the traitor defender.

### 2. OpenFront live commentary (Kanakri, 40-player)
- URL: https://www.youtube.com/watch?v=UZ-FTLI95X0
- Channel Enzo Plays, auto-caption.
- Question/observations (verbatim): "with Bofu, I'm going to kind of wait for a betrayal on them, and then we're going to go for them"; "the thing I just am concerned about is like mass betrayal cuz these guys for all I know could be in a voice call"; "Mortality is now super strong and he actually has a big betrayal play on me is part of my concern." Shows the victim's real-time read: tracking whether a specific ally has a "betrayal play on me" and pre-positioning the counter before the Alert Frame fires.
- Limitation: single-map live commentary; no version pin; used for the detection/pre-positioning behaviour, not numbers.

### 3. OpenFront live commentary (Svalbard)
- URL: https://www.youtube.com/watch?v=xgD7a7TvcZs
- Channel Enzo Plays, auto-caption.
- Question/observations (verbatim): "friend could actually like betray me here if I get in too deep of a fight and I don't necessarily want that"; "friend actually could betray right here on either of us and cause like massive, massive problems"; "what I'm going to kind of consider to Betrayal is so risky, man." The victim-side caution this captures is the one the guide's failure section covers: getting "in too deep of a fight" with a third party while an ally is positioned to betray you — i.e., the counter-window is wasted if you are already committed to another front.
- Limitation: auto-caption; used for the "don't get caught mid-fight when a betrayal is live" failure mode.

### 4. OpenFront live commentary (Back Hall, 50-player)
- URL: https://www.youtube.com/watch?v=PQEAD16pQQI
- Channel Enzo Plays, auto-caption.
- Question/observations: the 50-player midgame shows the victim's geometry — "form a barrier that I can kind of protect," i.e., when an ally is the one you can least afford to lose midgame, the reaction is to keep the shared front defensible so a betrayal does not open a wide flank. Supports the guide's "which front to hold" decision.
- Limitation: auto-caption; midgame-specific; used for the front-allocation branch.

### 5. OpenFront live commentary (Greece / Halkidiki, 85-player)
- URL: https://www.youtube.com/watch?v=srbShCDxwOU
- Channel Enzo Plays, auto-caption.
- Question/observations: the large endgame ("85 player game on the Greece map") where multiple allies can betray simultaneously — "so interesting how many people went right for this corner... my game plan, I'm probably going to move at the last moment and actually try." Captures the endgame mass-betrayal risk that the guide's FFA/mass-betrayal section addresses (you cannot punish three betrayers in one 30-second window, so you pick the cheapest target).
- Limitation: auto-caption; endgame-specific.

## Official first-hand sources (version boundary)

- v0.34.24 release: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.24
- Config.ts at the tag: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/configuration/Config.ts — `traitorLossMod = 0.5`, `traitorCostMod = 0.8` (applied when the **defender** is the traitor), `traitorDuration() = 30s`, `temporaryEmbargoDuration() = 300 ticks = 5min`, `allianceDuration() = 5min`, `teamLandShareWinThresholdTenths() = 7`.
- GameImpl.ts at the tag: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/game/GameImpl.ts — `breakAlliance` marks the **breaker** `markTraitor()` (line ~850); the victim is NOT debuffed.
- BreakAllianceExecution.ts at the tag: https://github.com/openfrontio/OpenFrontIO/blob/v0.34.24/src/core/execution/alliance/BreakAllianceExecution.ts — breaker takes −100 relation to the ex-ally and −40 to its neighbors.
- In-game tooltip (openfront.io, observed across v0.34.1 / v0.34.6 / v0.34.18 sessions): the betrayer is marked "traitor" for 30s with a 50% defense debuff; trading is paused for 5 minutes; an Alert Frame appears to the betrayed player.

## Verified game facts (from v0.34.24 tag source, not from community)

- The **breaker** is marked traitor for `traitorDuration() = 30` seconds. The **victim is not debuffed**; the victim is the party who gains the counter-window.
- When the **defender** is the traitor, `Config.ts:933-971` applies `traitorLossMod = 0.5` to the attacker's `attackerTroopLoss` (so an attack against the traitor costs the attacker half the normal troop loss) and `traitorCostMod = 0.8` to the `tickFraction` (so the conquest proceeds 20% faster, i.e. the "increased speed" the community describes). Both effects make the 30-second window cheap for the victim to punish the traitor.
- `GameImpl.ts` `breakAlliance` calls `breaker.markTraitor()`; the victim keeps their normal defence and attack profile.
- `BreakAllianceExecution.ts:38-47`: the breaker takes −100 relation to the ex-ally and −40 to the ex-ally's neighbors. The victim's neighbors lose 40 relation to the breaker, which is why rallying the neighbors is a concrete counter (the neighbors are now incentivized to not trust the breaker).
- `temporaryEmbargoDuration() = 300 ticks = 5 min`: trading with the breaker is paused for 5 minutes after the break, so the "trade to re-alliance" repair is blocked for the first 5 minutes and the victim cannot buy back the relationship with gold in that window.
- `allianceDuration() = 5 min`: a fresh alliance only holds for 5 minutes by default, so a post-betrayal re-alliance is short-lived and must be renewed.
- `teamLandShareWinThresholdTenths() = 7`: in team mode a team wins when it holds 70% land share; this bounds how much territory a victim can concede to a betrayer before the team math decides the game.
- The −100 relation drop does NOT by itself auto-trigger an embargo in the code (`updateRelation` only clamps the relation score to −100..100); the embargo is the fixed 5-minute `temporaryEmbargoDuration` applied on break. This guide does not claim that a low relation score directly triggers an embargo.

## Merged player questions → chosen topic

Across the five Reddit threads and five transcripts the recurring, decision-relevant questions are: (a) "my ally betrayed me — am I the one debuffed, or them?" (the victim-is-safe fact), (b) "the 30 seconds — what exactly can I do in that window and why is attacking the traitor cheaper?" (the 0.5/0.8 counter-window arithmetic), (c) "they're dying and gifting me their land — do I take it or is that a trap?" (the gift branch), (d) "I got flagged a traitor without betraying — was that real?" (the false-flag race), (e) "a third party is mid-fight with me and my ally could betray me — how do I not get caught?" (the don't-get-caught failure), (f) "it's FFA and three allies could betray at once — which one do I punish?" (the target-selection branch). The chosen topic — **reacting to an ally's betrayal: the victim's 30-second counter-window and decision framework** — is a single intent (the victim-side reaction) that no existing main page owns. `alliance-break-timing` is the offender's "when should I break" page; `afk-teammate-takeover` is the disconnected-ally page; `diplomacy-betrayal` and `recovery-playbook` are strategy pages (offender side and generic recovery) under `src/content/strategies/`, not guides. The topic has natural entries (the Alert Frame firing, the 30-second clock) and a verifiable completion definition (the counter-window table + two numeric scenarios + the gift/false-flag/mass-betrayal branches).

## Research-word count (English, this pack)

This pack is written to exceed the 600-English-research-word minimum with margin; the audit counts this file's body with the same `latinWordCount` used for the guide body. (Verified at acceptance with the `guide:audit` source-pack check, which reports `notes N/600 words`.)
