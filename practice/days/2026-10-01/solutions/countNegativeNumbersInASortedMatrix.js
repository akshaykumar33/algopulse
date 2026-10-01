/**
 * @param {number[][]} grid
 * @return {number}
 */
var countNegatives = function(grid) {
    let rows = grid.length;
    let cols = grid[0].length;
    let r = rows - 1;
    let c = 0;
    let count = 0;

    while (r >= 0 && c < cols) {
        if (grid[r][c] < 0) {
            count += (cols - c);
            r--;
        } else {
            c++;
        }
    }
    return count;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && countNegatives.length > 1 ? countNegatives(...parsed) : countNegatives(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(countNegatives(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = countNegatives;
