const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    let k = BigInt(tokens[ptr++]);
    let digits = [];
    while (k > 0n) {
      let rem = Number(k % 9n);
      if (rem >= 4) rem++;
      digits.push(rem);
      k /= 9n;
    }
    digits.reverse();
    out.push(digits.join(''));
  }

  console.log(out.join('\n'));
}

solve();
