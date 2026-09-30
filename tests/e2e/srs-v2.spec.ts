import { expect, isMobile, test } from "./fixtures";

/** WEB-MKT-SRS-002 behaviour: status model, module pages, connected system, routes, claims. */

test("homepage connected-system nodes link to module pages that exist", async ({ page, request }) => {
  await page.goto("/en");
  const chain = page.getByRole("list", { name: "Connected product journey" });
  const links = chain.getByRole("link");
  await expect(links).toHaveCount(11);
  const hrefs = await links.evaluateAll((els) => els.map((el) => el.getAttribute("href")!));
  for (const href of new Set(hrefs.map((h) => h.split("#")[0]))) {
    expect((await request.get(href)).status(), href).toBe(200);
  }
});

test("only AVAILABLE and COMING_SOON capabilities are published", async ({ page }) => {
  for (const path of ["/en", "/en/features"]) {
    await page.goto(path);
    const text = await page.locator("main").innerText();
    for (const unpublished of ["Client portal", "Sales pipeline", "Copilot", "Workflow engine", "OCR", "Integration hub", "Tax / compliance", "Profitability"]) {
      expect(text, `${path} must not show ${unpublished}`).not.toContain(unpublished);
    }
  }
  await page.goto("/en");
  const map = page.locator("#capabilities-heading").locator("xpath=ancestor::section");
  // Coming-soon capabilities are still listed in the map (the "Coming soon" label was removed site-wide).
  await expect(map.getByText("Electronic signature")).toBeVisible();
  await expect(map).not.toContainText("Coming soon");
});

test("no unsupported statistics or grade claims on the site", async ({ page }) => {
  for (const path of ["/en", "/en/platform", "/ar/platform"]) {
    await page.goto(path);
    const text = await page.locator("main").innerText();
    for (const claim of ["24/7", "Enterprise-Grade", "Built to Scale", "بمستوى المؤسسات"]) expect(text, `${path}: ${claim}`).not.toContain(claim);
  }
});

