const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const k = BigInt(tokens[ptr++]);
    const l1 = BigInt(tokens[ptr++]);
    const r1 = BigInt(tokens[ptr++]);
    const l2 = BigInt(tokens[ptr++]);
    const r2 = BigInt(tokens[ptr++]);

    let ans = 0n;
    let cur = 1n;

    while (true) {
      const minX = (l2 + cur - 1n) / cur;
      const maxX = r2 / cur;
      const left = l1 > minX ? l1 : minX;
      const right = r1 < maxX ? r1 : maxX;

      if (left <= right) {
        ans += right - left + 1n;
      }

      if (cur > r2 / k) break;
      cur *= k;
    }

    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
