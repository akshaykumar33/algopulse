const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const a = [];
  for (let i = 0; i < n; i++) a.push(parseInt(input[ptr++], 10));

  const dp = new Int32Array(100005);
  let ans = 1;

  for (let i = 0; i < n; i++) {
    let val = a[i];
    let temp = val;
    const primes = [];
    for (let d = 2; d * d <= temp; d++) {
      if (temp % d === 0) {
        primes.push(d);
        while (temp % d === 0) temp /= d;
      }
    }
    if (temp > 1) primes.push(temp);

    let maxPrev = 0;
    for (const p of primes) {
      if (dp[p] > maxPrev) maxPrev = dp[p];
    }
    const cur = maxPrev + 1;
    if (cur > ans) ans = cur;
    for (const p of primes) {
      if (cur > dp[p]) dp[p] = cur;
    }
  }

  console.log(ans);
}

solve();
