const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  if (n === null) return;
  const l = nextInt();
  const r = nextInt();

  function countRem(x, rem) {
    if (x <= 0) return 0;
    if (rem === 0) return Math.floor(x / 3);
    if (rem === 1) return Math.floor((x + 2) / 3);
    return Math.floor((x + 1) / 3);
  }

  const MOD = 1000000007n;
  const c0 = BigInt(countRem(r, 0) - countRem(l - 1, 0));
  const c1 = BigInt(countRem(r, 1) - countRem(l - 1, 1));
  const c2 = BigInt(countRem(r, 2) - countRem(l - 1, 2));

  let dp0 = 1n, dp1 = 0n, dp2 = 0n;

  for (let i = 0; i < n; i++) {
    const next0 = (dp0 * c0 + dp1 * c2 + dp2 * c1) % MOD;
    const next1 = (dp0 * c1 + dp1 * c0 + dp2 * c2) % MOD;
    const next2 = (dp0 * c2 + dp1 * c1 + dp2 * c0) % MOD;
    dp0 = next0;
    dp1 = next1;
    dp2 = next2;
  }

  console.log(dp0.toString());
}

solve();
