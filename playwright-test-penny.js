const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err));

  console.log('Navigating to', TARGET_URL);
  try {
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 15000 });
    console.log('Page loaded:', await page.title());

    // Wait for the main section to appear (preloader finishes)
    await page.waitForSelector('#hero', { timeout: 10000 });
    console.log('Hero section is visible!');

    // Wait extra time for 3D and framer-motion animations
    await page.waitForTimeout(3000);

    await page.screenshot({ path: '/tmp/screenshot_penny_ready.png', fullPage: true });
    console.log('📸 Screenshot saved to /tmp/screenshot_penny_ready.png');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
