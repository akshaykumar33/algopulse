const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    const k = BigInt(input[ptr++]);

    const m = (n * (n + 1n)) / 2n;
    if (k < m) {
      out.push('-1');
      continue;
    }

    const countOnes = Number(n) - 1;
    const last = (k - m + 1n).toString();
    const arr = [];
    for (let i = 0; i < countOnes; i++) {
      arr.push('1');
    }
    arr.push(last);
    out.push(arr.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
