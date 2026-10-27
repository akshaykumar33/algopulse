const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    let maxH = 0;
    const a = [];
    for (let i = 0; i < n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      a.push(val);
      if (val > maxH) maxH = val;
    }

    let req = 0;
    for (let i = 0; i < n; i++) {
      req += (maxH - a[i]);
    }

    if (m >= req && (m - req) % n === 0) {
      out.push('Yes');
    } else {
      out.push('No');
    }
  }
  console.log(out.join('\n'));
}

solve();
