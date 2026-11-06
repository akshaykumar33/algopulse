const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const k = Number(input[ptr++]);
    const x = Number(input[ptr++]);

    if (x > k) {
      out.push('-1');
      continue;
    }

    const res = [];
    if (x === 0) {
      for (let i = 0; i < n; i++) res.push(1);
    } else {
      for (let i = 0; i < n; i++) {
        res.push(i % x);
      }
    }
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

