const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const p = [];
    for (let i = 0; i < n; i++) {
      p.push(parseInt(tokens[ptr++], 10));
    }

    let ans = 0;
    let k = 0;
    for (let i = 0; i < n; i++) {
      if (p[i] === i + 1) {
        k++;
      } else {
        if (k > 0) {
          ans += Math.ceil(k / 2);
          k = 0;
        }
      }
    }
    if (k > 0) {
      ans += Math.ceil(k / 2);
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

