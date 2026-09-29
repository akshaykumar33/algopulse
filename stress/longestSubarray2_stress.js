/**
 * Exhaustive Stress Test Suite for Longest Subarray Divisible by K with At Most One Negation II
 */

function solveBruteForce(nums, k) {
  const n = nums.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
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
}

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

// 1. Stress verification against brute force
console.log("Running 1,000 comparative rounds against brute force...");
for (let tc = 0; tc < 1000; tc++) {
  const n = Math.floor(Math.random() * 25) + 1;
  const k = Math.floor(Math.random() * 25) + 1;
  const nums = Array.from({ length: n }, () => Math.floor(Math.random() * 200) - 100);

  const exp = solveBruteForce(nums, k);
  const act = longestSubarray(nums, k);

  if (exp !== act) {
    console.error(`MISMATCH on case:`, { nums, k, exp, act });
    process.exit(1);
  }
}
console.log("Passed 1000/1000 comparative rounds with 0 mismatches!");

// 2. Edge cases
console.log("Testing edge cases...");
console.assert(longestSubarray([4, 1, 2], 3) === 3, "Failed Example 1");
console.assert(longestSubarray([5, 3, 4], 7) === 2, "Failed Example 2");
console.assert(longestSubarray([2, 2, 5], 6) === 2, "Failed Example 3");
console.assert(longestSubarray([1], 3) === 0, "Failed [1], k=3");
console.assert(longestSubarray([0], 7) === 1, "Failed [0], k=7");
console.assert(longestSubarray([3], 3) === 1, "Failed [3], k=3");
console.log("Edge cases passed!");

// 3. Worst-case timing
console.log("Running worst-case timing test (N = 100,000, K = 3,000)...");
const t0 = Date.now();
const worstAns = longestSubarray(new Array(100000).fill(1), 3000);
const elapsed = Date.now() - t0;
console.log(`Worst-case completed in ${elapsed}ms with answer: ${worstAns}`);

console.log("All tests passed successfully!");
