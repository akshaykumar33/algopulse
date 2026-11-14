const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = input[ptr++];
    let len = 0;
    let maxSorted = 0;
    let minUnsorted = Infinity;
    let ok = true;

    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (ch === '+') {
        len++;
      } else if (ch === '-') {
        if (len === minUnsorted) minUnsorted = Infinity;
        len--;
        if (len < maxSorted) maxSorted = len;
      } else if (ch === '1') {
        if (minUnsorted <= len) {
          ok = false;
          break;
        }
        if (len > maxSorted) maxSorted = len;
      } else if (ch === '0') {
        if (len < 2 || maxSorted >= len) {
          ok = false;
          break;
        }
        if (minUnsorted > len) minUnsorted = len;
      }
    }

    out.push(ok ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}

solve();
