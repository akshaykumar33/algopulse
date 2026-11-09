const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n + 1);
    const has = new Uint8Array(n + 1);
    for (let i = 1; i <= n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      a[i] = val;
      has[val] = 1;
    }

    const seen = new Uint8Array(n + 1);
    let happy = false;
    for (let x = 1; x <= n; x++) {
      if (has[x]) {
        const target = a[x];
        if (seen[target]) {
          happy = true;
          break;
        }
        seen[target] = 1;
      }
    }

    out.push(happy ? 'Truly Happy' : 'Poor Chef');
  }

  console.log(out.join('\n'));
}

solve();
