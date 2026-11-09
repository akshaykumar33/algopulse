const fs = require('fs');

function comb(n, k) {
  if (k < 0 || k > n) return 0n;
  if (k === 0 || k === n) return 1n;
  if (k > n - k) k = n - k;
  let res = 1n;
  for (let i = 1; i <= k; i++) {
    res = (res * BigInt(n - i + 1)) / BigInt(i);
  }
  return res;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  const n = parseInt(tokens[0], 10);
  const m = parseInt(tokens[1], 10);
  const t = parseInt(tokens[2], 10);

  let ans = 0n;
  for (let i = 4; i <= t - 1; i++) {
    const g = t - i;
    if (i <= n && g <= m && g >= 1) {
      ans += comb(n, i) * comb(m, g);
    }
  }

  console.log(ans.toString());
}

solve();
