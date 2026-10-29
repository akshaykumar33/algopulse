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
  try {
    const status = await page.evaluate(async () => {
      try {
        const resp = await fetch('https://leetcode.com/graphql/', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            query: 'query globalData { userStatus { isSignedIn username userSlug } }'
          })
        });
        const d = await resp.json();
        return d?.data?.userStatus || null;
      } catch {
        return null;
      }
    });
    if (status && status.isSignedIn) {
      return { authenticated: true, username: status.username };
    }
  } catch {}

  const topNavLogin = await page.$('nav a[href*="/accounts/login"], header a[href*="/accounts/login"]');
  if (topNavLogin) {
    const isVisible = await topNavLogin.isVisible().catch(() => false);
    if (isVisible) return { authenticated: false };
  }

  const avatar = await page.$(
    '#navbar_user_avatar, [data-cypress="NavbarUserAvatar"], img[alt*="avatar"], a[href*="/profile/"]'
  );
  if (avatar) return { authenticated: true };

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
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      await page.goto(problemUrl, { waitUntil: 'domcontentloaded', timeout });
      break;
    } catch (err) {
      if (attempt === 2) throw err;
      await page.waitForTimeout(2000);
    }
  }

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

  // 2. Ensure Language matches solution type (Bash for shell, MySQL for SQL, JavaScript otherwise)
  const isBash = /^\s*(cat|awk|grep|sed|tr)\b/i.test(code) || (problem.tags || []).includes('shell');
  const isSql = !isBash && (/^\s*(--[\s\S]*?\n\s*)?select\s+[\s\S]+\s+from\s+/i.test(code) || (problem.tags || []).includes('database'));
  const targetLang = isBash ? 'Bash' : (isSql ? 'MySQL' : 'JavaScript');

  try {
    const buttons = await page.$$('button');
    let langBtn = null;
    let currentLang = '';
    const knownLanguages = [
      'Bash', 'MySQL', 'MS SQL Server', 'Oracle', 'PostgreSQL', 'Pandas',
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

  const setViaMonaco = await page.evaluate(({ src, isSql, isBash }) => {
    if (window.monaco && window.monaco.editor) {
      const models = window.monaco.editor.getModels();
      // 1. Find model by target language
      const targetModel = models.find((m) => {
        const lang = (m.getLanguageId() || '').toLowerCase();
        if (isBash) return lang.includes('shell') || lang.includes('bash');
        if (isSql) return lang.includes('sql') || lang.includes('mysql');
        return lang === 'javascript' || lang === 'typescript';
      });
      const applyCode = (m) => {
        let finalCode = (src || '').replace(/\r\n/g, '\n');
        if (!isSql && !isBash) {
          const starter = m.getValue() || '';
          const cleanStarter = starter.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim();
          const fnMatch = cleanStarter.match(/(?:var|let|const)\s+([a-zA-Z0-9_$]+)\s*=\s*function|function\s+([a-zA-Z0-9_$]+)\s*\(|class\s+([a-zA-Z0-9_$]+)\b/);
          const expectedFn = fnMatch ? (fnMatch[1] || fnMatch[2] || fnMatch[3]) : null;
          if (expectedFn && expectedFn !== 'solve') {
            const hasExpected = new RegExp(`(?:var|let|const|function|class)\\s+${expectedFn}\\b`).test(finalCode);
            if (!hasExpected) {
              if (/\b(?:var|let|const)\s+solve\s*=\s*function|\bfunction\s+solve\s*\(/.test(finalCode)) {
                finalCode = finalCode.replace(/\b(?:var|let|const)\s+solve\s*=\s*function/, `var ${expectedFn} = function`)
                               .replace(/\bfunction\s+solve\s*\(/, `function ${expectedFn}(`)
                               + `\nvar solve = typeof ${expectedFn} !== 'undefined' ? ${expectedFn} : null;\n`;
              } else {
                finalCode = finalCode + `\nvar ${expectedFn} = typeof solve !== 'undefined' ? solve : null;\n`;
              }
            }
          }
        }
        m.setValue(finalCode);
      };

      if (targetModel) {
        applyCode(targetModel);
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
            applyCode(model);
            return true;
          }
        }
      }

      // 3. Fallback to first editor
      if (editors.length > 0) {
        applyCode(editors[0].getModel());
        return true;
      }
    }
    return false;
  }, { src: code, isSql, isBash });

  if (!setViaMonaco) {
    // Fallback: click editor, select all, fill/paste via clipboard
    const editor = await page.$('.monaco-editor');
    if (editor) {
      await editor.click();
      await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
      await page.keyboard.press('Backspace');
      const normCode = code.replace(/\r\n/g, '\n');
      await page.evaluate((src) => navigator.clipboard.writeText(src), normCode).catch(() => {});
      await page.keyboard.press(process.platform === 'darwin' ? 'Meta+V' : 'Control+V');
    }
  }

  await page.waitForTimeout(1000);

  // 4. Click Submit button & intercept network submission
  console.log(`    [LeetCode] Submitting solution ...`);


  let submitBtn = await page.$('button[data-e2e-locator="console-submit-button"]');
  if (!submitBtn) {
    submitBtn = await page.waitForSelector(
      'button:text-is("Submit"), button[data-cy="submit-code-btn"]',
      { timeout: 15000 }
    );
  }
  await submitBtn.scrollIntoViewIfNeeded().catch(() => {});

  const [submitResponse] = await Promise.all([
    page.waitForResponse((res) => res.url().includes('/submit/'), { timeout: 25000 }).catch(() => null),
    submitBtn.click(),
  ]);

  if (!submitResponse) {
    throw new Error('LeetCode submit request was not triggered. Ensure your session is logged in.');
  }

  if (submitResponse.status() !== 200) {
    const errText = await submitResponse.text().catch(() => '');
    throw new Error(`LeetCode submit rejected with HTTP ${submitResponse.status()}: ${errText.slice(0, 120)}`);
  }

  let subData = null;
  try {
    subData = await submitResponse.json();
  } catch {}

  const submissionId = subData?.submission_id;
  if (!submissionId) {
    throw new Error(`Failed to retrieve submission_id from LeetCode. Response: ${JSON.stringify(subData)}`);
  }

  console.log(`    [LeetCode] Submission dispatched! ID: ${submissionId}. Awaiting judge verdict ...`);
  const checkUrl = `https://leetcode.com/submissions/detail/${submissionId}/check/`;
  let verdict = 'Pending';
  let runtime = null;
  let memory = null;
  let runtimeBeats = null;
  let memoryBeats = null;
  const pollStart = Date.now();

  while (Date.now() - pollStart < timeout) {
    await page.waitForTimeout(1500);
    const checkRes = await page.evaluate(async (url) => {
      try {
        const r = await fetch(url);
        return await r.json();
      } catch {
        return null;
      }
    }, checkUrl);

    if (checkRes && checkRes.state === 'SUCCESS') {
      verdict = checkRes.status_msg || 'Accepted';
      runtime = checkRes.status_runtime || checkRes.display_runtime || null;
      memory = checkRes.status_memory || null;
      break;
    }
  }

  return {
    platform: 'LeetCode',
    problemId: problem.id,
    submissionId: submissionId || null,
    verdict,
    runtime,
    memory,
    runtimeBeats,
    memoryBeats,
    submissionUrl: submissionId ? `https://leetcode.com/submissions/detail/${submissionId}/` : page.url(),
  };
}

module.exports = {
  checkAuth,
  prepareLeetCodeCode,
  submitLeetCode,
};
