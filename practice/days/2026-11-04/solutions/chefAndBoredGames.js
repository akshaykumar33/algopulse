const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let ans = 0;
    for (let k = 1; k <= n; k += 2) {
      const side = n - k + 1;
      ans += side * side;
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
