const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    const m = BigInt(input[ptr++]);
    const l = BigInt(input[ptr++]);

    if (n === 0n) {
      out.push(m.toString());
    } else {
      const rem = m % (l + n - 1n);
      if (rem >= l) {
        out.push('0');
      } else {
        out.push(rem.toString());
      }
    }
  }

  console.log(out.join('\n'));
}

function main() {}

solve();
