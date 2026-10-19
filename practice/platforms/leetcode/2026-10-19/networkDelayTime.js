var networkDelayTime = function(times, n, k) {
    const adj = Array.from({ length: n + 1 }, () => []);
    for (const [u, v, w] of times) {
        adj[u].push([v, w]);
    }
    const dist = new Array(n + 1).fill(Infinity);
    dist[k] = 0;
    const pq = [[0, k]];
    const vis = new Array(n + 1).fill(false);
    
    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        const [d, u] = pq.shift();
        if (vis[u]) continue;
        vis[u] = true;
        
        for (const [v, w] of adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push([dist[v], v]);
            }
        }
    }
    
    let ans = 0;
    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) return -1;
        if (dist[i] > ans) ans = dist[i];
    }
    return ans;
};

var solve = function(times, n, k) {
    return networkDelayTime(times, n, k);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 3) {
        const times = JSON.parse(lines[i]);
        const n = JSON.parse(lines[i + 1]);
        const k = JSON.parse(lines[i + 2]);
        const result = solve(times, n, k);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
