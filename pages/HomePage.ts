import { Page } from "playwright";

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://store.cpanel.net/index.php");
  }

  async orderProduct() {
    await this.page.click('//a[@id="product3-order-button"]');
  }
  async Browse_prod() {
    await this.page.click(
      '(//a[@class="btn btn-block btn-outline-primary"])[1]',
    );
  }
}
