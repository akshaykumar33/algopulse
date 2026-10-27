/**
 * CodeChef Submission Engine (Playwright)
 */

const { PLATFORMS } = require('../config');

/**
 * Checks if the current page has an active logged-in CodeChef session
 */
async function checkAuth(page) {
  const url = page.url();
  if (/codechef\.com\/login/i.test(url)) {
    return { authenticated: false };
  }

  const cookies = await page.context().cookies('https://www.codechef.com').catch(() => []);
  const authTokenCookie = cookies.find((c) => /authtoken|remember_me|user_id|^sess/i.test(c.name) && c.value);
  if (authTokenCookie) {
    return { authenticated: true };
  }

  const profile = await page.$('.user-name, [data-testid="user-profile-button"], a[href*="/users/"], a[href*="/logout"], button:has-text("Logout")');
  if (profile) {
    const handle = await profile.textContent().catch(() => null);
    if (handle && handle.trim() && !/login|sign in/i.test(handle)) {
      return { authenticated: true, handle: handle.trim() };
    }
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
        const searchBox = await page.$('input[placeholder*="search" i], input[type="text"]');
        if (searchBox) {
          await searchBox.fill('JavaScript');
          await page.waitForTimeout(500);
        }
        let jsOption = await page.$('li[role="option"]:has-text("JavaScript"), li:has-text("JavaScript"), div[role="option"]:has-text("JavaScript")');
        if (!jsOption && searchBox) {
          await searchBox.fill('Node');
          await page.waitForTimeout(500);
          jsOption = await page.$('li[role="option"]:has-text("Node"), li:has-text("Node"), div[role="option"]:has-text("Node")');
        }
        if (jsOption) {
          await jsOption.click().catch(() => {});
          await page.waitForTimeout(500);
        }
        await page.keyboard.press('Escape').catch(() => {});
        await page.waitForTimeout(300);
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
      const norm = (s) => (s || '').replace(/\r\n/g, '\n').trim();
      const target = norm(src);
      const editorEl = document.querySelector('.ace_editor');
      if (editorEl && window.ace) {
        try {
          const editor = window.ace.edit(editorEl);
          editor.setValue(target, -1);
          editor.session.getUndoManager().reset();
          return norm(editor.getValue()) === target;
        } catch {}
      }
      if (window.monaco && window.monaco.editor) {
        const models = window.monaco.editor.getModels();
        if (models && models.length > 0) {
          models[0].setValue(target);
          return norm(models[0].getValue()) === target;
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
      await page.keyboard.press('Escape').catch(() => {});
      await editor.click({ force: true }).catch(() => {});
      await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
      await page.keyboard.press('Backspace');
      const normCode = code.replace(/\r\n/g, '\n');
      await page.evaluate((src) => navigator.clipboard.writeText(src), normCode).catch(() => {});
      await page.keyboard.press(process.platform === 'darwin' ? 'Meta+V' : 'Control+V');
    }
  }

  await page.waitForTimeout(1500);

  // Capture existing submission IDs / viewsolution links before submitting
  const existingSubIds = await page.evaluate(() => {
    const text = document.body ? document.body.innerText : '';
    const idMatches = Array.from(text.matchAll(/Submission ID:\s*(\d+)/gi)).map((m) => m[1]);
    const links = Array.from(document.querySelectorAll('a[href*="viewsolution"]'))
      .map((a) => (a.href.match(/viewsolution\/(\d+)/) || [])[1])
      .filter(Boolean);
    return Array.from(new Set([...idMatches, ...links]));
  });

  // 5. Submit solution
  console.log(`    [CodeChef] Submitting solution ...`);
  const submitBtn = await page.waitForSelector(
    'button:has-text("Submit"), button[id*="submit"], [data-testid="submit-button"]',
    { timeout: 15000 }
  );
  await page.keyboard.press('Escape').catch(() => {});
  await submitBtn.click({ force: true });

  // Check if login modal dialog popped up
  await page.waitForTimeout(1000);
  const loginModal = await page.$('[class*="loginModal"], div:has-text("Please login to continue")');
  if (loginModal) {
    throw new Error('CodeChef session unauthenticated: Login modal appeared upon submitting.');
  }
  const genericDialog = await page.$('.MuiDialog-root');
  if (genericDialog) {
    const dialogText = await genericDialog.innerText().catch(() => '');
    if (/please log ?in to continue|sign in to your account|login to codechef/i.test(dialogText)) {
      throw new Error('CodeChef session unauthenticated: Login modal appeared upon submitting.');
    }
  }

  // 6. Monitor Verdict
  console.log(`    [CodeChef] Waiting for verdict ...`);
  const startTime = Date.now();
  let verdict = 'Pending';
  let submissionId = null;
  let timeConsumed = null;

  while (Date.now() - startTime < timeout) {
    const verdictInfo = await page.evaluate((existingIds) => {
      // 1. Look for viewsolution link in the modal or page that wasn't there before
      const viewLinks = Array.from(document.querySelectorAll('a[href*="viewsolution"]'));
      let freshSubId = null;
      for (const a of viewLinks) {
        const m = a.href.match(/viewsolution\/(\d+)/);
        if (m && m[1] && (!existingIds || !existingIds.includes(m[1]))) {
          freshSubId = m[1];
          break;
        }
      }

      // 2. Also check for "Submission ID: \d+" in text that wasn't there before
      if (!freshSubId) {
        const textMatches = Array.from((document.body ? document.body.innerText : '').matchAll(/Submission ID:\s*(\d+)/gi));
        for (const m of textMatches) {
          if (m[1] && (!existingIds || !existingIds.includes(m[1]))) {
            freshSubId = m[1];
            break;
          }
        }
      }

      // Check dialog first if present, otherwise look across candidate elements
      const dialog = document.querySelector(
        '.MuiDialog-root, [role="dialog"], [class*="submission-status"], [class*="modal"], [class*="verdict"]'
      );
      const container = dialog || document.body;
      const fullText = container ? container.innerText : '';

      // If still evaluating, wait
      if (/(Running|Evaluating|Compiling|Testing|Waiting|Queued|In Queue)/i.test(fullText) &&
          !/(Correct Answer|Wrong Answer|Time Limit Exceeded|Runtime Error|Compilation Error|Partially Accepted)/i.test(fullText)) {
        return null;
      }

      const match = fullText.match(
        /(Correct Answer|Wrong Answer|Time Limit Exceeded|Runtime Error|Compilation Error|Partially Accepted)/i
      );

      if (match) {
        // If we found a fresh submission ID
        if (freshSubId) {
          const timeMatch = fullText.match(/\((\d+(?:\.\d+)?)\)/);
          return {
            verdict: match[1],
            submissionId: freshSubId,
            time: timeMatch ? `${timeMatch[1]}s` : null,
          };
        }

        // If inside an explicit result dialog that finished evaluating
        if (dialog && !/(Running|Evaluating|Compiling|Testing)/i.test(dialog.innerText)) {
          const idMatch = dialog.innerText.match(/Submission ID:\s*(\d+)/i);
          const timeMatch = dialog.innerText.match(/\((\d+(?:\.\d+)?)\)/);
          return {
            verdict: match[1],
            submissionId: idMatch ? idMatch[1] : null,
            time: timeMatch ? `${timeMatch[1]}s` : null,
          };
        }
      }

      return null;
    }, existingSubIds);

    if (verdictInfo) {
      verdict = verdictInfo.verdict;
      submissionId = verdictInfo.submissionId;
      timeConsumed = verdictInfo.time;
      break;
    }

    if (Date.now() - startTime > 45000) {
      const fallback = await page.evaluate(() => {
        const dialog = document.querySelector('.MuiDialog-root, [role="dialog"]');
        if (dialog) {
          const text = dialog.innerText || '';
          const match = text.match(
            /(Correct Answer|Wrong Answer|Time Limit Exceeded|Runtime Error|Compilation Error|Partially Accepted)/i
          );
          if (match && !/(Running|Evaluating|Compiling|Testing)/i.test(text)) {
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
      if (fallback) {
        verdict = fallback.verdict;
        submissionId = fallback.submissionId;
        timeConsumed = fallback.time;
        break;
      }
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

