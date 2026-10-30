const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const p = [];
    for (let i = 1; i <= n; i++) {
      p.push(i);
    }
    out.push(p.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
