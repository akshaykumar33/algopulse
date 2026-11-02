const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const count = new Map();
    for (let i = 0; i < n; i++) {
      const x = parseInt(tokens[ptr++], 10);
      count.set(x, (count.get(x) || 0) + 1);
    }

    let origMex = 0;
    while (count.has(origMex)) origMex++;

    const diff = new Array(n + 2).fill(0);
    for (let v = 0; v <= origMex; v++) {
      const l = count.get(v) || 0;
      const r = n - v;
      if (l <= r) {
        diff[l]++;
        diff[r + 1]--;
      }
    }

    const res = [];
    let cur = 0;
    for (let k = 0; k <= n; k++) {
      cur += diff[k];
      res.push(cur);
    }

    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

