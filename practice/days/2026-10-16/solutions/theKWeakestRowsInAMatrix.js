var kWeakestRows = function(mat, k) {
  let m = mat.length;
  let rows = [];
  for (let i = 0; i < m; i++) {
    let l = 0, r = mat[i].length;
    while (l < r) {
      let mid = (l + r) >> 1;
      if (mat[i][mid] === 1) l = mid + 1;
      else r = mid;
    }
    rows.push([l, i]);
  }
  rows.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
  return rows.slice(0, k).map(x => x[1]);
};
var solve = kWeakestRows;

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
