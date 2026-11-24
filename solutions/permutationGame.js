const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const a = new Int32Array(m);
  for (let i = 0; i < m; i++) a[i] = parseInt(tokens[ptr++], 10);
  const p = new Int32Array(n + 1);
  const used = new Uint8Array(n + 1);
  for (let i = 0; i < m - 1; i++) {
    const u = a[i];
    const v = a[i + 1];
    let req = (v - u + n) % n;
    if (req === 0) req = n;
    if (p[u] !== 0 && p[u] !== req) {
      console.log('-1');
      return;
    }
    p[u] = req;
  }
  for (let i = 1; i <= n; i++) {
    if (p[i] !== 0) {
      if (used[p[i]]) {
        console.log('-1');
        return;
      }
      used[p[i]] = 1;
    }
  }
  let unused = 1;
  for (let i = 1; i <= n; i++) {
    if (p[i] === 0) {
      while (unused <= n && used[unused]) unused++;
      p[i] = unused;
      used[unused] = 1;
    }
  }
  const res = [];
  for (let i = 1; i <= n; i++) res.push(p[i]);
  console.log(res.join(' '));
}

solve();
