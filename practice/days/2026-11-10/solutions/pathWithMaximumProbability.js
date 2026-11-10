var maxProbability = function(n, edges, succProb, start_node, end_node) {
  const prob = new Float64Array(n);
  prob[start_node] = 1.0;
  for (let i = 0; i < n - 1; i++) {
    let updated = false;
    for (let j = 0; j < edges.length; j++) {
      const u = edges[j][0];
      const v = edges[j][1];
      const p = succProb[j];
      if (prob[u] * p > prob[v]) {
        prob[v] = prob[u] * p;
        updated = true;
      }
      if (prob[v] * p > prob[u]) {
        prob[u] = prob[v] * p;
        updated = true;
      }
    }
    if (!updated) break;
  }
  return prob[end_node];
};

var solve = maxProbability;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}

module.exports = solve;
