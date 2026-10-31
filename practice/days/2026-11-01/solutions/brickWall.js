var brickWall = function(wall) {
    let freq = new Map();
    let maxEdges = 0;
    for (let row of wall) {
        let sum = 0;
        for (let i = 0; i < row.length - 1; i++) {
            sum += row[i];
            let count = (freq.get(sum) || 0) + 1;
            freq.set(sum, count);
            if (count > maxEdges) {
                maxEdges = count;
            }
        }
    }
    return wall.length - maxEdges;
};
var solve = typeof brickWall !== 'undefined' ? brickWall : null;

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
