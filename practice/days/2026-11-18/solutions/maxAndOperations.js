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

  const tVal = nextInt();
  if (tVal === null) return;
  const t = tVal;
  const out = [];
  const MOD = 1000000007n;

  function modPow(base, exp) {
    let res = 1n;
    base = base % MOD;
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % MOD;
      base = (base * base) % MOD;
      exp /= 2n;
    }
    return res;
  }

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const m = nextInt();

    if (n === 1) {
      out.push(0);
      continue;
    }

    const nBig = BigInt(n);
    const mBig = BigInt(m);
    const avg = (mBig * (mBig + 1n) / 2n) % MOD;
    const part1 = (nBig * modPow(mBig, nBig - 1n) % MOD * avg) % MOD;

    let part2 = 0n;
    for (let k = 1; k <= m; k++) {
      part2 = (part2 + modPow(BigInt(k), nBig)) % MOD;
    }

    const ans = (part1 - part2 + MOD) % MOD;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
