const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    let m = 0;
    for (let i = 0; i < n; i++) {
      const a = parseInt(input[ptr++], 10);
      if (i % 2 === 0) {
        if (m < 0) m -= a;
        else m += a;
      } else {
        if (m < 0) m += a;
        else m -= a;
      }
    }
    out.push(Math.abs(m) >= k ? 1 : 2);
  }
  console.log(out.join('\n'));
}
solve();