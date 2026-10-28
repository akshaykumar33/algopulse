var maximumElementAfterDecrementingAndRearranging = function(arr) {
  arr.sort((a, b) => a - b);
  arr[0] = 1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1] + 1) {
      arr[i] = arr[i - 1] + 1;
    }
  }
  return arr[arr.length - 1];
};

var solve = function(arr) {
  return maximumElementAfterDecrementingAndRearranging(arr);
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
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;

