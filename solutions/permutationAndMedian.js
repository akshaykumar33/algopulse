const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let low = 1;
    let high = n;
    const ans = new Array(n);

    for (let i = 0; i < n; i++) {
      if ((i & 1) === 0) {
        ans[i] = high--;
      } else {
        ans[i] = low++;
      }
    }
    out.push(ans.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
