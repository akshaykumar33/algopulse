const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines || lines.length === 0 || lines[0] === '') return;
  
  let lineIdx = 0;
  const t = parseInt(lines[lineIdx++], 10);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const n = parseInt(lines[lineIdx++], 10);
    let cnt = 0;
    for (let r = 0; r < n; r++) {
      const row = lines[lineIdx++];
      for (let c = 0; c < n; c++) {
        if (row[c] === '1') {
          if (r === 0 || r === n - 1 || c === 0 || c === n - 1) {
            cnt++;
          }
        }
      }
    }
    out.push(cnt);
  };
  
  console.log(out.join('\n'));
}

solve();
