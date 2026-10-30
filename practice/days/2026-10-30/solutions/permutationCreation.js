const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    if (n === 1) {
      out.push('1');
    } else if (n === 2 || n === 3) {
      out.push('-1');
    } else {
      const p = [];
      for (let i = 2; i <= n; i += 2) {
        p.push(i);
      }
      for (let i = 1; i <= n; i += 2) {
        p.push(i);
      }
      out.push(p.join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
