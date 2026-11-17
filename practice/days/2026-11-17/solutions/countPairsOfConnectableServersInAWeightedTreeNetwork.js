function countPairsOfConnectableServers(edges, signalSpeed) {
  const n = edges.length + 1;
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v, w] of edges) {
    adj[u].push([v, w]);
    adj[v].push([u, w]);
  }
  const ans = new Array(n).fill(0);
  for (let c = 0; c < n; c++) {
    let sum = 0;
    for (const [nbr, w] of adj[c]) {
      let count = 0;
      const dfs = (u, p, d) => {
        if (d % signalSpeed === 0) count++;
        for (const [v, weight] of adj[u]) {
          if (v !== p) {
            dfs(v, u, d + weight);
          }
        }
      };
      dfs(nbr, c, w);
      ans[c] += sum * count;
      sum += count;
    }
  }
  return ans;
}

const solve = countPairsOfConnectableServers;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === 2 && Array.isArray(parsed[0]) && typeof parsed[1] === 'number') {
        console.log(JSON.stringify(solve(parsed[0], parsed[1])));
      } else if (Array.isArray(parsed)) {
        console.log(JSON.stringify(solve(...parsed)));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}

module.exports = { countPairsOfConnectableServers, solve };
