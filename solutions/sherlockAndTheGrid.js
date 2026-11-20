const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const grid = [];
    for (let i = 0; i < n; i++) grid.push(input[ptr++]);

    const rightOk = Array.from({ length: n }, () => new Uint8Array(n));
    for (let i = 0; i < n; i++) {
      let ok = 1;
      for (let j = n - 1; j >= 0; j--) {
        if (grid[i][j] === '#') ok = 0;
        rightOk[i][j] = ok;
      }
    }

    const downOk = Array.from({ length: n }, () => new Uint8Array(n));
    for (let j = 0; j < n; j++) {
      let ok = 1;
      for (let i = n - 1; i >= 0; i--) {
        if (grid[i][j] === '#') ok = 0;
        downOk[i][j] = ok;
      }
    }

    let count = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === '.' && rightOk[i][j] && downOk[i][j]) count++;
      }
    }
    out.push(count);
  }
  console.log(out.join('\n'));
}
solve();