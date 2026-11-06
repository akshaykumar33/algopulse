const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }
    a.sort();

    const maxVal = a[n - 1];
    let ans = 0;

    for (let i = 0; i < n - 2; i++) {
      for (let j = i + 1; j < n - 1; j++) {
        const sum2 = a[i] + a[j];
        const lower = maxVal - sum2;
        const upper = sum2;

        let l = j + 1, r = n - 1, first = n;
        while (l <= r) {
          const mid = (l + r) >> 1;
          if (a[mid] > lower) {
            first = mid;
            r = mid - 1;
          } else {
            l = mid + 1;
          }
        }

        l = j + 1; r = n - 1; let last = j;
        while (l <= r) {
          const mid = (l + r) >> 1;
          if (a[mid] < upper) {
            last = mid;
            l = mid + 1;
          } else {
            r = mid - 1;
          }
        }

        if (first <= last) {
          ans += (last - first + 1);
        }
      }
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
