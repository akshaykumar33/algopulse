const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = BigInt(input[ptr++]);
    const b = BigInt(input[ptr++]);
    const c = BigInt(input[ptr++]);

    let minTime = -1n;
    for (let i = 0; i < n; i++) {
      const f = BigInt(input[ptr++]);
      const diff1 = b >= f ? b - f : f - b;
      const diff2 = f >= a ? f - a : a - f;
      const cur = diff1 + diff2 + c;
      if (minTime === -1n || cur < minTime) {
        minTime = cur;
      }
    }
    out.push(minTime.toString());
  }
  console.log(out.join('\n'));
}

solve();
