const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input.length || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (ptr >= input.length) break;
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const q = parseInt(input[ptr++], 10);

    const b = new Int32Array(m);
    for (let i = 0; i < m; i++) {
      b[i] = parseInt(input[ptr++], 10);
    }
    b.sort();

    for (let i = 0; i < q; i++) {
      const a = parseInt(input[ptr++], 10);

      if (a < b[0]) {
        out.push(b[0] - 1);
      } else if (a > b[m - 1]) {
        out.push(n - b[m - 1]);
      } else {
        let low = 0;
        let high = m - 1;
        let idx = m - 1;
        while (low <= high) {
          const mid = (low + high) >> 1;
          if (b[mid] > a) {
            idx = mid;
            high = mid - 1;
          } else {
            low = mid + 1;
          }
        }
        const bL = b[idx - 1];
        const bR = b[idx];
        out.push(Math.floor((bR - bL) / 2));
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
