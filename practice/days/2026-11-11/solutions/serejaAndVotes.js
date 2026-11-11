const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let sum = 0;
    let pos = 0;

    for (let i = 0; i < n; i++) {
      const b = parseInt(tokens[ptr++], 10);
      sum += b;
      if (b > 0) pos++;
    }

    out.push(sum >= 100 && sum - pos < 100 ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
