const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = parseInt(input[ptr++], 10);
    const b = parseInt(input[ptr++], 10);
    const diff = Math.abs(a - b);
    let count = 0;

    for (let i = 1; i * i <= diff; i++) {
      if (diff % i === 0) {
        count += (i * i === diff ? 1 : 2);
      }
    }

    out.push(count);
  }

  console.log(out.join('\n'));
}

solve();

