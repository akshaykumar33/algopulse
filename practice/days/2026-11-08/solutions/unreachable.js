const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let hasOdd1 = false;
    let hasEven1 = false;

    for (let i = 0; i < n; i++) {
      const a = parseInt(input[ptr++], 10);
      if (a === 1) {
        if ((i + 1) % 2 === 1) {
          hasOdd1 = true;
        } else {
          hasEven1 = true;
        }
      }
    }

    if (!hasOdd1 || !hasEven1) {
      out.push('Yes');
    } else {
      out.push('No');
    }
  }

  console.log(out.join('\n'));
}

solve();
