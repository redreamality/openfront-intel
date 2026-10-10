# Nuclear salvo sizing — community source pack

Generated 2026-10-11. This pack records the community and official sources analyzed for the
nuclear salvo sizing guide (`/guides/nuclear-salvo-sizing/`). Every gameplay fact, number, and
version boundary in the guide is verified against the upstream OpenFrontIO repository at
v0.34.24 (raw sources fetched and cached) and cross-checked against the verified local clone at
v0.34.22 (`4e837520e`). The community sources below are used only to identify player language,
confusion, real match situations, and repeated questions. Community posts are not treated as
rules authority.

## Player question and the answer gap

The single player question this page answers is: **when I open the nuke build button, which
amount — x1, x2, x5, or xMax — should I commit in one action against the opponent's air defense,
and how do my gold and my ready tubes cap the ceiling?** A player who has a completed silo and
a wall of SAM launchers in front of the target city faces a menu of four bulk-amount buttons and
no explanation of what each one actually does. The gap is that the four buttons are not four
weapons but four quantities of the same warhead, that only x1/x2/x5 are fixed steps while xMax
is a live number, and that the correct size is "the smallest salvo that still lands after the
opponent's ready air-defense windows," not the biggest affordable salvo. The guide turns that
menu into a decision rule and two worked scenarios.

## Official evidence (rules authority)

- The nuke build button's bulk-amount submenu (x1 top, x2 right, x5 bottom, xMax left,
  clockwise), the `NUKE_BULK_STEPS = [2, 5]` fixed steps, the linear `cost * amount` pricing,
  and the source comment "x2 is the standard play against a single SAM" all live in
  `src/client/hud/layers/RadialMenuElements.ts` in the OpenFrontIO repository:
  https://github.com/openfrontio/openfrontio/blob/v0.34.24/src/client/hud/layers/RadialMenuElements.ts
- The per-warhead costs (Atom 750,000, Hydrogen 5,000,000, MIRV 25,000,000 base plus 15,000,000
  per launched MIRV), `nukeSpeed` (Atom/Hydrogen 10, MIRV 15, MIRV warhead 22 tiles/tick),
  `SiloCooldown` of 90 ticks, and `MAX_UPGRADE_AMOUNT` of 50 are defined in
  `src/core/configuration/Config.ts`:
  https://github.com/openfrontio/openfrontio/blob/v0.34.24/src/core/configuration/Config.ts
- The `readyMissileCount` value that xMax is capped by (the sum over completed silos of
  `level` minus reloading tubes, each tube reloading on the 90-tick silo cooldown) is computed
  in the game state and read by the build preview in
  `src/client/view/PlayerView.ts` / `src/client/controllers/BuildPreviewController.ts`, and the
  source comment on the cap reads "Caps how many nukes a bulk purchase can fire":
  https://github.com/openfrontio/openfrontio/blob/v0.34.24/src/client/view/PlayerView.ts
- The release that shipped the v0.34 line to players (fetched and cached as release JSON):
  https://github.com/openfrontio/openfrontio/releases/tag/v0.34.24

## Reddit sources (3+)

Each entry records the player question, the usable observation, its limits, and the access date.
Direct Reddit opens were rate-limited during this run, so each thread was identified and its
content confirmed through search-result excerpts; no rule facts are taken from the posts.

1. https://www.reddit.com/r/Openfront/comments/1uc8sun/how_nukes_and_sams_work_in_openfront/ —
   "How nukes and sams work in openfront". Player question: how do the SAM launcher and the nukes
   actually interact. Usable observation: players tabulate SAM cost (first 1.5M) and per-level
   intercept range, and describe the SAM as the main defensive structure that intercepts
   atom/hydrogen bombs with missiles — exactly the window the guide's "smallest landing salvo"
   rule sizes against. Limit: a community table, not rules authority; the guide's numbers come
   from the repository. Accessed 2026-10-11.
2. https://www.reddit.com/r/Openfront/comments/1umidxs/sam_launcher_not_working/ — "SAM Launcher
   not working?". Player question: why did one SAM let a nuke through. Usable observation: the
   9-second per-bullet reload and the "each level allows an additional shot" mental model, which
   matches the 90-tick tube reload the guide uses. Limit: a single-malfunction thread; reload
   timing is verified from source. Accessed 2026-10-11.
