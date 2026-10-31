const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = parseInt(tokens[ptr++], 10);
  }
  a.sort();
  const ans = [];
  for (let i = 0; i < m; i++) {
    const val = parseInt(tokens[ptr++], 10);
    let low = 0, high = n;
    while (low < high) {
      const mid = (low + high) >> 1;
      if (a[mid] <= val) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    ans.push(low);
  }
  console.log(ans.join(' '));
}

solve();
