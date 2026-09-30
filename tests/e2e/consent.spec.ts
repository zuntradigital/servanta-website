import { expect, test } from "./fixtures";

test.use({ consented: false });

test("cookie banner appears until a choice is made and can be reopened", async ({ page }) => {
  await page.goto("/en");
  const banner = page.getByTestId("cookie-banner");
  await expect(banner).toBeVisible();
  await banner.getByRole("button", { name: "Necessary only" }).click();
  await expect(banner).toBeHidden();

  const cookie = (await page.context().cookies()).find((c) => c.name === "servanta_consent");
  expect(decodeURIComponent(cookie?.value ?? "")).toContain('"analytics":false');

  await page.reload();
  await expect(banner).toBeHidden();

  await page.getByRole("button", { name: "Cookie settings" }).click();
  await expect(banner).toBeVisible();
  const toggle = banner.getByRole("switch", { name: "Analytics" });
  await expect(toggle).not.toBeChecked();
  await toggle.check();
  await banner.getByRole("button", { name: "Save preferences" }).click();
  await expect(banner).toBeHidden();
  const updated = (await page.context().cookies()).find((c) => c.name === "servanta_consent");
  expect(decodeURIComponent(updated?.value ?? "")).toContain('"analytics":true');
});

test("no analytics provider script is loaded, even after accepting", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.hostname !== "localhost") external.push(request.url());
  });
  await page.goto("/en");
  await page.getByTestId("cookie-banner").getByRole("button", { name: "Accept analytics" }).click();
  await page.goto("/en/pricing");
  await page.waitForLoadState("networkidle");
  expect(external).toEqual([]);
});

test("Arabic cookie banner is translated", async ({ page }) => {
  await page.goto("/ar");
  await expect(page.getByTestId("cookie-banner")).toContainText("ملفات تعريف الارتباط");
});
