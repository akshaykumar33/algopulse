const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const A = BigInt(input[ptr++]);
    let B = BigInt(input[ptr++]);
    const K = BigInt(input[ptr++]);

    let ops = 0n;
    while (true) {
      if (B / K < A) {
        ops += B - A;
        break;
      }
      const rem = B % K;
      if (rem !== 0n) {
        ops += rem;
        B -= rem;
      } else {
        B /= K;
        ops += 1n;
      }
    }
    out.push(ops.toString());
  }

  console.log(out.join('\n'));
}

solve();
