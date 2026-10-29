const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(parseInt(input[ptr++], 10));
    }

    if (n === 1) {
      out.push('YES');
    } else if (n === 2) {
      out.push(a[0] <= a[1] ? 'YES' : 'NO');
    } else if (n === 3) {
      const mn = Math.min(a[0], a[2]);
      const mx = Math.max(a[0], a[2]);
      out.push(mn <= a[1] && a[1] <= mx ? 'YES' : 'NO');
    } else {
      out.push('YES');
    }
  }
  console.log(out.join('\n'));
}

solve();
