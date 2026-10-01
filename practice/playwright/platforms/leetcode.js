/**
 * LeetCode Submission Engine (Playwright)
 */

const { PLATFORMS } = require('../config');
const { sanitizeCodeForSubmission } = require('../sanitize');

/**
 * Strips local Node.js test harness, exports, comments, and AI watermarks from LeetCode solution code
 */
function prepareLeetCodeCode(rawCode) {
  return sanitizeCodeForSubmission(rawCode, 'leetcode');
}

/**
 * Checks if the current page has an active logged-in LeetCode session
 */
async function checkAuth(page) {
  // 1. Check cookies across the browser context (definitive source of truth)
  try {
    const cookies = await page.context().cookies();
    const sessionCookie = cookies.find((c) => /leetcode_session/i.test(c.name) && c.value);
    if (sessionCookie) {
      return { authenticated: true };
    }
  } catch {}

  // 2. Check if page has redirected away from login and shows user avatar or profile elements
  const currentUrl = page.url();
  const isLoginPage = currentUrl.includes('/accounts/login') || currentUrl.includes('/accounts.google');

  if (!isLoginPage && currentUrl.includes('leetcode.com')) {
    const avatar = await page.$(
      '#navbar_user_avatar, [data-cypress="NavbarUserAvatar"], img[alt*="avatar"], button[id*="headlessui-menu-button"], a[href*="/profile/"]'
    );
    if (avatar) {
      return { authenticated: true };
    }
  }

  // 3. Fallback check for visible login link
  const loginButton = await page.$('a[href*="/accounts/login"]');
  if (loginButton) {
    const isVisible = await loginButton.isVisible().catch(() => false);
    if (isVisible) return { authenticated: false };
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

  // 2. Ensure Language matches solution type (MySQL for SQL queries, JavaScript otherwise)
  const isSql = /^\s*(--[\s\S]*?\n\s*)?select\s+[\s\S]+\s+from\s+/i.test(code) || (problem.tags || []).includes('database');
  const targetLang = isSql ? 'MySQL' : 'JavaScript';

  try {
    const buttons = await page.$$('button');
    let langBtn = null;
    let currentLang = '';
    const knownLanguages = [
      'MySQL', 'MS SQL Server', 'Oracle', 'PostgreSQL', 'Pandas',
      'C++', 'Java', 'Python', 'Python3', 'JavaScript', 'TypeScript',
      'C', 'C#', 'Go', 'Rust', 'Ruby', 'Swift', 'Kotlin', 'Dart', 'Scala'
    ];

    for (const b of buttons) {
      const text = (await b.textContent()).trim();
      if (knownLanguages.includes(text)) {
        langBtn = b;
        currentLang = text;
        break;
      }
    }

    if (langBtn && currentLang !== targetLang) {
      console.log(`    [LeetCode] Switching language from "${currentLang}" to "${targetLang}" ...`);
      await langBtn.click();
      await page.waitForTimeout(600);

      const switched = await page.evaluate((target) => {
        const els = Array.from(document.querySelectorAll('.group.cursor-pointer, [data-state="open"] div'));
        const el = els.find((e) => e.innerText && e.innerText.trim() === target);
        if (el) {
          el.click();
          return true;
        }
        return false;
      }, targetLang);

      if (switched) {
        await page.waitForTimeout(1000);
        console.log(`    [LeetCode] ✓ Language switched to ${targetLang}`);
      }
    }
  } catch (err) {
    console.warn(`    [LeetCode] Warning selecting language: ${err.message}`);
  }

  // 3. Inject solution code into Monaco editor
  console.log(`    [LeetCode] Inserting ${targetLang} solution ...`);
  await page.waitForTimeout(1000);

  const setViaMonaco = await page.evaluate(({ src, isSql }) => {
    if (window.monaco && window.monaco.editor) {
      const models = window.monaco.editor.getModels();
      // 1. Find model by target language
      const targetModel = models.find((m) => {
        const lang = (m.getLanguageId() || '').toLowerCase();
        if (isSql) return lang.includes('sql') || lang.includes('mysql');
        return lang === 'javascript' || lang === 'typescript';
      });
      if (targetModel) {
        targetModel.setValue(src);
        return true;
      }

      // 2. Try editors with matching model
      const editors = window.monaco.editor.getEditors();
      for (const ed of editors) {
        const model = ed.getModel();
        if (model) {
          const lang = (model.getLanguageId() || '').toLowerCase();
          if ((isSql && (lang.includes('sql') || lang.includes('mysql'))) ||
              (!isSql && (lang === 'javascript' || lang === 'typescript'))) {
            model.setValue(src);
            return true;
          }
        }
      }

      // 3. Fallback to first editor
      if (editors.length > 0) {
        editors[0].setValue(src);
        return true;
      }
    }
    return false;
  }, { src: code, isSql });

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
