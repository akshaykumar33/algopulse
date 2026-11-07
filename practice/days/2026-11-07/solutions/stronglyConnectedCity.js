const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length < 4 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  const m = parseInt(tokens[1], 10);
  const horiz = tokens[2];
  const vert = tokens[3];

  const total = n * m;
  const adj = Array.from({ length: total }, () => []);

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      const u = r * m + c;
      if (horiz[r] === '>') {
        if (c + 1 < m) adj[u].push(r * m + (c + 1));
      } else {
        if (c - 1 >= 0) adj[u].push(r * m + (c - 1));
      }
      if (vert[c] === 'v') {
        if (r + 1 < n) adj[u].push((r + 1) * m + c);
      } else {
        if (r - 1 >= 0) adj[u].push((r - 1) * m + c);
      }
    }
  }

  for (let start = 0; start < total; start++) {
    const vis = new Uint8Array(total);
    const q = [start];
    vis[start] = 1;
    let head = 0;
    while (head < q.length) {
      const u = q[head++];
      for (let i = 0; i < adj[u].length; i++) {
        const v = adj[u][i];
        if (!vis[v]) {
          vis[v] = 1;
          q.push(v);
        }
      }
    }
    if (q.length !== total) {
      console.log('NO');
      return;
    }
  }

  console.log('YES');
}

solve();
