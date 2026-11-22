const fs = require('fs');
function gcd(a, b) {
  while (b > 0n) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = parseInt(input[ptr++], 10);
    const X = new BigInt64Array(n + 1);
    const Y = new BigInt64Array(n + 1);
    for (let i = 1; i <= n; i++) {
      const frac = input[ptr++].split('/');
      const a = BigInt(frac[0]), b = BigInt(frac[1]);
      Y[i] = Y[i - 1] + a;
      X[i] = X[i - 1] + b;
    }
    const hull = [n];
    const ans = new Array(n + 1);
    for (let i = n; i >= 1; i--) {
      const pX = X[i - 1], pY = Y[i - 1];
      while (hull.length >= 2) {
        const A = hull[hull.length - 1];
        const B = hull[hull.length - 2];
        const dyA = Y[A] - pY, dxA = X[A] - pX;
        const dyB = Y[B] - pY, dxB = X[B] - pX;
        if (dyB * dxA >= dyA * dxB) {
          hull.pop();
        } else {
          break;
        }
      }
      const tgt = hull[hull.length - 1];
      let num = Y[tgt] - pY;
      let den = X[tgt] - pX;
      const g = gcd(num, den);
      ans[i] = (num / g) + '/' + (den / g);
      hull.push(i - 1);
    }
    for (let i = 1; i <= n; i++) out.push(ans[i]);
    out.push('');
  }
  console.log(out.join('\n').trim());
}
solve();
