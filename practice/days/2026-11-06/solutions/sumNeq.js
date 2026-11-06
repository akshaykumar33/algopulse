const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const a = new Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = BigInt(input[ptr++]);
    }

    if (n === 4) {
      if (a[0] + a[1] !== a[2] + a[3]) {
        out.push('YES');
      } else {
        out.push('NO');
      }
    } else {
      let allEqual = true;
      for (let i = 1; i < n; i++) {
        if (a[i] !== a[0]) {
          allEqual = false;
          break;
        }
      }
      out.push(allEqual ? 'NO' : 'YES');
    }
  }

  console.log(out.join('\n'));
}

solve();

