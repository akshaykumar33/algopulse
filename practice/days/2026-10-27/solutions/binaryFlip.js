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

    let k = 0;
    let zInt = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '1') {
        k++;
      } else if (i > 0 && i < n - 1) {
        zInt++;
      }
    }

    const s1 = s[0] === '1' ? 1 : 0;
    const sn = s[n - 1] === '1' ? 1 : 0;
    const cur = 2 * k - s1 - sn;
    const deficit = (n - 1) - cur;

    if (deficit <= 0) {
      out.push(0);
    } else if (deficit <= 2 * zInt) {
      out.push(Math.floor((deficit + 1) / 2));
    } else {
      out.push(deficit - zInt);
    }
  }
  console.log(out.join('\n'));
}

solve();
