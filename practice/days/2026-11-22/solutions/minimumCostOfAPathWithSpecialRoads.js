var minimumCost = function(start, target, specialRoads) {
  const nodes = [start, target];
  const roads = [];
  for (let i = 0; i < specialRoads.length; i++) {
    const [x1, y1, x2, y2, cost] = specialRoads[i];
    const direct = Math.abs(x1 - x2) + Math.abs(y1 - y2);
    if (cost < direct) {
      roads.push([x1, y1, x2, y2, cost]);
      nodes.push([x1, y1]);
      nodes.push([x2, y2]);
    }
  }
  const V = nodes.length;
  const dist = new Float64Array(V).fill(Infinity);
  const visited = new Uint8Array(V);
  dist[0] = 0;
  for (let step = 0; step < V; step++) {
    let u = -1;
    for (let i = 0; i < V; i++) {
      if (!visited[i] && (u === -1 || dist[i] < dist[u])) u = i;
    }
    if (u === -1 || dist[u] === Infinity) break;
    visited[u] = 1;
    const [ux, uy] = nodes[u];
    for (let v = 0; v < V; v++) {
      if (!visited[v]) {
        const [vx, vy] = nodes[v];
        const d = Math.abs(ux - vx) + Math.abs(uy - vy);
        if (dist[u] + d < dist[v]) dist[v] = dist[u] + d;
      }
    }
    for (let r = 0; r < roads.length; r++) {
      const [x1, y1, x2, y2, cost] = roads[r];
      const dToRoad = Math.abs(ux - x1) + Math.abs(uy - y1);
      for (let v = 0; v < V; v++) {
        if (nodes[v][0] === x2 && nodes[v][1] === y2) {
          if (dist[u] + dToRoad + cost < dist[v]) {
            dist[v] = dist[u] + dToRoad + cost;
          }
        }
      }
    }
  }
  return dist[1];
};
var solve = minimumCost;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1], parsed[2])));
    }
  } catch (e) {}
}
module.exports = minimumCost;