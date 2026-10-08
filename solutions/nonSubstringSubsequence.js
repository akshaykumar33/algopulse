const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    while (ptr < input.length && input[ptr].trim() === '') ptr++;
    if (ptr >= input.length) break;
    const [n, q] = input[ptr++].trim().split(/\s+/).map(Number);
    const s = input[ptr++].trim();
    for (let i = 0; i < q; i++) {
      const [l, r] = input[ptr++].trim().split(/\s+/).map(Number);
      let ok = false;
      for (let j = 0; j < l - 1; j++) {
        if (s[j] === s[l - 1]) {
          ok = true;
          break;
        }
      }
      if (!ok) {
        for (let j = r; j < n; j++) {
          if (s[j] === s[r - 1]) {
            ok = true;
            break;
          }
        }
      }
      out.push(ok ? 'YES' : 'NO');
    }
  }
  console.log(out.join('\n'));
}

solve();
