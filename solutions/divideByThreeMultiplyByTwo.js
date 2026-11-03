const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(BigInt(tokens[ptr++]));
  }

  function countFactors(val, f) {
    let cnt = 0;
    while (val % f === 0n) {
      cnt++;
      val /= f;
    }
    return cnt;
  }

  arr.sort((a, b) => {
    const a3 = countFactors(a, 3n);
    const b3 = countFactors(b, 3n);
    if (a3 !== b3) {
      return b3 - a3;
    }
    const a2 = countFactors(a, 2n);
    const b2 = countFactors(b, 2n);
    return a2 - b2;
  });

  console.log(arr.join(' '));
}

solve();
