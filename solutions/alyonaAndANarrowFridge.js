const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const h = parseInt(input[ptr++], 10);

  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);

  let ans = 0;
  for (let k = 1; k <= n; k++) {
    const sub = [];
    for (let i = 0; i < k; i++) sub.push(a[i]);
    sub.sort((x, y) => y - x);

    let req = 0;
    for (let i = 0; i < k; i += 2) {
      req += sub[i];
    }

    if (req <= h) {
      ans = k;
    } else {
      break;
    }
  }

  console.log(ans);
}

solve();
