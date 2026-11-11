const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = parseInt(tokens[ptr++], 10);
  }
  const x = parseInt(tokens[ptr++], 10);
  const f = parseInt(tokens[ptr++], 10);

  let ans = 0;
  const step = x + f;
  for (let i = 0; i < n; i++) {
    if (a[i] > x) {
      ans += Math.floor((a[i] + f - 1) / step) * f;
    }
  }

  console.log(ans);
}

solve();
