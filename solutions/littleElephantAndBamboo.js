const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const h = [];
    for (let i = 0; i < n; i++) h.push(parseInt(input[ptr++], 10));
    const d = [];
    for (let i = 0; i < n; i++) d.push(parseInt(input[ptr++], 10));
    if (n === 1) {
      out.push(h[0] >= d[0] ? h[0] - d[0] : -1);
      continue;
    }
    if (n === 2) {
      if (h[0] + h[1] === d[0] + d[1] && d[0] >= h[0]) {
        out.push(d[0] - h[0]);
      } else {
        out.push(-1);
      }
      continue;
    }
    let sumH = 0;
    let sumD = 0;
    for (let i = 0; i < n; i++) {
      sumH += h[i];
      sumD += d[i];
    }
    const diff = sumD - sumH;
    if (diff < 0 || diff % (n - 2) !== 0) {
      out.push(-1);
      continue;
    }
    const k = Math.floor(diff / (n - 2));
    let ok = true;
    let sumC = 0;
    for (let i = 0; i < n; i++) {
      const val = k - (d[i] - h[i]);
      if (val < 0 || val % 2 !== 0) {
        ok = false;
        break;
      }
      sumC += val / 2;
    }
    if (ok && sumC === k) {
      out.push(k);
    } else {
      out.push(-1);
    }
  }
  console.log(out.join('\n'));
}

solve();
