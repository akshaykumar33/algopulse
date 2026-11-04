var shortestPathWithAlternatingColors = function(n, redEdges, blueEdges) {
  const redAdj = Array.from({ length: n }, () => []);
  const blueAdj = Array.from({ length: n }, () => []);

  for (let i = 0; i < redEdges.length; i++) {
    redAdj[redEdges[i][0]].push(redEdges[i][1]);
  }
  for (let i = 0; i < blueEdges.length; i++) {
    blueAdj[blueEdges[i][0]].push(blueEdges[i][1]);
  }

  const distRed = new Int32Array(n).fill(-1);
  const distBlue = new Int32Array(n).fill(-1);

  distRed[0] = 0;
  distBlue[0] = 0;

  const q = [
    [0, 0],
    [0, 1],
  ];
  let head = 0;

  while (head < q.length) {
    const [u, color] = q[head++];
    if (color === 0) {
      const d = distRed[u] + 1;
      const neighbors = blueAdj[u];
      for (let i = 0; i < neighbors.length; i++) {
        const v = neighbors[i];
        if (distBlue[v] === -1) {
          distBlue[v] = d;
          q.push([v, 1]);
        }
      }
    } else {
      const d = distBlue[u] + 1;
      const neighbors = redAdj[u];
      for (let i = 0; i < neighbors.length; i++) {
        const v = neighbors[i];
        if (distRed[v] === -1) {
          distRed[v] = d;
          q.push([v, 0]);
        }
      }
    }
  }

  const ans = new Array(n);
  for (let i = 0; i < n; i++) {
    const d0 = distRed[i];
    const d1 = distBlue[i];
    if (d0 === -1 && d1 === -1) ans[i] = -1;
    else if (d0 === -1) ans[i] = d1;
    else if (d1 === -1) ans[i] = d0;
    else ans[i] = Math.min(d0, d1);
  }

  return ans;
};

var solve = typeof shortestPathWithAlternatingColors !== 'undefined' ? shortestPathWithAlternatingColors : null;

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
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
