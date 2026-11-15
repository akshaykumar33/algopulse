const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const b = [];
    for (let i = 0; i < n; i++) b.push(parseInt(input[ptr++], 10));

    if (b[0] === 0 && b[n - 1] === 1) {
      out.push(2 * n - 2);
    } else {
      out.push(2 * n - 1);
    }
  }
  console.log(out.join('\n'));
}

solve();
