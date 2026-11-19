const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 10) return;

  const board = [];
  for (let i = 0; i < 10; i++) {
    board.push(input[i].split(''));
  }

  function hasWin() {
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        if (c + 4 < 10) {
          let ok = true;
          for (let k = 0; k < 5; k++) {
            if (board[r][c + k] !== 'X') { ok = false; break; }
          }
          if (ok) return true;
        }

        if (r + 4 < 10) {
          let ok = true;
          for (let k = 0; k < 5; k++) {
            if (board[r + k][c] !== 'X') { ok = false; break; }
          }
          if (ok) return true;
        }

        if (r + 4 < 10 && c + 4 < 10) {
          let ok = true;
          for (let k = 0; k < 5; k++) {
            if (board[r + k][c + k] !== 'X') { ok = false; break; }
          }
          if (ok) return true;
        }

        if (r - 4 >= 0 && c + 4 < 10) {
          let ok = true;
          for (let k = 0; k < 5; k++) {
            if (board[r - k][c + k] !== 'X') { ok = false; break; }
          }
          if (ok) return true;
        }
      }
    }
    return false;
  }

  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      if (board[r][c] === '.') {
        board[r][c] = 'X';
        if (hasWin()) {
          console.log('YES');
          return;
        }
        board[r][c] = '.';
      }
    }
  }

  console.log('NO');
}

solve();
