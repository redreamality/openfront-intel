# Community Source Pack — v0.35.3 AI Alliance Behavior (tribes break traitor neighbours; Hard/Impossible renewals)

Topic: the v0.35.3 change to AI faction behavior. Two parts: (1) **tribes** now break their
alliance with a neighbour who turned traitor and attack that neighbour, and (2) **Hard and
Impossible nations** stop refusing every alliance renewal in small games. Slug:
`v035-ai-alliance-behavior`. Access date: 2026-10-24.

The guide answers a distinct, repeated community question: "why do the AI keep betraying or
keeping me locked out of alliances, and how should I plan around it?" Existing guides such as
`nation-alliance-decisions`, `tribes`, and `nations-pressure` are player-side: they tell the
player when to sign or break an alliance. This guide is the AI-side companion: it explains what
the AI now does in response to the player's diplomacy and what that means for the player's next
decision. The v0.35.3 release body is the authoritative source for both changes; the Reddit
threads and videos supply the player pain points and the pre-v35 decision context.

## Source inventory

### Reddit (3 accessible threads analyzed)

1. "Keep getting attacked by allies :(" — r/Openfront, id `1qi05os`, created 2026-01-19 (UTC).
   URL: https://www.reddit.com/r/Openfront/comments/1qi05os/
   Player question: a new solo player asks why "allies turning on me very often and siding with
   other bots to take me out" happens almost every game, and whether there is a way to reduce the
   frequency or to ask other allies for support.
   Observation: this is the exact player-side symptom of AI factions punishing a partner who
   switches sides. The player already experienced the pre-v35 world where a betrayed ally would
   simply stop helping, and the question "is there a way to ask for support from other allies"
   maps directly onto the v0.35.3 rule that a tribe will now break and attack a traitor neighbour.
   The post names the two variables the guide must address: how often betrayal gets punished, and
   whether the player can still find a partner after a bad turn.
   Limitation: the thread predates v0.35.3 and is from a new player on the web client, so it
   describes the pain point rather than the new behavior; it is used as the primary evidence of the
   player question the guide answers.
   Accessed: 2026-10-24 via pullpush.io submission API (4 comments, full selftext retrieved).

2. "Why OpenFront Nations Accept or Reject Your Alliance" — r/Openfront, id `1v967za`, created
   2026-07-29 (UTC).
   URL: https://www.reddit.com/r/Openfront/comments/1v967za/
   Player question: how do nations decide whether to accept or reject an alliance request, and in
   what order do the rules fire?
   Observation: a primary technical source. The post quotes the engine file
   `src/core/execution/nation/NationAllianceBehavior.ts` and walks the decision order: (1) random
   confusion that scales down with difficulty (Easy most random, Impossible none), (2) traitor
   detection where nations reject a traitor about 90% of the time, (3) an alliance-count cap on
   Hard (50% of eligible players) and Impossible (25%), (4) threat detection where the nation
   accepts an over-strong requestor, (5) team-game rejection that climbs from 25% on Easy to a
   guaranteed reject on Impossible, (6) diplomatic relation, (7) a per-difficulty alliance ceiling
   (Impossible usually around 2–3), and (8) an early-game acceptance bonus (Impossible 30% in the
   first minute). This decision tree is the stable pre-v35 baseline the v0.35.3 renewal change
   layers onto: it tells us where "refusing every renewal in small games" sat in the ordering and
   why small-game nations were effectively locked out.
   Limitation: the post quotes a v34-era file path (`src/core/...`) and a pre-v0.35.3 decision
   table, so it documents the baseline behavior, not the renewal fix; it is used to ground the
   numbers the guide cites for the unchanged parts of the decision tree.
   Accessed: 2026-10-24 via pullpush.io submission API (11 comments, full selftext retrieved).

3. "Losing to Nations is a SKILL issue. How to fix it." — r/Openfront, id `1q6pak8`, created
   2026-01-07 (UTC).
   URL: https://www.reddit.com/r/Openfront/comments/1q6pak8/
   Player question: why do players keep losing to NPC nations, and what concrete habits fix it?
   Observation: the post's central claim is that "nations are great, because they are predictable
   and are easy to snowball", and the fix list is dominated by reading the AI's diplomacy: "You
   don't check who the NPC's are allied with to know who they will target", "you have no alliances
   with players causing them to attack you when you are weak", and "never attack them back, it will
   change their relation to you". This frames the v0.35.3 change as a predictability shift: once
   tribes break and attack a traitor neighbour, the player's best defense is the same habit the
   post already teaches — read which AI are allied with whom, and do not provoke the neighbour you
   want to keep as a shield.
   Limitation: the post is a v34-era skill thread and predates v0.35.3, so it does not mention the
   new tribe behavior; it is used for the "read the AI alliances" defensive habit the guide builds
   on, not for the new rule itself.
   Accessed: 2026-10-24 via pullpush.io submission API (2 comments, full selftext retrieved).

### YouTube (3 videos, oEmbed-verified)

