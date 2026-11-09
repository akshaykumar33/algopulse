var maxValue = function(n, index, maxSum) {
  const check = (v) => {
    const val = BigInt(v);
    const lc = BigInt(index);
    const rc = BigInt(n - 1 - index);
    let lSum = 0n;
    if (val - 1n >= lc) {
      lSum = (val - 1n + val - lc) * lc / 2n;
    } else {
      lSum = val * (val - 1n) / 2n + (lc - val + 1n);
    }
    let rSum = 0n;
    if (val - 1n >= rc) {
      rSum = (val - 1n + val - rc) * rc / 2n;
    } else {
      rSum = val * (val - 1n) / 2n + (rc - val + 1n);
    }
    return (val + lSum + rSum) <= BigInt(maxSum);
  };

  let low = 1;
  let high = maxSum;
  let ans = 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (check(mid)) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return ans;
};

var solve = maxValue;

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
