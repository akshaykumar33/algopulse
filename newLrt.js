const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function nextInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let res = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      res = res * 10 + (buffer[offset] - 48);
      offset++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];
  const MOD = 1000000007;

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const m = nextInt();
    if (n === null || m === null) break;

    const c = new Int32Array(m);
    for (let i = 0; i < m; i++) {
      c[i] = nextInt();
    }

    const bits = [];
    for (let b = 0; b < 20; b++) {
      if ((m >> b) & 1) {
        bits.push(1 << b);
      }
    }
    const k = bits.length;
    const bitArr = new Int32Array(bits);

  
    const F = Array.from({ length: k + 1 }, () => new Int32Array(n + 1));
    const M = Array.from({ length: k + 1 }, () => new Int32Array(n + 1));

    F[0][0] = 1;
    M[0][0] = 1;
    for (let j = 1; j <= k; j++) {
      F[j][0] = 1;
      M[j][0] = 1;
    }

    for (let i = 1; i <= n; i++) {
      let w = 0;
      let u = 0;

      for (let j = 0; j < k; j++) {
        const prev = i - bitArr[j];
        if (prev >= 0) {
          w += F[j][prev];
          u += M[j][prev];
        }
      }
      w %= MOD;
      u = (u + w) % MOD;
      F[0][i] = w;
      M[0][i] = u;

      let fVal = w;
      let mVal = u;
      for (let j = 0; j < k; j++) {
        const prev = i - bitArr[j];
        if (prev >= 0) {
          fVal += F[j][prev];
          mVal += M[j][prev];
        }
        if (fVal >= MOD) fVal -= MOD;
        if (mVal >= MOD) mVal -= MOD;
        F[j + 1][i] = fVal;
        M[j + 1][i] = mVal;
      }
    }

    const U = M[0];
    let ans = 0;
    const limit = Math.min(n, m);
    for (let x = 1; x <= limit; x++) {
      if ((m & x) === x) {
        ans = (ans + Number((BigInt(c[x - 1]) * BigInt(U[n - x])) % BigInt(MOD))) % MOD;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
