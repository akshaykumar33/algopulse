const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const b = new Int32Array(n + 1);
    let root = -1;
    for (let i = 1; i <= n; i++) {
      b[i] = parseInt(input[ptr++], 10);
      if (b[i] === i) root = i;
    }
    const p = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) {
      p[i] = parseInt(input[ptr++], 10);
    }

    if (p[1] !== root) {
      out.push('-1');
      continue;
    }

    const dist = new Int32Array(n + 1).fill(-1);
    dist[root] = 0;
    const w = new Int32Array(n + 1);
    let ok = true;

    for (let i = 2; i <= n; i++) {
      const u = p[i];
      const parent = b[u];
      if (dist[parent] === -1) {
        ok = false;
        break;
      }
      dist[u] = i - 1;
      w[u] = dist[u] - dist[parent];
      if (w[u] <= 0) {
        ok = false;
        break;
      }
    }

    if (!ok) {
      out.push('-1');
    } else {
      const res = [];
      for (let i = 1; i <= n; i++) res.push(w[i]);
      out.push(res.join(' '));
    }
  }
  console.log(out.join('\n'));
}

solve();
