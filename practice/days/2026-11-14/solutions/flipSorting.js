const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++].split('').map(Number);
    const ops = [];

    for (let i = 0; i < n; i++) {
      if (s[i] === 1) {
        const len = n - i;
        ops.push((i + 1) + ' ' + len);
        for (let j = i; j < n; j++) s[j] ^= 1;
      }
    }

    out.push(ops.length);
    for (const op of ops) out.push(op);
  }
  console.log(out.join('\n'));
}

solve();
