const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  
  let lineIdx = 0;
  const t = parseInt(lines[lineIdx++], 10);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    if (lineIdx >= lines.length) break;
    const parts = lines[lineIdx++].trim().split(/\s+/).map(Number);
    const x1 = parts[0];
    const y1 = parts[1];
    const x2 = parts[2];
    const y2 = parts[3];
    
    const ans = Math.abs(x1 - x2) + Math.abs(y1 - y2);
    out.push(ans);
  }
  
  console.log(out.join('\n'));
}

solve();
