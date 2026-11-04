const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  const maxVal = 3200;
  const isP = new Uint8Array(maxVal + 1);
  isP.fill(1);
  isP[0] = isP[1] = 0;
  for (let i = 2; i * i <= maxVal; i++) {
    if (isP[i]) {
      for (let j = i * i; j <= maxVal; j += i) isP[j] = 0;
    }
  }
  const primes = [];
  for (let i = 2; i <= maxVal; i++) {
    if (isP[i]) primes.push(i);
  }

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const cnt = new Map();

    for (let i = 0; i < n; i++) {
      let x = parseInt(input[ptr++], 10);
      for (let j = 0; j < primes.length; j++) {
        const p = primes[j];
        if (p * p > x) break;
        if (x % p === 0) {
          let c = 0;
          while (x % p === 0) {
            c++;
            x = Math.floor(x / p);
          }
          cnt.set(p, (cnt.get(p) || 0) + c);
        }
      }
      if (x > 1) {
        cnt.set(x, (cnt.get(x) || 0) + 1);
      }
    }

    let pairs = 0;
    let singles = 0;
    for (const freq of cnt.values()) {
      pairs += Math.floor(freq / 2);
      singles += freq % 2;
    }
    const ans = pairs + Math.floor(singles / 3);
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

