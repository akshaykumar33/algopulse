const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let pos = 0;
  const t = parseInt(tokens[pos++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x = BigInt(tokens[pos++]);
    const n = BigInt(tokens[pos++]);
    const ans = (x - 1n) * (2n * n - x);
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
