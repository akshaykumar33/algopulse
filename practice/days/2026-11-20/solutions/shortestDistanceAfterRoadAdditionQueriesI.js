var shortestDistanceAfterQueries = function(n, queries) {
  const adj = Array.from({ length: n }, () => []);
  for (let i = 0; i < n - 1; i++) adj[i].push(i + 1);
  const ans = [];
  for (const [u, v] of queries) {
    adj[u].push(v);
    const dist = new Int32Array(n).fill(-1);
    dist[0] = 0;
    const q = [0];
    let head = 0;
    while (head < q.length) {
      const cur = q[head++];
      if (cur === n - 1) break;
      for (const nxt of adj[cur]) {
        if (dist[nxt] === -1) {
          dist[nxt] = dist[cur] + 1;
          q.push(nxt);
        }
      }
    }
    ans.push(dist[n - 1]);
  }
  return ans;
};

var solve = shortestDistanceAfterQueries;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = shortestDistanceAfterQueries;