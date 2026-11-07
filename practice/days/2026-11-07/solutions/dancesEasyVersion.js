const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);

    const a = new Int32Array(n);
    a[0] = 1;
    for (let i = 1; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }

    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      b[i] = parseInt(tokens[ptr++], 10);
    }

    a.sort();
    b.sort();

    let i = 0;
    for (let j = 0; j < n; j++) {
      if (a[i] < b[j]) {
        i++;
      }
    }

    out.push(n - i);
  }

  console.log(out.join('\n'));
}

solve();
