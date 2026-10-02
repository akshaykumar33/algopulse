const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines.length || lines[0] === '') return;
  const t = parseInt(lines[0]);
  const out = [];
  let lineIdx = 1;
  for (let i = 0; i < t; i++) {
    const n = parseInt(lines[lineIdx++]);
    let a = 1;
    let b = n - 1;
    for (let d = 2; d * d <= n; d++) {
      if (n % d === 0) {
        a = n / d;
        b = n - a;
        break;
      }
    }
    out.push(a + ' ' + b);
  }
  console.log(out.join('\n'));
}

solve();
