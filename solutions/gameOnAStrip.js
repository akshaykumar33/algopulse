const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const segs = [];
    let cur = 0;
    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      if (v === 0) cur++;
      else {
        if (cur > 0) { segs.push(cur); cur = 0; }
      }
    }
    if (cur > 0) segs.push(cur);
    segs.sort((a, b) => b - a);
    if (segs.length === 0) {
      out.push('No');
      continue;
    }
    const l1 = segs[0];
    const l2 = segs.length > 1 ? segs[1] : 0;
    if (l1 % 2 === 1 && l2 <= Math.floor((l1 - 1) / 2)) {
      out.push('Yes');
    } else {
      out.push('No');
    }
  }
  console.log(out.join('\n'));
}

solve();
