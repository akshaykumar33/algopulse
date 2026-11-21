const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const grid = new Array(n);
    const rowHas = new Uint8Array(n);
    const colHas = new Uint8Array(m);
    let totalOnes = 0;
    for (let i = 0; i < n; i++) {
      grid[i] = input[ptr++];
      for (let j = 0; j < m; j++) {
        if (grid[i][j] === '1') {
          rowHas[i] = 1;
          colHas[j] = 1;
          totalOnes++;
        }
      }
    }
    for (let i = 0; i < n; i++) {
      const rowRes = new Array(m);
      for (let j = 0; j < m; j++) {
        if (totalOnes === 0) {
          rowRes[j] = -1;
        } else if (grid[i][j] === '1') {
          rowRes[j] = 0;
        } else if (rowHas[i] || colHas[j]) {
          rowRes[j] = 1;
        } else {
          rowRes[j] = 2;
        }
      }
      out.push(rowRes.join(' '));
    }
  }
  console.log(out.join('\n'));
}
solve();