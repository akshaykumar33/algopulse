const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const x = BigInt(input[ptr++]);
    const r = BigInt(input[ptr++]);
    const m = BigInt(input[ptr++]);
    if (r > m) {
      out.push('NO');
      continue;
    }
    const runSec = 60n * r;
    const maxSec = 60n * m;
    let timeNeeded = 0n;
    if (runSec <= x) {
      timeNeeded = runSec;
    } else {
      timeNeeded = 2n * runSec - x;
    }
    out.push(timeNeeded <= maxSec ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}

solve();
