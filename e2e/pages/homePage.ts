import { Page } from "@playwright/test";
import { CartPage } from "./cartPage";
import { User } from "../testData/userInterface";

export class HomePage {
  readonly page: Page;

  readonly linkSingnUp: Locator;
  readonly linkLogin: Locator;
  readonly linkCart: Locator;

  readonly txtBoxUserName: Locator;
  readonly txtBoxPassword: Locator;

  readonly txtBoxLoginUserName: Locator;
  readonly txtBoxLoginPassword: Locator;

  readonly btnSingnUp: Locator;
  readonly btnLogin: Locator;

  readonly linkProduct: (prodName: string) => Locator;
  readonly linkAddToCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.linkCart = page.locator("//a[text()='Cart']");
    this.linkSingnUp = page.locator("//a[text()='Sign up']");
    this.linkLogin = page.locator("//a[text()='Log in']");
    this.txtBoxUserName = page.locator("//input[@id='sign-username']");
    this.txtBoxPassword = page.locator("//input[@id='sign-password']");
    this.btnSingnUp = page.locator("//button[text()='Sign up']");
    this.txtBoxLoginUserName = page.locator("#loginusername");
    this.txtBoxLoginPassword = page.locator("#loginpassword");
    this.btnLogin = page.locator("//button[text()='Log in']");
    this.linkProduct = (prodName: string) =>
      this.page.getByRole("link", { name: prodName });
    this.linkAddToCart = page.locator("//a[text()='Add to cart']");
  }

  async clickSignUp() {
    await this.linkSingnUp.click();
  }

  async clickOnCart() {
    await this.linkCart.click();
    return new CartPage(this.page);
  }

  async performSignUp(user: User) {
    this.clickSignUp();
    await this.txtBoxUserName.fill(user.email);
    await this.txtBoxPassword.fill(user.pass);

    this.page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });

    await this.btnSingnUp.click();
  }

  async performLogin(user: User) {
    await this.linkLogin.click();
    await this.txtBoxLoginUserName.fill(user.email);
    await this.txtBoxLoginPassword.fill(user.pass);
    await this.btnLogin.click();
  }

  async addProducToCart(prodName: string) {
    await this.linkProduct(prodName).click();
    this.page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });

    await this.linkAddToCart.click();
  }
}
