const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const x = parseInt(tokens[ptr++], 10);

    const a = new Int32Array(n);
    const b = new Int32Array(n);
    const idx = new Int32Array(n);

    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
      idx[i] = i;
    }
    for (let i = 0; i < n; i++) {
      b[i] = parseInt(tokens[ptr++], 10);
    }

    b.sort();
    idx.sort((u, v) => a[u] - a[v]);

    const res = new Int32Array(n);
    for (let k = 0; k < n - x; k++) {
      res[idx[k]] = b[x + k];
    }
    for (let k = 0; k < x; k++) {
      res[idx[n - x + k]] = b[k];
    }

    let cnt = 0;
    for (let i = 0; i < n; i++) {
      if (a[i] > res[i]) cnt++;
    }

    if (cnt === x) {
      out.push('YES');
      out.push(res.join(' '));
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();
