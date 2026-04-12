import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('captures a full-page CV snapshot for visual diff', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1800 });
  await page.goto('/');

  // Wait for the application shell to fully hydrate before capture.
  await page.getByTestId('cv-app').waitFor({ state: 'visible', timeout: 20_000 });
  await page.waitForLoadState('networkidle');

  const acceptCookiesButton = page.getByTestId('cookie-accept');
  if (await acceptCookiesButton.isVisible().catch(() => false)) {
    await acceptCookiesButton.click();
  }
  await percySnapshot(page, 'CV full-page', {
    fullPage: true,
  });
});
