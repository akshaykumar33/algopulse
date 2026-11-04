const fs = require('fs');

function solveSudoku(board) {
  const rowMask = new Int32Array(9);
  const colMask = new Int32Array(9);
  const boxMask = new Int32Array(9);
  const emptyCells = [];

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const ch = board[r][c];
      if (ch !== '.') {
        const val = ch.charCodeAt(0) - 48;
        const bit = 1 << val;
        rowMask[r] |= bit;
        colMask[c] |= bit;
        boxMask[Math.floor(r / 3) * 3 + Math.floor(c / 3)] |= bit;
      } else {
        emptyCells.push((r << 4) | c);
      }
    }
  }

  function dfs(idx) {
    if (idx === emptyCells.length) return true;
    const pos = emptyCells[idx];
    const r = pos >> 4;
    const c = pos & 15;
    const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
    const used = rowMask[r] | colMask[c] | boxMask[b];

    for (let num = 1; num <= 9; num++) {
      const bit = 1 << num;
      if ((used & bit) === 0) {
        rowMask[r] |= bit;
        colMask[c] |= bit;
        boxMask[b] |= bit;
        board[r][c] = String.fromCharCode(48 + num);

        if (dfs(idx + 1)) return true;

        rowMask[r] &= ~bit;
        colMask[c] &= ~bit;
        boxMask[b] &= ~bit;
        board[r][c] = '.';
      }
    }
    return false;
  }

  dfs(0);
}

function solvePuzzle(sudokuBoard) {
  solveSudoku(sudokuBoard);
}

function run() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(line => line.length > 0);
  if (!input || !input[0]) return;
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++].trim(), 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const board = [];
    for (let r = 0; r < 9; r++) {
      board.push(input[lineIdx++].trim().split(''));
    }
    solveSudoku(board);
    for (let r = 0; r < 9; r++) {
      out.push(board[r].join(''));
    }
  }

  console.log(out.join('\n'));
}

run();
