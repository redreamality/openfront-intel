# Community Source Pack: Trade Versus Piracy

- **Research date:** 2026-08-27
- **Candidate slug:** `trade-vs-piracy`
- **Proposed player intent:** Decide when to run ordinary trade, when to fund Warships and pirate enemy Trade Ships, when to switch the trade relationship off, and when to abandon piracy for a safer economy.
- **Proposed route:** `/guides/trade-vs-piracy/`
- **Why this is not a duplicate:** `port-vs-factory` compares which economic structure to build, `team-naval-control` assigns a team's naval mission, and `warship-veterancy` explains individual ship experience and repair. This candidate answers the missing mode-switch decision: trade income versus piracy income, timing, diplomatic cost, capture eligibility, and a transition plan.
- **Community source count:** 4 valid Reddit discussions, 3 valid YouTube videos with verified English auto-captions.
- **Official source count:** 6 OpenFront first-party URLs (release, four tagged engine files, and one tagged test file).

## Reddit discussions (opened and read)

### 1. Which is more lucrative trading (with ships) or piracy?

- **URL:** https://www.reddit.com/r/Openfront/comments/1vz1qbo/which_is_more_lucrative_trading_with_ships_or/
- **Title:** “Which is more lucrative trading (with ships) or piracy?”
- **Date / relative age:** 7 hours ago when opened on 2026-08-27.
- **Accessed:** 2026-08-27.
- **Player problem:** The author explicitly asks which activity produces more Gold and gives no decision rule.
- **Usable observations:** One reply describes a practical phase split: trade in early and mid game, then pirate late when targets are abundant. Another says piracy is generally more lucrative but increases diplomatic danger, attracts attacks and bombs, and limits alliances. The proposed compromise is to pirate while the map is busy, keep enough Gold for deterrence, build Ports gradually, and convert to legal trade as the endgame approaches. A follow-up recommends preventive alliances with likely pirate chokepoints, checking a Port's outbound route, and threatening a Silo or Warship response when someone pirates you. This is direct evidence for a guide organized around a timing switch rather than a universal “always pirate” claim.
- **Limitations:** Six comments are anecdotal, no match telemetry or controlled Gold comparison is supplied, and the post does not identify map, version, Port levels, or travel distances. Treat the phase split as player language and a hypothesis to test against engine formulas, not as a numeric fact.

### 2. Ports math

- **URL:** https://www.reddit.com/r/Openfront/comments/1rzxw1d/ports_math/
- **Title:** “Ports math”
- **Date / relative age:** 5 months ago when opened on 2026-08-27.
- **Accessed:** 2026-08-27.
- **Player problem:** The author asks whether stacking many Ports improves income or causes diminishing returns, using a post-game test with an inactive partner.
- **Usable observations:** The author compares 228 Port levels arranged as one Port with 228 stacks, four Ports with 57 stacks, and 25 Ports with nine stacks. They report that stacking reaches penalties sooner and that a large global Port count behaves close to a zero-sum share of available Trade Ships. Replies add an important strategic contrast: piracy can have the best Gold-per-ratio, while Factories often scale better with many allies in team games. Another reply notes the v30 economy changed from fewer high-value Trade Ships to roughly four times as many lower-value ships, so old Port heuristics are stale. This supports explaining Port spacing, global saturation, and why the same build can differ by map and lobby.
- **Limitations:** The test is not a controlled experiment, uses an AFK partner and self-reported visual counts, and predates v0.33.11. It does not reveal the exact spawn-rate inputs, distance curve, or whether every measured ship completed its route. Engine code must supply current numbers.

### 3. Capturing trade ships

