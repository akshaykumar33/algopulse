const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let k = parseInt(tokens[ptr++], 10);
    const zeroBits = new Int32Array(31);
    for (let i = 0; i < n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      for (let b = 0; b <= 30; b++) {
        if ((val & (1 << b)) === 0) zeroBits[b]++;
      }
    }
    let ans = 0;
    for (let b = 30; b >= 0; b--) {
      if (zeroBits[b] <= k) {
        k -= zeroBits[b];
        ans |= (1 << b);
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}
solve();
