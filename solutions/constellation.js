const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  const n = Number(input[0]);
  const pts = [];

  let ptr = 1;
  for (let i = 1; i <= n; i++) {
    const x = BigInt(input[ptr++]);
    const y = BigInt(input[ptr++]);
    pts.push({ x, y, id: i });
  }

  let p1 = pts[0];
  for (let i = 1; i < n; i++) {
    if (pts[i].x < p1.x || (pts[i].x === p1.x && pts[i].y < p1.y)) {
      p1 = pts[i];
    }
  }

  let p2 = null;
  let minD = -1n;
  for (let i = 0; i < n; i++) {
    if (pts[i].id === p1.id) continue;
    const dx = pts[i].x - p1.x;
    const dy = pts[i].y - p1.y;
    const d = dx * dx + dy * dy;
    if (minD === -1n || d < minD) {
      minD = d;
      p2 = pts[i];
    }
  }

  let p3 = null;
  let minArea = -1n;
  const dx1 = p2.x - p1.x;
  const dy1 = p2.y - p1.y;

  for (let i = 0; i < n; i++) {
    if (pts[i].id === p1.id || pts[i].id === p2.id) continue;
    const dx2 = pts[i].x - p1.x;
    const dy2 = pts[i].y - p1.y;
    let cp = dx1 * dy2 - dy1 * dx2;
    if (cp < 0n) cp = -cp;
    if (cp > 0n && (minArea === -1n || cp < minArea)) {
      minArea = cp;
      p3 = pts[i];
    }
  }

  console.log(`${p1.id} ${p2.id} ${p3.id}`);
}

solve();