- **URL:** https://www.reddit.com/r/Openfront/comments/1sqygpx/capturing_trade_ships/
- **Title:** “Capturing trade ships”
- **Date / relative age:** 4 months ago when opened on 2026-08-27.
- **Accessed:** 2026-08-27.
- **Player problem:** The author cannot tell which red Trade Ships are actually eligible for capture.
- **Usable observations:** Replies consistently state that the ship must originate from an enemy and be travelling to an enemy destination; a ship going to the player's or an ally's Port is not capturable. A detailed comment adds practical checks: the pirate needs a Port, the ship must share the Warship's water component and patrol range, and a hidden shoreline safety timer makes a ship immune for 20 ticks after touching a shoreline tile. The visual red color is therefore insufficient. This is valuable guide language for a capture checklist and for explaining why open-ocean routes are riskier than coast-hugging routes.
- **Limitations:** The shoreline-immunity claim is a community explanation and must be treated as unverified until matched to `TradeShipExecution` and `WarshipExecution`. The post contains no map coordinates, timing logs, or version tag.

### 4. In a team game do my ports tradeships trade with players on my same team or only trade with players on opposing teams?

- **URL:** https://www.reddit.com/r/Openfront/comments/1u8ofdi/in_a_team_game_do_my_ports_tradeships_trade_with/
- **Title:** “In a team game do my ports tradeships trade with players on my same team or only trade with players on opposing teams?”
- **Date / relative age:** 2 months ago when opened on 2026-08-27.
- **Accessed:** 2026-08-27.
- **Player problem:** The author does not know the default Trade relationship in Team mode or how to change it.
- **Usable observations:** Replies say the default is trading with everyone. They point to the in-game action sequence: right-click owned territory, open Information, then choose “stop trading with all.” After that switch, trading is limited to allies and teammates, shown by a status icon. This creates a concrete defensive decision: keep open trade for income, or close it to deny enemy routes and reduce piracy exposure.
- **Limitations:** The comments are two months old and do not state whether labels or icons changed in later releases. They also do not distinguish temporary embargo from the global stop-trading command. UI wording must be checked against the current client before publication.

## YouTube videos (watch pages opened; English auto-captions verified)

### 1. What Happens if You Build a Peaceful Trade Island? | OpenFront.io

- **URL:** https://www.youtube.com/watch?v=6MjVf2HBvI8
- **Title:** “What Happens if You Build a Peaceful Trade Island? | OpenFront.io” by Enzo Plays.
- **Date / relative age:** Uploaded 2026-08-25; page showed “1 day ago” on 2026-08-27. Duration from the verified caption file is about 26:50.
- **Accessed:** 2026-08-27; English auto-generated subtitles downloaded and read.
- **Player problem represented:** How an island player can bootstrap Gold and survive while choosing between trade, boat attacks, and defense.
- **Usable observations from captions:** The narrator says island openings should get Gold fast, ally nearby players, and surprise targets with boat pushes. In the Levant 55-player match, the player takes a Port early, adds Cities when the local cap matters, sends boats to diversify island assets, and uses a Warship to steal a small amount of enemy trade. The stated objective repeatedly changes between defending the island, adding Ports, linking Factories, and avoiding a costly fight. The sequence demonstrates that a “peaceful” trade plan still needs a military branch and that a Port is an option only when the surrounding water and diplomacy leave ships alive.
- **Limitations:** Captions are auto-generated and occasionally misrecognize player names or unit terms. The video is a single entertainment match, not a controlled benchmark; no exact Port levels, route lengths, or Gold ledger is given.

### 2. What Happens When You Build the Ultimate Pirate Base? | OpenFront.io

