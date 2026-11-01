const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(parseInt(tokens[ptr++], 10));
    }
    arr.sort((a, b) => a - b);
    let minDiff = Infinity;
    for (let i = 0; i < n - 1; i++) {
      const diff = arr[i + 1] - arr[i];
      if (diff < minDiff) {
        minDiff = diff;
      }
    }
    out.push(minDiff);
  }
  console.log(out.join('\n'));
}

solve();

