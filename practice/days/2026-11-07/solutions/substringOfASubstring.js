const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    const n = s.length;
    const first = s[0];
    const last = s[n - 1];

    let maxLen = -1;
    let cur = 0;

    for (let i = 0; i < n; i++) {
      if (s[i] === first || s[i] === last) {
        if (cur > maxLen) maxLen = cur;
        cur = 0;
      } else {
        cur++;
      }
    }
    if (cur > maxLen) maxLen = cur;

    out.push(maxLen <= 0 ? -1 : maxLen);
  }

  console.log(out.join('\n'));
}

solve();
