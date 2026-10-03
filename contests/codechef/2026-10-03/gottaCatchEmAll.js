const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input.length || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let line = 1;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const [n, x, y] = input[line++].trim().split(/\s+/).map(Number);
    const a = input[line++].trim().split(/\s+/).map(Number);
    let total = 0;
    for (let i = 0; i < n; i++) {
      total += Math.min(a[i] * x, y);
    }
    out.push(total);
  }

  console.log(out.join('\n'));
}

solve();
