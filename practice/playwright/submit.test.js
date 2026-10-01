/**
 * Unit & Integration Tests for Playwright CP Automation Engine
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');

const { PLATFORMS, AUTH_DIR, PRACTICE_DAYS_DIR } = require('./config');
const { parseCodeforcesId } = require('./platforms/codeforces');
const { prepareLeetCodeCode } = require('./platforms/leetcode');
const {
  findSolutionFile,
  normalizeId,
  isRecordForProblem,
  isVerdictAccepted,
  isProblemAccepted,
  getProblemStatus,
  mergeSubmissions,
} = require('./submit');

describe('Playwright Configuration & Paths', () => {
  it('defines valid configurations for Codeforces, LeetCode, and CodeChef', () => {
    assert.ok(PLATFORMS.codeforces);
    assert.ok(PLATFORMS.leetcode);
    assert.ok(PLATFORMS.codechef);

    assert.equal(PLATFORMS.codeforces.name, 'Codeforces');
    assert.equal(PLATFORMS.leetcode.name, 'LeetCode');
    assert.equal(PLATFORMS.codechef.name, 'CodeChef');

    assert.ok(PLATFORMS.codeforces.loginUrl.includes('codeforces.com'));
    assert.ok(PLATFORMS.leetcode.loginUrl.includes('leetcode.com'));
    assert.ok(PLATFORMS.codechef.loginUrl.includes('codechef.com'));
  });

  it('ensures auth directory exists', () => {
    assert.ok(fs.existsSync(AUTH_DIR));
  });
});

describe('Codeforces Platform Engine', () => {
  it('parses contest ID and problem index from short ID', () => {
    const parsed = parseCodeforcesId({ id: '1807A' });
    assert.deepEqual(parsed, { contestId: '1807', index: 'A' });
  });

  it('parses contest ID and problem index from URL', () => {
    const parsed = parseCodeforcesId({
      id: 'custom',
      url: 'https://codeforces.com/problemset/problem/486/A',
    });
    assert.deepEqual(parsed, { contestId: '486', index: 'A' });
  });

  it('returns null for unparseable input', () => {
    const parsed = parseCodeforcesId({ id: 'invalid_format', url: '' });
    assert.equal(parsed, null);
  });
});

describe('LeetCode Platform Engine: Code Sanitization', () => {
  it('strips local test harness, require.main block, and module.exports', () => {
    const sampleLeetCodeCode = `/**
 * Solution: Single Number
 */
var singleNumber = function(nums) {
  return nums.reduce((acc, x) => acc ^ x, 0);
};

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  console.log('Running test');
}

