const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let idx = 0;
  const t = parseInt(input[idx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[idx++], 10);
    const k = parseInt(input[idx++], 10);
    const seen = new Uint8Array(n + 2);
    for (let i = 0; i < n; i++) {
      const v = parseInt(input[idx++], 10);
      if (v <= n + 1) seen[v] = 1;
    }
    let mex = 0;
    while (seen[mex]) mex++;
    out.push(Math.min(k - 1, mex));
  }

  console.log(out.join('\n'));
}

solve();
