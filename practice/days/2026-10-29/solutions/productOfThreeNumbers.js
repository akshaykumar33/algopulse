const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    let n = parseInt(input[ptr++], 10);
    let a = 0;
    for (let i = 2; i * i * i <= n; i++) {
      if (n % i === 0) {
        a = i;
        break;
      }
    }

    if (a === 0) {
      out.push('NO');
      continue;
    }

    n = Math.floor(n / a);
    let b = 0;
    for (let i = a + 1; i * i < n; i++) {
      if (n % i === 0) {
        b = i;
        break;
      }
    }

    if (b === 0) {
      out.push('NO');
      continue;
    }

    const c = Math.floor(n / b);
    if (c > b) {
      out.push('YES');
      out.push(a + ' ' + b + ' ' + c);
    } else {
      out.push('NO');
    }
  }
  console.log(out.join('\n'));
}

solve();
