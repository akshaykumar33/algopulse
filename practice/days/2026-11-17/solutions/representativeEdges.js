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
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }

    if (n <= 2) {
      out.push(0);
      continue;
    }

    let maxKeep = 2;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        let keep = 0;
        const di = j - i;
        const dv = a[j] - a[i];
        for (let k = 0; k < n; k++) {
          if ((a[k] - a[i]) * di === dv * (k - i)) {
            keep++;
          }
        }
        if (keep > maxKeep) {
          maxKeep = keep;
        }
      }
    }

    out.push(n - maxKeep);
  }

  console.log(out.join('\n'));
}

solve();
