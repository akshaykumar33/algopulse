const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const n = parseInt(input[ptr++], 10);
    const res = [];
    for (let j = 0; j < n; j++) {
      const val = Math.abs(parseInt(input[ptr++], 10));
      if (j % 2 === 0) {
        res.push(val);
      } else {
        res.push(-val);
      }
    }
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
