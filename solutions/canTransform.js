/**
 * Problem: Transform Array Using Pair Operations (LeetCode Medium - 4 pt)
 * 
 * Objective:
 * Given two integer arrays `source` and `target`, determine if `source` can be transformed
 * into `target` using the operation:
 *   choose distinct i, j and integer delta:
 *   source[i] = source[i] + source[j] - delta
 *   source[j] = delta
 * 
 * Mathematical Analysis & Invariant:
 * 1. Sum Invariance:
 *    The sum of elements at indices i and j after an operation is:
 *      (source[i] + source[j] - delta) + delta = source[i] + source[j]
 *    Hence, the total sum of all elements in `source` is strictly conserved across any number of operations.
 * 2. Reachability / Sufficiency:
 *    Because `delta` can be ANY integer and n >= 2:
 *    - For each index j from 0 to n - 2, we can pair j with index j + 1 and choose delta = target[j].
 *    - This sets source[j] = target[j] and shifts the difference into source[j + 1].
 *    - Repeating this sequentially sets source[k] = target[k] for all 0 <= k <= n - 2.
 *    - By sum conservation, the remaining element source[n - 1] must equal:
 *        sum(source) - sum_{k=0}^{n-2} target[k]
 *      which equals target[n - 1] if and only if sum(source) === sum(target).
 * 3. Conclusion:
 *    `canTransform` is true if and only if sum(source) === sum(target).
 * 
 * Numeric Safety Audit:
 * - n <= 10^5, -10^9 <= source[i], target[i] <= 10^9.
 * - Maximum possible sum is 10^5 * 10^9 = 10^14, which fits safely within
 *   Number.MAX_SAFE_INTEGER (9 * 10^15) without any precision loss.
 * 
 * Complexity:
 * - Time Complexity: O(n)
 * - Space Complexity: O(1)
 */

/**
 * @param {number[]} source
 * @param {number[]} target
 * @return {boolean}
 */
var canTransform = function(source, target) {
  let sumSource = 0;
  for (let i = 0; i < source.length; i++) {
    sumSource += source[i];
  }

  let sumTarget = 0;
  for (let i = 0; i < target.length; i++) {
    sumTarget += target[i];
  }

  return sumSource === sumTarget;
};

// ============================================================================
// Local Test Harness (run via `node run canTransform` or `node canTransform.js`)
// ============================================================================

if (require.main === module) {
  const fs = require('fs');

  const testCases = [
    { source: [1, 2, 3], target: [0, 2, 4], expected: true },
    { source: [-5, -5], target: [-15, 5], expected: true },
    { source: [1, 2, 1], target: [0, 2, 5], expected: false },
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
        if (Array.isArray(parsed) && parsed.length === 2 && Array.isArray(parsed[0]) && Array.isArray(parsed[1])) {
          console.log(canTransform(parsed[0], parsed[1]));
          i++;
        } else if (Array.isArray(parsed)) {
          if (i + 1 < lines.length) {
            const nextParsed = JSON.parse(lines[i + 1].trim());
            console.log(canTransform(parsed, nextParsed));
            i += 2;
          } else {
            i++;
          }
        } else {
          i++;
        }
      } catch (_) {
        i++;
      }
    }
  } else {
    console.log(`Running ${testCases.length} sample test cases...\n`);
    let passed = 0;
    testCases.forEach((tc, idx) => {
      const actual = canTransform(tc.source, tc.target);
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
