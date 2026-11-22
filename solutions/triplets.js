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
  const T = nextInt();
  if (T === null) return;
  const MOD = 1000000007n;
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const p = nextInt(), q = nextInt(), r = nextInt();
    const a = new Int32Array(p);
    for (let i = 0; i < p; i++) a[i] = nextInt();
    const b = new Int32Array(q);
    for (let i = 0; i < q; i++) b[i] = nextInt();
    const c = new Int32Array(r);
    for (let i = 0; i < r; i++) c[i] = nextInt();
    a.sort();
    c.sort();
    const prefA = new BigInt64Array(p + 1);
    for (let i = 0; i < p; i++) prefA[i + 1] = (prefA[i] + BigInt(a[i])) % MOD;
    const prefC = new BigInt64Array(r + 1);
    for (let i = 0; i < r; i++) prefC[i + 1] = (prefC[i] + BigInt(c[i])) % MOD;
    let totalAns = 0n;
    for (let i = 0; i < q; i++) {
      const y = b[i];
      const yBig = BigInt(y);
      let l = 0, rIdx = p - 1, cntA = 0;
      while (l <= rIdx) {
        const mid = (l + rIdx) >> 1;
        if (a[mid] <= y) {
          cntA = mid + 1;
          l = mid + 1;
        } else {
          rIdx = mid - 1;
        }
      }
      l = 0; rIdx = r - 1; let cntC = 0;
      while (l <= rIdx) {
        const mid = (l + rIdx) >> 1;
        if (c[mid] <= y) {
          cntC = mid + 1;
          l = mid + 1;
        } else {
          rIdx = mid - 1;
        }
      }
      if (cntA > 0 && cntC > 0) {
        const sumA = (prefA[cntA] + BigInt(cntA) * yBig) % MOD;
        const sumC = (prefC[cntC] + BigInt(cntC) * yBig) % MOD;
        totalAns = (totalAns + sumA * sumC) % MOD;
      }
    }
    out.push(totalAns.toString());
  }
  console.log(out.join('\n'));
}
solve();