const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const rowHas = new Uint8Array(n);
    const colHas = new Uint8Array(m);

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        const val = parseInt(input[ptr++], 10);
        if (val === 1) {
          rowHas[r] = 1;
          colHas[c] = 1;
        }
      }
    }

    let rEmpty = 0;
    for (let r = 0; r < n; r++) {
      if (!rowHas[r]) rEmpty++;
    }
    let cEmpty = 0;
    for (let c = 0; c < m; c++) {
      if (!colHas[c]) cEmpty++;
    }

    const moves = Math.min(rEmpty, cEmpty);
    if (moves % 2 === 1) {
      out.push('Ashish');
    } else {
      out.push('Vivek');
    }
  }

  console.log(out.join('\n'));
}

solve();
