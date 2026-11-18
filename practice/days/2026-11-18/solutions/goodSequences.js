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

  const MAX = 100001;
  const spf = new Int32Array(MAX);
  for (let i = 2; i < MAX; i++) {
    if (spf[i] === 0) {
      for (let j = i; j < MAX; j += i) {
        if (spf[j] === 0) spf[j] = i;
      }
    }
  }

  const dp = new Int32Array(MAX);
  let ans = 1;

  for (let i = 0; i < n; i++) {
    let x = nextInt();
    if (x === 1) continue;

    const primes = [];
    let temp = x;
    while (temp > 1) {
      const p = spf[temp];
      primes.push(p);
      while (temp % p === 0) temp = Math.floor(temp / p);
    }

    let maxVal = 0;
    for (let j = 0; j < primes.length; j++) {
      if (dp[primes[j]] > maxVal) maxVal = dp[primes[j]];
    }

    const cur = maxVal + 1;
    if (cur > ans) ans = cur;

    for (let j = 0; j < primes.length; j++) {
      if (cur > dp[primes[j]]) dp[primes[j]] = cur;
    }
  }

  console.log(ans);
}

solve();
