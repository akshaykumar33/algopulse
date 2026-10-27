var exist = function(board, word) {
    const m = board.length;
    const n = board[0].length;
    const dfs = function(r, c, idx) {
        if (idx === word.length) return true;
        if (r < 0 || c < 0 || r >= m || c >= n || board[r][c] !== word[idx]) return false;
        const temp = board[r][c];
        board[r][c] = '#';
        const found = dfs(r + 1, c, idx + 1) ||
                      dfs(r - 1, c, idx + 1) ||
                      dfs(r, c + 1, idx + 1) ||
                      dfs(r, c - 1, idx + 1);
        board[r][c] = temp;
        return found;
    };
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === word[0] && dfs(i, j, 0)) {
                return true;
            }
        }
    }
    return false;
};
var solve = exist;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const board = JSON.parse(lines[i]);
        const word = JSON.parse(lines[i + 1]);
        const result = solve(board, word);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
