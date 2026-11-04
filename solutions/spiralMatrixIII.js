var spiralMatrixIII = function(rows, cols, rStart, cStart) {
  const total = rows * cols;
  const res = [];
  let r = rStart;
  let c = cStart;
  res.push([r, c]);

  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  let dir = 0;
  let steps = 1;

  while (res.length < total) {
    for (let k = 0; k < 2; k++) {
      for (let s = 0; s < steps; s++) {
        r += dr[dir];
        c += dc[dir];
        if (r >= 0 && r < rows && c >= 0 && c < cols) {
          res.push([r, c]);
        }
      }
      dir = (dir + 1) % 4;
    }
    steps++;
  }

  return res;
};

var solve = typeof spiralMatrixIII !== 'undefined' ? spiralMatrixIII : null;

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

