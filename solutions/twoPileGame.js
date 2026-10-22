const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const x = BigInt(input[ptr++]);
    const y = BigInt(input[ptr++]);
    if (x % 2n !== 0n) {
      out.push('Alice');
    } else {
      out.push('Bob');
    }
  }

  console.log(out.join('\n'));
}

solve();
