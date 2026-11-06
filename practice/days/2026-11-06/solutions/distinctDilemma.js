const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    let sum = 0n;
    for (let i = 0; i < n; i++) {
      sum += BigInt(input[ptr++]);
    }

    let k = 0n;
    while ((k + 1n) * (k + 2n) / 2n <= sum) {
      k++;
    }
    out.push(k.toString());
  }

  console.log(out.join('\n'));
}

solve();

