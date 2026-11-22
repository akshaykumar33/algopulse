const fs = require('fs');
const MOD = 1000000007n;
function matMul(A, B) {
  return [
    [(A[0][0]*B[0][0] + A[0][1]*B[1][0]) % MOD, (A[0][0]*B[0][1] + A[0][1]*B[1][1]) % MOD],
    [(A[1][0]*B[0][0] + A[1][1]*B[1][0]) % MOD, (A[1][0]*B[0][1] + A[1][1]*B[1][1]) % MOD]
  ];
}
function matPow(A, p) {
  let res = [[1n, 0n], [0n, 1n]];
  while (p > 0n) {
    if (p % 2n === 1n) res = matMul(res, A);
    A = matMul(A, A);
    p /= 2n;
  }
  return res;
}
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  const M = [[2n, 2n], [1n, 0n]];
  for (let tc = 0; tc < T; tc++) {
    const n = BigInt(input[ptr++]);
    if (n === 1n) {
      out.push(1);
    } else if (n === 2n) {
      out.push(3);
    } else {
      const p = matPow(M, n - 2n);
      const fn = (p[0][0] * 6n + p[0][1] * 2n) % MOD;
      const fn1 = (p[1][0] * 6n + p[1][1] * 2n) % MOD;
      const ans = (fn1 + fn) % MOD;
      const realAns = (p[0][0] * 3n + p[0][1] * 1n) % MOD;
      out.push(realAns.toString());
    }
  }
  console.log(out.join('\n'));
}
solve();