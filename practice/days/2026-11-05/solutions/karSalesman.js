const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const x = BigInt(tokens[ptr++]);
    let sum = 0n;
    let maxVal = 0n;
    for (let i = 0; i < n; i++) {
      const val = BigInt(tokens[ptr++]);
      sum += val;
      if (val > maxVal) maxVal = val;
    }
    const needed = (sum + x - 1n) / x;
    const ans = needed > maxVal ? needed : maxVal;
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}
solve();
