var isPossibleToCutPath = function(grid) {
  const m = grid.length, n = grid[0].length;
  const fw = new Uint8Array(m * n), bw = new Uint8Array(m * n);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!grid[i][j]) continue;
      if (i === 0 && j === 0) fw[0] = 1;
      else if ((i > 0 && fw[(i - 1) * n + j]) || (j > 0 && fw[i * n + j - 1])) fw[i * n + j] = 1;
    }
  }
  if (!fw[m * n - 1]) return true;
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (!grid[i][j]) continue;
      if (i === m - 1 && j === n - 1) bw[i * n + j] = 1;
      else if ((i < m - 1 && bw[(i + 1) * n + j]) || (j < n - 1 && bw[i * n + j + 1])) bw[i * n + j] = 1;
    }
  }
  const cnt = new Int32Array(m + n);
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (fw[i * n + j] && bw[i * n + j]) cnt[i + j]++;
  for (let d = 1; d < m + n - 2; d++) if (cnt[d] === 1) return true;
  return false;
};
var solve = isPossibleToCutPath;
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
module.exports = isPossibleToCutPath;
