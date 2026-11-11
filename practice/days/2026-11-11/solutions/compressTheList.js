const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const arr = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = parseInt(tokens[ptr++], 10);
    }

    const parts = [];
    let i = 0;
    while (i < n) {
      let j = i;
      while (j + 1 < n && arr[j + 1] === arr[j] + 1) {
        j++;
      }
      const len = j - i + 1;
      if (len >= 3) {
        parts.push(arr[i] + '...' + arr[j]);
      } else if (len === 2) {
        parts.push(arr[i], arr[j]);
      } else {
        parts.push(arr[i]);
      }
      i = j + 1;
    }

    out.push(parts.join(','));
  }

  console.log(out.join('\n'));
}

solve();
