import { expect, test } from "./fixtures";

/*
 * The test server is a production build with no NEXT_PUBLIC_FORMS_ENDPOINT,
 * so a valid submission must end in the "not connected" state and must
 * never claim success.
 */

test("contact form validates required fields and email", async ({ page }) => {
  await page.goto("/en/contact");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByLabel(/Full name/)).toBeFocused();
  await expect(page.getByText("This field is required.").first()).toBeVisible();
  await page.getByLabel(/Work email/).fill("not-an-email");
  await page.getByLabel(/Work email/).blur();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
});

test("contact form reports that it isn't connected and keeps the data", async ({ page }) => {
  await page.goto("/en/contact");
  await page.getByLabel(/Full name/).fill("Test Person");
  await page.getByLabel(/Work email/).fill("test@example.com");
  await page.getByLabel(/Topic/).selectOption("sales");
  await page.getByLabel(/Message/).fill("Hello");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByTestId("form-not-configured")).toContainText("isn't connected yet");
  await expect(page.getByText("your message has been sent")).toHaveCount(0);
  await expect(page.getByLabel(/Full name/)).toHaveValue("Test Person");
});

test("Contact Sales form is reachable from pricing and submits to the not-connected state", async ({ page }) => {
  await page.goto("/en/pricing");
  await page.getByRole("link", { name: /^Request this plan\s*:\s*Starter$/ }).click();
  await expect(page).toHaveURL(/\/en\/contact-sales\?plan=starter$/);
  await expect(page.locator("h1")).toHaveText("Talk to our sales team");
  await page.getByLabel(/Full name/).fill("Test Person");
  await page.getByLabel(/Work email/).fill("test@example.com");
  await page.getByRole("textbox", { name: "Company" }).fill("Example Co");
  await page.getByLabel(/What would you like to discuss/).fill("Plans");
  await page.getByRole("checkbox", { name: /Privacy Policy/ }).check();
  await page.getByRole("button", { name: "Contact Sales" }).click();
  await expect(page.getByTestId("form-not-configured")).toBeVisible();
});

test("Contact Sales can't be submitted without Privacy Policy consent", async ({ page }) => {
  await page.goto("/en/contact-sales");
  await page.getByLabel(/Full name/).fill("Test Person");
  await page.getByLabel(/Work email/).fill("test@example.com");
  await page.getByRole("textbox", { name: "Company" }).fill("Example Co");
  await page.getByLabel(/What would you like to discuss/).fill("Plans");
  const consent = page.getByRole("checkbox", { name: /Privacy Policy/ });
  await expect(consent).not.toBeChecked();
  await page.getByRole("button", { name: "Contact Sales" }).click();
  await expect(page.getByText("Please agree to the Privacy Policy to continue.")).toBeVisible();
  await expect(consent).toBeFocused();
  await expect(page.getByTestId("form-not-configured")).toHaveCount(0);
  await consent.check();
  await expect(page.getByText("Please agree to the Privacy Policy to continue.")).toHaveCount(0);
  await page.getByRole("button", { name: "Contact Sales" }).click();
  await expect(page.getByTestId("form-not-configured")).toBeVisible();
});

test("the consent checkbox's Privacy Policy link opens the Privacy Policy", async ({ page }) => {
  await page.goto("/ar/contact-sales");
  await expect(page.getByRole("checkbox", { name: /سياسة الخصوصية/ })).toBeVisible();
  await page.getByRole("main").getByRole("link", { name: "سياسة الخصوصية" }).click();
  await expect(page).toHaveURL(/\/ar\/legal\/privacy$/);
  await expect(page.locator("h1")).toHaveText("سياسة الخصوصية");
});

test("request demo page switches between demo and sales forms", async ({ page }) => {
  await page.goto("/en/request-demo");
  await expect(page.getByRole("button", { name: "Request Demo" })).toBeVisible();
  await page.getByRole("main").getByRole("link", { name: "Contact Sales" }).click();
  await expect(page).toHaveURL(/\/en\/contact-sales$/);
  await expect(page.getByRole("button", { name: "Contact Sales" })).toBeVisible();
});

test("newsletter validates and reports that it isn't connected", async ({ page }) => {
  await page.goto("/en/blog");
  const band = page.getByRole("region", { name: "Get new articles by email" });
  await band.getByRole("button", { name: "Subscribe" }).click();
  await expect(band.getByText("Enter your email address.")).toBeVisible();
  await band.getByLabel(/Email address/).fill("name@company.com");
  await band.getByRole("button", { name: "Subscribe" }).click();
  await expect(band.getByRole("alert")).toContainText("isn't connected yet");
});

test("Arabic contact form uses Arabic validation messages", async ({ page }) => {
  await page.goto("/ar/contact");
  await page.getByRole("button", { name: "إرسال الرسالة" }).click();
  await expect(page.getByText("هذا الحقل مطلوب.").first()).toBeVisible();
});
