import { test, expect } from "@playwright/test";
import { Env } from "../../../frameworkConfig/env";

test("test", async ({ page }) => {
  await page.goto(Env.URL);

  await page.getByRole("link", { name: "Sign up" }).click();
  await page.getByLabel("Username:").fill(Env.USER);
  await page.getByLabel("Password:").fill(Env.PASS);
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Sign up" }).click();

  await page.getByRole("link", { name: "Log in" }).click();
  await page.locator("#loginusername").fill(Env.USER);
  await page.locator("#loginpassword").fill(Env.PASS);
  await page.getByRole("button", { name: "Log in" }).click();

  await page.getByRole("link", { name: "Samsung galaxy s6" }).click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("link", { name: "Add to cart" }).click();

  await page.getByRole("link", { name: "Cart", exact: true }).click();
  await page.getByRole("button", { name: "Place Order" }).click();
  await page.getByLabel("Total:").fill("test");
  await page.getByLabel("Country:").fill("argentina");
  await page.getByLabel("City:").fill("Gaiman");
  await page.getByLabel("Credit card:").fill("1234123412341234");
  await page.getByLabel("Month:").fill("12");
  await page.getByLabel("Year:").fill("2030");
  await page.getByRole("button", { name: "Purchase" }).click();
  await expect(
    page.getByRole("heading", { name: "Thank you for your purchase!" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "OK" }).click();
});
