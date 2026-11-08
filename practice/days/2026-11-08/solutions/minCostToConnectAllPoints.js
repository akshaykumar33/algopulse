var minCostConnectPoints = function(points) {
  if (points.length === 1 && Array.isArray(points[0]) && Array.isArray(points[0][0])) {
    points = points[0];
  }
  const n = points.length;
  if (n <= 1) return 0;
  const dist = new Int32Array(n).fill(2147483647);
  const vis = new Uint8Array(n);
  let totalCost = 0;
  dist[0] = 0;
  for (let step = 0; step < n; step++) {
    let u = -1;
    let minD = 2147483647;
    for (let i = 0; i < n; i++) {
      if (!vis[i] && dist[i] < minD) {
        minD = dist[i];
        u = i;
      }
    }
    vis[u] = 1;
    totalCost += minD;
    const ux = points[u][0];
    const uy = points[u][1];
    for (let v = 0; v < n; v++) {
      if (!vis[v]) {
        const d = Math.abs(ux - points[v][0]) + Math.abs(uy - points[v][1]);
        if (d < dist[v]) dist[v] = d;
      }
    }
  }
  return totalCost;
};

var solve = minCostConnectPoints;
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
