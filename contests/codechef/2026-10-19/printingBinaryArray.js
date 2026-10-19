const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  
  let t = parseInt(lines[0], 10);
  let lineIdx = 1;
  const out = [];
  
  while (t--) {
    if (lineIdx >= lines.length) break;
    const n = parseInt(lines[lineIdx++], 10);
    const arr = lines[lineIdx++].trim().split(/\s+/).map(Number);
    const res = arr.map(x => 1 - x);
    out.push(res.join(' '));
  }
  
  console.log(out.join('\n'));
}

solve();
