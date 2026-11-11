const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  let arr = new Int32Array(300005);

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    if (n > arr.length) arr = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = parseInt(tokens[ptr++], 10);
    }

    const half = n >> 1;
    if (half === 0) {
      out.push(0);
      continue;
    }

    const firstDiff = arr[n - 1] - arr[0];
    if (firstDiff < 0) {
      out.push(-1);
      continue;
    }

    let prev = firstDiff;
    let ok = true;
    for (let i = 1; i < half; i++) {
      const diff = arr[n - 1 - i] - arr[i];
      if (diff < 0 || diff > prev) {
        ok = false;
        break;
      }
      prev = diff;
    }

    out.push(ok ? firstDiff : -1);
  }

  console.log(out.join('\n'));
}

solve();
