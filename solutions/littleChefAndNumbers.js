const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let cValid = 0;
    let c2 = 0;

    for (let i = 0; i < n; i++) {
      const val = parseInt(input[ptr++], 10);
      if (val >= 2) {
        cValid++;
        if (val === 2) {
          c2++;
        }
      }
    }

    const totalPairs = (cValid * (cValid - 1)) / 2;
    const twoPairs = (c2 * (c2 - 1)) / 2;
    out.push(totalPairs - twoPairs);
  }

  console.log(out.join('\n'));
}

solve();
