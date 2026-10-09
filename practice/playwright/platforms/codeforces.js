/**
 * Codeforces Submission Engine (Playwright)
 */

const os = require('os');
const fs = require('fs');
const path = require('path');
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
  // Wait up to 15s if Cloudflare security verification is active
  for (let i = 0; i < 15; i++) {
    const title = await page.title().catch(() => '');
    if (!title.includes('Just a moment') && !title.includes('Attention')) break;
    await page.waitForTimeout(1000);
  }

  const title = await page.title().catch(() => '');
  if (title.includes('Just a moment') || title.includes('Attention')) {
    return { authenticated: false, error: 'Cloudflare verification challenge active' };
  }

  const selector = '#header a[href*="/profile/"], .lang-chooser a[href*="/profile/"], a[href*="/logout"]';
  const el = await page.waitForSelector(selector, { timeout: 6000 }).catch(() => null);
  if (el) {
    const headerProfile = await page.$('#header a[href*="/profile/"], .lang-chooser a[href*="/profile/"]');
    const handle = headerProfile ? await headerProfile.textContent() : null;
    return { authenticated: true, handle: handle ? handle.trim() : 'authenticated' };
  }

  return { authenticated: false };
}

/**
 * Submits solution code to Codeforces and waits for verdict
 */
async function submitCodeforces(page, problem, code, { filePath, timeout = 60000 } = {}) {
  const parsed = parseCodeforcesId(problem);
  if (!parsed) {
    throw new Error(`Unable to parse Codeforces contest ID and index from: ${problem.id || problem.url}`);
  }

  const { contestId, index } = parsed;
  const problemCode = `${contestId}${index}`;

  console.log(`    [Codeforces] Navigating to submit page for ${problemCode} ...`);
  page.on('dialog', (dialog) => dialog.accept().catch(() => {}));
  try {
    await page.goto('https://codeforces.com/problemset/submit', { waitUntil: 'domcontentloaded', timeout: 20000 });
  } catch {
    await page.goto('https://codeforces.com/problemset/submit', { waitUntil: 'commit', timeout: 15000 });
  }

  // 1. Verify Authentication
  const auth = await checkAuth(page);
  if (!auth.authenticated) {
    throw new Error(
      'Not authenticated on Codeforces. Please run "npm run submit:auth -- --platform codeforces" to log in first.'
    );
  }
  console.log(`    [Codeforces] Logged in as: ${auth.handle}`);

  // 2. Fill problem code
  const codeInput = await page.waitForSelector('input[name="submittedProblemCode"]', { timeout: 25000 });
  await codeInput.fill(problemCode);

  // 3. Select Node.js Compiler
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

  // 4. Attach sanitized source file or code
  const fileInput = await page.$('input[name="sourceFile"]');
  if (fileInput) {
    const tempFile = path.join(os.tmpdir(), `${problem.file || 'solution'}.js`);
    fs.writeFileSync(tempFile, code, 'utf-8');
    console.log(`    [Codeforces] Uploading sanitized source file ...`);
    await page.setInputFiles('input[name="sourceFile"]', tempFile);
  } else {
    await page.fill('textarea[name="source"]', code);
  }

  // 5. Submit solution
  console.log(`    [Codeforces] Submitting solution ...`);
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 }).catch(() => {}),
    page.click('input.submit[type="submit"], input[value="Submit"]'),
  ]);

  // 6. Monitor Verdict on status page
  const statusUrl = 'https://codeforces.com/problemset/status?my=on';
  if (!page.url().includes('status?my')) {
    await page.goto(statusUrl, { waitUntil: 'domcontentloaded', timeout }).catch(() => {});
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

        // Check if finished evaluating
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
    problemId: problemCode,
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

