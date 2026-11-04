var splitIntoFibonacci = function(num) {
  const MAX = 2147483647;
  const ans = [];
  const n = num.length;

  function backtrack(idx) {
    if (idx === n && ans.length >= 3) return true;
    for (let len = 1; len <= 10 && idx + len <= n; len++) {
      if (num[idx] === '0' && len > 1) break;
      const sub = num.slice(idx, idx + len);
      const val = Number(sub);
      if (val > MAX) break;

      const size = ans.length;
      if (size >= 2) {
        const sum = ans[size - 1] + ans[size - 2];
        if (val < sum) continue;
        if (val > sum) break;
      }

      ans.push(val);
      if (backtrack(idx + len)) return true;
      ans.pop();
    }
    return false;
  }

  backtrack(0);
  return ans;
};

var splitArrayIntoFibonacciSequence = splitIntoFibonacci;
var solve = typeof splitArrayIntoFibonacciSequence !== 'undefined' ? splitArrayIntoFibonacciSequence : null;

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

