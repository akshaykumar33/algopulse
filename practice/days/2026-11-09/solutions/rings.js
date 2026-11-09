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

    let z = -1;
    for (let i = 0; i < n; i++) {
      if (s[i] === '0') {
        z = i + 1;
        break;
      }
    }

    const mid = Math.floor(n / 2);

    if (z === -1) {
      out.push(`1 ${n - 1} 2 ${n}`);
    } else if (z <= mid) {
      out.push(`${z} ${n} ${z + 1} ${n}`);
    } else {
      out.push(`1 ${z} 1 ${z - 1}`);
    }
  }

  console.log(out.join('\n'));
}

solve();

