const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const q = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < q; tc++) {
    const n = parseInt(input[ptr++], 10);
    let minX = -100000;
    let maxX = 100000;
    let minY = -100000;
    let maxY = 100000;

    for (let i = 0; i < n; i++) {
      const x = parseInt(input[ptr++], 10);
      const y = parseInt(input[ptr++], 10);
      const f1 = parseInt(input[ptr++], 10);
      const f2 = parseInt(input[ptr++], 10);
      const f3 = parseInt(input[ptr++], 10);
      const f4 = parseInt(input[ptr++], 10);

      if (f1 === 0) {
        if (x > minX) minX = x;
      }
      if (f2 === 0) {
        if (y < maxY) maxY = y;
      }
      if (f3 === 0) {
        if (x < maxX) maxX = x;
      }
      if (f4 === 0) {
        if (y > minY) minY = y;
      }
    }

    if (minX <= maxX && minY <= maxY) {
      out.push('1 ' + minX + ' ' + minY);
    } else {
      out.push('0');
    }
  }
  console.log(out.join('\n'));
}

solve();
