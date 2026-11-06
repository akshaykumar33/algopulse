const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    
    const grid = [];
    const rowSum = new Array(n).fill(0n);
    const colSum = new Array(m).fill(0n);
    
    for (let i = 0; i < n; i++) {
      const row = new Array(m);
      for (let j = 0; j < m; j++) {
        const val = BigInt(input[ptr++]);
        row[j] = val;
        rowSum[i] += val;
        colSum[j] += val;
      }
      grid.push(row);
    }
    
    let r = 0;
    let c = 0;
    
    for (let k = 0; k < s.length; k++) {
      if (s[k] === 'D') {
        const v = -rowSum[r];
        grid[r][c] = v;
        rowSum[r] += v;
        colSum[c] += v;
        r++;
      } else {
        const v = -colSum[c];
        grid[r][c] = v;
        rowSum[r] += v;
        colSum[c] += v;
        c++;
      }
    }
    
    const vLast = -rowSum[n - 1];
    grid[n - 1][m - 1] = vLast;
    
    for (let i = 0; i < n; i++) {
      out.push(grid[i].map(x => x.toString()).join(' '));
    }
  }
  
  console.log(out.join('\n'));
}

solve();

