const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const l = BigInt(input[ptr++]);
    const r = BigInt(input[ptr++]);

    if ((l & 1n) === 0n) {
      out.push(`${l} ${l + 1n} ${l + 2n} ${l + 3n}`);
    } else if (l + 4n <= r) {
      out.push(`${l + 1n} ${l + 2n} ${l + 3n} ${l + 4n}`);
    } else {
      out.push('-1');
    }
  }

  console.log(out.join('\n'));
}

solve();

