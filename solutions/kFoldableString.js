const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
let ptr = 0;

function solve() {
  if (!tokens[0]) return;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    const m = n / k;
    let c0 = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '0') c0++;
    }
    if (c0 % m !== 0) {
      out.push('IMPOSSIBLE');
      continue;
    }
    const z = c0 / m;
    const o = (n - c0) / m;
    const x = '0'.repeat(z) + '1'.repeat(o);
    const rx = '1'.repeat(o) + '0'.repeat(z);
    const blocks = [];
    for (let i = 0; i < m; i++) blocks.push((i & 1) ? rx : x);
    out.push(blocks.join(''));
  }
  console.log(out.join('\n'));
}

solve();
