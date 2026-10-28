const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    let cnt = 1;
    const len = 2 * n;
    for (let i = 0; i < len - 1; i++) {
      if (s[i] === '(' && s[i + 1] === '(') {
        cnt++;
      }
    }
    out.push(cnt);
  }

  console.log(out.join('\n'));
}

solve();

