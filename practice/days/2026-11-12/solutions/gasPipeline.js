const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const INF = 1e15;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = parseInt(tokens[ptr++], 10);
    const b = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    let dp1 = b;
    let dp2 = INF;
    for (let i = 0; i < n; i++) {
      if (s[i] === '1') {
        dp1 = INF;
        dp2 = dp2 + a + 2 * b;
      } else {
        const n1 = (dp1 + a < dp2 + 2 * a ? dp1 + a : dp2 + 2 * a) + b;
        const n2 = (dp1 + 2 * a < dp2 + a ? dp1 + 2 * a : dp2 + a) + 2 * b;
        dp1 = n1;
        dp2 = n2;
      }
    }
    out.push(dp1);
  }
  console.log(out.join('\n'));
}

solve();
