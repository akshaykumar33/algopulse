const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let lineIdx = 0;
  if (lineIdx >= lines.length || lines[lineIdx] === '') return;
  
  const t = parseInt(lines[lineIdx++], 10);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const n = parseInt(lines[lineIdx++], 10);
    const s = lines[lineIdx++].trim().split(/\s+/).map(Number);
    s.sort((a, b) => a - b);
    let minDiff = Infinity;
    for (let j = 0; j < n - 1; j++) {
      const diff = s[j + 1] - s[j];
      if (diff < minDiff) {
        minDiff = diff;
      }
    }
    out.push(minDiff);
  }
  
  console.log(out.join('\n'));
}

solve();
