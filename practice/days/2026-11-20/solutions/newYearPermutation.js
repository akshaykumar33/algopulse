const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);

  const p = new Int32Array(n);
  for (let i = 0; i < n; i++) p[i] = parseInt(input[ptr++], 10);

  const adj = [];
  for (let i = 0; i < n; i++) {
    adj.push(input[ptr++]);
  }

  const visited = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      const idxs = [];
      const q = [i];
      visited[i] = 1;
      let qh = 0;
      while (qh < q.length) {
        const u = q[qh++];
        idxs.push(u);
        for (let v = 0; v < n; v++) {
          if (adj[u][v] === '1' && !visited[v]) {
            visited[v] = 1;
            q.push(v);
          }
        }
      }

      idxs.sort((a, b) => a - b);
      const vals = idxs.map(idx => p[idx]).sort((a, b) => a - b);
      for (let j = 0; j < idxs.length; j++) {
        p[idxs[j]] = vals[j];
      }
    }
  }

  console.log(p.join(' '));
}

solve();
