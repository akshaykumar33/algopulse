const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }
    const d = new Int32Array(n);

    for (let i = n; i >= 1; i--) {
      let idx = -1;
      for (let j = 0; j < i; j++) {
        if (a[j] === i) {
          idx = j + 1;
          break;
        }
      }
      const shift = (idx === i) ? 0 : idx;
      d[i - 1] = shift;
      const temp = new Int32Array(i);
      for (let j = 0; j < i; j++) {
        temp[j] = a[(j + shift) % i];
      }
      for (let j = 0; j < i; j++) {
        a[j] = temp[j];
      }
    }

    out.push(Array.from(d).join(' '));
  }
  console.log(out.join('\n'));
}

solve();
