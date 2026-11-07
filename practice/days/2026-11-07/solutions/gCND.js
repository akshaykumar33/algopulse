const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    let maxVal = 0;
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
      if (a[i] > maxVal) maxVal = a[i];
    }

    let ans = 1;
    for (let z = maxVal - 1; z >= 1; z--) {
      let notMult = 0;
      for (let i = 0; i < n; i++) {
        if (a[i] % z !== 0) {
          notMult++;
          if (notMult >= 2) break;
        }
      }
      if (notMult >= 2) {
        ans = z;
        break;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
