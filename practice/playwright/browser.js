/**
 * Playwright Browser Launcher & Stealth Context Factory
 * Supports standard browser instances, persistent profile contexts (system or dedicated),
 * and anti-detection evasions.
 */

const { chromium } = require('playwright');
const fs = require('fs');
const { execSync } = require('child_process');
const {
  getBrowserChannel,
  SYSTEM_CHROME_USER_DATA_DIR,
  PERSISTENT_CHROME_PROFILE_DIR,
} = require('./config');

/**
 * Checks whether Google Chrome is actively running on Windows
 */
function isChromeRunning() {
  if (process.platform === 'win32') {
    try {
      const out = execSync('tasklist /FI "IMAGENAME eq chrome.exe" /NH', { encoding: 'utf-8', stdio: 'pipe' });
      return out.toLowerCase().includes('chrome.exe');
    } catch {
      return false;
    }
  }
  return false;
}

/**
 * Applies stealth scripts to evade automated browser detection
 */
async function applyStealthScripts(context) {
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
}

/**
 * Launches a standard browser instance
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
  await applyStealthScripts(context);
  return context;
}

/**
 * Launches a persistent browser context (Option B)
 * Can connect to the system Chrome profile or a dedicated persistent automation profile.
 */
async function launchPersistentBrowserContext({
  useSystemProfile = false,
  profileDir,
  headless = false,
  channel,
  viewport = { width: 1280, height: 850 },
} = {}) {
  const selectedChannel = channel || getBrowserChannel() || 'chrome';
  let targetDir = profileDir;

  if (useSystemProfile) {
    if (isChromeRunning()) {
      throw new Error(
        'Google Chrome is currently open on your system. Chrome locks its "User Data" folder while open.\n' +
        'To use your system Chrome profile directly:\n' +
        '  1. Close all open Google Chrome windows on your machine, OR\n' +
        '  2. Use the dedicated persistent profile: npm run submit -- --persistent'
      );
    }
    targetDir = SYSTEM_CHROME_USER_DATA_DIR;
  } else if (!targetDir) {
    targetDir = PERSISTENT_CHROME_PROFILE_DIR;
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const context = await chromium.launchPersistentContext(targetDir, {
    channel: selectedChannel,
    headless,
    viewport,
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-infobars',
      '--disable-dev-shm-usage',
      '--lang=en-US,en',
    ],
  });

  await applyStealthScripts(context);
  return context;
}

/**
 * Connects directly to an already running Chrome browser via Chrome DevTools Protocol (CDP)
 */
async function connectOverCDP({ port = 9222 } = {}) {
  const endpoint = `http://127.0.0.1:${port}`;
  return await chromium.connectOverCDP(endpoint);
}

module.exports = {
  launchBrowser,
  createStealthContext,
  launchPersistentBrowserContext,
  connectOverCDP,
  isChromeRunning,
};
