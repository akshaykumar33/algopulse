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
    for (let i = 0; i < n; i++) {
      const s = nextWord();
      const row = new Uint8Array(m);
      for (let j = 0; j < m; j++) row[j] = s.charCodeAt(j) - 48;
      grid.push(row);
    }

    const ops = [];
    function flip(cells) {
      ops.push(cells);
      for (let i = 0; i < 3; i++) {
        grid[cells[i][0]][cells[i][1]] ^= 1;
      }
    }

    for (let i = 0; i < n - 2; i++) {
      for (let j = 0; j < m; j++) {
        if (grid[i][j] === 1) {
          if (j < m - 1) {
            flip([[i, j], [i + 1, j], [i + 1, j + 1]]);
          } else {
            flip([[i, j], [i + 1, j - 1], [i + 1, j]]);
          }
        }
      }
    }

    for (let j = 0; j < m - 2; j++) {
      const o1 = grid[n - 2][j];
      const o2 = grid[n - 1][j];
      if (o1 === 1 && o2 === 1) {
        flip([[n - 2, j], [n - 1, j], [n - 2, j + 1]]);
      } else if (o1 === 1) {
        flip([[n - 2, j], [n - 2, j + 1], [n - 1, j + 1]]);
      } else if (o2 === 1) {
        flip([[n - 1, j], [n - 2, j + 1], [n - 1, j + 1]]);
      }
    }

    const r = n - 2, c = m - 2;
    const p = [[r, c], [r, c + 1], [r + 1, c], [r + 1, c + 1]];
    while (true) {
      const ones = [];
      const zeros = [];
      for (let k = 0; k < 4; k++) {
        if (grid[p[k][0]][p[k][1]] === 1) ones.push(p[k]);
        else zeros.push(p[k]);
      }
      if (ones.length === 0) break;
      if (ones.length === 3) {
        flip(ones);
      } else if (ones.length === 1) {
        flip([ones[0], zeros[0], zeros[1]]);
      } else if (ones.length === 2) {
        flip([ones[0], zeros[0], zeros[1]]);
      } else if (ones.length === 4) {
        flip([ones[0], ones[1], ones[2]]);
      }
    }

    out.push(ops.length);
    for (let k = 0; k < ops.length; k++) {
      const op = ops[k];
      out.push(`${op[0][0] + 1} ${op[0][1] + 1} ${op[1][0] + 1} ${op[1][1] + 1} ${op[2][0] + 1} ${op[2][1] + 1}`);
    }
  }

  console.log(out.join('\n'));
}

solve();
