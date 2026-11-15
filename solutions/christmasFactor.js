const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  const MAXP = 2000005;
  const isPrime = new Uint8Array(MAXP).fill(1);
  isPrime[0] = isPrime[1] = 0;
  for (let p = 2; p * p < MAXP; p++) {
    if (isPrime[p]) {
      for (let i = p * p; i < MAXP; i += p) isPrime[i] = 0;
    }
  }

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const hasFactor = new Uint8Array(MAXP);

    for (let i = 0; i < n; i++) {
      let v = parseInt(input[ptr++], 10);
      for (let d = 2; d * d <= v; d++) {
        if (v % d === 0) {
          hasFactor[d] = 1;
          while (v % d === 0) v /= d;
        }
      }
      if (v > 1) hasFactor[v] = 1;
    }

    let ans = 2;
    for (let p = 2; p < MAXP; p++) {
      if (isPrime[p] && !hasFactor[p]) {
        ans = p;
        break;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
