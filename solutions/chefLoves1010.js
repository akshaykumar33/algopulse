const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];

    let ones = 0;
    let zeroes = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '1') ones++;
      else zeroes++;
    }

    const m = ones < zeroes ? ones : zeroes;
    const ans = m >= 2 ? m - 1 : 0;
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

