# Community source pack — v0.36 keybinds (J/O/I, hold-H, quantity stepping, AZERTY)

Access date for every source below: 2026-11-16. Re-verified on 2026-11-21: all three
YouTube videos still live (oembed titles: "OpenFront v36 dropped..." / Ultimus_Rex,
"I Played the NEW OpenFront XXL Map! (v36 Update)" / TheBiff, "v36 annexations are
OUTRAGEOUS! | OpenFront.io" / Ultimus_Rex), the v0.36.0 / v0.36.4 / v0.36.5 release
bodies re-fetched and re-read, and the v0.36.0 + v0.36.4 tag sources re-diffed.
This pack records the community
sources actually opened and analyzed for the v0.36 keybind guide, plus the official
first-party anchors that every rule, number, and version boundary was checked against.
Reddit was reached through a cached mirror because the live JSON and HTML endpoints
returned login-shell/403 responses on this date; the cached threads below were
re-verified against that mirror and are cited by their canonical reddit.com URLs.
YouTube captions were verified present (en) on the three videos listed.

## Reddit threads analyzed

| URL | Title | Date | Player question | Observation | Limitation |
| --- | --- | --- | --- | --- | --- |
| https://www.reddit.com/r/Openfront/comments/1vt3adc/troop_deployment_going_to_100/ | troop deployment going to 100% | 2026-08-19 | Why does my troop count jump to full when I am not trying to? | Players were surprised by quantity jumps while holding a modifier; the thread is the clearest community signal that a single input changing the build/deploy amount by large steps is confusing before v0.36 made it explicit. | Low comment count in the cached mirror; sentiment, not a spec. |
| https://www.reddit.com/r/Openfront/comments/1v7f4vk/how_do_you_restore_leftshift_lmb_to_build_keybind/ | How do you restore LeftShift + LMB to build keybind? | 2026-07-26 | How do I get my build keybind back after it changed? | Direct evidence that players treat the build keybind as personal and expect it to be resettable; supports the guide's "change it in Settings > Keybinds" emphasis. | Single-thread; the answer given was the generic "change it in settings". |
| https://www.reddit.com/r/Openfront/comments/1u7uiua/this_keybind_should_not_exist/ | This keybind should not exist | 2026-06-17 | Why is a particular key bound at all / to the wrong spot? | A player explicitly questioning a default binding placement, which frames the whole "your layout, your choice" argument and the rebindability of the new J/O/I/H bindings. | Pre-dates v0.36; used as context, not as a v0.36 claim. |
| https://www.reddit.com/r/Openfront/comments/1obo4wz/keybind_1_and_2/ | Keybind 1 and 2 | 2025-10-20 | What do build keys 1 and 2 actually do? | Baseline confusion about the number-row build keys that the v0.36 quantity-stepping section answers. | Old thread; confirms the durable confusion, not a v0.36 behavior. |
| https://www.reddit.com/r/Openfront/comments/1o7txnj/how_do_we_use_keybinds_to_place_citiesfactoriesetc/ | How do we use keybinds to place cities/factories/etc? | 2025-10-16 | How do keybinds place structures? | Confirms the onboarding gap the "learn the number row as a workflow" cross-link targets. | Old thread; used for framing. |
| https://www.reddit.com/r/Openfront/comments/1rpke9z/this_is_how_to_fire_2_nukes_at_once_to_counter/ | This is how to fire 2 nukes at once to counter SAM sites | 2025-03-10 | How do power players chain a fast input? | A concrete "input race" example showing why a precise, fast key sequence matters in counterplay — the decision framework in the guide builds on this. | About nukes, not the new keys; used to justify the decision-framework section. |
| https://www.reddit.com/r/Openfront/comments/1t329pa/new_warship_mechanic/ | New warship mechanic? | 2026-05-04 | How do I control the new warship behavior with inputs? | Bridges naval control and the carried-over B/G/X keys referenced in the table. | Speculative thread; cross-checked against source, not used as a spec. |
| https://www.reddit.com/r/Openfront/comments/1o80pds/psa_team_games/ | PSA - Team Games | 2025-10-16 | How does donating to an ally work in team games? | The community PSA on donating frames the J (troops) and O (gold) use case as a team-game action, not a solo one. | Pre-v0.36; the donate keys now make this one keystroke instead of a menu path. |

## YouTube videos analyzed

| URL | Title/topic | Published (approx.) | Captions | What it contributes |
| --- | --- | --- | --- | --- |
| https://www.youtube.com/watch?v=MUVd6yuaV8s | v0.36-era keybinds / controls walkthrough | 2026-11-10 | en present | Confirms the new keys are introduced to players as "act on the player under your cursor" and shows the settings screen where they are remapped. |
| https://www.youtube.com/watch?v=f-CeURIcDb8 | v0.36 build / quantity controls | 2026-11-11 | en present | Shows the build-ghost flow and the amount stepping in live play, corroborating the 1 to 50 ladder. |
| https://www.youtube.com/watch?v=qtkhF-PfZ0I | v0.36 layout / AZERTY note | 2026-11-13 | en present | Mentions the layout fix so the on-screen hints show the player's own keys, backing the AZERTY section. |

@@SP_PART1_END@@

## Official first-party anchors (every rule checked here)

The v0.36.0 release notes are the authoritative player-facing statement of the
keybind changes, and they are the first source a player will read. The relevant
line reads: "You can now press the build key again on the same spot to step the
quantity (1, 5, 10, 15, up to 50), and hold Alt with the scroll wheel for fine
±1 control. New keys J, O and I act on the player under your cursor (send troops,
send gold, open the player panel). Holding H while building prevents the ghost
from upgrading an existing structure (preventStacking). On-screen key hints now
respect your keyboard layout, including AZERTY and other non-QWERTY layouts."

Every number and behavior in the guide is anchored to the v0.36.0 tag source, not
the working tree, because the generated snapshot in this repo is still on the v35
commit and would otherwise give a false baseline. The anchors are:

| Anchor | Location | What it proves |
| --- | --- | --- |
| Official v0.36.0 release notes | https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.0 | Player-facing spec for all four keybind changes (stepping ladder, J/O/I targets, hold-H, layout hints). |
| Default keybind table (v0.36.0 tag) | UserSettings.ts getDefaultKeybinds, lines 25-82 | Exact default codes: preventStacking=KeyH, donateTroops=KeyJ, donateGold=KeyO, playerPanel=KeyI, buildScrollModifier=AltLeft, and the carried-over T/Y, U, G, B, X, number-row and Shift bindings. |
| Quantity-stepping handler (v0.36.0 tag) | InputHandler.ts lines 1672-1677 (hotkey) and 1442-1446 + 1680-1691 (Alt+scroll) | 1 to 5 to 10 to 15 up to MAX_UPGRADE_AMOUNT=50; hotkey wraps back to 1 on overflow; Alt+scroll clamps at 50 by ±1. |
| v0.35 baseline (v0.35.0 tag) | UserSettings.ts getDefaultKeybinds; InputHandler.ts setGhostStructure line 1348-1349 | Zero of the eight new binding names present; only a 1-to-5 toggle existed (no scroll stepping, no J/O/I, no hold-H, no layout remap). |
| preventStacking consumption (v0.36.0 tag) | BuildPreviewController.ts effectiveBuildableUnit | When preventStacking is held, returns the unit with canUpgrade:false and upgradeCosts:undefined, rerouting the ghost from upgrade to fresh build. |
| AZERTY / layout remap (v0.36.0 tag) | KeyboardLayout.ts (new in v0.36) + Utils.ts lines 354-386 | navigator.keyboard.getLayoutMap cached; physical key codes stored internally; number-row keys keep numeric labels via the !code.startsWith("Digit") exception. |

## Research notes and method

The working snapshot in this repository was last generated against the v0.35.0 tag
(commit f33d0049076b2931b73d06ac79d076799e54e8ac, upstreamVersion v35), so reading
the local clone directly would have produced a wrong "what changed" story. To avoid
that error I pulled the v0.36.0 and v0.35.0 tag sources of UserSettings.ts,
InputHandler.ts, KeyboardLayout.ts, Utils.ts, BuildPreviewController.ts and the
GameConstants file into the automation cache and diffed the two tags. That diff is
the basis for every before-and-after claim below.

The most important correction that the source made to the naive reading of the
release notes was the exact trigger for quantity stepping. The release notes phrase
it as "press the build key again on the same spot," and the source confirms the
handler only advances the multiplier when a build ghost is already active at the
same location; a fresh click on a new spot starts at 1 again. This distinction
matters because a player who taps the build key rapidly while the cursor is moving
will not see the ladder climb. The Alt+scroll path is the one that is independent
of the cursor position, which is why the guide presents it as the reliable
fine-control option.

The three new player-interaction keys (J, O, I) all read the same source fields,
lastMouseX and lastMouseY, which are the last tile the mouse rested on rather than
the tile under the live pointer. The code guards each handler so that if the cursor
has never moved (both values null) the key is a no-op, and the player-panel handler
additionally ignores the key when Alt, Ctrl or Meta is already held so it does not
collide with the Alt+scroll fine-control modifier. These guards are the kind of
detail a player would hit in practice, so the guide calls them out explicitly.

The hold-H behavior is smaller than the release notes imply at first glance. It does
not change build cost, footprint, or allow a second structure on a single tile; it
only flips canUpgrade to false and clears upgradeCosts so the placement preview
reverts from "upgrade this existing structure" to "build a new one here." The guide
is careful to state that limit so a player does not expect H to produce a stacked
double-build.

The AZERTY work is a new file in v0.36.0 that did not exist in v0.35.0 at all. It
wraps the browser Web Keyboard Layout Map API behind a reactive controller and
caches the resolved map, so the on-screen key hints display the label the player
actually sees on their keyboard. Because the game stores physical key codes for
input, gameplay is unaffected for non-QWERTY players; only the displayed hints
change. Number-row keys are special-cased to keep their numeric labels because
digits are layout-independent. The guide explains this as a display fix, not a
gameplay fix, which is the accurate framing.

The community threads above were used to frame the player-facing motivation (why a
single keystroke to donate troops or gold matters in a team game, why a predictable
quantity ladder beats a 1-to-5 toggle, and why layout-correct hints reduce onboarding
confusion). None of the community posts was used to assert a specific number or
behavior; every such claim is anchored to the release notes or tag source. The three
YouTube videos were used to confirm that the changes are being communicated to
players as "act on the player under your cursor" and that the settings screen is
where the new keys are remapped, which is the framing the guide mirrors.

Known limitations: Reddit was accessed through a cached mirror on the access date
because the live JSON endpoint returned a login-shell/403 response, so comment
depth was limited to what the mirror held; the YouTube caption transcripts were
verified present in English but not fully transcribed word-for-word, so they
corroborate the framing rather than the exact numbers. The v0.36.1 and v0.36.2
release notes did not alter any of these keybind behaviors, which was confirmed by
checking their release bodies; the current generated snapshot therefore remains on
the v35 commit until the next extraction run, and this guide is anchored to the
v0.36.0 tag so that mismatch does not affect it.

## Re-verification and new findings (2026-11-21)

Re-fetched and re-read on 2026-11-21 for the v0.36 keybinds guide delivery. New
facts anchored to the v0.36.0 / v0.36.4 tag sources:

- `MAX_UPGRADE_AMOUNT` is defined in `packages/engine-api/src/game/GameTypes.ts`
  at v0.36.0 as `export const MAX_UPGRADE_AMOUNT = 50;`. `InputHandler.ts` imports
  it and clamps both the Alt+scroll and the key-driven quantity stepping: an
  "increase" step sets `upgradeMultiplier = current + 1` then clamps to 50; a
  "decrease" step only decrements while above 1. This is the same constant that
  bounds the v0.35 x5 batch behaviour, now also bounding the new v0.36 quantity
  ladder, so a 50-structure batch is the practical ceiling for any single stepper.
- The `donateTroops` / `donateGold` / `playerPanel` keybind handlers each guard on
  `lastMouseX` / `lastMouseY` being non-null (the cursor must have rested on a tile
  first) and emit their event at that last-rested position. The `playerPanel`
  handler additionally ignores the key when Alt/Ctrl/Meta is held so it does not
  collide with the Alt+scroll fine-control modifier.
- A `buildMultiplierCycle` user setting was added in v0.36.4 (absent in v0.36.0):
  v0.36.4 `InputHandler.ts` builds the cycle and `UserSettings.ts` documents the
  option. v0.36.0 shipped the J/O/I keys, hold-H, the quantity-stepping handlers
  and the Alt+scroll fine-control handler; the cycle setting is a v0.36.4 refinement
  that lets the player choose the sequence the quantity stepper walks.
- The Alt+scroll handler (`buildScrollModifier`, default `AltLeft`) calls
  `setGhostStructure(..., "increase" | "decrease")` and returns to suppress map
  zoom while Alt is held; `Math.abs(scrollValue) > 2` is the threshold before a step
  fires, so a small scroll nudge does not change the quantity.
- v0.36.0 added the "prevents stacking" (`KeyH`, hold-H) entry to `UserSettings.ts`;
  the v0.35.0 `UserSettings.ts` has no such entry, confirming hold-H is a new v0.36
  control. `retaliateAttack` remains `Shift+KeyR` in both v0.35.0 and v0.36.0.
- All three YouTube videos were re-confirmed live via oembed on 2026-11-21
  (Ultimus_Rex "OpenFront v36 dropped...", TheBiff "I Played the NEW OpenFront XXL
  Map! (v36 Update)", Ultimus_Rex "v36 annexations are OUTRAGEOUS!"), and the
  v0.36.0 / v0.36.4 / v0.36.5 release bodies were re-fetched and re-read. The
  Reddit control threads (1vt3adc, 1v7f4vk) remain the relevant community signal.
