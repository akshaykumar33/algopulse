var totalHammingDistance = function(nums) {
  let total = 0;
  const n = nums.length;
  for (let b = 0; b < 30; b++) {
    let ones = 0;
    const mask = 1 << b;
    for (let i = 0; i < n; i++) {
      if ((nums[i] & mask) !== 0) ones++;
    }
    total += ones * (n - ones);
  }
  return total;
};

var solve = typeof totalHammingDistance !== 'undefined' ? totalHammingDistance : null;

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
