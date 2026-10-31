const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const d = parseInt(tokens[ptr++], 10);

  const total = n * m;
  const a = new Int32Array(total);

  for (let i = 0; i < total; i++) {
    a[i] = parseInt(tokens[ptr++], 10);
  }

  const rem = a[0] % d;
  for (let i = 1; i < total; i++) {
    if (a[i] % d !== rem) {
      console.log(-1);
      return;
    }
  }

  a.sort();

  const med = a[Math.floor(total / 2)];
  let ans = 0;

  for (let i = 0; i < total; i++) {
    ans += Math.abs(a[i] - med) / d;
  }

  console.log(ans);
}

solve();
