var checkArithmeticSubarrays = function(nums, l, r) {
  const m = l.length;
  const ans = new Array(m);
  for (let i = 0; i < m; i++) {
    const sub = nums.slice(l[i], r[i] + 1);
    sub.sort((a, b) => a - b);
    let ok = true;
    const diff = sub[1] - sub[0];
    for (let j = 2; j < sub.length; j++) {
      if (sub[j] - sub[j - 1] !== diff) {
        ok = false;
        break;
      }
    }
    ans[i] = ok;
  }
  return ans;
};

var solve = checkArithmeticSubarrays;
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
  } catch (err) {}
}
module.exports = solve;
