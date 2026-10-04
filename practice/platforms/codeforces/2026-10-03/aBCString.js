const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input.length || input[0] === '') return;
  const t = parseInt(input[0], 10);
  const out = [];

  for (let tc = 1; tc <= t; tc++) {
    const s = input[tc].trim();
    const n = s.length;
    let ok = false;

    for (let mask = 0; mask < 8; mask++) {
      const map = {
        A: (mask & 1) ? '(' : ')',
        B: (mask & 2) ? '(' : ')',
        C: (mask & 4) ? '(' : ')'
      };
      let b = 0;
      let valid = true;
      for (let i = 0; i < n; i++) {
        b += map[s[i]] === '(' ? 1 : -1;
        if (b < 0) {
          valid = false;
          break;
        }
      }
      if (valid && b === 0) {
        ok = true;
        break;
      }
    }
    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
