const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  const [n, m] = input[0].trim().split(/\s+/).map(Number);
  let l = 1;
  let h = n;

  for (let i = 1; i <= m; i++) {
    if (!input[i] || !input[i].trim()) continue;
    const [u, v] = input[i].trim().split(/\s+/).map(Number);
    const minVal = Math.min(u, v);
    const maxVal = Math.max(u, v);
    if (minVal > l) l = minVal;
    if (maxVal < h) h = maxVal;
  }

  if (l >= h) {
    console.log(0);
  } else {
    console.log(h - l);
  }
}

solve();

