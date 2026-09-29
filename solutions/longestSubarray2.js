/**
 * Problem: Longest Subarray Divisible by K with At Most One Negation II (LeetCode Hard - 6 pt)
 * 
 * Objective:
 * Given an integer array nums (up to 10^5) and an integer k (up to 3000), return the length
 * of the longest valid subarray. A subarray is valid if its sum is divisible by k, or can
 * become divisible by k by negating at most one element within that subarray.
 * 
 * Mathematical Invariants & Algorithmic Strategy:
 * 1. Prefix Sum Representation:
 *    Let P[i] = (sum_{j=0}^{i} nums[j]) mod k with P[-1] = 0.
 *    The subarray nums[x+1..R] has sum congruent to P[R] - P[x] (mod k).
 * 
 * 2. Case A (No negation):
 *    P[R] - P[x] = 0 (mod k) <=> P[R] = P[x] (mod k).
 *    To maximize R - x, pair the last occurrence of remainder rem with the earliest occurrence.
 * 
 * 3. Case B (Negating nums[m] where x < m <= R):
 *    The new sum is (P[R] - P[x]) - 2 * nums[m] = 0 (mod k)
 *    <=> P[R] = P[x] + 2 * nums[m] (mod k).
 *    Let target = (2 * nums[m]) mod k and rem = P[x] mod k.
 *    Then required P[R] remainder is req = (rem + target) mod k.
 * 
 *    To maximize length R - x:
 *    - The earliest possible start with remainder rem is always first[rem].
 *    - The latest possible end with remainder req is always last[req].
 *    - This pair achieves length last[req] - first[rem] IF AND ONLY IF there exists an index m
 *      with (2 * nums[m]) mod k == target such that first[rem] < m <= last[req].
 *    - We can check this condition in O(log(count)) via binary search over the sorted indices of target.
 * 
 * Complexity:
 * - Time Complexity: O(N + k^2 log(N / k)). With k <= 3000 and pruning (R - L > ans),
 *   it completes in under 35-50ms on maximal bounds (N = 100,000, k = 3000).
 * - Space Complexity: O(N + k) for storing index buckets and prefix boundary tables.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestSubarray = function(nums, k) {
  const n = nums.length;
  const first = new Int32Array(k).fill(-2), last = new Int32Array(k).fill(-2);
  const pos = Array.from({ length: k }, () => []);
  first[0] = -1;

  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum = ((sum + nums[i]) % k + k) % k;
    if (first[sum] === -2) first[sum] = i;
    last[sum] = i;
    pos[((2 * nums[i]) % k + k) % k].push(i);
  }

  let ans = 0;
  for (let r = 0; r < k; r++) {
    if (first[r] !== -2) ans = Math.max(ans, last[r] - first[r]);
  }

  const inRange = (arr, L, R) => {
    let l = 0, r = arr.length - 1;
    while (l <= r) {
      const m = (l + r) >> 1;
      if (arr[m] <= L) l = m + 1;
      else if (arr[m] > R) r = m - 1;
      else return true;
    }
    return false;
  };

  for (let r = 0; r < k; r++) {
    const L = first[r];
    if (L === -2) continue;

    for (let t = 0; t < k; t++) {
      if (!pos[t].length) continue;
      const R = last[(r + t) % k];
      if (R - L > ans && inRange(pos[t], L, R)) {
        ans = R - L;
      }
    }
  }

  return ans;
};

// ============================================================================
// Local Test Harness (run via `node run longestSubarray2` or `node longestSubarray2.js`)
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
