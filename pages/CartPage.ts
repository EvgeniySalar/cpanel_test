import { Page, expect } from "@playwright/test";

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyOrderSummary() {
    await this.page.waitForSelector('//div[@id="orderSummary"]', {
      timeout: 60000,
    });
  }

  async verifyProductAndPrice(product: string, price: string) {
    const productName = await this.page.textContent(
      '//span[contains(@class, "item-title")]',
    );

    // Try different locators for product price
    const productPriceLocators = [
      '(//div[contains(@class, "item-price")]/span)[2]',
      '(//div[@id="producttotal"]//span[contains(@class, "pull-right float-right")])[1]',
      '//div[contains(@class, "view-cart-items")]//div[contains(@class, "item-price")]//span',
    ];

    let productPrice: string | null = null;

    for (const locator of productPriceLocators) {
      try {
        productPrice = await this.page.textContent(locator);
        if (productPrice) {
          break;
        }
      } catch (e) {}
    }

    if (!productPrice) {
      throw new Error("Product price not found any locators");
    }

    expect(productName).toContain(product);
    expect(productPrice).toContain(price);
  }

  async proceedToCheckout() {
    await this.page.click('//a[@id="checkout"]');
  }

  async verifyCheckoutInformation(
    product: string,
    ip: string,
    price: string,
    dueToday: string,
  ) {
    await this.page.waitForSelector(
      '(//table[contains(@class, "table")]//tr[1]/td[1])[1]',
      { timeout: 60000 },
    );

    const productName = await this.page.textContent(
      '(//table[contains(@class, "table")]//tr[1]/td[1])[1]',
    );
    expect(productName).toContain(product);

    const ipAddress = await this.page.textContent(
      '//table[contains(@class, "table")]//tr[1]/td[3]',
    );
    expect(ipAddress).toContain(ip);

    const monthlyPrice = await this.page.textContent(
      '//table[contains(@class, "table")]//tr[1]/td[5]',
    );
    expect(monthlyPrice).toContain(price);

    const dueTodayPrice = await this.page.textContent(
      '//div[contains(@id, "totalCartPrice")]',
    );
    expect(dueTodayPrice).toContain(dueToday);

    await expect(
      this.page.locator('(//span[contains(@class, "primary-bg-color")])[5]'),
    ).toBeVisible();
    await expect(
      this.page.locator('(//span[contains(@class, "primary-bg-color")])[6]'),
    ).toBeVisible();
    await expect(
      this.page.locator('(//span[contains(@class, "primary-bg-color")])[7]'),
    ).toBeVisible();
    await expect(
      this.page.locator('(//span[contains(@class, "primary-bg-color")])[8]'),
    ).toBeVisible();
    await expect(
      this.page.locator('(//span[contains(@class, "primary-bg-color")])[9]'),
    ).toBeVisible();

    const completeOrderButton = this.page.locator(
      '//button[contains(@id, "btnCompleteOrder")]',
    );
    await expect(completeOrderButton).toBeVisible();
    await expect(completeOrderButton).toBeDisabled();
  }
}
