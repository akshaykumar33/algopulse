/**
 * Codeforces Submission Engine (Playwright)
 */

const os = require('os');
const fs = require('fs');
const path = require('path');
const https = require('https');
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
  const el = await page.waitForSelector(selector, { timeout: 25000 }).catch(() => null);
  if (el) {
    const headerProfile = await page.$('#header a[href*="/profile/"], .lang-chooser a[href*="/profile/"]');
    const handle = headerProfile ? await headerProfile.textContent() : null;
    return { authenticated: true, handle: handle ? handle.trim() : 'authenticated' };
  }

  return { authenticated: false };
}

function pollCodeforcesVerdictViaAPI(handle, problemCode, submitTimestamp = 0) {
  return new Promise((resolve) => {
    const url = `https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}&from=1&count=6`;
    const req = https.get(url, { timeout: 6000, headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          const j = JSON.parse(data);
          if (j.status === 'OK' && Array.isArray(j.result)) {
            for (const r of j.result) {
              const pCode = `${r.problem.contestId}${r.problem.index}`.toLowerCase();
              if (pCode === problemCode.toLowerCase()) {
                if (submitTimestamp && r.creationTimeSeconds < submitTimestamp - 20) {
                  continue;
                }
                if (!r.verdict || /running|judging|in queue|testing/i.test(r.verdict)) {
                  return resolve(null);
                }
                let v = r.verdict;
                if (r.verdict === 'OK') v = 'Accepted';
                else if (r.verdict === 'WRONG_ANSWER') v = `Wrong answer on test ${r.passedTestCount + 1}`;
                else if (r.verdict === 'TIME_LIMIT_EXCEEDED') v = `Time limit exceeded on test ${r.passedTestCount + 1}`;
                else if (r.verdict === 'MEMORY_LIMIT_EXCEEDED') v = `Memory limit exceeded on test ${r.passedTestCount + 1}`;
                else if (r.verdict === 'COMPILATION_ERROR') v = 'Compilation error';
                return resolve({
                  submissionId: r.id,
                  verdict: v,
                  time: `${r.timeConsumedMillis} ms`,
                  memory: `${Math.round(r.memoryConsumedBytes / 1024)} KB`,
                });
              }
            }
          }
        } catch {}
        resolve(null);
      });
    });
    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
  });
}

/**
 * Submits solution code to Codeforces and waits for verdict
 */
async function submitCodeforces(page, problem, code, { filePath, timeout = 45000 } = {}) {
  const parsed = parseCodeforcesId(problem);
  if (!parsed) {
    throw new Error(`Unable to parse Codeforces contest ID and index from: ${problem.id || problem.url}`);
  }

  const { contestId, index } = parsed;
  const problemCode = `${contestId}${index}`;

  console.log(`    [Codeforces] Preparing submit page for ${problemCode} ...`);
  page.on('dialog', (dialog) => dialog.accept().catch(() => {}));
  const contestSubmitUrl = `https://codeforces.com/contest/${contestId}/submit`;
  try {
    await page.goto(contestSubmitUrl, { waitUntil: 'domcontentloaded', timeout: 35000 });
  } catch {
    await page.goto(contestSubmitUrl, { waitUntil: 'commit', timeout: 25000 }).catch(() => {});
  }

  // 1. Verify Authentication
  const auth = await checkAuth(page);
  if (!auth.authenticated) {
    throw new Error(
      'Not authenticated on Codeforces. Please run "npm run submit:auth -- --platform codeforces" to log in first.'
    );
  }
  console.log(`    [Codeforces] Logged in as: ${auth.handle}`);

  // 2. Select / Fill problem code
  const select = await page.$('select[name="submittedProblemIndex"]');
  if (select) {
    await page.selectOption('select[name="submittedProblemIndex"]', index);
  } else {
    const codeInput = await page.waitForSelector('input[name="submittedProblemCode"]', { timeout: 25000 });
    await codeInput.fill('');
    await codeInput.fill(problemCode);
  }

  // 3. Select language (JavaScript V8 or Node.js)
  const langSelect = await page.$('select[name="programTypeId"]');
  if (langSelect) {
    const options = await page.$$eval('select[name="programTypeId"] option', (opts) =>
      opts.map((o) => ({ value: o.value, text: o.textContent.trim() }))
    );
    const jsOpt =
      options.find((o) => /Node/i.test(o.text)) ||
      options.find((o) => /JavaScript/i.test(o.text) && !/V8/i.test(o.text)) ||
      options.find((o) => /JavaScript/i.test(o.text));
    if (jsOpt) {
      console.log(`    [Codeforces] Selected compiler: ${jsOpt.text} (ID: ${jsOpt.value})`);
      await page.selectOption('select[name="programTypeId"]', jsOpt.value);
    }
  }

  // 4. Set source code (file upload preferred)
  if (filePath && fs.existsSync(filePath)) {
    const tempFile = path.join(os.tmpdir(), `cf_${problemCode}_${Date.now()}.js`);
    fs.writeFileSync(tempFile, code, 'utf-8');
    console.log(`    [Codeforces] Uploading sanitized source file ...`);
    await page.setInputFiles('input[name="sourceFile"]', tempFile);
  } else {
    await page.fill('textarea[name="source"]', code);
  }

  // 5. Submit solution
  console.log(`    [Codeforces] Submitting solution ...`);
  const submitTimestamp = Math.floor(Date.now() / 1000);
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {}),
    page.click('input.submit[type="submit"], input[value="Submit"]'),
  ]);

  const submitError = await page.$eval('.error, .for-field-error', (el) => el.innerText.trim()).catch(() => '');
  if (submitError && submitError.includes('You have submitted exactly the same code before')) {
    console.log(`    [Codeforces] Duplicate submission detected on page. Fetching previous verdict from API...`);
    const apiResult = await pollCodeforcesVerdictViaAPI(auth.handle, problemCode, 0);
    if (apiResult) {
      return {
        platform: 'Codeforces',
        problemId: problemCode,
        submissionId: apiResult.submissionId,
        verdict: apiResult.verdict,
        time: apiResult.time,
        memory: apiResult.memory,
        submissionUrl: `https://codeforces.com/contest/${contestId}/submission/${apiResult.submissionId}`,
      };
    }
  }

  // 6. Monitor Verdict via API
  console.log(`    [Codeforces] Waiting for judge verdict ...`);
  const startTime = Date.now();
  let verdict = 'Pending';
  let submissionId = null;
  let timeConsumed = null;
  let memoryConsumed = null;

  // Short pause for judge queue
  await new Promise((r) => setTimeout(r, 4000));

  while (Date.now() - startTime < timeout) {
    if (auth.handle && auth.handle !== 'authenticated') {
      const apiResult = await pollCodeforcesVerdictViaAPI(auth.handle, problemCode, submitTimestamp);
      if (apiResult) {
        verdict = apiResult.verdict;
        submissionId = apiResult.submissionId;
        timeConsumed = apiResult.time;
        memoryConsumed = apiResult.memory;
        break;
      }
    }
    await new Promise((r) => setTimeout(r, 2500));
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
