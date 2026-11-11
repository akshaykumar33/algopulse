const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const q = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < q; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const rawK = BigInt(tokens[ptr++]);
    const maxK = BigInt(n) * BigInt(n);
    let rem = rawK > maxK ? Number(maxK) : Number(rawK);
    const s = tokens[ptr++].split('');

    let pos = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '0') {
        const dist = i - pos;
        if (rem >= dist) {
          if (dist > 0) {
            s[pos] = '0';
            s[i] = '1';
          }
          rem -= dist;
          pos++;
        } else {
          if (rem > 0) {
            s[i - rem] = '0';
            s[i] = '1';
            rem = 0;
          }
          break;
        }
      }
    }

    out.push(s.join(''));
  }

  console.log(out.join('\n'));
}

solve();
