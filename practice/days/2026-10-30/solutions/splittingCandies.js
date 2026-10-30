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

    if (k === 0n) {
      out.push(`0 ${n.toString()}`);
    } else {
      const perStudent = n / k;
      const rem = n % k;
      out.push(`${perStudent.toString()} ${rem.toString()}`);
    }
  }

  console.log(out.join('\n'));
}

solve();

