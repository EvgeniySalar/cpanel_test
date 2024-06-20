import { Page } from "playwright";

export class ProductPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async enterIPAddress(ip: string) {
    await this.page.fill('//input[@id="customfield11"]', ip);
  }

  async selectAddon() {
    await this.page.click('//div[@class="panel-add"]');
  }

  async continueToCheckout() {
    await this.page.click('//button[@id="btnCompleteProductConfig"]');
  }

  async emptyField() {
    await this.page.click('  //*[@class="secondary-cart-sidebar"]');
  }
}
