var maximalNetworkRank = function(n, roads) {
    const adj = Array.from({ length: n }, () => new Set());
    for (const [u, v] of roads) {
        adj[u].add(v);
        adj[v].add(u);
    }
    let maxRank = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            let rank = adj[i].size + adj[j].size;
            if (adj[i].has(j)) {
                rank--;
            }
            if (rank > maxRank) {
                maxRank = rank;
            }
        }
    }
    return maxRank;
};
var solve = typeof maximalNetworkRank !== 'undefined' ? maximalNetworkRank : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const n = JSON.parse(lines[i]);
        const roads = JSON.parse(lines[i+1]);
        console.log(JSON.stringify(solve(n, roads)));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
