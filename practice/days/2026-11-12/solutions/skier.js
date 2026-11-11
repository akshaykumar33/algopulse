const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  const OFF = 1000005;
  const BASE = 2000015;

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    const vis = new Set();
    let x = 0;
    let y = 0;
    let ans = 0;

    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      let key = 0;
      if (ch === 'N') {
        key = ((x + OFF) * BASE + (y + OFF)) * 2 + 1;
        y++;
      } else if (ch === 'S') {
        y--;
        key = ((x + OFF) * BASE + (y + OFF)) * 2 + 1;
      } else if (ch === 'E') {
        key = ((x + OFF) * BASE + (y + OFF)) * 2;
        x++;
      } else {
        x--;
        key = ((x + OFF) * BASE + (y + OFF)) * 2;
      }

      if (vis.has(key)) {
        ans += 1;
      } else {
        vis.add(key);
        ans += 5;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
