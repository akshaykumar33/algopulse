const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const k = parseInt(tokens[ptr++], 10);
    const board = [];
    let placed = 0;

    for (let r = 0; r < 8; r++) {
      let row = '';
      for (let c = 0; c < 8; c++) {
        if (r === 0 && c === 0) {
          row += 'O';
          placed++;
        } else if (placed < k) {
          row += '.';
          placed++;
        } else {
          row += 'X';
        }
      }
      board.push(row);
    }

    out.push(board.join('\n'));
  }

  console.log(out.join('\n'));
}

solve();

