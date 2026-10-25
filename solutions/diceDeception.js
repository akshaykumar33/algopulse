const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const n = parseInt(input[idx++], 10);
    let k = parseInt(input[idx++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(input[idx++], 10));

    a.sort((x, y) => x - y);
    let sum = 0;
    for (let i = 0; i < n; i++) {
      if (k > 0 && a[i] < 7 - a[i]) {
        sum += (7 - a[i]);
        k--;
      } else {
        sum += a[i];
      }
    }
    out.push(sum);
  }
  console.log(out.join('\n'));
}

solve();
