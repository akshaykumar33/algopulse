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
    let goodCount = 0;

    for (let i = 0; i < n; i++) {
      if (s[i] === '1') ones++;
      else zeroes++;
      if (ones >= zeroes) goodCount++;
    }

    out.push(goodCount);
  }

  console.log(out.join('\n'));
}

solve();

