import { test, expect } from "@playwright/test";
import * as fs from "fs";

test("Merge scrape results ", async ({ browser, page }) => {
  const merged: string[] = [];
  for (let i = 1; i <= 200; i++) {
    const contents = fs
      .readFileSync("output/debank-whales-" + i + ".txt", "utf8")
      .split("\n");
    merged.push(...contents);
  }

  fs.writeFileSync("output/debank-whales-merged.txt", merged.join("\n"));
});
