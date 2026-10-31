const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  const MAX = 200001;
  const BITS = 20;
  const pref = new Int32Array(BITS * MAX);

  for (let b = 0; b < BITS; b++) {
    const bitMask = 1 << b;
    const offset = b * MAX;
    let count = 0;
    for (let x = 1; x < MAX; x++) {
      if ((x & bitMask) !== 0) count++;
      pref[offset + x] = count;
    }
  }

  for (let tc = 0; tc < t; tc++) {
    const l = parseInt(tokens[ptr++], 10);
    const r = parseInt(tokens[ptr++], 10);
    const total = r - l + 1;

    let maxKeep = 0;
    for (let b = 0; b < BITS; b++) {
      const offset = b * MAX;
      const count = pref[offset + r] - pref[offset + l - 1];
      if (count > maxKeep) maxKeep = count;
    }

    out.push(total - maxKeep);
  }

  console.log(out.join('\n'));
}

solve();

