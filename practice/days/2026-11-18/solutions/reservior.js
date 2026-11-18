const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextWord() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    const start = pos;
    while (pos < buf.length && buf[pos] > 32) pos++;
    return buf.toString('latin1', start, pos);
  }

  const tStr = nextWord();
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(nextWord(), 10);
    const m = parseInt(nextWord(), 10);
    const grid = [];
    for (let r = 0; r < n; r++) {
      grid.push(nextWord());
    }

    let ok = true;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        const ch = grid[r][c];
        if (ch === 'B') {
          if (r + 1 < n && grid[r + 1][c] !== 'B') {
            ok = false;
            break;
          }
        } else if (ch === 'W') {
          if (r + 1 < n && grid[r + 1][c] === 'A') {
            ok = false;
            break;
          }
          if (c === 0 || grid[r][c - 1] === 'A') {
            ok = false;
            break;
          }
          if (c === m - 1 || grid[r][c + 1] === 'A') {
            ok = false;
            break;
          }
        }
      }
      if (!ok) break;
    }

    out.push(ok ? 'yes' : 'no');
  }

  console.log(out.join('\n'));
}

solve();
