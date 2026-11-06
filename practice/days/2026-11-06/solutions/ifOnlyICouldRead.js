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
      a[i] = Number(input[ptr++]);
    }

    let found = false;
    for (let i = 0; i < n - 1; i++) {
      if (a[i] > a[i + 1]) {
        out.push(`${i + 1} ${i + 2}`);
        found = true;
        break;
      }
    }

    if (!found) {
      out.push('-1');
    }
  }

  console.log(out.join('\n'));
}

solve();

