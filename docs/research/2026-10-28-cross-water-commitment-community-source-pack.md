# Community Source Pack: Cross-Water Army Commitment (Boat Stacking)

Date: 2026-10-28
Topic: how much of an OpenFront.io army to commit across open water via Transport boats while retaining a viable home defense. Slug: `cross-water-commitment`.
Purpose: gather the player-facing questions, observations, and failure cases that a guide on committing up to 60% of the army across water must answer, and ground the load-bearing numbers in official source.

## Official primary source (GitHub)

The formal version boundary is the non-draft v0.35.6 release tag at commit `9f4a28f16fae951df0daf727e5e64b34ce8b77d1`. The numeric source checkout used for line-level verification is upstream `main` at `f33d0049076b2931b73d06ac79d076799e54e8ac`, a separate later commit; it must not be described as the release tag. The repository is the primary source of truth for the game's behavior, not community memory.

- Repository (primary): https://github.com/openfrontio/OpenFrontIO
- Transport execution (launch deduction, retreat malus): https://raw.githubusercontent.com/openfrontio/OpenFrontIO/f33d0049076b2931b73d06ac79d076799e54e8ac/packages/engine/src/execution/TransportShipExecution.ts
- Transport ship utility (boat count / load): https://raw.githubusercontent.com/openfrontio/OpenFrontIO/f33d0049076b2931b73d06ac79d076799e54e8ac/packages/engine/src/game/TransportShipUtils.ts
- Config (troop cap, cost, growth): https://raw.githubusercontent.com/openfrontio/OpenFrontIO/f33d0049076b2931b73d06ac79d076799e54e8ac/packages/engine-lib/src/configuration/Config.ts

## Verified numeric rules from official source

- Boat count cap: `boatMaxNumber()` returns 3 (0 when the transport feature is disabled). Three Transport boats can be in the water at once per player. Source: TransportShipUtils.ts.
- Load per boat: `boatAttackAmount()` returns `floor(troops / 5)`, i.e. 20% of the selected pool per boat. Source: TransportShipUtils.ts.
- Combined maximum commit: 3 boats x 20% = up to 60% of the selected troop pool leaves the land at launch.
- Launch is a real drain: at launch the boat's troops are subtracted from the player's land pool (the game runs the same troop-removal path used by a ground attack), so the attacker's home pool physically drops. The community "bank troops above the cap in boats" exploit is no longer valid.
- Cost: a boat attack spawns Transport ships at 0 Gold each (transport is a free action, gated by Port ownership). Source: Config.ts `unitInfo` cost branch for Transport.
- Retreat penalty: recalling a boat applies a 25% malus (`malusForRetreat = 25`), i.e. the returning troops are cut by a quarter. A MIRV hit is far worse than a retreat.
- Troop cap: `2 * (numTiles^0.6 * 1000 + 50000) + cityTroops`, with a comeback-window clamp when troops are far below max (roughly a 3% buffer band). Source: Config.ts `maxTroops`.
- Growth is slowest near the cap: troop growth is scaled by the distance from the cap, so a big commitment that pushes the pool down actually accelerates regrow, but only after the pool has dropped.

## Reddit discussions analyzed

All five threads were opened and their top comments read (accessed 2026-10-28). The r/Openfront community is actively confused about whether the old boat-banking exploit still works, and about the exact retreat percentage, which is exactly the confusion a clear guide should resolve.

