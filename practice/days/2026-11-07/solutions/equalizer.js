const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(input[ptr++], 10);
    }

    let base = 0;
    let add = 0;
    let mx = 0;

    for (let i = 0; i < n; i++) {
      if (i + 1 < n && a[i] === a[i + 1]) {
        base++;
      }
      if (i > 0 && a[i - 1] === a[i] + 1) {
        mx = 1;
      }
      if (i + 1 < n) {
        if (a[i] + 1 === a[i + 1]) {
          const cand = 1 + mx;
          if (cand > add) add = cand;
        } else if (a[i] === a[i + 1]) {
          const cand = -1 + mx;
          if (cand > add) add = cand;
        } else {
          if (mx > add) add = mx;
        }
      } else {
        if (mx > add) add = mx;
      }
    }

    out.push(base + add);
  }

  console.log(out.join('\n'));
}

solve();
