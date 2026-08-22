import { expect, test } from '@playwright/test';

test('nuke calculator computes exact costs, ready slots, range, and updates live', async ({ page }) => {
  await page.goto('/guides/nuke-calculator/', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('heading', { level: 2, name: 'Nuke cost and launcher calculator' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Calculated results' })).toBeVisible();

  await expect(page.getByLabel('Current Gold')).toHaveValue('200000000');
  await expect(page.getByLabel('MIRVs already launched globally')).toHaveValue('0');
  await expect(page.getByLabel('Atom Bombs planned')).toHaveValue('2');
  await expect(page.getByLabel('Hydrogen Bombs planned')).toHaveValue('1');
  await expect(page.getByLabel('MIRVs planned in sequence')).toHaveValue('3');

  await expect(page.getByTestId('nuke-next-mirv')).toHaveAttribute('data-value', '25000000');
  await expect(page.getByTestId('nuke-mirv-series')).toHaveAttribute('data-value', '120000000');
  await expect(page.getByTestId('nuke-total-cost')).toHaveAttribute('data-value', '126500000');
  await expect(page.getByTestId('nuke-balance')).toHaveAttribute('data-value', '73500000');
  await expect(page.getByTestId('nuke-silo-ready')).toHaveAttribute('data-value', '3');
  await expect(page.getByTestId('nuke-sam-ready')).toHaveAttribute('data-value', '3');
  await expect(page.getByTestId('nuke-sam-range')).toHaveAttribute('data-value', '102.0');
  await expect(page.getByTestId('nuke-slot-delta')).toHaveAttribute('data-value', '2');

  await page.getByLabel('MIRVs already launched globally').fill('4');
  await page.getByLabel('Atom Bombs planned').fill('0');
  await page.getByLabel('Hydrogen Bombs planned').fill('0');
  await page.getByLabel('MIRVs planned in sequence').fill('1');
  await page.getByLabel('Silo slots cooling down').fill('5');
  await page.getByLabel('SAM slots cooling down').fill('1');
  await page.getByLabel('Incoming SAM-eligible projectiles').fill('2');

  await expect(page.getByTestId('nuke-next-mirv')).toHaveAttribute('data-value', '85000000');
  await expect(page.getByTestId('nuke-mirv-series')).toHaveAttribute('data-value', '85000000');
  await expect(page.getByTestId('nuke-total-cost')).toHaveAttribute('data-value', '85000000');
  await expect(page.getByTestId('nuke-balance')).toHaveAttribute('data-value', '115000000');
  await expect(page.getByTestId('nuke-silo-ready')).toHaveAttribute('data-value', '0');
  await expect(page.getByTestId('nuke-sam-ready')).toHaveAttribute('data-value', '4');
  await expect(page.getByTestId('nuke-slot-delta')).toHaveAttribute('data-value', '-2');
  await expect(page.getByTestId('nuke-slot-reading')).toHaveText('More ready SAM shots than eligible projectiles');
});

const localeCases = [
  {
    lang: 'en',
    prefix: '',
    mirvHeading: 'Direct answer: how does a MIRV work in OpenFront?',
    calculatorHeading: 'Direct answer: what can this nuke calculator tell you?',
    carrier: 'The carrier cannot be targeted by SAM Launchers.',
    warheads: 'A SAM must spend one ready missile slot on each warhead it intercepts.',
    ceiling: 'The target generator stops at 350 targets, but it can stop earlier',
    uncertainty: 'The tool cannot determine exact flight time, MIRV warhead count, interception outcome, territory loss, or casualties',
    caveat: 'A positive gap does not guarantee penetration, and a zero or negative gap does not guarantee interception.',
  },
  {
    lang: 'zh',
    prefix: '/zh',
    mirvHeading: '直接答案：MIRV 到底怎样工作',
    calculatorHeading: '直接答案：这个核武计算器能算什么',
    carrier: '载体不能被 SAM 瞄准，但分裂后的每枚弹头都要单独接受拦截检查。',
    warheads: 'SAM 每发拦截弹只能处理一枚符合条件的弹头。',
    ceiling: '350 是生成目标的上限，不是保证值。',
    uncertainty: '它不能精确模拟轨迹、拦截结果或伤亡',
    caveat: '槽位差为正不保证突防，为零或负也不保证拦截。',
  },
  {
    lang: 'fr',
    prefix: '/fr',
    mirvHeading: 'Réponse directe : comment fonctionne un MIRV ?',
    calculatorHeading: 'Réponse directe : que calcule cet outil ?',
    carrier: 'Le porteur ne peut pas être ciblé par un SAM Launcher.',
    warheads: 'Un SAM doit utiliser un emplacement de missile prêt pour chaque ogive interceptée.',
    ceiling: 'Pourquoi 350 reste un plafond',
    uncertainty: 'Sans carte en direct et sans état complet, l’outil ne peut pas simuler exactement les trajectoires, les interceptions, le nombre d’ogives MIRV, les pertes de terrain ou les victimes.',
    caveat: 'Un écart positif ne garantit pas une percée, et un écart nul ou négatif ne garantit pas une interception.',
  },
  {
    lang: 'de',
    prefix: '/de',
    mirvHeading: 'Direkte Antwort: Wie funktioniert ein MIRV?',
    calculatorHeading: 'Direkte Antwort: Was kann dieser Rechner?',
    carrier: 'Der Träger kann von SAM Launchern nicht anvisiert werden.',
    warheads: 'Für jeden abgefangenen Sprengkopf benötigt der SAM einen bereiten Raketenslot.',
    ceiling: '350 ist eine Obergrenze, keine Garantie.',
    uncertainty: 'Flugbahnen, Abfänge, MIRV-Sprengkopfzahl, Gebietsverlust oder Opfer nicht exakt simulieren',
    caveat: 'Eine positive Lücke garantiert keinen Durchbruch; null oder negativ garantiert keinen Abschuss.',
  },
  {
    lang: 'nl',
    prefix: '/nl',
    mirvHeading: 'Direct antwoord: hoe werkt een MIRV?',
    calculatorHeading: 'Direct antwoord: wat berekent dit hulpmiddel?',
    carrier: 'De drager kan niet door SAM Launchers worden gekozen.',
    warheads: 'Voor elke onderschepte kernkop gebruikt een SAM één gereed raketslot.',
    ceiling: '350 is een bovengrens, geen garantie.',
    uncertainty: 'banen, onderscheppingen, MIRV-kernkoppen, territoriumverlies of slachtoffers niet exact simuleren',
    caveat: 'Een positief verschil garandeert geen doorbraak; nul of negatief garandeert geen onderschepping.',
  },
] as const;

for (const locale of localeCases) {
  test(`MIRV and calculator guidance is localized and explicit [${locale.lang}]`, async ({ page }) => {
    await page.goto(`${locale.prefix}/guides/mirv/`, { waitUntil: 'domcontentloaded' });

    await expect(page.getByRole('heading', { level: 2, name: locale.mirvHeading })).toBeVisible();
    await expect(page.locator('main')).toContainText(locale.carrier);
    await expect(page.locator('main')).toContainText(locale.warheads);
    await expect(page.locator('main')).toContainText(locale.ceiling);
    await expect(page.locator('main')).toContainText('v0.33.7');

    await page.goto(`${locale.prefix}/guides/nuke-calculator/`, { waitUntil: 'domcontentloaded' });

    await expect(page.getByRole('heading', { level: 2, name: locale.calculatorHeading })).toBeVisible();
    await expect(page.locator('main')).toContainText(locale.uncertainty);
    await expect(page.getByTestId('nuke-caveat')).toContainText(locale.caveat);
    await expect(page.locator('[data-nuke-calculator]')).toHaveAttribute('data-locale', locale.lang);
    await expect(page.getByTestId('nuke-total-cost')).toHaveAttribute('data-value', '126500000');
  });
}
