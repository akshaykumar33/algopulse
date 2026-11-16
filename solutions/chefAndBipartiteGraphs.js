const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const d = parseInt(input[ptr++], 10);
    const D = parseInt(input[ptr++], 10);

    if (m < n * d || m > n * D) {
      out.push("-1");
      continue;
    }

    let count = 0;
    for (let shift = 0; shift < n && count < m; shift++) {
      for (let i = 0; i < n && count < m; i++) {
        const u = i + 1;
        const v = ((i + shift) % n) + 1;
        out.push(u + " " + v);
        count++;
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
