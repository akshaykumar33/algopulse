const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let cnt = 0;
    for (let i = 1; i <= n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      if (val === i) {
        cnt++;
      }
    }
    out.push(cnt);
  }

  console.log(out.join('\n'));
}

solve();
