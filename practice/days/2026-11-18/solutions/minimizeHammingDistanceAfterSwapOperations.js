var minimumHammingDistance = function(source, target, allowedSwaps) {
  const n = source.length;
  const parent = Array.from({ length: n }, (_, i) => i);

  function find(i) {
    if (parent[i] === i) return i;
    return (parent[i] = find(parent[i]));
  }

  function union(i, j) {
    const ri = find(i);
    const rj = find(j);
    if (ri !== rj) parent[ri] = rj;
  }

  for (let i = 0; i < allowedSwaps.length; i++) {
    union(allowedSwaps[i][0], allowedSwaps[i][1]);
  }

  const groups = new Map();
  for (let i = 0; i < n; i++) {
    const r = find(i);
    if (!groups.has(r)) groups.set(r, []);
    groups.get(r).push(i);
  }

  let dist = 0;
  for (const idxs of groups.values()) {
    const counts = new Map();
    for (let i = 0; i < idxs.length; i++) {
      const val = source[idxs[i]];
      counts.set(val, (counts.get(val) || 0) + 1);
    }
    for (let i = 0; i < idxs.length; i++) {
      const val = target[idxs[i]];
      const c = counts.get(val) || 0;
      if (c > 0) {
        counts.set(val, c - 1);
      } else {
        dist++;
      }
    }
  }

  return dist;
};

var solve = minimumHammingDistance;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = minimumHammingDistance;
