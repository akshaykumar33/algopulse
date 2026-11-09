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
    const a = Array.from({ length: n }, () => new Int32Array(m));
    let cur = 1;
    for (let i = 1; i < n; i += 2) {
      for (let j = 0; j < m; j++) {
        a[i][j] = cur++;
      }
    }
    for (let i = 0; i < n; i += 2) {
      for (let j = 0; j < m; j++) {
        a[i][j] = cur++;
      }
    }
    for (let i = 0; i < n; i++) {
      out.push(a[i].join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
