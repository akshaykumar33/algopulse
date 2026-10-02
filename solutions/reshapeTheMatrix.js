var matrixReshape = function(mat, r, c) {
  let m = mat.length;
  let n = mat[0].length;
  if (m * n !== r * c) return mat;
  let ans = Array.from({ length: r }, () => Array(c).fill(0));
  let k = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let row = Math.floor(k / c);
      let col = k % c;
      ans[row][col] = mat[i][j];
      k++;
    }
  }
  return ans;
};

var solve = matrixReshape;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 3) {
        if (i + 2 < lines.length) {
          const mat = JSON.parse(lines[i]);
          const r = JSON.parse(lines[i + 1]);
          const c = JSON.parse(lines[i + 2]);
          const res = solve(mat, r, c);
          console.log(JSON.stringify(res));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
