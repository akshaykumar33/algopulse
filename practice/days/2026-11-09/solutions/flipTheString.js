const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = tokens[ptr++];
    const b = tokens[ptr++];
    const n = a.length;
    let ans = 0;

    for (let p = 0; p < 2; p++) {
      let inDiff = false;
      for (let i = p; i < n; i += 2) {
        if (a[i] !== b[i]) {
          if (!inDiff) {
            ans++;
            inDiff = true;
          }
        } else {
          inDiff = false;
        }
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
