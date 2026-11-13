const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const m = 1000000n;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x = BigInt(input[ptr++]);
    if (x <= 1n) {
      out.push('-1');
    } else if (x <= 1000001n) {
      out.push(`1 1 ${x - 1n}`);
    } else {
      const rem = x % m;
      if (rem === 0n) {
        out.push(`${m} ${x / m - 1n} ${m}`);
      } else {
        out.push(`${m} ${x / m} ${rem}`);
      }
    }
  }

  console.log(out.join('\n'));
}

function main() {}

solve();
