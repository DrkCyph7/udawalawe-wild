const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");
  await page.evaluate(() => sessionStorage.clear());
  await page.reload();
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: "screenshot3.png" });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: "screenshot4.png" });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: "screenshot5.png" });
  await browser.close();
})();
