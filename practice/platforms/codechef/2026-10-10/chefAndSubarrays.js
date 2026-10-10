const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
  if (!input.length) return;
  const t = parseInt(input[0], 10);
  const out = [];
  let idx = 1;
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[idx++], 10);
    const a = input[idx++].trim().split(/\s+/).map(Number);
    let cnt = 0;
    for (let i = 0; i < n; i++) {
      let sum = 0;
      let prod = 1;
      for (let j = i; j < n; j++) {
        sum += a[j];
        prod *= a[j];
        if (sum === prod) {
          cnt++;
        }
      }
    }
    out.push(cnt);
  }
  console.log(out.join('\n'));
}

solve();
