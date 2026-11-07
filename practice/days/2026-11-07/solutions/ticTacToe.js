const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(l => l.trim().length > 0);
  if (!lines || lines.length < 10) return;

  const board = [];
  for (let i = 0; i < 9; i++) {
    board.push(lines[i].replace(/\s+/g, '').split(''));
  }

  const lastCoords = lines[9].trim().split(/\s+/);
  const lx = parseInt(lastCoords[0], 10) - 1;
  const ly = parseInt(lastCoords[1], 10) - 1;

  const targetRowBlock = lx % 3;
  const targetColBlock = ly % 3;

  let hasEmpty = false;
  for (let r = targetRowBlock * 3; r < targetRowBlock * 3 + 3; r++) {
    for (let c = targetColBlock * 3; c < targetColBlock * 3 + 3; c++) {
      if (board[r][c] === '.') {
        hasEmpty = true;
        break;
      }
    }
    if (hasEmpty) break;
  }

  if (hasEmpty) {
    for (let r = targetRowBlock * 3; r < targetRowBlock * 3 + 3; r++) {
      for (let c = targetColBlock * 3; c < targetColBlock * 3 + 3; c++) {
        if (board[r][c] === '.') board[r][c] = '!';
      }
    }
  } else {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === '.') board[r][c] = '!';
      }
    }
  }

  const out = [];
  for (let r = 0; r < 9; r++) {
    const s1 = board[r].slice(0, 3).join('');
    const s2 = board[r].slice(3, 6).join('');
    const s3 = board[r].slice(6, 9).join('');
    out.push(s1 + ' ' + s2 + ' ' + s3);
    if (r === 2 || r === 5) out.push('');
  }

  console.log(out.join('\n'));
}

solve();
