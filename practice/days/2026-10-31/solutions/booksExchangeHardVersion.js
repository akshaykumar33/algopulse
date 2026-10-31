const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const q = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let query = 0; query < q; query++) {
    const n = parseInt(tokens[ptr++], 10);
    const p = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      p[i] = parseInt(tokens[ptr++], 10) - 1;
    }

    const ans = new Int32Array(n);
    const vis = new Uint8Array(n);

    for (let i = 0; i < n; i++) {
      if (!vis[i]) {
        const cycle = [];
        let cur = i;
        while (!vis[cur]) {
          vis[cur] = 1;
          cycle.push(cur);
          cur = p[cur];
        }
        const len = cycle.length;
        for (let j = 0; j < len; j++) {
          ans[cycle[j]] = len;
        }
      }
    }

    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
