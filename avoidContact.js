const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const x = parseInt(input[ptr++], 10);
    const y = parseInt(input[ptr++], 10);

    if (x === y) {
      out.push(2 * y - 1);
    } else {
      out.push(x + y);
    }
  }

  console.log(out.join('\n'));
}

solve();
