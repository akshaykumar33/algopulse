var floodFill = function(grid, sources) {
  const n = grid.length;
  const m = grid[0].length;
  const dist = [];
  for (let i = 0; i < n; i++) dist.push(new Array(m).fill(-1));
  const qR = new Int32Array(n * m);
  const qC = new Int32Array(n * m);
  let h = 0, t = 0;
  for (const [r, c] of sources) {
    dist[r][c] = 0;
    qR[t] = r; qC[t++] = c;
  }
  const dirs = [0, 1, 0, -1, 1, 0, -1, 0];
  while (h < t) {
    const r = qR[h], c = qC[h++];
    const d = dist[r][c];
    for (let di = 0; di < 8; di += 2) {
      const nr = r + dirs[di], nc = c + dirs[di + 1];
      if (nr >= 0 && nr < n && nc >= 0 && nc < m && dist[nr][nc] === -1 && grid[nr][nc] === 0) {
        dist[nr][nc] = d + 1;
        qR[t] = nr; qC[t++] = nc;
      }
    }
  }
  return dist;
};
var solve = floodFill;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    const res = solve(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = floodFill;
