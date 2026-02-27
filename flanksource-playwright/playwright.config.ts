// ABOUTME: Playwright config for flanksource canary checks.
// ABOUTME: Uses FLANKSOURCE_URL env var as the base URL, with auth setup shared across tests.

import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const baseURL = process.env.FLANKSOURCE_URL;
if (!baseURL) {
  throw new Error('FLANKSOURCE_URL environment variable is required');
}

export const STORAGE_STATE = path.join(__dirname, '.auth/state.json');

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },
  ],
});
