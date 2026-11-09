const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = parseInt(tokens[ptr++], 10);
    const b = parseInt(tokens[ptr++], 10);
    const n = parseInt(tokens[ptr++], 10);

    if (a === b) {
      out.push(0);
      continue;
    }

    const d = (a ^ b) >>> 0;
    if (d < n) {
      out.push(1);
      continue;
    }

    const k = 31 - Math.clz32(d);
    const p = 1 << k;
    if (p < n) {
      out.push(2);
    } else {
      out.push(-1);
    }
  }

  console.log(out.join('\n'));
}

solve();
