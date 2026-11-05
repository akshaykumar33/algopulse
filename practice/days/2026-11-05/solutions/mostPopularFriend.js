const fs = require('fs');

function solve() {
  const content = fs.readFileSync(0, 'utf-8');
  const lines = content.trim().split(/\r?\n/);
  let lineIdx = 0;
  while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
  if (lineIdx >= lines.length) return;
  const t = parseInt(lines[lineIdx++].trim(), 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
    if (lineIdx >= lines.length) break;
    const n = parseInt(lines[lineIdx++].trim(), 10);
    const adj = Array.from({ length: n + 1 }, () => []);
    for (let i = 1; i <= n; i++) {
      while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
      const parts = lines[lineIdx++].trim().split(/\s+/);
      for (let j = 0; j < parts.length; j++) {
        if (parts[j] !== '') {
          const v = parseInt(parts[j], 10);
          adj[i].push(v);
        }
      }
    }

    let bestId = 1;
    let minSum = Infinity;

    for (let i = 1; i <= n; i++) {
      const dist = new Int32Array(n + 1).fill(-1);
      dist[i] = 0;
      const q = [i];
      let head = 0;
      let sum = 0;
      while (head < q.length) {
        const u = q[head++];
        sum += dist[u];
        for (let j = 0; j < adj[u].length; j++) {
          const v = adj[u][j];
          if (dist[v] === -1) {
            dist[v] = dist[u] + 1;
            q.push(v);
          }
        }
      }
      if (sum < minSum) {
        minSum = sum;
        bestId = i;
      }
    }

    out.push(bestId + ' ' + (minSum / n).toFixed(6));
  }

  console.log(out.join('\n'));
}

solve();
