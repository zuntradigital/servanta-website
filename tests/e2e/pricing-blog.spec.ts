import { expect, test } from "./fixtures";

test("pricing shows the three SRS plans with annual price and derived monthly equivalent", async ({ page }) => {
  await page.goto("/en/pricing");
  // Heading order: h1, then the (visually hidden) Plans h2, then plan h3s.
  await expect(page.getByRole("heading", { level: 2, name: "Plans", exact: true })).toBeAttached();
  const expected = [
    ["starter", "Starter", "SAR 600", "SAR 50 per month, billed annually"],
    ["professional", "Professional", "SAR 1,200", "SAR 100 per month, billed annually"],
    ["business", "Business", "SAR 2,400", "SAR 200 per month, billed annually"],
  ];
  for (const [code, name, annual, monthly] of expected) {
    const card = page.locator(`[data-plan="${code}"]`);
    await expect(card.getByRole("heading", { level: 3 })).toHaveText(name);
    await expect(card).toContainText(annual);
    await expect(card).toContainText(monthly);
  }
  await expect(page.locator("[data-plan]")).toHaveCount(3);
  // No monthly subscription is approved (SRS §28), so there is no billing toggle.
  await expect(page.getByRole("tablist")).toHaveCount(0);
  // No plan is flagged popular/recommended in the data, so no badge is shown.
  await expect(page.getByText("Most popular")).toHaveCount(0);
});

test("pricing marks unreleased Business features as at launch", async ({ page }) => {
  await page.goto("/en/pricing");
  const business = page.locator('[data-plan="business"]');
  await expect(business.getByText("At launch").first()).toBeVisible();
  await expect(page.locator('[data-plan="starter"]').getByText("At launch")).toHaveCount(0);
  // The comparison is a table on desktop and stacked panels on mobile.
  test.skip(test.info().project.name === "mobile", "table assertions are desktop-only");
  const table = page.getByRole("table", { name: "Features by plan" });
  await expect(table.getByRole("row", { name: /Electronic signature/ })).toContainText("At launch");
  await expect(page.getByRole("table", { name: "Limits by plan" }).getByRole("row", { name: /Users/ })).toContainText("2");
});

test("Arabic pricing shows SRS names, prices and messages", async ({ page }) => {
  await page.goto("/ar/pricing");
  const starter = page.locator('[data-plan="starter"]');
  await expect(starter).toContainText("600 ريال");
  await expect(starter).toContainText("50 ريال شهريًا عند الدفع السنوي");
  await expect(starter).toContainText("ابدأ بتنظيم أعمالك");
});

test("plan CTA opens Contact Sales with the plan preselected", async ({ page }) => {
  await page.goto("/en/pricing");
  await page.getByRole("link", { name: /^Request this plan\s*:\s*Professional$/ }).click();
  await expect(page).toHaveURL(/\/en\/contact-sales\?plan=professional$/);
  await expect(page.getByLabel("Plan of interest")).toHaveValue("professional");
});

test("unknown plan code is not preselected", async ({ page }) => {
  await page.goto("/en/contact-sales?plan=enterprise");
  await expect(page.getByLabel("Plan of interest")).toHaveValue("");
  await expect(page.getByLabel("Plan of interest").locator("option")).toHaveText(["Select an option", "Starter", "Professional", "Business", "Not sure yet"]);
});

test("compare plans link scrolls to the table", async ({ page }) => {
  await page.goto("/en/pricing");
  await page.getByRole("link", { name: "Compare Plans" }).click();
  await expect(page).toHaveURL(/#compare-plans$/);
  await expect(page.locator("#compare-plans")).toBeInViewport();
});

test("blog category filter lives in the URL", async ({ page }) => {
  await page.goto("/en/blog");
  const filters = page.getByRole("navigation", { name: "Filter by category" });
  await filters.getByRole("link", { name: "Operations" }).click();
  await expect(page).toHaveURL(/\/en\/blog\?category=operations$/);
  await expect(filters.getByRole("link", { name: "Operations" })).toHaveAttribute("aria-current", "page");
  const cards = page.locator("ul li article");
  await expect(cards).toHaveCount(2);
  await page.reload();
  await expect(cards).toHaveCount(2);
  await page.goBack();
  await expect(page).toHaveURL(/\/en\/blog$/);
});

test("unknown blog category shows the empty state with a way back", async ({ page }) => {
  await page.goto("/en/blog?category=unknown");
  await expect(page.getByText("No articles in this category yet.")).toBeVisible();
  await page.getByRole("link", { name: "Show all articles" }).click();
  await expect(page).toHaveURL(/\/en\/blog$/);
});

test("Arabic blog article renders in Arabic", async ({ page }) => {
  await page.goto("/ar/blog/billing-against-verified-work");
  await expect(page.locator("h1")).toHaveText("الفوترة مقابل عمل تم التحقق منه");
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
});
