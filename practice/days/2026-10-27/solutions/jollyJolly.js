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

    if (n === 1) {
      out.push('Jolly');
      continue;
    }

    const seen = new Uint8Array(n);
    let isJolly = true;
    for (let i = 0; i < n - 1; i++) {
      const d = Math.abs(a[i + 1] - a[i]);
      if (d < 1 || d >= n || seen[d]) {
        isJolly = false;
        break;
      }
      seen[d] = 1;
    }

    out.push(isJolly ? 'Jolly' : 'Not Jolly');
  }
  console.log(out.join('\n'));
}

solve();
