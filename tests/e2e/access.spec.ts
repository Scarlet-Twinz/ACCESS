import { expect, test } from "@playwright/test";

test("live ACCESS smoke flow", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/ACCESS/i);
  await expect(page.getByRole("heading", { name: /build for everyone/i })).toBeVisible();

  for (const route of ["learn", "challenges", "inspector", "contrast", "keyboard", "report", "about"]) {
    await page.goto("/#/" + route);
    await expect(page.locator("main")).toBeVisible();
  }
});

test("challenge completion works in a real browser", async ({ page }) => {
  await page.goto("/#/challenge/accessible-name");
  await expect(page.getByRole("heading", { name: /the silent button/i })).toBeVisible();
  await page.getByRole("button", { name: /i have investigated/i }).click();
  await page.getByLabel(/the control exposes no useful accessible name/i).check();
  await page.getByRole("button", { name: /check finding/i }).click();
  await page.getByRole("button", { name: /apply the repair/i }).click();
  await expect(page.getByRole("heading", { name: /repair verified/i })).toBeVisible();
});

test("contrast tool calculates and records a reference pair", async ({ page }) => {
  await page.goto("/#/contrast");
  await page.getByRole("button", { name: "High contrast" }).click();
  await expect(page.getByText("21.00 : 1")).toBeVisible();
  await page.getByRole("button", { name: /record this check/i }).click();
});

test("keyboard lab exposes the completion condition", async ({ page }) => {
  await page.goto("/#/keyboard");
  await page.getByRole("button", { name: "Support" }).click();
  await expect(page.getByText(/practice complete/i)).toBeVisible();
});
