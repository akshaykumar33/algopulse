const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let c = 0; c < t; c++) {
    const n = parseInt(tokens[ptr++], 10);
    const grid = [];
    for (let i = 0; i < n; i++) {
      const row = new Int32Array(n);
      for (let j = 0; j < n; j++) {
        row[j] = parseInt(tokens[ptr++], 10);
      }
      grid.push(row);
    }

    let ops = 0;
    let inverted = false;

    for (let L = n; L >= 2; L--) {
      const val = inverted ? grid[L - 1][0] : grid[0][L - 1];
      if (val !== L) {
        ops++;
        inverted = !inverted;
      }
    }

    out.push(ops);
  }

  console.log(out.join('\n'));
}

solve();
