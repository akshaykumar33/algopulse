const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x = parseInt(tokens[ptr++], 10);
    const y = parseInt(tokens[ptr++], 10);

    if ((x % 2 === 1 && y % 2 === 1) || x <= 1 || y <= 1) {
      out.push('-1');
      continue;
    }

    const ha = x >> 1;
    const hb = y >> 1;
    const mid = x % 2 === 1 ? 'a' : (y % 2 === 1 ? 'b' : '');
    const aHalf = 'a'.repeat(ha);
    const bHalf = 'b'.repeat(hb);

    out.push(aHalf + bHalf + mid + bHalf + aHalf);
    out.push(bHalf + aHalf + mid + aHalf + bHalf);
  }

  console.log(out.join('\n'));
}

solve();
