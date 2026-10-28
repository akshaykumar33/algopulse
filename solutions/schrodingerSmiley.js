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

    let colonSeen = false;
    let countClose = 0;
    let ans = 0;

    for (let i = 0; i < n; i++) {
      const ch = s[i];
      if (ch === ':') {
        if (colonSeen && countClose > 0) {
          ans++;
        }
        colonSeen = true;
        countClose = 0;
      } else if (ch === ')') {
        if (colonSeen) {
          countClose++;
        }
      } else {
        colonSeen = false;
        countClose = 0;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

