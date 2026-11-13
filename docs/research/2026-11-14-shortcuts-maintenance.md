# v36 shortcuts: existing answer maintenance

Accessed: 2026-11-14, Asia/Vladivostok. This is maintenance of five existing reference pages, not a new long-form guide.

## Player task and scope

- Cluster: OpenFront shortcuts, hotkeys, donate troops/gold, player panel, separate structure, build amount.
- Task: find the default input for a known action, and distinguish amount selection from actually placing or launching.
- Unique answer: `/shortcuts/` and its zh/fr/de/nl equivalents. The existing `/guides/hotkeys/` remains a training guide with its explicitly stated v35 verification scope; it is not relabeled as fully checked against v36.
- Trigger: released controls missing from the reference and a stale x1/x5-only description. No new route or search-demand claim.
- GSC: last valid cache generated 2026-11-12, schemaVersion 2, web/final, 2026-10-14..11-10. Site/query metrics are byProperty; queryPage is byPage diagnostics only. Weekly refresh is not yet due. No traffic benefit or current query-volume estimate is asserted.
- Natural entrances: existing five-language navigation, reference links and training-guide links already reach these routes; none is changed.
- Acceptance: five languages state matching inputs, amount progression, resource limits and single-action exceptions; rendered tables and links remain valid; no new SEO diagnostics; generated data unchanged.

## Official evidence and limits

1. https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.2
   Latest formal non-draft/non-prerelease Release at this run; published 2026-11-11T22:09:39Z. Its included v0.36.0 notes announce J/O donations, I player panel, held H for separate construction, build-key amount progression, Alt+scroll adjustment and layout-aware defaults. Not a TEST placeholder.
2. https://github.com/openfrontio/OpenFrontIO/blob/v0.36.2/src/client/InputHandler.ts
   `setGhostStructure` starts at 1, repeated selection changes 1 to 5 then adds 5, wraps above 50 to 1; scroll changes by 1 and clamps to 1..50. The modifier scroll path returns before zoom. The Release describes the repeated-key workflow at the same spot. Paused/catching-up input may be ignored; repeated input is not a guarantee of a purchase.
3. https://github.com/openfrontio/OpenFrontIO/blob/v0.36.2/src/client/controllers/BuildPreviewController.ts
   `resolveGhostCostAndMultiplier` applies the multiplier to upgrades and Atom Bombs; ordinary new structures, Hydrogen Bombs and MIRVs use one action. `effectiveBuildableUnit` disables upgrading when preventStacking is held. Atom Bomb affordability also checks ready missile count. No assertion that H can bypass placement rules.
4. https://github.com/openfrontio/OpenFrontIO/blob/v0.36.2/src/client/UserSettings.ts
   Defaults: preventStacking KeyH, donateTroops KeyJ, donateGold KeyO, playerPanel KeyI, buildScrollModifier AltLeft. Local saved bindings remain authoritative.
5. https://github.com/openfrontio/OpenFrontIO/blob/v0.36.2/packages/engine-api/src/game/GameTypes.ts
   `MAX_UPGRADE_AMOUNT` is 50. Bulk upgrade costs use cumulative escalating levels, not a flat single-price multiplication.

The upstream main cursor was independently checked at `2f8df648c5a6de5685beed3ba2b66602f1163074`, whose latest change removes v36 maps from New in preparation for v37. This is not a formal v37 Release and does not change the public release boundary. Site configuration and five-language v36 changelogs remain on v0.36.2; generated data explicitly remains v35 and is not regenerated for a controls edit.

Existing v35 remapping evidence retains its own date and source links. The ordinary number-row example of pressing 8 twice for five bombs remains valid as an example, but the reference no longer describes subsequent presses as toggling between only 1 and 5. Unrelated costs, Silo timing and historical mouse details are not newly certified by this maintenance.

## Delivery and monitoring

This PR merging completes the reference maintenance and returns this intent to Monitoring. Reopen only for a relevant formal control change, a confirmed error, or the task's own complete final-data review window. Use actual deployment day T and the entire T+1..T+28 final GSC window, with the query cluster above and fixed or separately reported country/device scope. This edit is not evidence of traffic causation.

Validation covers content and release contracts, Astro check, ordinary production build, internal links, baseline/final SEO comparison, table rendering and existing entrance regression tests. Source inspection is not execution of upstream game tests. New-guide 1500-word, per-section long-form and 3+3 community quotas do not apply to this compact reference maintenance.

Final results after rebasing onto concurrent main `54d8ac9`: core 95/95 and What's New PASS; latest Release contract 5/5 PASS; Astro check 0 errors/0 warnings/9 existing hints; ordinary production build 1125 pages and 1130 HTML; 53,858 internal links with zero broken; shortcuts rendering/navigation/breadcrumb regression 15/15 PASS. Rebuilt main baseline and final SEO output are identical: 119 existing title truncations and 84 redirect hrefs, with no target-page diagnostic. Exactly five shortcut HTML files changed; generated JSON SHA256 values are unchanged. There is no site interaction change; the focused regression additionally verifies the updated reference and existing entrances.
