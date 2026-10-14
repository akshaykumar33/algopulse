const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  const t = parseInt(lines[0], 10);
  const out = [];
  for (let i = 1; i <= t; i++) {
    if (i >= lines.length) break;
    const x = parseInt(lines[i], 10);
    out.push(`${x - 1} ${x} ${x + 1}`);
  }
  console.log(out.join('\n'));
}

solve();
