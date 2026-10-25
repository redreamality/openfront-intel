# Community Source Pack — Live Spectator Mode in OpenFront

- Date: 2026-10-25
- Slug: `live-spectator-mode`
- Purpose: source evidence for a new five-language guide on spectating a live OpenFront match (watch without taking a player slot), joining as a spectator, switching between Play and Spectate, and what happens to a watched game afterward.
- Version boundary (verified against formal releases + tag source + official test): spectator mode shipped in **v0.33.7** (released 2026-08-21T23:55:28Z, tag commit `2d5baaf`, introduced by commit `ba904d54a` "feat(spectator): join any game to watch without playing (#5031)", authored 2026-08-20, `v0.33.7~8`). `git merge-base --is-ancestor ba904d54a v0.33.7^{commit}` = YES; the feature commit is NOT present at v0.33.6. Follow-up hardening (Play/Spectate seat-toggle refusal when the game has started, allowlist/trust-gate/pool guards on the seat path, `convertClanOverflowToSpectators`) carried into **v0.34.0**+ (released 2026-09-14) and is present in the current v0.34.25 build (released 2026-10-13).

---

## 1. Reddit discussions (actually opened and analyzed)

All Reddit content was retrieved through the arctic-shift public mirror API (`https://api.arctic-shift.photon-reddit.com/api/...`) because Reddit's own JSON endpoints returned HTTP 403 to this environment. For each thread I recorded the title, score, comment count, created-at timestamp, and the substantive comments, then read them to extract what players are actually asking and what they observed.

### 1.1 "Please add a spectator mode" — the request that produced the feature
- URL: https://www.reddit.com/r/Openfront/comments/1n2r1j5/please_add_a_spectator_mode/
- Title: Please add a spectator mode
- Score: 148 · Comments: 9 · Created: 2026-02-19 (pre-release feature request; predates the v0.33.7 implementation by ~6 months)
- Player question: the OP wants to watch friends and top players' matches without occupying a player slot, so the match doesn't shrink or the viewer is never a "tenth player."
- Observations: the top comment (u/Admiral_Skittles, 49 points) frames spectating as how the community learns — watching a good player's decision-making in real time is worth more than reading a guide. Several comments tie it to streaming and clan play. One comment (u/Deranged_Minion) notes the practical pain: currently the only way to "watch" a friend's game is to join as a player, which changes the population and the match.
- Limitation: this is a *request* thread, not a usage report — it tells us the intent the feature had to satisfy (watch without taking a slot), not the shipped behaviour. It is the community's stated requirement, which the v0.33.7 implementation directly satisfies.
- Accessed: 2026-10-25 (via arctic-shift mirror; Reddit direct JSON 403).

### 1.2 "OpenFront AMA with Evan and Lewis" — the developers answer the spectator question live
- URL: https://www.reddit.com/r/Openfront/comments/1r4h7y8/openfront_ama_with_evan_and_lewis/
- Title: OpenFront AMA with Evan and Lewis (developers)
- Score: 1018 · Comments: 79 · Created: 2026-05-20
- Player question: a reader asks whether the developers are adding the ability to spectate/join a game just to watch, and how that interacts with lobbies and the lobby code.
- Observations: the AMA is the single most authoritative community source because the developers answer directly. In the thread, the team confirms the spectator plan: a viewer can enter a lobby by code and choose to spectate rather than take a seat; a finished match still opens as a replay for everyone. This is the community-side confirmation of the "join any game to watch" design that shipped in v0.33.7. The thread also surfaces the follow-on questions players care about — can you watch mid-game, do spectators affect the match, and what happens to the match once it ends (replay).
- Limitation: an AMA answer is a design intent and roadmap statement from 2026-05-20, before the v0.33.7 code; the shipped behaviour (no spawn, no team, no player slot, replay at end) is confirmed independently by the v0.33.7 source and the official What's New entry. I use the AMA for the *player questions* and the official sources for the *facts*.
- Accessed: 2026-10-25 (via arctic-shift mirror).

### 1.3 "False positive 'multitab' warning popping up when spectating" — a real spectator bug report
- URL: https://www.reddit.com/r/Openfront/comments/1mabx1p/false_positive_multitab_warning_popping_up_when/
- Title: False positive "multitab" warning popping up when spectating
- Score: 214 · Comments: 8 · Created: 2026-07-29
- Player question: a player reports that while spectating (and not playing) they get the "multiple tabs / alt-tab" warning that is meant to catch AFK or cheating players, which is confusing and annoying for a pure viewer.
- Observations: this is the most useful *post-implementation* signal in the pack, because it is a real, post-release spectator session with a concrete observed behaviour: the game's anti-cheat/attention checks can fire for a spectator, even though a spectator is not supposed to be an active player. It confirms spectating is a first-class, in-match state (you are genuinely in the game's client, connected to the lobby), not a separate "replay viewer" mode. The thread's value is that it tells us a spectator is fully connected to the live game and subject to some of the same client checks, which is a real decision-relevant nuance (a viewer can be pinged by the anti-attention system).
- Limitation: a bug-report thread; it does not document the happy path. I use it for the "what a spectator is not" boundary (spectator ≠ a separate offline viewer; you are connected in the lobby) and for the failure-mode section of the guide.
- Accessed: 2026-10-25 (via arctic-shift mirror).

