var placeWordInCrossword = function(board, word) {
  const m = board.length;
  const n = board[0].length;
  const len = word.length;

  const checkRow = (r, start) => {
    let fwd = true;
    let bwd = true;
    for (let k = 0; k < len; k++) {
      const ch = board[r][start + k];
      if (ch !== ' ') {
        if (ch !== word[k]) fwd = false;
        if (ch !== word[len - 1 - k]) bwd = false;
        if (!fwd && !bwd) return false;
      }
    }
    return true;
  };

  const checkCol = (c, start) => {
    let fwd = true;
    let bwd = true;
    for (let k = 0; k < len; k++) {
      const ch = board[start + k][c];
      if (ch !== ' ') {
        if (ch !== word[k]) fwd = false;
        if (ch !== word[len - 1 - k]) bwd = false;
        if (!fwd && !bwd) return false;
      }
    }
    return true;
  };

  for (let r = 0; r < m; r++) {
    let start = 0;
    for (let c = 0; c <= n; c++) {
      if (c === n || board[r][c] === '#') {
        if (c - start === len && checkRow(r, start)) return true;
        start = c + 1;
      }
    }
  }

  for (let c = 0; c < n; c++) {
    let start = 0;
    for (let r = 0; r <= m; r++) {
      if (r === m || board[r][c] === '#') {
        if (r - start === len && checkCol(c, start)) return true;
        start = r + 1;
      }
    }
  }

  return false;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const allPacked = lines.every((l) => {
      const p = JSON.parse(l);
      return Array.isArray(p) && p.length === 2 && Array.isArray(p[0]) && typeof p[1] === 'string';
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(placeWordInCrossword(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + 1 < lines.length; i += 2) {
        const args = lines.slice(i, i + 2).map((l) => JSON.parse(l));
        console.log(JSON.stringify(placeWordInCrossword(...args)));
      }
    }
  }
}

module.exports = placeWordInCrossword;
