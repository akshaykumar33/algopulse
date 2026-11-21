var restoreArray = function(adjacentPairs) {
  const adj = new Map();
  for (const [u, v] of adjacentPairs) {
    if (!adj.has(u)) adj.set(u, []);
    if (!adj.has(v)) adj.set(v, []);
    adj.get(u).push(v);
    adj.get(v).push(u);
  }
  let start = null;
  for (const [node, neighbors] of adj) {
    if (neighbors.length === 1) {
      start = node;
      break;
    }
  }
  const ans = [start];
  let prev = start;
  let cur = adj.get(start)[0];
  while (ans.length < adjacentPairs.length + 1) {
    ans.push(cur);
    const neighbors = adj.get(cur);
    const next = neighbors[0] === prev ? neighbors[1] : neighbors[0];
    prev = cur;
    cur = next;
  }
  return ans;
};

var solve = restoreArray;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      const pairs = (parsed.length === 1 && Array.isArray(parsed[0]) && Array.isArray(parsed[0][0])) ? parsed[0] : parsed;
      console.log(JSON.stringify(solve(pairs)));
    }
  } catch (e) {}
}

module.exports = restoreArray;