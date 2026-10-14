const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  let ptr = 0;
  const t = parseInt(lines[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (ptr >= lines.length) break;
    const n = parseInt(lines[ptr++], 10);
    const a = lines[ptr++].trim().split(/\s+/).map(Number);

    let ans = 0;
    let prefMax = a[0];

    for (let j = 0; j < n; j++) {
      if (j === 0) {
        if (n > 1) {
          const m1 = Math.max(a[0], a[1]);
          if (a[0] >= m1) {
            ans += a[0] - (m1 - 1);
          }
          prefMax = m1;
        }
      } else if (j % 2 === 1) {
        prefMax = Math.max(prefMax, a[j]);
      } else {
        if (a[j] >= prefMax) {
          ans += a[j] - (prefMax - 1);
        }
        prefMax = Math.max(prefMax, a[j]);
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
