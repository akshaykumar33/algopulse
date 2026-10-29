const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    if ((n + 1n) % 4n === 0n) {
      out.push((n + 1n).toString());
    } else if ((n + 1n) % 2n === 0n) {
      out.push((2n * n + 1n).toString());
    } else {
      out.push((4n * n + 1n).toString());
    }
  }
  console.log(out.join('\n'));
}

solve();
