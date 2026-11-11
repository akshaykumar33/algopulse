const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);

  const maxH = 1000000;
  const isPrime = new Uint8Array(maxH + 1);
  isPrime.fill(1);
  isPrime[0] = 0;
  isPrime[1] = 0;
  for (let i = 2; i * i <= maxH; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= maxH; j += i) {
        isPrime[j] = 0;
      }
    }
  }

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const h = parseInt(tokens[ptr++], 10);
    let dmg = 0;
    let step = 1;
    let k = 0;
    let ans = -1;
    while (dmg <= h) {
      const rem = h - dmg;
      if (rem === 0) {
        ans = k;
        break;
      }
      if (isPrime[rem]) {
        ans = k + 1;
        break;
      }
      dmg += step;
      step *= 2;
      k++;
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
