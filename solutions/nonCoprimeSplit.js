const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const l = parseInt(input[ptr++], 10);
    const r = parseInt(input[ptr++], 10);
    if (l <= r && r <= 3) {
      out.push('-1');
      continue;
    }
    if (l < r) {
      if (r % 2 === 0) {
        out.push(`2 ${r - 2}`);
      } else {
        out.push(`2 ${r - 3}`);
      }
    } else {
      let p = -1;
      for (let d = 2; d * d <= l; d++) {
        if (l % d === 0) {
          p = d;
          break;
        }
      }
      if (p !== -1) {
        out.push(`${p} ${l - p}`);
      } else {
        out.push('-1');
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
