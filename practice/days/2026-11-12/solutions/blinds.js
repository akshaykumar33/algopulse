const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const l = parseInt(tokens[ptr++], 10);
  const arr = new Int32Array(n);
  let maxA = 0;
  for (let i = 0; i < n; i++) {
    const v = parseInt(tokens[ptr++], 10);
    arr[i] = v;
    if (v > maxA) maxA = v;
  }
  let ans = 0;
  for (let d = l; d <= maxA; d++) {
    let cnt = 0;
    for (let i = 0; i < n; i++) {
      cnt += (arr[i] / d) | 0;
    }
    const area = cnt * d;
    if (area > ans) ans = area;
  }
  console.log(ans);
}

solve();
