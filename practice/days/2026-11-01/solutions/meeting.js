const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const xa = parseInt(tokens[ptr++], 10);
  const ya = parseInt(tokens[ptr++], 10);
  const xb = parseInt(tokens[ptr++], 10);
  const yb = parseInt(tokens[ptr++], 10);

  const minX = Math.min(xa, xb);
  const maxX = Math.max(xa, xb);
  const minY = Math.min(ya, yb);
  const maxY = Math.max(ya, yb);

  const n = parseInt(tokens[ptr++], 10);
  const heaters = [];
  for (let i = 0; i < n; i++) {
    const hx = parseInt(tokens[ptr++], 10);
    const hy = parseInt(tokens[ptr++], 10);
    const r = parseInt(tokens[ptr++], 10);
    heaters.push({ x: hx, y: hy, r2: r * r });
  }

  const pts = [];
  for (let x = minX; x <= maxX; x++) {
    pts.push([x, minY]);
    if (maxY !== minY) pts.push([x, maxY]);
  }
  for (let y = minY + 1; y < maxY; y++) {
    pts.push([minX, y]);
    if (maxX !== minX) pts.push([maxX, y]);
  }

  let cold = 0;
  for (let i = 0; i < pts.length; i++) {
    const [px, py] = pts[i];
    let warm = false;
    for (let j = 0; j < heaters.length; j++) {
      const h = heaters[j];
      const dx = px - h.x;
      const dy = py - h.y;
      if (dx * dx + dy * dy <= h.r2) {
        warm = true;
        break;
      }
    }
    if (!warm) cold++;
  }

  console.log(cold);
}

solve();
