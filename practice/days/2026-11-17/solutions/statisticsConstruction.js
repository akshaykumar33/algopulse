const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || input.length === 0 || input[0] === '') return;
  let idx = 0;
  const T = parseInt(input[idx++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    if (idx >= input.length) break;
    const line = input[idx++].trim();
    if (!line) continue;
    const n = parseInt(line, 10);
    const row = [];
    for (let i = 1; i <= n; i++) {
      row.push(2 * i);
    }
    out.push(row.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
