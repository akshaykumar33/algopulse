var getBiggestThreeRhombusSumsInAGrid = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const sums = new Set();
    
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            sums.add(grid[r][c]);
            for (let sz = 1; r - sz >= 0 && r + sz < m && c - sz >= 0 && c + sz < n; sz++) {
                let curSum = 0;
                let cr = r - sz;
                let cc = c;
                for (let i = 0; i < sz; i++) curSum += grid[cr + i][cc + i];
                for (let i = 0; i < sz; i++) curSum += grid[cr + sz + i][cc + sz - i];
                for (let i = 0; i < sz; i++) curSum += grid[cr + 2 * sz - i][cc - i];
                for (let i = 0; i < sz; i++) curSum += grid[cr + sz - i][cc - sz + i];
                sums.add(curSum);
            }
        }
    }
    
    const arr = Array.from(sums);
    arr.sort((a, b) => b - a);
    return arr.slice(0, 3);
};

var solve = getBiggestThreeRhombusSumsInAGrid;

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
