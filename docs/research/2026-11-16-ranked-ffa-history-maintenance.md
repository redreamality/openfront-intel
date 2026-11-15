# Ranked FFA historical-answer maintenance

## Target and demand

This is maintenance of five existing answers, not a new long-form topic. The player task is to understand whether the old Ranked FFA queue can still be joined and where current free-for-all ratings are explained. The fixed query cluster is `ranked ffa`, with `ofstats`, `ofstats io`, `ofstats openfront`, and `ofstats.io` as adjacent rating queries. The existing route is `/guides/ranked-ffa/` and its four localized equivalents. The unique answer for the current rating system remains `/guides/ffa-rating-system/`, also available in all five languages. No additional competing answer is created.

The last valid Search Console cache was generated on 2026-11-12 and covers 2026-10-14 through 2026-11-10. It uses schemaVersion 2, final web data, and property `sc-domain:openfront.fyi`. The weekly refresh is not due at this run on 2026-11-16. The property-aggregated `ranked ffa` row has five impressions, zero clicks, and average position 3.4. Its page diagnosis points to the old English Ranked FFA answer. Adjacent OFstats rows have 45, 19, 8, and 2 impressions respectively; these are separate original queries, not an inferred search-volume estimate. Page diagnostics are not summed to reconstruct property rankings. This small sample supports correcting an existing answer, not a traffic forecast or a new page.

## Official evidence and factual boundary

- Accessed 2026-11-16: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.2
- GitHub REST evidence: https://api.github.com/repos/openfrontio/OpenFrontIO/releases?per_page=10
- Release-specific introduction: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.0
- Independent development cursor: https://github.com/openfrontio/OpenFrontIO/commit/445721718207b6e0f068258cd8ff2eccd13d198e

The mandatory release-list GET returned v0.36.2 as the latest non-draft, non-prerelease, non-TEST release, published on 2026-11-11 at 22:09:39 UTC. Its actual body includes the v0.36.0 overview. That overview explicitly says the ranked FFA queue is gone and public FFA games now count toward an OFstats FFA Rating. This is sufficient first-party evidence for the replacement and for the direction of the current-answer link. It does not require reverse engineering the rating algorithm or treating a community claim as a mechanic.

The independent upstream main cursor is `445721718207b6e0f068258cd8ff2eccd13d198e`, committed on 2026-11-14. It concerns Canada island regions and does not create a newer formal release. The site's release configuration is v0.36.2. Its five v36 changelogs and five homepage release entrances are checked by the release contract. Generated data remains explicitly scoped to v35 and commit `f33d0049076b2931b73d06ac79d076799e54e8ac`; this maintenance does not extract or relabel that snapshot.

The old Ranked FFA page was last written against upstream commit `a15138358930c10241e9ceb4be1ce3389477e970` on 2026-10-12. Its former introduction called the queue both real and not yet shipped in a numbered release. Leaving that introduction beside a current site release label was misleading after the queue had been replaced. The old page also retained a not-released metadata value, while a separate current FFA Rating guide already existed. The remedy is a consistent historical title, search description, freshness statement, and first-screen answer in every language.

## Implementation and limits

The first answer now says the old queue has been replaced and links directly to the existing localized FFA Rating guide. A second paragraph links to the corresponding v36 changelog. A final scope notice explicitly states that all sections below preserve the historical queue description, including any present-tense instructions. It says not to wait for that queue's launch or apply its former player count, map pool, or timer as requirements of today's rating system.

The historical body is retained for readers following old discussions and links. Its numbers have not been silently reverified against v36. The `version: v34` field remains the old content scope, while the new freshness statement explains that only the replacement status was checked on 2026-11-16. The maintenance date therefore records a real correction without pretending that every inherited strategy or example has received a current mechanics review. The old pre-release introduction is removed because it contradicted the current replacement statement and no longer helped a player decide what to play.

This run does not add or validate calibration counts, rating eligibility thresholds, rank formulas, season lengths, or membership conditions. Those details belong to the existing current guide and require their own evidence if changed. The former queue's historical tactical examples are not republished as current advice. Reddit and YouTube collection quotas and the new-article 1,500-word floor do not apply to this narrow maintenance. The existing per-section requirement remains checked by the maintenance guide audit.

## Acceptance and monitoring

Acceptance requires five matching historical notices, localized current-answer and changelog links, valid canonical and language alternates, a single rendered H1, and no newly introduced SEO diagnostics. Build output is compared against the ordinary production baseline to enumerate every affected public URL, including index and recommendation metadata. Generated JSON SHA256 values must remain identical. Core content, release contract, Astro checking, production rendering, internal links, maintenance guide auditing, and whitespace checks are required.

No site control, navigation component, cookie flow, or language-switch behavior changes. Existing inline content links use the normal MDX renderer. This is editorial maintenance rather than a new interactive workflow, so interaction e2e is not required. The PR merges into Monitoring only after local acceptance and the existing remote head, mergeability, checks, and review gates. Publication and the exact commit evidence are recorded in automation memory and the external run manifest, not appended here after merge.

The deployment date is T. Evaluate the fixed query cluster only after the complete T+1 through T+28 window becomes final in GSC. Keep country and device filters fixed or report them separately. The current sample is too small for a causal uplift claim; future formal rating changes or a confirmed factual error can reopen the task sooner.
