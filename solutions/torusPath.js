const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);

  let sum = 0n;
  let minDiag = -1n;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const v = BigInt(tokens[ptr++]);
      sum += v;
      if (j === n - 1 - i) {
        if (minDiag === -1n || v < minDiag) {
          minDiag = v;
        }
      }
    }
  }

  const ans = sum - minDiag;
  console.log(ans.toString());
}

solve();
