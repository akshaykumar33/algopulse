const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const x1 = BigInt(input[ptr++]);
  const x2 = BigInt(input[ptr++]);

  const lines = [];
  for (let i = 0; i < n; i++) {
    const k = BigInt(input[ptr++]);
    const b = BigInt(input[ptr++]);
    const y1 = k * x1 + b;
    const y2 = k * x2 + b;
    lines.push({ y1, y2 });
  }

  lines.sort((a, b) => {
    if (a.y1 < b.y1) return -1;
    if (a.y1 > b.y1) return 1;
    if (a.y2 < b.y2) return -1;
    if (a.y2 > b.y2) return 1;
    return 0;
  });

  let maxY2 = lines[0].y2;
  for (let i = 1; i < n; i++) {
    if (lines[i].y2 < maxY2) {
      console.log('YES');
      return;
    }
    if (lines[i].y2 > maxY2) {
      maxY2 = lines[i].y2;
    }
  }

  console.log('NO');
}

solve();
