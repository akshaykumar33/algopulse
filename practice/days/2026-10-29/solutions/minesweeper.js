var updateBoard = function(board, click) {
  const [r, c] = click;
  const m = board.length;
  const n = board[0].length;

  if (board[r][c] === 'M') {
    board[r][c] = 'X';
    return board;
  }

  const dirs = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  function dfs(row, col) {
    let mines = 0;
    for (const [dr, dc] of dirs) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && board[nr][nc] === 'M') {
        mines++;
      }
    }

    if (mines > 0) {
      board[row][col] = String(mines);
    } else {
      board[row][col] = 'B';
      for (const [dr, dc] of dirs) {
        const nr = row + dr;
        const nc = col + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && board[nr][nc] === 'E') {
          dfs(nr, nc);
        }
      }
    }
  }

  dfs(r, c);
  return board;
};

var solve = typeof updateBoard !== 'undefined' ? updateBoard : null;

// ---------------- LOCAL TEST HARNESS ----------------
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
