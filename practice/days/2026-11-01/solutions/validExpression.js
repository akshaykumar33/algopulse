const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const x = parseInt(tokens[ptr++], 10);

    if (x > n + 1 || x < 1 - n) {
      out.push(-1);
    } else if (x > 1) {
      const plus = x - 1;
      const mul = n - plus;
      out.push('+'.repeat(plus) + '*'.repeat(mul));
    } else if (x < 1) {
      const minus = 1 - x;
      const mul = n - minus;
      out.push('-'.repeat(minus) + '*'.repeat(mul));
    } else {
      out.push('*'.repeat(n));
    }
  }

  console.log(out.join('\n'));
}

solve();

