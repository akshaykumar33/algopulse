const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    if ((n & 1) === 0) {
      out.push((n / 2) + ' ' + (n / 2));
      continue;
    }

    let p = 0;
    for (let i = 3; i * i <= n; i += 2) {
      if (n % i === 0) {
        p = i;
        break;
      }
    }

    if (p === 0) {
      out.push('1 ' + (n - 1));
    } else {
      const g = n / p;
      out.push(g + ' ' + (n - g));
    }
  }
  console.log(out.join('\n'));
}

solve();
