const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(parseInt(tokens[ptr++], 10));
    }
    const s = tokens[ptr++];

    const blues = [];
    const reds = [];

    for (let i = 0; i < n; i++) {
      if (s[i] === 'B') blues.push(a[i]);
      else reds.push(a[i]);
    }

    blues.sort((x, y) => x - y);
    reds.sort((x, y) => x - y);

    let ok = true;
    for (let i = 0; i < blues.length; i++) {
      if (blues[i] < i + 1) {
        ok = false;
        break;
      }
    }

    if (ok) {
      for (let j = 0; j < reds.length; j++) {
        const target = blues.length + j + 1;
        if (reds[j] > target) {
          ok = false;
          break;
        }
      }
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