- **URL:** https://www.youtube.com/watch?v=1UXRLtcpOe8
- **Title:** “What Happens When You Build the Ultimate Pirate Base? | OpenFront.io” by Enzo Plays.
- **Date / relative age:** Uploaded 2026-06-07; page showed “2 months ago” on 2026-08-27. Duration from the verified caption file is about 17:00.
- **Accessed:** 2026-08-27; English auto-generated subtitles downloaded and read.
- **Player problem represented:** Whether a remote island and Warship-first investment can turn trade-lane control into a winning economy.
- **Usable observations from captions:** The opening plan is to control one trade lane, offer as few alliances as possible, and keep enough alliances to avoid an early kill. The narrator repeatedly checks whether a lane has enough traffic to pirate, builds Warships to contest that lane, and later stops trading with selected players to cut their income. When the local lane dries up, the player adds Ports, Factories, Cities, SAMs, and land attacks instead of continuing to pay for idle ships. The end of the match explicitly recognizes that piracy cannot continue forever and that a transition to land/economic control is required.
- **Limitations:** The narrator uses subjective terms such as “really set up” and “not much trade,” with no repeatable threshold. Caption errors can invert a target name or action. Map topology and opponent behavior dominate the result.

### 3. I created a Pirate Island Masterpiece... | OpenFront.io

- **URL:** https://www.youtube.com/watch?v=mXttVXOsOkY
- **Title:** “I created a Pirate Island Masterpiece... | OpenFront.io” by Ultimus_Rex.
- **Date / relative age:** Uploaded 2026-08-15; page showed “11 days ago” on 2026-08-27. Duration from the verified caption file is about 53:02.
- **Accessed:** 2026-08-27; English auto-generated subtitles downloaded and read.
- **Player problem represented:** How to build a multi-island pirate base while surviving Warship pressure, alliances, embargoes, and nuclear threats.
- **Usable observations from captions:** The player treats islands as distributed assets, uses Ports and Warships to control several lanes, and repeatedly moves patrols toward whichever route has traffic. Captions note periods with “a lot of pirating,” then a clear pivot when the map stops paying: “we're no longer making money through pirating” and the player seeks Cities and safer income. The run also shows that enemy Warships, SAMs, embargoes, and bomb threats can make a profitable lane strategically negative. The practical lesson is to monitor actual captured traffic and opponent response, not to keep a pirate fleet on autopilot.
- **Limitations:** The video is a long single-player narration with auto-captions and no exported economic ledger. It demonstrates decisions but cannot establish average profit, capture probability, or a universal island count.

## Official OpenFront sources for fact checking

1. **Release boundary:** https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.11 (formal current release checked 2026-08-27; use this tag for public version wording).
2. **Trade execution:** https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/core/execution/TradeShipExecution.ts (capture state, redirect to a reachable Port after capture, route completion, and Gold award to captor or both trading Port owners).
3. **Port spawning and eligible destinations:** https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/core/execution/PortExecution.ts (10-tick spawn checks, global Trade Ship count and pity rejections, same-water-component filtering, `canTrade`, Port-level weighting, proximity bonus, and short-route exclusion).
4. **Warship targeting and piracy safety:** https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/core/execution/WarshipExecution.ts (target priority, patrol-range and component checks, enemy/allied destination filters, shoreline safe-from-pirates state, and capture eligibility).
5. **Current formulas and constants:** https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/src/core/configuration/Config.ts and tagged test https://github.com/openfrontio/OpenFrontIO/blob/v0.33.11/tests/core/executions/TradeShipExecution.test.ts. `Config.ts` defines `tradeShipGold` as `floor((75000 / (1 + exp(-0.03 * (distance - 300))) + 50 * distance) * goldMultiplier)`, a 300-tile short-range debuff, `tradeShipSpawnRate` based on global ship count and rejection pity, and Warship/Port constants. The test exercises capture redirection and Gold settlement.

## Research synthesis and candidate decision

Across the Reddit threads, the repeated question is not “what is a Port?” but “which income path should I fund in this position, and when does the answer change?” The newest thread asks directly for a trade-versus-piracy comparison. The Ports math post supplies a second angle: Port output is not simply proportional to Port count, because stacking and global Trade Ship supply can dilute marginal output. The capture thread supplies the tactical gate that players cannot see from the red icon alone. The Team-mode thread supplies an actionable relationship switch that changes who can send or receive trade. Together these are a single player outcome: preserve a profitable route while avoiding a route that funds an enemy or attracts a Warship.

