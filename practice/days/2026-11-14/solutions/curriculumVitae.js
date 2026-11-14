const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  const n = parseInt(input[0], 10);
  const a = [];
  for (let i = 0; i < n; i++) a.push(parseInt(input[1 + i], 10));

  const pref0 = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) {
    pref0[i + 1] = pref0[i] + (a[i] === 0 ? 1 : 0);
  }

  const suff1 = new Int32Array(n + 1);
  for (let i = n - 1; i >= 0; i--) {
    suff1[i] = suff1[i + 1] + (a[i] === 1 ? 1 : 0);
  }

  let maxLen = 0;
  for (let i = 0; i <= n; i++) {
    const total = pref0[i] + suff1[i];
    if (total > maxLen) maxLen = total;
  }

  console.log(maxLen);
}

solve();
