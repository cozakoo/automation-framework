import { test, expect } from "@playwright/test";
import { Env } from "../../../frameworkConfig/env";
import { HomePage } from "../../pages/homePage";
import { getOrderDetailsRandomData } from "../../testData/randomDataUtils";

test("test", async ({ page }) => {
  await page.goto(Env.URL);

  const homePage = new HomePage(page);

  const user = getUserRandomData();

  await homePage.performSignUp(user);
  await homePage.performLogin(user);

  await homePage.addProducToCart("Samsung galaxy s6");

  const cartPage = await homePage.clickOnCart();
  await cartPage.clickOnPlaceOrder();

  await cartPage.completeOrderDetails(getOrderDetailsRandomData());

  await cartPage.clickOnPurchase();
  await expect(cartPage.successPurchaseTitle).toBeVisible();
  await cartPage.clickOnOk();
});
