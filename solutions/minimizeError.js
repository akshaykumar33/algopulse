const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const q = parseInt(input[ptr++], 10);
    if (q >= n) {
      out.push(0);
      continue;
    }
    const maxL = Math.ceil(n / (q + 1));
    out.push(Math.floor(maxL / 2));
  }
  console.log(out.join('\n'));
}

solve();
