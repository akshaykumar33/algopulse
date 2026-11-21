const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);
    if (a[0] === a[n - 1] || n <= 2) {
      out.push('YES');
      continue;
    }
    let ok = false;
    for (let k = 0; k < n - 1; k++) {
      if (a[k] === a[0] && a[k + 1] === a[n - 1]) {
        ok = true;
        break;
      }
    }
    out.push(ok ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}
solve();