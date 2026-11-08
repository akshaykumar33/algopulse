const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);

    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }

    let oddCount = 0;
    for (let i = 0; i < k; i++) {
      if ((a[i] & 1) === 1) {
        oddCount++;
      }
    }

    let count = oddCount > 0 ? 1 : 0;
    for (let i = k; i < n; i++) {
      if ((a[i] & 1) === 1) {
        oddCount++;
      }
      if ((a[i - k] & 1) === 1) {
        oddCount--;
      }
      if (oddCount > 0) {
        count++;
      }
    }

    out.push(count);
  }

  console.log(out.join('\n'));
}

solve();
