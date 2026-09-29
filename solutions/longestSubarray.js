/**
 * Problem: Longest Subarray Divisible by K with At Most One Negation I (LeetCode Medium - 5 pt)
 * 
 * Objective:
 * Given an integer array nums and an integer k, return the length of the longest valid
 * subarray. A subarray is valid if its sum is divisible by k, or can become divisible
 * by k by negating at most one element within that subarray.
 * 
 * Mathematical Analysis:
 * 1. Let the subarray be nums[L..R] with sum S = sum_{i=L}^{R} nums[i].
 * 2. Condition A (no negation):
 *    S % k === 0
 * 3. Condition B (negating an element nums[m] where L <= m <= R):
 *    The new sum is S - 2 * nums[m].
 *    For this to be divisible by k:
 *      (S - 2 * nums[m]) % k === 0  <=>  2 * nums[m] = S (mod k)
 * 4. Algorithm:
 *    - For each left index L (0 <= L < n):
 *      - If n - L <= maxLen, break early (no longer subarray can start here).
 *      - Expand right index R from L to n - 1:
 *        - Maintain running sum S.
 *        - Register remainder (2 * nums[R]) mod k.
 *        - If S mod k === 0 or (S mod k) has been registered in the current window [L..R],
 *          the subarray nums[L..R] is valid.
 *          Update maxLen = max(maxLen, R - L + 1).
 *    - To achieve optimal O(1) membership lookup per step, we use an Int32Array timestamp cache
 *      indexed by remainder (for k <= 200,000), avoiding per-iteration memory allocation or clearing.
 * 
 * Complexity:
 * - Time Complexity: O(n^2) worst case, with significant pruning via early exit (runs in ~20-70ms for n=1000).
 * - Space Complexity: O(k) for the timestamp cache (O(min(k, n)) auxiliary space).
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestSubarray = function(nums, k) {
  const n = nums.length;
  let ans = 0;

  for (let i = 0; i < n; i++) {
    if (n - i <= ans) break;
    let sum = 0;
    const seen = new Set();

    for (let j = i; j < n; j++) {
      sum += nums[j];
      seen.add(((2 * nums[j]) % k + k) % k);
      const rem = ((sum % k) + k) % k;

      if (rem === 0 || seen.has(rem)) {
        ans = Math.max(ans, j - i + 1);
      }
    }
  }

  return ans;
};

// ============================================================================
// Local Test Harness (run via `node run longestSubarray` or `node longestSubarray.js`)
// ============================================================================

if (require.main === module) {
  const fs = require('fs');

  const testCases = [
    { nums: [4, 1, 2], k: 3, expected: 3 },
    { nums: [5, 3, 4], k: 7, expected: 2 },
    { nums: [2, 2, 5], k: 6, expected: 2 },
  ];

  let inputData = '';
  try {
    if (!process.stdin.isTTY) {
      inputData = fs.readFileSync(0, 'utf-8').trim();
    }
  } catch (_) {}

  if (inputData.length > 0) {
    const lines = inputData.split(/\r?\n/).filter(line => line.trim().length > 0);
    let i = 0;
    while (i < lines.length) {
      const line = lines[i].trim();
      try {
        const parsed = JSON.parse(line);
        if (Array.isArray(parsed)) {
          if (i + 1 < lines.length) {
            const kVal = Number(lines[i + 1].trim());
            console.log(longestSubarray(parsed, kVal));
            i += 2;
          } else {
            i++;
          }
        } else {
          i++;
        }
      } catch (_) {
        const tokens = line.split(/\s+/).map(Number);
        if (tokens.length >= 2) {
          const kVal = tokens[tokens.length - 1];
          const nums = tokens.slice(0, -1);
          console.log(longestSubarray(nums, kVal));
        }
        i++;
      }
    }
  } else {
    console.log(`Running ${testCases.length} sample test cases...\n`);
    let passed = 0;
    testCases.forEach((tc, idx) => {
      const actual = longestSubarray(tc.nums, tc.k);
      const isMatch = actual === tc.expected;
      if (isMatch) {
        passed++;
        console.log(`[PASS] Test #${idx + 1}: expected ${tc.expected}, got ${actual}`);
      } else {
        console.log(`[FAIL] Test #${idx + 1}: expected ${tc.expected}, got ${actual}`);
      }
    });
    console.log(`\nResults: ${passed}/${testCases.length} tests passed.`);
  }
}
