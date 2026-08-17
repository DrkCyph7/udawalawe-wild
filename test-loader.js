const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Go to dev server
  await page.goto("http://localhost:8080");

  // Clear session storage
  await page.evaluate(() => sessionStorage.clear());

  // Reload
  await page.reload();

  // Wait 1 second and take screenshot
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "screenshot1.png" });

  // Wait another 1 second
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "screenshot2.png" });

  await browser.close();
})();
