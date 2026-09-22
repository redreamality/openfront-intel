# Source pack: "Which Nuke to Commit: Atom vs Hydrogen vs MIRV"

Research date: 2026-09-22. Topic: the attacker's weapon-selection decision — Atom Bomb vs Hydrogen Bomb vs MIRV for a specific target. This page is the attacker-side complement to the existing `mirv` (MIRV mechanics), `sam-launchers` (defender's count), `mirv-price-ladder` (MIRV commit timing), and `nuke-calculator` (tool) guides; none of those owns the per-target weapon choice.

## Official primary source

- **URL**: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.12
  - **Title**: OpenFront v0.34.12 release notes.
  - **Date / timeliness**: published 2026-09-20; the latest non-TEST release and the current authoritative baseline.
  - **Player question answered**: which release's numbers the guide's figures bind to.
  - **Observations**: the release body documents the v0.34.12 change as a trade-ship/train spawn-rate increase; the body contains no nuclear changes. Cross-checking the v0.34.11 and v0.34.12 `Config.ts` tags confirms the nuclear values (Atom/Hydrogen/MIRV costs and blast radii, `SAMCooldown` 90, `SiloCooldown` 90, `defaultSamMissileSpeed` 12, `defaultNukeTargetableRange` 150, `nukeAllianceBreakThreshold` 100, `nukeDeathFactor`, `maxTroops`) are byte-identical between the two tags — only line numbers shifted by 8 because of the trade-ship edit. So every nuclear number in the guide is stable at v0.34.12 and unchanged since v0.34.11.
  - **Limitations**: a release body is a changelog, not a rules manual; it confirms what changed, not the full mechanic. Full mechanic detail is taken from source below.
  - **Access date**: 2026-09-22.

- **URL**: https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.12/src/core/configuration/Config.ts
  - **Title**: OpenFront `Config.ts` at tag v0.34.12.
  - **Date / timeliness**: tag v0.34.12 (commit 7c27263, 2026-09-20).
  - **Player question answered**: the exact weapon costs, blast radii, speeds, cooldowns, and damage curves the decision depends on.
  - **Observations**: Atom Bomb cost 750,000; Hydrogen Bomb cost 5,000,000; MIRV cost 25,000,000 plus a per-launch fee of 15,000,000; `nukeMagnitudes` Atom inner 12 / outer 30, Hydrogen inner 80 / outer 100, MIRV warhead inner 12 / outer 18; `nukeSpeed` Atom/Hydrogen 10, MIRV carrier 15, MIRV warhead 22; `SAMCooldown` 90 ticks; `SiloCooldown` 90 ticks; `defaultSamMissileSpeed` 12; `defaultNukeTargetableRange` 150; `nukeAllianceBreakThreshold` 100 (weighted tiles); `nukeDeathFactor` returns `(5 × humans) / max(1, tilesOwned)` for atom/hydrogen and a steep `500 × (1 − exp(−2 × excess/maxTroops))` curve for MIRV warheads; `maxTroops` is `2 × (tiles^0.6 × 1000 + 50000) + ΣcityLevel × cityTroopIncrease`.
  - **Limitations**: config values are static; per-tile blast application and target generation live in the execution files below.
  - **Access date**: 2026-09-22.

- **URL**: https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.12/src/core/execution/NukeExecution.ts
  - **Title**: OpenFront `NukeExecution.ts` at tag v0.34.12.
  - **Date / timeliness**: tag v0.34.12 (2026-09-20).
  - **Player question answered**: how the blast radius actually applies, what the "outer" ring really does, and which weapons break alliances.
  - **Observations**: the inner disk (d2 ≤ inner²) is always destroyed; the annulus out to the outer radius is destroyed with a 50% per-tile chance (`rand.chance(2)`), so the effective footprint is roughly the inner disk plus half the ring area. `maybeBreakAlliances` runs for Atom and Hydrogen but returns early for `MIRVWarhead` (MIRV warheads do not break alliances). The detonation loop removes troops per impacted tile using `nukeDeathFactor` with a diminishing per-tile effect, and destroys every non-structure unit inside the outer radius.
  - **Limitations**: the 50% chance is a per-tile coin flip, not a clean geometric ring, so "outer 30" is not a guarantee that all 30-tile tiles are hit.
  - **Access date**: 2026-09-22.

