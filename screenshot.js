const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await new Promise(resolve => setTimeout(resolve, 5000));
  await page.screenshot({ path: 'screenshot_desktop.png' });
  await browser.close();
})();
