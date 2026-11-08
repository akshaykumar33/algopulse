const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x = parseInt(input[ptr++], 10);
    const p = 31 - Math.clz32(x);
    const b = 1 << p;
    const a = x - b;
    out.push(a + ' ' + b);
  }

  console.log(out.join('\n'));
}

solve();
