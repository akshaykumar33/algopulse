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

    let lastBad = -1;
    for (let i = n - 1; i >= 0; i--) {
      if (a[i] !== i + 1) {
        lastBad = i;
        break;
      }
    }
    if (lastBad === -1) {
      out.push(0);
    } else {
      out.push(a[lastBad]);
    }
  }
  console.log(out.join('\n'));
}

solve();
