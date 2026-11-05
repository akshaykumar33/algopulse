var checkMove = function(board, rMove, cMove, color) {
    const opp = color === 'B' ? 'W' : 'B';
    const dirs = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];
    for (const [dr, dc] of dirs) {
        let r = rMove + dr;
        let c = cMove + dc;
        let count = 0;
        while (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === opp) {
            count++;
            r += dr;
            c += dc;
        }
        if (count >= 1 && r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === color) {
            return true;
        }
    }
    return false;
};
var solve = typeof checkMove !== 'undefined' ? checkMove : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 4) {
        const board = JSON.parse(lines[i]);
        const rMove = JSON.parse(lines[i + 1]);
        const cMove = JSON.parse(lines[i + 2]);
        const color = JSON.parse(lines[i + 3]);
        const result = solve(board, rMove, cMove, color);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;

