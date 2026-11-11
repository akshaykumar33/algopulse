var minScore = function(n, roads) {
  const parent = new Int32Array(n + 1);
  const rank = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) parent[i] = i;

  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };

  for (let i = 0; i < roads.length; i++) {
    let ru = find(roads[i][0]);
    let rv = find(roads[i][1]);
    if (ru !== rv) {
      if (rank[ru] < rank[rv]) {
        const tmp = ru;
        ru = rv;
        rv = tmp;
      }
      parent[rv] = ru;
      if (rank[ru] === rank[rv]) rank[ru]++;
    }
  }

  const root = find(1);
  let ans = 1e9;
  for (let i = 0; i < roads.length; i++) {
    if (find(roads[i][0]) === root) {
      const d = roads[i][2];
      if (d < ans) ans = d;
    }
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const parsed = lines.map((l) => JSON.parse(l));
    const isPacked = parsed.every((p) => Array.isArray(p) && p.length === 2 && typeof p[0] === 'number');
    if (parsed.length === 2 && !isPacked) {
      console.log(JSON.stringify(minScore(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(minScore(...p)));
      }
    }
  }
}

module.exports = minScore;
