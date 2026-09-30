import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end tests against a production build (`npm run build` first, or let
 * `webServer` build and start it). Run with `npm run test:e2e`.
 * Browsers: `npx playwright install chromium` once. PLAYWRIGHT_CHROMIUM_PATH
 * points at an already-installed Chromium instead.
 */
const port = Number(process.env.E2E_PORT ?? 3100);
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "retain-on-failure",
    launchOptions: { executablePath },
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 }, launchOptions: { executablePath } } },
    { name: "mobile", use: { ...devices["Pixel 7"], launchOptions: { executablePath } } },
  ],
  webServer: {
    command: `npm run start -- -p ${port}`,
    url: `http://localhost:${port}/en`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
