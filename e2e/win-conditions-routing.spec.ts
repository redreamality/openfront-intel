import { expect, test } from "@playwright/test";

const cases = [
  {
    lang: "en",
    guidePath: "/guides/win-conditions/",
    indexPath: "/guides/",
    seoTitle: "OpenFront Win Conditions: Step-by-Step OpenFront.io Guide",
    canonical: /openfront\.fyi\/guides\/win-conditions\/$/,
    indexLink: "win conditions guide",
  },
  {
    lang: "zh",
    guidePath: "/zh/guides/win-conditions/",
    indexPath: "/zh/guides/",
    seoTitle: "OpenFront 胜负条件：OpenFront.io 分步教程与避坑指南",
    canonical: /openfront\.fyi\/zh\/guides\/win-conditions\/$/,
    indexLink: "胜利条件与对局结束攻略",
  },
  {
    lang: "fr",
    guidePath: "/fr/guides/win-conditions/",
    indexPath: "/fr/guides/",
    seoTitle: "Conditions de victoire dans OpenFront : guide pas à pas OpenFront.io",
    canonical: /openfront\.fyi\/fr\/guides\/win-conditions\/$/,
    indexLink: "guide des conditions de victoire",
  },
  {
    lang: "de",
    guidePath: "/de/guides/win-conditions/",
    indexPath: "/de/guides/",
    seoTitle: "Siegbedingungen in OpenFront: OpenFront.io Schritt-für-Schritt-Guide",
    canonical: /openfront\.fyi\/de\/guides\/win-conditions\/$/,
    indexLink: "Siegbedingungen-Guide",
  },
  {
    lang: "nl",
    guidePath: "/nl/guides/win-conditions/",
    indexPath: "/nl/guides/",
    seoTitle: "Wincondities in OpenFront: stapsgewijze OpenFront.io-gids",
    canonical: /openfront\.fyi\/nl\/guides\/win-conditions\/$/,
    indexLink: "win-conditions-gids",
  },
] as const;

for (const entry of cases) {
  test(`Win-conditions guide[${entry.lang}] is published with canonical and hreflang`, async ({ page }) => {
    await page.goto(entry.guidePath, { waitUntil: "domcontentloaded" });

    await expect(page).toHaveTitle(entry.seoTitle);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", entry.canonical);
    await expect(page.locator('link[rel="alternate"]')).toHaveCount(6);
  });

  test(`Guides index[${entry.lang}] carries an explicit win-conditions quick-answer card`, async ({ page }) => {
    await page.goto(entry.indexPath, { waitUntil: "domcontentloaded" });
    const indexRoute = page.locator("section[data-win-conditions-route]");
    await expect(indexRoute).toHaveCount(1);
    await expect(indexRoute.getByRole("link", { name: entry.indexLink, exact: true })).toHaveAttribute(
      "href",
      entry.guidePath,
    );
  });
}
