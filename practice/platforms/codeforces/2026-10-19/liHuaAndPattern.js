const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);

    const a = [];
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        row.push(parseInt(input[ptr++], 10));
      }
      a.push(row);
    }

    let diff = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const ri = n - 1 - i;
        const rj = n - 1 - j;
        if (i < ri || (i === ri && j < rj)) {
          if (a[i][j] !== a[ri][rj]) {
            diff++;
          }
        }
      }
    }

    if (k >= diff && (n % 2 === 1 || (k - diff) % 2 === 0)) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();
