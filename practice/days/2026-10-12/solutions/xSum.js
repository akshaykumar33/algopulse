const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);

    const a = new Array(n);
    const d1 = new Float64Array(n + m + 1);
    const d2 = new Float64Array(n + m + 1);

    for (let i = 0; i < n; i++) {
      a[i] = new Int32Array(m);
      for (let j = 0; j < m; j++) {
        const val = parseInt(input[ptr++], 10);
        a[i][j] = val;
        d1[i + j] += val;
        d2[i - j + m] += val;
      }
    }

    let ans = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        const sum = d1[i + j] + d2[i - j + m] - a[i][j];
        if (sum > ans) {
          ans = sum;
        }
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
