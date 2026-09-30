/**
 * CodeChef Submission Engine (Playwright)
 */

const { PLATFORMS } = require('../config');

/**
 * Checks if the current page has an active logged-in CodeChef session
 */
async function checkAuth(page) {
  // Check for login button or user profile
  const loginButton = await page.$('a[href*="/login"], button:has-text("Sign In")');
  if (loginButton) {
    const isVisible = await loginButton.isVisible().catch(() => false);
    if (isVisible) return { authenticated: false };
  }

  const profile = await page.$('.user-name, [data-testid="user-profile-button"], a[href*="/users/"]');
  if (profile) {
    const handle = await profile.textContent().catch(() => null);
    return { authenticated: true, handle: handle ? handle.trim() : null };
  }

  // Also check cookies
  const cookies = await page.context().cookies('https://www.codechef.com');
  const sessionCookie = cookies.find((c) => /session|user_id/i.test(c.name));
  if (sessionCookie && sessionCookie.value) {
    return { authenticated: true };
  }

  return { authenticated: false };
}

/**
 * Submits solution code to CodeChef and waits for verdict
 */
async function submitCodeChef(page, problem, code, { timeout = 60000 } = {}) {
  const problemUrl = problem.url || `https://www.codechef.com/problems/${problem.id.replace(/^CC-/, '')}`;

  console.log(`    [CodeChef] Navigating to ${problem.name || problem.id} ...`);
  await page.goto(problemUrl, { waitUntil: 'domcontentloaded', timeout });

  // 1. Verify Authentication
  const auth = await checkAuth(page);
  if (!auth.authenticated) {
    throw new Error(
      'Not authenticated on CodeChef. Please run "npm run submit:auth -- --platform codechef" to log in first.'
    );
  }
  if (auth.handle) console.log(`    [CodeChef] Logged in as: ${auth.handle}`);

  // 2. Wait for IDE / Editor
  console.log(`    [CodeChef] Locating editor ...`);
  await page.waitForSelector('.monaco-editor, #editor, [data-testid="editor"]', { timeout: 25000 });

  // 3. Language Selection: Node.js / JavaScript
  try {
    const langSelect = await page.$(
      'button[aria-haspopup="listbox"]:has-text("JavaScript"), button[aria-haspopup="listbox"]:has-text("Node"), select[id*="language"]'
    );
    if (!langSelect) {
      // Open language list and select JavaScript / Node.js
      const langDropdown = await page.$('button[id*="headlessui-listbox-button"], [data-testid="language-select"]');
      if (langDropdown) {
        await langDropdown.click();
        await page.waitForTimeout(500);
        const nodeOpt = await page.$(
          'div[role="option"]:has-text("Node.js"), div[role="option"]:has-text("JavaScript"), li:has-text("JavaScript")'
        );
        if (nodeOpt) {
          await nodeOpt.click();
          await page.waitForTimeout(500);
        }
      }
    }
  } catch (err) {
    console.warn(`    [CodeChef] Warning selecting language: ${err.message}`);
  }

  // 4. Set Code into editor
  console.log(`    [CodeChef] Inserting JavaScript solution ...`);
  const setViaMonaco = await page.evaluate((src) => {
    if (window.monaco && window.monaco.editor) {
      const models = window.monaco.editor.getModels();
      if (models && models.length > 0) {
        models[0].setValue(src);
        return true;
      }
    }
    if (typeof window.ace !== 'undefined' && window.ace.edit) {
      try {
        window.ace.edit('editor').setValue(src);
        return true;
      } catch {}
    }
    return false;
  }, code);

  if (!setViaMonaco) {
    const editor = await page.$('.monaco-editor, #editor');
    if (editor) {
      await editor.click();
      await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
      await page.keyboard.press('Backspace');
      await page.keyboard.insertText(code);
    }
  }

  await page.waitForTimeout(1000);

  // 5. Submit solution
  console.log(`    [CodeChef] Submitting solution ...`);
  const submitBtn = await page.waitForSelector(
    'button:has-text("Submit"), button[id*="submit"], [data-testid="submit-button"]',
    { timeout: 15000 }
  );
  await submitBtn.click();

  // 6. Monitor Verdict
  console.log(`    [CodeChef] Waiting for verdict ...`);
  const startTime = Date.now();
  let verdict = 'Pending';
  let timeConsumed = null;

  while (Date.now() - startTime < timeout) {
    const verdictBanner = await page.$(
      '[data-testid="submission-result"], .submission-result, h3:has-text("Correct Answer"), h3:has-text("Wrong Answer"), span:has-text("Correct Answer"), span:has-text("Wrong Answer"), span:has-text("Runtime Error"), span:has-text("Time Limit Exceeded")'
    );

    if (verdictBanner) {
      const text = (await verdictBanner.textContent()).trim();
      if (/correct answer|wrong answer|runtime error|time limit|partially accepted/i.test(text)) {
        verdict = text;
        try {
          const stats = await page.$$eval('span, div', (els) => {
            for (const el of els) {
              const t = el.textContent || '';
              if (/^\d+(\.\d+)?\s*s$/i.test(t.trim())) return t.trim();
            }
            return null;
          });
          if (stats) timeConsumed = stats;
        } catch {}
        break;
      }
    }

    await page.waitForTimeout(2000);
  }

  return {
    platform: 'CodeChef',
    problemId: problem.id,
    verdict,
    time: timeConsumed,
    submissionUrl: page.url(),
  };
}

module.exports = {
  checkAuth,
  submitCodeChef,
};
