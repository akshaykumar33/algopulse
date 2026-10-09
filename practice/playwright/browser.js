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
    try {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
      });
    } catch {}
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
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-infobars',
      '--disable-dev-shm-usage',
      '--lang=en-US,en',
    ],
  });

  return context;
}

const http = require('http');
const path = require('path');
const { spawn } = require('child_process');

/**
 * Checks if Chrome DevTools Protocol endpoint is reachable on the given port
 */
function isCDPAvailable(port = 9222) {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${port}/json/version`, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

/**
 * Finds system Google Chrome executable path on Windows / macOS / Linux
 */
function findChromePath() {
  if (process.platform === 'win32') {
    const candidates = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
    ];
    return candidates.find((p) => p && fs.existsSync(p)) || null;
  }
  if (process.platform === 'darwin') {
    const p = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    return fs.existsSync(p) ? p : null;
  }
  const linuxCandidates = ['/usr/bin/google-chrome', '/usr/bin/chrome', '/usr/bin/chromium'];
  return linuxCandidates.find((p) => fs.existsSync(p)) || null;
}

/**
 * Connects directly to an already running Chrome browser via Chrome DevTools Protocol (CDP)
 */
async function connectOverCDP({ port = 9222 } = {}) {
  const endpoint = `http://127.0.0.1:${port}`;
  return await chromium.connectOverCDP(endpoint);
}

/**
 * Connects to Chrome via CDP, automatically launching Chrome with remote debugging if not already open
 */
async function ensureCDPChrome({ port = 9222 } = {}) {
  const isUp = await isCDPAvailable(port);
  if (isUp) {
    return await connectOverCDP({ port });
  }

  const chromePath = findChromePath();
  if (chromePath) {
    const args = [
      `--remote-debugging-port=${port}`,
      '--remote-allow-origins=*',
      `--user-data-dir=${PERSISTENT_CHROME_PROFILE_DIR}`,
      '--no-first-run',
      '--no-default-browser-check',
    ];
    const proc = spawn(chromePath, args, {
      detached: true,
      stdio: 'ignore',
    });
    proc.unref();

    const start = Date.now();
    while (Date.now() - start < 15000) {
      await new Promise((r) => setTimeout(r, 600));
      if (await isCDPAvailable(port)) {
        console.log(`[browser] Chrome connected via CDP on port ${port}.`);
        return await connectOverCDP({ port });
      }
    }
  }

  throw new Error(
    `Could not connect to Chrome via CDP on port ${port}.\n` +
    `Please ensure Google Chrome is started with: chrome.exe --remote-debugging-port=${port}`
  );
}

module.exports = {
  launchBrowser,
  createStealthContext,
  launchPersistentBrowserContext,
  connectOverCDP,
  ensureCDPChrome,
  isCDPAvailable,
  findChromePath,
  isChromeRunning,
};

