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
    for (let i = 0; i < n; i++) {
      a.push(parseInt(tokens[ptr++], 10));
    }
    if (a[0] !== a[n - 1]) {
      out.push('NO');
      continue;
    }
    let ok = true;
    const target = a[0];
    for (let i = 0; i < n; i++) {
      if (a[i] < target) {
        ok = false;
        break;
      }
    }
    out.push(ok ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}

solve();
