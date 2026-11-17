const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);

  let ones = 0n;
  let ans = 0n;

  for (let i = 0; i < n; i++) {
    const x = parseInt(tokens[ptr++], 10);
    if (x === 1) {
      ones++;
    } else {
      ans += ones;
    }
  }

  console.log(ans.toString());
}

solve();
