var findSmallestSetOfVertices = function(n, edges) {
  const hasIn = new Uint8Array(n);
  for (let i = 0; i < edges.length; i++) {
    hasIn[edges[i][1]] = 1;
  }
  const ans = [];
  for (let i = 0; i < n; i++) {
    if (!hasIn[i]) ans.push(i);
  }
  return ans;
};

var solve = findSmallestSetOfVertices;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = findSmallestSetOfVertices;