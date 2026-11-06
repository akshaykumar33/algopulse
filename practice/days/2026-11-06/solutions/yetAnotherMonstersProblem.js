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

    a.sort((x, y) => x - y);

    let minTime = n;
    for (let i = 0; i < n; i++) {
      const time = a[i] + (n - 1 - i);
      if (time < minTime) {
        minTime = time;
      }
    }

    out.push(minTime);
  }

  console.log(out.join('\n'));
}

solve();

