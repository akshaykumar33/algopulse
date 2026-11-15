const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const a = [];
  for (let i = 0; i < n; i++) a.push(parseInt(input[ptr++], 10));

  const primes = new Map();
  for (let i = 0; i < n; i++) {
    let temp = a[i];
    for (let d = 2; d * d <= temp; d++) {
      if (temp % d === 0) {
        let cnt = 0;
        while (temp % d === 0) {
          cnt++;
          temp /= d;
        }
        if (!primes.has(d)) primes.set(d, []);
        primes.get(d).push(cnt);
      }
    }
    if (temp > 1) {
      if (!primes.has(temp)) primes.set(temp, []);
      primes.get(temp).push(1);
    }
  }

  let ans = 1n;
  for (const [p, exps] of primes.entries()) {
    if (exps.length < n - 1) continue;
    exps.sort((x, y) => x - y);
    const need = exps.length === n ? exps[1] : exps[0];
    for (let i = 0; i < need; i++) {
      ans *= BigInt(p);
    }
  }

  console.log(ans.toString());
}

solve();
