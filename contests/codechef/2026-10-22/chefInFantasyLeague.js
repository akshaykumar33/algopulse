const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const ans = [];
  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const s = Number(input[ptr++]);
    const p = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      p[i] = Number(input[ptr++]);
    }
    let min0 = 1e9;
    let min1 = 1e9;
    for (let i = 0; i < n; i++) {
      const type = Number(input[ptr++]);
      if (type === 0) {
        if (p[i] < min0) min0 = p[i];
      } else {
        if (p[i] < min1) min1 = p[i];
      }
    }
    if (s + min0 + min1 <= 100) {
      ans.push('yes');
    } else {
      ans.push('no');
    }
  }
  console.log(ans.join('\n'));
}

solve();
