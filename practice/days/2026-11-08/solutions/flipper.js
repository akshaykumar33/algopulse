const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const p = new Array(n);
    for (let i = 0; i < n; i++) {
      p[i] = parseInt(input[ptr++], 10);
    }

    if (n === 1) {
      out.push('1');
      continue;
    }

    const target = (p[0] === n) ? n - 1 : n;
    let pos = 0;
    for (let i = 0; i < n; i++) {
      if (p[i] === target) {
        pos = i;
        break;
      }
    }

    const candR = [];
    if (pos === n - 1) {
      candR.push(n - 1);
      if (n >= 2) candR.push(n - 2);
    } else {
      if (pos > 0) candR.push(pos - 1);
    }

    let best = null;

    for (const r of candR) {
      for (let l = 0; l <= r; l++) {
        const cur = [];
        for (let i = r + 1; i < n; i++) cur.push(p[i]);
        for (let i = r; i >= l; i--) cur.push(p[i]);
        for (let i = 0; i < l; i++) cur.push(p[i]);

        if (best === null) {
          best = cur;
        } else {
          let cmp = 0;
          for (let i = 0; i < n; i++) {
            if (cur[i] !== best[i]) {
              cmp = cur[i] - best[i];
              break;
            }
          }
          if (cmp > 0) best = cur;
        }
      }
    }

    out.push(best.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
