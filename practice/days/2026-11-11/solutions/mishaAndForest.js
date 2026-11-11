const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const deg = new Int32Array(n);
  const xorSum = new Int32Array(n);
  const q = new Int32Array(n);
  let head = 0;
  let tail = 0;

  for (let i = 0; i < n; i++) {
    deg[i] = parseInt(tokens[ptr++], 10);
    xorSum[i] = parseInt(tokens[ptr++], 10);
    if (deg[i] === 1) {
      q[tail++] = i;
    }
  }

  const out = [];
  while (head < tail) {
    const u = q[head++];
    if (deg[u] !== 1) continue;
    const v = xorSum[u];
    out.push(u + ' ' + v);
    deg[u] = 0;
    deg[v]--;
    xorSum[v] ^= u;
    if (deg[v] === 1) {
      q[tail++] = v;
    }
  }

  console.log(out.length + (out.length > 0 ? '\n' + out.join('\n') : ''));
}

solve();
