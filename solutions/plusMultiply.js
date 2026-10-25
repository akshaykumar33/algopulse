const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const n = parseInt(input[idx++], 10);
    let c0 = 0;
    let c2 = 0;
    for (let i = 0; i < n; i++) {
      const x = parseInt(input[idx++], 10);
      if (x === 0) c0++;
      else if (x === 2) c2++;
    }
    const ans = (c0 * (c0 - 1) / 2) + (c2 * (c2 - 1) / 2);
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
