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
    const x = parseInt(tokens[ptr++], 10);

    let a = 0, b = 0;
    if (x % 3 === 0) {
      a = Math.floor(x / 3);
      b = 0;
    } else if (x % 3 === 1) {
      a = Math.floor(x / 3) + 1;
      b = 2;
    } else {
      a = Math.floor(x / 3) + 1;
      b = 1;
    }

    if (a + b <= n) {
      const c = n - a - b;
      out.push(`YES\n${a} ${b} ${c}`);
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();

