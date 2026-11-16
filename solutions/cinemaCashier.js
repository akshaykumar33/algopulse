const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);
  const seated = Array.from({ length: k + 1 }, () => new Uint8Array(k + 1));
  const cx = Math.floor((k + 1) / 2);
  const cy = Math.floor((k + 1) / 2);
  const out = [];

  for (let i = 0; i < n; i++) {
    const m = parseInt(input[ptr++], 10);
    let bestCost = Infinity;
    let bestR = -1;
    let bestC = -1;

    for (let r = 1; r <= k; r++) {
      for (let c = 1; c <= k - m + 1; c++) {
        let possible = true;
        for (let j = c; j < c + m; j++) {
          if (seated[r][j]) {
            possible = false;
            break;
          }
        }
        if (possible) {
          let cost = 0;
          for (let j = c; j < c + m; j++) {
            cost += Math.abs(r - cx) + Math.abs(j - cy);
          }
          if (cost < bestCost) {
            bestCost = cost;
            bestR = r;
            bestC = c;
          }
        }
      }
    }

    if (bestR !== -1) {
      out.push(bestR + ' ' + bestC + ' ' + (bestC + m - 1));
      for (let j = bestC; j < bestC + m; j++) {
        seated[bestR][j] = 1;
      }
    } else {
      out.push('-1');
    }
  }
  console.log(out.join('\n'));
}

solve();
