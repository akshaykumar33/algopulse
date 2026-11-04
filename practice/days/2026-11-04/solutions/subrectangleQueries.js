class SubrectangleQueries {
  constructor(rectangle) {
    this.grid = rectangle;
  }

  updateSubrectangle(row1, col1, row2, col2, newValue) {
    for (let r = row1; r <= row2; r++) {
      for (let c = col1; c <= col2; c++) {
        this.grid[r][c] = newValue;
      }
    }
  }

  getValue(row, col) {
    return this.grid[row][col];
  }
}

var subrectangleQueries = function(ops, args) {
  let obj = null;
  const res = [];
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === 'SubrectangleQueries') {
      obj = new SubrectangleQueries(args[i][0]);
      res.push(null);
    } else if (ops[i] === 'updateSubrectangle') {
      obj.updateSubrectangle(...args[i]);
      res.push(null);
    } else if (ops[i] === 'getValue') {
      res.push(obj.getValue(...args[i]));
    }
  }
  return res;
};

var solve = typeof subrectangleQueries !== 'undefined' ? subrectangleQueries : null;

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
module.exports = SubrectangleQueries;

