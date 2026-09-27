/**
 * LeetCode Problem Solution
 *
 * Paste the function/class below directly into LeetCode.
 * When run locally (`node <filename>.js` or `node run <filename>`),
 * it executes the local harness at the bottom.
 */

/**
 * @param {any} args
 * @return {any}
 */
var solve = function(...args) {
  // Your LeetCode solution logic here
  return null;
};

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  // Read from stdin if piped, else run example assertions
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(solve(line));
        }
      }
    } else {
      console.log('No stdin provided. Add test inputs to input.txt.');
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;
