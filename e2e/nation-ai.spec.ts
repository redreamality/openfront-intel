import { expect, test } from "@playwright/test";

const localeCases = [
  {
    lang: "en",
    prefix: "",
    directAnswer: /Direct answer/i,
    deterministic: /deterministic pseudorandom/i,
    randomBoundary:
      /do(?:es)? not guarantee (?:the same|identical) actions?|not guarantee the same action/i,
    sharedWater: /shared water body/i,
    betrayal:
      /betrayal candidate|candidate for betrayal|does not trigger immediate betrayal/i,
    samBoundary: /SAM is not nuclear immunity|SAM does not make.*immune/i,
  },
  {
    lang: "zh",
    prefix: "/zh",
    directAnswer: /直接答案/,
    deterministic: /确定性伪随机/,
    randomBoundary: /不保证.*(?:相同|同一)动作|不能保证.*(?:相同|同一)动作/,
    sharedWater: /共享水体/,
    betrayal: /背叛候选|候选.*背叛/,
    samBoundary: /SAM 不是核免疫|SAM.*不等于核免疫/,
  },
  {
    lang: "fr",
    prefix: "/fr",
    directAnswer: /Réponse directe/i,
    deterministic: /pseudo-?aléatoire déterministe/i,
    randomBoundary:
      /ne garantissent? pas la même action|sans garantir la même action/i,
    sharedWater: /étendue d['’]eau partagée|plan d['’]eau partagé/i,
    betrayal:
      /candidat[e]? à la trahison|ne déclenche pas une trahison immédiate/i,
    samBoundary:
      /SAM.*(?:ne rend pas immunisé|n['’]accorde pas d['’]immunité nucléaire|n’est pas une immunité)/i,
  },
  {
    lang: "de",
    prefix: "/de",
    directAnswer: /Direkte Antwort/i,
    deterministic: /deterministische[rsn]? Pseudozufall/i,
    randomBoundary:
      /garantier(?:t|en) (?:nicht dieselbe Aktion|keine gleiche Aktion)|keine identische Aktion garantiert/i,
    sharedWater: /gemeinsam(?:e[sn]?)? Gewässer|geteiltes Gewässer/i,
    betrayal: /Verratskandidat|Kandidat für Verrat/i,
    samBoundary:
      /SAM.*(?:keine nukleare Immunität|verleiht keine Immunität gegen Atomwaffen|macht.*nicht immun)/i,
  },
  {
    lang: "nl",
    prefix: "/nl",
    directAnswer: /Direct antwoord/i,
    deterministic: /deterministische pseudowillekeur/i,
    randomBoundary:
      /garandeert niet dezelfde actie|geen identieke actie garandeert|hoeven niet dezelfde actie te geven/i,
    sharedWater: /gedeeld waterlichaam|gedeelde watermassa/i,
    betrayal: /verraadskandidaat|kandidaat voor verraad/i,
    samBoundary: /SAM.*(?:geen nucleaire immuniteit|maakt.*niet immuun)/i,
  },
] as const;

for (const locale of localeCases) {
  const indexPath = `${locale.prefix}/mechanics/`;
  const articlePath = `${locale.prefix}/mechanics/nations/`;

  test(`mechanics index[${locale.lang}] has one Nation AI entry`, async ({
    page,
  }) => {
    await page.goto(indexPath, { waitUntil: "domcontentloaded" });

    await expect(page.locator(`a[href="${articlePath}"]`)).toHaveCount(1);
    await expect(page.locator("main")).toContainText("11");
  });

  test(`Nation AI[${locale.lang}] preserves the verified decision contract`, async ({
    page,
  }) => {
    await page.goto(articlePath, { waitUntil: "domcontentloaded" });
    const main = page.locator("main");

    await expect(main).toContainText(locale.directAnswer);
    await expect(main).toContainText("v0.33.7");
    await expect(
      main.locator('[data-freshness-summary] time[datetime="2026-08-22"]'),
    ).toHaveCount(1);

    await expect(main).toContainText(locale.deterministic);
    await expect(main).toContainText(locale.randomBoundary);
    await expect(main).toContainText(/65\s*[–-]\s*99/);
    await expect(main).toContainText(/55\s*[–-]\s*69/);
    await expect(main).toContainText(/45\s*[–-]\s*59/);
    await expect(main).toContainText(/30\s*[–-]\s*49/);

    await expect(main).toContainText(/75\s*%/);
    await expect(main).toContainText(/90\s*%/);
    await expect(main).toContainText(/35\s*%/);

    await expect(main).toContainText(locale.sharedWater);
    await expect(main).toContainText(/ocean/i);
    await expect(main).toContainText(/3[,.\s]000/);

    await expect(main).toContainText(/1\s*\/\s*30/);
    await expect(main).toContainText(locale.betrayal);
    await expect(main).toContainText(/10\s*[×x]/i);
    await expect(main).toContainText(locale.samBoundary);

    await expect(
      main.locator(`a[href="${locale.prefix}/mechanics/alliances/"]`),
    ).toHaveCount(1);
    await expect(
      main.locator(`a[href="${locale.prefix}/mechanics/nukes/"]`),
    ).toHaveCount(1);
    await expect(
      main.locator(
        'a[href^="https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/"]',
      ),
    ).not.toHaveCount(0);
  });
}
