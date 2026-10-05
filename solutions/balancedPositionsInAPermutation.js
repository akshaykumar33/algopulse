const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  
  let lineIdx = 0;
  const t = parseInt(lines[lineIdx++], 10);
  const out = [];
  
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(lines[lineIdx++], 10);
    const arr = lines[lineIdx++].split(/\s+/).map(Number);
    
    let cnt = 0;
    for (let i = 0; i < n; i++) {
      const val = arr[i];
      const pos = i + 1;
      if ((val % 2) === (pos % 2)) {
        cnt++;
      }
    }
    out.push(cnt);
  }
  
  console.log(out.join('\n'));
}

solve();
