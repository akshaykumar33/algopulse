var gameOfLife = function(board) {
  let m = board.length;
  let n = board[0].length;
  let dr = [-1, -1, -1, 0, 0, 1, 1, 1];
  let dc = [-1, 0, 1, -1, 1, -1, 0, 1];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      let cnt = 0;
      for (let i = 0; i < 8; i++) {
        let nr = r + dr[i];
        let nc = c + dc[i];
        if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
          if (board[nr][nc] === 1 || board[nr][nc] === 2) {
            cnt++;
          }
        }
      }
      if (board[r][c] === 1 && (cnt < 2 || cnt > 3)) {
        board[r][c] = 2;
      } else if (board[r][c] === 0 && cnt === 3) {
        board[r][c] = 3;
      }
    }
  }
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === 2) {
        board[r][c] = 0;
      } else if (board[r][c] === 3) {
        board[r][c] = 1;
      }
    }
  }
  return board;
};;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && gameOfLife.length > 1 ? gameOfLife(...parsed) : gameOfLife(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(gameOfLife(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = gameOfLife;
