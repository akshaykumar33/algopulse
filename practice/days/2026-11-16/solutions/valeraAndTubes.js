const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  const n = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);
  const k = parseInt(input[2], 10);

  const pathCells = [];
  for (let r = 1; r <= n; r++) {
    if (r % 2 === 1) {
      for (let c = 1; c <= m; c++) pathCells.push(r, c);
    } else {
      for (let c = m; c >= 1; c--) pathCells.push(r, c);
    }
  }

  let idx = 0;
  const out = [];
  for (let i = 0; i < k - 1; i++) {
    out.push('2 ' + pathCells[idx] + ' ' + pathCells[idx + 1] + ' ' + pathCells[idx + 2] + ' ' + pathCells[idx + 3]);
    idx += 4;
  }

  const remaining = (pathCells.length - idx) / 2;
  const lastLine = [remaining];
  while (idx < pathCells.length) {
    lastLine.push(pathCells[idx], pathCells[idx + 1]);
    idx += 2;
  }
  out.push(lastLine.join(' '));
  console.log(out.join('\n'));
}

solve();
