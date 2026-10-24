const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);

    const deg = new Int32Array(n + 1);
    const adj = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < m; i++) {
      const u = parseInt(input[ptr++], 10);
      const v = parseInt(input[ptr++], 10);
      deg[u]++;
      deg[v]++;
      adj[u].push(v);
      adj[v].push(u);
    }

    let leaf = 1;
    for (let i = 1; i <= n; i++) {
      if (deg[i] === 1) {
        leaf = i;
        break;
      }
    }

    const p1 = adj[leaf][0];
    const y = deg[p1] - 1;

    let center = -1;
    for (const neighbor of adj[p1]) {
      if (deg[neighbor] > 1) {
        center = neighbor;
        break;
      }
    }

    const x = deg[center];
    out.push(`${x} ${y}`);
  }

  console.log(out.join('\n'));
}

solve();
