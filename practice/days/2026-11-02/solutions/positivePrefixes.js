const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);

    const a = new Array(n + 1);
    for (let i = 1; i <= n; i++) {
      a[i] = (i % 2 !== 0 ? i : -i);
    }

    let pref = 0;
    let curK = 0;
    for (let i = 1; i <= n; i++) {
      pref += a[i];
      if (pref > 0) curK++;
    }

    if (curK < k) {
      for (let i = n; i >= 1 && curK < k; i--) {
        if (a[i] < 0) {
          a[i] = -a[i];
          curK++;
        }
      }
    } else if (curK > k) {
      for (let i = n; i >= 1 && curK > k; i--) {
        if (a[i] > 0) {
          a[i] = -a[i];
          curK--;
        }
      }
    }

    const res = [];
    for (let i = 1; i <= n; i++) res.push(a[i]);
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

