const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let idx = 0;
  const t = parseInt(input[idx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[idx++], 10);
    const s = input[idx++];

    let cur = 0;
    const gains = [];

    for (let i = 0; i < n; i++) {
      const l = i;
      const r = n - 1 - i;
      if (s[i] === 'L') {
        cur += l;
        if (r > l) gains.push(r - l);
      } else {
        cur += r;
        if (l > r) gains.push(l - r);
      }
    }

    gains.sort((a, b) => b - a);
    const res = [];
    let add = 0;
    for (let k = 0; k < n; k++) {
      if (k < gains.length) add += gains[k];
      res.push(cur + add);
    }

    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