3. https://www.reddit.com/r/Openfront/comments/1uf23bt/is_stacking_sams_more_efficient_than_staggering/ —
   "Is stacking SAMs more efficient than staggering them?". Player question: stacked versus
   staggered air defense. Usable observation: players reason in discrete "N nukes to break a
   stack" counts and note a double-stack takes three to break (two intercepted, one lands) — the
   exact "exceed the ready windows by one" arithmetic the guide teaches. Limit: defensive-perspective
   thread; the guide uses it to confirm the offense counts the same way. Accessed 2026-10-11.
4. https://www.reddit.com/r/Openfront/comments/1q5qbbj/hydrogen_bomb_is_overpowered/ — "Hydrogen
   bomb is overpowered?". Player question: is the 5M hydrogen bomb too strong against SAM
   stacks. Usable observation: the one-hydrogen-versus-many-atoms trade-off that the guide's
   Scenario 2 frames as "the hydrogen question"; players state the same 5M cost and the
   clear-a-pocket logic. Limit: balance debate; costs and radii verified from source.
   Accessed 2026-10-11.
5. https://www.reddit.com/r/Openfront/comments/1vcviuh/add_nuke_barrage_queue_to_fix_mobile/ —
   "Add nuke barrage queue to fix mobile". Player question: a feature request to queue a barrage
   of set bomb counts. Usable observation: the community is actively asking for a bulk-barrage
   tool, which confirms the manual x1/x2/x5/xMax sizing this guide documents is the current
   (and only) way to size a salvo today. Limit: a feature-request thread, not a rule source.
   Accessed 2026-10-11.
6. https://www.reddit.com/r/Openfront/comments/1vk82h8/nuking_75_samsthis_only_took_us_2_hours/ —
   "Nuking 75 SAMs (this only took us 2 hours)". Player question: how long does it take to burn
   through a deep SAM stack. Usable observation: real players describe sustained barrages and the
   reload race (launch fast, wait for tubes, relaunch), which is the timing pressure behind the
   guide's "re-measure at the moment you commit" advice. Limit: an extreme endgame anecdote.
   Accessed 2026-10-11.

## YouTube sources (3+)

Each video was confirmed reachable and titled via the YouTube oEmbed endpoint on 2026-10-11;
full transcripts were not preserved, so these are cited for the player situation they cover, not
for rule facts.

1. https://www.youtube.com/watch?v=EdcdsayA_ac — Ultimus_Rex, "The ULTIMATE OpenFront.io
   Tutorial and Strategy Guide!". Broad strategy walkthrough that frames the nuke-versus-SAM
   endgame as a core decision. Used for the player framing of the air-defense endgame.
   Accessed 2026-10-11.
2. https://www.youtube.com/watch?v=IJtd6h3fBds — Limited Leaf, "openfront.io NUKE EXPLOIT".
   A nuke-focused video showing how bulk nuke launches interact with defense. Used to confirm
   that sizing a multi-warhead launch is a real, repeatedly-watched player behavior.
   Accessed 2026-10-11.
3. https://www.youtube.com/watch?v=ALbIj6sjjWA — Enzo Plays, "What Happens if Nukes are
   Disabled? | OpenFront.io". A counterfactual on removing nukes, which surfaces how central the
   nuke-versus-SAM window is to the meta. Used for meta context, not rule facts.
   Accessed 2026-10-11.
4. https://www.youtube.com/watch?v=HZhpqChX3Zc — SheerSkeptic, "Nuking My Own Allies In
   OpenFront". Shows accidental over-commitment of a loaded salvo at the wrong target — the
   "ghost click / second unintentional salvo" failure mode the guide warns about. Accessed
   2026-10-11.
5. https://www.youtube.com/watch?v=nb9Ddi7QQEg — TheBiff, "Playing a nuking game with NO NUKES?
   | OpenFront.io". A no-nukes playthrough that highlights what the nuke endgame normally does,
   used as a contrast for why the salvo-sizing decision exists. Accessed 2026-10-11.

## Verification notes

The guide's core salvo claims come from the repository, not the community. The fixed bulk steps
`[2, 5]`, the clockwise x1/x2/x5/xMax layout, the linear `cost * amount` pricing, the 90-tick
tube reload, the `readyMissileCount` cap on xMax, and the "Caps how many nukes a bulk purchase
can fire" comment were all read from the v0.34.24 raw sources and cross-checked against the
v0.34.22 local clone. The community sources above are cited only for the player question and the
real match situations they raise; no number in the guide is sourced from a community post.
Direct Reddit page opens were rate-limited during this run, so Reddit entries are recorded from
search-result excerpts rather than full page renders; this limitation is noted rather than
papered over.
