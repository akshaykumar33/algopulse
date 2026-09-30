/**
 * LeetCode Problem Solution: Check if the Sentence Is Pangram
 */
var checkIfPangram = function(sentence) {
  return new Set(sentence.toLowerCase().replace(/[^a-z]/g, '')).size === 26;
};

var solve = function(sentence) {
  return checkIfPangram(sentence);
};

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(solve(line));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;
