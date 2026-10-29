const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const b = [];
    for (let i = 0; i < n; i++) {
      const val = parseInt(input[ptr++], 10);
      if (b.length === 0 || b[b.length - 1] !== val) {
        b.push(val);
      }
    }

    const m = b.length;
    if (m === 1) {
      out.push(1);
      continue;
    }

    let count = 2;
    for (let i = 1; i < m - 1; i++) {
      if ((b[i] > b[i - 1] && b[i] > b[i + 1]) || (b[i] < b[i - 1] && b[i] < b[i + 1])) {
        count++;
      }
    }

    out.push(count);
  }

  console.log(out.join('\n'));
}

solve();
