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
const { findSolutionFile } = require('./submit');

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
