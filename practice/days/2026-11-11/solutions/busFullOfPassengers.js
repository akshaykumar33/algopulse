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
    const m = parseInt(tokens[ptr++], 10);
    const q = parseInt(tokens[ptr++], 10);
    const inside = new Uint8Array(n + 1);
    let cur = 0;
    let ok = true;

    for (let j = 0; j < q; j++) {
      const op = tokens[ptr++];
      const id = parseInt(tokens[ptr++], 10);
      if (op === '+') {
        if (inside[id] === 1) ok = false;
        inside[id] = 1;
        cur++;
        if (cur > m) ok = false;
      } else {
        if (inside[id] === 0) {
          ok = false;
        } else {
          inside[id] = 0;
          cur--;
        }
      }
    }

    out.push(ok ? 'Consistent' : 'Inconsistent');
  }

  console.log(out.join('\n'));
}

solve();
