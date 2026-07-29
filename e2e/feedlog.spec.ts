import { expect, test } from '@playwright/test';

const cases = [
  { path: '/', feedback: 'Feedback', board: 'Feedback board', roadmap: 'Site roadmap' },
  { path: '/fr/', feedback: 'Suggestions', board: 'Tableau de suggestions', roadmap: 'Feuille de route du site' },
  { path: '/nl/', feedback: 'Feedback', board: 'Feedbackbord', roadmap: 'Roadmap van de site' },
  { path: '/de/', feedback: 'Feedback', board: 'Feedback-Board', roadmap: 'Website-Roadmap' },
  { path: '/zh/', feedback: '反馈', board: '意见反馈', roadmap: '站点路线图' },
] as const;

for (const c of cases) {
  test(`Feedlog entry is localized on ${c.path}`, async ({ page }) => {
    await page.goto(c.path, { waitUntil: 'domcontentloaded' });

    const navLink = page.locator('[data-desktop-navigation]').getByRole('link', {
      name: c.feedback,
      exact: true,
    });
    await expect(navLink).toHaveAttribute('href', 'https://feedback.example.test/openfront/');
    await expect(navLink).toHaveAttribute('target', '_blank');
    await expect(navLink).toHaveAttribute('data-feedback-provider', 'feedlog');

    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: c.board, exact: true })).toHaveAttribute(
      'href',
      'https://feedback.example.test/openfront/',
    );
    await expect(footer.getByRole('link', { name: c.roadmap, exact: true })).toHaveAttribute(
      'href',
      'https://feedback.example.test/openfront/roadmap',
    );
  });
}
