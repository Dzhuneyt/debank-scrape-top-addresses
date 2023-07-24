import { test, expect } from "@playwright/test";
import * as fs from "fs";

test.describe("Debank", () => {
  for (let i = 1; i <= 200; i++) {
    test("page " + i, async ({ browser, page }) => {
      test.setTimeout(3600000 * 24);

      // Iterate all 200 pages with 50 rows page page === 10000 rows
      // const context = await browser.newContext();
      // const page = await context.newPage();

      console.log("Iterating page: ", i);

      await page.goto("https://debank.com/ranking?page=" + i);

      await page.waitForSelector("img.db-user-avatar");

      const addresses: string[] = [];

      const FILENAME = "output/debank-whales-" + i + ".txt";

      for (const el of await page.locator(".db-user-avatar-container").all()) {
        const popupPromise = page.waitForEvent("popup", {});
        await el.click();

        const popup = await popupPromise;

        await popup.waitForURL("https://debank.com/profile/**", {
          waitUntil: "domcontentloaded",
        });
        const url = await popup.url();

        const address = url.replace("https://debank.com/profile/", "");

        console.log("Found address: ", address);

        addresses.push(address);

        await popup.close();

        // Click outside to close the popup over individual wallets
        await page
          .getByRole("heading", { name: "Web3 Social Ranking" })
          .click();
      }

      console.log(`Writing ${addresses.length} addresses to file`);

      addresses.forEach((address) => {
        fs.appendFileSync(FILENAME, address.concat("\n"));
      });
    });
  }
});
