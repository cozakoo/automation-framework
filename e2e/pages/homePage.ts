import { Page } from "@playwright/test";
import { CartPage } from './cartPage'

export class HomePage{

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

    constructor(page: Page){
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
        this.linkProduct = (prodName: string ) => this.page.getByRole('link', {name: prodName});
        this.linkAddToCart = page.locator("//a[text()='Add to cart']");
    }

    async clickSignUp(){
        await this.linkSingnUp.click();
    }

    async clickOnCart(){
        await this.linkCart.click();
        return new CartPage(this.page);
    }
    
    async performSignUp(username: string, password: string){
        this.clickSignUp();
        await this.txtBoxUserName.fill(username);
        await this.txtBoxPassword.fill(password);

        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
        });

        await this.btnSingnUp.click();
    }

    async performLogin(username: string, password: string){
        await this.linkLogin.click();
        await this.txtBoxLoginUserName.fill(username);
        await this.txtBoxLoginPassword.fill(password);
        await this.btnLogin.click();
    }

    async addProducToCart(prodName: string){
        await this.linkProduct(prodName).click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
        });

        await this.linkAddToCart.click();

    }

}