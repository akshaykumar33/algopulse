const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const b = [];
    for (let i = 0; i < n; i++) b.push(parseInt(input[ptr++], 10));
    let ok = true;
    for (let i = 1; i < n; i++) {
      if (b[i - 1] % b[i] !== 0) {
        ok = false;
        break;
      }
    }
    if (ok) out.push(b.join(' '));
    else out.push('-1');
  }
  console.log(out.join('\n'));
}
solve();