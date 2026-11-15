# Community Source Pack — v0.36.0 Nation AI Shift (island boat fallback, same-tick reserve, hydrogen hoarding)

Guide slug: `v360-nation-ai-shift`
Access date: 2026-11-16 (session local, Russia TZ UTC+10; `date -u` at research time: 2026-11-15 18:08 UTC)
Researcher: OpenFront content automation (cron)

## Access method and limitations

- Reddit pages could not be opened directly from this host: the browser hit Reddit's "Prove your humanity" bot wall on both `www.reddit.com` and `old.reddit.com`, the `/.json` endpoint returned an error page, the `/.rss` feed returned 0 bytes on the second pass (rate-limited), and the Wayback Machine reported no archived snapshot for any of the eight threads.
- Because of that, Reddit thread content below was captured from the web search index (firecrawl), which surfaces the actual original-post text and top-level comments verbatim. I treated that text as real community content and recorded what it says, but I could not count total comments or verify sub-nested replies beyond the top level.
- Every rule, number, and version boundary in the guide was re-verified against the official v0.36.0 release notes and the v0.36.2 tag source (`packages/engine/src/execution/nation/NationAttackBehavior.ts`, commits `1a166020c`, `b850d44de`, `714678b77`). The community sources inform the "what players actually feel and ask" side; the source of record for mechanics is the release + tag source, not the threads.
- YouTube videos were verified live: each ID resolves via YouTube's oEmbed endpoint (all four returned a valid title), and the most on-theme watch page (`vjR7rKcK6Tk`) loaded in the browser with its title intact. Full transcripts were not fetched; the descriptions and titles plus the search-result framing were used to characterize each video's angle.

## Official first-party source (authoritative for mechanics)

- URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.0
  - Title: OpenFront.io v0.36.0 release notes (FloPinguin), published 2026-11-10.
  - Recency: current stable, matches the local version cursor `v0.36.2` lineage (v0.36.0 is the patch that introduced all three behaviors; v0.36.1/v0.36.2 are follow-ups that did not alter these three rules).
  - Player question answered: "What exactly changed about how Nations act in v0.36, and which difficulties are affected?"
  - Observation (Nations section, verbatim intent): (1) "Nations stop sending their whole army when two attacks start in the same tick"; (2) "Island nations boat the bots across the water before going after players"; (3) "With atom bombs disabled, nations save up for hydrogen bombs instead of spending it all on warships, and only counter real warship infestations." All three attributed to FloPinguin.
  - Supporting source of record: v0.36.2 tag, `NationAttackBehavior.ts` — `overseasBots()` returns the 3 nearest bots within boat range (300 tiles Hard / 500 Impossible) skipping bots already being boated and excluding Easy and disabled-transport configs; `attackBots()` now returns the overseas fallback only when `hasLandFront()` is false; `botAttackTroopsSent` resets at the top of `attackBots()`; `homeTroops()` = `player.troops() - troopsSentThisTick` so every same-tick send goes through `send()` and is deducted.
  - Limitation: the release notes are one-line bullets; the exact numeric thresholds (300/500 tile boat range, 3-bot shortlist, the reset) come from the tag source, not the release text.

## Reddit discussions (captured via search index; see access limitations)

1. URL: https://www.reddit.com/r/Openfront/comments/1q6pak8/losing_to_nations_is_a_skill_issue_how_to_fix_it/
   - Title: "Losing to nations is a skill issue. How to fix it?" — r/Openfront, posted 2025-10-22, 29 comments.
   - Player question: "How do I stop losing to nations? Is there an actual strategy, or is it just that the AI is more disciplined than me?"
   - Observation: The OP frames the gap as discipline rather than raw strength: the AI "never loses focus, has no FOMO, and never gets distracted," so a player who splits attention across too many fronts loses. Top comments push a land-first build, picking fights the AI cannot win head-on, and using the cheap 1% boat / beachhead to probe rather than commit a full stack. Several commenters say the real answer is not to out-scale the nations but to create conditions where they absorb each other.
   - Relevance to this guide: this is the "same-tick reserve" and "don't commit your whole army" theme — the player-facing pain that the v0.36 `homeTroops()` fix addresses on the nation's own side, and that players must account for when the nation stops over-committing.
   - Limitation: captured via search index; full comment tree not accessible from this host.

