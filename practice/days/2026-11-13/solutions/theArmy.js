const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const m = Number(input[ptr++]);
    let mn = n;
    let mx = -1;
    for (let j = 0; j < m; j++) {
      const pos = Number(input[ptr++]);
      if (pos < mn) mn = pos;
      if (pos > mx) mx = pos;
    }
    const res = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      const d1 = Math.abs(i - mn);
      const d2 = Math.abs(i - mx);
      res[i] = d1 > d2 ? d1 : d2;
    }
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

function main() {}

solve();
