const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let k = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    const freq = new Map();
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
      freq.set(a[i], (freq.get(a[i]) || 0) + 1);
    }

    const first = a[0];
    const available = [];
    for (const [val, count] of freq) {
      if (val !== first) available.push(count);
    }
    available.sort((x, y) => x - y);

    let ans = freq.size;
    for (let i = 0; i < available.length; i++) {
      if (available[i] <= k) {
        ans--;
        k -= available[i];
      } else {
        break;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
