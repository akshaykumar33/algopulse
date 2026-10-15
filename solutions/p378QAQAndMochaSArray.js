const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const n = parseInt(input[ptr++], 10);
    const a = [];
    for (let j = 0; j < n; j++) {
      a.push(parseInt(input[ptr++], 10));
    }
    a.sort((x, y) => x - y);
    const min1 = a[0];
    let min2 = -1;
    for (let j = 1; j < n; j++) {
      if (a[j] % min1 !== 0) {
        min2 = a[j];
        break;
      }
    }

    if (min2 === -1) {
      out.push('Yes');
      continue;
    }

    let ok = true;
    for (let j = 0; j < n; j++) {
      if (a[j] % min1 !== 0 && a[j] % min2 !== 0) {
        ok = false;
        break;
      }
    }
    out.push(ok ? 'Yes' : 'No');
  }

  console.log(out.join('\n'));
}

solve();
