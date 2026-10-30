const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    if (n <= 2) {
      out.push(0);
    } else if (n % 2 === 1) {
      out.push(2 + Math.floor((3 * (n - 3)) / 2));
    } else {
      out.push(Math.floor((3 * (n - 2)) / 2));
    }
  }

  console.log(out.join('\n'));
}

solve();