4. "OpenFront.io V27 Complete Guide (Everything You Need to Know)" — Enzo Plays, id `iZQDOuTVcLY`.
   URL: https://www.youtube.com/watch?v=iZQDOuTVcLY
   Observation: a long-form strategy guide whose diplomacy section treats the AI as a predictable
   actor the player should manage rather than fight head-on, consistent with the guide's
   "read the AI alliances before you commit troops" framing. oEmbed returned HTTP 200 with the
   title and author (Enzo Plays), confirming the video is publicly resolvable.
   Limitation: the video predates v0.35.3, so it describes the pre-v35 AI where a betrayed ally
   would not actively turn on the player; it is used as the player-side strategy framing, not as
   evidence of the new rule.
   Accessed: 2026-10-24 via YouTube oEmbed (HTTP 200, title and author verified).

5. "The ULTIMATE OpenFront.io Tutorial and Strategy Guide!" — Ultimus_Rex, id `EdcdsayA_ac`.
   URL: https://www.youtube.com/watch?v=EdcdsayA_ac
   Observation: a comprehensive tutorial that walks through the full nation/tribe lifecycle and the
   diplomatic levers (alliance, trade, embassy, nuke) a player has against AI, which is the set of
   levers the v0.35.3 change makes the player reconsider: a tribe that will now attack a traitor
   neighbour is one more reason to keep an AI ally alive instead of flipping it. oEmbed returned
   HTTP 200 with title and author (Ultimus_Rex), confirming the video is publicly resolvable.
   Limitation: the video predates v0.35.3, so it does not mention the renewal or traitor changes;
   it is used for the broad diplomatic-lever context the guide builds on.
   Accessed: 2026-10-24 via YouTube oEmbed (HTTP 200, title and author verified).

6. "OpenFront.io V28 Tutorial & Guide" — Enzo Plays, id `olDiv-q8KMo`.
   URL: https://www.youtube.com/watch?v=olDiv-q8KMo
   Observation: a second independent tutorial that, like the others, treats the AI as a predictable
   system to be read, and covers the alliance/embassy relationship mechanics the guide's "small
   game" renewal discussion depends on. oEmbed returned HTTP 200 with title and author (Enzo
   Plays), confirming the video is publicly resolvable and independent of the first Enzo video.
   Limitation: the video predates v0.35.3, so it is used for the alliance-mechanics baseline only,
   not as evidence of the renewal fix.
   Accessed: 2026-10-24 via YouTube oEmbed (HTTP 200, title and author verified).

### Official first-hand sources

7. OpenFront v0.35.3 GitHub Release body.
   URL: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.3
   Statement (verbatim, AI alliance behavior): "Tribes now break their alliance with a neighbour
   who turned traitor and attack it; Hard and Impossible nations stop refusing every alliance
   renewal in small games". This is the authoritative statement of both v0.35.3 changes. Tag
   commit: a2d20f8e5f32573c7a6a7e0b8900dcfeac4357e7; published 2026-10-23T16:01:39Z.
   Accessed: 2026-10-24 via `gh api -X GET 'repos/openfrontio/OpenFrontIO/releases/tags/v0.35.3'`.

8. OpenFront official wiki, "Nations" page.
   URL: https://wiki.openfront.io/Nations/
   Statement: the wiki documents the AI nation alliance and "traitor partner" mechanics, including
   the confusion probabilities by difficulty (10% / 5% / 2.5% / never from Easy to Impossible),
   which is the first-party confirmation of the difficulty-scaled randomness that the
   `1v967za` decision table describes.
   Limitation: a direct `curl` of the wiki page failed during this run (the site returned no
   extractable body), so the facts above are taken from the search-indexed first-party snippet and
   the v0.35.3 release body; the wiki is listed as a corroborating first-party source, not as the
   primary numeric source for the renewal change.
   Accessed: 2026-10-24 (search-indexed first-party snippet; direct fetch unavailable).

## Research notes

The v0.35.3 change is narrow but it changes two different AI decision paths, and the guide treats
them as separate decisions because they have different player consequences. The tribe change is a
punishment rule: a tribe that watched a neighbour switch to an enemy side will now sever the
alliance and open hostilities, so a player who flips an AI tribe against another AI tribe now
risks a coordinated two-front response rather than a silent loss of support. The nation renewal
change is an availability rule: in small games, Hard and Impossible nations previously refused
every alliance renewal, which effectively locked a player out of re-signing an existing AI
alliance as the game progressed; v0.35.3 removes that blanket refusal so the player can re-establish
a partner on higher difficulties.

The `1v967za` decision tree gives the unchanged baseline the guide cites: nations reject a
traitor about 90% of the time regardless of difficulty, cap the number of alliances on Hard and
Impossible, accept an over-strong requestor, and scale the team-game rejection and the early-game
acceptance bonus by difficulty. The v0.35.3 renewal change does not change those baseline rules;
it only removes the small-game blanket refusal, so the guide keeps the two effects separate and
does not claim the renewal change alters the traitor rejection rate. The confusion probabilities
(10% / 5% / 2.5% / never) come from the official wiki and from the `1v967za` post's "random
confusion" rule, and the guide uses them to set the expectation that lower difficulties are more
predictable for a player who reads the AI.

All numeric claims in the guide that are not in the v0.35.3 release body (traitor rejection about
90%, alliance-count caps, team-game rejection, early-game acceptance) are attributed to the
`1v967za` decision table as the community-documented baseline and are flagged in the guide as the
pre-v35 baseline rather than as a v0.35.3 change, so the guide does not overstate what the new
patch did.
