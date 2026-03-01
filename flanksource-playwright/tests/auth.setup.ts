// ABOUTME: Logs into a flanksource instance, detecting Clerk vs Kratos auth automatically.
// ABOUTME: Saves authenticated session state for reuse by other test files.

import { test as setup, expect, Page } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';

const isClerk = process.env.FLANKSOURCE_URL?.includes('app.flanksource.com');

async function clerkLogin(page: Page) {
  await page.locator('#identifier-field').waitFor({ state: 'visible', timeout: 60_000 });

  // Step 1: Enter email and continue
  await page.locator('#identifier-field').fill(process.env.FLANKSOURCE_EMAIL!);
  await page.getByRole('button', { name: /continue/i }).click();

  // Step 2: Enter password and submit
  await page.locator('#password-field').waitFor({ state: 'visible', timeout: 30_000 });
  await page.locator('#password-field').fill(process.env.FLANKSOURCE_PASSWORD!);
  await page.getByRole('button', { name: /continue/i }).click();
}

async function kratosLogin(page: Page) {
  await page.locator('#identifier').waitFor({ state: 'visible', timeout: 60_000 });

  await page.locator('#identifier').fill(process.env.FLANKSOURCE_EMAIL!);
  await page.locator('#password').fill(process.env.FLANKSOURCE_PASSWORD!);
  await page.locator('button[type="submit"]').click();
}

setup('login', async ({ page }) => {
  setup.setTimeout(90_000);

  // Both Clerk and Kratos can redirect during login; catch navigation errors.
  await page.goto('/login').catch(() => {});

  if (isClerk) {
    await clerkLogin(page);
  } else {
    await kratosLogin(page);
  }

  await expect(page).not.toHaveURL(/\/login/, { timeout: 30_000 });
  await page.context().storageState({ path: STORAGE_STATE });
});
