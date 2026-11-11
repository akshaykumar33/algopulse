const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const grid = new Array(n);
    const res = new Array(n);
    for (let i = 0; i < n; i++) {
      grid[i] = tokens[ptr++];
      res[i] = new Array(m).fill('.');
    }
    let ok = true;
    for (let i = 0; i < n && ok; i++) {
      let flip = 0;
      const row = grid[i];
      for (let j = 0; j < m; j++) {
        if (row[j] === 'U') {
          res[i][j] = flip === 0 ? 'W' : 'B';
          res[i + 1][j] = flip === 0 ? 'B' : 'W';
          flip ^= 1;
        }
      }
      if (flip !== 0) ok = false;
    }
    for (let j = 0; j < m && ok; j++) {
      let flip = 0;
      for (let i = 0; i < n; i++) {
        if (grid[i][j] === 'L') {
          res[i][j] = flip === 0 ? 'W' : 'B';
          res[i][j + 1] = flip === 0 ? 'B' : 'W';
          flip ^= 1;
        }
      }
      if (flip !== 0) ok = false;
    }
    if (!ok) {
      out.push('-1');
    } else {
      for (let i = 0; i < n; i++) out.push(res[i].join(''));
    }
  }
  console.log(out.join('\n'));
}

solve();
