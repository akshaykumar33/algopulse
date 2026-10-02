/**
 * CodeChef Submission Engine (Playwright)
 */

const { PLATFORMS } = require('../config');

/**
 * Checks if the current page has an active logged-in CodeChef session
 */
async function checkAuth(page) {
  // 1. Check cookies for SESS, session, or user_id
  const cookies = await page.context().cookies('https://www.codechef.com');
  const sessionCookie = cookies.find((c) => /SESS|session|user_id/i.test(c.name) && c.value);

  // 2. Check for user profile element
  const profile = await page.$('.user-name, [data-testid="user-profile-button"], a[href*="/users/"]');
  if (profile) {
    const handle = await profile.textContent().catch(() => null);
    return { authenticated: true, handle: handle ? handle.trim() : null };
  }

  if (sessionCookie) {
    return { authenticated: true };
  }

  // 3. Check for login button
  const loginButton = await page.$('a[href*="/login"], button:has-text("Sign In")');
  if (loginButton) {
    const isVisible = await loginButton.isVisible().catch(() => false);
    if (isVisible) return { authenticated: false };
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
  await page.waitForSelector('.monaco-editor, #editor, [data-testid="editor"], .ace_editor', { timeout: 30000 });

  // 3. Language Selection: Node.js / JavaScript
  try {
    const isJsSelected = await page.evaluate(() => {
      const selectBox = document.querySelector('[class*="_language__select"], div[role="combobox"]');
      if (selectBox && /javascript|node/i.test(selectBox.innerText)) return true;
      // Also check if Ace mode is already javascript
      const aceEl = document.querySelector('.ace_editor');
      if (aceEl && window.ace) {
        try {
          const mode = window.ace.edit(aceEl).session.getMode().$id;
          if (/javascript/i.test(mode)) return true;
        } catch {}
      }
      return false;
    });

    if (!isJsSelected) {
      const langSelect = await page.$('[class*="_language__select"], div[role="combobox"]');
      if (langSelect) {
        console.log(`    [CodeChef] Switching language to JavaScript ...`);
        await langSelect.click({ timeout: 2000 }).catch(() => {});
        await page.waitForTimeout(500);
        const jsOption = await page.$('li[role="option"]:has-text("JavaScript"), li:has-text("JavaScript")');
        if (jsOption) {
          await jsOption.click().catch(() => {});
          await page.waitForTimeout(500);
        }
      }
    }
  } catch (err) {
    console.warn(`    [CodeChef] Warning selecting language: ${err.message}`);
  }

  // 4. Set Code into editor
  console.log(`    [CodeChef] Inserting JavaScript solution ...`);
  await page.waitForTimeout(2000);

  let codeSet = false;
  for (let attempt = 0; attempt < 3; attempt++) {
    const success = await page.evaluate((src) => {
      const editorEl = document.querySelector('.ace_editor');
      if (editorEl && window.ace) {
        try {
          const editor = window.ace.edit(editorEl);
          editor.setValue(src, -1);
          editor.session.getUndoManager().reset();
          return editor.getValue().trim() === src.trim();
        } catch {}
      }
      if (window.monaco && window.monaco.editor) {
        const models = window.monaco.editor.getModels();
        if (models && models.length > 0) {
          models[0].setValue(src);
          return models[0].getValue().trim() === src.trim();
        }
      }
      return false;
    }, code);

    if (success) {
      codeSet = true;
      break;
    }
    await page.waitForTimeout(1000);
  }

  if (!codeSet) {
    const editor = await page.$('.ace_editor, .monaco-editor, #editor');
    if (editor) {
      await editor.click();
      await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
      await page.keyboard.press('Backspace');
      await page.keyboard.insertText(code);
    }
  }

  await page.waitForTimeout(1500);

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
  let submissionId = null;
  let timeConsumed = null;

  while (Date.now() - startTime < timeout) {
    const verdictInfo = await page.evaluate(() => {
      // Find elements containing verdict text
      const elements = Array.from(document.querySelectorAll('*')).filter((el) => {
        const text = el.innerText || '';
        return /Correct Answer|Wrong Answer|Time Limit Exceeded|Runtime Error|Compilation Error|Partially Accepted/i.test(
          text
        );
      });

      for (const el of elements) {
        const text = el.innerText || '';
        const match = text.match(
          /(Correct Answer|Wrong Answer|Time Limit Exceeded|Runtime Error|Compilation Error|Partially Accepted)/i
        );
        if (match) {
          const idMatch = text.match(/Submission ID:\s*(\d+)/i);
          const timeMatch = text.match(/\((\d+(?:\.\d+)?)\)/);
          return {
            verdict: match[1],
            submissionId: idMatch ? idMatch[1] : null,
            time: timeMatch ? `${timeMatch[1]}s` : null,
          };
        }
      }
      return null;
    });

    if (verdictInfo) {
      verdict = verdictInfo.verdict;
      submissionId = verdictInfo.submissionId;
      timeConsumed = verdictInfo.time;
      break;
    }

    await page.waitForTimeout(2000);
  }

  return {
    platform: 'CodeChef',
    problemId: problem.id,
    submissionId,
    verdict,
    time: timeConsumed,
    submissionUrl: submissionId ? `https://www.codechef.com/viewsolution/${submissionId}` : page.url(),
  };
}

module.exports = {
  checkAuth,
  submitCodeChef,
};

