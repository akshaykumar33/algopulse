const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(parseInt(tokens[ptr++], 10));
    }
    let possible = true;
    let minX = -Infinity;
    let maxX = Infinity;
    const half = Math.floor(n / 2);
    for (let i = 0; i < half; i++) {
      let u = a[i];
      let v = a[n - 1 - i];
      if (u === v) continue;
      if (u > v) {
        const tmp = u;
        u = v;
        v = tmp;
      }
      if (v - u !== 2) {
        possible = false;
        break;
      }
      if (u > minX) minX = u;
      if (u + 1 < maxX) maxX = u + 1;
      if (minX > maxX) {
        possible = false;
        break;
      }
    }
    out.push(possible ? 'Yes' : 'No');
  }
  console.log(out.join('\n'));
}

solve();
