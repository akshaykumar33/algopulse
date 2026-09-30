/**
 * Codeforces Submission Engine (Playwright)
 */

const { PLATFORMS } = require('../config');

/**
 * Extracts contestId and problem index from problem object
 */
function parseCodeforcesId(problem) {
  if (problem.url) {
    const match = problem.url.match(/problemset\/problem\/(\d+)\/([A-Za-z0-9]+)/);
    if (match) return { contestId: match[1], index: match[2] };
  }
  const matchId = String(problem.id || '').match(/^(\d+)([A-Za-z0-9]+)$/);
  if (matchId) return { contestId: matchId[1], index: matchId[2] };
  return null;
}

/**
 * Checks if the current page has an active logged-in Codeforces session
 */
async function checkAuth(page) {
  const profileLink = await page.$('a[href*="/profile/"]');
  if (profileLink) {
    const handle = await profileLink.textContent();
    return { authenticated: true, handle: handle ? handle.trim() : null };
  }
  return { authenticated: false };
}

/**
 * Submits solution code to Codeforces and waits for verdict
 */
async function submitCodeforces(page, problem, code, { timeout = 60000 } = {}) {
  const parsed = parseCodeforcesId(problem);
  if (!parsed) {
    throw new Error(`Unable to parse Codeforces contest ID and index from: ${problem.id || problem.url}`);
  }

  const { contestId, index } = parsed;
  const problemUrl = problem.url || `https://codeforces.com/problemset/problem/${contestId}/${index}`;

  console.log(`    [Codeforces] Navigating to problem ${contestId}${index} ...`);
  await page.goto(problemUrl, { waitUntil: 'domcontentloaded', timeout });

  // 1. Verify Authentication
  const auth = await checkAuth(page);
  if (!auth.authenticated) {
    throw new Error(
      'Not authenticated on Codeforces. Please run "npm run submit:auth -- --platform codeforces" to log in first.'
    );
  }
  console.log(`    [Codeforces] Logged in as: ${auth.handle}`);

  // 2. Select Node.js / JavaScript Compiler
  // Check sidebar submit form or navigate to global submit page
  const sidebarForm = await page.$('.submit-form');
  let useGlobalSubmit = !sidebarForm;

  if (sidebarForm) {
    console.log(`    [Codeforces] Selecting Node.js language in sidebar ...`);
    const select = await page.$('.submit-form select[name="programTypeId"]');
    if (select) {
      const options = await page.$$eval('.submit-form select[name="programTypeId"] option', (opts) =>
        opts.map((o) => ({ value: o.value, text: o.textContent.trim() }))
      );
      // Prefer Node.js, otherwise JavaScript
      const nodeOption =
        options.find((o) => /node\.?js/i.test(o.text)) || options.find((o) => /javascript/i.test(o.text));
      if (nodeOption) {
        await select.selectOption(nodeOption.value);
      }
    }

    // Set code in textarea or Ace editor
    const hasAce = await page.evaluate(() => typeof window.ace !== 'undefined' && Boolean(window.ace.edit('editor')));
    if (hasAce) {
      await page.evaluate((src) => window.ace.edit('editor').setValue(src), code);
    } else {
      await page.fill('.submit-form textarea[name="source"]', code);
    }

    console.log(`    [Codeforces] Submitting solution ...`);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout }).catch(() => {}),
      page.click('.submit-form input[type="submit"]'),
    ]);
  } else {
    // Global submit page
    console.log(`    [Codeforces] Using global submit page for ${contestId}${index} ...`);
    await page.goto('https://codeforces.com/problemset/submit', { waitUntil: 'domcontentloaded', timeout });

    await page.fill('input[name="submittedProblemCode"]', `${contestId}${index}`);

    const select = await page.$('select[name="programTypeId"]');
    if (select) {
      const options = await page.$$eval('select[name="programTypeId"] option', (opts) =>
        opts.map((o) => ({ value: o.value, text: o.textContent.trim() }))
      );
      const nodeOption =
        options.find((o) => /node\.?js/i.test(o.text)) || options.find((o) => /javascript/i.test(o.text));
      if (nodeOption) {
        await select.selectOption(nodeOption.value);
      }
    }

    await page.fill('textarea[name="source"]', code);
    console.log(`    [Codeforces] Submitting solution ...`);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout }).catch(() => {}),
      page.click('input.submit[type="submit"], input[value="Submit"]'),
    ]);
  }

  // 3. Monitor Verdict on status page
  const statusUrl = 'https://codeforces.com/problemset/status?my';
  if (!page.url().includes('status?my')) {
    await page.goto(statusUrl, { waitUntil: 'domcontentloaded', timeout });
  }

  console.log(`    [Codeforces] Waiting for judge verdict ...`);
  const startTime = Date.now();
  let verdict = 'Pending';
  let submissionId = null;
  let timeConsumed = null;
  let memoryConsumed = null;

  while (Date.now() - startTime < timeout) {
    const row = await page.$('.status-frame-datatable tr[data-submission-id]');
    if (row) {
      submissionId = await row.getAttribute('data-submission-id');
      const cells = await row.$$('td');
      if (cells.length >= 6) {
        const rawVerdict = (await cells[5].textContent()).trim();
        timeConsumed = cells.length >= 7 ? (await cells[6].textContent()).trim() : null;
        memoryConsumed = cells.length >= 8 ? (await cells[7].textContent()).trim() : null;

        // Check if finished
        const isEvaluating =
          /in queue|running|judging/i.test(rawVerdict) || rawVerdict === '' || /^\s*$/.test(rawVerdict);
        if (!isEvaluating) {
          verdict = rawVerdict;
          break;
        }
      }
    }

    await page.waitForTimeout(2500);
    // Reload status page to refresh verdict
    await page.goto(statusUrl, { waitUntil: 'domcontentloaded' }).catch(() => {});
  }

  return {
    platform: 'Codeforces',
    problemId: `${contestId}${index}`,
    submissionId,
    verdict,
    time: timeConsumed,
    memory: memoryConsumed,
    submissionUrl: submissionId ? `https://codeforces.com/contest/${contestId}/submission/${submissionId}` : null,
  };
}

module.exports = {
  checkAuth,
  submitCodeforces,
  parseCodeforcesId,
};
