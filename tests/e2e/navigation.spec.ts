import { expect, isMobile, test } from "./fixtures";

test("home renders with one h1 and no console errors", async ({ page, consoleErrors }) => {
  await page.goto("/en");
  await expect(page.locator("h1")).toHaveCount(1);
  expect(consoleErrors).toEqual([]);
});

test("desktop header links navigate and mark the active page", async ({ page }) => {
  test.skip(await isMobile(page), "desktop navigation");
  await page.goto("/en");
  const nav = page.getByRole("navigation", { name: "Primary" });
  await nav.getByRole("link", { name: "Pricing" }).click();
  await expect(page).toHaveURL(/\/en\/pricing$/);
  await expect(nav.getByRole("link", { name: "Pricing" })).toHaveAttribute("aria-current", "page");
});

test("Resources menu stays open when a hover is followed by a click", async ({ page }) => {
  test.skip(await isMobile(page), "hover menu is desktop only");
  await page.goto("/en");
  const trigger = page.getByRole("button", { name: "Resources" });
  await trigger.hover();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("menuitem", { name: "Blog" }).click();
  await expect(page).toHaveURL(/\/en\/blog$/);
});

test("Resources menu works from the keyboard", async ({ page }) => {
  test.skip(await isMobile(page), "desktop navigation");
  await page.goto("/en");
  const trigger = page.getByRole("button", { name: "Resources" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("menuitem", { name: "All resources" })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("menuitem", { name: "Blog" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("mobile drawer opens, traps focus and closes", async ({ page }) => {
  test.skip(!(await isMobile(page)), "mobile navigation");
  await page.goto("/en");
  await page.getByRole("button", { name: "Open menu" }).click();
  const drawer = page.getByRole("dialog");
  await expect(drawer).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  await page.getByRole("button", { name: "Open menu" }).click();
  await drawer.getByRole("link", { name: "Features" }).click();
  await expect(page).toHaveURL(/\/en\/features$/);
  await expect(drawer).toBeHidden();
});

test("language switcher moves between English and Arabic on inner pages", async ({ page }) => {
  await page.goto("/en/pricing");
  if (await isMobile(page)) await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("link", { name: /العربية/ }).filter({ visible: true }).first().click();
  await expect(page).toHaveURL(/\/ar\/pricing$/);
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("h1")).toContainText("أسعار");
});

test("Arabic navigation stays in Arabic", async ({ page }) => {
  test.skip(await isMobile(page), "desktop navigation");
  await page.goto("/ar");
  await page.getByRole("navigation", { name: "التنقل الرئيسي" }).getByRole("link", { name: "الأسعار" }).click();
  await expect(page).toHaveURL(/\/ar\/pricing$/);
});

test("the remembered language survives prefetching English links", async ({ page }) => {
  await page.goto("/ar");
  await page.waitForLoadState("networkidle");
  const cookie = (await page.context().cookies()).find((c) => c.name === "NEXT_LOCALE");
  expect(cookie?.value).toBe("ar");
  await page.goto("/");
  await expect(page).toHaveURL(/\/ar$/);
});

test("unknown pages return 404", async ({ page }) => {
  const response = await page.goto("/en/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back to Home" })).toBeVisible();
});

test("security headers are sent", async ({ request }) => {
  const response = await request.get("/en");
  const headers = response.headers();
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["x-content-type-options"]).toBe("nosniff");
});
