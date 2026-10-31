const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = parseInt(tokens[ptr++], 10);
  }

  let l = 0, r = n - 1;
  let prev = 0;
  const res = [];

  while (l <= r) {
    const leftOk = a[l] > prev;
    const rightOk = a[r] > prev;

    if (leftOk && rightOk) {
      if (a[l] < a[r]) {
        res.push('L');
        prev = a[l++];
      } else {
        res.push('R');
        prev = a[r--];
      }
    } else if (leftOk) {
      res.push('L');
      prev = a[l++];
    } else if (rightOk) {
      res.push('R');
      prev = a[r--];
    } else {
      break;
    }
  }

  console.log(`${res.length}\n${res.join('')}`);
}

solve();
