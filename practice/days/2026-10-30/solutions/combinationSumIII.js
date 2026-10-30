var combinationSum3 = function(k, n) {
  const res = [];
  const path = [];
  function backtrack(start, remain) {
    if (path.length === k) {
      if (remain === 0) res.push([...path]);
      return;
    }
    for (let i = start; i <= 9; i++) {
      if (i > remain) break;
      path.push(i);
      backtrack(i + 1, remain - i);
      path.pop();
    }
  }
  backtrack(1, n);
  return res;
};

var solve = function(k, n) {
  return combinationSum3(k, n);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      const k = JSON.parse(lines[0]);
      const n = JSON.parse(lines[1]);
      console.log(JSON.stringify(solve(k, n)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
