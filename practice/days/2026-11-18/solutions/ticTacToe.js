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
    const b = [];
    for (let r = 0; r < 3; r++) {
      b.push(nextWord());
    }

    let cx = 0;
    let co = 0;
    let ce = 0;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (b[r][c] === 'X') cx++;
        else if (b[r][c] === 'O') co++;
        else ce++;
      }
    }

    function checkWin(p) {
      for (let r = 0; r < 3; r++) {
        if (b[r][0] === p && b[r][1] === p && b[r][2] === p) return true;
      }
      for (let c = 0; c < 3; c++) {
        if (b[0][c] === p && b[1][c] === p && b[2][c] === p) return true;
      }
      if (b[0][0] === p && b[1][1] === p && b[2][2] === p) return true;
      if (b[0][2] === p && b[1][1] === p && b[2][0] === p) return true;
      return false;
    }

    const winX = checkWin('X');
    const winO = checkWin('O');

    if (cx < co || cx > co + 1) {
      out.push(3);
    } else if (winX && winO) {
      out.push(3);
    } else if (winX && cx !== co + 1) {
      out.push(3);
    } else if (winO && cx !== co) {
      out.push(3);
    } else if (winX || winO || ce === 0) {
      out.push(1);
    } else {
      out.push(2);
    }
  }

  console.log(out.join('\n'));
}

solve();
