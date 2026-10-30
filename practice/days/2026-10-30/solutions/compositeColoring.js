const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(tokens[ptr++], 10);

    const group = new Int32Array(n);
    const primeUsed = new Uint8Array(primes.length);

    for (let i = 0; i < n; i++) {
      for (let pIdx = 0; pIdx < primes.length; pIdx++) {
        if (a[i] % primes[pIdx] === 0) {
          group[i] = pIdx;
          primeUsed[pIdx] = 1;
          break;
        }
      }
    }

    const remapped = new Int32Array(primes.length);
    let curColor = 0;
    for (let pIdx = 0; pIdx < primes.length; pIdx++) {
      if (primeUsed[pIdx]) {
        remapped[pIdx] = ++curColor;
      }
    }

    out.push(curColor);
    const ans = [];
    for (let i = 0; i < n; i++) {
      ans.push(remapped[group[i]]);
    }
    out.push(ans.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
