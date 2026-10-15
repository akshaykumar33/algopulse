const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let lineIdx = 0;
  const out = [];

  const t = parseInt(input[lineIdx++], 10);

  for (let i = 0; i < t; i++) {
    const n = parseInt(input[lineIdx++], 10);
    const b = input[lineIdx++].split(' ').map(Number);

    const a = new Array(n);
    a[0] = b[0];
    a[n - 1] = b[n - 2];

    for (let j = 1; j < n - 1; j++) {
      a[j] = Math.min(b[j - 1], b[j]);
    }
    out.push(a.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
