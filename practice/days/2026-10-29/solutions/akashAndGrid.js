const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input[0] === '') return;

  const t = parseInt(input[0], 10);
  let ptr = 1;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const x = parseInt(input[ptr++], 10);
    const y = parseInt(input[ptr++], 10);

    if ((x + y) % 2 === 0) {
      out.push(0);
    } else {
      out.push(1);
    }
  }

  console.log(out.join('\n'));
}

solve();

