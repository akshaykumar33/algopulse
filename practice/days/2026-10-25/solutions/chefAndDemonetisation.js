const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const s = parseInt(input[idx++], 10);
    const n = parseInt(input[idx++], 10);

    if (s <= n) {
      if (s === 1 || s % 2 === 0) out.push(1);
      else out.push(2);
    } else {
      const q = Math.floor(s / n);
      const rem = s % n;
      let ans = q;
      if (rem === 0) {
        out.push(ans);
      } else if (rem === 1 || rem % 2 === 0) {
        out.push(ans + 1);
      } else {
        out.push(ans + 2);
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
