const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const r = parseInt(input[ptr++], 10);
    const c = parseInt(input[ptr++], 10);
    let ok = true;

    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        const val = parseInt(input[ptr++], 10);
        let adj = 0;
        if (i > 0) adj++;
        if (i < r - 1) adj++;
        if (j > 0) adj++;
        if (j < c - 1) adj++;
        if (val >= adj) {
          ok = false;
        }
      }
    }

    out.push(ok ? 'Stable' : 'Unstable');
  }

  console.log(out.join('\n'));
}

solve();
