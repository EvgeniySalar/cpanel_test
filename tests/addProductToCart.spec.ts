import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test.describe("Add product and addon to cart", () => {
  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test("should allow me to add todo items", async ({ page }) => {
    await homePage.goto();
    await homePage.Browse_prod();
    await homePage.orderProduct();
    await productPage.enterIPAddress("192.168.2.2");
    await productPage.selectAddon();
    await productPage.emptyField();
    await productPage.continueToCheckout();
    await cartPage.verifyProductAndPrice(
      "cPanel Solo® Cloud (1 Account)",
      "$43.49",
    );
    await cartPage.proceedToCheckout();
    await cartPage.verifyCheckoutInformation(
      "cPanel Solo® Cloud (1 Account)",
      "192.168.2.2",
      "$6.41",
      "$15.94",
    );
  });
});
