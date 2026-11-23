const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);
  if (input.length === 0 || isNaN(input[0])) return;
  const n = input[0];
  const pts = [];
  let idx = 1;
  const total = 4 * n + 1;
  for (let i = 0; i < total; i++) {
    pts.push([input[idx++], input[idx++]]);
  }
  for (let skip = 0; skip < total; skip++) {
    let minX = 100, maxX = -1, minY = 100, maxY = -1;
    for (let i = 0; i < total; i++) {
      if (i === skip) continue;
      const [x, y] = pts[i];
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    const side = maxX - minX;
    if (side <= 0 || maxY - minY !== side) continue;
    let ok = true;
    let onL = 0, onR = 0, onB = 0, onT = 0;
    for (let i = 0; i < total; i++) {
      if (i === skip) continue;
      const [x, y] = pts[i];
      const onV = (x === minX || x === maxX) && (y >= minY && y <= maxY);
      const onH = (y === minY || y === maxY) && (x >= minX && x <= maxX);
      if (!onV && !onH) { ok = false; break; }
      if (x === minX) onL++;
      if (x === maxX) onR++;
      if (y === minY) onB++;
      if (y === maxY) onT++;
    }
    if (ok && onL >= n && onR >= n && onB >= n && onT >= n) {
      console.log(pts[skip][0] + ' ' + pts[skip][1]);
      return;
    }
  }
}

solve();
