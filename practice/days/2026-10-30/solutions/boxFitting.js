const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const W = parseInt(tokens[ptr++], 10);
    const count = new Int32Array(31);

    for (let i = 0; i < n; i++) {
      const w = parseInt(tokens[ptr++], 10);
      const p = Math.floor(Math.log2(w));
      count[p]++;
    }

    let h = 0;
    let placed = 0;

    while (placed < n) {
      h++;
      let rem = W;
      for (let p = 30; p >= 0; p--) {
        const val = 1 << p;
        if (count[p] > 0 && val <= rem) {
          const take = Math.min(count[p], Math.floor(rem / val));
          count[p] -= take;
          rem -= take * val;
          placed += take;
        }
      }
    }

    out.push(h);
  }
  console.log(out.join('\n'));
}

solve();
