const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = tokens[ptr++];
    const b = tokens[ptr++];
    if (a === b) {
      out.push(0);
      continue;
    }
    const cnt = [[0, 0], [0, 0]];
    for (let i = 0; i < n; i++) {
      const match = a[i] === b[i] ? 1 : 0;
      const isOne = a[i] === '1' ? 1 : 0;
      cnt[match][isOne]++;
    }
    let ans = n + 5;
    const ops1 = cnt[1][0] + cnt[1][1];
    if (ops1 % 2 === 1 && cnt[1][1] - cnt[1][0] === 1) {
      ans = Math.min(ans, ops1);
    }
    const ops2 = cnt[0][0] + cnt[0][1];
    if (ops2 % 2 === 0 && cnt[0][1] === cnt[0][0]) {
      ans = Math.min(ans, ops2);
    }
    out.push(ans > n ? -1 : ans);
  }
  console.log(out.join('\n'));
}

solve();
