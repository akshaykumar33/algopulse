var surroundedRegions = function(board) {
    if (!board || board.length === 0 || board[0].length === 0) return;
    const m = board.length;
    const n = board[0].length;
    
    const dfs = (r, c) => {
        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== 'O') return;
        board[r][c] = 'E';
        const q = [[r, c]];
        while (q.length > 0) {
            const [i, j] = q.pop();
            const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
            for (const [dr, dc] of dirs) {
                const ni = i + dr;
                const nj = j + dc;
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && board[ni][nj] === 'O') {
                    board[ni][nj] = 'E';
                    q.push([ni, nj]);
                }
            }
        }
    };
    
    for (let i = 0; i < m; i++) {
        if (board[i][0] === 'O') dfs(i, 0);
        if (board[i][n - 1] === 'O') dfs(i, n - 1);
    }
    
    for (let j = 0; j < n; j++) {
        if (board[0][j] === 'O') dfs(0, j);
        if (board[m - 1][j] === 'O') dfs(m - 1, j);
    }
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'O') {
                board[i][j] = 'X';
            } else if (board[i][j] === 'E') {
                board[i][j] = 'O';
            }
        }
    }
};

var solve = typeof surroundedRegions !== 'undefined' ? surroundedRegions : null;

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
          solve(parsed);
          console.log(JSON.stringify(parsed));
        } catch {
          // fallback
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
