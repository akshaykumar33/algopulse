const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);
  if (!input || input.length < 4) return;
  const n = input[0];
  const m = input[1];
  const sx = input[2];
  const sy = input[3];

  const out = [];
  const rows = [sx];
  for (let r = 1; r <= n; r++) {
    if (r !== sx) rows.push(r);
  }

  let curCol = sy === 1 ? m : 1;

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    if (i === 0) {
      for (let c = sy; c <= m; c++) {
        out.push(`${r} ${c}`);
      }
      for (let c = sy - 1; c >= 1; c--) {
        out.push(`${r} ${c}`);
      }
    } else {
      if (curCol === 1) {
        for (let c = 1; c <= m; c++) {
          out.push(`${r} ${c}`);
        }
        curCol = m;
      } else {
        for (let c = m; c >= 1; c--) {
          out.push(`${r} ${c}`);
        }
        curCol = 1;
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
