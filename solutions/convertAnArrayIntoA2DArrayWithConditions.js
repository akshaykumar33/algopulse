var findMatrix = function(nums) {
  const count = new Map();
  const res = [];

  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    const c = count.get(x) || 0;
    if (c >= res.length) {
      res.push([]);
    }
    res[c].push(x);
    count.set(x, c + 1);
  }

  return res;
};

var solve = function(nums) {
  return findMatrix(nums);
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

