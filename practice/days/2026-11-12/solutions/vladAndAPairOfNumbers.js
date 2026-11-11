const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x = parseInt(tokens[ptr++], 10);
    if (x & 1) {
      out.push('-1');
      continue;
    }
    const d = x / 2;
    if ((x & d) !== 0) {
      out.push('-1');
      continue;
    }
    const msb = 1 << (31 - Math.clz32(x));
    const a = d + msb;
    const b = d + (x ^ msb);
    out.push(a + ' ' + b);
  }

  console.log(out.join('\n'));
}

solve();
