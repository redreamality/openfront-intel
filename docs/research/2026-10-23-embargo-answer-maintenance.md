# Embargo answer consolidation

Task type: existing-answer fact maintenance and duplicate consolidation, not a new guide.
Editorial verification: 2026-10-23. Publication becomes complete and Monitoring when this
change reaches production. Next trigger: a relevant formal rule change, confirmed factual
error, or a complete final-data observation window.

## Player task and answer ownership

- Cluster: embargo, stop trading, trade control, global versus targeted trade stop.
- Player task: choose which relationship to close without losing useful partners.
- Existing landing: `guides/embargo-timing-and-trade-control/`, all five languages.
- Competing landing: `guides/stop-trading-with-enemies-v35/`, all five languages.
- Gap: the older answer invented influence/capital/port gates, a manual temporary probe,
  a fixed minus-twenty relation change, immunity of all rail, and escort counterplay against
  the trade permission itself. The newer answer contradicted these claims but incorrectly
  generalized a player's embargo into a shutdown of third-party trade.
- Decision: retain the established route as the sole article, replace the incorrect
  explanations, and redirect the five newer routes to the corresponding language.
  No additional independent page is warranted.
- Natural entry: existing economy grouping in GuideCatalog, existing incoming links,
  updated-guide home entries. These continue to point at the retained route.
- Acceptance: four substantial sections in every language, identical rule boundaries,
  retained original publication date, truthful update date, working language-matched
  redirects, one catalog entry, canonical/hreflang, full relevant validation.

## Search scope

GSC refreshed successfully using `gsc-cli-oauth`, schemaVersion 2, web/final,
2026-10-14 through 2026-10-20. The private JSON and Markdown are in the automation cache.
This task is justified by confirmed factual errors, not a claimed traffic opportunity.
No zero-demand claim is made and no universal CTR curve is used.
Property/query metrics stay byProperty; queryPage remains byPage landing diagnostics,
with fragments separate. No query ranks are reconstructed from page rows.
The 2026-10-09 search batch still waits for the complete 2026-10-10 through 2026-11-06
final-data window. This maintenance has its own deployment day T and T+1 through T+28
window; no before/after causal claim is made now.

## Official evidence and boundaries

The required release-list API returned v0.35.2 as the latest non-draft, non-prerelease
release; published 2026-10-17T05:34:47Z. Its real body is not TEST.
Configuration, generated metadata, all five v35 changelogs and the home release
configuration remain on the v35 series / v0.35.2 formal release.
Upstream main was checked independently at f8c6c0dcb17f90148c7b830ff9309da896d3a781.
That main commit is not used to establish released mechanics.

Sources read from immutable local tags, accessed 2026-10-23:

- Official release: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.2
  The cumulative v0.35.0 notes identify the rename and preservation of ally trade.
- Global filter and start/stop behavior:
  https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/packages/engine/src/execution/EmbargoAllExecution.ts
  Both actions skip self, Bots, same-team and personal allies. Manual start uses false
  for the temporary flag; stop removes the issuing player's embargo only.
  Global start leaves an existing embargo unchanged, including an existing temporary
  restriction; the article explicitly avoids promising conversion to permanent.
- Eligibility, trade permission and relation behavior:
  https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/packages/engine/src/game/PlayerImpl.ts
  `canEmbargoAll` checks cooldown plus an eligible player, not economic prerequisites.
  `canTrade` checks either player's embargo. `addEmbargo` does not set a relation score.
- Single-player command:
  https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/packages/engine/src/execution/EmbargoExecution.ts
  Manual start uses false; no shared global cooldown in this execution.
- Timing:
  https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/packages/engine/src/configuration/EngineConfig.ts
  `embargoAllCooldown` is 100 ticks; `temporaryEmbargoDuration` is 3000 ticks.
- Attack-created restriction:
  https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/packages/engine/src/execution/AttackExecution.ts
  The attack path can apply a temporary embargo; this is not a manual timed probe.
- In-flight ships:
  https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/packages/engine/src/execution/TradeShipExecution.ts
  An uncaptured active ship is deleted when trade permission fails, before normal delivery.
  Captured ships have distinct handling; the article explicitly limits this claim.
- Dispatch:
  https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/packages/engine/src/execution/PortExecution.ts
  Partner filtering uses trade permission.
- Cross-player rail:
  https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/packages/engine/src/game/TrainStation.ts
  `tradeAvailable` accepts the station owner or a player allowed by `canTrade`.
  https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/packages/engine/src/execution/TrainExecution.ts
  The next-station route checks `tradeAvailable`; domestic ownership is a separate case.
- Historical global filter:
  https://github.com/openfrontio/OpenFrontIO/blob/v0.34.25/src/core/execution/EmbargoAllExecution.ts
  Historical teammate exemption predates v35; the v35 addition is personal allies.

Community recollection is not used as authority for these rules. New-guide 3+3 source
collection and 1500-word requirements do not apply to this maintenance. Each of the four
body sections is nevertheless checked at 401 words, with Chinese counted by word-like
Intl.Segmenter segments rather than substituting Han characters.

## Validation scope

The full browser gate additionally exposed five existing mobile-answer release links
still pointing at v0.34.22, plus two stale assertions for the already committed v35
snapshot. To complete the publishing gate, the five mobile pages were minimally advanced
to v0.35.2 after reading that tag's README cross-platform statement, English iOS
Home Screen strings and the release API's empty assets list. The release publication date
is 2026-10-17; verification date is 2026-10-23. No claim about all app stores is inferred
from an empty GitHub assets list, and no mobile interaction or install workflow is changed.
The map test now accepts the existing 132-map pool and also checks unique IDs.
Provenance checks the recorded snapshot version plus checkout SHA rather than an old
literal v34. No generated JSON is changed.
Additional official sources read:
https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/README.md and
https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/resources/lang/en.json ;
release assets were checked through the official GitHub API for tag v0.35.2.

The private automation cache retains baseline and final build/SEO logs, exact generated
JSON hashes and affected HTML paths. Pure content builds use `pnpm exec astro build`
to avoid extracting unrelated upstream changes. Browser coverage verifies five catalog
entries and five redirects. The final report records actual validation and delivery.
SEO baseline is not clean; compare complete diagnostic sets and target routes rather
than reporting the global audit as PASS.
