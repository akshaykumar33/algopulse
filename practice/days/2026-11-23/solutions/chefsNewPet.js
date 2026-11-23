const fs = require('fs');

const MOD = 1000000007n;

function matMul(a, b) {
  const n = a.length;
  const res = [];
  for (let i = 0; i < n; i++) {
    res[i] = new Array(n).fill(0n);
    for (let j = 0; j < n; j++) {
      let sum = 0n;
      for (let k = 0; k < n; k++) {
        sum = (sum + a[i][k] * b[k][j]) % MOD;
      }
      res[i][j] = sum;
    }
  }
  return res;
}

function matPow(m, p) {
  const n = m.length;
  let res = [];
  for (let i = 0; i < n; i++) {
    res[i] = new Array(n).fill(0n);
    res[i][i] = 1n;
  }
  let base = m;
  let exp = p;
  while (exp > 0n) {
    if (exp & 1n) res = matMul(res, base);
    base = matMul(base, base);
    exp >>= 1n;
  }
  return res;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    const k = parseInt(input[ptr++], 10);
    const jumps = [];
    for (let i = 0; i < k; i++) jumps.push(parseInt(input[ptr++], 10));
    const dp = new Array(16).fill(0n);
    dp[0] = 1n;
    for (let i = 1; i <= 15; i++) {
      let s = 0n;
      for (const j of jumps) {
        if (i - j >= 0) s = (s + dp[i - j]) % MOD;
      }
      dp[i] = s;
    }
    if (n <= 15n) {
      out.push(dp[Number(n)].toString());
      continue;
    }
    const T = [];
    for (let i = 0; i < 15; i++) {
      T[i] = new Array(15).fill(0n);
    }
    for (const j of jumps) {
      if (j >= 1 && j <= 15) {
        T[0][j - 1] = 1n;
      }
    }
    for (let i = 1; i < 15; i++) {
      T[i][i - 1] = 1n;
    }
    const resT = matPow(T, n - 15n);
    let ans = 0n;
    for (let i = 0; i < 15; i++) {
      ans = (ans + resT[0][i] * dp[15 - i]) % MOD;
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
