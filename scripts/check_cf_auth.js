const { ensureCDPChrome } = require('../src/playwright/browser');

(async () => {
  const browser = await ensureCDPChrome({ port: 9222 });
  const context = browser.contexts()[0] || await browser.newContext();
  const page = await context.newPage();
  try {
    const res = await page.goto('https://codeforces.com/problemset/submit', { waitUntil: 'domcontentloaded', timeout: 20000 });
    console.log('Submit page status:', res ? res.status() : 'null');
    console.log('Title:', await page.title());
    const handleEl = await page.$('#header a[href*="/profile/"]');
    if (handleEl) {
      console.log('LOGGED IN AS:', (await handleEl.textContent()).trim());
    } else {
      const enterLink = await page.$('a[href*="/enter"]');
      console.log('NOT LOGGED IN (found enter link:', !!enterLink, ')');
    }
  } catch (err) {
    console.error('Error navigating:', err.message);
  } finally {
    await page.close();
    await browser.close();
  }
})();

