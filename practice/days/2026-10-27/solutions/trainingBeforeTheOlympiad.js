const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let sum = 0;
    let odds = 0;
    const res = [];

    for (let i = 0; i < n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      sum += val;
      if (val % 2 !== 0) odds++;

      if (i === 0) {
        res.push(sum);
      } else {
        let reduction = Math.floor(odds / 3);
        if (odds % 3 === 1) reduction++;
        res.push(sum - reduction);
      }
    }
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
