const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const x = parseInt(input[ptr++], 10);

    let cur = new Set([x]);
    for (let i = 0; i < m; i++) {
      const r = parseInt(input[ptr++], 10);
      const c = input[ptr++];
      const next = new Set();
      for (const p of cur) {
        if (c === '0' || c === '?') {
          next.add(((p - 1 + r) % n) + 1);
        }
        if (c === '1' || c === '?') {
          next.add(((p - 1 - r + n * 1000) % n) + 1);
        }
      }
      cur = next;
    }

    const res = Array.from(cur).sort((a, b) => a - b);
    out.push(res.length.toString());
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
