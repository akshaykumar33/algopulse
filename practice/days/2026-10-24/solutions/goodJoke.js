const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let n = parseInt(input[ptr++], 10);
    ptr += 2 * n;
    let rem = n % 4;
    let ans = 0;
    if (rem === 0) ans = n;
    else if (rem === 1) ans = 1;
    else if (rem === 2) ans = n + 1;
    else ans = 0;
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
