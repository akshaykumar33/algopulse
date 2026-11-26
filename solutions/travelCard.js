const fs = require('fs');
const buf = fs.readFileSync(0);
let ptr = 0;

function nextInt() {
  while (ptr < buf.length && buf[ptr] <= 32) ptr++;
  let x = 0;
  while (ptr < buf.length && buf[ptr] > 32) {
    x = x * 10 + buf[ptr] - 48;
    ptr++;
  }
  return x;
}

const out = [];

function solve() {
  const n = nextInt();
  const t = new Int32Array(n);
  for (let i = 0; i < n; i++) t[i] = nextInt();
  const dp = new Int32Array(n + 1);
  let p1 = 0;
  let p2 = 0;
  for (let i = 1; i <= n; i++) {
    const cur = t[i - 1];
    while (t[p1] <= cur - 90) p1++;
    while (t[p2] <= cur - 1440) p2++;
    let best = dp[i - 1] + 20;
    const c1 = dp[p1] + 50;
    if (c1 < best) best = c1;
    const c2 = dp[p2] + 120;
    if (c2 < best) best = c2;
    dp[i] = best;
    out.push(best - dp[i - 1]);
  }
}

solve();
console.log(out.join('\n'));
