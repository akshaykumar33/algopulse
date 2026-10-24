const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const x = parseInt(input[ptr++], 10);

    const a = [];
    let curOr = 0;
    for (let i = 0; i < n; i++) {
      if ((i | x) === x) {
        a.push(i);
        curOr |= i;
      } else {
        break;
      }
    }

    if (a.length === n) {
      if (curOr !== x) {
        a[n - 1] = x;
      }
    } else {
      while (a.length < n) {
        a.push(x);
      }
    }

    out.push(a.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
