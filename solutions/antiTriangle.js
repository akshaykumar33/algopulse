const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const l = parseInt(input[ptr++], 10);
    const res = [];
    if (l >= 2000) {
      for (let i = 1; i <= n; i++) res.push(i);
    } else {
      for (let i = 0; i < n; i++) res.push(1 + i * l);
    }
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}
solve();