module.exports = singleNumber;
`;

    const cleaned = prepareLeetCodeCode(sampleLeetCodeCode);

    assert.ok(cleaned.includes('var singleNumber = function(nums)'));
    assert.ok(!cleaned.includes('LOCAL TEST HARNESS'));
    assert.ok(!cleaned.includes('require.main === module'));
    assert.ok(!cleaned.includes('module.exports'));
  });

  it('leaves clean solution untouched if no local harness is present', () => {
    const pureCode = `var twoSum = function(nums, target) {
  const m = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (m.has(target - nums[i])) return [m.get(target - nums[i]), i];
    m.set(nums[i], i);
  }
};`;

    const cleaned = prepareLeetCodeCode(pureCode);
    assert.equal(cleaned.trim(), pureCode.trim());
  });
});

describe('Submitter Solution Resolver', () => {
  it('locates solution file in practice days or solutions directory', () => {
    const latestDay = '2026-09-30';
    const dayDir = path.join(PRACTICE_DAYS_DIR, latestDay);
    const problem = { file: 'calculatingFunction' };

    const resolved = findSolutionFile(problem, dayDir);
    assert.ok(resolved);
    assert.ok(fs.existsSync(resolved));
    assert.ok(resolved.endsWith('calculatingFunction.js'));
  });
});

describe('Option B: Chrome Profile & Persistent Context Engine', () => {
  const { SYSTEM_CHROME_USER_DATA_DIR, PERSISTENT_CHROME_PROFILE_DIR } = require('./config');
  const { isChromeRunning, launchPersistentBrowserContext } = require('./browser');

  it('resolves valid system Chrome User Data path and persistent profile path', () => {
    assert.ok(SYSTEM_CHROME_USER_DATA_DIR.includes('Google'));
    assert.ok(SYSTEM_CHROME_USER_DATA_DIR.includes('Chrome'));
    assert.ok(PERSISTENT_CHROME_PROFILE_DIR.includes('chrome-profile'));
  });

  it('checks isChromeRunning without throwing exceptions', () => {
    const running = isChromeRunning();
    assert.equal(typeof running, 'boolean');
  });

  it('exports launchPersistentBrowserContext function', () => {
    assert.equal(typeof launchPersistentBrowserContext, 'function');
  });
});

describe('Smart Resubmission & Submission Tracking Engine', () => {
  it('normalizes problem IDs accurately', () => {
    assert.equal(normalizeId('CC-BULBLIFE'), 'bulblife');
    assert.equal(normalizeId('LC-345'), '345');
    assert.equal(normalizeId('1328/A'), '1328a');
    assert.equal(normalizeId('1328A'), '1328a');
    assert.equal(normalizeId(''), '');
  });

  it('detects accepted verdicts accurately', () => {
    assert.equal(isVerdictAccepted({ verdict: 'Accepted', success: true }), true);
    assert.equal(isVerdictAccepted({ verdict: 'Correct Answer', success: false }), true);
    assert.equal(isVerdictAccepted({ verdict: 'Passed', success: false }), true);
    assert.equal(isVerdictAccepted({ verdict: 'Wrong Answer', success: false }), false);
    assert.equal(isVerdictAccepted({ verdict: 'Runtime Error', success: false }), false);
    assert.equal(isVerdictAccepted(null), false);
  });

  it('matches problem and historical submission without false substring positives', () => {
    const probB = { platform: 'Codeforces', id: 'B', file: 'problemB' };
    const sub2000B = { platform: 'Codeforces', id: '2000B', file: 'problem2000B' };
    const subB = { platform: 'Codeforces', id: 'B', file: 'problemB' };

    assert.equal(isRecordForProblem(probB, sub2000B), false);
    assert.equal(isRecordForProblem(probB, subB), true);
  });

  it('identifies accepted problems from primary record and history', () => {
    const prob1 = { platform: 'LeetCode', id: 'LC-345', file: 'reverseVowelsOfAString' };
    const prob2 = { platform: 'CodeChef', id: 'CC-GENE01', file: 'genes' };

    const historyWithAccepted = [
      {
        platform: 'LeetCode',
        id: 'LC-345',
        file: 'reverseVowelsOfAString',
        verdict: 'Accepted',
        success: true,
        submissionUrl: 'https://leetcode.com/1',
      },
      {
        platform: 'CodeChef',
        id: 'CC-GENE01',
        file: 'genes',
        verdict: 'Wrong Answer',
        success: false,
      },
    ];

    assert.ok(isProblemAccepted(prob1, historyWithAccepted));
    assert.equal(isProblemAccepted(prob2, historyWithAccepted), null);

    // Prior attempt in history
    const historyWithPastSuccess = [
      {
        platform: 'CodeChef',
        id: 'CC-GENE01',
        file: 'genes',
        verdict: 'Wrong Answer',
        success: false,
        history: [
          {
            verdict: 'Correct Answer',
            success: true,
            submissionUrl: 'https://codechef.com/1',
          },
        ],
      },
    ];
    assert.ok(isProblemAccepted(prob2, historyWithPastSuccess));
  });

  it('classifies problem status as ACCEPTED, FAILED, PENDING, or MISSING_CODE', () => {
    const prob = { platform: 'Codeforces', id: '1328A', file: 'divisibilityProblem' };

    // Pending (no submissions)
    const pendingStatus = getProblemStatus(prob, []);
    assert.equal(pendingStatus.status, 'PENDING');
    assert.equal(pendingStatus.attempts, 0);

    // Failed
    const failedStatus = getProblemStatus(prob, [
      { platform: 'Codeforces', id: '1328A', file: 'divisibilityProblem', verdict: 'Wrong Answer', success: false },
    ]);
    assert.equal(failedStatus.status, 'FAILED');
    assert.equal(failedStatus.attempts, 1);

    // Accepted
    const acceptedStatus = getProblemStatus(prob, [
      { platform: 'Codeforces', id: '1328A', file: 'divisibilityProblem', verdict: 'Accepted', success: true },
    ]);
    assert.equal(acceptedStatus.status, 'ACCEPTED');
    assert.equal(acceptedStatus.attempts, 1);
  });

  it('merges and deduplicates submissions while preserving attempt history', () => {
    const existing = [
      {
        platform: 'LeetCode',
        id: 'LC-345',
        file: 'reverseVowelsOfAString',
        verdict: 'Runtime Error',
        success: false,
        timestamp: '2026-10-01T06:00:00.000Z',
      },
    ];

    const updates = [
      {
        platform: 'LeetCode',
        id: 'LC-345',
        file: 'reverseVowelsOfAString',
        verdict: 'Accepted',
        success: true,
        submissionUrl: 'https://leetcode.com/accepted',
        timestamp: '2026-10-01T06:05:00.000Z',
      },
    ];

    const merged = mergeSubmissions(existing, updates);
    assert.equal(merged.length, 1);
    assert.equal(merged[0].verdict, 'Accepted');
    assert.equal(merged[0].success, true);
    assert.equal(merged[0].attempts, 2);
    assert.equal(merged[0].history.length, 1);
    assert.equal(merged[0].history[0].verdict, 'Runtime Error');
  });

  it('keeps accepted status primary even if an accidental rerun fails', () => {
    const existing = [
      {
        platform: 'CodeChef',
        id: 'CC-EQUALISE',
        file: 'makeAAndBEqual',
        verdict: 'Correct Answer',
        success: true,
        submissionUrl: 'https://codechef.com/acc',
      },
    ];

    const accidentalFailedRerun = [
      {
        platform: 'CodeChef',
        id: 'CC-EQUALISE',
        file: 'makeAAndBEqual',
        verdict: 'Wrong Answer',
        success: false,
      },
    ];

    const merged = mergeSubmissions(existing, accidentalFailedRerun);
    assert.equal(merged.length, 1);
    assert.equal(merged[0].verdict, 'Correct Answer');
    assert.equal(merged[0].success, true);
    assert.equal(merged[0].attempts, 2);
    assert.equal(merged[0].history.length, 1);
    assert.equal(merged[0].history[0].verdict, 'Wrong Answer');
  });
});

