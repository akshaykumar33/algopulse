const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const x = new Int32Array(n);
  const h = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    x[i] = parseInt(tokens[ptr++], 10);
    h[i] = parseInt(tokens[ptr++], 10);
  }

  if (n === 1) {
    console.log(1);
    return;
  }

  let ans = 2;
  let last = x[0];
  for (let i = 1; i < n - 1; i++) {
    if (x[i] - h[i] > last) {
      ans++;
      last = x[i];
    } else if (x[i] + h[i] < x[i + 1]) {
      ans++;
      last = x[i] + h[i];
    } else {
      last = x[i];
    }
  }

  console.log(ans);
}

solve();
