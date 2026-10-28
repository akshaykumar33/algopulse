const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const pts = [];
    for (let i = 0; i < n; i++) {
      const x = parseInt(tokens[ptr++], 10);
      const y = parseInt(tokens[ptr++], 10);
      pts.push([x, y]);
    }

    pts.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

    let cx = 0;
    let cy = 0;
    let ok = true;
    let path = '';

    for (let i = 0; i < n; i++) {
      const [nx, ny] = pts[i];
      if (ny < cy) {
        ok = false;
        break;
      }
      path += 'R'.repeat(nx - cx);
      path += 'U'.repeat(ny - cy);
      cx = nx;
      cy = ny;
    }

    if (ok) {
      out.push('YES');
      out.push(path);
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();

