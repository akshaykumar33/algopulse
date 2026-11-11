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
    const x = parseInt(tokens[ptr++], 10);
    const res = new Int32Array(n);

    for (let i = 1; i <= n; i++) {
      let val = i;
      if ((i & x) === i && i !== x) {
        const j = x ^ i;
        if (j >= 1 && j <= n) val = j;
      }
      res[i - 1] = val;
    }

    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
