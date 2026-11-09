const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x1 = parseInt(tokens[ptr++], 10);
    const y1 = parseInt(tokens[ptr++], 10);
    const x2 = parseInt(tokens[ptr++], 10);
    const y2 = parseInt(tokens[ptr++], 10);

    let found = false;
    for (let r = 1; r <= 8 && !found; r++) {
      for (let c = 1; c <= 8; c++) {
        if ((r === x1 && c === y1) || (r === x2 && c === y2)) {
          continue;
        }

        const dx1 = Math.abs(r - x1);
        const dy1 = Math.abs(c - y1);
        const att1 = (dx1 === 1 && dy1 === 2) || (dx1 === 2 && dy1 === 1);

        const dx2 = Math.abs(r - x2);
        const dy2 = Math.abs(c - y2);
        const att2 = (dx2 === 1 && dy2 === 2) || (dx2 === 2 && dy2 === 1);

        if (att1 && att2) {
          found = true;
          break;
        }
      }
    }

    out.push(found ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
