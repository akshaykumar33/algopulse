const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const n = parseInt(input[idx++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(input[idx++], 10));

    for (let i = 0; i < n - 1; i++) {
      if (i % 2 === 0) {
        if (a[i] > a[i + 1]) {
          const tmp = a[i];
          a[i] = a[i + 1];
          a[i + 1] = tmp;
        }
      } else {
        if (a[i] < a[i + 1]) {
          const tmp = a[i];
          a[i] = a[i + 1];
          a[i + 1] = tmp;
        }
      }
    }
    out.push(a.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
