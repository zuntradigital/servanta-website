import { expect, test } from "./fixtures";

/** MOD-LEGAL-CENTER-WEB: routes, catalog, pending status, request form, links, footer logo. */

test("old legal URLs redirect permanently into the Legal Center", async ({ page, request }) => {
  for (const [from, to] of [["/en/privacy", "/en/legal/privacy"], ["/ar/terms", "/ar/legal/terms"], ["/en/cookies", "/en/legal/cookies"], ["/en/refund-policy", "/en/legal/refunds-cancellation"]]) {
    const response = await request.get(from, { maxRedirects: 0 });
    expect(response.status(), from).toBe(308);
    expect(response.headers().location, from).toContain(to);
  }
  await page.goto("/privacy");
  await expect(page).toHaveURL(/\/(en|ar)\/legal\/privacy$/);
});

test("Legal Center lists public documents, with no invented version or date", async ({ page }) => {
  await page.goto("/en/legal");
  await expect(page.locator("h1")).toHaveText("Legal Center");
  const main = page.locator("main");
  for (const title of ["Terms of Service", "Subscription Terms", "Privacy Policy", "Cookie Policy", "Acceptable Use Policy", "Refund & Cancellation Policy", "Third-Party Services Disclosure", "Electronic Transactions & Electronic Signature Notice", "Contract Library Disclaimer", "Platform Intermediary Disclosure"]) {
    await expect(main.getByRole("link", { name: title, exact: true })).toBeVisible();
  }
  await expect(main).not.toContainText("Pending");
  await expect(main).not.toContainText("Version");
  await expect(main).toContainText("Documents may have different effective dates.");
  await expect(main).toContainText("Contracts and documents that platform users create for their own customers and counterparties are separate");
  // Not public until counsel decides.
  for (const hidden of ["Data Processing Addendum", "Data Retention", "Responsible Disclosure"]) await expect(main).not.toContainText(hidden);
});

test("each legal document shows its prepared-text notice and links back", async ({ page }) => {
  await page.goto("/ar/legal/intermediary-disclosure");
  await expect(page.locator("h1")).toHaveText("الإفصاح عن دور المنصة كوسيط تقني");
  await expect(page.getByRole("main")).toContainText("سيُنشر النص النهائي على هذه الصفحة");
  await expect(page.getByRole("main")).not.toContainText("قيد المراجعة");
  await page.getByRole("main").getByRole("link", { name: "جميع الوثائق القانونية" }).click();
  await expect(page).toHaveURL(/\/ar\/legal$/);
});

test("unknown and non-public legal documents return 404", async ({ page }) => {
  for (const path of ["/en/legal/dpa", "/en/legal/data-retention", "/en/legal/nope"]) {
    expect((await page.goto(path))?.status(), path).toBe(404);
  }
});

test("legal request form requires a request type and message", async ({ page }) => {
  await page.goto("/en/legal/contact");
  await page.getByLabel(/Full name/).fill("Test Person");
  await page.getByLabel(/Work email/).fill("test@example.com");
  await page.getByRole("button", { name: "Send Request" }).click();
  await expect(page.getByLabel(/Request type/)).toBeFocused();
  await page.getByLabel(/Request type/).selectOption("access_request");
  await page.getByLabel(/Your request/).fill("Please send me a copy of my data.");
  await page.getByRole("button", { name: "Send Request" }).click();
  await expect(page.getByTestId("form-not-configured")).toBeVisible();
});

test("footer links to the Legal Center and the moved documents", async ({ page }) => {
  await page.goto("/en");
  const legal = page.getByRole("navigation", { name: "Legal" });
  await expect(legal.getByRole("link", { name: "Legal Center" })).toHaveAttribute("href", "/en/legal");
  await expect(legal.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/en/legal/privacy");
  await expect(legal.getByRole("link", { name: "Refund Policy" })).toHaveAttribute("href", "/en/legal/refunds-cancellation");
});

test("only the footer logo changed; the header keeps the original", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("header img").first()).toHaveAttribute("src", /servanta-logo[^/]*\.gif/);
  await expect(page.locator("header img").first()).not.toHaveAttribute("src", /share/);
  const footerLogo = page.locator("footer img").first();
  await expect(footerLogo).toHaveAttribute("src", /servanta-logo-share/);
  await footerLogo.scrollIntoViewIfNeeded();
  await expect
    .poll(() => footerLogo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth === 1117 && img.naturalHeight === 240))
    .toBe(true);
});

test("contextual legal links: pricing and electronic signature", async ({ page }) => {
  await page.goto("/en/pricing");
  await expect(page.getByRole("link", { name: "Subscription Terms" })).toHaveAttribute("href", "/en/legal/subscription");
  await expect(page.getByRole("link", { name: "Contract Library Disclaimer" })).toHaveAttribute("href", "/en/legal/contract-library-disclaimer");
  await page.goto("/en/features/contracts");
  await expect(page.locator("#coming-soon").getByRole("link", { name: "Electronic Transactions & Electronic Signature Notice" })).toHaveAttribute(
    "href",
    "/en/legal/electronic-transactions",
  );
});

test("cookie banner and forms point to the moved policies", async ({ page }) => {
  await page.goto("/en/contact");
  await expect(page.getByRole("main").getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/en/legal/privacy");
});
