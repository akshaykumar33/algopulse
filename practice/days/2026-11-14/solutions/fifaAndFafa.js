const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 5) return;
  const R = parseFloat(input[0]);
  const x1 = parseFloat(input[1]);
  const y1 = parseFloat(input[2]);
  const x2 = parseFloat(input[3]);
  const y2 = parseFloat(input[4]);

  const dx = x1 - x2;
  const dy = y1 - y2;
  const distSq = dx * dx + dy * dy;

  if (distSq >= R * R) {
    console.log(x1 + ' ' + y1 + ' ' + R);
    return;
  }

  const d = Math.sqrt(distSq);
  if (d < 1e-12) {
    const rNew = R / 2;
    const xNew = x1 + rNew;
    const yNew = y1;
    console.log(xNew + ' ' + yNew + ' ' + rNew);
    return;
  }

  const rNew = (d + R) / 2;
  const unitX = dx / d;
  const unitY = dy / d;
  const xNew = x2 + unitX * rNew;
  const yNew = y2 + unitY * rNew;

  console.log(xNew + ' ' + yNew + ' ' + rNew);
}

solve();
