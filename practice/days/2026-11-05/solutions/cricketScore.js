const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);

  let prevR = -1;
  let prevW = -1;
  let ok = true;

  for (let i = 0; i < n; i++) {
    const r = parseInt(tokens[ptr++], 10);
    const w = parseInt(tokens[ptr++], 10);

    if (r < 0 || w < 0 || w > 10) {
      ok = false;
    }
    if (i > 0) {
      if (r < prevR || w < prevW) {
        ok = false;
      }
      if (prevW === 10) {
        ok = false;
      }
    }
    prevR = r;
    prevW = w;
  }

  if (ok) {
    console.log('YES');
  } else {
    console.log('NO');
  }
}

solve();
