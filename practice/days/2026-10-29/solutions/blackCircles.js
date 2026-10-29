const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const circles = [];
    for (let i = 0; i < n; i++) {
      const cx = BigInt(input[ptr++]);
      const cy = BigInt(input[ptr++]);
      circles.push({ x: cx, y: cy });
    }
    const xs = BigInt(input[ptr++]);
    const ys = BigInt(input[ptr++]);
    const xt = BigInt(input[ptr++]);
    const yt = BigInt(input[ptr++]);

    const dStart = (xs - xt) * (xs - xt) + (ys - yt) * (ys - yt);
    let ok = true;
    for (const c of circles) {
      const dCircle = (c.x - xt) * (c.x - xt) + (c.y - yt) * (c.y - yt);
      if (dCircle <= dStart) {
        ok = false;
        break;
      }
    }
    out.push(ok ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}

solve();
