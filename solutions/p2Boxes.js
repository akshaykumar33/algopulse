const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x = parseInt(tokens[ptr++], 10);
    const y = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);

    const s = x + y;
    if (k > s || (s + k) % 2 !== 0) {
      out.push(-1);
      continue;
    }

    const t1 = (s + k) / 2;
    const t2 = (s - k) / 2;
    out.push(Math.min(Math.abs(x - t1), Math.abs(x - t2)));
  }

  console.log(out.join('\n'));
}

solve();
