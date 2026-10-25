const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const n = parseInt(input[idx++], 10);
    const k = parseInt(input[idx++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(input[idx++], 10));

    if (n === 1) {
      out.push(a[0] === k ? "Yes" : "No");
    } else {
      let found = false;
      for (let i = 0; i < n - 1; i++) {
        if (a[i] === k) {
          found = true;
          break;
        }
      }
      out.push(found ? "Yes" : "No");
    }
  }
  console.log(out.join('\n'));
}

solve();
