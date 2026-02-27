// ABOUTME: Smoke tests for flanksource instance key pages after login.
// ABOUTME: Checks each page for console errors and failed network responses.

import { test, expect } from '@playwright/test';

const pages = [
    { name: 'Catalog', path: '/catalog' },
    { name: 'Health', path: '/health' },
    { name: 'Playbooks', path: '/playbooks' },
];

// Browser-level noise that doesn't indicate application errors
const IGNORED_CONSOLE_PATTERNS = [
    /attribute (?:height|width): Expected length/,
];

for (const { name, path } of pages) {
    test(`${name} (${path}) has no console errors or network failures`, async ({ page }) => {
        test.setTimeout(60_000);

        const consoleErrors: string[] = [];
        const networkFailures: string[] = [];

        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                const text = msg.text();
                const isIgnored = IGNORED_CONSOLE_PATTERNS.some((p) => p.test(text));
                if (!isIgnored) {
                    consoleErrors.push(text);
                }
            }
        });

        page.on('response', (response) => {
            if (response.status() >= 400) {
                networkFailures.push(`${response.status()} ${response.url()}`);
            }
        });

        await page.goto(path, { waitUntil: 'domcontentloaded' });
        // Give async content time to render and fire requests
        await page.waitForTimeout(5000);

        expect(consoleErrors, `Console errors on ${path}:\n${consoleErrors.join('\n')}`).toHaveLength(0);
        expect(networkFailures, `Network failures on ${path}:\n${networkFailures.join('\n')}`).toHaveLength(0);
    });
}
