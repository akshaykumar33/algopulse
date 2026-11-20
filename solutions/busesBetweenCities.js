const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const a = parseInt(input[0], 10);
  const ta = parseInt(input[1], 10);
  const b = parseInt(input[2], 10);
  const tb = parseInt(input[3], 10);
  const timeStr = input[4];

  const parts = timeStr.split(':');
  const simStart = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  const simEnd = simStart + ta;

  let count = 0;
  for (let t = 300; t <= 1439; t += b) {
    const busStart = t;
    const busEnd = t + tb;
    if (busStart < simEnd && busEnd > simStart) {
      count++;
    }
  }

  console.log(count);
}

solve();
