const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);

    const a = new Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(input[ptr++], 10);
    }

    const b = new Array(m);
    for (let j = 0; j < m; j++) {
      b[j] = parseInt(input[ptr++], 10);
    }

    b.sort((x, y) => x - y);

    let ans = 0;
    for (let i = 0; i < n; i++) {
      const val = a[i];
      let low = 0;
      let high = m;
      while (low < high) {
        const mid = (low + high) >> 1;
        if (b[mid] < val) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      ans += low;
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
