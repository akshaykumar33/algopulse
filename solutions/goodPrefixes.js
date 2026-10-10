const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
  if (!input.length) return;
  const t = parseInt(input[0], 10);
  const out = [];
  let idx = 1;
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[idx++], 10);
    const a = input[idx++].trim().split(/\s+/).map(BigInt);
    let sum = 0n;
    let maxVal = 0n;
    let cnt = 0;
    for (let i = 0; i < n; i++) {
      sum += a[i];
      if (a[i] > maxVal) {
        maxVal = a[i];
      }
      if (sum === 2n * maxVal) {
        cnt++;
      }
    }
    out.push(cnt);
  }
  console.log(out.join('\n'));
}

solve();
