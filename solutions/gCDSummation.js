const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  const primes = [];
  const MAX_P = 5000000;
  const isP = new Uint8Array(MAX_P);
  isP.fill(1);
  isP[0] = isP[1] = 0;
  for (let p = 2; p * p < MAX_P; p++) {
    if (isP[p]) {
      for (let i = p * p; i < MAX_P; i += p) isP[i] = 0;
    }
  }
  for (let p = 3000007; p < MAX_P; p += 2) {
    if (isP[p]) primes.push(p);
  }

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    if (k < n - 1) {
      out.push(-1);
      continue;
    }
    const g = k - (n - 2);
    const a = [2 * g, 3 * g];
    for (let i = 0; i < n - 2; i++) {
      a.push(primes[i]);
    }
    out.push(a.join(' '));
  }
  console.log(out.join('\n'));
}
solve();