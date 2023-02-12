import { test, expect } from '@playwright/test';

test('Vue app is mounted', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Daily Bingo');
})
