const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);

  const order = new Int32Array(n + 1);
  const pos = new Int32Array(n + 1);
  const minP = new Int32Array(n + 1);
  const maxP = new Int32Array(n + 1);

  for (let i = 1; i <= n; i++) {
    order[i] = i;
    pos[i] = i;
    minP[i] = i;
    maxP[i] = i;
  }

  for (let i = 0; i < m; i++) {
    const x = parseInt(tokens[ptr++], 10);
    const p = pos[x];
    if (p > 1) {
      const y = order[p - 1];
      order[p - 1] = x;
      order[p] = y;
      pos[x] = p - 1;
      pos[y] = p;
      if (p - 1 < minP[x]) minP[x] = p - 1;
      if (p > maxP[y]) maxP[y] = p;
    }
  }

  const out = new Array(n);
  for (let i = 1; i <= n; i++) {
    out[i - 1] = minP[i] + ' ' + maxP[i];
  }
  console.log(out.join('\n'));
}

solve();
