import AxeBuilder from "@axe-core/playwright";
import { expect, routePaths, test } from "./fixtures";

// Reduced motion renders scroll-reveal sections fully opaque, so contrast is
// measured on the final state rather than mid-fade.
test.use({ reducedMotion: "reduce" });

for (const locale of ["en", "ar"]) {
  for (const path of routePaths) {
    test(`${locale}${path || "/"}: loads, no horizontal overflow, no serious a11y violations`, async ({ page }) => {
      const response = await page.goto(`/${locale}${path}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);

      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.nodes.length} node(s) — ${v.help}`)).toEqual([]);
    });
  }
}
