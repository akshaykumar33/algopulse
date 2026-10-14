const fs = require('fs');

const MOD = 1000000007n;

const solve = () => {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const parts = input[ptr++].trim().split(/\s+/);
    const n = BigInt(parts[0]);
    let k = BigInt(parts[1]);

    let ans = 0n;
    let cur = 1n;

    while (k > 0n) {
      if ((k & 1n) === 1n) {
        ans = (ans + cur) % MOD;
      }
      cur = (cur * n) % MOD;
      k >>= 1n;
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
};

solve();
