const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = parseFloat(input[ptr++]);
    const v = parseFloat(input[ptr++]);

    const ans = (2 * s) / (3 * v);
    out.push(ans.toFixed(6));
  }

  console.log(out.join('\n'));
}

solve();
