const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input.length || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let line = 1;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[line++], 10);
    const a = input[line++].trim().split(/\s+/).map(Number);
    const cnt = new Map();
    let m = 0;
    for (let i = 0; i < n; i++) {
      const c = (cnt.get(a[i]) || 0) + 1;
      cnt.set(a[i], c);
      if (c > m) m = c;
    }

    let ops = 0;
    while (m < n) {
      ops++;
      const add = Math.min(m, n - m);
      ops += add;
      m += add;
    }
    out.push(ops);
  }

  console.log(out.join('\n'));
}

solve();
