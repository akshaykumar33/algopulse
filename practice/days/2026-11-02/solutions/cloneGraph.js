function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
}

var cloneGraph = function(node) {
  if (!node) return null;
  const visited = new Map();
  function dfs(curr) {
    if (visited.has(curr)) return visited.get(curr);
    const copy = new Node(curr.val);
    visited.set(curr, copy);
    for (const neighbor of curr.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }
    return copy;
  }
  return dfs(node);
};

var solve = typeof cloneGraph !== 'undefined' ? cloneGraph : null;

if (require.main === module) {
  function buildGraph(adj) {
    if (!adj || adj.length === 0) return null;
    const nodes = adj.map((_, i) => new Node(i + 1));
    for (let i = 0; i < adj.length; i++) {
      for (const v of adj[i]) {
        nodes[i].neighbors.push(nodes[v - 1]);
      }
    }
    return nodes[0];
  }

  function graphToAdj(node) {
    if (!node) return [];
    const map = new Map();
    const q = [node];
    map.set(node.val, []);
    while (q.length > 0) {
      const cur = q.shift();
      map.set(cur.val, cur.neighbors.map((n) => n.val));
      for (const n of cur.neighbors) {
        if (!map.has(n.val)) {
          map.set(n.val, []);
          q.push(n);
        }
      }
    }
    const res = [];
    for (let i = 1; i <= map.size; i++) {
      res.push(map.get(i) || []);
    }
    return res;
  }

  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const parsed = JSON.parse(line);
      const root = buildGraph(parsed);
      const cloned = cloneGraph(root);
      console.log(JSON.stringify(graphToAdj(cloned)));
    }
  }
}

