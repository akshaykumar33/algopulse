const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let min = parseInt(input[ptr++], 10);
    let max = min;
    let ok = true;

    for (let i = 1; i < n; i++) {
      const b = parseInt(input[ptr++], 10);
      if (b <= min) {
        min = b;
      } else if (b >= max) {
        max = b;
      } else {
        ok = false;
      }
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();

