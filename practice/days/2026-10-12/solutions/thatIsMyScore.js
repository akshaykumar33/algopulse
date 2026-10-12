const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const score = new Int32Array(9);

    for (let i = 0; i < n; i++) {
      const p = parseInt(input[ptr++], 10);
      const s = parseInt(input[ptr++], 10);
      if (p <= 8 && s > score[p]) {
        score[p] = s;
      }
    }

    let total = 0;
    for (let p = 1; p <= 8; p++) {
      total += score[p];
    }

    out.push(total);
  }

  console.log(out.join('\n'));
}

solve();
