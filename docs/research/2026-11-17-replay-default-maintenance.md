# Replay viewer default and takeover maintenance

## Player task and unique answer

This is maintenance of the existing five-language `seekable-replay-viewer` answer. The player wants to open a finished game, jump to a useful moment, and understand whether continuing from that moment is possible. The existing route remains the main answer for opening and seeking. The already published `replay-takeover` guide remains the unique detailed answer for choosing a surviving player and testing a different decision as singleplayer. The `replay-review` guide continues to own the broader review method. No new public route, competing guide, or interactive site control is introduced.

The fixed query cluster covers replay viewing, seeking and continuing a finished game. The valid schemaVersion 2 Search Console cache was generated on 2026-11-12 and covers 2026-10-14 through 2026-11-10, with final web data for `sc-domain:openfront.fyi`. The weekly refresh is not yet due on this run. Exact original query spellings and their property-aggregated metrics remain in the private automation cache and run evidence. They are not reconstructed from page rows, combined into an inferred average ranking, or turned into a traffic forecast.

The English seeking guide and localized equivalents already receive relevant search visibility. Those landing-page observations are byPage diagnostics from queryPageRows, not additional property impressions. The sample supports correcting an established answer rather than creating another page for the same player task. It does not establish a causal traffic opportunity, and no generic CTR curve or estimated uplift is used. Language, country and device combinations can change the observed distribution, so a page diagnosis alone cannot establish that two routes are competing for exactly the same audience.

## Official evidence

Accessed on 2026-11-17:

- Official latest release and its actual cumulative body: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.2
- Official feature introduction: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.0
- Required release-list endpoint: https://api.github.com/repos/openfrontio/OpenFrontIO/releases?per_page=10
- Independent upstream development cursor: https://github.com/openfrontio/OpenFrontIO/commit/49fbe53bb9e592b6ed443ca9346a96954a1bfc01

The release-list GET returned v0.36.2 as the newest non-draft, non-prerelease, non-TEST release, published at 2026-11-11T22:09:39Z. Its cumulative v0.36.0 overview says the new replay viewer is the default for every replay, with the classic replay still available through Settings. It also explicitly describes pausing, pressing Continue, selecting a surviving player and a difficulty for the other humans, and playing from that moment as singleplayer. These are the only newly verified gameplay facts in this maintenance.

The upstream main cursor concerns serving Android App Links metadata. It is tracked independently and is not treated as a new formal release or a replay behavior change. Site configuration remains v0.36.2; the five current changelogs and homepage release entrances are checked through the release contract. Generated data remains the explicitly labelled v35 snapshot at commit f33d0049076b2931b73d06ac79d076799e54e8ac. This task does not run extract, relabel that snapshot, or change the footer.

## Correction and scope

The existing replay article described the original v35 rollout as opt-in, made enabling the toggle the first action, and excluded counterfactual play. Those statements were useful in their original version context but misleading as a current answer after v36. The new five-language first screen explains the current default, classic fallback, and Continue path before the preserved historical walkthrough. Search titles and descriptions carry the current v36 entry behavior rather than an instruction to enable the old rollout.

The retained material is explicitly scoped to the v0.35.2 walkthrough checked on 2026-10-21. Its old enable-first instructions and exclusion of takeover do not describe v36. The maintenance date records the entry-point correction only. Storage caps, benchmark timings, keyboard details, build compatibility, and all inherited numeric examples have not been silently reverified. The old version field continues to disclose that underlying detail scope, while the freshness summary separates it from the newly verified release behavior. The article links to the existing localized takeover answer and the localized v36 changelog in all five languages. The dedicated search-title mapping and the existing first-screen playback summary are synchronized too, so neither silently overrides the new answer with an old instruction. Their links and site behavior are preserved.

No new heading is added just to hold a short update. The current answer and historical boundary share the existing first section, so the original substantive section structure remains intact. The per-section minimum is still checked in all five languages. As existing-answer maintenance, this does not require collecting three fresh Reddit discussions or three fresh YouTube videos, nor meeting a new-article production quota. The prior source pack is read for historical context, not recounted as newly accessed community evidence.

## Acceptance and monitoring

Acceptance requires valid five-language current answers and historical boundaries, localized takeover and changelog links, one rendered H1, intact canonical and language alternates, and no newly introduced SEO diagnostics. Ordinary production HTML/XML hashes are compared before and after to enumerate all affected URLs, including index cards and recommendations. Generated JSON must retain exact baseline SHA256 values. The maintenance guide audit, release contract, strict core content audit, Astro check, production build, internal links, full SEO comparison, and whitespace checks form the delivery evidence.

This is editorial content maintenance. Game controls are explained, but site interaction behavior does not change, so interaction e2e is not required. The PR merges into Monitoring only after local acceptance and the existing clean/mergeable, checks, reviews, remote head and main gates. Deployment is verified for the exact squash commit. Publication identifiers and operational logs remain in automation memory and the external manifest.

The actual deployment date is T. Review the fixed query cluster only after T+1 through T+28 is fully available as GSC final data, with country and device fixed or separately reported. A new formal replay change or confirmed factual error can reopen the task earlier.
