const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  const b1 = 1 << 27;
  const b2 = 1 << 28;

  for (let tc = 0; tc < t; tc++) {
    const x = parseInt(tokens[ptr++], 10);
    out.push(`${x} ${x | b1} ${x | b2}`);
  }

  console.log(out.join('\n'));
}

solve();
