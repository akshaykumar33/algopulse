const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = [];
    let hasOne = false;
    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[ptr++], 10);
      a.push(v);
      if (v === 1) hasOne = true;
    }

    const b = [];
    for (let i = 0; i < n; i++) {
      b.push(parseInt(tokens[ptr++], 10));
    }

    if (a[0] !== b[0] || a[n - 1] !== b[n - 1]) {
      out.push('NO');
      continue;
    }

    let ok = true;
    let needsOne = false;
    for (let i = 0; i < n; i++) {
      if (a[i] === 1 && b[i] === 0) {
        ok = false;
        break;
      }
      if (a[i] === 0 && b[i] === 1) {
        needsOne = true;
      }
    }

    if (!ok || (needsOne && !hasOne)) {
      out.push('NO');
    } else {
      out.push('YES');
    }
  }

  console.log(out.join('\n'));
}

solve();

