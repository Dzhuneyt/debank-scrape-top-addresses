# DeBank whales scraper
Get list of whale wallets from debank.com and store them in a .txt file

---

## Getting started

1. Install dependencies: `pnpm install`
2. Install PlayWright dependencies: `npx playwright install`
3. Scrape the whales from debank.com and store them as txt files (one file per page of 50 whales): `npx playwright test scrape.spec.ts --project=chromium`
4. Merge the results into `outputs/debank-shales-merged.txt`: `npx playwright test merge.spec.ts --project=chromium`