1. "Boat troop stacking ruins this game" — https://www.reddit.com/r/Openfront/comments/1opl9v5/boat_troop_stacking_ruins_this_game/ — Players describe using boats as "infinite banks": send 30% out, wait, retreat it back to your own coast, and fold the returning troops into a bigger attack. One top comment notes the attacker can boat anywhere and retreat without ever engaging a warship. This is the exploit the guide must explicitly flag as no-longer-valid.
2. "How do you cross the ocean?" — https://www.reddit.com/r/Openfront/comments/1ofe3dd/how_do_you_cross_the_ocean/ — New players ask the basic question; top answers say right-click the nation or wilderness and pick Boat, that boats can be nuked or sunk by warships, and that they are slow. Useful for the "what is the mechanic and what kills it" framing.
3. "Why are people still allowed to spam boats?" — https://www.reddit.com/r/Openfront/comments/1poa6bz/why_are_people_still_allowed_to_spam_boats/ — Strong signal that a bare Port without a Warship is a magnet for boat pressure ("90% of the game is not being a target; if you put a port down without a warship you are a target"). One commenter says "instantly have 150,000 appear with them is broken," capturing the player-perception of the 60% commit.
4. "How do you redirect your troop boats?" — https://www.reddit.com/r/Openfront/comments/1od92u6/how_do_you_redirect_you_troop_boats/ — Operational detail: a selected boat can be redirected with a click, or cancelled to force a retreat (the red cancel icon, same as a regular attack). Relevant to the retreat-malus section and to "can I abort a crossing."
5. "Does the boat trick still work?" — https://www.reddit.com/r/Openfront/comments/1qfkf9m/does_the_boat_trick_still_work/ — The clearest disagreement: some players still believe troops on boats are safe from MIRV and that you "retain all your troops when you boat out," while others correct that "you don't retain all your troops when you boat out so it doesn't work anymore afaik." A separate comment asserts the retreat is 30% while another says "you lose like 40%." The guide should pin the real number (25%) and correct the retention myth.

## YouTube videos analyzed (verifiable subtitles)

All three videos were downloaded with yt-dlp and their auto-generated English subtitles read (accessed 2026-10-28). The subtitles are the verifiable text, not the video pixels.

1. "OpenFront.io v31 Tutorial" — https://www.youtube.com/watch?v=IeR36481zsI — Walkthrough of the core loop; the transport/boat mechanic is introduced as the way to move troops across water from a Port. Confirms the Port requirement and the basic boat action.
2. "OpenFront.io V25 Tutorial" — https://www.youtube.com/watch?v=Wci8kBDxR80 — Older-lore tutorial that frames boats as an invasion tool against island/continental targets. Useful for the "when does a crossing make strategic sense" context and the risk of committing troops you cannot recover.
3. "How to Play OpenFront.io" — https://www.youtube.com/watch?v=fKCWgr5_nwo — General playthrough that shows the decision of whether to push across water or hold your front, matching the commit-vs-retain framing of this guide.

## Player questions the guide must answer

- How much of my army can actually leave across the water in one operation? (Answer: up to 60%, via three 20% boats.)
- Do I keep my troops "in reserve" on the boats? (No — they are deducted from the pool at launch; the banking exploit is gone.)
- What does it cost to recall a boat? (A 25% malus; a MIRV is much worse.)
- How much should I keep at home so my own front and regrow survive the drain?
- When is a 60% commitment worth it versus a smaller probe?
- What makes the crossing fail (warship screen, nuke, being over-matched)?

## Observations and synthesis

The recurring failure mode across sources is that players commit the maximum they can (the 60%) on the assumption that the troops are "out there but safe," when in fact they are gone from the pool and the operation's outcome is binary. The guide's job is to turn that into a concrete home-defense minimum: commit only what the enemy's weakest front can absorb, keep enough at home to hold your own coast and let the pool regrow, and screen the lane with a Warship so the boats cannot be recalled cleanly. The community numbers (30%, 40%, 150k appearing) are all approximations of the real `floor(troops/5)` x 3 with a 25% retreat, so the guide should present the exact formula and the exact malus.

## Limitations

- Troop growth rate was not re-derived from source this round; the guide states growth accelerates as the pool drops but defers the exact growth curve to the population-growth guide rather than asserting a number it could not re-verify in the pinned commit.
- YouTube subtitles are auto-generated and may contain transcription noise; they were used for qualitative framing (Port requirement, invasion framing, commit-vs-hold decision), not for any numeric claim.
- The 150,000 figure in one Reddit comment is a single player's anecdotal cap, not an official number; the guide treats it as an example size, not a rule.
- Reddit comment authors and upvotes were not independently verified; the threads were read as captured on the access date.