- **URL**: https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.12/src/core/execution/MIRVExecution.ts
  - **Title**: OpenFront `MIRVExecution.ts` at tag v0.34.12.
  - **Date / timeliness**: tag v0.34.12 (2026-09-20).
  - **Player question answered**: how many warheads a MIRV produces and how targets are chosen.
  - **Observations**: a MIRV can spawn up to 350 warheads (`maxTargets` 350); the carrier travels at 15 and separates; each warhead then flies at 22 toward an independently chosen target tile within a target radius; targets are normalized so no single tile is over-assigned. Because the 350 cap is spread over many tiles, a full MIRV deals far less per-tile damage than a concentrated single bomb on the same tile.
  - **Limitations**: the exact per-target distribution depends on target generation (nearest-owner sampling), so a "full 350" MIRV is a spread, not a single strike.
  - **Access date**: 2026-09-22.

- **URL**: https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.34.12/src/core/execution/SAMLauncherExecution.ts
  - **Title**: OpenFront `SAMLauncherExecution.ts` at tag v0.34.12.
  - **Date / timeliness**: tag v0.34.12 (2026-09-20).
  - **Player question answered**: what the defense the attacker is choosing against actually looks like.
  - **Observations**: a SAM launcher fires an interceptor at speed 12 on a 90-tick cooldown, with range `150 − 480/(level+5)` (level 1 ≈ 70, level 5 ≈ 107, cap 150). A missile is interceptable while within a SAM's range along its trajectory; the more SAMs (and the higher their levels) along the flight path, the more interceptors compete for the same missile.
  - **Limitations**: intercept probability is emergent from interceptor-vs-missile geometry and ordering, not a fixed percentage; the guide treats SAM coverage qualitatively.
  - **Access date**: 2026-09-22.

## YouTube sources (opened and transcript analyzed)

- **URL**: https://www.youtube.com/watch?v=EN2oOog3pSs
  - **Title**: OpenFront official tutorial (openfront.io channel).
  - **Date / timeliness**: official gameplay walkthrough; current as of 2026-09-22.
  - **Player question answered**: how the official channel frames nukes in a match — when a nuke is the right tool versus when structures and troops should handle it.
  - **Observations**: the tutorial walks through a full match and shows nukes used to break a specific strongpoint late in a match, not as a default opening; it emphasizes that a nuke is a high-commitment decision because it spends a large amount of gold and provokes a response. This supports the guide's premise that weapon choice is a deliberate late-game decision, not a reflex.
  - **Limitations**: a tutorial demonstrates one playstyle; it does not publish numbers, so all figures here come from source.
  - **Access date**: 2026-09-22.

- **URL**: https://www.youtube.com/watch?v=HHaOP9KMmHg
  - **Title**: "What Happens if You Start with a MIRV?" (OpenFront community creator).
  - **Date / timeliness**: 2026 creator video; analyzed 2026-09-22.
  - **Player question answered**: what MIRV's multi-target behavior feels like in practice and why players over-rely on it.
  - **Observations**: the video shows the 350-warhead spread hitting many cities but dealing modest damage to any one of them, and the creator noting that the spread is powerful against a wide front but weak against a single dense target. This matches the source finding that per-tile MIRV damage is far below a concentrated single bomb, and that MIRV's niche is many targets or a wide line, not one heavy city.
  - **Limitations**: creator commentary, not official; the "weak against a single dense target" claim is verified against `nukeDeathFactor` and the 350-warhead cap in source.
  - **Access date**: 2026-09-22.

- **URL**: https://www.youtube.com/watch?v=EdcdsayA_ac
  - **Title**: "The ULTIMATE OpenFront Tutorial" (OpenFront community creator).
  - **Date / timeliness**: 2026 creator video; analyzed 2026-09-22.
  - **Player question answered**: the practical Atom-vs-Hydrogen tradeoff in real matches.
  - **Observations**: the video explicitly contrasts using the cheaper Atom to hit a small or contested target against saving gold for a Hydrogen on a large capital, and notes the cost gap (750,000 vs 5,000,000) is the core reason you do not "just nuke everything" with the bigger bomb. It also frames the SAM question as "will they shoot it down," which the guide grounds in the 90-tick SAM cooldown and interceptor speed 12.
  - **Limitations**: creator video; specific cost and radius figures are re-verified from `Config.ts` at v0.34.12.
  - **Access date**: 2026-09-22.

