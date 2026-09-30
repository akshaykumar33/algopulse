/**
 * LeetCode Submission Engine (Playwright)
 */

const { PLATFORMS } = require('../config');

/**
 * Strips local Node.js test harness and exports from LeetCode solution code
 */
function prepareLeetCodeCode(rawCode) {
  let cleaned = rawCode;

  // Cut off test harness separator
  const harnessIndex = cleaned.indexOf('// ---------------- LOCAL TEST HARNESS ----------------');
  if (harnessIndex !== -1) {
    cleaned = cleaned.slice(0, harnessIndex);
  }

  // Remove require.main === module block if still present
  cleaned = cleaned.replace(/if\s*\(\s*require\.main\s*===\s*module\s*\)[\s\S]*?(?=module\.exports|$)/g, '');

  // Remove module.exports
  cleaned = cleaned.replace(/module\.exports\s*=\s*[^;\n]+;?/g, '');

  return cleaned.trim() + '\n';
}

/**
 * Checks if the current page has an active logged-in LeetCode session
 */
async function checkAuth(page) {
  // Check for login button or user avatar
  const loginButton = await page.$('a[href*="/accounts/login"]');
  if (loginButton) {
    const isVisible = await loginButton.isVisible().catch(() => false);
    if (isVisible) return { authenticated: false };
  }

  const avatar = await page.$(
    '#navbar_user_avatar, [data-cypress="NavbarUserAvatar"], img[alt*="avatar"], button[id*="headlessui-menu-button"]'
  );
  if (avatar) {
    return { authenticated: true };
  }

  // Also check cookies for LEETCODE_SESSION
  const cookies = await page.context().cookies('https://leetcode.com');
  const sessionCookie = cookies.find((c) => c.name === 'LEETCODE_SESSION');
  if (sessionCookie && sessionCookie.value) {
    return { authenticated: true };
  }

  return { authenticated: false };
}

/**
 * Submits solution code to LeetCode and waits for verdict
 */
async function submitLeetCode(page, problem, rawCode, { timeout = 60000 } = {}) {
  const code = prepareLeetCodeCode(rawCode);
  const problemUrl = problem.url;

  if (!problemUrl) {
    throw new Error(`LeetCode problem missing URL: ${JSON.stringify(problem)}`);
  }

  console.log(`    [LeetCode] Navigating to ${problem.name || problem.id} ...`);
  await page.goto(problemUrl, { waitUntil: 'domcontentloaded', timeout });

  // 1. Verify Authentication
  const auth = await checkAuth(page);
  if (!auth.authenticated) {
    throw new Error(
      'Not authenticated on LeetCode. Please run "npm run submit:auth -- --platform leetcode" to log in first.'
    );
  }

  // Wait for the Monaco code editor or container to appear
  console.log(`    [LeetCode] Waiting for code editor ...`);
  await page.waitForSelector('.monaco-editor, [data-track-load="code_editor"]', { timeout: 25000 });

  // 2. Ensure Language is JavaScript
  try {
    const langBtn = await page.$(
      'button[id*="headlessui-listbox-button"], [data-cy="lang-select"], button:has-text("JavaScript")'
    );
    if (langBtn) {
      const currentLang = (await langBtn.textContent()).trim();
      if (!/javascript/i.test(currentLang)) {
        await langBtn.click();
        await page.waitForTimeout(500);
        const jsOption = await page.$('div[role="option"]:has-text("JavaScript"), li:has-text("JavaScript")');
        if (jsOption) {
          await jsOption.click();
          await page.waitForTimeout(500);
        }
      }
    }
  } catch (err) {
    console.warn(`    [LeetCode] Warning selecting language: ${err.message}`);
  }

  // 3. Inject solution code into Monaco editor
  console.log(`    [LeetCode] Inserting JavaScript solution ...`);
  const setViaMonaco = await page.evaluate((src) => {
    if (window.monaco && window.monaco.editor) {
      const models = window.monaco.editor.getModels();
      if (models && models.length > 0) {
        models[0].setValue(src);
        return true;
      }
    }
    return false;
  }, code);

  if (!setViaMonaco) {
    // Fallback: click editor, select all, fill/paste
    const editor = await page.$('.monaco-editor');
    if (editor) {
      await editor.click();
      await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
      await page.keyboard.press('Backspace');
      await page.keyboard.insertText(code);
    }
  }

  await page.waitForTimeout(1000);

  // 4. Click Submit button
  console.log(`    [LeetCode] Submitting solution ...`);
  const submitBtn = await page.waitForSelector(
    'button[data-e2e-locator="console-submit-button"], button:has-text("Submit")',
    { timeout: 15000 }
  );
  await submitBtn.click();

  // 5. Monitor Submission Result
  console.log(`    [LeetCode] Awaiting judge verdict ...`);
  const startTime = Date.now();
  let verdict = 'Pending';
  let runtime = null;
  let memory = null;
  let runtimeBeats = null;
  let memoryBeats = null;

  while (Date.now() - startTime < timeout) {
    // Look for success/failure banner or modal
    const resultElement = await page.$(
      '[data-e2e-locator="submission-result"], span:has-text("Accepted"), span:has-text("Wrong Answer"), span:has-text("Compile Error"), span:has-text("Time Limit Exceeded"), span:has-text("Runtime Error")'
    );

    if (resultElement) {
      const text = (await resultElement.textContent()).trim();
      if (/accepted|wrong answer|compile error|time limit|runtime error/i.test(text)) {
        verdict = text;

        // Try extracting runtime and memory stats
        try {
          const stats = await page.$$eval('span, div', (els) => {
            const r = {};
            for (const el of els) {
              const t = el.textContent || '';
              if (t.includes('Beats') && t.includes('%')) {
                if (t.toLowerCase().includes('runtime')) r.runtimeBeats = t.trim();
                else if (t.toLowerCase().includes('memory')) r.memoryBeats = t.trim();
              }
              if (/^\d+\s*ms$/i.test(t.trim())) r.runtime = t.trim();
              if (/^\d+(\.\d+)?\s*MB$/i.test(t.trim())) r.memory = t.trim();
            }
            return r;
          });
          runtime = stats.runtime || null;
          memory = stats.memory || null;
          runtimeBeats = stats.runtimeBeats || null;
          memoryBeats = stats.memoryBeats || null;
        } catch {}

        break;
      }
    }

    await page.waitForTimeout(2000);
  }

  return {
    platform: 'LeetCode',
    problemId: problem.id,
    verdict,
    runtime,
    memory,
    runtimeBeats,
    memoryBeats,
    submissionUrl: page.url(),
  };
}

module.exports = {
  checkAuth,
  prepareLeetCodeCode,
  submitLeetCode,
};
