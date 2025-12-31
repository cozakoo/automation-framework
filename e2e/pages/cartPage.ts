import { Locator, Page } from "@playwright/test";
import { OrderDetails } from "../testData/orderDetailsInterface";

export class CartPage {
  readonly page: Page;
  readonly btnPlaceOrder: Locator;

  readonly txtBoxName: Locator;
  readonly txtBoxCountry: Locator;
  readonly txtBoxCity: Locator;
  readonly txtBoxCreditCard: Locator;
  readonly txtBoxMonth: Locator;
  readonly txtBoxYear: Locator;

  readonly btnPurchase: Locator;
  public readonly successPurchaseTitle: Locator;
  readonly btnOk: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnPlaceOrder = page.locator("//button[text()='Place Order']");

    this.txtBoxName = page.locator("//input[@id='name']");
    this.txtBoxCountry = page.locator("//input[@id='country']");
    this.txtBoxCity = page.locator("//input[@id='city']");
    this.txtBoxCreditCard = page.locator("//input[@id='card']");
    this.txtBoxMonth = page.locator("//input[@id='month']");
    this.txtBoxYear = page.locator("//input[@id='year']");

    this.btnPurchase = page.locator("//button[text()='Purchase']");
    this.successPurchaseTitle = page.locator("h2", {
      hasText: "Thank you for your purchase!",
    });
    this.btnOk = page.locator("//button[text()='OK']");
  }

  async clickOnPlaceOrder() {
    await this.btnPlaceOrder.click();
  }

  async clickOnPurchase() {
    await this.btnPurchase.click();
  }

  async clickOnOk() {
    await this.btnOk.click();
  }

  async completeOrderDetails(orderDetails: OrderDetails) {
    await this.txtBoxName.fill(orderDetails.name);
    await this.txtBoxCountry.fill(orderDetails.country);
    await this.txtBoxCity.fill(orderDetails.city);
    await this.txtBoxCreditCard.fill(orderDetails.credicard);
    await this.txtBoxMonth.fill(orderDetails.month);
    await this.txtBoxYear.fill(orderDetails.year);
  }
}
