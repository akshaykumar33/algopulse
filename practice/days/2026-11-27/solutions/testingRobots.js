const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const x = parseInt(tokens[ptr++], 10);
  const y = parseInt(tokens[ptr++], 10);
  let curX = parseInt(tokens[ptr++], 10);
  let curY = parseInt(tokens[ptr++], 10);
  const s = tokens[ptr++];
  const vis = new Uint8Array((x + 1) * (y + 1));
  vis[curX * (y + 1) + curY] = 1;
  const out = [1];
  let visitedCount = 1;
  const total = x * y;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    let nx = curX, ny = curY;
    if (c === 'U') nx = Math.max(1, curX - 1);
    else if (c === 'D') nx = Math.min(x, curX + 1);
    else if (c === 'L') ny = Math.max(1, curY - 1);
    else if (c === 'R') ny = Math.min(y, curY + 1);
    curX = nx;
    curY = ny;
    const idx = curX * (y + 1) + curY;
    if (i < s.length - 1) {
      if (!vis[idx]) {
        vis[idx] = 1;
        visitedCount++;
        out.push(1);
      } else {
        out.push(0);
      }
    }
  }
  out.push(total - visitedCount);
  console.log(out.join(' '));
}
