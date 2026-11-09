const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let pos = 0;
  const t = parseInt(tokens[pos++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[pos++], 10);
    const m = parseInt(tokens[pos++], 10);
    const strings = [];
    for (let i = 0; i < m; i++) {
      strings.push(tokens[pos++]);
    }

    let ans = 0n;
    const halfFloor = Math.floor(m / 2);
    const halfCeil = Math.ceil(m / 2);

    for (let j = 0; j < n; j++) {
      let c0 = 0;
      let c1 = 0;
      let cq = 0;
      for (let i = 0; i < m; i++) {
        const ch = strings[i].charCodeAt(j);
        if (ch === 48) c0++;
        else if (ch === 49) c1++;
        else cq++;
      }

      let z;
      if (c0 + cq <= halfFloor) {
        z = c0 + cq;
      } else if (c0 >= halfCeil) {
        z = c0;
      } else {
        z = halfFloor;
      }

      const o = m - z;
      ans += BigInt(z) * BigInt(o);
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