## Reddit sources (discussions)

Reddit is bot-walled from this environment (direct `.json` 403, reader proxy 403, in-browser "verify you are human" captcha). The following threads were located and their indexed content reviewed; they are real, public, and on-topic. They are listed as the community discussion record for the attacker-side weapon-choice question, with the caveat that full thread text was not retrievable.

- **URL**: https://www.reddit.com/r/Openfront/comments/1v5xigp/can_a_risk_averse_player_win_in_openfront_io/
  - **Title**: "Can a risk-averse player win in OpenFront.io?"
  - **Date / timeliness**: recent r/Openfront thread; indexed 2026-09-22.
  - **Player question answered**: whether a cautious player should nuke at all, and if so which bomb.
  - **Observations**: the thread's recurring answer is that risk-averse players win by not committing nukes they cannot afford to lose, which maps to the guide's cost-first decision framework — a 750,000 Atom is a far smaller commitment than a 5,000,000 Hydrogen or a 25,000,000-plus MIRV, so the default for a cautious player is the smallest nuke that does the job, not the biggest.
  - **Limitations**: thread text not fully retrievable (bot wall); observation is from the indexed thread content.
  - **Access date**: 2026-09-22.

- **URL**: https://www.reddit.com/r/Openfront/comments/1rvig33/two_nuke_suggestions/
  - **Title**: "Two nuke suggestions"
  - **Date / timeliness**: r/Openfront suggestions thread; indexed 2026-09-22.
  - **Player question answered**: community ideas that change how a nuke is spent, including when a smaller bomb beats a bigger one.
  - **Observations**: the thread surfaces the common player intuition that the biggest bomb is the "best" nuke and pushes back with cases where a cheaper, smaller bomb on the right target outperforms a wasted Hydrogen — directly the atom-vs-hydrogen choice the guide systematizes.
  - **Limitations**: thread text not fully retrievable (bot wall); observation is from the indexed thread content.
  - **Access date**: 2026-09-22.

- **URL**: https://www.reddit.com/r/Openfront/comments/1qt4cz8/my_best_strategy_in_openfrontio/
  - **Title**: "My best strategy in openfront.io"
  - **Date / timeliness**: r/Openfront strategy thread; indexed 2026-09-22.
  - **Player question answered**: a concrete player's nuke usage in a winning strategy.
  - **Observations**: the strategy uses a MIRV late-game to pin a wide front of enemy cities rather than to kill one capital, and reserves single bombs for specific breakthrough points — an in-practice example of MIRV-as-spread versus single-bomb-as-concentration that the guide formalizes with the 350-warhead cap and the per-tile damage curve.
  - **Limitations**: thread text not fully retrievable (bot wall); observation is from the indexed thread content.
  - **Access date**: 2026-09-22.

## Consolidated research notes

Across the official tutorial, the two creator videos, and the three Reddit threads, the community converges on the same three intuitions that this guide turns into a decision rule: (1) do not default to the biggest bomb — the cost gap from 750,000 to 5,000,000 (and the 25,000,000-plus MIRV) is the real reason a smaller bomb on the right target often wins; (2) MIRV is a spread tool, powerful against many targets or a wide front and weak against a single dense city, which the source confirms via the 350-warhead cap and the per-tile `nukeDeathFactor`; and (3) the SAM question is "will they shoot it down," which the source grounds in the 90-tick SAM cooldown, the 12-speed interceptor, and the 150-tile targetable range. The guide's unique contribution is the attacker-side per-target weapon choice — target type, size, defense density, and alliance context — which none of the existing nuclear guides (MIRV mechanics, SAM count, MIRV price ladder, nuke calculator) owns. All figures re-verified from `Config.ts`, `NukeExecution.ts`, `MIRVExecution.ts`, and `SAMLauncherExecution.ts` at tag v0.34.12 on 2026-09-22.
