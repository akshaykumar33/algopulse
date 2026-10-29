const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input[0] === '') return;

  const n = parseInt(input[0], 10);
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = parseInt(input[i + 1], 10);
  }

  a.sort();

  let maxLen = 0;
  let l = 0;
  for (let r = 0; r < n; r++) {
    while (a[r] - a[l] > 5) {
      l++;
    }
    const len = r - l + 1;
    if (len > maxLen) {
      maxLen = len;
    }
  }

  console.log(maxLen);
}

solve();
