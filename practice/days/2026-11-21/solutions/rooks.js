const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const rowUsed = new Uint8Array(n + 1);
    const colUsed = new Uint8Array(n + 1);
    for (let i = 0; i < k; i++) {
      const r = parseInt(input[ptr++], 10);
      const c = parseInt(input[ptr++], 10);
      rowUsed[r] = 1;
      colUsed[c] = 1;
    }
    const emptyRows = [];
    const emptyCols = [];
    for (let i = 1; i <= n; i++) {
      if (!rowUsed[i]) emptyRows.push(i);
      if (!colUsed[i]) emptyCols.push(i);
    }
    const count = emptyRows.length;
    const res = [count];
    for (let i = 0; i < count; i++) {
      res.push(emptyRows[i], emptyCols[i]);
    }
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}
solve();