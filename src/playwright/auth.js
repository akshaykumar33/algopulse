/**
 * Interactive Authentication Tool for Competitive Programming Platforms
 * Launches a visible browser for user login and exports persistent session storage state.
 */

const fs = require('fs');
const path = require('path');
const { launchBrowser, createStealthContext, launchPersistentBrowserContext } = require('./browser');
const { PLATFORMS, AUTH_DIR } = require('./config');
const cfEngine = require('./platforms/codeforces');
const lcEngine = require('./platforms/leetcode');
const ccEngine = require('./platforms/codechef');
const { syncSessionsFromEnv } = require('./envAuth');

// Auto-sync session keys from .env into .auth session files
syncSessionsFromEnv();

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

  const context = await launchPersistentBrowserContext({
    headless: false,
    profileDir: path.join(AUTH_DIR, 'browser-profile'),
    viewport: { width: 1280, height: 850 },
  });
  const page = await context.newPage();

  try {
    await page.goto(plat.loginUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });

    // Bring browser window to foreground on Windows
    if (process.platform === 'win32') {
      try {
        const { exec } = require('child_process');
        exec('powershell -Command "$w = New-Object -ComObject wscript.shell; $w.AppActivate(\'Chrome\'); $w.AppActivate(\'CodeChef\')"', () => {});
      } catch {}
    }

    console.log(`[auth] Waiting for user to complete login in the browser window ...`);
    console.log(`[auth] (Press Ctrl+C in terminal if you wish to cancel)\n`);

    let authenticated = false;
    const maxWaitTime = 10 * 60 * 1000; // 10 minutes timeout
    const start = Date.now();

    let pollCount = 0;
    while (Date.now() - start < maxWaitTime) {
      pollCount++;
      let check = { authenticated: false };
      try {
        // Direct context cookie check
        const cookies = await context.cookies();
        if (platformKey === 'leetcode') {
          const session = cookies.find((c) => /leetcode_session/i.test(c.name) && c.value);
          if (session) check = { authenticated: true };
        } else if (platformKey === 'codechef') {
          const url = page.url();
          if (!/codechef\.com\/login/i.test(url)) {
            const cookies = await context.cookies();
            const authToken = cookies.find((c) => /authtoken|remember_me|^sess/i.test(c.name) && c.value);
            if (authToken) check = { authenticated: true };
          }
        }

        // Platform-specific engine check
        if (!check.authenticated) {
          if (platformKey === 'codeforces') {
            check = await cfEngine.checkAuth(page);
          } else if (platformKey === 'leetcode') {
            check = await lcEngine.checkAuth(page);
          } else if (platformKey === 'codechef') {
            check = await ccEngine.checkAuth(page);
          }
        }

        if (pollCount % 4 === 0 && !check.authenticated) {
          const currentUrl = page.url();
          console.log(`[auth] Current page: ${currentUrl.slice(0, 65)} | Cookies: ${cookies.length} | Waiting for login ...`);
        }
      } catch {}

      if (check.authenticated) {
        authenticated = true;
        console.log(`[auth] ✓ Authentication detected successfully!`);
        break;
      }

      await page.waitForTimeout(1500);
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
    await context.close().catch(() => {});
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