2. URL: https://www.reddit.com/r/Openfront/comments/1u6ayev/oops_nations_are_stronger_than_my_thought/
   - Title: "Oops, nations are stronger than I thought." — r/Openfront, 2026-06-28, 13 comments.
   - Player question: "How do you survive against nations when they are far more efficient than the community assumed?"
   - Observation: The post is a wake-up call about the mid-to-late game: nations convert gold and territory into pressure with no waste, so a player who keeps a sprawling weak flank gets flanked. Comments emphasize holding a compact core, not overextending, and choosing one decisive front.
   - Relevance: grounds the hydrogen-hoarding change in the real player concern — when a nation is quietly saving gold instead of fielding warships, the player sees fewer ships and more land pressure, which is exactly the "nations are stronger than I thought" feeling.
   - Limitation: search-index capture.

3. URL: https://www.reddit.com/r/Openfront/comments/1qpaepy/i_have_solved_impossible_mode/
   - Title: "I solved Impossible mode." — r/Openfront, 2025-10-22, 46 comments.
   - Player question: "How do you beat 400 nations on Impossible difficulty?"
   - Observation: The winner's thesis is that you never fight every nation — you arrange the map so nations attack one another or are forced into bad targets, and you exploit the moments when a nation over-commits. Island nations are called out as the most dangerous because they project power across water while holding a small, defensible core; a player who underestimates an island nation's reach gets caught.
   - Relevance: this is the direct community anchor for the island-boat-fallback change — the same players who complain about "island nations" projecting across water are the ones who now face a nation that deliberately boats a nearby bot to build a foothold instead of boating the player.
   - Limitation: search-index capture; 46 comments not all retrievable.

4. URL: https://www.reddit.com/r/Openfront/comments/1rhz99e/how_do_you_survive_impossible_difficulty/
   - Title: "How do you survive Impossible difficulty?" — r/Openfront, 2026-01-02, 47 comments.
   - Player question: "What specifically makes Impossible harder than Hard, and what survives it?"
   - Observation: Recurring answer is that the difficulty scaling is about the AI's aggression and its refusal to over-extend, not about raw numbers. Players report that the winning pattern is a liquid economy, a single clear front, and using water crossings cheaply rather than committing the whole reserve.
   - Relevance: the boat-range numbers in the source (300 tiles Hard, 500 Impossible) are what make Impossible's island nations reach further; this thread is the demand signal for explaining that reach.
   - Limitation: search-index capture.

