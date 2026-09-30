/**
 * Interactive Authentication Tool for Competitive Programming Platforms
 * Launches a visible browser for user login and exports persistent session storage state.
 */

const fs = require('fs');
const path = require('path');
const { launchBrowser, createStealthContext } = require('./browser');
const { PLATFORMS, AUTH_DIR } = require('./config');
const cfEngine = require('./platforms/codeforces');
const lcEngine = require('./platforms/leetcode');
const ccEngine = require('./platforms/codechef');

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
};

/**
 * Checks authentication status across all configured platforms
 */
async function printAuthStatus() {
  console.log('\n=== Competitive Programming Platform Authentication Status ===\n');

  for (const [key, plat] of Object.entries(PLATFORMS)) {
    const exists = fs.existsSync(plat.authFile);
    if (!exists) {
      console.log(`  [ ] ${plat.name.padEnd(12)} : No session found (Run: npm run submit:auth -- --platform ${key})`);
      continue;
    }

    try {
      const data = JSON.parse(fs.readFileSync(plat.authFile, 'utf-8'));
      const cookies = data.cookies || [];
      const now = Date.now() / 1000;
      const validCookies = cookies.filter((c) => !c.expires || c.expires > now);

      if (validCookies.length === 0 && cookies.length > 0) {
        console.log(`  [!] ${plat.name.padEnd(12)} : Session expired (Run: npm run submit:auth -- --platform ${key})`);
      } else {
        console.log(`  [✓] ${plat.name.padEnd(12)} : Active session saved (${validCookies.length} valid cookies)`);
      }
    } catch (err) {
      console.log(`  [✗] ${plat.name.padEnd(12)} : Invalid session file (${err.message})`);
    }
  }
  console.log('\n===============================================================\n');
}

/**
 * Handles interactive login for a single platform
 */
async function authenticatePlatform(platformKey) {
  const plat = PLATFORMS[platformKey.toLowerCase()];
  if (!plat) {
    console.error(`Unknown platform: "${platformKey}". Available: ${Object.keys(PLATFORMS).join(', ')}`);
    return false;
  }

  console.log(`\n-------------------------------------------------------------`);
  console.log(`Starting login session for: ${plat.name}`);
  console.log(`Login URL: ${plat.loginUrl}`);
  console.log(`Target Session File: ${path.relative(process.cwd(), plat.authFile)}`);
  console.log(`A visible browser window will open. Please log in to your account.`);
  console.log(`-------------------------------------------------------------\n`);

  const browser = await launchBrowser({ headless: false });
  const context = await createStealthContext(browser, {
    storageStatePath: plat.authFile,
    viewport: { width: 1280, height: 850 },
  });
  const page = await context.newPage();

  try {
    await page.goto(plat.loginUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });

    console.log(`[auth] Waiting for user to complete login in the browser window ...`);
    console.log(`[auth] (Press Ctrl+C in terminal if you wish to cancel)\n`);

    let authenticated = false;
    const maxWaitTime = 10 * 60 * 1000; // 10 minutes timeout
    const start = Date.now();

    while (Date.now() - start < maxWaitTime) {
      if (browser.isConnected() === false) {
        throw new Error('Browser was closed before login completed.');
      }

      let check = { authenticated: false };
      try {
        if (platformKey === 'codeforces') {
          check = await cfEngine.checkAuth(page);
        } else if (platformKey === 'leetcode') {
          check = await lcEngine.checkAuth(page);
        } else if (platformKey === 'codechef') {
          check = await ccEngine.checkAuth(page);
        }
      } catch {}

      if (check.authenticated) {
        authenticated = true;
        console.log(`[auth] ✓ Authentication detected successfully!`);
        break;
      }

      await page.waitForTimeout(2000);
    }

    if (authenticated) {
      // Save storage state to auth file
      await context.storageState({ path: plat.authFile });
      console.log(`[auth] ✓ Session state saved to: ${plat.authFile}`);
      return true;
    } else {
      console.warn(`[auth] ✗ Login timed out after 10 minutes.`);
      return false;
    }
  } catch (err) {
    console.error(`[auth] Error during authentication: ${err.message}`);
    return false;
  } finally {
    await browser.close().catch(() => {});
  }
}

async function main() {
  if (args.includes('--status')) {
    await printAuthStatus();
    return;
  }

  const requestedPlatform = flag('--platform') || 'all';

  if (requestedPlatform.toLowerCase() === 'all') {
    for (const key of Object.keys(PLATFORMS)) {
      await authenticatePlatform(key);
    }
    await printAuthStatus();
  } else {
    const success = await authenticatePlatform(requestedPlatform);
    if (success) await printAuthStatus();
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error(`[auth] Fatal: ${err.message}`);
    process.exit(1);
  });
}

module.exports = {
  printAuthStatus,
  authenticatePlatform,
};