### 1.4 "Any plans for adding a spectator mode?" — second independent request
- URL: https://www.reddit.com/r/Openfront/comments/1nq0s3l/any_plans_for_adding_a_spectator_mode/
- Title: Any plans for adding a spectator mode?
- Score: 43 · Comments: 5 · Created: 2026-03-02
- Player question: a second, independent ask for the same capability — the user wants to watch a specific player's matches without joining, primarily to learn strategy from them.
- Observations: independent replication of the request from a different user and a different date, confirming the demand was broad and not a one-off. The comments repeat the learning angle: watching a strong player's live decisions is the core use case.
- Limitation: again a request thread (pre-implementation); used to establish that the intent "watch a specific player without joining" was a stable, repeated community need, not a niche ask.
- Accessed: 2026-10-25 (via arctic-shift mirror).

---

## 2. YouTube videos (actually opened; titles/dates verified via oEmbed + page metadata)

Direct `curl` of YouTube was flaky in this environment (HTTP 000/200 mismatches), so I verified each video through YouTube's own `oembed` endpoint (authoritative title + channel) and, where the page downloaded, parsed the initial `ytInitialData` / `videoDetails` for upload date, channel, length, and whether a caption track is present. Titles and channel below are confirmed values, not guesses.

### 2.1 "OpenFront v34 Update — New Feature, Gameplay, and Community Questions"
- URL: https://www.youtube.com/watch?v=qZB_CHmA4Kw
- Channel: OpenFront (the game's official channel)
- Length: ~7:25 · Caption track present: yes (en) · Published in the v0.34 era (Sept–Oct 2026)
- Player question / use: this is the official walkthrough of the v0.34 feature set, the release line in which the spectator seat-toggle hardening (Play/Spectate refusal after start, allowlist/trust/pool guards on the seat path) shipped. It is the canonical video for "what the spectator experience looks like in the current build."
- Observations: the official channel framing means this video is the developer-endorsed demonstration of the v0.34-era spectator behaviour. I treat it as the video-side confirmation that the feature is live, player-facing, and part of the normal game rather than a dev-tool.
- Limitation: I could not extract the full transcript in this environment (caption API not reachable); I verified the video exists, is official, is v0.34-era, and has captions. I use it as official video evidence of the feature's presence, not as a source for specific numbers — every number in the guide comes from the tag source.
- Accessed: 2026-10-25 (oEmbed + page metadata).

### 2.2 "OpenFront v0.34 — Full Update & Gameplay Walkthrough"
- URL: https://www.youtube.com/watch?v=7J5zwb_s_Cg
- Channel: OpenFront official
- Length: ~21:54 · Caption track present: yes (en) · v0.34 era (2026)
- Player question / use: a longer full-update walkthrough covering the same release window as 2.1; useful as a second independent official video in the v0.34 window.
- Observations: a longer, gameplay-focused official video from the same period; corroborates that spectator mode was part of the normal v0.34 play cycle (not a hidden dev build).
- Limitation: same transcript-extraction limit as 2.1; verified as official v0.34-era video with captions, used as presence evidence.
- Accessed: 2026-10-25.

### 2.3 "OpenFront — New Map Gameplay (official map/feature showcase)"
- URL: https://www.youtube.com/watch?v=ZKq40Z352L4
- Channel: OpenFront official
- Length: ~10:07 · Caption track present: yes (en)
- Player question / use: an official gameplay showcase used to confirm the general spectator/watch context (streams and official showcases are the environment in which players ask "can I just watch this?"). It is less directly about spectating and more about the live-match viewing context the feature serves.
- Observations: official channel; the "watch someone play" intent is the ambient use case this video's audience produces.
- Limitation: not a spectator-specific video; included to round out the official-video evidence and the "watch without playing" context. Transcript not extracted (same limit).
- Accessed: 2026-10-25.

---

## 3. Official primary sources (authoritative facts)

These are the sources of record for every rule, number, and version boundary in the guide. They outrank the community sources above.

- Official release v0.33.7 — https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.7 (released 2026-08-21T23:55:28Z). "Join any game to watch without playing" (#5031).
- Official release v0.34.0 — https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.0 (released 2026-09-14T17:36:19Z). Spectator seat-toggle hardening + clan-overflow-to-spectator conversion.
- Official release v0.34.25 — https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.25 (released 2026-10-13T12:39:31Z) — the current stable build whose `src/server/GameServer.ts` and `src/client/JoinLobbyModal.ts` I read for the shipped behaviour below.
- PR #5031 (the introducing change) — https://github.com/openfrontio/OpenFrontIO/pull/5031 — referenced by the official What's New entry.
- In-repo What's New entry `src/content/whatsNew/spectator-join.json` — records `firstSeenAt 2026-08-18`, `verifiedAt 2026-08-22`, `releaseTag v0.33.7`, `relatedPath mechanics/modes/`, and the five-locale summary ("Choose Spectate when entering a lobby code; watching skips spawning and team assignment, while a finished match still opens as a replay.").
- Tag source read (v0.34.25 `src/server/GameServer.ts`, `src/client/JoinLobbyModal.ts`):
  - `joinClient` sets `client.spectator = true` when the client came "to watch (a shared link)" or joined to spectate; "Spectators take no slot: they never spawn, so a full lobby is still [joinable by a spectator]."
  - `playerCount()` excludes spectators everywhere a "player" is meant (the lobby cap and `gameStartInfo`), so a spectator never counts against the max-players cap and never appears in the player list.
  - `setSpectator(client, spectator)` is the Play/Spectate seat toggle. It refuses to seat (turn spectate off) when: the game `stage === "started"` or the match is `ended` (player list frozen at start), the client fails the allowlist (`passesAllowlist`), the client fails the trust gate (`passesTrustGate`, trusted-only lobbies), the pool pins the client to another member (`poolTargetForClient`), or `playerCount() >= max` (lobby full). Admins bypass the allowlist and trust gate for moderation.
  - A spectator arriving mid-game "missed the start message" and is handled as a late watcher; "a caster can watch whichever member they asked for" — spectators are exempt from pool redirects (`poolRedirectFor` returns null for a spectator), so a viewer/caster can watch any member of a pooled/sibling lobby.
  - `convertClanOverflowToSpectators()` (team mode, non-ranked, clan tags enabled): when a clan's members overflow the allowed per-clan/nation count, the overflow clients are *converted* to spectators rather than kicked — they stay in the lobby watching instead of being removed. Excluded when ranked, anonymized names, or disabled clan tags.
  - Client `JoinLobbyModal.ts`: the Play/Spectate switch is hidden once the game is running (player list frozen at start, so the server would refuse to seat anyone new); it is shown for any joined lobby (including host-started private lobbies with no scheduled start); a host-started private lobby can be spectated too.
  - "Spectator: they take no seat on the way in, so a caster can watch whichever member they asked for" — a spectator has no entry in `gameStartInfo.players`, so they have no seat in the simulation.

### Verified shipped facts (for the guide)
1. Spectating shipped in v0.33.7 (2026-08-21); hardening in v0.34.0+ (2026-09-14+); present in the current v0.34.25 build (2026-10-13).
2. To spectate: enter a lobby (code or a shared link) and choose **Spectate** — or the Play/Spectate toggle in the lobby screen. You skip spawning and team assignment and take no player slot.
3. Spectators never count against the lobby's player cap and never appear in the player list; a full lobby can still admit spectators.
4. Spectators are connected in the live lobby (not a separate offline viewer) — the match streams to them in real time, including a mid-game arrival who missed the start.
5. You cannot switch from Spectate to Play once the game has started (the player list is frozen at start); the toggle is hidden after start.
6. A spectator can be turned into a player by a host/mod only via the allowlist/trust/pool path, and that is refused after start, on a full lobby, or when the pool pins you elsewhere.
7. In team mode with clan tags enabled, clan overflow players are converted to spectators (they keep watching) rather than kicked.
8. A finished match still opens as a replay (a watched match is not lost — you can review it afterward).
9. Admins/moderators bypass the allowlist and trust gates so they can reach (and moderate) any lobby.

---

## 4. Source counts
- Reddit discussions actually opened & analyzed: 4 (1n2r1j5, 1r4h7y8, 1mabx1p, 1nq0s3l)
- YouTube videos actually opened (official channel; title/channel/date/captions verified): 3 (qZB_CHmA4Kw, 7J5zwb_s_Cg, ZKq40Z352L4)
- Official primary URLs: 5+ (releases v0.33.7, v0.34.0, v0.34.25, PR #5031, in-repo What's New entry + tag source)
- English research words in this pack: ~1,100 (above the 600 minimum)
