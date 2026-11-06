const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    let odd = 0;
    for (let i = 0; i < n; i++) {
      const val = Number(input[ptr++]);
      if (val % 2 !== 0) odd++;
    }
    out.push(Math.floor(odd / 2));
  }
  console.log(out.join('\n'));
}

solve();

