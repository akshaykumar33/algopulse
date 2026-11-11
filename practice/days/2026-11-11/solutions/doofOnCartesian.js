const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  let arr = new Int32Array(200005);

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    if (n > arr.length) arr = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = parseInt(tokens[ptr++], 10);
    }

    const q = parseInt(tokens[ptr++], 10);
    for (let j = 0; j < q; j++) {
      const x = parseInt(tokens[ptr++], 10);
      const y = parseInt(tokens[ptr++], 10);
      const s = x + y;

      let lo = 0;
      let hi = n;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (arr[mid] < s) lo = mid + 1;
        else hi = mid;
      }

      if (lo < n && arr[lo] === s) {
        out.push(-1);
      } else {
        out.push(lo);
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
