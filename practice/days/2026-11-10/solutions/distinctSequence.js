const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let pos = 0;
  const t = parseInt(tokens[pos++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[pos++], 10);
    const s = tokens[pos++];
    const total = 2 * n;

    const idx1 = [];
    const idx0 = [];
    for (let i = 0; i < total; i++) {
      if (s.charCodeAt(i) === 49) {
        idx1.push(i + 1);
      } else {
        idx0.push(i + 1);
      }
    }

    if (idx1.length === 0 || idx1.length === total) {
      out.push('-1');
      continue;
    }

    const res = [];
    if (idx1.length >= n) {
      for (let i = 0; i < n; i++) res.push(idx1[i]);
    } else {
      for (let i = 0; i < idx1.length; i++) res.push(idx1[i]);
      const need = n - idx1.length;
      for (let i = 0; i < need; i++) res.push(idx0[i]);
    }

    res.sort((a, b) => a - b);
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
