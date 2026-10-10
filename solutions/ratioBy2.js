const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input.length || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let i = 0; i < t; i++) {
    const x = Number(input[ptr++]);
    const y = Number(input[ptr++]);
    if (x >= 2 * y || y >= 2 * x) {
      out.push(0);
      continue;
    }
    const a = Math.max(x, y);
    const b = Math.min(x, y);
    const half = Math.floor(a / 2);
    let ans = 2 * b - a;
    if (half >= 1) {
      ans = Math.min(ans, b - half);
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
