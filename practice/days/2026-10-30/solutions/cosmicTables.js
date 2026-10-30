const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const k = parseInt(tokens[ptr++], 10);

  const a = new Array(n + 1);
  for (let i = 1; i <= n; i++) {
    a[i] = new Int32Array(m + 1);
    for (let j = 1; j <= m; j++) {
      a[i][j] = parseInt(tokens[ptr++], 10);
    }
  }

  const row = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) row[i] = i;
  const col = new Int32Array(m + 1);
  for (let j = 1; j <= m; j++) col[j] = j;

  const out = [];
  for (let q = 0; q < k; q++) {
    const type = tokens[ptr++];
    const x = parseInt(tokens[ptr++], 10);
    const y = parseInt(tokens[ptr++], 10);
    if (type === 'c') {
      const tmp = col[x];
      col[x] = col[y];
      col[y] = tmp;
    } else if (type === 'r') {
      const tmp = row[x];
      row[x] = row[y];
      row[y] = tmp;
    } else {
      out.push(a[row[x]][col[y]]);
    }
  }
  console.log(out.join('\n'));
}

solve();
