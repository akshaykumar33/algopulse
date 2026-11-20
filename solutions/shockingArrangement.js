const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const pos = [];
    const neg = [];
    let maxVal = -Infinity;
    let minVal = Infinity;

    for (let i = 0; i < n; i++) {
      const x = parseInt(input[ptr++], 10);
      if (x > maxVal) maxVal = x;
      if (x < minVal) minVal = x;
      if (x >= 0) pos.push(x);
      else neg.push(x);
    }

    if (maxVal === 0 && minVal === 0) {
      out.push('No');
      continue;
    }

    out.push('Yes');
    const res = [];
    let curSum = 0;
    let pIdx = 0;
    let nIdx = 0;

    for (let i = 0; i < n; i++) {
      if (curSum <= 0) {
        if (pIdx < pos.length) {
          res.push(pos[pIdx]);
          curSum += pos[pIdx++];
        } else {
          res.push(neg[nIdx]);
          curSum += neg[nIdx++];
        }
      } else {
        if (nIdx < neg.length) {
          res.push(neg[nIdx]);
          curSum += neg[nIdx++];
        } else {
          res.push(pos[pIdx]);
          curSum += pos[pIdx++];
        }
      }
    }
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
