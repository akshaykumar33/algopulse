var threeSumMulti = function(arr, target) {
    const MOD = 1000000007;
    const count = new Array(101).fill(0);
    for (const x of arr) {
        count[x]++;
    }
    let ans = 0;
    for (let i = 0; i <= 100; i++) {
        for (let j = i; j <= 100; j++) {
            const k = target - i - j;
            if (k < j || k > 100) continue;
            if (i === j && j === k) {
                ans = (ans + count[i] * (count[i] - 1) * (count[i] - 2) / 6) % MOD;
            } else if (i === j && j < k) {
                ans = (ans + (count[i] * (count[i] - 1) / 2) * count[k]) % MOD;
            } else if (i < j && j === k) {
                ans = (ans + count[i] * (count[j] * (count[j] - 1) / 2)) % MOD;
            } else if (i < j && j < k) {
                ans = (ans + count[i] * count[j] * count[k]) % MOD;
            }
        }
    }
    return ans;
};
var solve = typeof threeSumMulti !== 'undefined' ? threeSumMulti : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const arr = JSON.parse(lines[i]);
        const target = JSON.parse(lines[i + 1]);
        const result = solve(arr, target);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
