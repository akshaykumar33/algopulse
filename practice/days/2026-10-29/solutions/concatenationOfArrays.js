const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const pairs = [];
    for (let i = 0; i < n; i++) {
      const u = parseInt(input[ptr++], 10);
      const v = parseInt(input[ptr++], 10);
      pairs.push({ u, v, sum: u + v });
    }
    pairs.sort((a, b) => a.sum - b.sum);

    const line = [];
    for (const p of pairs) {
      line.push(p.u, p.v);
    }
    out.push(line.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
