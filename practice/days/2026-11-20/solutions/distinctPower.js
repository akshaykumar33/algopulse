const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push({ val: parseInt(input[ptr++], 10), idx: i });
    a.sort((x, y) => x.val - y.val);
    const rank = new Int32Array(n);
    for (let r = 0; r < n; r++) {
      rank[a[r].idx] = r + 1;
    }
    let count = 0;
    for (let i = 0; i < n - 1; i++) {
      if (Math.abs(rank[i] - rank[i + 1]) === 1) count++;
    }
    out.push(n - count);
  }
  console.log(out.join('\n'));
}
solve();