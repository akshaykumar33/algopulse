var constructArray = function(n, k) {
  const ans = new Int32Array(n);
  let l = 1;
  let r = k + 1;
  for (let i = 0; i <= k; i++) {
    if (i % 2 === 0) {
      ans[i] = l++;
    } else {
      ans[i] = r--;
    }
  }
  for (let i = k + 1; i < n; i++) {
    ans[i] = i + 1;
  }
  return Array.from(ans);
};

var solve = function(n, k) {
  return constructArray(n, k);
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
