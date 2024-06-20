import { Page } from "playwright";

export class CheckoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyCheckoutInfo() {
    const productName = await this.page
      .locator('//span[@class="pull-left float-left"]')
      .innerText();
    const productPrice = await this.page
      .locator('//span[@class="pull-right float-right"]')
      .innerText();
    console.log("Product Name:", productName);
    console.log("Product Price:", productPrice);
    // Add more verification logic if needed
  }
}
