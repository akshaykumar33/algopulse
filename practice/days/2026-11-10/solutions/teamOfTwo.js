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
    const masks = new Int32Array(n);

    for (let i = 0; i < n; i++) {
      const k = parseInt(tokens[ptr++], 10);
      let mask = 0;
      for (let j = 0; j < k; j++) {
        const val = parseInt(tokens[ptr++], 10);
        mask |= 1 << (val - 1);
      }
      masks[i] = mask;
    }

    let found = false;
    for (let i = 0; i < n && !found; i++) {
      for (let j = i + 1; j < n; j++) {
        if ((masks[i] | masks[j]) === 31) {
          found = true;
          break;
        }
      }
    }

    out.push(found ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
