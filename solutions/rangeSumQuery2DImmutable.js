var NumMatrix = function(matrix) {
  const R = matrix ? matrix.length : 0;
  const C = R > 0 ? matrix[0].length : 0;
  this.pref = Array.from({ length: R + 1 }, () => new Int32Array(C + 1));
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      this.pref[r + 1][c + 1] = matrix[r][c] + this.pref[r][c + 1] + this.pref[r + 1][c] - this.pref[r][c];
    }
  }
};

NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
  return this.pref[row2 + 1][col2 + 1] - this.pref[row1][col2 + 1] - this.pref[row2 + 1][col1] + this.pref[row1][col1];
};

// ---------------- LOCAL TEST HARNESS ----------------
function solve(operations, operands) {
  let obj = null;
  const res = [];
  for (let i = 0; i < operations.length; i++) {
    if (operations[i] === "NumMatrix") {
      obj = new NumMatrix(operands[i][0]);
      res.push(null);
    } else if (operations[i] === "sumRegion") {
      const [r1, c1, r2, c2] = operands[i];
      res.push(obj.sumRegion(r1, c1, r2, c2));
    }
  }
  return res;
}

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        console.log(JSON.stringify(solve(parsed[0], parsed[1])));
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

module.exports = { NumMatrix, solve };
