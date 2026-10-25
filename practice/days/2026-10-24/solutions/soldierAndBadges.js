const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input.length || !input[0]) return;
  const n = parseInt(input[0], 10);
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = parseInt(input[i + 1], 10);
  }
  a.sort();

  let coins = 0;
  let last = 0;
  for (let i = 0; i < n; i++) {
    if (a[i] <= last) {
      coins += (last + 1) - a[i];
      last = last + 1;
    } else {
      last = a[i];
    }
  }

  console.log(coins);
}

solve();
