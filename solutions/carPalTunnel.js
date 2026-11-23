const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let maxA = 0;
    for (let i = 0; i < n; i++) {
      const v = parseFloat(input[ptr++]);
      if (v > maxA) maxA = v;
    }
    const c = parseFloat(input[ptr++]);
    const d = parseFloat(input[ptr++]);
    const s = parseFloat(input[ptr++]);
    const ans = (c - 1) * maxA;
    out.push(ans.toFixed(9));
  }
  console.log(out.join('\n'));
}

solve();
