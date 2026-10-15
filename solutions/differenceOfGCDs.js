const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const l = parseInt(input[ptr++], 10);
    const r = parseInt(input[ptr++], 10);

    const a = [];
    let ok = true;

    for (let i = 1; i <= n; i++) {
      const val = Math.floor((l + i - 1) / i) * i;
      if (val > r) {
        ok = false;
        break;
      }
      a.push(val);
    }

    if (ok) {
      out.push('YES');
      out.push(a.join(' '));
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();
