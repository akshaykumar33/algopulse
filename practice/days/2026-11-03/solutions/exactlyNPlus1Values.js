const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const n = parseInt(tokens[ptr++], 10);
    const target = 1n << BigInt(n);
    const ans = [];
    let currentSum = 0n;
    for (let j = 0; j < n - 1; j++) {
      ans.push(1n);
      currentSum += 1n;
    }
    const rem = target - currentSum;
    ans.push(rem / 2n);
    ans.push(rem - rem / 2n);
    out.push(ans.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
