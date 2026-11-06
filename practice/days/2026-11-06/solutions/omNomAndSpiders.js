const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || input.length === 0 || input[0].trim() === '') return;
  
  const [nStr, mStr] = input[0].trim().split(/\s+/);
  const n = parseInt(nStr, 10);
  const m = parseInt(mStr, 10);
  
  const ans = new Int32Array(m);
  
  for (let r = 0; r < n; r++) {
    const row = input[r + 1];
    if (!row) continue;
    for (let c = 0; c < m; c++) {
      const ch = row[c];
      if (ch === 'U') {
        if (r % 2 === 0) {
          ans[c]++;
        }
      } else if (ch === 'L') {
        const targetCol = c - r;
        if (targetCol >= 0) {
          ans[targetCol]++;
        }
      } else if (ch === 'R') {
        const targetCol = c + r;
        if (targetCol < m) {
          ans[targetCol]++;
        }
      }
    }
  }
  
  console.log(ans.join(' '));
}

solve();

