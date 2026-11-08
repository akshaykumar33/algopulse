const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const b = parseInt(input[1], 10);
  const a = new Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = parseInt(input[i + 2], 10);
  }

  let ans = b;
  const suff = new Array(n);
  suff[n - 1] = a[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    suff[i] = Math.max(suff[i + 1], a[i]);
  }

  for (let i = 0; i < n; i++) {
    const dollars = Math.floor(b / a[i]);
    const rem = b % a[i];
    const cand = rem + dollars * suff[i];
    if (cand > ans) ans = cand;
  }

  console.log(ans);
}

solve();
