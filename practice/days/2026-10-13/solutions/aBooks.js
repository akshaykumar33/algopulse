const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines.length || !lines[0]) return;
  let idx = 0;
  const t = parseInt(lines[idx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(lines[idx++], 10);
    const a = lines[idx++].trim().split(/\s+/).map(Number);
    const b = new Array(n);

    for (let i = 0; i < n; i++) {
      let low = i + 1;
      let high = n;
      while (low < high) {
        const mid = (low + high) >> 1;
        if (a[mid] > a[i]) {
          high = mid;
        } else {
          low = mid + 1;
        }
      }
      b[i] = n - low;
    }

    out.push(b.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
