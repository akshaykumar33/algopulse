var findMinHeightTrees = function(n, edges) {
  if (n <= 2) {
    const res = [];
    for (let i = 0; i < n; i++) res.push(i);
    return res;
  }
  const adj = Array.from({ length: n }, () => new Set());
  for (const [u, v] of edges) {
    adj[u].add(v);
    adj[v].add(u);
  }
  let leaves = [];
  for (let i = 0; i < n; i++) {
    if (adj[i].size === 1) leaves.push(i);
  }
  let remaining = n;
  while (remaining > 2) {
    remaining -= leaves.length;
    const nextLeaves = [];
    for (const leaf of leaves) {
      for (const neighbor of adj[leaf]) {
        adj[neighbor].delete(leaf);
        if (adj[neighbor].size === 1) {
          nextLeaves.push(neighbor);
        }
      }
    }
    leaves = nextLeaves;
  }
  return leaves.sort((a, b) => a - b);
};

var solve = typeof findMinHeightTrees !== 'undefined' ? findMinHeightTrees : null;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const parsed = JSON.parse(line);
      console.log(JSON.stringify(findMinHeightTrees(parsed[0], parsed[1])));
    }
  }
}

