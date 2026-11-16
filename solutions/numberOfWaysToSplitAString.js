var numWays = function(s) {
  const MOD = 1000000007n;
  const n = BigInt(s.length);
  const ones = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '1') ones.push(i);
  }

  const m = ones.length;
  if (m === 0) {
    return Number(((n - 1n) * (n - 2n) / 2n) % MOD);
  }
  if (m % 3 !== 0) return 0;

  const k = m / 3;
  const gap1 = BigInt(ones[k] - ones[k - 1]);
  const gap2 = BigInt(ones[2 * k] - ones[2 * k - 1]);
  return Number((gap1 * gap2) % MOD);
};

var solve = numWays;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}
