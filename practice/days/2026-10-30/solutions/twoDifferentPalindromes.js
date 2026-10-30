const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = parseInt(input[ptr++], 10);
    const b = parseInt(input[ptr++], 10);

    if (a % 2 === 1 && b % 2 === 1) {
      out.push('No');
    } else if (a === 1 || b === 1) {
      out.push('No');
    } else {
      out.push('Yes');
    }
  }

  console.log(out.join('\n'));
}

solve();
