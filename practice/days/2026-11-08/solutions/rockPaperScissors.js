const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = input[ptr++];

    const w = Math.floor(n / 2) + 1;
    const res = new Array(n).fill('P');
    let pts = 0;

    for (let i = 0; i < n; i++) {
      if (a[i] === 'R') {
        pts++;
      }
    }

    let need = w - pts;
    if (need > 0) {
      for (let i = n - 1; i >= 0; i--) {
        if (a[i] !== 'R') {
          if (a[i] === 'S') {
            res[i] = 'R';
          } else {
            res[i] = 'S';
          }
          need--;
          if (need === 0) break;
        }
      }
    }

    out.push(res.join(''));
  }

  console.log(out.join('\n'));
}

solve();
