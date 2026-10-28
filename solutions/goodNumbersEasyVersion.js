const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const q = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < q; tc++) {
    let n = BigInt(tokens[ptr++]);
    const digits = [];
    let temp = n;
    while (temp > 0n) {
      digits.push(Number(temp % 3n));
      temp /= 3n;
    }
    digits.push(0);

    let last2 = -1;
    for (let i = digits.length - 1; i >= 0; i--) {
      if (digits[i] === 2) {
        last2 = i;
        break;
      }
    }

    if (last2 === -1) {
      out.push(n.toString());
      continue;
    }

    let pos = -1;
    for (let i = last2 + 1; i < digits.length; i++) {
      if (digits[i] === 0) {
        pos = i;
        break;
      }
    }

    digits[pos] = 1;
    for (let i = 0; i < pos; i++) {
      digits[i] = 0;
    }

    let ans = 0n;
    let power = 1n;
    for (let i = 0; i < digits.length; i++) {
      if (digits[i] === 1) {
        ans += power;
      }
      power *= 3n;
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();

