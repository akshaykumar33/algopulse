const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(BigInt(tokens[ptr++]));
    }

    const first = a[0];
    const last = a[n - 1];

    const sorted = [...a].sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));
    const twoSmallest = sorted[0] + sorted[1];

    let ans = first < last ? first : last;
    if (twoSmallest < ans) ans = twoSmallest;

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
