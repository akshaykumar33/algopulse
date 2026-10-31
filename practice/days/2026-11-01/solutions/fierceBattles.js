const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const req = new Array(105).fill(0);
    const have = new Array(105).fill(0);
    for (let i = 0; i < n; i++) {
      const l = parseInt(tokens[ptr++], 10);
      const a = parseInt(tokens[ptr++], 10);
      req[l] += a;
    }
    for (let i = 0; i < m; i++) {
      const l = parseInt(tokens[ptr++], 10);
      const a = parseInt(tokens[ptr++], 10);
      have[l] += a;
    }
    let ans = 0;
    for (let i = 1; i <= 100; i++) {
      if (req[i] > have[i]) {
        ans += req[i] - have[i];
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}
solve();
