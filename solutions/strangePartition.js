const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let i = 0; i < t; i++) {
    const n = Number(input[ptr++]);
    const x = BigInt(input[ptr++]);
    let sum = 0n;
    let maxAns = 0n;

    for (let j = 0; j < n; j++) {
      const v = BigInt(input[ptr++]);
      sum += v;
      maxAns += (v + x - 1n) / x;
    }

    const minAns = (sum + x - 1n) / x;
    out.push(`${minAns} ${maxAns}`);
  }

  console.log(out.join('\n'));
}

solve();
