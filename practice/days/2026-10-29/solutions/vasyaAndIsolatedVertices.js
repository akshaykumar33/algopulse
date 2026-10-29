const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = BigInt(input[0]);
  const m = BigInt(input[1]);

  let minIso = n - 2n * m;
  if (minIso < 0n) minIso = 0n;

  let k = 0n;
  while (k <= n && (k * (k - 1n)) / 2n < m) {
    k++;
  }
  const maxIso = n - k;

  console.log(minIso.toString() + ' ' + maxIso.toString());
}

solve();
