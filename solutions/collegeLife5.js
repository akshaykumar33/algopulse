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
    const f = new Array(n);
    for (let i = 0; i < n; i++) f[i] = parseInt(input[ptr++], 10);
    const c = new Array(m);
    for (let i = 0; i < m; i++) c[i] = parseInt(input[ptr++], 10);

    let cur = 0;
    let switches = 0;
    let i = 0, j = 0;
    while (i < n || j < m) {
      if (j >= m || (i < n && f[i] < c[j])) {
        if (cur !== 0) {
          cur = 0;
          switches++;
        }
        i++;
      } else {
        if (cur !== 1) {
          cur = 1;
          switches++;
        }
        j++;
      }
    }
    out.push(switches);
  }
  console.log(out.join('\n'));
}
solve();