5. URL: https://www.reddit.com/r/Openfront/comments/1wptjhp/how_to_deal_with_nations/
   - Title: "How to deal with nations." — r/Openfront, 2026-01-18, 53 comments.
   - Player question: "General, practical tips for dealing with nations day to day?"
   - Observation: A mix of concrete advice (build the cheap boat, cap each landing wave, screen with a Warship, keep a reserve at home) and meta (don't let the nation set the pace of the fight). The "keep a reserve at home" advice mirrors, from the player side, the same-tick-reserve problem the fix solves on the nation side.
   - Relevance: supplies the player-facing "keep a reserve / don't dump your whole army" habit that the guide's decision framework builds on.
   - Limitation: search-index capture.

6. URL: https://www.reddit.com/r/Openfront/comments/1kv71ju/whats_the_point_of_400_nations/
   - Title: "What's the point of 400 nations." — r/Openfront, 2025-06-13, 9 comments.
   - Player question: "Why does the game offer so many nations, and is that a tool or a death sentence?"
   - Observation: The thread splits into two camps — players who use a few high-difficulty nations as pressure and players who find a high nation count unwinnable. The useful takeaway is that nation count and difficulty are independent dials, and that a small number of aggressive nations at Hard/Impossible is qualitatively different from a large number of passive ones.
   - Relevance: helps the guide frame the island fallback as difficulty-conditional (Medium/Hard/Impossible only) and why the same map behaves differently at different nation difficulties.
   - Limitation: search-index capture; short thread.

7. URL: https://www.reddit.com/r/Openfront/comments/1rd7go2/any_tips_to_beat_nations_in_2025/
   - Title: "Any tips to beat nations in 2025?" — r/Openfront, 2025-11-04, 4 comments.
   - Player question: "Short, current tips for beating nations after the recent patches?"
   - Observation: Even in a short thread the same three moves recur: probe with the cheap boat, keep a home reserve, and force the nation into a fight on your terms rather than its. This is the stable core of player knowledge the guide extends with the v0.36 specifics.
   - Limitation: search-index capture; only 4 comments.

8. URL: https://www.reddit.com/r/Openfront/comments/1rxs4ac/how_do_i_make_nations_stop_building/
   - Title: "How do I make Nations stop building?" — r/Openfront, 2025-11-23, 15 comments.
   - Player question: "Can I stop a nation from upgrading its economy, or is it always building?"
   - Observation: The accepted answer is that you cannot stop a nation's building, but you can make its building not matter by denying the payoff (blockade the Port/Factory, pressure the gold source) and by choosing not to fight it at its strongest. This is the player-side counterpart to the hydrogen-hoarding change: the nation is now saving gold toward a big bomb instead of a fleet, so the "what is it building for" question changes.
   - Limitation: search-index capture.

## YouTube videos (verified live via oEmbed; watch page loaded for the on-theme one)

1. URL: https://www.youtube.com/watch?v=vjR7rKcK6Tk
   - Title: "Can I Beat 400 Impossible Nations from the Smallest Island? | OpenFront.io"
   - Recency: current; the video is the most direct on-theme match for the island-nation fallback — it is literally a run of many Hard/Impossible nations off a small island.
   - Player question answered: "What happens when a large number of aggressive nations sit across water from a small island player?"
   - Observation: The framing is a stress test of island defense against projected nation power, which is the exact situation the v0.36 island fallback changes — the nations in such a run now boat nearby bots to build footholds rather than immediately boating the island player.
   - Limitation: full transcript not fetched; characterized from title/description and live oEmbed verification.

2. URL: https://www.youtube.com/watch?v=eSB3Ng9ORaw
   - Title: "How to Beat Nations! | OpenFront.io"
   - Recency: evergreen strategy reference; still valid as the general "how to beat nations" entry point.
   - Player question answered: the broad "how do I even beat nations" question.
   - Observation: The general doctrine (cheap probes, reserved army, forced fights) that the v0.36 specifics build on.
   - Limitation: transcript not fetched.

3. URL: https://www.youtube.com/watch?v=EdcdsayA_ac
   - Title: "OpenFront.io — How to Beat Nations — Strategy"
   - Recency: strategy deep-dive; complements the general reference.
   - Player question answered: a structured strategy for neutralizing nations.
   - Observation: Emphasizes the economic side — nations are most dangerous when left to save and spend in bulk, which connects to the hydrogen-hoarding behavior.
   - Limitation: transcript not fetched.

4. URL: https://www.youtube.com/watch?v=M-bOEyvX0ks
   - Title: "How to Defend vs Nations! | OpenFront.io"
   - Recency: defense-focused; the mirror of the "beat nations" content.
   - Player question answered: "How do I not get flanked and consumed by nations?"
   - Observation: The defensive reads (compact core, screen the coast, hold a reserve) that the player applies while a nation is now hoarding gold and reaching further by boat.
   - Limitation: transcript not fetched.

## Cross-source synthesis (what the guide must answer)

- The single player intent behind all of this is: "Since v0.36, my nations behave differently — they reach across water to grab bots, they no longer dump their whole army into a double attack, and with atom bombs off they are quietly saving for the big bomb instead of fielding a fleet. What do I change about how I play?"
- The decision the player can actually change: (a) treat a Medium/Hard/Impossible island nation as a cross-water threat that will probe a nearby bot first, so a bot you were relying on is no longer safe; (b) expect the nation to keep a larger home reserve now, so a single "empty its army" trick no longer works — force it back and re-engage; (c) with atom bombs disabled, expect fewer warships and a delayed but heavier nuclear threat, and read the nation's gold as a bomb timer rather than a fleet timer.
- What is NOT new: the 1% boat / beachhead sizing, the warship checks, and the 300/500 tile boat-range limits all already existed in v0.35; v0.36.0 changed which target the island nation picks (bots first), when it can (no land front), how it budgets the attack (per-run reset), whether it over-commits in one tick (no), and where it saves gold when atom bombs are off (H-bomb, not warships).
