var networkBecomesIdle = function(edges, patience) {
  const n = patience.length;
  const adj = Array.from({ length: n }, () => []);
  for (let i = 0; i < edges.length; i++) {
    const u = edges[i][0];
    const v = edges[i][1];
    adj[u].push(v);
    adj[v].push(u);
  }
  const dist = new Int32Array(n).fill(-1);
  dist[0] = 0;
  const q = new Int32Array(n);
  q[0] = 0;
  let head = 0, tail = 1;
  while (head < tail) {
    const u = q[head++];
    const d = dist[u] + 1;
    const neighbors = adj[u];
    for (let i = 0; i < neighbors.length; i++) {
      const v = neighbors[i];
      if (dist[v] === -1) {
        dist[v] = d;
        q[tail++] = v;
      }
    }
  }
  let maxTime = 0;
  for (let i = 1; i < n; i++) {
    const roundTrip = dist[i] * 2;
    const p = patience[i];
    const lastSend = Math.floor((roundTrip - 1) / p) * p;
    const lastReply = lastSend + roundTrip;
    if (lastReply > maxTime) maxTime = lastReply;
  }
  return maxTime + 1;
};

var solve = networkBecomesIdle;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}
module.exports = solve;
