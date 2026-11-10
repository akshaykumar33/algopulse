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
    let minOps = 32;

    for (let i = 0; i < n; i++) {
      let v = parseInt(tokens[pos++], 10);
      let cnt = 0;
      while ((v & 1) === 0) {
        v >>= 1;
        cnt++;
      }
      if (cnt < minOps) minOps = cnt;
    }

    out.push(minOps);
  }

  console.log(out.join('\n'));
}

solve();
