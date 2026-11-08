const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const p = input[ptr++];
    const c = input[ptr++];

    const res = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      const d = (c.charCodeAt(i) - p.charCodeAt(i) + 26) % 26;
      res[i] = (9 * d) % 26;
    }

    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
