const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines || lines.length === 0 || lines[0] === '') return;
  let lineIdx = 0;
  const t = parseInt(lines[lineIdx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
    const n = parseInt(lines[lineIdx++], 10);
    while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
    const a = lines[lineIdx++].trim().split(/\s+/).map(Number);
    let win = false;
    for (let i = 1; i < n; i++) {
      if (a[i] < a[0]) {
        win = true;
        break;
      }
    }
    out.push(win ? 'Alice' : 'Bob');
  }

  console.log(out.join('\n'));
}

solve();
