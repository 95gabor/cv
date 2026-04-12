import { expect, test } from '@playwright/test';

test.describe('CV page', () => {
  test('renders core sections and personal information', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('cv-app')).toBeVisible();
    await expect(page.getByTestId('header-name')).toContainText(
      'Gábor Pichner',
    );
    await expect(page.getByTestId('header-title')).toContainText(
      'Full Stack Developer',
    );

    await expect(page.getByTestId('section-work-experience')).toBeVisible();
    await expect(page.getByTestId('section-education')).toBeVisible();
    await expect(page.getByTestId('section-skills')).toBeVisible();
    await expect(page.getByTestId('section-hobbies')).toBeVisible();
  });

  test('shows cookie banner and accepts consent', async ({ page }) => {
    await page.goto('/');

    const cookieBanner = page.getByTestId('cookie-banner');
    await expect(cookieBanner).toBeVisible({ timeout: 15_000 });
    await page.getByTestId('cookie-accept').click();
    await expect(cookieBanner).toBeHidden();

    const consentValue = await page.evaluate(() =>
      localStorage.getItem('cookie-consent'),
    );
    expect(consentValue).toBe('accepted');
  });

  test('switches languages using selector', async ({ page }) => {
    await page.goto('/');

    // Waiting for a client-only element ensures hydration has completed.
    await expect(page.getByTestId('cookie-banner')).toBeVisible({
      timeout: 15_000,
    });

    const languageToggle = page.getByTestId('language-toggle');
    await expect(languageToggle).toHaveText('EN');
    await languageToggle.click();
    await expect(languageToggle).toHaveText('HU', { timeout: 15_000 });

    await expect(
      page
        .getByTestId('section-work-experience')
        .getByRole('heading', { level: 2 }),
    ).toContainText('Szakmai tapasztalat');
  });
});
