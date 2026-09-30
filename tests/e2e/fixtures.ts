import { test as base, expect, type Page } from "@playwright/test";

/** Pages every locale serves (config/routes.ts). */
export const routePaths = [
  "",
  "/about",
  "/platform",
  "/features",
  "/solutions",
  "/services",
  "/pricing",
  "/how-it-works",
  "/blog",
  "/blog/connecting-contracts-to-daily-operations",
  "/faq",
  "/contact",
  "/request-demo",
  "/contact-sales",
  "/security",
  "/resources",
  "/features/customer-management",
  "/features/command-center",
  "/legal",
  "/legal/privacy",
  "/legal/terms",
  "/legal/cookies",
  "/legal/refunds-cancellation",
  "/legal/subscription",
  "/legal/electronic-transactions",
  "/legal/contact",
];

type Fixtures = { consented: boolean; consoleErrors: string[] };

/**
 * By default a consent decision is pre-set so the cookie banner doesn't sit
 * over the page; consent tests opt out with `test.use({ consented: false })`.
 * Console errors are collected and must be empty at the end of every test.
 */
export const test = base.extend<Fixtures>({
  consented: [true, { option: true }],
  consoleErrors: async ({ page }, provide) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));
    await provide(errors);
    expect(errors, "console errors").toEqual([]);
  },
  page: async ({ page, consented, baseURL }, provide) => {
    if (consented) {
      const value = encodeURIComponent(JSON.stringify({ v: 1, analytics: false, decidedAt: "2026-01-01T00:00:00.000Z" }));
      await page.context().addCookies([{ name: "servanta_consent", value, url: baseURL! }]);
    }
    await provide(page);
  },
});

export { expect };

export async function isMobile(page: Page): Promise<boolean> {
  return (page.viewportSize()?.width ?? 1440) < 768;
}
