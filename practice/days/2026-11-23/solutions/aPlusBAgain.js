const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let ans = 0.5 * n;
    if (n < 25) {
      ans -= (1 - Math.pow(0.1, n)) / 18;
    } else {
      ans -= 1 / 18;
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
