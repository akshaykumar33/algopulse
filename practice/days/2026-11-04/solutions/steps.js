const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  const [n, m] = input[0].trim().split(/\s+/).map(Number);
  let [x, y] = input[1].trim().split(/\s+/).map(Number);
  const k = parseInt(input[2].trim(), 10);

  let totalSteps = 0n;

  for (let i = 0; i < k; i++) {
    const line = input[3 + i];
    if (!line || !line.trim()) continue;
    const [dx, dy] = line.trim().split(/\s+/).map(Number);

    let sx = Infinity;
    if (dx > 0) sx = Math.floor((n - x) / dx);
    else if (dx < 0) sx = Math.floor((x - 1) / -dx);

    let sy = Infinity;
    if (dy > 0) sy = Math.floor((m - y) / dy);
    else if (dy < 0) sy = Math.floor((y - 1) / -dy);

    const step = Math.min(sx, sy);
    if (step > 0 && step !== Infinity) {
      totalSteps += BigInt(step);
      x += step * dx;
      y += step * dy;
    }
  }

  console.log(totalSteps.toString());
}

solve();

