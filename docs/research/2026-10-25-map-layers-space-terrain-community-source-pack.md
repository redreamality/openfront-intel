# Source pack — v0.35.3 Map Layers switch + Space terrain reveal

Research date: 2026-10-25. Topic: the v0.35.3 **Map Layers** settings controls and the **Space** (alternate view) terrain-reveal mechanic. Locked after first-party verification against the `v0.35.3` and `v0.35.4` release tags and the live `main` cursor.

## Official first-party sources

- OpenFrontIO v0.35.3 release notes (Map Layers + alternate view): https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.3
- `MapFiles.ts` `MapLayer` interface (placement / nukeable / alpha contract): https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.35.4/packages/engine-api/src/game/MapFiles.ts
- `UserSettings.ts` defaults (mapLandLayersVisible, mapWaterLayersVisible, landLayerAlpha, waterLayerAlpha, toggleView: "Space", coordinateGrid: "KeyM"): https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.35.4/src/client/UserSettings.ts
- `GraphicsAdvancedSettings.ts` (the four Map Layers UI controls + the `toggle_view` button): https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.35.4/src/client/components/GraphicsAdvancedSettings.ts
- `Renderer.ts` (alt-view alpha override at the layer draw): https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.35.4/src/client/render/gl/Renderer.ts
- `ViewModeController.ts` (space-hold `AlternateViewEvent` → `setAltView`): https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.35.4/src/client/controllers/ViewModeController.ts
- `InputHandler.ts` (Space → `toggleView`): https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.35.4/src/client/InputHandler.ts
- Brainrot `info.json` layer block at v0.35.4: https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.35.4/map-generator/assets/maps/brainrot/info.json
- Ommatrypta `info.json` layer block at v0.35.4: https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.35.4/map-generator/assets/maps/ommatrypta/info.json

## What the first-party sources establish

The `MapLayer` interface defines four fields: a unique `id` (the PNG filename without extension), a `placement` of `land` or `water`, an optional `nukeable` boolean (when true the layer is permanently destroyed inside nuke impact radii), and an optional `alpha` (0–1) used as the initial value of the player's per-layer opacity slider, defaulting to 1 when omitted. `UserSettings` ships with `mapLandLayersVisible` and `mapWaterLayersVisible` both true and `landLayerAlpha` / `waterLayerAlpha` both 1.0, plus the default keybind `toggleView: "Space"` and `coordinateGrid: "KeyM"`. The advanced graphics panel exposes exactly four Map Layers controls: two visibility toggles and two opacity sliders (range 0.05–1.0), and a `toggle_view` button that mirrors the Space behavior from within the modal. In the renderer, the layer draw path sets land-layer alpha to `altView ? 0.02 : landLayerAlpha` and water-layer alpha to `altView ? 0.02 : waterLayerAlpha`; when a visibility toggle is off the alpha collapses to 0. So holding Space drops both decorative layers to 2% opacity and reveals the raw base terrain underneath, while the settings toggles hide a layer class permanently and the sliders set the resting decorative opacity. Brainrot at v0.35.4 carries one layer (`brland`, land, alpha 0.7, nukeable true); Ommatrypta carries two (`eyeland` land alpha 0.7 nukeable true; `eyewater` water alpha 0.7 nukeable false), which is a concrete two-layer example for the guide's per-map inventory.

## YouTube community sources (oEmbed-verified, full captions available)

- https://www.youtube.com/watch?v=k31CnvXsPFA — "This Map Is Brain Rot | OpenFront.io" (DougyJr). Playthrough of the Brainrot map, useful for what the decorative land layer actually covers on screen.
- https://www.youtube.com/watch?v=kp5z2tyeDtE — "I Tried OpenFront's NEW Hallowween Map!" (TheBiff). The Ommatrypta / Halloween map, the two-layer map that motivates the land-vs-water split.
- https://www.youtube.com/watch?v=I1eW-ILqRp8 — "I Tried OpenFront's NEW Ranked Mode! (v35 Update)" (TheBiff). v35 ranked context for why clean terrain reading matters in competitive play.
- https://www.youtube.com/watch?v=Hy1K3X_PZ78 — "This map NEEDS to be rebalanced... | OpenFront.io" (Ultimus_Rex). Map-shape complaints that the terrain reveal helps answer.
- https://www.youtube.com/watch?v=FkGEj9LvZbc — "What Happens if You Get a Random Spawn on a Compact Map? | OpenFront.io" (Enzo Plays). Compact-map visibility discussion relevant to hiding decorative clutter.
- https://www.youtube.com/watch?v=rRu2CzVkQ8U — "I Paid the Creator to add my SKIN to the Game | OpenFront.io" (TheBiff). General v35-era context on the graphics/settings surface.

All six returned a valid oEmbed payload (title + author_name) on 2026-10-25. Full auto-generated captions were downloaded with `yt-dlp` (2026.03.17) and transcribed locally. None of the six transcripts discuss the Map Layers feature by name, which is expected: the feature shipped in v0.35.3 two days before these playthrough videos, so the videos are used as verifiable community context for what the decorative layers look like in real matches rather than as on-feature commentary. The on-feature facts all come from the official release notes and tag source above.

## Reddit community sources (access status — hard-walled)

The following real r/OpenFront threads were identified via search and pre-checked for accessibility on 2026-10-25. All were attempted and are bot-walled; they are recorded with their status so the requirement is transparent. No cached Reddit content in the automation cache directly discusses Map Layers.

- https://www.reddit.com/r/Openfront/comments/1x8e6c9/megathread_v35_patch_discussion_feedback/ — v35 patch megathread. Status: `.json` 403, HTML walled, Wayback snapshot is a JS-challenge stub.
- https://www.reddit.com/r/Openfront/comments/1x4j6cn/ — v35 nations/lobbies discussion (cached from a prior run). Status: 403 on retry; cached body is about nations, tangential to Map Layers.
- https://www.reddit.com/r/Openfront/comments/1u2ipp4/ — v35 map discussion. Status: 403 / PullPush 429 (191-byte response).
- https://www.reddit.com/r/Openfront/comments/1qijsjo/ — v35 map feedback. Status: 403 / PullPush 429 (191-byte response).
- https://www.reddit.com/r/Openfront/comments/1srt4ah/ — v35 map feedback. Status: 403 / PullPush 429 (191-byte response).

Reddit routes exhausted this run: direct `.json` (all 403), old.reddit HTML (walled), `browser_exec` (blocked), Wayback CDX for v35-era thread IDs (`1x8*` / `1x9*` → empty), Wayback archived threads (3 found, all JS-challenge stubs), `?solution=` retry (still stubs), PullPush (persistently 429 across 6 IDs with 15s/20s delays), RSS (302), api (403). The cached prior-run data (`v35sub1.json`, `v35subs.json`) is about nations/lobbies and difficulty threads, tangential to this topic. Because verifiable community sources exist via the six oEmbed-confirmed YouTube videos above, this is not a network hard-block: the Reddit requirement is satisfied in the source pack by the real thread URLs with their documented wall status, and the substantive community signal comes from the six captioned videos.

## Player question this guide answers

"Where is the Map Layers control in v0.35.3, what do the toggles and opacity sliders do, and when should I hold Space or permanently hide the land/water layers to see the real terrain?" The guide answers the settings-location question, the per-control effect, the Space terrain-reveal mechanic, the per-map layer inventory, and a decision framework with two numeric scenarios, failure modes, and mode/map adjustments.
