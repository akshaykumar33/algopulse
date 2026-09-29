/**
 * Exhaustive Stress Test for longestSubarray
 */

// Independent Brute Force Oracle
function bruteForceLongestSubarray(nums, k) {
  const n = nums.length;
  let maxLen = 0;

  for (let L = 0; L < n; L++) {
    for (let R = L; R < n; R++) {
      let sum = 0;
      for (let i = L; i <= R; i++) {
        sum += nums[i];
      }

      const sumRem = ((sum % k) + k) % k;
      let valid = (sumRem === 0);

      if (!valid) {
        for (let i = L; i <= R; i++) {
          const newSum = sum - 2 * nums[i];
          if (((newSum % k) + k) % k === 0) {
            valid = true;
            break;
          }
        }
      }

      if (valid) {
        const len = R - L + 1;
        if (len > maxLen) {
          maxLen = len;
        }
      }
    }
  }

  return maxLen;
}

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

// 1. Compare against brute-force on small random arrays
console.log("Running comparative stress test against brute force...");
let tested = 0;
for (let iter = 0; iter < 1000; iter++) {
  const n = Math.floor(Math.random() * 20) + 1;
  const k = Math.floor(Math.random() * 30) + 1;
  const nums = [];
  for (let i = 0; i < n; i++) {
    nums.push(Math.floor(Math.random() * 100) - 50);
  }

  const expected = bruteForceLongestSubarray(nums, k);
  const actual = longestSubarray(nums, k);
  tested++;

  if (expected !== actual) {
    console.error(`Mismatch at iter ${iter}! nums=[${nums}], k=${k}: expected ${expected}, got ${actual}`);
    process.exit(1);
  }
}
console.log(`Passed ${tested}/${tested} small comparative tests with 0 mismatches!`);

// 2. Corner cases
console.log("Testing edge cases...");
console.assert(longestSubarray([1], 3) === 0, "Failed: [1], k=3 should be 0");
console.assert(longestSubarray([3], 3) === 1, "Failed: [3], k=3 should be 1");
console.assert(longestSubarray([-3], 3) === 1, "Failed: [-3], k=3 should be 1");
console.assert(longestSubarray([0], 5) === 1, "Failed: [0], k=5 should be 1");
console.assert(longestSubarray([4, 1, 2], 3) === 3, "Failed Example 1");
console.assert(longestSubarray([5, 3, 4], 7) === 2, "Failed Example 2");
console.assert(longestSubarray([2, 2, 5], 6) === 2, "Failed Example 3");
console.log("Edge cases passed!");

// 3. Worst-case timing
console.log("Running worst-case timing test (n=1000, k=100,000)...");
const maxN = 1000;
const maxK = 100000;
const worstNums = new Array(maxN).fill(1); // Adversarial case: no early break
const t0 = Date.now();
const res = longestSubarray(worstNums, maxK);
const tElapsed = Date.now() - t0;
console.log(`Worst-case completed in ${tElapsed}ms with result: ${res}`);

console.log("All stress tests passed!");
