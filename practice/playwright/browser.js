/**
 * Playwright Browser Launcher & Stealth Context Factory
 * Configures anti-detection evasions and session persistence.
 */

const { chromium } = require('playwright');
const fs = require('fs');
const { getBrowserChannel } = require('./config');

/**
 * Launches a browser instance with system channel preference
 */
async function launchBrowser({ headless = false, channel } = {}) {
  const selectedChannel = channel || getBrowserChannel();

  const launchOptions = {
    headless,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-infobars',
      '--disable-dev-shm-usage',
      '--lang=en-US,en',
    ],
  };

  if (selectedChannel) {
    launchOptions.channel = selectedChannel;
  }

  try {
    return await chromium.launch(launchOptions);
  } catch (err) {
    // If launching with specific channel fails, fall back to default chromium
    if (selectedChannel) {
      delete launchOptions.channel;
      return await chromium.launch(launchOptions);
    }
    throw err;
  }
}

/**
 * Creates an evasion-configured browser context with optional storage state
 */
async function createStealthContext(browser, { storageStatePath, viewport = { width: 1280, height: 800 } } = {}) {
  const contextOptions = {
    viewport,
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    locale: 'en-US',
    timezoneId: 'America/New_York',
  };

  if (storageStatePath && fs.existsSync(storageStatePath)) {
    try {
      contextOptions.storageState = storageStatePath;
    } catch {
      // Ignore invalid storage state
    }
  }

  const context = await browser.newContext(contextOptions);

  // Stealth script injected into every page: remove webdriver flag & mock plugins
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined,
    });
    window.chrome = {
      runtime: {},
      loadTimes: function () {},
      csi: function () {},
      app: {},
    };
    Object.defineProperty(navigator, 'plugins', {
      get: () => [1, 2, 3, 4, 5],
    });
    Object.defineProperty(navigator, 'languages', {
      get: () => ['en-US', 'en'],
    });
  });

  return context;
}

module.exports = {
  launchBrowser,
  createStealthContext,
};
