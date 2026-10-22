const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let idx = 0;
  const t = parseInt(input[idx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[idx++], 10);
    const s = parseInt(input[idx++], 10);
    const p = [];
    for (let i = 0; i < n; i++) {
      p.push(parseInt(input[idx++], 10));
    }
    let min0 = Infinity;
    let min1 = Infinity;
    for (let i = 0; i < n; i++) {
      const type = parseInt(input[idx++], 10);
      if (type === 0) {
        if (p[i] < min0) min0 = p[i];
      } else {
        if (p[i] < min1) min1 = p[i];
      }
    }

    if (s + min0 + min1 <= 100) {
      out.push('yes');
    } else {
      out.push('no');
    }
  }

  console.log(out.join('\n'));
}

solve();
