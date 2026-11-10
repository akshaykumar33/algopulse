const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const na = parseInt(input[ptr++], 10);
  const ma = parseInt(input[ptr++], 10);
  const a = [];
  for (let i = 0; i < na; i++) {
    a.push(input[ptr++]);
  }

  const nb = parseInt(input[ptr++], 10);
  const mb = parseInt(input[ptr++], 10);
  const b = [];
  for (let i = 0; i < nb; i++) {
    b.push(input[ptr++]);
  }

  let bestVal = -1;
  let bestX = 0;
  let bestY = 0;

  for (let x = -50; x <= 50; x++) {
    for (let y = -50; y <= 50; y++) {
      let cur = 0;
      for (let i = 0; i < na; i++) {
        const bi = i + x;
        if (bi < 0 || bi >= nb) continue;
        for (let j = 0; j < ma; j++) {
          if (a[i][j] === '1') {
            const bj = j + y;
            if (bj >= 0 && bj < mb && b[bi][bj] === '1') {
              cur++;
            }
          }
        }
      }
      if (cur > bestVal) {
        bestVal = cur;
        bestX = x;
        bestY = y;
      }
    }
  }

  console.log(`${bestX} ${bestY}`);
}

solve();

