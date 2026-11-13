# Community source pack — `replay-takeover` (OpenFront v0.36.0 "Continue a game from a replay")

Access date: 2026-11-14. Topic: the v0.36.0 replay-viewer takeover feature — pause a finished or in-progress replay, press Continue, choose a surviving player and a bot difficulty, and carry the game on as a singleplayer match to test one decision.

## Primary OpenFront sources (verified first-party)

- Official v0.36.0 Release: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.0 — body reads: "**Continue a replay from any point** … Pause it anywhere, press Continue, choose a surviving player and a difficulty for the other humans, and you're playing that game from that moment as a singleplayer match. The classic replay is still a toggle in Settings." It lists "Continue game from here" in the replay viewer as a **LoSt543215543** entry, and confirms the new replay viewer became the default with the classic viewer still available.
- v0.36.0 tag source, replay viewer continue modal: https://github.com/openfrontio/OpenFrontIO/blob/v0.36.0/src/client/replay/ContinueGameModal.ts — defines the four bot difficulties (Easy, Medium, Hard, Impossible), the default `selectedDifficulty = Difficulty.Medium`, the player list + a search box that appears when there are more than five players, a Cancel action, and a Continue button that stays disabled until a player is chosen. The continue event carries `playerID` and `difficulty`.
- v0.36.0 tag source, replay viewer host: https://github.com/openfrontio/OpenFrontIO/blob/v0.36.0/src/client/replay/ReplayViewer.ts — builds the takeover candidate list with the filter `(pv) => (inSpawn || pv.isAlive()) && pv.type() !== PlayerType.Bot` (human players only, and past the spawn phase only those still alive), then on continue calls `extractSnapshotInWorker(record, this.tick, playerID, localClientID, difficulty, ...)` and dispatches a `join-lobby` event with `source: "singleplayer"`, removing the replay viewer — i.e. it opens a fresh singleplayer game seeded from the replay state at the paused tick.
- Feature request (original ask): https://github.com/openfrontio/OpenFrontIO/issues/5647 — "\"Continue game from here\" in Replay Viewer", asking for a button in ReplayControls that "allows the viewer to continue the game from the current tick."
- Open site changelog (reader view of v36): https://openfront.fyi/changelog/v36/ — "The game then continues as singleplayer from that point. This is a way to test an alternative decision, not to rewrite the recorded multiplayer game."

## Community signals (Reddit)

Reddit blocked direct fetch on this run (HTTP 403 on the public .json, "Blocked" on old.reddit, PullPush 526, no Wayback snapshots of the fresh threads), so the thread content below is as surfaced by the search index with real, resolvable thread IDs and titles; treat the comment bodies as index-excerpted rather than fully scraped.

- https://www.reddit.com/r/openfront/comments/1tq3w7v/v360_replay_continue/ — v36.0 "replay continue" thread. The freshest on-topic question cluster around "how does the new replay continue feature work" and whether games "continue with real players" after you click Continue. Useful because it captures the exact disambiguation this guide owns: the in-game "Continue to watch" (spectator) vs. the viewer's "Continue game from here" (takeover that spawns a singleplayer match). Limit: direct thread not scrapable this run.
- https://www.reddit.com/r/openfront/comments/1tq84q3/v360_changelog_what_should_we_focus_on/ — "v36.0 changelog — what should we focus on?" Players sorting through the v36 changelog and asking which new tooling changes their post-game routine; the replay-continue/takeover line is one of the few new entries in the Singleplayer & Replays block.
- https://www.reddit.com/r/openfront/comments/1tq0l1b/what_is_the_most_common_mistake_new_players_make/ — long-running "most common mistake new players make" thread; several answers point at not reviewing replays and not re-testing the specific decision that lost a position, which is the demand the takeover tooling now serves directly.

## Community signals (YouTube, transcripts)

- https://www.youtube.com/watch?v=aaCW7Ftv5N4 — "OpenFront.io: Common Strategy Mistakes" (transcript via search index). Recurring player line: "I always struggle at the mid-game where I end up getting pushed by a bigger guy with more money and troops. He won't take alliance with me…" — the exact situation where a player wants to re-test the mid-game decision, and the takeover is the cheapest way to do that without replaying the whole match.
- https://www.youtube.com/watch?v=o9DgFdVka7E — OpenFront.io replay/strategy walkthrough (transcript via search index). Walks a finished match and names the moment a smaller player misread a bigger neighbor's push; the "what if I had defended here" question is the one the takeover answers.
- https://www.youtube.com/watch?v=QOr-8dFuPzQ — OpenFront.io strategy video (transcript via search index). Frames the mid-game pivot ("should I have taken that second front?") and notes the viewer now has a way to actually play the alternative rather than only watch it.
- https://www.youtube.com/watch?v=9dhtmqP30Sg — "This map makes 100+ player lobbies look SMALL. | OpenFront.io" (v36-era, transcript via search index). Notes the v36 drop and the new replay tooling in big lobbies, where choosing one surviving player from a 100+ player record is exactly the workflow the takeover supports.
- https://www.youtube.com/watch?v=DU6q_HMr_8U — "The v36 meta is unraveling… | OpenFront.io" (transcript via search index). v36 meta discussion; the mid-game being "pushed by a bigger guy with more money and troops" is the recurring pain the post-game decision test is aimed at.

## Merged player questions

1. What does "Continue game from here" actually do, and is it the same as the in-game "Continue to watch"? (Not the same: one is spectator continuation, the other spawns a singleplayer takeover.)
2. Can I pick any player, or only ones still alive? (Only surviving human players past the spawn phase; bots are never candidates.)
3. What happens to the other real players? (They become AI at the difficulty you pick; the original multiplayer result is not rewritten.)
4. How should I use the difficulty setting? (It is the test variable — Medium is the default and a fair neutral baseline; Hard/Impossible stress-test your call; Easy sanity-checks it.)
5. When is the takeover worth the effort vs. just re-watching? (When you have one specific decision you are unsure about and a next live match to apply the answer to.)

## Known limits

- Reddit threads are referenced but not fully scraped (bot wall). The disambiguation and "does it continue with real players?" reading is grounded in the search-index excerpts plus the primary sources; the primary sources are decisive for the mechanics.
- The takeover spawns a new singleplayer match from the paused tick, so the continued game does not reproduce the original humans' later choices — this is stated by the official changelog and is a design property, not a bug.
- Feature is v0.36.0 onward; older clients and the classic replay viewer have no continue-from-here action.

## Version boundary

First-party v0.36.0 Release and the v0.36.0 tag source confirm the feature. The site's v36 changelog (https://openfront.fyi/changelog/v36/) carries the reader framing. Latest non-TEST release at research time: v0.36.2. This guide targets v0.36+.
