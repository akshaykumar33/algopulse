const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const MOD = 1000000007n;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    let cur = 1n;
    let isEvenLevel = false;

    for (let i = 0; i < s.length; i++) {
      const ch = s[i].toLowerCase();
      if (!isEvenLevel) {
        if (ch === 'l') {
          cur = (2n * cur) % MOD;
        } else {
          cur = (2n * cur + 2n) % MOD;
        }
      } else {
        if (ch === 'l') {
          cur = (2n * cur - 1n + MOD) % MOD;
        } else {
          cur = (2n * cur + 1n) % MOD;
        }
      }
      isEvenLevel = !isEvenLevel;
    }
    out.push(cur.toString());
  }
  console.log(out.join('\n'));
}

solve();
