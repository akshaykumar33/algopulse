const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const n = parseInt(input[idx++], 10);
    const p = [];
    for (let i = 0; i < n; i++) p.push(parseInt(input[idx++], 10));

    let good = 0;
    for (let i = 0; i < n; i++) {
      let isGood = true;
      const start = Math.max(0, i - 5);
      for (let j = start; j < i; j++) {
        if (p[i] >= p[j]) {
          isGood = false;
          break;
        }
      }
      if (isGood) good++;
    }
    out.push(good);
  }
  console.log(out.join('\n'));
}

solve();
