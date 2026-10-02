const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  const t = parseInt(input[0], 10);
  const out = [];
  let idx = 1;
  for (let i = 0; i < t; i++) {
    const parts = input[idx++].split(' ').map(BigInt);
    const n = parts[0];
    const k = parts[1];
    const x = parts[2];

    const minSum = (k * (k + 1n)) / 2n;
    const maxSum = (n * (n + 1n)) / 2n - ((n - k) * (n - k + 1n)) / 2n;

    if (x >= minSum && x <= maxSum) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }
  console.log(out.join('\n'));
}

solve();
