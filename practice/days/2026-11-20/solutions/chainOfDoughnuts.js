const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const a = [];
    for (let i = 0; i < m; i++) a.push(parseInt(input[ptr++], 10));
    a.sort((x, y) => x - y);
    let cuts = 0;
    let remM = m;
    for (let i = 0; i < m; i++) {
      if (a[i] <= remM - 2) {
        cuts += a[i];
        remM -= (a[i] + 1);
      } else {
        cuts += (remM - 1);
        break;
      }
    }
    out.push(cuts);
  }
  console.log(out.join('\n'));
}
solve();