const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++].trim(), 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    while (lineIdx < input.length && !input[lineIdx].trim()) lineIdx++;
    if (lineIdx >= input.length) break;
    const [n, m] = input[lineIdx++].trim().split(/\s+/).map(Number);
    const adj = Array.from({ length: n }, () => []);

    for (let i = 0; i < m; i++) {
      const [u, v] = input[lineIdx++].trim().split(/\s+/).map(Number);
      adj[u - 1].push(v - 1);
      adj[v - 1].push(u - 1);
    }

    const color = new Int32Array(n).fill(-1);
    let totalAns = 0;

    for (let i = 0; i < n; i++) {
      if (color[i] !== -1) continue;

      const q = [i];
      let head = 0;
      color[i] = 0;
      let cnt0 = 1;
      let cnt1 = 0;
      let isBipartite = true;

      while (head < q.length) {
        const u = q[head++];
        const neighbors = adj[u];
        for (let j = 0; j < neighbors.length; j++) {
          const v = neighbors[j];
          if (color[v] === -1) {
            color[v] = color[u] ^ 1;
            if (color[v] === 0) cnt0++;
            else cnt1++;
            q.push(v);
          } else if (color[v] === color[u]) {
            isBipartite = false;
          }
        }
      }

      if (isBipartite) {
        totalAns += Math.max(cnt0, cnt1);
      }
    }

    out.push(totalAns);
  }

  console.log(out.join('\n'));
}

solve();
