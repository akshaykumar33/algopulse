const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);
  if (input.length < 6) return;
  const [xa, ya, xb, yb, xc, yc] = input;
  const xs = [xa, xb, xc].sort((u, v) => u - v);
  const ys = [ya, yb, yc].sort((u, v) => u - v);
  const xm = xs[1];
  const ym = ys[1];
  const set = new Set();
  function addSegment(x1, y1, x2, y2) {
    const minX = Math.min(x1, x2), maxX = Math.max(x1, x2);
    for (let x = minX; x <= maxX; x++) set.add(x + ' ' + y1);
    const minY = Math.min(y1, y2), maxY = Math.max(y1, y2);
    for (let y = minY; y <= maxY; y++) set.add(x2 + ' ' + y);
  }
  addSegment(xa, ya, xm, ym);
  addSegment(xb, yb, xm, ym);
  addSegment(xc, yc, xm, ym);
  const sorted = Array.from(set).sort((a, b) => {
    const [x1, y1] = a.split(' ').map(Number);
    const [x2, y2] = b.split(' ').map(Number);
    return x1 !== x2 ? x1 - x2 : y1 - y2;
  });
  const out = [sorted.length, ...sorted];
  console.log(out.join('\n'));
}

solve();
