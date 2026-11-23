const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const x0 = parseInt(input[ptr++], 10);
    const y0 = parseInt(input[ptr++], 10);
    const l = parseInt(input[ptr++], 10);
    const moves = input[ptr++];
    const bodyX = new Int32Array(l);
    const bodyY = new Int32Array(l);
    bodyX[0] = x0;
    bodyY[0] = y0;
    for (let i = 0; i < l - 1; i++) {
      let nx = bodyX[i];
      let ny = bodyY[i];
      const ch = moves[i];
      if (ch === 'U') ny++;
      else if (ch === 'D') ny--;
      else if (ch === 'L') nx--;
      else if (ch === 'R') nx++;
      bodyX[i + 1] = nx;
      bodyY[i + 1] = ny;
    }
    const hx = bodyX[l - 1];
    const hy = bodyY[l - 1];
    const lastDir = moves[l - 2];
    let dx = 0, dy = 0;
    if (lastDir === 'U') dy = 1;
    else if (lastDir === 'D') dy = -1;
    else if (lastDir === 'L') dx = -1;
    else if (lastDir === 'R') dx = 1;
    let wallD = Infinity;
    if (dx === 1) wallD = (n + 1) - hx;
    else if (dx === -1) wallD = hx;
    else if (dy === 1) wallD = (m + 1) - hy;
    else if (dy === -1) wallD = hy;
    let bodyD = Infinity;
    for (let j = 0; j < l - 1; j++) {
      const bx = bodyX[j];
      const by = bodyY[j];
      let d = -1;
      if (dx !== 0 && by === hy) {
        d = (bx - hx) / dx;
      } else if (dy !== 0 && bx === hx) {
        d = (by - hy) / dy;
      }
      if (d > 0 && d <= j && d < bodyD) {
        bodyD = d;
      }
    }
    if (bodyD < wallD) {
      out.push('BODY ' + (bodyD - 1));
    } else {
      out.push('WALL ' + (wallD - 1));
    }
  }
  console.log(out.join('\n'));
}

solve();
