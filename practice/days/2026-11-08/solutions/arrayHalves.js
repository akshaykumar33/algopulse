const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const len = 2 * n;
    const p = new Int32Array(len);
    for (let i = 0; i < len; i++) {
      p[i] = parseInt(input[ptr++], 10);
    }

    let ans = 0;
    let j = n;
    for (let i = 0; i < n; i++) {
      if (p[i] > n) {
        while (j < len && p[j] > n) {
          j++;
        }
        if (j < len) {
          ans += (j - i);
          j++;
        }
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
