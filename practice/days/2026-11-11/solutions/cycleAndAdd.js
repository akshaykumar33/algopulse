const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const c = parseInt(tokens[ptr++], 10);
    const b = new Int32Array(n);
    const d = new Int32Array(n);
    for (let i = 0; i < n; i++) b[i] = parseInt(tokens[ptr++], 10);
    for (let i = 0; i < n; i++) d[i] = parseInt(tokens[ptr++], 10);

    const minB = new Int32Array(b);
    let ans = Infinity;
    for (let k = 0; k < n; k++) {
      let sum = k * c;
      for (let j = 0; j < n; j++) {
        if (k > 0) {
          const src = (j - k + n) % n;
          if (b[src] < minB[j]) minB[j] = b[src];
        }
        sum += d[j] * minB[j];
      }
      if (sum < ans) ans = sum;
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
