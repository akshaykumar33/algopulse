var makeConnected = function(n, connections) {
  if (connections.length < n - 1) return -1;

  const parent = new Int32Array(n);
  for (let i = 0; i < n; i++) parent[i] = i;

  function find(x) {
    let root = x;
    while (root !== parent[root]) root = parent[root];
    let cur = x;
    while (cur !== root) {
      const nxt = parent[cur];
      parent[cur] = root;
      cur = nxt;
    }
    return root;
  }

  let components = n;
  for (let i = 0; i < connections.length; i++) {
    const rootU = find(connections[i][0]);
    const rootV = find(connections[i][1]);
    if (rootU !== rootV) {
      parent[rootU] = rootV;
      components--;
    }
  }

  return components - 1;
};

var solve = typeof makeConnected !== 'undefined' ? makeConnected : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const n = JSON.parse(lines[i]);
        const connections = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(n, connections)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

