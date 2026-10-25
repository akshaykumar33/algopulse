var removeStones = function(stones) {
  const n = stones.length;
  const parent = new Int32Array(n);
  for (let i = 0; i < n; i++) parent[i] = i;

  function find(i) {
    let root = i;
    while (root !== parent[root]) root = parent[root];
    let curr = i;
    while (curr !== root) {
      const next = parent[curr];
      parent[curr] = root;
      curr = next;
    }
    return root;
  }

  function union(i, j) {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) {
      parent[rootI] = rootJ;
    }
  }

  const rowMap = new Map();
  const colMap = new Map();

  for (let i = 0; i < n; i++) {
    const [r, c] = stones[i];
    if (rowMap.has(r)) {
      union(i, rowMap.get(r));
    } else {
      rowMap.set(r, i);
    }
    if (colMap.has(c)) {
      union(i, colMap.get(c));
    } else {
      colMap.set(c, i);
    }
  }

  let comps = 0;
  for (let i = 0; i < n; i++) {
    if (parent[i] === i) comps++;
  }
  return n - comps;
};

var solve = removeStones;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        console.log(JSON.stringify(solve(parsed)));
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

module.exports = removeStones;
