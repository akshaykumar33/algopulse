const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let sign = 1;
    if (input.charCodeAt(pos) === 45) {
      sign = -1;
      pos++;
    }
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res * sign;
  }

  const t = nextInt();
  if (t === null) return;

  const MAX_P = 200000;
  const isP = new Uint8Array(MAX_P);
  isP.fill(1);
  isP[0] = isP[1] = 0;
  for (let p = 2; p * p < MAX_P; p++) {
    if (isP[p]) {
      for (let i = p * p; i < MAX_P; i += p) isP[i] = 0;
    }
  }

  const primes = [];
  for (let i = 2; i < MAX_P; i++) {
    if (isP[i]) primes.push(i);
  }

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    if (n === null) break;

    const row = [primes[0]];
    for (let i = 1; i < n; i++) {
      row.push(primes[i - 1] * primes[i]);
    }
    out.push(row.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
