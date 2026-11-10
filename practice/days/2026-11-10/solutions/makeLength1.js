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
    const s = tokens[ptr++];

    if (n === 1) {
      out.push('YES');
      continue;
    }

    let ok = true;
    let count1 = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '1') {
        count1++;
      } else {
        if (count1 % 2 === 1) {
          ok = false;
          break;
        }
        count1 = 0;
      }
    }
    if (count1 % 2 === 1) {
      ok = false;
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
