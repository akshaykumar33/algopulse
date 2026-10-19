const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(parseInt(input[ptr++], 10));
    }

    let i = n - 1;
    while (i > 0 && a[i - 1] >= a[i]) {
      i--;
    }
    while (i > 0 && a[i - 1] <= a[i]) {
      i--;
    }

    out.push(i);
  }

  console.log(out.join('\n'));
}

solve();
