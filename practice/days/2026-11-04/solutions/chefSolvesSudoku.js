const fs = require('fs');

function solveSudoku(board) {
  if (!board || board.length === 0) return;
  const isNumberType = typeof board[0][0] === 'number';
  const rowMask = new Int32Array(9);
  const colMask = new Int32Array(9);
  const boxMask = new Int32Array(9);
  const emptyCells = [];

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = board[r][c];
      const s = String(cell).trim();
      if (s !== '.' && s !== '0' && s !== '' && !isNaN(Number(s))) {
        const val = Number(s);
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
        board[r][c] = isNumberType ? num : String(num);

        if (dfs(idx + 1)) return true;

        rowMask[r] &= ~bit;
        colMask[c] &= ~bit;
        boxMask[b] &= ~bit;
        board[r][c] = isNumberType ? 0 : '.';
      }
    }
    return false;
  }

  dfs(0);
}

function solvePuzzle(sudokuBoard) {
  solveSudoku(sudokuBoard);
}

if (require.main === module) {
  function run() {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (!raw) return;
    const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return;
    let lineIdx = 0;
    const t = parseInt(lines[lineIdx++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
      if (lineIdx < lines.length && /^\d+$/.test(lines[lineIdx]) && parseInt(lines[lineIdx], 10) === 9 && (lines.length - lineIdx - 1) >= 9) {
        lineIdx++;
      }
      const board = [];
      let isBracketed = false;
      for (let r = 0; r < 9; r++) {
        if (lineIdx >= lines.length) break;
        const line = lines[lineIdx++];
        if (line.includes('[')) isBracketed = true;
        let row = line.replace(/[\[\]]/g, '').trim().split(/\s+/);
        if (row.length === 1 && row[0].length === 9) row = row[0].split('');
        board.push(row);
      }
      if (board.length === 9) {
        solveSudoku(board);
        for (let r = 0; r < 9; r++) {
          if (isBracketed) {
            out.push('[' + board[r].join(' ') + ']');
          } else {
            out.push(board[r].join(''));
          }
        }
      }
    }

    console.log(out.join('\n'));
  }

  run();
}
