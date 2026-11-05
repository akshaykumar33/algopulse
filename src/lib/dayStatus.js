const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DAYS_DIR = path.join(REPO_ROOT, 'practice', 'days');
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Returns current calendar date in local timezone: YYYY-MM-DD
 */
function localToday() {
  const d = new Date();
  const p = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/**
 * Normalizes problem ID for matching across representations
 */
function normalizeId(id) {
  if (!id) return '';
  return String(id).toLowerCase().replace(/^(cc|lc)[-_]/, '').replace(/[\/\-_]/g, '').trim();
}

/**
 * Evaluates whether a submission verdict represents an Accepted outcome
 */
function isAcceptedVerdict(v) {
  if (!v) return false;
  const s = String(v).toLowerCase();
  return s.includes('accepted') || s.includes('correct answer') || s === 'ok';
}

/**
 * Gets the comprehensive status of a given practice day
 * @param {string} date - Date formatted as YYYY-MM-DD
 * @returns {object} status details
 */
function getDayStatus(date) {
  const dayDir = path.join(DAYS_DIR, date);
  const setPath = path.join(dayDir, 'set.json');

  if (!fs.existsSync(setPath)) {
    return {
      date,
      day: null,
      status: 'NOT_INITIALIZED',
      finished: false,
      totalProblems: 0,
      solutionsCount: 0,
      testsCount: 0,
      explanationsCount: 0,
      verifiedCount: 0,
      submittedCount: 0,
      acceptedCount: 0,
      dlqCount: 0,
      percentVerified: 0,
      percentSubmitted: 0,
      percentAccepted: 0,
      reason: 'No set.json found',
      updatedAt: new Date().toISOString(),
    };
  }

  let set;
  try {
    set = JSON.parse(fs.readFileSync(setPath, 'utf-8'));
  } catch (err) {
    return {
      date,
      day: null,
      status: 'CORRUPTED',
      finished: false,
      reason: `Failed to parse set.json: ${err.message}`,
      updatedAt: new Date().toISOString(),
    };
  }

  const problems = Array.isArray(set.problems) ? set.problems : [];
  const totalProblems = problems.length;

  const solutionsDir = path.join(dayDir, 'solutions');
  const testsDir = path.join(dayDir, 'tests');
  const explanationsDir = path.join(dayDir, 'explanations');
  const readmePath = path.join(dayDir, 'README.md');
  const submissionsPath = path.join(dayDir, 'submissions.json');
  const dlqPath = path.join(dayDir, 'dlq.json');
  const statusPath = path.join(dayDir, 'status.json');

  let solutionsCount = 0;
  let testsCount = 0;
  let explanationsCount = 0;

  for (const p of problems) {
    const f = p.file;
    if (f) {
      if (
        fs.existsSync(path.join(solutionsDir, `${f}.js`)) ||
        fs.existsSync(path.join(solutionsDir, `${f}.sh`)) ||
        fs.existsSync(path.join(solutionsDir, `${f}.sql`))
      ) {
        solutionsCount++;
      }
      if (fs.existsSync(path.join(testsDir, `${f}.json`))) {
        testsCount++;
      }
      if (fs.existsSync(path.join(explanationsDir, `${f}.md`))) {
        explanationsCount++;
      }
    }
  }

  // Verified count from README ticks
  let verifiedCount = 0;
  if (fs.existsSync(readmePath)) {
    const readme = fs.readFileSync(readmePath, 'utf-8');
    for (const p of problems) {
      const reg = new RegExp(`\\[x\\].*?\`${p.file}\\.(?:js|sh|sql)\``, 'i');
      if (reg.test(readme)) {
        verifiedCount++;
      }
    }
  }

  // Submissions status
  let submittedCount = 0;
  let acceptedCount = 0;
  const submittedSet = new Set();
  const acceptedSet = new Set();

  if (fs.existsSync(submissionsPath)) {
    try {
      const subs = JSON.parse(fs.readFileSync(submissionsPath, 'utf-8'));
      if (Array.isArray(subs)) {
        for (const s of subs) {
          const sId = normalizeId(s.id || s.problemId);
          const sFile = s.file ? String(s.file).toLowerCase() : '';
          const pMatch = problems.find((p) => {
            if (sFile && p.file && p.file.toLowerCase() === sFile) return true;
            if (sId && normalizeId(p.id) === sId) return true;
            return false;
          });

          if (pMatch) {
            submittedSet.add(pMatch.file);
            if (isAcceptedVerdict(s.verdict || s.status)) {
              acceptedSet.add(pMatch.file);
            }
          }
        }
      }
    } catch {}
  }

  submittedCount = submittedSet.size;
  acceptedCount = acceptedSet.size;

  let dlqCount = 0;
  if (fs.existsSync(dlqPath)) {
    try {
      const dlq = JSON.parse(fs.readFileSync(dlqPath, 'utf-8'));
      if (Array.isArray(dlq)) dlqCount = dlq.length;
    } catch {}
  }

  // By platform breakdown
  const byPlatform = {};
  for (const plat of ['Codeforces', 'LeetCode', 'CodeChef']) {
    const platProbs = problems.filter((p) => (p.platform || '').toLowerCase() === plat.toLowerCase());
    const platTotal = platProbs.length;
    let platSol = 0;
    let platVer = 0;
    let platSub = 0;
    let platAcc = 0;

    for (const p of platProbs) {
      if (
        fs.existsSync(path.join(solutionsDir, `${p.file}.js`)) ||
        fs.existsSync(path.join(solutionsDir, `${p.file}.sh`)) ||
        fs.existsSync(path.join(solutionsDir, `${p.file}.sql`))
      ) {
        platSol++;
      }
      if (fs.existsSync(readmePath)) {
        const readme = fs.readFileSync(readmePath, 'utf-8');
        const reg = new RegExp(`\\[x\\].*?\`${p.file}\\.(?:js|sh|sql)\``, 'i');
        if (reg.test(readme)) platVer++;
      }
      if (submittedSet.has(p.file)) platSub++;
      if (acceptedSet.has(p.file)) platAcc++;
    }

    byPlatform[plat.toLowerCase()] = {
      name: plat,
      total: platTotal,
      solutions: platSol,
      verified: platVer,
      submitted: platSub,
      accepted: platAcc,
    };
  }

  // Check if existing status.json has an explicit finished mark
  let storedStatus = null;
  if (fs.existsSync(statusPath)) {
    try {
      storedStatus = JSON.parse(fs.readFileSync(statusPath, 'utf-8'));
    } catch {}
  }

  // Determination of finished state:
  // 1. If stored status says finished: true
  // 2. Or: all problems exist, solutions written, 100% verified locally, and submissions attempted (or completed)
  const allVerified = totalProblems > 0 && verifiedCount >= totalProblems;
  const allSolutions = totalProblems > 0 && solutionsCount >= totalProblems;
  const submissionsProcessed = totalProblems > 0 && submittedCount >= totalProblems;

  const isFinished = Boolean(
    (storedStatus && storedStatus.finished) ||
    (allSolutions && allVerified && (submissionsProcessed || submittedCount > 0))
  );

  return {
    date,
    day: set.day || null,
    status: isFinished ? 'FINISHED' : 'IN_PROGRESS',
    finished: isFinished,
    totalProblems,
    solutionsCount,
    testsCount,
    explanationsCount,
    verifiedCount,
    submittedCount,
    acceptedCount,
    dlqCount,
    percentVerified: totalProblems > 0 ? Math.round((verifiedCount / totalProblems) * 100) : 0,
    percentSubmitted: totalProblems > 0 ? Math.round((submittedCount / totalProblems) * 100) : 0,
    percentAccepted: totalProblems > 0 ? Math.round((acceptedCount / totalProblems) * 100) : 0,
    byPlatform,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Updates status.json and README.md header badge for a given day
 * @param {string} date - Date formatted as YYYY-MM-DD
 * @param {object} options - Optional overrides (e.g. force finished)
 * @returns {object} status details
 */
function updateDayStatus(date, options = {}) {
  const dayDir = path.join(DAYS_DIR, date);
  if (!fs.existsSync(dayDir)) return null;

  const status = getDayStatus(date);
  if (options.forceFinished) {
    status.finished = true;
    status.status = 'FINISHED';
  }

  const statusPath = path.join(dayDir, 'status.json');
  fs.writeFileSync(statusPath, JSON.stringify(status, null, 2) + '\n', 'utf-8');

  // Update or insert status callout in README.md
  const readmePath = path.join(dayDir, 'README.md');
  if (fs.existsSync(readmePath)) {
    let readme = fs.readFileSync(readmePath, 'utf-8');
    const badgeText = status.finished
      ? `> **Day Status:** ✅ **FINISHED** (${status.verifiedCount}/${status.totalProblems} Verified, ${status.submittedCount}/${status.totalProblems} Submissions Processed, ${status.acceptedCount} Accepted)`
      : `> **Day Status:** ⏳ **IN PROGRESS** (${status.verifiedCount}/${status.totalProblems} Verified, ${status.submittedCount}/${status.totalProblems} Submitted)`;

    if (readme.includes('> **Day Status:**')) {
      readme = readme.replace(/> \*\*Day Status:\*\*.*?(?:\r?\n|$)/, `${badgeText}\n`);
    } else {
      // Insert after the title line
      const lines = readme.split(/\r?\n/);
      if (lines.length > 0 && lines[0].startsWith('# Day')) {
        lines.splice(1, 0, '', badgeText);
        readme = lines.join('\n');
      } else {
        readme = `${badgeText}\n\n${readme}`;
      }
    }
    fs.writeFileSync(readmePath, readme, 'utf-8');
  }

  return status;
}

/**
 * Boolean helper to quickly check if a day is finished
 */
function isDayFinished(date) {
  const s = getDayStatus(date);
  return Boolean(s && s.finished);
}

/**
 * Resolves the target date for automation and CLI scripts.
 * Prioritizes the current date (localToday()), unless a custom date is passed.
 * @param {string|null} customDate
 * @returns {string} resolved target date YYYY-MM-DD
 */
function resolveTargetDate(customDate = null) {
  if (customDate) return customDate;
  return localToday();
}

/**
 * Inspects all existing days in practice/days and returns their status summaries
 */
function listDaysWithStatus() {
  if (!fs.existsSync(DAYS_DIR)) return [];
  const dirs = fs
    .readdirSync(DAYS_DIR)
    .filter((d) => DATE_RE.test(d) && fs.existsSync(path.join(DAYS_DIR, d, 'set.json')))
    .sort();

  return dirs.map((d) => getDayStatus(d));
}

module.exports = {
  localToday,
  getDayStatus,
  updateDayStatus,
  isDayFinished,
  resolveTargetDate,
  listDaysWithStatus,
  normalizeId,
};

