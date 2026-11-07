const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const ans = new Int32Array(n);
    let throwers = 0;

    for (let i = 0; i < n; i++) {
      const a = parseInt(tokens[ptr++], 10);
      ans[i] = Math.min(a, throwers);
      if (throwers < a) {
        throwers++;
      }
    }

    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