The three captioned videos provide complementary match narratives. The peaceful-island run shows the low-risk opening language players use: rush Gold, ally enough neighbors to survive, then use boats and a first Port to create options. The pirate-base run demonstrates the high-risk branch: deny alliances, place Warships on a busy lane, and stop trading with targets that become threats. The long pirate-island run shows the essential exit condition: when traffic falls or opponents invest in Warships, SAMs, embargoes, or nukes, continued piracy consumes attention and Gold; switching to Cities, Factories, or legal trade is the rational move. None of these videos should be used to claim a fixed profit rate. They are evidence of decision contexts, player vocabulary, and failure modes.

The official code gives a precise, testable backbone for the future guide. Port execution checks for eligible destinations every ten ticks and chooses only players who can trade and share a water component. Destination weighting depends on Port level, distance, proximity bonuses, and friendliness, so map topology and diplomacy alter the opportunity set before a ship launches. The Gold function heavily penalizes routes below the 300-tile short-range threshold, then adds a distance term; therefore “more Ports” cannot substitute for a route that is both long enough and safe. A Trade Ship that is captured can be redirected to a reachable Port owned by the captor, and the captor receives the route's computed Gold when the ship completes. Warship targeting still filters by patrol range, water component, enemy destination, and shoreline safety, so piracy requires both a Port and a viable patrol position. These rules let a guide turn community anecdotes into a reproducible checklist: (1) estimate route distance and traffic, (2) inspect diplomacy and the stop-trading switch, (3) reserve Gold for Warship/SAM deterrence, (4) pirate only while expected captures justify the risk, and (5) pivot when traffic or safety fails.

The guide should make its assumptions visible so readers can reproduce the choice. A short route under 300 tiles is a poor trade baseline even if the destination is friendly, while a long route through an exposed strait may be a good piracy target only when the player already owns a Port and can keep a Warship on patrol. “Traffic” should be measured as observed enemy Trade Ships per minute, not as the number of Ports on the minimap. “Safe” should include the time needed to replace a lost Warship, the nearest same-component Port, current alliance cooldowns, and the opponent's ability to launch a nuke. A useful worksheet can record Gold gained from captures, Gold spent on Warships and repairs, and the number of ships lost during a ten-minute sample. This avoids repeating the community mistake of comparing one spectacular capture with an entire legal-trade economy. It also gives a clean stop signal: if two consecutive spawn checks produce no viable enemy route, or if patrol replacement costs exceed captured Gold, redirect the next Port level or City into a stable economy. In Team mode, repeat the same test after toggling “stop trading with all,” because friendly-only traffic can shrink revenue while removing the most dangerous pirate targets. These assumptions turn qualitative video stories into a falsifiable player decision without pretending that one map predicts every lobby.

The candidate therefore meets the production gates. It has a unique decision intent, repeated community demand, three usable YouTube caption sources plus four Reddit discussions, and current first-party evidence. The guide should present trade and piracy as a reversible strategy choice with explicit assumptions, not as a universal tier list. A two-scenario structure is ready: a safe early island with long routes and few Warships, and a late crowded sea where piracy is lucrative until an opponent adds patrols and the player must switch to legal trade or land economy. Existing guides can be linked for Port-versus-Factory construction, team naval mission, diplomacy, and Warship veterancy without duplicating their main answers.

## Access and verification notes

- All Reddit pages above were opened in the browser and their post plus visible comments were read on 2026-08-27. Search-result snippets were not used as evidence.
- All three YouTube watch pages were opened in the browser on 2026-08-27. English auto-generated caption tracks were downloaded and checked with `yt-dlp` because the in-browser transcript export was unavailable for these videos; the observations above cite caption timestamps and visible page metadata rather than search summaries.
- Official GitHub URLs were opened/read through raw tag content on 2026-08-27. Community sources are demand and language evidence only; numbers and version claims must use the official tag/source/tests in the eventual guide.
