const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input.length || input[0] === '') return;
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (lineIdx >= input.length) break;
    const n = parseInt(input[lineIdx++], 10);
    const a = input[lineIdx++].trim().split(/\s+/).map(Number);
    let mx = a[0];
    let allSame = true;
    for (let i = 1; i < n; i++) {
      if (a[i] > mx) mx = a[i];
      if (a[i] !== a[0]) allSame = false;
    }
    if (allSame) {
      out.push(-1);
      continue;
    }
    let ans = -1;
    for (let i = 0; i < n; i++) {
      if (a[i] === mx) {
        if ((i > 0 && a[i - 1] < mx) || (i < n - 1 && a[i + 1] < mx)) {
          ans = i + 1;
          break;
        }
      }
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
