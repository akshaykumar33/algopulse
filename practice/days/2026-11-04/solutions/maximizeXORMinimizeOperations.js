const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = BigInt(input[ptr++]);
    const b = BigInt(input[ptr++]);
    const sum = a + b;

    let finalA = 0n;
    for (let i = 62n; i >= 0n; i--) {
      if ((sum >> i) & 1n) {
        const nextA = finalA | (1n << i);
        if (nextA <= a) {
          finalA = nextA;
        }
      }
    }

    const ops = a - finalA;
    out.push(`${sum} ${ops}`);
  }

  console.log(out.join('\n'));
}

solve();

