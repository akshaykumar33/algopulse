const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);

    let cur = 0;
    let minP = 0;
    let maxP = 0;

    for (let i = 0; i < n; i++) {
      const a = parseInt(input[ptr++], 10);
      cur += a;
      if (cur < minP) minP = cur;
      if (cur > maxP) maxP = cur;
    }

    if (maxP - minP <= k) {
      out.push('Yes');
    } else {
      out.push('No');
    }
  }

  console.log(out.join('\n'));
}

solve();
