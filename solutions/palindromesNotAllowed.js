const fs = require('fs');
function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  const t = parseInt(lines[0], 10);
  const out = [];
  for (let i = 1; i <= t; i++) {
    const n = parseInt(lines[i], 10);
    let s = '';
    for (let j = 0; j < n; j++) {
      s += String.fromCharCode(97 + (j % 26));
    }
    out.push(s);
  }
  console.log(out.join('\n'));
}
solve();