test("hero uses public/hero-background.png and the image loads", async ({ page }) => {
  await page.goto("/en");
  const hero = page.locator("section[aria-labelledby='hero-title']");
  const image = hero.locator("img[src*='hero-background.png']").filter({ visible: true }).first();
  await expect(image).toBeVisible();
  expect(await image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await expect(page.locator("h1")).toBeVisible();
});

test("module page follows the template and shows its status", async ({ page }) => {
  await page.goto("/en/features/contracts");
  await expect(page.locator("h1")).toHaveText("Contract Management");
  await expect(page.locator("section[aria-labelledby='page-title']").getByText("Available", { exact: true })).toBeVisible();
  await expect(page.locator("#coming-soon")).toContainText("Electronic signature");
  await expect(page.getByRole("heading", { name: "Related modules" })).toBeVisible();
  await expect(page.getByRole("main").getByRole("link", { name: "Security & Trust" })).toBeVisible();
});

test("unknown module returns 404", async ({ page }) => {
  const response = await page.goto("/en/features/ai-copilot");
  expect(response?.status()).toBe(404);
});

test("features cards link to module pages", async ({ page }) => {
  await page.goto("/en/features");
  await page.getByRole("link", { name: "Collections", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/features\/collections$/);
  await expect(page.locator("h1")).toHaveText("Collections");
});

test("how it works has a visual, module link and explanation for every stage", async ({ page }) => {
  await page.goto("/ar/how-it-works");
  const stages = page.locator("#steps-heading ~ ol > li");
  await expect(stages).toHaveCount(12);
  await expect(page.getByRole("link", { name: "عرض الوحدة" })).toHaveCount(12);
  await expect(stages.locator("[data-visual-type='illustrative']")).toHaveCount(12);
});

test("the old Contact Sales URL redirects to /contact-sales and keeps the plan", async ({ page }) => {
  await page.goto("/en/request-demo?type=sales&plan=starter");
  await expect(page).toHaveURL(/\/en\/contact-sales\?plan=starter$/);
  await expect(page.getByLabel("Plan of interest")).toHaveValue("starter");
});

test("Platform menu leads to How It Works and Security & Trust", async ({ page }) => {
  test.skip(await isMobile(page), "desktop navigation");
  await page.goto("/en");
  await page.getByRole("navigation", { name: "Primary" }).getByRole("button", { name: "Platform", exact: true }).click();
  await page.getByRole("menuitem", { name: "Security & Trust" }).click();
  await expect(page).toHaveURL(/\/en\/security$/);
  await expect(page.locator("h1")).toHaveText("How the platform protects your data");
});

test("mobile drawer offers Contact Sales and the grouped links", async ({ page }) => {
  test.skip(!(await isMobile(page)), "mobile navigation");
  await page.goto("/ar");
  await page.getByRole("button", { name: "فتح القائمة" }).click();
  const drawer = page.getByRole("dialog");
  await expect(drawer.getByRole("link", { name: "الأمان والثقة" })).toBeVisible();
  await drawer.getByRole("link", { name: "تواصل مع المبيعات" }).click();
  await expect(page).toHaveURL(/\/ar\/contact-sales$/);
});

test("footer links to every legal page including the refund policy", async ({ page }) => {
  await page.goto("/en");
  const legal = page.getByRole("navigation", { name: "Legal" });
  for (const name of ["Privacy", "Terms", "Cookies", "Refund Policy"]) await expect(legal.getByRole("link", { name })).toBeVisible();
});

test("footer shows the supplied copyright and working company links", async ({ page }) => {
  for (const locale of ["en", "ar"]) {
    await page.goto(`/${locale}`);
    const footer = page.locator("footer");
    await expect(footer).toContainText("© 2026 SERVANTA . جميع الحقوق محفوظة.");
    await expect(footer).toContainText("تصميم وتطوير ZYNTRA Digital");
    await expect(footer.getByRole("link", { name: "ZYNTRA Digital" })).toHaveAttribute("href", "https://zyntra.ltd/en/");
    await expect(footer).not.toContainText("ZynReach");
    await expect(footer.locator("a[href*='zynreach']")).toHaveCount(0);
    // The footer uses the brand's transparent RGBA master (the header keeps its own GIF).
    await expect(footer.locator("img[alt]").first()).toHaveAttribute("src", /servanta-logo-share/);
  }
});

test("sitemap lists module pages and new routes in both languages", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const path of ["/en/features/contracts", "/ar/features/command-center", "/en/security", "/ar/resources", "/en/contact-sales", "/ar/legal/refunds-cancellation", "/en/legal/intermediary-disclosure"]) {
    expect(xml, path).toContain(path);
  }
  expect(xml).not.toContain("type=sales");
});

test("module pages carry canonical, hreflang and breadcrumb data", async ({ page }) => {
  await page.goto("/ar/features/billing");
  await expect(page.locator("link[rel='canonical']")).toHaveAttribute("href", /\/ar\/features\/billing$/);
  await expect(page.locator("link[rel='alternate'][hreflang='en']")).toHaveAttribute("href", /\/en\/features\/billing$/);
  await expect(page.locator("link[rel='alternate'][hreflang='x-default']")).toHaveAttribute("href", /\/en\/features\/billing$/);
  const types = await page.locator("script[type='application/ld+json']").evaluateAll((els) => els.map((el) => JSON.parse(el.textContent!)["@type"]));
  expect(types).toEqual(expect.arrayContaining(["BreadcrumbList", "Organization", "WebSite"]));
});

test("end-to-end example keeps all 11 steps, the demo IDs and the disclaimer", async ({ page }) => {
  await page.goto("/en/how-it-works");
  const example = page.locator("section[aria-labelledby='example-heading']");
  await expect(example.locator("ol > li")).toHaveCount(11);
  const text = await example.innerText();
  for (const id of ["Northwind Facilities", "CON-1042", "SRV-2210", "WO-3318", "Field team 2", "INV-2207", "PAY-4410"]) expect(text).toContain(id);
  await expect(example).toContainText("Illustrative example with fictional demo data.");
  const numbers = await example.locator("ol > li [aria-hidden='true']").allInnerTexts();
  expect(numbers).toEqual(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"]);
});
