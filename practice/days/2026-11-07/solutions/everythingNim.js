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
    a.sort();

    const u = [];
    for (let i = 0; i < n; i++) {
      if (i === 0 || a[i] !== a[i - 1]) {
        u.push(a[i]);
      }
    }

    const k = u.length;
    let cnt = 0;
    let prev = 0;

    for (let i = 0; i < k; i++) {
      if (u[i] - prev === 1) {
        cnt++;
        prev = u[i];
      } else {
        break;
      }
    }

    if (cnt === k) {
      out.push(k % 2 === 1 ? 'Alice' : 'Bob');
    } else {
      out.push(cnt % 2 === 0 ? 'Alice' : 'Bob');
    }
  }

  console.log(out.join('\n'));
}

solve();
