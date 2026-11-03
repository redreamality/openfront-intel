# v35.10 Viverse integration five-language maintenance

Date: 2026-11-04. Task type: formal Release response for the existing five-language `/changelog/v35/` answer. No new mechanism page.

## Player task and evidence

Players need to know that the current formal release is v0.35.10 and that its only announced change is Viverse integration. The official [v0.35.10 Release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.10) was published on 2026-11-03 and is neither draft nor prerelease. Its body says: “Add Viverse integration.” The release tag resolves to commit `79aed26b677c234046ac6c82d1ed95f82b0e0227`.

The release does not announce a combat rule, economy formula, map change, progression rule, universal entitlement, or account migration behavior. The five-language answer therefore describes Viverse as a platform and access-surface change, asks players to verify the sign-in and lobby flow shown to their account, and avoids promising identical portal features.

## Scope and boundary

- Updated `src/config/openfront-release.ts` from `v0.35.9` to `v0.35.10`. The v35 series remains the canonical route, so the five home latest-release cards and provenance links continue to derive from one config value.
- Updated the five `src/content/changelog/*/v35.mdx` files with v35.10 title/description, the direct answer, a practical access check, and the latest formal boundary.
- Kept all v35.9, v35.7, v35.6, and earlier gameplay boundaries intact. No generated data extraction was needed because the release does not change structured game data.
- Upstream `main` is tracked separately: GitHub REST returned commit `4ae6e3e4c277166a457cfa5e84fb43d3ffc94fd9` on 2026-11-03. This unreleased main commit is not used as public gameplay evidence.

## Validation target

Run the formal release audit, core content audit, Astro check, production build, internal-link audit, SEO audit with before/after comparison, and `git diff --check`. The maintenance uses the existing release-page contract; the new-guide Reddit/YouTube and 1500-word requirements do not apply.
