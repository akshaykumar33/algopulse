var combine = function(n, k) {
  const res = [];
  const path = [];
  function backtrack(start) {
    if (path.length === k) {
      res.push([...path]);
      return;
    }
    const needed = k - path.length;
    for (let i = start; i <= n - needed + 1; i++) {
      path.push(i);
      backtrack(i + 1);
      path.pop();
    }
  }
  backtrack(1);
  return res;
};

var solve = function(n, k) {
  return combine(n, k);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      const n = JSON.parse(lines[0]);
      const k = JSON.parse(lines[1]);
      console.log(JSON.stringify(solve(n, k)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
