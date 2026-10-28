var combinationSum = function(candidates, target) {
  candidates.sort((a, b) => a - b);
  const res = [];
  const path = [];

  function backtrack(start, remain) {
    if (remain === 0) {
      res.push([...path]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remain) break;
      path.push(candidates[i]);
      backtrack(i, remain - candidates[i]);
      path.pop();
    }
  }

  backtrack(0, target);
  return res;
};

var solve = function(candidates, target) {
  return combinationSum(candidates, target);
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

